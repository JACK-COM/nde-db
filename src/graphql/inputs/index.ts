/** @module Inputs */

import { inputObjectType } from "nexus";

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
