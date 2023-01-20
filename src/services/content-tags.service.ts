import { ContentTag, Prisma } from "@prisma/client";
import { context } from "../graphql/context";
import { falsy } from "./utils";

export type CreateTagInput = Prisma.ContentTagCreateInput & { id?: number };
export type UpdateTagInput = Prisma.ContentTagUpdateArgs["data"];
export type SearchTagInput = Pick<CreateTagInput, "name" | "description">;
export type TagByIdInput = Pick<ContentTag, "id">;
const { ContentTags: Tags } = context;

/** create multiple content tags */
export async function upsertMultipleTags(data: CreateTagInput[]) {
  return await Promise.all(
    data.map((d) =>
      falsy.includes(d.id)
        ? Tags.create({ data: d })
        : Tags.update({ data: d, where: { id: d.id } })
    )
  );
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
