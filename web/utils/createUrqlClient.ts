import { dedupExchange, fetchExchange } from "urql";
import { cacheExchange } from "@urql/exchange-graphcache";
import {
	CreateUserMutation,
	LoginUserMutation,
	UserFromTokenDocument,
	UserFromTokenQuery,
} from "../generated/graphql";
import { betterUpdateQuery } from "./betterUpdateQuery";
import { getCookie } from "cookies-next";

export const createUrqlClient = (ssrExchange: any) => ({
	url: "http://localhost:4000/graphql",
	fetchOptions: () => {
		const token = getCookie("accessToken");
		return {
			headers: { authorization: token ? `Bearer ${token}` : "" },
		};
	},
	exchanges: [
		dedupExchange,
		cacheExchange({
			updates: {
				Mutation: {
					login: (_result, args, cache, info) => {
						betterUpdateQuery<
							LoginUserMutation,
							UserFromTokenQuery
						>(
							cache,
							{ query: UserFromTokenDocument },
							_result,
							(result, query) => {
								if (result.loginUser?.errors) {
									return query;
								} else {
									return {
										userFromToken: result.loginUser?.user,
									};
								}
							}
						);
					},
					register: (_result, args, cache, info) => {
						betterUpdateQuery<
							CreateUserMutation,
							UserFromTokenQuery
						>(
							cache,
							{ query: UserFromTokenDocument },
							_result,
							(result, query) => {
								if (result.createUser?.errors) {
									return query;
								} else {
									return {
										userFromToken: result.createUser?.user,
									};
								}
							}
						);
					},
				},
			},
		}),
		ssrExchange,
		fetchExchange,
	],
});
