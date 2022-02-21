import { dedupExchange, fetchExchange } from "urql";
import { subscriptionExchange } from "urql";
import { cacheExchange } from "@urql/exchange-graphcache";

import { createClient as createWSClient } from "graphql-ws";
import {
	CreateUserMutation,
	EditUserMutation,
	LoginUserMutation,
	UserFromTokenDocument,
	UserFromTokenQuery,
} from "../generated/graphql";
import { betterUpdateQuery } from "./betterUpdateQuery";
import { getCookie } from "cookies-next";
import { WebSocket } from "ws";

const wsClient = createWSClient({
	url: "ws://localhost:4000/graphql",
	webSocketImpl: WebSocket,
});

export const createUrqlWSClient = (ssrExchange: any) => ({
	url: "http://localhost:4000/graphql",
	fetchOptions: () => {
		const token = getCookie("accessToken");
		return {
			headers: { authorization: token ? `Bearer ${token}` : "" },
			credentials: "include" as const,
		};
	},
	exchanges: [
		dedupExchange,
		cacheExchange({
			updates: {
				Mutation: {
					loginUser: (_result, args, cache, info) => {
						betterUpdateQuery<
							LoginUserMutation,
							UserFromTokenQuery
						>(
							cache,
							{ query: UserFromTokenDocument },
							_result,
							(result, query) => {
								if (result.loginUser) {
									if (result.loginUser.errors) {
										return query;
									} else {
										return {
											userFromToken:
												result.loginUser.user,
										};
									}
								} else {
									return query;
								}
							}
						);
					},
					createUser: (_result, args, cache, info) => {
						betterUpdateQuery<
							CreateUserMutation,
							UserFromTokenQuery
						>(
							cache,
							{ query: UserFromTokenDocument },
							_result,
							(result, query) => {
								if (result.createUser) {
									if (result.createUser.errors) {
										return query;
									} else {
										return {
											userFromToken:
												result.createUser.user,
										};
									}
								} else {
									return query;
								}
							}
						);
					},
					editUser: (_result, args, cache, info) => {
						betterUpdateQuery<EditUserMutation, UserFromTokenQuery>(
							cache,
							{ query: UserFromTokenDocument },
							_result,
							(result, query) => {
								if (result.editUser) {
									if (result.editUser.errors) {
										return query;
									} else {
										return {
											userFromToken: result.editUser.user,
										};
									}
								} else {
									return query;
								}
							}
						);
					},
				},
			},
		}),
		fetchExchange,

		ssrExchange,
		subscriptionExchange({
			forwardSubscription(operation) {
				return {
					subscribe: (sink) => {
						const dispose = wsClient.subscribe(operation, sink);
						return {
							unsubscribe: dispose,
						};
					},
				};
			},
		}),
	],
});
