import { verify } from "jsonwebtoken";
import { MiddlewareFn } from "type-graphql";
import { MyContext } from "./types";

export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
	const authorization = context.req.headers["authorization"];
	console.log(authorization);
	if (!authorization) {
		throw new Error("Not authenticated");
	}

	try {
		const token = authorization;
		const payload = verify(token, "hamrosianmaneavour");
		console.log(payload);
		context.payload = payload as any;
	} catch (err) {
		console.log(err);
		throw new Error("Not authenticated");
	}
	return next();
};
