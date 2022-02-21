import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { getCookie } from "cookies-next";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import { Layout } from "./components/layout";
import { WebSocketLink } from "@apollo/client/link/ws";
import { split, HttpLink } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import ws from "ws";

const token = getCookie("accessToken");

const httpLink = new HttpLink({
	uri: "http://localhost:4000/graphql",
	headers: {
		authorization: token ? `Bearer ${token}` : "",
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

const client = new ApolloClient({
	ssrMode: false,
	link: splitLink,
	cache: new InMemoryCache(),
	headers: {
		authorization: token ? `Bearer ${token}` : "",
	},
});

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ApolloProvider client={client}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</ApolloProvider>
	);
}

export default MyApp;
