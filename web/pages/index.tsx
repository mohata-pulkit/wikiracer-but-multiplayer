import { createUrqlClient } from "../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";

import type { NextPage } from "next";

import Image from "next/image";

import Play from "./components/play";

const Home: NextPage = () => {
	return (
		<div className="flex flex-col items-center gap-4">
			<div className="w-full md:w-1/3 relative justify-center text-center align-middle">
				<Image
					src="/wikicat.png"
					height="480"
					width="480"
					layout="responsive"
				/>
			</div>
			<div>
				<h1 className="font-serif font-bold text-7xl text-center">
					WikiRacer
				</h1>
				<p className="font-sans font-bold text-base text-center">
					Competitive Wikipedia Speedrunning
				</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 p-8 gap-4">
				<div className="flex-col flex gap-4 p-4 mx-auto my-8 border-2 bg-grey-200 dark:bg-grey-800 border-grey-900 dark:border-grey-100 rounded-md w-fit">
					<div className="flex flex-col p-2 gap-2">
						<h2 className="text-3xl font-serif font-bold">
							What is WikiRacing?
						</h2>
						<p className="tracking-wide">
							Wikiracing is a game using Wikipedia, the online
							encyclopedia, which focuses on traversing links from
							one page to another. It has many different
							variations and names, including The Wikipedia Game,
							Wikipedia Maze, Wikispeedia, Wikiwars, Wikipedia
							Ball, Litner Ball, Wikipedia Racing, and Wikipedia
							Speedrunning.
						</p>
					</div>
					<div className="flex flex-col p-2">
						<h2 className="text-3xl font-serif font-bold">
							How do I get started?
						</h2>
						<p className="tracking-wide">
							It's simple. You start by creating an account using
							the "register" button in the top right corner. Then
							you can either use the matchmaking service to get
							connected in a 1v1 wikirace with another player, or
							you can create a custom game that your friends can
							join using the lobby key.
						</p>
					</div>
					<div className="flex flex-col p-2">
						<h2 className="text-3xl font-serif font-bold">
							Why do I need to make an account? Why cant I play
							using a nickname?
						</h2>
						<p className="tracking-wide">
							An account lets us track your skill at wikiracing
							and allows to improve your matchmaking. It also
							allows us to ensure that no robots are using the
							site. If you're concerned about data privacy you can
							read our privacy statement available here.
						</p>
					</div>
					<div className="flex flex-col p-2">
						<h2 className="text-3xl font-serif font-bold">
							I've seen other sites with similar concepts, what
							makes WikiRacer different?
						</h2>
						<p className="tracking-wide">
							Wikiracing is a very common game concept and many
							sites already exist that implement this. WikiRacer
							offers a competitive wikiracing experience, more
							akin to a esport than a casual game. It also (in our
							opinion) has the most diverse matchmaking and custom
							lobby options. Oh and also dark mode and cats 😼.
							WikiRacer is currently looking for nothing but
							competition!
						</p>
					</div>
				</div>
				<Play pageProps={""} />
			</div>
		</div>
	);
};

export default withUrqlClient(createUrqlClient)(Home);
