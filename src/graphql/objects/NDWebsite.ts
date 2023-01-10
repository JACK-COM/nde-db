import { objectType } from "nexus";

/** Websites that document an EXPERIENCE. */
export const NDWebsite = objectType({
  name: "NDWebsite",
  description: "Websites that document an EXPERIENCE.",
  definition(t) {
    t.id("id");
    t.nonNull.string("url");
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
    // WebsiteTag[];
  }
});
