import { intArg, list, nonNull, queryField, stringArg } from "nexus";
import { findAllBookTags } from "../../services/book-tags.service";
import { findAllTags } from "../../services/content-tags.service";

export const listContentTags = queryField("listContentTags", {
  type: nonNull(list("NDContentTag")),
  args: {
    name: stringArg(),
    description: stringArg()
  },
  description: "List Content Tags (optionally filter by name or description)",
  async resolve(_, { name, description }) {
    return findAllTags({
      name: name || undefined,
      description: description || undefined
    });
  }
});

export const listBookTags = queryField("listBookTags", {
  type: nonNull(list("NDBookTag")),
  args: { bookId: intArg() },
  description: "List Content Tags for a single book",
  async resolve(_, { bookId }) {
    return findAllBookTags({ bookId: bookId || undefined });
  }
});
