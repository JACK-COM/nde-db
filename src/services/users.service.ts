import { Prisma, User } from "@prisma/client";
import { DateTime } from "luxon";
import { context } from "graphql/context";

type CreateUserInput = Prisma.UserCreateInput;
type SearchUserInput = Pick<CreateUserInput, "email">;
type UserByIdInput = Pick<User, "id">;
const { Users: UserDB } = context;

/** create user record */
export async function upsertUser(newUser: CreateUserInput) {
  const today = DateTime.now().toISO();
  const data: CreateUserInput = {
    ...newUser,
    role: newUser.role || "researcher",
    created: today,
    lastSeen: today
  };

  ["email", "role"].forEach((k) => {
    if (!data[k]) throw new Error(`Missing required field ${k}`);
  });

  return UserDB.upsert({
    create: data,
    update: data,
    where: { email: newUser.email }
  });
}

/** find all user records matching params */
export async function findAllUser(where: SearchUserInput) {
  return UserDB.findMany({ where });
}

/** find one user record matching params */
export async function getUserById(where: UserByIdInput) {
  return UserDB.findUnique({ where });
}

/** delete user record matching params */
export function deleteUser(where: UserByIdInput) {
  return UserDB.delete({ where });
}
