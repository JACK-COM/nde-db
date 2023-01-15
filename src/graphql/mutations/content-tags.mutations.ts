import { arg, intArg, list, mutationField, nonNull } from "nexus";
import {
  createMultipleTags,
  CreateTagInput
} from "../../services/content-tags.service";
import { requireRole } from "../../services/users.service";

export const createContentTags = mutationField("createContentTags", {
  type: list("NDContentTag"),
  args: {
    data: arg({ type: list("CreateContentTagInput") }),
    addedBy: nonNull(intArg())
  },
  async resolve(_, args) {
    const { data, addedBy } = args;
    const authorized = await requireRole(addedBy, "admin");
    return authorized ? createMultipleTags(data as CreateTagInput[]) : [];
  }
});
