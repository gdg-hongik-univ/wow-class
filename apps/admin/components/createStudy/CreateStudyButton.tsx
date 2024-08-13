import { css } from "@styled-system/css";
import { Flex } from "@styled-system/jsx";

const CreateStudyButton = () => {
  return (
    <button className={createStudyButtonStyle}>
      <Flex gap="xs">
        <p className={css({ textStyle: "label1", color: "sub" })}>
          새로운 스터디 개설하기
        </p>
        <div className={PlusIconStyle}>+</div>
      </Flex>
    </button>
  );
};

export default CreateStudyButton;

const createStudyButtonStyle = css({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  borderRadius: "md",
  borderStyle: "dashed",
  borderWidth: "1px",
  borderColor: "outline",
  padding: "32px",
  _hover: {
    backgroundColor: "backgroundAlternative",
    borderWidth: "0px",
    cursor: "pointer",
  },
});

const PlusIconStyle = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "20px",
  height: "20px",
  borderRadius: "full",
  backgroundColor: "primary",
  color: "white",
});
