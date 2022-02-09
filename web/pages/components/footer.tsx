import { NextPage } from "next";
import Link from "next/link";
import React from "react";

const Footer: NextPage = () => {
	const emojis = ["❤️", "🧡", "💛", "💚", "💙", "💜", "🤎"];
	length = emojis.length - 0.1;
	const rand = Math.floor(Math.random() * length);
	return (
		<footer className="h-auto border-t-[1px] bg-grey-100 dark:bg-grey-900 border-amber-200-accent dark:border-amber-400-accent fixed bottom-0 w-full text-xs p-1">
			<div className="text-center text-gray-500">
				{"made with " + emojis[rand] + " by "}
				<Link href="https://github.com/mohata-pulkit">
					pulkit mohata
				</Link>
			</div>
		</footer>
	);
};

export default Footer;
