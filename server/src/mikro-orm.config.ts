import { ___prod___ } from "./constants";
import { User } from "./entities/User";
import { MikroORM } from "@mikro-orm/core";
import path from "path";

export default {
	migrations: {
		path: path.join(__dirname, "./migrations"), // path to the folder with migrations
		pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files
	},
	entities: [User],
	dbName: "wikiracer",
	type: "postgresql",
	debug: !___prod___,
	password: "admin",
} as Parameters<typeof MikroORM.init>[0];
