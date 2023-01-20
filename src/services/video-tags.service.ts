import { ContentTag, Prisma } from "@prisma/client";
import { context } from "../graphql/context";
import { falsy } from "./utils";

export type CreateTagInput = Prisma.VideoTagUncheckedCreateInput & {
  id?: number;
};
export type SearchTagInput = Pick<
  CreateTagInput,
  "reporterId" | "tagId" | "videoId" | "status"
>;
export type TagByIdInput = Pick<ContentTag, "id">;
const { VideoTags: Tags } = context;

/** create multiple video tags */
export async function upsertVideoTags(data: CreateTagInput[]) {
  return Promise.all(
    data.map((d) =>
      falsy.includes(d.id)
        ? Tags.create({ data: d })
        : Tags.update({ data: d, where: { id: d.id } })
    )
  );
}

/** create single video tag */
export async function upsertVideoTag(data: CreateTagInput) {
  const result = await upsertVideoTags([data]);
  return result[0];
}

/** find all video tags matching params */
export async function findAllVideoTags(where: Partial<SearchTagInput>) {
  return Tags.findMany({ where });
}

/** find one video tag matching params */
export async function getVideoTag(where: TagByIdInput) {
  return Tags.findUnique({ where });
}

/** delete video tag matching params */
export async function deleteVideoTag(where: TagByIdInput) {
  const exists = await getVideoTag(where);
  if (!exists) return null;
  await Tags.delete({ where });
  return exists;
}
