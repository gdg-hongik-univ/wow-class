import { http, HttpResponse } from "msw";
import type { StudyStatisticsApiResponseDto } from "types/dtos/studyStatistics";

export const getStudyStatistics = http.get(
  "/v2/mentor/studies/:studyId/statistics",
  () => {
    const mockResponse: StudyStatisticsApiResponseDto = {
      totalStudentCount: 5656,
      completeStudentCount: 0,
      averageAttendanceRate: 0,
      averageAssignmentSubmissionRate: 0,
      studyCompleteRate: 0,
      studyRoundStatisticsDtos: [],
    };

    return HttpResponse.json(mockResponse);
  }
);
