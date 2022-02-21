import { setCookies } from "cookies-next";
import { Field, Form, Formik } from "formik";
import * as graphql from "../generated/graphql";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useUserFromTokenQuery } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";

export const account: NextPage = () => {
	var user = () => {
		const { data } = useUserFromTokenQuery();
		return data;
	};
	const [editUser] = graphql.useEditUserMutation();
	const router = useRouter();
	var username = user()?.userFromToken?.username;
	var email = user()?.userFromToken?.email;

	return (
		<Formik
			initialValues={{
				username: username ? username : "",
				password: "",
				email: email ? email : "",
			}}
			onSubmit={async (values, { setErrors }) => {
				const response = await editUser({ variables: values });
				if (response.data?.editUser?.errors) {
					setErrors(toErrorMap(response.data.editUser.errors));
				} else {
					setCookies(
						"accessToken",
						response.data?.editUser?.accesstoken
					);
					router.push("/");
				}
			}}
		>
			{({ errors }) => (
				<Form className="flex-col flex gap-4 p-4 mx-4 md:mx-auto my-8 border-2 bg-grey-200 dark:bg-grey-800 border-grey-900 dark:border-grey-100 rounded-md w-auto md:w-1/2 lg:w-1/3">
					<div className="h-fit">
						<p className="font-serif font-bold text-4xl text-center">
							Account Details
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
							placeholder={user()?.userFromToken?.username}
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
							placeholder="*************"
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
							placeholder={user()?.userFromToken?.email}
							type="email"
							className="col-span-2 bg-transparent border-2 border-grey-900 dark:border-grey-100 p-2 rounded-md"
						/>
					</div>

					<div className="grid grid-cols-3">
						<div className="p-2 font-medium">ELO</div>
						<div className="col-span-2 bg-transparent p-2 rounded-md">
							{user()?.userFromToken?.elo}
						</div>
					</div>
					<button
						className="p-2 bg-amber-200-accent dark:bg-amber-400-accent text-grey-900 rounded-md font-medium font-serif"
						type="submit"
					>
						Update Details
					</button>
				</Form>
			)}
		</Formik>
	);
};

export default account;
