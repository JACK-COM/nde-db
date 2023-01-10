import { objectType } from "nexus";

/** A book detailing one or more EXPERIENCEs */
export const NDBook = objectType({
  name: "NDBook",
  description: "A book detailing one or more EXPERIENCEs",
  definition(t) {
    t.id("id");
    t.nonNull.string("title");
    t.string("publisher", { description: "Book publisher if available" });
    t.string("publishDate", { description: "Date or month/year (or year)" });
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

    // User;
    // BookTags[];
    // Reporter;
  }
});
