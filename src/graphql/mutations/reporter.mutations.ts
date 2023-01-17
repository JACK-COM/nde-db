import { mutationField, list, nonNull, arg } from "nexus";
import {
  CreateReporterInput,
  upsertMultipleReporters
} from "../../services/reporters.service";
import { isAuthorized } from "../../services/users.service";
import { withCreator } from "../../services/utils";

export const createReporters = mutationField("createReporters", {
  type: list("NDReporter"),
  args: { data: nonNull(arg({ type: list("CreateReporterInput") })) },
  async resolve(_, args, { user }) {
    const { data } = args;
    if (!user || !isAuthorized(user?.role, "admin") || !data.length) return [];
    const input = withCreator(data, user.id, true) as CreateReporterInput[];
    return upsertMultipleReporters(input).catch((e) => {
      console.log(e);
      return [];
    });
  }
});

export const updateReporters = mutationField("updateReporters", {
  type: list("NDReporter"),
  args: { data: arg({ type: nonNull(list("UpdateReporterInput")) }) },
  async resolve(_, args, { user }) {
    const { data } = args;
    if (!user || !isAuthorized(user?.role, "admin") || !data) return [];
    const input = withCreator(data, user.id) as CreateReporterInput[];
    return upsertMultipleReporters(input);
  }
});
