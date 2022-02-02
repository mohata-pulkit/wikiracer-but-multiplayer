import { InputType, Field } from "type-graphql";
@InputType()
export class createUserInput {
	@Field()
	email: string;
	@Field()
	username: string;
	@Field()
	password: string;
}

@InputType()
export class loginUserInput {
	@Field()
	emailOrUsername: string;
	@Field()
	password: string;
}
