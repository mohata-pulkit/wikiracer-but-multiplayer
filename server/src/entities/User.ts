import { Entity, Property, PrimaryKey, BigIntType } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";
import { v4 } from "uuid";

@ObjectType()
@Entity()
export class User {
	@Field(() => String)
	@PrimaryKey({ type: "text" })
	uuid = v4();

	@Field(() => String)
	@Property({ type: "date" })
	createdAt = new Date();

	@Property({ type: "date", onUpdate: () => new Date() })
	updatedAt = new Date();

	@Field(() => String)
	@Property({ type: "text" })
	username: string;

	@Field(() => String)
	@Property({ type: "text" })
	email: string;

	@Property({ type: "text" })
	password: string;

	@Field(() => Int)
	@Property({ type: BigIntType, default: 12000 })
	elo: number;
}
