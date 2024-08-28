"use client";

import { css } from "@styled-system/css";
import { Flex } from "@styled-system/jsx";
import { Modal, Space, Text } from "@wow-class/ui";
import { studyApplyApi } from "apis/studyApplyApi";
import { tags } from "constants/tags";
import { useEffect, useState } from "react";
import { revalidateTagByName } from "utils/revalidateTagByName";
import Button from "wowds-ui/Button";

const StudyCancel = ({ params }: { params: { studyId: number } }) => {
  const studyId = params.studyId;
  const [cancelSucces, setCancelSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [studyTitle, setStudyTitle] = useState("");

  useEffect(() => {
    const fetchStudyData = async () => {
      const data = await studyApplyApi.getStudyList();
      if (!data) return;
      const { studyResponses: studyList } = data;

      const selectedStudy = studyList.find(
        (study) => study.studyId === Number(studyId)
      );
      if (selectedStudy) {
        setStudyTitle(selectedStudy.title);
      }
      setIsLoading(false);
    };

    fetchStudyData();
  }, [studyId]);

  const handleClickCancelButton = async () => {
    const result = await studyApplyApi.cancelStudyApplication(Number(studyId));

    if (result.success) {
      revalidateTagByName(tags.studyApply);
      revalidateTagByName(tags.myOngoingStudy);
      setCancelSuccess(true);
    }
  };

  if (isLoading) {
    return null;
  }

  return (
    <Modal>
      <Flex direction="column" textAlign="center" width="21rem">
        {cancelSucces ? (
          <Text typo="h1">
            <span className={titleStyle}>{studyTitle}</span>
            <br />
            수강이 취소되었어요.
          </Text>
        ) : (
          <>
            <Text typo="h1">
              <span className={titleStyle}>{studyTitle}</span>의 <br />
              수강을 취소하시겠습니까?
            </Text>
            <Space height={38} />
            <Button onClick={handleClickCancelButton}>신청 취소하기</Button>
          </>
        )}
      </Flex>
    </Modal>
  );
};

export default StudyCancel;

const titleStyle = css({
  color: "primary",
});
