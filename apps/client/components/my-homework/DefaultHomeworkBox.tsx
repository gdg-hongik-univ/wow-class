import { Flex, styled } from "@styled-system/jsx";
import Box from "wowds-ui/Box";
import Button from "wowds-ui/Button";
import Tag from "wowds-ui/Tag";
import TextButton from "wowds-ui/TextButton";

export const DefaultHomeworkBox = () => {
  return (
    <Box
      text={
        <>
          <styled.p color="primary" textStyle="label2">
            4주차
          </styled.p>
          <div style={{ height: "1rem" }} />
          <Flex gap="xs">
            <styled.p color="textBlack" textStyle="h2">
              HTTP 통신 코드 작성하기
            </styled.p>
            <Tag color="blue" variant="solid2">
              제출 완료
            </Tag>
          </Flex>
          <TextButton style={{ paddingLeft: "0px" }} text="과제 명세 확인" />
          <div style={{ height: "0.5rem" }} />
          <styled.p color="sub" textStyle="body1">
            종료 일시 : 2024년 5월 23일 23:59
          </styled.p>
          <Flex gap="xs">
            <styled.div color="sub" display="flex" textStyle="body1">
              <styled.div>제출한 과제 : </styled.div>
              <styled.div color="textBlack"> 2024-1-Web-Study/Week4</styled.div>
            </styled.div>
            <styled.div color="primary" textStyle="body1">
              글자수 충족
            </styled.div>
          </Flex>
          <div style={{ height: "1.63rem" }} />
          <Button style={{ maxWidth: "100%" }} variant="outline">
            제출하러 가기
          </Button>
          <div style={{ height: "0.5rem" }} />
          <Button style={{ maxWidth: "100%" }}>제출 완료</Button>
        </>
      }
    />
  );
};
