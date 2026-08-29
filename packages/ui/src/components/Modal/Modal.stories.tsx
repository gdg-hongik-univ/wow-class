import type { Meta, StoryObj } from "@storybook/react";
import { useOpenState } from "src/hooks";

import Text from "../Text";
import type { ModalProps } from ".";
import Modal from ".";

const meta: Meta<ModalProps> = {
  title: "Shared/Modal",
  component: Modal,
  tags: ["autodocs"],
  parameters: {
    componentSubtitle: "Modal 컴포넌트",
  },
  argTypes: {
    onClose: {
      description: "Modal 컴포넌트를 닫을 수 있는 함수를 나타냅니다.",
      table: {
        type: { summary: "function" },
        control: false,
      },
    },
    children: {
      description: "Modal 컴포넌트의 자식 컴포넌트를 나타냅니다.",
      table: {
        type: { summary: "ReactNode" },
        control: false,
      },
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <Text as="h1" typo="h1">
        상세 정보가 등록되었어요.
      </Text>
    ),
    onClose: () => {
      console.log("모달 닫기");
    },
  },
};

export const StateModal = () => {
  const { open, onOpen, onClose } = useOpenState();

  return (
    <>
      <button onClick={onOpen}>모달 열기</button>
      {open && (
        <Modal onClose={onClose}>
          <Text as="h1" typo="h1">
            상세 정보가 등록되었어요.
          </Text>
        </Modal>
      )}
    </>
  );
};
