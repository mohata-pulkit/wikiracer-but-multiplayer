import React, { useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as graphql from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { setCookies } from "cookies-next";
import { useRouter } from "next/router";
import { NextPage } from "next";

const login: NextPage = () => {
	const [, loginUser] = graphql.useLoginUserMutation();
	const router = useRouter();
	return (
		<Formik
			initialValues={{ usernameOrEmail: "", password: "" }}
			onSubmit={async (values, { setErrors }) => {
				const response = await loginUser({
					options: {
						emailOrUsername: values.usernameOrEmail,
						password: values.password,
					},
				});
				if (response.data?.loginUser?.errors) {
					setErrors(toErrorMap(response.data.loginUser.errors));
				} else {
					setCookies(
						"accessToken",
						response.data?.loginUser?.accesstoken
					);
					router.push("/");
				}
			}}
		>
			{({ errors }) => (
				<Form className="flex-col flex gap-4 p-4 mx-4 md:mx-auto my-8 border-2 bg-grey-200 dark:bg-grey-800 border-grey-900 dark:border-grey-100 rounded-md w-auto md:w-1/2 lg:w-1/3">
					<div className="h-fit">
						<p className="font-serif font-bold text-4xl text-center">
							Login to an Account
						</p>
					</div>
					<div className="grid grid-cols-3">
						<label
							htmlFor="usernameOrEmail"
							className="p-2 font-medium"
						>
							Username
							<p className="text-xs text-red-200-accent">
								{errors.usernameOrEmail
									? errors.usernameOrEmail
									: "\xa0"}
							</p>
						</label>
						<Field
							id="usernameOrEmail"
							name="usernameOrEmail"
							placeholder="Username"
							className="col-span-2 bg-transparent border-2 border-grey-900 dark:border-grey-100 p-2 rounded-md"
						/>
					</div>

					<div className="grid grid-cols-3">
						<label htmlFor="password" className="p-2 font-medium">
							Password
							<p className="text-xs text-red-200-accent">
								{errors.password ? errors.password : "\xa0"}
							</p>
						</label>
						<Field
							id="password"
							name="password"
							placeholder="Password"
							type="password"
							className="col-span-2 bg-transparent border-2 border-grey-900 dark:border-grey-100 p-2 rounded-md"
						/>
					</div>

					<button
						className="p-2 bg-amber-200-accent dark:bg-amber-400-accent text-grey-900 rounded-md font-medium font-serif"
						type="submit"
					>
						Login
					</button>
				</Form>
			)}
		</Formik>
	);
};

export default login;
