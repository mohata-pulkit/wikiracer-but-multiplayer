import { verify } from "jsonwebtoken";
import { MiddlewareFn } from "type-graphql";
import { AuthToken } from "./resolvers/AuthToken";
import { MyContext } from "./types";

export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
	const authorization = context.req.headers["authorization"]?.split(" ")[1];
	if (!authorization) {
		throw new Error("Not authenticated");
	}

	try {
		const token = authorization;
		const payload = verify(token, "hamrosianmaneavour", {
			complete: true,
		}).payload;
		context.payload = {
			uuidUser: (<any>payload).authtoken.uuidUser,
			uuidLobby: (<any>payload).authtoken.uuidLobby,
		} as AuthToken;
	} catch (err) {
		console.log(err);
		throw new Error("Not authenticated");
	}
	return next();
};
