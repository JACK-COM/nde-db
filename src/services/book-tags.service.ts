import { BookTag, Prisma } from "@prisma/client";
import { context } from "../graphql/context";
import { falsy } from "./utils";

type CreateTagInput = Prisma.BookTagUncheckedCreateInput & { id?: number };
type SearchTagInput = Pick<
  CreateTagInput,
  "bookId" | "reporterId" | "tagId" | "status"
>;
type TagByIdInput = Pick<BookTag, "id">;
const { BookTags: Tags } = context;

/** create multiple book tags */
export async function createMultipleTags(data: CreateTagInput[]) {
  return await Promise.all(
    data.map((d) =>
      falsy.includes(d.id)
        ? Tags.create({ data: d })
        : Tags.update({ data: d, where: { id: d.id } })
    )
  );
}

/** create book tag */
export async function upsertBookTag(data: CreateTagInput) {
  return Tags.upsert({ create: data, update: data, where: { id: data.id } });
}

/** find all book tags matching params */
export async function findAllBookTags(where: Partial<SearchTagInput>) {
  return Tags.findMany({ where });
}

/** find one book tag matching params */
export async function getBookTag(where: TagByIdInput) {
  return Tags.findUnique({ where });
}

/** delete book tag matching params */
export async function deleteBookTag(where: TagByIdInput) {
  const exists = await getBookTag(where);
  if (!exists) return null;
  await Tags.delete({ where });
  return exists;
}
