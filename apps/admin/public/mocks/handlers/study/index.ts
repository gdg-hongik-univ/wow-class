import { http, HttpResponse } from "msw";
import type { StudyListApiResponseDto } from "types/dtos/studyList";
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
export const getStudyList = http.get("/v2/admin/studies", () => {
  const mockResponse: StudyListApiResponseDto[] = [
    {
      study: {
        studyId: 0,
        type: "ASSIGNMENT",
        title: "string",
        description: "string",
        descriptionNotionLink: "string",
        semester: {
          academicYear: 0,
          semesterType: "FIRST",
        },
        totalRound: 0,
        dayOfWeek: "MONDAY",
        startTime: {
          hour: 0,
          minute: 0,
          second: 0,
          nano: 0,
        },
        endTime: {
          hour: 0,
          minute: 0,
          second: 0,
          nano: 0,
        },
        applicationPeriod: {
          startDate: "2025-06-21T09:24:06.684Z",
          endDate: "2025-06-21T09:24:06.688Z",
        },
        discordChannelId: "string",
        discordRoleId: "string",
        mentorId: 0,
        mentorName: "string",
        minAssignmentLength: 0,
      },
      studySessions: [
        {
          studySessionId: 0,
          position: 0,
          lessonTitle: "string",
          description: "string",
          lessonAttendanceNumber: "string",
          lessonPeriod: {
            startDate: "2025-06-21T09:24:06.688Z",
            endDate: "2025-06-21T09:24:06.688Z",
          },
          assignmentTitle: "string",
          assignmentDescriptionLink: "string",
          assignmentPeriod: {
            startDate: "2025-06-21T09:24:06.688Z",
            endDate: "2025-06-21T09:24:06.688Z",
          },
          studyId: 0,
        },
      ],
    },
  ];

  return HttpResponse.json(mockResponse);
});
