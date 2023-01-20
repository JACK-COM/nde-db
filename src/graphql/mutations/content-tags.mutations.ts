import { arg, list, mutationField, nonNull } from "nexus";
import {
  upsertMultipleTags,
  CreateTagInput
} from "../../services/content-tags.service";
import { isAuthorized } from "../../services/users.service";
import { withCreator } from "../../services/utils";

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
