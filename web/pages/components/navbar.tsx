import { NextPage } from "next";
import Link from "next/link";
import { AdjustmentsIcon, MoonIcon, SunIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import { useUserFromTokenQuery } from "../../generated/graphql";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";

const Navbar: NextPage = () => {
	const { data } = useUserFromTokenQuery();
	const [menu, setMenu] = useState(false);
	const [lightMode, setLightMode] = useState(
		localStorage.getItem("lightMode")
	);

	useEffect(() => {
		if (lightMode !== null) {
			if (lightMode === "true") {
				document.documentElement.classList.remove("dark");
				localStorage.setItem("lightMode", lightMode);
			} else {
				document.documentElement.classList.add("dark");
				localStorage.setItem("lightMode", lightMode);
			}
		} else {
			document.documentElement.classList.add("dark");
		}
	});

	return (
		<div className="font-bold font-serif">
			<nav className="flex gap-8 p-2 bg-amber-200-accent dark:bg-amber-400-accent text-grey-900">
				<div className="p-2 font-bold text-2xl">
					<Link href="/">WikiRacer</Link>
				</div>
				<div className="flex gap-4 ml-auto">
					<div className="p-2 bg-grey-100 dark:bg-grey-900 text-grey-900 dark:text-grey-100 rounded-md text-lg">
						<Link
							href={
								data?.userFromToken?.username
									? "/account"
									: "/login"
							}
						>
							{data?.userFromToken?.username
								? data.userFromToken?.username
								: "Login"}
						</Link>
					</div>
					{data?.userFromToken?.username ? (
						""
					) : (
						<div className="p-2 bg-grey-100 dark:bg-grey-900 text-grey-900 dark:text-grey-100 rounded-md text-lg">
							<Link href="/register">Register</Link>
						</div>
					)}
					<div className="p-2 bg-grey-100 dark:bg-grey-900 text-grey-900 dark:text-grey-100 rounded-md text-lg">
						<AdjustmentsIcon
							className="h-7 w-7 cursor-pointer"
							onClick={() => setMenu(!menu)}
						/>
					</div>
				</div>
			</nav>
			{menu ? (
				<div className="flex flex-col gap-4 z-10 absolute right-0 p-2 bg-amber-200-accent dark:bg-amber-400-accent text-grey-900">
					<div className="flex flex-row gap-2 p-2 bg-grey-100 dark:bg-grey-900 text-grey-900 dark:text-grey-100 rounded-md">
						<div>Dark Mode</div>
						{lightMode ? (
							<SunIcon
								className="h-6 w-6 cursor-pointer"
								onClick={() => setLightMode(!lightMode)}
							/>
						) : (
							<MoonIcon
								className="h-6 w-6 cursor-pointer"
								onClick={() => setLightMode(!lightMode)}
							/>
						)}
					</div>
				</div>
			) : (
				""
			)}
		</div>
	);
};

export default Navbar;
