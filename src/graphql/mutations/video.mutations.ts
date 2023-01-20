import { mutationField, list, nonNull, arg } from "nexus";
import {
  CreateVideoInput,
  upsertMultipleVideos
} from "../../services/videos.service";
import { isAuthorized } from "../../services/users.service";
import { withCreator } from "../../services/utils";

export const createVideos = mutationField("createVideos", {
  type: list("NDVideo"),
  args: { data: nonNull(arg({ type: list("CreateVideoInput") })) },
  async resolve(_, args, { user }) {
    const { data } = args;
    if (!user || !isAuthorized(user?.role, "dataentry") || !data.length)
      return [];
    const input = withCreator(data, user.id, true) as CreateVideoInput[];
    return upsertMultipleVideos(input).catch((e) => {
      console.log(e);
      return [];
    });
  }
});

export const updateVideos = mutationField("updateVideos", {
  type: list("NDVideo"),
  args: { data: arg({ type: nonNull(list("UpdateVideoInput")) }) },
  async resolve(_, args, { user }) {
    const { data } = args;
    if (!user || !isAuthorized(user?.role, "moderator") || !data) return [];
    const input = withCreator(data, user.id) as CreateVideoInput[];
    return upsertMultipleVideos(input);
  }
});
