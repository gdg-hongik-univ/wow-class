import * as authHandlers from "./auth";
import * as studyHandlers from "./study";
import * as completeStudyHandlers from "./study/completeStudyApi";
import * as studyAchievementHandlers from "./study/studyAchievementApi";

export const handlers = [
  ...Object.values(studyHandlers),
  ...Object.values(authHandlers),
  ...Object.values(studyAchievementHandlers),
  ...Object.values(completeStudyHandlers),
];
