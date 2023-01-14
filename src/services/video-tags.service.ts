import { ContentTag, Prisma } from "@prisma/client";
import { context } from "../graphql/context";

type CreateTagInput = Prisma.VideoTagUncheckedCreateInput & { id?: number };
type SearchTagInput = Pick<
  CreateTagInput,
  "reporterId" | "tagId" | "videoId" | "status"
>;
type TagByIdInput = Pick<ContentTag, "id">;
const { VideoTags: Tags } = context;

/** create multiple video tags */
export async function createMultipleTags(data: CreateTagInput[]) {
  return Tags.createMany({ data });
}

/** create video tag */
export async function upsertVideoTag(data: CreateTagInput) {
  return Tags.upsert({
    create: data,
    update: data,
    where: { id: data.id }
  });
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
