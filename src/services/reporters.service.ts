import { ContentTag, Prisma } from "@prisma/client";
import { context } from "../graphql/context";

export type CreateReporterInput = Prisma.ReporterUncheckedCreateInput;
export type UpdateReporterInput = Prisma.ContentTagUpdateArgs["data"];
export type SearchReporterInput = Pick<
  CreateReporterInput,
  "name" | "type" | "status"
>;
export type TagByIdInput = Pick<ContentTag, "id">;
const { Reporters } = context;

/** create multiple content tags */
export async function upsertMultipleReporters(data: CreateReporterInput[]) {
  return await Promise.all(
    data.map((d) =>
      d.id
        ? Reporters.update({ data: d, where: { id: d.id } })
        : Reporters.create({ data: d })
    )
  );
}

/** create content tag */
export async function upsertReporter(data: CreateReporterInput) {
  return Reporters.upsert({
    create: data,
    update: data,
    where: { id: data.id }
  });
}

/** find all content tags matching params */
export async function findAllReporters(where: Partial<SearchReporterInput>) {
  const params: Prisma.ReporterFindManyArgs = { where: {} };
  if (where.name) params.where!.name = where.name;
  if (where.type) params.where!.type = where.type;
  return Reporters.findMany(params);
}

/** find one content tag matching params */
export async function getReporter(where: TagByIdInput) {
  return Reporters.findUnique({ where });
}

/** delete content tag matching params */
export async function deleteReporter(where: TagByIdInput) {
  const exists = await getReporter(where);
  if (!exists) return null;
  await Reporters.delete({ where });
  return exists;
}
