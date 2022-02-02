import { verify } from "jsonwebtoken";
import { MiddlewareFn } from "type-graphql";
import { AuthToken } from "./resolvers/user";
import { MyContext } from "./types";

export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
	const authorization = context.req.headers["authorization"];
	if (!authorization) {
		throw new Error("Not authenticated");
	}

	try {
		const token = authorization;
		const payload = verify(token, "hamrosianmaneavour", {
			complete: true,
		}).payload;
		context.payload = {
			id: (<any>payload).authtoken.id,
		} as AuthToken;
	} catch (err) {
		console.log(err);
		throw new Error("Not authenticated");
	}
	return next();
};
