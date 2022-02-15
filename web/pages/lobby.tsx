import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import React from "react";
import { useSubscription } from "urql";
import * as graphql from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { createUrqlWSClient } from "../utils/createUrqlWSClient";

const Lobby: NextPage = () => {
	const [{ data }] = graphql.useLobbyFromTokenQuery();

	const user = (userUuid: string) => {
		return graphql.useUserQuery({
			variables: {
				userUuid: userUuid,
			},
		});
	};

	const lobbyMembers = (lobbyUuid: string) => {
		return graphql.useLobbySubscription({
			variables: {
				lobbyUuid: data?.lobbyFromToken ? data.lobbyFromToken.uuid : "",
			},
		});
	};

	const members = lobbyMembers(
		data?.lobbyFromToken ? data.lobbyFromToken.uuid : ""
	)[0].data?.lobbySubscription.users;

	console.log(members ? members : "bruh");

	return (
		<div className="flex-col flex gap-4 p-4 mx-4 md:mx-auto my-8 border-2 bg-grey-200 dark:bg-grey-800 border-grey-900 dark:border-grey-100 rounded-md w-auto md:w-1/2 lg:w-1/3">
			<div className="h-fit">
				<p className="font-serif font-bold text-4xl text-center">
					Lobby
				</p>
			</div>
			<div className="grid grid-cols-3">{members}</div>
			<div className="grid grid-cols-3"></div>
			<button
				className="p-2 bg-amber-200-accent dark:bg-amber-400-accent text-grey-900 rounded-md font-medium font-serif"
				type="submit"
			>
				Start
			</button>
		</div>
	);
};

var result = null;

result = withUrqlClient(createUrqlWSClient, { ssr: true })(Lobby);
console.log(Date.now().toString());

export default result;
