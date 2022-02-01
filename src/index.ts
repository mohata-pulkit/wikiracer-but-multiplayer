import express from "express";
import { ___prod___ } from "./constants";
import { ApolloServer } from "apollo-server-express";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import UserResolver from "./resolvers/user";
import { MikroORM } from "@mikro-orm/core";
import mikroOrmConfig from "./mikro-orm.config";

const main = async () => {
	const orm = await MikroORM.init(mikroOrmConfig);
	await orm.getMigrator().up();

	const app = express();
	app.listen(4000, () => {
		console.log("server started on localhost:4000");
	});

	const apolloServer = new ApolloServer({
		schema: await buildSchema({
			resolvers: [UserResolver],
			validate: false,
		}),
		context: { em: orm.em },
	});
	await apolloServer.start();
	apolloServer.applyMiddleware({ app });
};

main();
