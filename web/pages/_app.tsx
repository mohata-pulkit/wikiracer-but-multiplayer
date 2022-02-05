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
} from "../generated/graphql";

import { createClient, dedupExchange, fetchExchange, Provider } from "urql";
import {
	Cache,
	cacheExchange,
	query,
	QueryInput,
} from "@urql/exchange-graphcache";
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
	exchanges: [
		dedupExchange,
		cacheExchange({
			keys: {
				User: () => null,
			},
			updates: {
				Mutation: {
					login: (result, args, cache, info) => {
						betterUpdateQuery<
							LoginUserMutation,
							UserFromTokenQuery
						>(
							cache,
							{ query: UserFromTokenDocument },
							result,
							(_result, query) => {
								console.log(_result);
								if (_result.loginUser?.errors) {
									return query;
								} else {
									return {
										userFromToken: _result.loginUser?.user,
									};
								}
							}
						);
					},
					register: (result, args, cache, info) => {
						betterUpdateQuery<
							CreateUserMutation,
							UserFromTokenQuery
						>(
							cache,
							{ query: UserFromTokenDocument },
							result,
							(_result, query) => {
								if (_result.createUser?.errors) {
									return query;
								} else {
									return {
										userFromToken: _result.createUser?.user,
									};
								}
							}
						);
					},
				},
			},
		}),
		fetchExchange,
	],
	fetchOptions: () => {
		const token = getCookie("accessToken");
		return {
			headers: { authorization: token ? `Bearer ${token}` : "" },
		};
	},
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
