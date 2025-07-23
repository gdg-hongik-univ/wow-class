import { mentorApiPath } from "constants/apiPath";
import { http, HttpResponse } from "msw";
import type { StudyCompleteRequestDto } from "types/dtos/studyComplete";

export const postStudyComplete = http.post(
  `${mentorApiPath.studyHistory}/complete`,
  async ({ request }) => {
    const body = (await request.json()) as StudyCompleteRequestDto;

    console.log("스터디 수료 요청:", body);

    return HttpResponse.json({ success: true });
  }
);

export const postStudyCompleteWithdraw = http.post(
  `${mentorApiPath.studyHistory}/withdraw-completion`,
  async ({ request }) => {
    const body = (await request.json()) as StudyCompleteRequestDto;

    console.log("스터디 수료 철회 요청:", body);

    return HttpResponse.json({ success: true });
  }
);
