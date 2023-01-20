import { ContentTag, Prisma } from "@prisma/client";
import { context } from "../graphql/context";
import { falsy } from "./utils";

export type CreateVideoInput = Prisma.VideoUncheckedCreateInput;
export type UpdateVideoInput = Prisma.ContentTagUpdateArgs["data"];
export type SearchVideoInput = Pick<
  CreateVideoInput,
  "title" | "status" | "reporterId" | "url" | "source"
>;
export type TagByIdInput = Pick<ContentTag, "id">;
const { Videos } = context;

/** create multiple videos */
export async function upsertMultipleVideos(data: CreateVideoInput[]) {
  return await Promise.all(
    data.map((d) =>
      falsy.includes(d.id)
        ? Videos.create({ data: d })
        : Videos.update({ data: d, where: { id: d.id } })
    )
  );
}

/** create video */
export async function upsertVideo(data: CreateVideoInput) {
  return Videos.upsert({
    create: data,
    update: data,
    where: { id: data.id }
  });
}

/** find all videos matching params */
export async function findAllVideos(where: Partial<SearchVideoInput>) {
  const validateStrLength = (str: string, len = 5) => {
    if (str.length < len) throw new Error("Search string is too short");
  };
  const select: Prisma.VideoFindManyArgs = { where: {} };
  const selectWhere: Prisma.Enumerable<Prisma.VideoWhereInput> = {
    title: undefined,
    status: undefined,
    source: undefined
  };
  if (where.title) {
    validateStrLength(where.title);
    selectWhere.title = { contains: where.title };
  }
  if (where.url) {
    validateStrLength(where.url);
    selectWhere.url = { contains: where.url };
  }
  if (where.status) selectWhere.status = where.status;
  if (where.source) selectWhere.source = where.source;
  if (where.reporterId) selectWhere.reporterId = where.reporterId;

  select.where = selectWhere;
  select.include = { VideoTag: true };
  return Videos.findMany(select);
}

/** find one video matching params */
export async function getVideo(where: TagByIdInput) {
  return Videos.findUnique({ where });
}

/** delete video matching params */
export async function deleteVideo(where: TagByIdInput) {
  const exists = await getVideo(where);
  if (!exists) return null;
  await Videos.delete({ where });
  return exists;
}
