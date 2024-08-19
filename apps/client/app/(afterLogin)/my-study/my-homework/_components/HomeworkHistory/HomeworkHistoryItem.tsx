import { Flex, styled } from "@styled-system/jsx";
import { Space, Table, Text } from "@wow-class/ui";
import { padWithZero, parseDate } from "@wow-class/utils";
import type { ComponentProps } from "react";
import type { AssignmentHistoryDto } from "types/dtos/study-history";
import type { AssignmentSubmissionStatusType } from "types/entities/assignment";
import Button from "wowds-ui/Button";
import Tag from "wowds-ui/Tag";
import TextButton from "wowds-ui/TextButton";

interface HomeworkHistoryItemProps {
  history: AssignmentHistoryDto;
}

export const HomeworkHistoryItem = ({ history }: HomeworkHistoryItemProps) => {
  const {
    week,
    deadline,
    title,
    descriptionLink,
    assignmentSubmissionStatus,
    submissionLink,
  } = history;

  const { year, month, day, hours, minutes } = parseDate(deadline);

  const deadlineText = `종료: ${year}년 ${month}월 ${day}일 ${padWithZero(
    hours
  )}:${padWithZero(minutes)}`;

  return (
    <Table>
      <Table.Left>
        <Text as="h3" typo="h3">
          {week}주차
        </Text>
        <Space width={50} />
        <Table.Content subText={deadlineText} text={title} />
      </Table.Left>
      <Table.Right>
        <Flex
          justifyContent="center"
          minWidth="202px"
          paddingX="36px"
          textStyle="body1"
        >
          {descriptionLink ? (
            <TextButton as="a" href={descriptionLink} text="과제 명세 확인" />
          ) : (
            "-"
          )}
        </Flex>
        <styled.div paddingX="32px">
          <Tag
            color={homeworkSubmissionMap[assignmentSubmissionStatus].color}
            variant="solid2"
          >
            {homeworkSubmissionMap[assignmentSubmissionStatus].message}
          </Tag>
        </styled.div>
        <Flex
          justifyContent="center"
          minWidth="182px"
          paddingX="25px"
          textStyle="body1"
        >
          {submissionLink ? (
            <Button as="a" href={submissionLink} size="sm" variant="outline">
              제출한 과제 확인
            </Button>
          ) : (
            "-"
          )}
        </Flex>
      </Table.Right>
    </Table>
  );
};

const homeworkSubmissionMap: Record<
  AssignmentSubmissionStatusType,
  { message: string; color: ComponentProps<typeof Tag>["color"] }
> = {
  FAIL: {
    message: "제출 실패",
    color: "red",
  },
  SUCCESS: {
    message: "제출 완료",
    color: "blue",
  },
};
