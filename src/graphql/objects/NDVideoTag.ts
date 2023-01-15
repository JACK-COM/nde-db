import { objectType } from "nexus";

/** Video content tags */
export const NDVideoTag = objectType({
  name: "NDVideoTag",
  description: "Video content tags",
  definition(t) {
    t.id("id");
    t.nonNull.int("videoId");
    t.nonNull.int("tagId");
    t.nonNull.int("reporterId", { description: "EXPERIENCE reporter" });
    t.nonNull.int("addedBy", {
      description: "User that added this recordd"
    });
    t.nonNull.field("status", {
      type: "ContentStatus",
      description: "Content visibility status"
    });
    t.string("timestamp");
    t.field("lastUpdated", {
      type: "NDDateTime",
      description: "Date content was last updated"
    });

    // Relational fields

    t.field("ContentTag", { type: "NDContentTag" });
  }
});
