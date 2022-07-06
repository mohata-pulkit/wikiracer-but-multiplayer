import { NextPage } from "next";
import Game from "./components/game";
import * as graphql from "../generated/graphql";

const Race: NextPage = () => {
	function SafeHydrate({ children }: any) {
		return (
			<div suppressHydrationWarning>
				{typeof window === "undefined" ? null : children}
			</div>
		);
	}

	const { data: lobby } = graphql.useLobbyFromTokenQuery();

	return (
		<div className="m-8 p-4 border-2 border-grey-900 dark:border-grey-100 rounded-md w-fit">
			<div className="p-4 flex flex-row w-full gap-4 justify-center">
				<div className="p-2 flex flex-col items-center">
					<div className="font-sans font-medium text-center">
						Start From
					</div>
					<div className="font-serif font-bold text-2xl text-center">
						{lobby?.lobbyFromToken?.startArticle}
					</div>
				</div>
				<div className="p-2 flex flex-col items-center">
					<div className="font-sans font-medium text-center">
						End At
					</div>
					<div className="font-serif font-bold text-2xl text-center">
						{lobby?.lobbyFromToken?.endArticle}
					</div>
				</div>
			</div>
			<SafeHydrate>
				<Game />
			</SafeHydrate>
		</div>
	);
};

export default Race;
