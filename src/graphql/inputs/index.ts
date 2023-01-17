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
    t.nonNull.string("name");
    t.nonNull.field({ name: "type", type: "ReporterType" });
  }
});
