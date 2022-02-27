import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class AuthToken {
	@Field(() => String, { nullable: true })
	uuidUser?: string;

	@Field(() => String, { nullable: true })
	uuidLobby?: string;

	@Field(() => String, { nullable: true })
	seed?: string;
}
