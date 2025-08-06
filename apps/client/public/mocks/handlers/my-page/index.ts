import { apiPath } from "constants/apiPath";
import { http, HttpResponse } from "msw";
import type { MyAccountInfoDto } from "types/dtos/members";
import type { MyAppliedStudyListApiResponseDto } from "types/dtos/studyHistory";

export const getMyAccountInfo = http.get<MyAccountInfoDto>(
  `${apiPath.members}/me/account-info`,
  () => {
    const mockResponse: MyAccountInfoDto = {
      name: "Test One",
      githubHandle: "SATISFIED",
    };

    return HttpResponse.json(mockResponse);
  }
);

export const getMyAppliedStudyList = http.get<
  MyAppliedStudyListApiResponseDto[]
>(apiPath.myAppliedStudy, () => {
  const mockResponse: MyAppliedStudyListApiResponseDto[] = [
    {
      studyHistory: {
        studyHistoryId: 1,
        status: "COMPLETED",
        memberId: 10,
        studyId: 10,
      },
      study: {
        studyId: 1,
        title: "Test Study",
        type: "ASSIGNMENT",
        description: "This is a sample study description.",
        descriptionNotionLink: "https://example.com/study-description",
        mentorId: 1,
        mentorName: "Mentor One",
        dayOfWeek: "MONDAY",
        startTime: { hour: 10, minute: 0, nano: 0, second: 0 },
        endTime: { hour: 12, minute: 0, nano: 0, second: 0 },
        openingDate: "2023-01-01",
        applicationPeriod: {
          startDate: "2023-01-01",
          endDate: "2023-01-31",
        },
        totalRound: 10,
        semester: {
          academicYear: 2023,
          semesterType: "FIRST",
        },
      },
      achievements: [
        {
          achievementId: 1,
          type: "EXCELLENT",
          studentId: 10,
          studyId: 1,
          title: "Outstanding Performance",
          date: "2023-06-01",
          icon: "star",
          color: "gold",
          descriptionLink: "https://example.com/achievement-details",
          descriptionNotionLink: "https://example.com/achievement-notion",
          description: "Achieved excellent performance in the study.",
        },
      ],
    },
    {
      studyHistory: {
        studyId: 2,
        status: "ONGOING",
        totalRound: 8,
        completedRound: 5,
      },
      study: {
        studyId: 2,
        title: "Another Study",
        type: "MOBILE",
        mentorName: "Mentor Two",
        semester: {
          academicYear: 2023,
          semesterType: "SECOND",
        },
        description: "Another sample study description.",
        descriptionNotionLink: "https://example.com/another-study-description",
      },
      achievements: [],
    },
  ];
  return HttpResponse.json(mockResponse);
});
