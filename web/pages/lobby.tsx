import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { gql, useSubscription } from "@apollo/client";
import * as graphql from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { createUrqlWSClient } from "../utils/createUrqlWSClient";
import { Field, Form, Formik } from "formik";
import router from "next/router";
import { toErrorMap } from "../utils/toErrorMap";

const Lobby: NextPage = () => {
	const { data: lobby } = graphql.useLobbyFromTokenQuery();
	var [membersState, setMembersState] = useState(Array<string>(10).fill(""));

	const [startGame] = graphql.useStartGameMutation();

	const LOBBY_SUBSCRIPTION = gql`
		subscription lobby($lobbyUuid: String!) {
			lobbySubscription(lobbyUuid: $lobbyUuid) {
				users
			}
		}
	`;

	const { data: lobbySubscription, error: lobbySubErrors } = useSubscription(
		LOBBY_SUBSCRIPTION,
		{
			variables: {
				lobbyUuid: lobby?.lobbyFromToken?.uuid,
			},
		}
	);

	var members = Array<string>(10);
	members.fill(" ", 0, 10);

	console.log(members);

	lobby?.lobbyFromToken?.users.forEach((member) => {
		members.shift();
		members.push(member);
	});

	useEffect(() => {
		if (lobby?.lobbyFromToken?.users) {
			membersState.forEach((element) => {
				var index = membersState.indexOf(element);
				if (membersState[index] !== members[index]) {
					setMembersState(members);
				}
			});
		}
	});

	const user = (userUuid: string) => {
		return graphql.useUserQuery({
			variables: {
				userUuid: userUuid,
			},
		});
	};

	function LobbyMembers() {
		const [usersState, setUsersState] = useState(membersState);
		useEffect(() => {
			if (lobbySubscription?.lobbySubscription?.users) {
				members.forEach((element) => {
					console.log();
					var index = usersState.indexOf(element);
					if (usersState[index] !== members[index]) {
						setUsersState(members);
					}
				});
			}
		});

		function gifAssigner(uuid: string | undefined): string | undefined {
			if (uuid) {
				const hexUuid = uuid.split("-").join("");
				var hexArray = Array();
				var i = 0;
				var hexSubArray = Array<string>(2);
				while (i < hexUuid.length) {
					if (i % 2 === 0) {
						hexSubArray.push(hexUuid[i]);
					} else {
						hexSubArray.push(hexUuid[i]);
						hexArray.push(hexSubArray.join(""));
						hexSubArray = Array<string>(2);
					}
					i = i + 1;
				}
				var finalValue = 0;
				hexArray.forEach((hex) => {
					finalValue = finalValue + parseInt(hex, 16);
				});

				var result = finalValue % 8;
				console.log(finalValue);
				return result.toString();
			} else {
				return undefined;
			}
		}

		const users = usersState.map((member) => {
			if (member !== " ") {
				if (member === "started") {
					router.push("/race");
				} else {
					return (
						<div
							key={user(member).data?.user?.user?.uuid}
							className="flex flex-col gap-2 justify-center text-center align-middle bg-grey-100 dark:bg-grey-900 text-grey-900 dark:text-grey-100 p-4 rounded-md border-2 border-grey-900 dark:border-grey-100"
						>
							<div className="w-full h-auto">
								<Image
									src={
										"/userImage/cat-walking-" +
										gifAssigner(
											user(member).data?.user?.user?.uuid
										) +
										".gif"
									}
									height={18}
									width={24}
									layout={"responsive"}
								/>
							</div>
							<div className="text-2xl font-serif font-bold">
								{user(member).data?.user?.user?.username}
							</div>
							<div className="text-sm font-serif">
								{user(member).data?.user?.user?.elo}
							</div>
						</div>
					);
				}
			} else {
				return <div key={Math.random()}></div>;
			}
		});

		users.reverse();

		console.log(lobbySubscription?.lobbySubscription?.users);

		var newUser = lobbySubscription?.lobbySubscription?.users
			.slice(-1)
			.pop();

		if (members.slice(-1).pop() !== newUser && newUser) {
			members.shift();
			members.push(newUser);
		}

		return <div className="grid grid-cols-3 gap-2">{users}</div>;
	}

	function SafeHydrate({ children }: any) {
		return (
			<div suppressHydrationWarning>
				{typeof window === "undefined" ? null : children}
			</div>
		);
	}

	return (
		<div className="flex-col flex gap-4 p-4 mx-4 md:mx-auto my-8 border-2 bg-grey-200 dark:bg-grey-800 border-grey-900 dark:border-grey-100 rounded-md w-auto">
			<div className="h-fit">
				<p className="font-serif font-bold text-4xl text-center">
					Lobby
				</p>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 p-8 gap-4">
				<div>
					<Formik
						initialValues={{
							startArticle: "",
							endArticle: "",
							randomList: "Random Seed",
							paragraphOnly: false,
							noCountries: false,
						}}
						onSubmit={async (values, { setErrors }) => {
							var lobbyOptions = [
								values.randomList,
								values.paragraphOnly.toString(),
								values.noCountries.toString(),
							];
							const response = await startGame({
								variables: {
									endArticle: values.endArticle,
									startArticle: values.startArticle,
									options: lobbyOptions,
								},
								update: (cache, { data }) => {
									cache.writeQuery<graphql.LobbyFromTokenQuery>(
										{
											query: graphql.LobbyFromTokenDocument,
											data: {
												__typename: "Query",
												lobbyFromToken:
													data?.startGame.lobby,
											},
										}
									);
								},
							});
							if (response.data?.startGame.error) {
								setErrors({
									randomList: response.data.startGame.error,
								});
							} else {
								localStorage.setItem(
									"accessToken",
									response.data?.startGame?.accesstoken
										? response.data.startGame.accesstoken
										: ""
								);
								router.push("/race");
							}
						}}
					>
						{({ errors }) => (
							<Form className="flex-col flex gap-4 justify-items-center">
								<div className="grid grid-cols-3 items-center">
									<label htmlFor="startArticle">
										Start Article
									</label>
									<Field
										id="startArticle"
										name="startArticle"
										placeholder="Leave blank for article from the selected random list"
										className="col-span-2 bg-transparent border-2 border-grey-900 dark:border-grey-100 p-2 rounded-md"
									></Field>
								</div>
								<div className="grid grid-cols-3 items-center">
									<label htmlFor="endArticle">
										End Article
									</label>
									<Field
										id="endArticle"
										name="endArticle"
										placeholder="Leave blank for article from the selected random list"
										className="col-span-2 bg-transparent border-2 border-grey-900 dark:border-grey-100 p-2 rounded-md"
									></Field>
								</div>
								<div className="grid grid-cols-3 items-center">
									<label htmlFor="randomList">
										Random List
									</label>
									<div className="col-span-2 bg-transparent">
										<Field
											as="select"
											id="randomList"
											name="randomList"
											placeholder="randomList"
											className="bg-transparent border-2 border-grey-900 dark:border-grey-100 p-2 rounded-md"
										>
											<option
												key="RSG"
												value="RSG"
												className="bg-grey-200 dark:bg-grey-800"
											>
												Random Seed
											</option>
											<option
												key="FSG"
												value="FSG"
												className="bg-grey-200 dark:bg-grey-800"
											>
												Filtered Seed
											</option>
											<option
												key="LivePeep"
												value="LivePeep"
												className="bg-grey-200 dark:bg-grey-800"
											>
												Living People
											</option>
											<option
												key="MathAndComp"
												value="MathAndComp"
												className="bg-grey-200 dark:bg-grey-800"
											>
												Math and Computing
											</option>
											<option
												key="NatSci"
												value="NatSci"
												className="bg-grey-200 dark:bg-grey-800"
											>
												Natural Sciences
											</option>
											<option
												key="PhilAndRel"
												value="PhilAndRel"
												className="bg-grey-200 dark:bg-grey-800"
											>
												Philosophy and Religion
											</option>
											<option
												key="Hist"
												value="Hist"
												className="bg-grey-200 dark:bg-grey-800"
											>
												History
											</option>
											<option
												key="PolAndEcon"
												value="PolAndEcon"
												className="bg-grey-200 dark:bg-grey-800"
											>
												Politics and Economics
											</option>
											<option
												key="Games"
												value="Games"
												className="bg-grey-200 dark:bg-grey-800"
											>
												Video Games
											</option>
											<option
												key="NSFW"
												value="NSFW"
												className="bg-grey-200 dark:bg-grey-800"
											>
												NSFW
											</option>
											<option
												key="Law"
												value="Law"
												className="bg-grey-200 dark:bg-grey-800"
											>
												Law
											</option>
										</Field>
									</div>
								</div>
								<div className="grid grid-cols-3 items-center">
									<label htmlFor="paragraphOnly">
										Paragraphs Only?
									</label>
									<div className="col-span-2 bg-transparent p-2">
										<Field
											type="checkbox"
											name="paragraphOnly"
											className="h-6 w-6 bg-transparent cursor-pointer outline-none appearance-none border-2 border-grey-900 dark:border-grey-100 rounded-md checked:bg-amber-200-accent dark:checked:bg-amber-400-accent"
										/>
									</div>
								</div>
								<div className="grid grid-cols-3 items-center">
									<label htmlFor="noCountries">
										No Countries?
									</label>
									<div className="col-span-2 bg-transparent p-2">
										<Field
											type="checkbox"
											name="noCountries"
											className="h-6 w-6 bg-transparent cursor-pointer outline-none appearance-none border-2 border-grey-900 dark:border-grey-100 rounded-md checked:bg-amber-200-accent dark:checked:bg-amber-400-accent"
										/>
									</div>
								</div>
								<div>
									<button
										className="p-2 bg-amber-200-accent dark:bg-amber-400-accent text-grey-900 rounded-md font-medium font-serif"
										type="submit"
									>
										Login
									</button>
									<p className="text-xs text-red-200-accent">
										{errors.randomList
											? errors.randomList
											: "\xa0"}
									</p>
								</div>
							</Form>
						)}
					</Formik>
				</div>
				<SafeHydrate>
					<LobbyMembers />
				</SafeHydrate>
			</div>
			<div>Lobby ID: {lobby?.lobbyFromToken?.uuid}</div>
		</div>
	);
};

export default Lobby;
