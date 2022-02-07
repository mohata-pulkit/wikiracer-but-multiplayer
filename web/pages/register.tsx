import React from "react";
import { Formik, Form, Field } from "formik";
import * as graphql from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { setCookies } from "cookies-next";
import { useRouter } from "next/router";
import { NextPage } from "next";

const register: NextPage = () => {
	const [, createUser] = graphql.useCreateUserMutation();
	const router = useRouter();
	return (
		<Formik
			initialValues={{ username: "", password: "", email: "" }}
			onSubmit={async (values, { setErrors }) => {
				const response = await createUser(values);
				if (response.data?.createUser?.errors) {
					setErrors(toErrorMap(response.data.createUser.errors));
				} else {
					setCookies(
						"accessToken",
						response.data?.createUser?.accesstoken
					);
					router.push("/");
				}
			}}
		>
			{({ errors }) => (
				<Form className="flex-col flex gap-4 p-4 mx-4 md:mx-auto my-4 border-2 bg-grey-200 dark:bg-grey-800 border-grey-900 dark:border-grey-100 rounded-md w-auto md:w-1/2 lg:w-1/3">
					<div className="h-fit">
						<p className="font-serif font-bold text-4xl text-center">
							Create an Account
						</p>
					</div>
					<div className="grid grid-cols-3">
						<label htmlFor="username" className="p-2 font-medium">
							Username
							<p className="text-xs text-red-200-accent">
								{errors.username ? errors.username : "\xa0"}
							</p>
						</label>
						<Field
							id="username"
							name="username"
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

					<div className="grid grid-cols-3">
						<label htmlFor="email" className="p-2 font-medium">
							Email
							<p className="text-xs text-red-200-accent">
								{errors.email ? errors.email : "\xa0"}
							</p>
						</label>
						<Field
							id="email"
							name="email"
							placeholder="john@acme.com"
							type="email"
							className="col-span-2 bg-transparent border-2 border-grey-900 dark:border-grey-100 p-2 rounded-md"
						/>
					</div>

					<button
						className="p-2 bg-amber-200-accent dark:bg-amber-400-accent text-grey-900 rounded-md font-medium font-serif"
						type="submit"
					>
						Register
					</button>
				</Form>
			)}
		</Formik>
	);
};

export default register;
