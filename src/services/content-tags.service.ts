import { ContentTag, Prisma } from "@prisma/client";
import { context } from "../graphql/context";

type CreateTagInput = Prisma.ContentTagCreateInput & { id?: number };
type SearchTagInput = Pick<CreateTagInput, "name" | "description">;
type TagByIdInput = Pick<ContentTag, "id">;
const { ContentTags: Tags } = context;

/** create multiple content tags */
export async function createMultipleTags(data: CreateTagInput[]) {
  return Tags.createMany({ data });
}

/** create content tag */
export async function upsertTag(data: CreateTagInput) {
  return Tags.upsert({
    create: data,
    update: data,
    where: { id: data.id }
  });
}

/** find all content tags matching params */
export async function findAllTags(where: Partial<SearchTagInput>) {
  const params: Prisma.ContentTagFindManyArgs = { where: {} };
  ["name", "description"].forEach((k) => {
    if (where[k]) params.where![k] = { contains: where[k] };
  });

  return Tags.findMany(params);
}

/** find one content tag matching params */
export async function getTag(where: TagByIdInput) {
  return Tags.findUnique({ where });
}

/** delete content tag matching params */
export async function deleteTag(where: TagByIdInput) {
  const exists = await getTag(where);
  if (!exists) return null;
  await Tags.delete({ where });
  return exists;
}
