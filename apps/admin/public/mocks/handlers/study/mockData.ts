import type { StudyListApiResponseDto } from "types/dtos/studyList";
import type { StudyStudentApiResponseDto } from "types/dtos/studyStudent";

export const mockStudyData: StudyListApiResponseDto["study"] = {
  studyId: 0,
  type: "ASSIGNMENT",
  title: "예시 스터디",
  description: "예시 스터디 설명",
  descriptionNotionLink: "스터디링크예시",
  semester: {
    academicYear: 0,
    semesterType: "FIRST",
  },
  totalRound: 1,
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
  mentorName: "김홍익",
  minAssignmentLength: 0,
};

export const mockStudent: StudyStudentApiResponseDto[] = [
  {
    member: {
      name: "홍홍홍",
      email: "hong@example.com",
      memberId: 0,
      studentId: "20251212",
      discordUsername: "홍디스코드",
      nickname: "홍닉네임",
      phone: "홍전화번호",
      department: "홍부서",
    },
    studyHistory: {
      studyHistoryId: 0,
      status: "NONE",
      githubLink: "",
      memberId: 0,
      studyId: 0,
    },
    achievements: [],
    studyTasks: [],
    assignmentRate: 50,
    attendanceRate: 50,
  },
];
