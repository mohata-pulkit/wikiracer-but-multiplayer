import "../styles/globals.css";
import type { AppProps } from "next/app";
import { getCookie } from "cookies-next";

import {
	useUserFromTokenQuery,
	useLobbyFromTokenQuery,
	UserFromTokenDocument,
	Query,
	LoginUserMutation,
	UserFromTokenQuery,
	CreateUserMutation,
	EditUserMutation,
} from "../generated/graphql";

import { createClient, dedupExchange, fetchExchange, Provider } from "urql";
import { Cache, cacheExchange, QueryInput } from "@urql/exchange-graphcache";
import { Layout } from "./components/layout";

function betterUpdateQuery<Result, Query>(
	cache: Cache,
	qi: QueryInput,
	result: any,
	fn: (r: Result, q: Query) => Query
) {
	return cache.updateQuery(qi, (data) => fn(result, data as any) as any);
}

const client = createClient({
	url: "http://localhost:4000/graphql",
	fetchOptions: () => {
		const token = getCookie("accessToken");
		return {
			headers: { authorization: token ? `Bearer ${token}` : "" },
			credentials: "include",
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
	],
});

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Provider value={client}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</Provider>
	);
}

export default MyApp;
