import {
	ApolloClient,
	ApolloProvider,
	DefaultOptions,
	InMemoryCache,
} from "@apollo/client";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import { Layout } from "./components/layout";
import { WebSocketLink } from "@apollo/client/link/ws";
import { split, HttpLink } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import ws from "ws";

function MyApp({ Component, pageProps }: AppProps) {
	if (typeof window !== "undefined") {
		const httpLink = new HttpLink({
			uri: "http://localhost:4000/graphql",
			headers: {
				authorization: localStorage.getItem("accessToken")
					? `Bearer ${localStorage.getItem("accessToken")}`
					: "",
			},
		});

		const wsLink = new WebSocketLink({
			uri: "ws://localhost:4000/graphql",
			options: {
				reconnect: true,
			},
			webSocketImpl: ws.WebSocket,
		});

		const splitLink = split(
			({ query }) => {
				const definition = getMainDefinition(query);
				return (
					definition.kind === "OperationDefinition" &&
					definition.operation === "subscription"
				);
			},
			wsLink,
			httpLink
		);

		const defaultOptions: DefaultOptions = {
			watchQuery: {
				fetchPolicy: "no-cache",
				errorPolicy: "ignore",
			},
			query: {
				fetchPolicy: "no-cache",
				errorPolicy: "all",
			},
		};

		const client = new ApolloClient({
			// defaultOptions: defaultOptions,
			ssrMode: true,
			link: splitLink,
			credentials: "include",
			cache: new InMemoryCache({ resultCaching: false }),
			headers: {
				Authorization: localStorage.getItem("accessToken")
					? `Bearer ${localStorage.getItem("accessToken")}`
					: "",
			},
		});
		return (
			<ApolloProvider client={client}>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</ApolloProvider>
		);
	} else {
		return null;
	}
}

export default MyApp;
