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
export class AuthToken {
	@Field(() => Int, { nullable: true })
	uuid?: string;
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
	@Field(() => String, { nullable: true })
	accesstoken?: string;

	@Field(() => [FieldError], { nullable: true })
	errors?: FieldError[];
}

export default class UserResolver {
	@Query(() => [User])
	users(@Ctx() { em }: MyContext): Promise<User[]> {
		return em.find(User, {});
	}

	@Query(() => UserResponse, { nullable: true })
	user(@Arg("uuid", () => String) uuid: string, @Ctx() { em }: MyContext) {
		const user = em.findOne(User, { uuid });

		if (!user) {
			const response = new UserResponse();
			response.errors = [
				{
					field: "id",
					message: "no such user found",
				},
			];

			return response;
		}

		return {
			user: user,
		};
	}

	@Mutation(() => LoginResponse, { nullable: true })
	async createUser(
		@Arg("options", () => createUserInput)
		options: createUserInput,
		@Ctx()
		{ em }: MyContext
	): Promise<LoginResponse> {
		var errors = validateRegister(options);

		const preexistingUsername = await em.findOne(User, {
			username: options.username,
		});

		if (preexistingUsername) {
			errors = [
				{
					field: "username",
					message: "that username is already taken",
				},
			];
		}

		const preexistingEmail = await em.findOne(User, {
			email: options.email,
		});

		if (preexistingEmail) {
			errors = [
				{
					field: "email",
					message: "an account with that email already exists",
				},
			];
		}

		if (!errors) {
			const hash = await argon2.hash(options.password);

			const user = em.create(User, {
				username: options.username,
				password: hash,
				email: options.email,
			});
			await em.persistAndFlush(user);

			const authtoken = new AuthToken();

			authtoken.uuid = user.uuid;

			return {
				accesstoken: sign(
					{
						authtoken,
					},
					"hamrosianmaneavour",
					{
						expiresIn: "1h",
						issuer: "https://www.wikiracer.io",
					}
				),
			};
		} else {
			return {
				errors: errors,
			};
		}
	}
	@Mutation(() => LoginResponse, { nullable: true })
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
				errors: [
					{
						field: "usernameOrEmail",
						message: "that username doesn't exist",
					},
				],
			};
		}
		const valid = await argon2.verify(user.password, options.password);
		if (!valid) {
			return {
				errors: [
					{
						field: "password",
						message: "incorrect password",
					},
				],
			};
		}

		const authtoken = new AuthToken();

		authtoken.uuid = user.uuid;

		return {
			accesstoken: sign(
				{
					authtoken,
				},
				"hamrosianmaneavour",
				{
					expiresIn: "1h",
					issuer: "https://www.wikiracer.io",
				}
			),
		};
	}

	@Query(() => AuthToken, { nullable: true })
	@UseMiddleware(isAuth)
	async authenticateUser(
		@Ctx() payload: MyContext
	): Promise<AuthToken | undefined> {
		if (payload === null) {
			return undefined;
		} else {
			return payload.payload;
		}
	}

	@Query(() => User, { nullable: true })
	@UseMiddleware(isAuth)
	async userFromToken(@Ctx() payload: MyContext): Promise<User | null> {
		if (payload === null) {
			var user = new User();
			user.username = "bruh";
			user.email = "hella";
			user.createdAt = new Date();
			user.updatedAt = new Date();
			user.password = "cringe";

			return user;
		} else {
			const uuid = payload.payload?.uuid;
			const user = await payload.em.findOne(User, { uuid });
			return user;
		}
	}
}
