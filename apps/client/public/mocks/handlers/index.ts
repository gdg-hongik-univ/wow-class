import { get } from "http";

import * as authHandlers from "./auth";
import * as myPageHandlers from "./my-page";
import * as getMyOngoingStudyInfo from "./my-study";

export const handlers = [
  ...Object.values(authHandlers),
  ...Object.values(myPageHandlers),
  ...Object.values(getMyOngoingStudyInfo),
];
