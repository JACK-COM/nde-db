import { objectType } from "nexus";

/** Website content tags */
export const NDWebsiteTag = objectType({
  name: "NDWebsiteTag",
  description: "Website content tags",
  definition(t) {
    t.id("id");
    t.nonNull.int("websiteId");
    t.nonNull.int("tagId");
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

    t.field("ContentTag", { type: "NDContentTag" });
  }
});
