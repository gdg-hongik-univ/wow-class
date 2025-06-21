import * as authHandlers from "./auth";
import * as studyHandlers from "./study";

export const handlers = [
  ...Object.values(studyHandlers),
  ...Object.values(authHandlers),
];
