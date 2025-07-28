import { apiPath } from "constants/apiPath";
import { http, HttpResponse } from "msw";
import type { OngoingStudyInfo } from "types/dtos/myStudy";
import type { StudyType } from "types/entities/common/study";
import type { SemesterType } from "types/entities/common/time";

export const getMyOngoingStudyInfo = http.get(apiPath.myOngoingStudy, () => {
  const mockResponse: OngoingStudyInfo[] = [
    {
      studyId: 1,
      studyName: "알고리즘 스터디",
      studyType: "ONLINE" as StudyType,
      semester: {
        academicYear: 2025,
        semesterType: "FIRST" as SemesterType,
      },
      mentorId: 101,
      mentorName: "홍길동",
    },
  ];

  return HttpResponse.json(mockResponse);
});
