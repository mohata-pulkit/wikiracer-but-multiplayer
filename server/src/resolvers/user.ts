import { User } from "../entities/User";
import { isAuth } from "../isAuth";
import {
	Arg,
	Ctx,
	Int,
	Mutation,
	ObjectType,
	Query,
	Field,
	UseMiddleware,
} from "type-graphql";
import { MyContext } from "src/types";
import { loginUserInput, createUserInput } from "./UsernamePasswordInput";
import * as argon2 from "argon2";
import { sign } from "jsonwebtoken";

const validateRegister = (options: createUserInput) => {
	if (!options.email.includes("@")) {
		return [
			{
				field: "email",
				message: "invalid email",
			},
		];
	}

	if (options.username.length <= 2) {
		return [
			{
				field: "username",
				message: "length must be greater than 2",
			},
		];
	}

	if (options.username.includes("@")) {
		return [
			{
				field: "username",
				message: "cannot include an @",
			},
		];
	}

	if (options.password.length <= 2) {
		return [
			{
				field: "password",
				message: "length must be greater than 2",
			},
		];
	}

	return undefined;
};

@ObjectType()
class FieldError {
	@Field()
	field: string;
	@Field()
	message: string;
}

@ObjectType()
class UserResponse {
	@Field(() => [FieldError], { nullable: true })
	errors?: FieldError[];

	@Field(() => User, { nullable: true })
	user?: User;
}

@ObjectType()
class LoginResponse {
	@Field()
	accesstoken?: string;
}

export default class UserResolver {
	@Query(() => [User])
	users(@Ctx() { em }: MyContext): Promise<User[]> {
		return em.find(User, {});
	}

	@Query(() => User, { nullable: true })
	user(
		@Arg("id", () => Int) id: number,
		@Ctx() { em }: MyContext
	): Promise<User | null> {
		return em.findOne(User, { id });
	}

	@Mutation(() => UserResponse, { nullable: true })
	async createUser(
		@Arg("options", () => createUserInput)
		options: createUserInput,
		@Ctx()
		{ em }: MyContext
	): Promise<UserResponse> {
		const errors = validateRegister(options);

		const preexistingUsername = await em.findOne(User, {
			username: options.username,
		});

		if (preexistingUsername) {
			return {
				errors: [
					{
						field: "username",
						message: "that username is already taken",
					},
				],
			};
		}

		const preexistingEmail = await em.findOne(User, {
			email: options.email,
		});

		if (preexistingEmail) {
			return {
				errors: [
					{
						field: "email",
						message: "an account with that email already exists",
					},
				],
			};
		}

		const hash = await argon2.hash(options.password);

		const user = em.create(User, {
			username: options.username,
			password: hash,
			email: options.email,
		});
		await em.persistAndFlush(user);

		return {
			user: user,
			errors: errors,
		};
	}
	@Query(() => LoginResponse, { nullable: true })
	async loginUser(
		@Arg("options", () => loginUserInput)
		options: loginUserInput,
		@Ctx()
		{ em }: MyContext
	): Promise<LoginResponse> {
		var whereQuery = null;
		if (options.emailOrUsername.includes("@")) {
			whereQuery = { email: options.emailOrUsername };
		} else {
			whereQuery = { username: options.emailOrUsername };
		}

		const user = await em.findOne(User, whereQuery);
		if (!user) {
			return {
				accesstoken: sign(
					{
						errors: [
							{
								field: "usernameOrEmail",
								message: "that username doesn't exist",
							},
						],
					},
					"hamrosianmaneavour"
				),
			};
		}
		const valid = await argon2.verify(user.password, options.password);
		if (!valid) {
			return {
				accesstoken: sign(
					{
						errors: [
							{
								field: "password",
								message: "incorrect password",
							},
						],
					},
					"hamrosianmaneavour"
				),
			};
		}
		return {
			accesstoken: sign(
				{
					user,
				},
				"hamrosianmaneavour"
			),
		};
	}

	@Query(() => Boolean)
	@UseMiddleware(isAuth)
	async authenticateUser(@Ctx() payload: MyContext): Promise<Boolean> {
		if (payload === null) {
			return false;
		} else {
			return true;
		}
	}
}
