import type { StatusType } from "../entities/auth";

export interface DashboardApiResponseDto {
  member: {
    memberId: number;
    role: "GUEST" | "ADMIN" | "REGULAR";
    manageRole: "ADMIN" | "NONE";
    studyRole: "MENTOR" | "STUDENT";
    basicInfo: {
      name: string;
      studentId: string;
      email: string;
      department: string;
      phone: string;
      discordUsername: string;
      nickname: string;
    };
    associateRequirement: {
      univStatus: StatusType;
      discordStatus: Extract<StatusType, "UNSATISFIED" | "SATISFIED">;
      bevyStatus: Extract<StatusType, "UNSATISFIED" | "SATISFIED">;
      infoStatus: Extract<StatusType, "UNSATISFIED" | "SATISFIED">;
    };
  };
  currentRecruitmentRound: {
    recruitmentId: number;
    name: string;
    period: {
      startDate: string;
      endDate: string;
      open: boolean;
    };
    fee: number;
    roundType: "FIRST" | "SECOND" | "THIRD";
    roundTypeValue: string;
  };
  currentMembership: {
    membershipId: number;
    memberId: number;
    recruitmentId: number;
    regularRequirement: {
      paymentStatus: Extract<StatusType, "UNSATISFIED" | "SATISFIED">;
      paymentSatisfied: boolean;
      allSatisfied: boolean;
    };
  };
}
