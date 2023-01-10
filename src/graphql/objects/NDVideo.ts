import { objectType } from "nexus";

/** Interviews about a single EXPERIENCE or REPORTER. */
export const NDVideo = objectType({
  name: "NDVideo",
  description: "Interviews about a single EXPERIENCE or REPORTER.",
  definition(t) {
    t.id("id");
    t.nonNull.string("url", { description: "Video URL" });
    t.string("source", { description: "youtube | vimeo | other" });
    t.nonNull.int("reporterId", { description: "EXPERIENCE reporter" });
    t.nonNull.int("addedBy", {
      description: "User that added this recordd"
    });
    t.nonNull.field("status", {
      type: "ContentStatus",
      description: "Content visibility status"
    });
    t.field("lastUpdated", {
      type: "NDDateTime",
      description: "Date content was last updated"
    });

    // Relational fields

    // Reporter;
    // User;
    // VideoTags[];
  }
});