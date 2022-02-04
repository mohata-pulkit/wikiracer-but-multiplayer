import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider, createClient } from "urql";
import { getCookie } from "cookies-next";

const client = createClient({
	url: "http://localhost:4000/graphql",
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
			<Component {...pageProps} />
		</Provider>
	);
}

export default MyApp;
