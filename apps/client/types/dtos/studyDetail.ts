import type {
  AssignmentHistoryStatusType,
  AssignmentSubmissionFailureType,
  AssignmentSubmissionStatusType,
} from "types/entities/common/assignment";
import type { AttendanceStatusType } from "types/entities/common/attendance";
import type { PeriodType } from "types/entities/common/period";
import type { HistoryStatusType } from "types/entities/common/study";

interface StudyHistory {
  studyHistoryId: number;
  status: HistoryStatusType;
  githubLink: string;
  memberId: number;
  studyId: number;
}

export interface StudySession {
  studySessionId: number;
  position: number;
  lessonTitle?: string;
  assignmentTitle?: string;
  description?: string;
  lessonPeriod?: PeriodType;
  assignmentDescriptionLink: string;
  assignmentPeriod: PeriodType;
  studyId: number;
}

export interface AssignmentHistory {
  assignmentHistoryId: number;
  submissionStatus: AssignmentSubmissionStatusType;
  submissionFailureType: AssignmentSubmissionFailureType;
  contentLength: number;
  submissionLink: string;
  commitHash: string;
  committedAt: string;
  studySessionId: number;
  memberId: number;
}
export interface SessionInfo {
  session: StudySession;
  attendanceStatus: AttendanceStatusType;
  assignmentHistoryStatus: AssignmentHistoryStatusType;
  assignmentHistory: AssignmentHistory | null;
}

export interface StudyDetailDashboardDto {
  studyHistory: StudyHistory;
  sessions: SessionInfo[];
}
