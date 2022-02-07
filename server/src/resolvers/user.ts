// import { User } from "src/entities/User";
// import { Arg, Mutation, Resolver } from "type-graphql";
// import argon2 from "argon2";
// import { getConnection } from "typeorm";
// @Resolver(User)
// export class UserResolver {
//   @Mutation(() => UserResponse)
//   async register(
//     @Arg("options") options: UsernamePasswordInput,
    
//   ): Promise<UserResponse> {
//     const errors = validateRegister(options);
//     if (errors) {
//       return { errors };
//     }

//     const hashedPassword = await argon2.hash(options.password);
//     let user;
//     try {
//       // User.create({}).save()
//       const result = await getConnection()
//         .createQueryBuilder()
//         .insert()
//         .into(User)
//         .values({
//           username: options.username,
//           email: options.email,
//           password: hashedPassword,
//         })
//         .returning("*")
//         .execute();
//       user = result.raw[0];
//     } catch (err) {
//       //|| err.detail.includes("already exists")) {
//       // duplicate username error
//       if (err.code === "23505") {
//         return {
//           errors: [
//             {
//               field: "username",
//               message: "username already taken",
//             },
//           ],
//         };
//       }
//     }

//     // store user id session
//     // this will set a cookie on the user
//     // keep them logged in
//     req.session.userId = user.id;

//     return { user };
//   }

//   @Mutation(() => UserResponse)
//   async login(
//     @Arg("usernameOrEmail") usernameOrEmail: string,
//     @Arg("password") password: string,
//     @Ctx() { req }: MyContext
//   ): Promise<UserResponse> {
//     const user = await User.findOne(
//       usernameOrEmail.includes("@")
//         ? { where: { email: usernameOrEmail } }
//         : { where: { username: usernameOrEmail } }
//     );
//     if (!user) {
//       return {
//         errors: [
//           {
//             field: "usernameOrEmail",
//             message: "that username doesn't exist",
//           },
//         ],
//       };
//     }
//     const valid = await argon2.verify(user.password, password);
//     if (!valid) {
//       return {
//         errors: [
//           {
//             field: "password",
//             message: "incorrect password",
//           },
//         ],
//       };
//     }

//     req.session.userId = user.id;

//     return {
//       user,
//     };
//   }
// }
