import { createServer } from "http";
import { WebSocketServer } from "ws";
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
import { useServer } from "graphql-ws/lib/use/ws";
import cors from "cors";

const main = async () => {
	const schema = await buildSchema({
		resolvers: [UserResolver, LobbyResolver],
		validate: false,
	});

	const orm = await MikroORM.init(mikroOrmConfig);
	await orm.getMigrator().up();

	const app = express();

	const httpServer = createServer(app);

	app.use(
		cors({
			origin: "http://localhost:3000",
			credentials: true,
		})
	);

	const apolloServer = new ApolloServer({
		schema: schema,
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

	const server = httpServer.listen(4000, () => {
		const wsServer = new WebSocketServer({
			server,
			path: "/graphql",
		});

		useServer({ schema }, wsServer);
		console.log("server started on http://localhost:4000");
	});
};

main();
