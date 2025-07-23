import { apiPath, mentorApiPath } from "constants/apiPath";
import { http, HttpResponse } from "msw";
import type { CreateStudyApiRequestDto } from "types/dtos/createStudy";
import type { SearchStudyMentorResponseDto } from "types/dtos/searchStudyMentor";
import type { CreateStudyDetailInfoApiRequestDto } from "types/dtos/studyDetailInfo";

export const postCreateStudy = http.post(
  apiPath.createStudy,
  async ({ request }) => {
    const body = (await request.json()) as CreateStudyApiRequestDto;

    console.log("스터디 생성 요청 데이터:", body);

    return HttpResponse.json({ success: true });
  }
);

export const postStudyDetailInfo = http.put(
  `${mentorApiPath.mentorStudy}/:studyId`,
  async ({ request, params }) => {
    const body = (await request.json()) as CreateStudyDetailInfoApiRequestDto;
    const { studyId } = params;

    console.log(`스터디 ${studyId} 상세정보 업데이트`, body);

    return HttpResponse.json({ success: true });
  }
);

export const searchStudyMentor = http.get(
  apiPath.searchMentor,
  ({ request }) => {
    const url = new URL(request.url);
    const name = url.searchParams.get("name");

    const mockMentors: SearchStudyMentorResponseDto[] = [
      {
        memberId: 1,
        studentId: "202112345",
        name: "김홍익",
        phone: "010-1234-5678",
        department: {
          code: "CS",
          name: "컴퓨터공학과",
        },
        email: "hongik@example.com",
        discordUsername: "hongik#1234",
        nickname: "홍홍이",
        requirement: {
          univStatus: "",
          discordStatus: "VERIFIED",
          bevyStatus: "VERIFIED",
        },
      },
    ].filter((mentor) => mentor.name.includes(name ?? ""));

    return HttpResponse.json({ content: mockMentors });
  }
);
