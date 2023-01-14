import { objectType } from "nexus";

/** Labels that identify when/where a topic is discussed in media (e.g. video timestamp) */
export const NDContentTag = objectType({
  name: "NDContentTag",
  description: "Labels to identify where a topic is discussed in media",
  definition(t) {
    t.int("id");
    t.nonNull.string("name");
    t.nonNull.string("description");
    t.string("example");

    // Relational fields

    // BookTags[];
    // VideoTags[];
    // WebsiteTags[];
  }
});
