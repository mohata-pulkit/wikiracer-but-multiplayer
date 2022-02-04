import type { NextPage } from "next";
import { useUserFromTokenQuery } from "../generated/graphql";

const Home: NextPage = () => {
	const [{ data }] = useUserFromTokenQuery();
	return (
		<div>
			<p>{data?.userFromToken?.username}</p>
			<p>{data?.userFromToken?.elo}</p>
			<p>{data?.userFromToken?.email}</p>
		</div>
	);
};

export default Home;
