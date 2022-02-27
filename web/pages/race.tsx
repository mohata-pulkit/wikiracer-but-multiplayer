import { NextPage } from "next";
import Game from "./components/game";

const Race: NextPage = () => {
	function SafeHydrate({ children }: any) {
		return (
			<div suppressHydrationWarning>
				{typeof window === "undefined" ? null : children}
			</div>
		);
	}
	return (
		<div className="m-8 p-4 border-2 border-grey-900 dark:border-grey-100 rounded-md w-fit">
			<SafeHydrate>
				<Game />
			</SafeHydrate>
		</div>
	);
};

export default Race;
