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
