import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { gql, useSubscription } from "@apollo/client";
import * as graphql from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { createUrqlWSClient } from "../utils/createUrqlWSClient";

const Lobby: NextPage = () => {
	const { data: lobby } = graphql.useLobbyFromTokenQuery();
	var [membersState, setMembersState] = useState(Array<string>(10).fill(""));

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
				return (
					<div className="flex flex-col justify-center text-center align-middle bg-grey-100 dark:bg-grey-900 text-grey-900 dark:text-grey-100 p-4 rounded-md border border-grey-900 dark:border-grey-100">
						<div className="w-full h-auto">
							<Image
								src={
									"/userImage/cat-walking-" +
									gifAssigner(
										user(member).data?.user?.user?.uuid
									) +
									".gif"
								}
								height={10}
								width={10}
								layout={"responsive"}
							/>
						</div>
						<div className="text-xl font-serif font-bold">
							{user(member).data?.user?.user?.username}
						</div>
						<div className="text-sm font-serif">
							{user(member).data?.user?.user?.elo}
						</div>
					</div>
				);
			} else {
				return <div></div>;
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
		<div className="flex-col flex gap-4 p-4 mx-4 md:mx-auto my-8 border-2 bg-grey-200 dark:bg-grey-800 border-grey-900 dark:border-grey-100 rounded-md w-auto md:w-1/2 lg:w-1/3">
			<div className="h-fit">
				<p className="font-serif font-bold text-4xl text-center">
					Lobby
				</p>
			</div>
			<div>
				<div></div>
				<SafeHydrate>
					<LobbyMembers />
				</SafeHydrate>
			</div>
			<SafeHydrate>
				<LobbyMembers />
			</SafeHydrate>
			<div>Lobby ID: {lobby?.lobbyFromToken?.uuid}</div>
			<button
				className="p-2 bg-amber-200-accent dark:bg-amber-400-accent text-grey-900 rounded-md font-medium font-serif"
				type="submit"
			>
				Start
			</button>
		</div>
	);
};

export default Lobby;
