import type {
  AssignmentStatusType,
  AssignmentSubmissionFailureType,
} from "types/entities/common/assignment";
import type { PeriodType } from "types/entities/common/period";
import type { StudyType } from "types/entities/common/study";
import type {
  DayOfWeekType,
  SemesterType,
  Time,
} from "types/entities/common/time";
import type {
  AssignmentSubmissionStatusType,
  AttendanceStatusType,
  DailyTaskType,
  StudyCurriculumStatusType,
  StudyDifficultyType,
} from "types/entities/myStudy";

export interface BasicStudyInfoDto {
  studyId: number;
  academicYear: number;
  semester: { academicYear: number; semesterType: SemesterType };
  type: StudyType;
  title: string;
  description: string;
  descriptionNotionLink: string;
  totalRound: number;
  dayOfWeek: DayOfWeekType;
  startTime: Time;
  endTime: Time;
  applicationPeriod: PeriodType;
  openingDate: string;
  mentorId: number;
  mentorName: string;
  minAssignmentLength?: number;
}
export interface StudyAnnouncementDto {
  studyAnnouncementId: number;
  title: string;
  link: string;
  createdDate: string;
}

interface StudyAnnouncementDtoV2 {
  study: BasicStudyInfoDto;
  studyAnnouncement: StudyAnnouncementDto;
}

export type StudyAnnouncementListDtoV2Type = StudyAnnouncementDtoV2[];

export interface OngoingStudyInfo {
  studyId: number;
  studyName: string;
  studyType: StudyType;
  semester: {
    academicYear: number;
    semesterType: SemesterType;
  };
  mentorId: number;
  mentorName: string;
}

export type MyOngoingStudyInfoDtoV2 = OngoingStudyInfo[];

interface StudyCurriculumDto {
  studyDetailId: number;
  period: {
    startDate: string;
    endDate: string;
    open: boolean;
  };
  week: number;
  title: string;
  description: string;
  curriculumStatus: StudyCurriculumStatusType;
  difficulty: StudyDifficultyType;
  attendanceStatus: AttendanceStatusType;
  assignmentStatus: AssignmentStatusType;
  assignmentSubmissionStatus: AssignmentSubmissionStatusType;
  submissionFailureType: AssignmentSubmissionFailureType;
  submissionLink: string;
}

export type StudyCurriculumListDtoType = StudyCurriculumDto[];

export interface DailyTaskDto<T extends DailyTaskType> {
  studyDetailId: number;
  week: number;
  taskType: T;
  deadLine: string;
  attendanceStatus: T extends "ATTENDANCE" ? AttendanceStatusType : never;
  assignmentTitle: T extends "ASSIGNMENT" ? string : never;
  assignmentSubmissionStatus: T extends "ASSIGNMENT"
    ? Extract<AssignmentSubmissionStatusType, "FAILURE" | "SUCCESS">
    : never;
}
