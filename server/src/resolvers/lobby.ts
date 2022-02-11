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
} from "type-graphql";
import { AuthToken } from "./AuthToken";

@ObjectType()
class LobbyResponse {
	@Field(() => String, { nullable: true })
	accesstoken?: string;

	@Field(() => String, { nullable: true })
	error?: string;
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

				return {
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
	@Mutation(() => LobbyResponse)
	@UseMiddleware(isAuth)
	async joinLobby(
		@Arg("uuid", () => String) uuid: string,
		@Ctx() context: MyContext
	): Promise<LobbyResponse | null> {
		var error;
		var response;
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
						lobby?.users.push(uuidUser);

						context.em.persistAndFlush(lobby);

						var authtoken = new AuthToken();
						authtoken.uuidUser = uuidUser;
						authtoken.uuidLobby = lobby?.uuid;

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
			accesstoken: response,
			error: error,
		};
	}
	@Query(() => Lobby, { nullable: true })
	@UseMiddleware(isAuth)
	async lobbyFromToken(@Ctx() context: MyContext): Promise<Lobby | null> {
		const uuidLobby = context.payload?.uuidLobby;
		console.log(context.payload);
		const lobby = await context.em.findOne(Lobby, { uuid: uuidLobby });
		return lobby;
	}
}
