import { arg, list, mutationField } from "nexus";
import {
  createMultipleTags,
  CreateTagInput
} from "../../services/content-tags.service";
import { rankUserRoles } from "../../services/users.service";

export const createContentTags = mutationField("createContentTags", {
  type: list("NDContentTag"),
  args: { data: arg({ type: list("CreateContentTagInput") }) },
  async resolve(_, args, { user }) {
    const { data } = args;
    const authorized = rankUserRoles(user?.role, "admin");
    return authorized ? createMultipleTags(data as CreateTagInput[]) : [];
  }
});
