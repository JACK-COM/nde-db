import { arg, list, mutationField, nonNull } from "nexus";
import {
  upsertVideoTags,
  CreateTagInput
} from "../../services/video-tags.service";
import { isAuthorized } from "../../services/users.service";
import { withCreator } from "../../services/utils";

export const createVideoTags = mutationField("createVideoTags", {
  type: list("NDVideoTag"),
  args: { data: nonNull(arg({ type: list("TagVideoInput") })) },
  async resolve(_, args, { user }) {
    const { data } = args;
    if (!user || !isAuthorized(user?.role, "dataentry") || !data.length) return [];
    const input = withCreator(data, user.id, true) as CreateTagInput[];
    return upsertVideoTags(input).catch((e) => {
      console.log(e);
      return [];
    });
  }
});

export const updateVideoTags = mutationField("updateVideoTags", {
  type: list("NDVideoTag"),
  args: { data: arg({ type: nonNull(list("TagVideoInput")) }) },
  async resolve(_, args, { user }) {
    const { data } = args;
    if (!user || !isAuthorized(user?.role, "dataentry") || !data) return [];
    const input = withCreator(data, user.id) as CreateTagInput[];
    return upsertVideoTags(input);
  }
});
