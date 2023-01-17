// import logger from "../../logger";
import { arg, list, mutationField, nonNull } from "nexus";
import {
  upsertMultipleTags,
  CreateTagInput
} from "../../services/content-tags.service";
import { isAuthorized } from "../../services/users.service";

export const createContentTags = mutationField("createContentTags", {
  type: list("NDContentTag"),
  args: { data: nonNull(arg({ type: list("CreateContentTagInput") })) },
  async resolve(_, args, { user }) {
    const { data } = args;
    if (!user || !isAuthorized(user?.role, "admin") || !data.length) return [];
    const input = withCreator(data, user.id, true) as CreateTagInput[];
    return upsertMultipleTags(input).catch((e) => {
      console.log(e);
      return [];
    });
  }
});

export const updateContentTags = mutationField("updateContentTags", {
  type: list("NDContentTag"),
  args: { data: arg({ type: nonNull(list("UpdateContentTagInput")) }) },
  async resolve(_, args, { user }) {
    const { data } = args;
    if (!user || !isAuthorized(user?.role, "admin") || !data) return [];
    const input = withCreator(data, user.id) as CreateTagInput[];
    return upsertMultipleTags(input);
  }
});

function withCreator<T>(d: T, userId: number, newItems = false) {
  type EnhancedInput = T & { addedBy: number; lastUpdated: Date };
  const lastUpdated = new Date();
  const appendCreator = (i: T): EnhancedInput => ({
    ...i,
    addedBy: userId,
    lastUpdated,
    created: newItems ? lastUpdated : undefined
  });

  return (Array.isArray(d) ? d.map(appendCreator) : appendCreator(d)) as T;
}
