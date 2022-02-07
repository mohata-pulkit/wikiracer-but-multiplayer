import { NextPage } from "next";
import { useUserFromTokenQuery } from "../generated/graphql";

export const account: NextPage = () => {
	var user = () => {
		const [{ data }] = useUserFromTokenQuery();
		return data;
	};
	return (
		<div>
			<div className="flex-col flex gap-4 p-4 mx-4 md:mx-auto my-4 border-2 bg-grey-200 dark:bg-grey-800 border-grey-900 dark:border-grey-100 rounded-md w-auto md:w-1/2 lg:w-1/3">
				<div className="h-fit">
					<p className="font-serif font-bold text-4xl text-center">
						Account Details
					</p>
				</div>
				<div className="grid grid-cols-2">
					<div>Name</div>
					<div className="break-all">
						{user()?.userFromToken?.username}
					</div>
				</div>
				<div className="grid grid-cols-2">
					<div>Email</div>
					<div className="break-all">
						{user()?.userFromToken?.email}
					</div>
				</div>
				<div className="grid grid-cols-2">
					<div>ELO</div>
					<div className="break-all">
						{user()?.userFromToken?.elo}
					</div>
				</div>
			</div>
		</div>
	);
};

export default account;
