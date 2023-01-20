/** @module Inputs */

import { inputObjectType } from "nexus";

/* CONTENT TAGS */

export const CreateContentTagInput = inputObjectType({
  name: "CreateContentTagInput",
  definition(t) {
    t.nonNull.string("name");
    t.nonNull.string("description");
    t.string("example");
  }
});

export const UpdateContentTagInput = inputObjectType({
  name: "UpdateContentTagInput",
  definition(t) {
    t.nonNull.int("id");
    t.string("name");
    t.string("description");
    t.string("example");
  }
});

/* REPORTERS */

export const CreateReporterInput = inputObjectType({
  name: "CreateReporterInput",
  definition(t) {
    t.nonNull.string("name");
    t.nonNull.field({ name: "type", type: "ReporterType" });
  }
});

export const UpdateReporterInput = inputObjectType({
  name: "UpdateReporterInput",
  definition(t) {
    t.nonNull.int("id");
    t.string("name");
    t.field({ name: "type", type: "ReporterType" });
  }
});

/* VIDEOS */

export const CreateVideoInput = inputObjectType({
  name: "CreateVideoInput",
  definition(t) {
    t.nonNull.int("reporterId");
    t.nonNull.string("title");
    t.nonNull.string("url");
    t.field({ name: "source", type: "VideoSource", default: "other" });
  }
});

export const UpdateVideoInput = inputObjectType({
  name: "UpdateVideoInput",
  definition(t) {
    t.nonNull.int("id");
    t.string("title");
    t.string("url");
    t.int("reporterId");
    t.field({ name: "source", type: "VideoSource" });
  }
});

/* TAGS */

export const TagVideoInput = inputObjectType({
  name: "TagVideoInput",
  definition(t) {
    t.nonNull.int("videoId");
    t.nonNull.int("tagId");
    t.nonNull.int("reporterId");
    t.string("timestamp");
  }
});

export const TagBookInput = inputObjectType({
  name: "TagBookInput",
  definition(t) {
    t.int("id");
    t.nonNull.int("bookId");
    t.nonNull.int("tagId");
    t.nonNull.int("reporterId");
  }
});

export const TagSiteInput = inputObjectType({
  name: "TagSiteInput",
  definition(t) {
    t.int("id");
    t.nonNull.int("websiteId");
    t.nonNull.int("tagId");
    t.nonNull.int("reporterId");
  }
});
