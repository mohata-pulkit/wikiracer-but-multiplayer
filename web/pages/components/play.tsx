import type { NextPage } from "next";
import * as graphql from "../../generated/graphql";
import {
	AcademicCapIcon,
	BeakerIcon,
	BookOpenIcon,
	CalculatorIcon,
	FilterIcon,
	GlobeIcon,
	LibraryIcon,
	LightningBoltIcon,
	LockClosedIcon,
	QuestionMarkCircleIcon,
	ScaleIcon,
	UserGroupIcon,
} from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import { setCookies } from "cookies-next";
import { useRouter } from "next/router";

const Play: NextPage = () => {
	const [sbmm, setSbmm] = useState(true);

	useEffect(() => {
		if (!sbmm) {
			document.getElementById("sbmm-grid")?.classList.add("hidden");
			document.getElementById("custom-flex")?.classList.remove("hidden");
			document
				.getElementById("sbmm")
				?.classList.remove("dark:bg-amber-400-accent");
			document
				.getElementById("sbmm")
				?.classList.remove("bg-amber-200-accent");
			document
				.getElementById("sbmm")
				?.classList.remove("dark:text-gray-900");
			document
				.getElementById("custom")
				?.classList.add("dark:bg-amber-400-accent");
			document
				.getElementById("custom")
				?.classList.add("bg-amber-200-accent");
			document
				.getElementById("custom")
				?.classList.add("dark:text-gray-900");
			document.getElementById("sbmm")?.classList.add("bg-grey-300");
			document.getElementById("sbmm")?.classList.add("dark:bg-grey-700");
			document.getElementById("custom")?.classList.remove("bg-grey-300");
			document
				.getElementById("custom")
				?.classList.remove("dark:bg-grey-700");
		} else {
			document.getElementById("sbmm-grid")?.classList.remove("hidden");
			document.getElementById("custom-flex")?.classList.add("hidden");
			document
				.getElementById("sbmm")
				?.classList.add("dark:bg-amber-400-accent");
			document
				.getElementById("sbmm")
				?.classList.add("bg-amber-200-accent");
			document
				.getElementById("sbmm")
				?.classList.add("dark:text-gray-900");
			document
				.getElementById("custom")
				?.classList.remove("dark:bg-amber-400-accent");
			document
				.getElementById("custom")
				?.classList.remove("bg-amber-200-accent");
			document
				.getElementById("custom")
				?.classList.remove("dark:text-gray-900");
			document.getElementById("sbmm")?.classList.remove("bg-grey-300");
			document
				.getElementById("sbmm")
				?.classList.remove("dark:bg-grey-700");
			document.getElementById("custom")?.classList.add("bg-grey-300");
			document
				.getElementById("custom")
				?.classList.add("dark:bg-grey-700");
		}
	});
	const [, createLobby] = graphql.useCreateLobbyMutation();
	const [, joinLobby] = graphql.useJoinLobbyMutation();
	const router = useRouter();
	return (
		<div className="flex-col flex gap-4 p-4 mx-auto my-8 border-2 bg-grey-200 dark:bg-grey-800 border-grey-900 dark:border-grey-100 rounded-md w-full">
			<div className="h-fit">
				<p className="font-serif font-bold text-4xl text-center">
					Start Racing!
				</p>
			</div>
			<div className="flex flex-col justify-center text-center align-middle p-2">
				<div className="flex flex-row gap-4">
					<div
						className="cursor-pointer w-full p-2 font-bold bg-amber-200-accent dark:bg-amber-400-accent dark:text-gray-900"
						id="sbmm"
						onClick={() => setSbmm(true)}
					>
						Matchmaking
					</div>
					<div
						className="cursor-pointer w-full p-2 font-bold bg-grey-300 dark:bg-grey-700"
						id="custom"
						onClick={() => setSbmm(false)}
					>
						Custom Game
					</div>
				</div>
				<div
					id="sbmm-grid"
					className="grid grid-cols-2 md:grid-cols-3 gap-2 p-2"
				>
					<div className="p-2 my-auto break-words h-32 w-full flex flex-col items-center justify-center border-2 bg-grey-100 dark:bg-grey-900 text-grey-900 dark:text-grey-100 rounded-md text-lg border-grey-700 dark:border-grey-300 font-bold font-serif hover:bg-amber-200-accent hover:dark:text-gray-900 hover:dark:bg-amber-400-accent">
						<QuestionMarkCircleIcon className="h-6 w-6" />
						Random Seed
					</div>
					<div className="p-2 my-auto break-words h-32 w-full flex flex-col items-center justify-center border-2 bg-grey-100 dark:bg-grey-900 text-grey-900 dark:text-grey-100 rounded-md text-lg border-grey-700 dark:border-grey-300 font-bold font-serif hover:bg-amber-200-accent hover:dark:text-gray-900 hover:dark:bg-amber-400-accent">
						<FilterIcon className="h-6 w-6" />
						Filtered Seed
					</div>
					<div className="p-2 my-auto break-words h-32 w-full flex flex-col items-center justify-center border-2 bg-grey-100 dark:bg-grey-900 text-grey-900 dark:text-grey-100 rounded-md text-lg border-grey-700 dark:border-grey-300 font-bold font-serif hover:bg-amber-200-accent hover:dark:text-gray-900 hover:dark:bg-amber-400-accent">
						<BookOpenIcon className="h-6 w-6" />
						Only Paragraphs
					</div>
					<div className="p-2 my-auto break-words h-32 w-full flex flex-col items-center justify-center border-2 bg-grey-100 dark:bg-grey-900 text-grey-900 dark:text-grey-100 rounded-md text-lg border-grey-700 dark:border-grey-300 font-bold font-serif hover:bg-amber-200-accent hover:dark:text-gray-900 hover:dark:bg-amber-400-accent">
						<UserGroupIcon className="h-6 w-6" />
						Living People
					</div>
					<div className="p-2 my-auto break-words h-32 w-full flex flex-col items-center justify-center border-2 bg-grey-100 dark:bg-grey-900 text-grey-900 dark:text-grey-100 rounded-md text-lg border-grey-700 dark:border-grey-300 font-bold font-serif hover:bg-amber-200-accent hover:dark:text-gray-900 hover:dark:bg-amber-400-accent">
						<CalculatorIcon className="h-6 w-6" />
						Math and Computing
					</div>
					<div className="p-2 my-auto break-words h-32 w-full flex flex-col items-center justify-center border-2 bg-grey-100 dark:bg-grey-900 text-grey-900 dark:text-grey-100 rounded-md text-lg border-grey-700 dark:border-grey-300 font-bold font-serif hover:bg-amber-200-accent hover:dark:text-gray-900 hover:dark:bg-amber-400-accent">
						<BeakerIcon className="h-6 w-6" />
						Natural Sciences
					</div>
					<div className="p-2 my-auto break-words h-32 w-full flex flex-col items-center justify-center border-2 bg-grey-100 dark:bg-grey-900 text-grey-900 dark:text-grey-100 rounded-md text-lg border-grey-700 dark:border-grey-300 font-bold font-serif hover:bg-amber-200-accent hover:dark:text-gray-900 hover:dark:bg-amber-400-accent">
						<AcademicCapIcon className="h-6 w-6" />
						Philosophy and Religion
					</div>
					<div className="p-2 my-auto break-words h-32 w-full flex flex-col items-center justify-center border-2 bg-grey-100 dark:bg-grey-900 text-grey-900 dark:text-grey-100 rounded-md text-lg border-grey-700 dark:border-grey-300 font-bold font-serif hover:bg-amber-200-accent hover:dark:text-gray-900 hover:dark:bg-amber-400-accent">
						<LibraryIcon className="h-6 w-6" />
						History
					</div>
					<div className="p-2 my-auto break-words h-32 w-full flex flex-col items-center justify-center border-2 bg-grey-100 dark:bg-grey-900 text-grey-900 dark:text-grey-100 rounded-md text-lg border-grey-700 dark:border-grey-300 font-bold font-serif hover:bg-amber-200-accent hover:dark:text-gray-900 hover:dark:bg-amber-400-accent">
						<GlobeIcon className="h-6 w-6" />
						Politics and Economics
					</div>
					<div className="p-2 my-auto break-words h-32 w-full flex flex-col items-center justify-center border-2 bg-grey-100 dark:bg-grey-900 text-grey-900 dark:text-grey-100 rounded-md text-lg border-grey-700 dark:border-grey-300 font-bold font-serif hover:bg-amber-200-accent hover:dark:text-gray-900 hover:dark:bg-amber-400-accent">
						<LightningBoltIcon className="h-6 w-6" />
						Video Games
					</div>
					<div className="p-2 my-auto break-words h-32 w-full flex flex-col items-center justify-center border-2 bg-grey-100 dark:bg-grey-900 text-grey-900 dark:text-grey-100 rounded-md text-lg border-grey-700 dark:border-grey-300 font-bold font-serif hover:bg-amber-200-accent hover:dark:text-gray-900 hover:dark:bg-amber-400-accent">
						<LockClosedIcon className="h-6 w-6" />
						NSFW
					</div>
					<div className="p-2 my-auto break-words h-32 w-full flex flex-col items-center justify-center border-2 bg-grey-100 dark:bg-grey-900 text-grey-900 dark:text-grey-100 rounded-md text-lg border-grey-700 dark:border-grey-300 font-bold font-serif hover:bg-amber-200-accent hover:dark:text-gray-900 hover:dark:bg-amber-400-accent">
						<ScaleIcon className="h-6 w-6" />
						Law
					</div>
				</div>
				<div
					className="flex flex-col justify-center gap-4 p-2 w-full"
					id="custom-flex"
				>
					<Formik
						initialValues={{ error: "" }}
						onSubmit={async ({}, { setErrors }) => {
							const response = await createLobby();
							if (response.data?.createLobby?.error) {
								setErrors({
									error: response.data.createLobby.error,
								});
							} else {
								setCookies(
									"accessToken",
									response.data?.createLobby?.accesstoken
								);
								router.push("/");
							}
						}}
					>
						{({ errors }) => (
							<Form>
								<div className="p-2 border-2 flex flex-col gap-1 bg-grey-100 dark:bg-grey-900 text-grey-900 dark:text-grey-100 rounded-md text-lg border-grey-700 dark:border-grey-300 font-bold font-serif">
									<label
										htmlFor="lobbyID"
										className="font-bold"
									>
										Create a Custom Game
										<p className="text-xs text-red-200-accent">
											{errors.error
												? errors.error
												: "\xa0"}
										</p>
									</label>
									<button
										type="submit"
										className="w-full p-2 bg-amber-200-accent dark:bg-amber-400-accent text-grey-900 rounded-md font-bold text-lg font-serif"
									>
										Create
									</button>
								</div>
							</Form>
						)}
					</Formik>
					<Formik
						initialValues={{ lobbyID: "" }}
						onSubmit={async (values, { setErrors }) => {
							const response = await joinLobby(values);
							if (response.data?.joinLobby?.error) {
								setErrors({
									lobbyID: response.data.joinLobby.error,
								});
							} else {
								setCookies(
									"accessToken",
									response.data?.joinLobby?.accesstoken
								);
								router.push("/");
							}
						}}
					>
						{({ errors }) => (
							<Form>
								<div className="p-2 border-2 flex flex-col gap-1 bg-grey-100 dark:bg-grey-900 text-grey-900 dark:text-grey-100 rounded-md text-lg border-grey-700 dark:border-grey-300 font-bold font-serif">
									<label
										htmlFor="lobbyID"
										className="font-bold"
									>
										Join a Custom Game
										<p className="text-xs text-red-200-accent">
											{errors.lobbyID
												? errors.lobbyID
												: "\xa0"}
										</p>
									</label>
									<Field
										id="lobbyID"
										name="lobbyID"
										placeholder="lobbyID"
										className="w-full bg-transparent border-2 border-grey-900 dark:border-grey-100 p-2 rounded-md text-lg"
									></Field>

									<button
										type="submit"
										className="w-full p-2 bg-amber-200-accent dark:bg-amber-400-accent text-grey-900 rounded-md font-bold text-lg font-serif"
									>
										Join
									</button>
								</div>
							</Form>
						)}
					</Formik>
				</div>
			</div>
		</div>
	);
};

export default Play;
