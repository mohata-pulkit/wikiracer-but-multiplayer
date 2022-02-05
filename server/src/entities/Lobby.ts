import { Entity, Property, PrimaryKey } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";
import { v4 } from "uuid";

@ObjectType()
@Entity()
export class Lobby {
	@Field(() => String)
	@PrimaryKey({ type: "text" })
	uuid = v4();

	@Field(() => String)
	@Property({ type: "date" })
	createdAt = new Date();

	@Property({ type: "date", onUpdate: () => new Date() })
	updatedAt = new Date();

	@Field(() => [String])
	@Property({ type: "text[]" })
	users: string[];

	@Field(() => String)
	@Property({ type: "text", nullable: true })
	startArticle: string;

	@Field(() => String)
	@Property({ type: "text", nullable: true })
	endArticle: string;

	@Field(() => [String])
	@Property({ type: "text[]", nullable: true })
	options: string[];
}
