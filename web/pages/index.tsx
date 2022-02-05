import type { NextPage } from "next";
import {
	useLobbyFromTokenQuery,
	useUserFromTokenQuery,
} from "../generated/graphql";

const Home: NextPage = () => {
	var user = () => {
		const [{ data }] = useUserFromTokenQuery();
		return data;
	};
	var lobby = () => {
		const [{ data }] = useLobbyFromTokenQuery();
		return data;
	};
	return (
		<div>
			<p>{user()?.userFromToken?.username}</p>
			<p>{user()?.userFromToken?.elo}</p>
			<p>{user()?.userFromToken?.email}</p>
			<br></br>
			<p>{lobby()?.lobbyFromToken?.uuid}</p>
			<p>{lobby()?.lobbyFromToken?.users}</p>
		</div>
	);
};

export default Home;
