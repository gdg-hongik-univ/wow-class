import { apiPath, mentorApiPath } from "constants/apiPath";
import { http, HttpResponse } from "msw";
import type { AnnouncementApiResponseDto } from "types/dtos/announcement";
import type { StudyBasicInfoApiResponseDto } from "types/dtos/studyBasicInfo";
import type { StudyListApiResponseDto } from "types/dtos/studyList";
import type { StudyStatisticsApiResponseDto } from "types/dtos/studyStatistics";
import type { PaginatedStudyStudentResponseDto } from "types/dtos/studyStudent";
import type { StudyAnnouncementType } from "types/entities/study";

import { mockStudent, mockStudyData } from "./mockData";

export const getStudyList = http.get(apiPath.studyList, () => {
  const mockResponse: StudyListApiResponseDto[] = [
    {
      study: mockStudyData,
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

export const getStudyBasicInfo = http.get(
  `${apiPath.commonStudy}/:studyId`,
  () => {
    const mockResponse: StudyBasicInfoApiResponseDto = {
      ...mockStudyData,
      openingDate: "2025-08-12",
    };

    return HttpResponse.json(mockResponse);
  }
);

export const getStudyAnnouncement = http.get(
  `${apiPath.studyAnnouncement}/:studyId/me`,
  () => {
    const mockResponse: AnnouncementApiResponseDto[] = [
      {
        studyAnnouncement: {
          studyAnnouncementId: 1,
          title: "스터디 공지사항",
          link: "https://example.com/announcement/1",
          createdDate: "2025-06-21T09:24:06.684Z",
        },
        study: mockStudyData,
      },
    ];

    return HttpResponse.json(mockResponse);
  }
);

export const getStudyStatistics = http.get(
  `${mentorApiPath.mentorStudy}/:studyId/statistics`,
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

export const getStudyStudents = http.get(
  `${mentorApiPath.mentorStudy}/:studyId/students`,
  ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page") || "0");
    const size = Number(url.searchParams.get("size") || "1");

    const mockData: PaginatedStudyStudentResponseDto = {
      totalElements: 1,
      totalPages: 1,
      size,
      number: page,
      numberOfElements: mockStudent.length,
      content: mockStudent,
      sort: { empty: true, sorted: false, unsorted: true },
      pageable: {
        pageable: {
          offset: 0,
          sort: {
            empty: false,
            sorted: false,
            unsorted: false,
          },
          pageNumber: 0,
          pageSize: 0,
          unpaged: false,
          paged: false,
        },
      },
      first: page === 0,
      last: page === 2,
      empty: mockStudent.length === 0,
    };

    return HttpResponse.json(mockData);
  }
);

export const getStudyStudentsExcel = http.get(
  `${mentorApiPath.mentorStudy}/:studyId/students/excel`,
  () => {
    const mockData = [
      {
        이름: "홍홍홍",
        이메일: "hong@example.com",
        출석률: "50%",
        과제제출률: "50%",
      },
    ];

    return HttpResponse.json(mockData);
  }
);

export const deleteStudy = http.delete(
  `${apiPath.studyList}/:studyId`,
  ({ params }) => {
    const { studyId } = params;
    console.log(`스터디 ${studyId} 삭제 요청`);

    return HttpResponse.json({ success: true });
  }
);

export const publishStudyAnnouncement = http.post(
  `${mentorApiPath.studyAnnouncement}`,
  async ({ request }) => {
    const body = (await request.json()) as StudyAnnouncementType;
    console.log("스터디 공지 게시 요청:", body);

    return HttpResponse.json({ success: true });
  }
);

export const modifyStudyAnnouncement = http.put(
  `${mentorApiPath.studyAnnouncement}/:studyAnnouncementId`,
  async ({ request, params }) => {
    const { studyAnnouncementId } = params;
    const body = (await request.json()) as StudyAnnouncementType;

    console.log(`공지 ${studyAnnouncementId} 수정 요청:`, body);

    return HttpResponse.json({ success: true });
  }
);

export const deleteStudyAnnouncement = http.delete(
  `${mentorApiPath.studyAnnouncement}/:studyAnnouncementId`,
  ({ params }) => {
    const { studyAnnouncementId } = params;
    console.log(`공지 ${studyAnnouncementId} 삭제 요청`);

    return HttpResponse.json({ success: true });
  }
);
