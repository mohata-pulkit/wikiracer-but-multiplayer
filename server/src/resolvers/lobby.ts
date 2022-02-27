import { PubSubEngine } from "graphql-subscriptions";
import { sign } from "jsonwebtoken";
import { Lobby } from "../entities/Lobby";
import { isAuth } from "../isAuth";
import { MyContext } from "../types";
import {
	Arg,
	Ctx,
	Mutation,
	ObjectType,
	Query,
	Field,
	UseMiddleware,
	Subscription,
	Root,
	PubSub,
} from "type-graphql";
import { AuthToken } from "./AuthToken";
import fs from "fs";

async function removeEmptyEntries(context: MyContext) {
	var entriesForDeletion: string[] = [];
	const entries = await context.em.find(Lobby, {});
	entries.forEach((entry) => {
		if (entry.users.length == 0) {
			entriesForDeletion.push(entry.uuid);
		} else if (Date.now() - entry.updatedAt.getTime() === 1000 * 60 * 60) {
			entriesForDeletion.push(entry.uuid);
		}
	});
	entriesForDeletion.forEach((entry) => {
		context.em.nativeDelete(Lobby, entry);
	});
}

@ObjectType()
class LobbyResponse {
	@Field(() => String, { nullable: true })
	accesstoken?: string;

	@Field(() => String, { nullable: true })
	error?: string;

	@Field(() => Lobby, { nullable: true })
	lobby?: Lobby;
}

export default class LobbyResolver {
	@Query(() => [Lobby])
	async lobbies(@Ctx() { em }: MyContext): Promise<Lobby[]> {
		const lobbies = await em.find(Lobby, {});
		return lobbies;
	}

	@Query(() => Lobby)
	async lobby(
		@Arg("uuid", () => String) uuid: string,
		@Ctx() { em }: MyContext
	): Promise<Lobby | null> {
		const lobby = await em.findOne(Lobby, { uuid: uuid });
		return lobby;
	}

	@Mutation(() => LobbyResponse)
	@UseMiddleware(isAuth)
	async createLobby(
		@Ctx() context: MyContext
	): Promise<LobbyResponse | null> {
		if (context.payload === null) {
			return {
				error: "bruh login before creating a lobby 🤦",
			};
		} else {
			const uuidUser = context.payload?.uuidUser;
			if (uuidUser != null) {
				const lobbies = await context.em.find(Lobby, {});
				lobbies.forEach((lobby) => {
					lobby.users.forEach((user) => {
						if (user === uuidUser) {
							lobby.users = lobby.users.filter((ele) => {
								return ele != user;
							});
						}
					});
					context.em.persist(lobby);
				});
				const lobby = await context.em.create(Lobby, {
					users: [uuidUser],
				});
				context.em.persistAndFlush(lobby);

				var authtoken = new AuthToken();
				authtoken.uuidUser = uuidUser;
				authtoken.uuidLobby = lobby.uuid;

				removeEmptyEntries(context);

				return {
					lobby: lobby,
					accesstoken: sign(
						{
							authtoken,
						},
						"hamrosianmaneavour",
						{
							expiresIn: "1h",
							issuer: "https://www.wikiracer.io",
						}
					),
				};
			} else {
				return {
					error: "bruh login before creating a lobby 🤦",
				};
			}
		}
	}

	@Subscription(() => Lobby, {
		topics: ({ args }) => {
			return args.lobbyUuid;
		},
	})
	lobbySubscription(
		@Arg("lobbyUuid") lobbyUuid: string,
		@Root() lobby: Lobby
	): Lobby {
		return lobby;
	}
	@Mutation(() => LobbyResponse)
	@UseMiddleware(isAuth)
	async joinLobby(
		@PubSub() pubSub: PubSubEngine,
		@Arg("uuid", () => String) uuid: string,
		@Ctx() context: MyContext
	): Promise<LobbyResponse | null> {
		var error;
		var response;
		var finalLobby;
		if (context.payload === null) {
			error = "bruh login before joining a lobby 🤦";
		} else {
			const uuidUser = context.payload?.uuidUser;
			if (uuidUser !== undefined) {
				var lobby = await context.em.findOne(Lobby, { uuid: uuid });

				if (lobby !== null) {
					lobby.users.forEach((user) => {
						if (user === uuidUser) {
							error = "bruh you're already in this lobby 🤦";
						}
					});
					if (error === undefined) {
						const lobbies = await context.em.find(Lobby, {});
						lobbies.forEach((lobby) => {
							lobby.users.forEach((user) => {
								if (user === uuidUser) {
									lobby.users = lobby.users.filter((ele) => {
										return ele != user;
									});
								}
							});
							context.em.persist(lobby);
						});
						lobby?.users.push(uuidUser);

						context.em.persistAndFlush(lobby);

						pubSub.publish(lobby.uuid, lobby);

						var authtoken = new AuthToken();
						authtoken.uuidUser = uuidUser;
						authtoken.uuidLobby = lobby?.uuid;

						removeEmptyEntries(context);

						finalLobby = lobby;

						response = sign(
							{
								authtoken,
							},
							"hamrosianmaneavour",
							{
								expiresIn: "1h",
								issuer: "https://www.wikiracer.io",
							}
						);
					}
				} else {
					error = "bruh that lobby doesn't exist 😔";
				}
			} else {
				error = "bruh login before joining a lobby 🤦";
			}
		}
		return {
			lobby: finalLobby,
			accesstoken: response,
			error: error,
		};
	}
	@Query(() => Lobby, { nullable: true })
	@UseMiddleware(isAuth)
	async lobbyFromToken(@Ctx() context: MyContext): Promise<Lobby | null> {
		const uuidLobby = context.payload?.uuidLobby;
		const lobby = await context.em.findOne(Lobby, { uuid: uuidLobby });
		return lobby;
	}
	@Mutation(() => LobbyResponse)
	@UseMiddleware(isAuth)
	async startGame(
		@Arg("startArticle", () => String) startArticle: string,
		@Arg("endArticle", () => String) endArticle: string,
		@Arg("options", () => [String]) options: string[],
		@Ctx() context: MyContext
	): Promise<LobbyResponse | null> {
		var error;
		var response;
		var finalLobby;
		if (context.payload === null) {
			error = "how have you managed to start a game without logging in";
		} else {
			const uuidUser = context.payload?.uuidUser;
			if (uuidUser !== undefined) {
				const uuidLobby = context.payload?.uuidLobby;
				const lobby = await context.em.findOne(Lobby, {
					uuid: uuidLobby,
				});
				if (lobby !== null) {
					var rand = require("random-seed").create();
					if (error === undefined) {
						if (startArticle === "") {
							var readFileData = fs.readFileSync(
								"lists/" + options[0].toLowerCase() + ".csv",
								{
									encoding: "utf8",
								}
							);
							var randomList = readFileData
								.replaceAll('"', "")
								.split(", ");
							var rand1 = rand.range(randomList.length);
							var article = randomList[rand1];
							console.log(randomList.length);
							console.log(article);
							lobby.startArticle = article;
						} else {
							lobby.startArticle = startArticle;
							lobby.endArticle = endArticle;
							lobby.options = options;
						}

						context.em.persistAndFlush(lobby);

						var authtoken = new AuthToken();
						authtoken.uuidUser = uuidUser;
						authtoken.uuidLobby = lobby?.uuid;

						removeEmptyEntries(context);

						finalLobby = lobby;

						response = sign(
							{
								authtoken,
							},
							"hamrosianmaneavour",
							{
								expiresIn: "1h",
								issuer: "https://www.wikiracer.io",
							}
						);
					}
				} else {
					error = "bruh that lobby doesn't exist 😔";
				}
			} else {
				error = "bruh login before joining a lobby 🤦";
			}
		}
		return {
			lobby: finalLobby,
			accesstoken: response,
			error: error,
		};
	}
}
