import { EntityManager, IDatabaseDriver, Connection } from "@mikro-orm/core";
import { Request, Response } from "express";
import { AuthToken } from "./resolvers/user";

export type MyContext = {
	em: EntityManager<IDatabaseDriver<Connection>>;
	req: Request;
	res: Response;
	payload?: AuthToken;
};
