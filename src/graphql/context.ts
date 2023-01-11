import { PrismaClient, User } from "@prisma/client";

export type CtxUser = Pick<User, "id" | "role" | "lastSeen">;
export interface DBContext {
  Books: PrismaClient["book"];
  BookTags: PrismaClient["bookTag"];
  ContentTags: PrismaClient["contentTag"];
  Reporters: PrismaClient["reporter"];
  Users: PrismaClient["user"];
  Videos: PrismaClient["video"];
  VideoTags: PrismaClient["videoTag"];
  user?: CtxUser;
}


const db = new PrismaClient();
export const context: DBContext = {
  Books: db.book,
  BookTags: db.bookTag,
  ContentTags: db.contentTag,
  Reporters: db.reporter,
  Users: db.user,
  Videos: db.video,
  VideoTags: db.videoTag
};
