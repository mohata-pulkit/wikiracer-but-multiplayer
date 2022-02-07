import { NextPage } from "next";
import Link from "next/link";
import React from "react";

const Footer: NextPage = () => {
	return (
		<footer className="h-auto border-t-[1px] border-amber-200-accent dark:border-amber-400-accent absolute bottom-0 w-full text-xs p-1">
			<div className="text-center text-gray-500">
				{"made with ❤️ by "}
				<Link href="https://github.com/mohata-pulkit">
					pulkit mohata
				</Link>
			</div>
		</footer>
	);
};

export default Footer;
