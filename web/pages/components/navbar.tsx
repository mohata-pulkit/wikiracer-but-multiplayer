import { NextPage } from "next";
import Link from "next/link";
import React, { useEffect } from "react";
import { useQuery } from "urql";
import {
	useUserFromTokenQuery,
	useLobbyFromTokenQuery,
	UserFromTokenQuery,
	LobbyFromTokenQuery,
	UserFromTokenDocument,
} from "../../generated/graphql";

interface navbarProps {}

const Navbar: NextPage = () => {
	const [{ data }] = useUserFromTokenQuery();

	return (
		<nav className="flex gap-8 p-2 bg-amber-200-accent dark:bg-amber-400-accent text-grey-900 font-medium font-serif">
			<div className="p-2">WikiRacer</div>
			<div className="flex gap-4 ml-auto">
				<div className="p-2 bg-grey-100 dark:bg-grey-900 text-grey-900 dark:text-grey-100 rounded-md">
					<Link href={data?.userFromToken?.username ? "/" : "/login"}>
						{data?.userFromToken?.username
							? data.userFromToken?.username
							: "Login"}
					</Link>
				</div>
				{data?.userFromToken?.username ? (
					""
				) : (
					<div className="p-2 bg-grey-100 dark:bg-grey-900 text-grey-900 dark:text-grey-100 rounded-md">
						<Link href="/register">Register</Link>
					</div>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
