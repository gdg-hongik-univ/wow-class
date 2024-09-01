"use client";
import { Flex } from "@styled-system/jsx";
import { studyApi } from "apis/study/studyApi";
import { DEFAULT_ERROR_MESSAGE } from "constants/messages/error";
import { routerPath } from "constants/router/routerPath";
import useToast from "hooks/useToast";
import Link from "next/link";
import type { StudyAssignmentStatusType } from "types/entities/study";
import Button from "wowds-ui/Button";

const AssignmentButtons = ({
  studyDetailId,
  assignmentStatus,
}: {
  studyDetailId: number;
  assignmentStatus: StudyAssignmentStatusType;
}) => {
  const { toast } = useToast();

  const handleCancelAssignment = async () => {
    try {
      await studyApi.cancelAssignment(studyDetailId);
      toast({ text: "휴강 처리에 성공했어요." });
    } catch (error) {
      if (error instanceof Error) {
        toast({ text: error.message || DEFAULT_ERROR_MESSAGE });
      }
    }
  };

  if (assignmentStatus === "OPEN") {
    return (
      <Button
        asProp={Link}
        href={routerPath["assignment-detail"].href(studyDetailId)}
        size="sm"
        variant="outline"
      >
        과제 내용보기
      </Button>
    );
  }

  if (assignmentStatus === "CANCELLED") {
    return (
      <Flex gap="sm">
        <Button size="sm" variant="sub">
          과제 휴강완료
        </Button>
        <Button disabled size="sm" variant="solid">
          과제 개설하기
        </Button>
      </Flex>
    );
  }

  return (
    <Flex gap="sm">
      <Button size="sm" variant="sub" onClick={handleCancelAssignment}>
        과제 휴강처리
      </Button>
      <Button
        asProp={Link}
        href={routerPath["assignment-edit"].href(studyDetailId)}
        size="sm"
        variant="solid"
      >
        과제 개설하기
      </Button>
    </Flex>
  );
};

export default AssignmentButtons;
