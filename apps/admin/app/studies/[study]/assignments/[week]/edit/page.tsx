"use client";

import { css } from "@styled-system/css";
import { Flex, styled } from "@styled-system/jsx";
import { Text } from "@wow-class/ui";
import { studyDetailApi } from "apis/study/studyDetailApi";
import AssignmentForm from "components/assignments/AssignmentForm";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import type { AssignmentApiRequestDto } from "types/dtos/assignment";
import Button from "wowds-ui/Button";

const Assignments = ({
  params,
}: {
  params: { study: string; week: string };
}) => {
  const methods = useForm<AssignmentApiRequestDto>({
    defaultValues: {
      title: "",
      deadline: "2024-08-29T11:36:58.180Z",
      descriptionLink: "",
    },
  });
  const router = useRouter();

  const handleClickSubmit = async () => {
    const data = {
      title: methods.getValues("title"),
      deadline: methods.getValues("deadline"),
      descriptionLink: methods.getValues("descriptionLink"),
    };

    // TODO: 과제 상태에 따라서 create, edit 결정하기
    const result = await studyDetailApi.createAssignment(+params.study, data);
    if (result.success) {
      router.push(`/studies/${params.study}/assignments/success`);
    }
  };

  // TODO: edit 상태라면 기본값 내려주기
  return (
    <>
      <styled.header className={headerStyle}>
        <Flex direction="column" gap="0.75rem">
          <Text color="sub" typo="h3">
            과제 정보를 입력해주세요
          </Text>
          <Text as="h1" typo="h1">
            {params.week}주차 과제
          </Text>
        </Flex>
        <Button
          disabled={!methods.formState.isValid}
          size="sm"
          style={{ height: "fit-content" }}
          onClick={handleClickSubmit}
        >
          저장하기
        </Button>
      </styled.header>
      <FormProvider {...methods}>
        <AssignmentForm />
      </FormProvider>
    </>
  );
};

const headerStyle = css({
  width: "100%",
  display: "flex",
  alignItems: "top",
  justifyContent: "space-between",
});

export default Assignments;
