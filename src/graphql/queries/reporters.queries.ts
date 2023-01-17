import { arg, list, nonNull, queryField, stringArg } from "nexus";
import { findAllReporters } from "../../services/reporters.service";

export const listReporters = queryField("listReporters", {
  type: nonNull(list("NDReporter")),
  args: { name: stringArg(), type: arg({ type: "ReporterType" }) },
  description: "List Content Tags for a single book",
  async resolve(_, { name, type }) {
    return findAllReporters({
      name: name || undefined,
      type: type || undefined
    });
  }
});
