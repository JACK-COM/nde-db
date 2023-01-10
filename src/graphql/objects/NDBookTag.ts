import { objectType } from "nexus";

/** Book content tags */
export const NDBookTag = objectType({
  name: "NDBookTag",
  description: "Book content tags",
  definition(t) {
    t.id("id");
    t.nonNull.int("bookId");
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
