import { css } from "@styled-system/css";
import { Flex, styled } from "@styled-system/jsx";
import Button from "wowds-ui/Button";
import TextField from "wowds-ui/TextField";

const Assignments = ({ params }: { params: { id: string } }) => {
  return (
    <>
      <styled.header className={headerStyle}>
        <Flex direction="column">
          <styled.span>과제 정보를 입력해주세요</styled.span>
          <h1>{params.id}주차 과제</h1>
        </Flex>
        <Button disabled size="sm">
          저장하기
        </Button>
      </styled.header>
      <Flex direction="column" gap="2.25rem">
        <TextField
          label="과제 제목"
          maxLength={100}
          placeholder="Ex. HTTP 통신 코드 작성하기"
        />
        <TextField label="과제 명세 링크" placeholder="http://example.com" />
      </Flex>
    </>
  );
};

const headerStyle = css({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
});

export default Assignments;
