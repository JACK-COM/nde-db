import { arg, intArg, list, nonNull, queryField, stringArg } from "nexus";
import { findAllVideos } from "../../services/videos.service";

export const listVideos = queryField("listVideos", {
  type: nonNull(list("NDVideo")),
  args: {
    title: stringArg(),
    reporterId: intArg(),
    url: stringArg(),
    source: stringArg(),
    status: arg({ type: "ContentStatus" })
  },
  description: "List Videos that match one or more search parameters",
  async resolve(_, args) {
    const { title, url, reporterId, source, status } = args;
    return findAllVideos({
      title: title || undefined,
      url: url || undefined,
      reporterId: reporterId || undefined,
      source: source || undefined,
      status: status || undefined
    });
  }
});
