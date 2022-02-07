import express from "express";
import { ___prod___ } from "./constants";
import { ApolloServer } from "apollo-server-express";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import UserResolver from "./resolvers/user";
import { MikroORM } from "@mikro-orm/core";
import mikroOrmConfig from "./mikro-orm.config";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import LobbyResolver from "./resolvers/lobby";
import cors from "cors";

const main = async () => {
	const orm = await MikroORM.init(mikroOrmConfig);
	await orm.getMigrator().up();

	const app = express();

	app.listen(4000, () => {
		console.log("server started on http://localhost:4000");
	});

	app.use(
		cors({
			origin: "http://localhost:3000",
			credentials: true,
		})
	);

	const apolloServer = new ApolloServer({
		schema: await buildSchema({
			resolvers: [UserResolver, LobbyResolver],
			validate: false,
		}),
		context: ({ req }) => {
			const context = {
				req,
				user: req.user, // `req.user` comes from `express-jwt`
				em: orm.em,
			};
			return context;
		},
		plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
	});
	await apolloServer.start();
	apolloServer.applyMiddleware({ app, cors: false });
};

main();
