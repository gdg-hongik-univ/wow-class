import { mentorApiPath } from "constants/apiPath";
import { http, HttpResponse } from "msw";
import type { OutstandingStudentApiRequestDto } from "types/dtos/outstandingStudent";

export const postStudyAchievement = http.post(
  `${mentorApiPath.studyAchievement}?studyId=0`,
  async ({ request }) => {
    const body = (await request.json()) as OutstandingStudentApiRequestDto;

    console.log(`스터디  우수 스터디원 등록 요청`, body);

    return HttpResponse.json({ success: true });
  }
);

export const deleteStudyAchievement = http.delete(
  `${mentorApiPath.studyAchievement}?studyId=0`,
  async ({ request }) => {
    const body = (await request.json()) as OutstandingStudentApiRequestDto;

    console.log(`[스터디  우수 스터디원 삭제 요청`, body);

    return HttpResponse.json({ success: true });
  }
);
