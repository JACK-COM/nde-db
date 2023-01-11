import { mutationField } from "nexus";

export const createReporter = mutationField("createReporter", {
  type: "NDReporter",
  //   args: { data: arg({ type: "NDReporter" }) },
  resolve(_, _args, { user }) {
    console.log(user);
    return null;
  }
});
