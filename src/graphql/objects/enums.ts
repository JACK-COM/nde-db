import { enumType } from "nexus";

/** Describes a type of EXPERIENCE reporter */
export const ReporterType = enumType({
  name: "ReporterType",
  description: "Describes a type of EXPERIENCE reporter",
  members: {
    experiencer: "experiencer",
    observer: "observer",
    researcher: "researcher"
  }
});

/** Determines content visibility for end-users. */
export const ContentStatus = enumType({
  name: "ContentStatus",
  description: "Determines content visibility for end-users.",
  members: {
    live: "live",
    draft: "draft",
    quarantined: "quarantined"
  }
});

/** Roles assigned to data readers/writers */
export const UserRoles = enumType({
  name: "UserRoles",
  description: "Roles assigned to data readers/writers",
  members: {
    admin: "admin",
    moderator: "moderator",
    dataentry: "dataentry",
    researcher: "researcher"
  }
});
