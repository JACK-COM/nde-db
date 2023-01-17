import { objectType } from "nexus";

/** Individual that reports an EXPERIENCE */
export const NDReporter = objectType({
  name: "NDReporter",
  description: "An individual that reports an EXPERIENCE",
  definition(t) {
    t.int("id");
    t.nonNull.string("name");
    t.nonNull.field("type", { type: "ReporterType" });
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

    // Book[];
    // BookTags[];
    // Video[];
    // VideoTags[];
    // Website[];
    // WebsiteTags[];
  }
});
