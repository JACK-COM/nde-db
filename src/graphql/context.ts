import { PrismaClient } from "@prisma/client";

export interface DBContext {
  db: PrismaClient;
  Books: PrismaClient["book"];
  BookTags: PrismaClient["bookTags"];
  ContentTags: PrismaClient["contentTag"];
  Reporters: PrismaClient["reporter"];
  Users: PrismaClient["user"];
  Videos: PrismaClient["video"];
  VideoTags: PrismaClient["videoTags"];
}

const db = new PrismaClient();

export const context: DBContext = {
  db,
  Books: db.book,
  BookTags: db.bookTags,
  ContentTags: db.contentTag,
  Reporters: db.reporter,
  Users: db.user,
  Videos: db.video,
  VideoTags: db.videoTags
};
