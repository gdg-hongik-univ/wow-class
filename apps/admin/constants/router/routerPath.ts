const rootPath = "studies";

export const routerPath = {
  createStudy: {
    description: "스터디 개설 페이지로 이동합니다",
    href: `/${rootPath}/create-study`,
  },
  root: {
    description: "멘토/어드민 페이지 접속화면입니다.",
    href: `/${rootPath}`,
  },
  "announcement-modify": {
    description: "스터디 공지를 수정할 수 있는 모달창입니다.",
    href: `/announcement-modify`,
  },
  "announcement-delete": {
    description: "스터디 공지를 삭제하기 위해 확인하는 모달창입니다.",
    href: `/announcement-delete`,
  },
  studyDetailInfo: {
    description: "스터디 관리 페이지로 이동합니다.",
    href: "/studies/detail-info/",
  },
  "detail-info-check": {
    description: "스터디 상세 페이지 작성을 확인하는 모달창입니다.",
    href: `/detail-info-check`,
  },
  "created-study-check": {
    description: "스터디 생성을 확인하는 모달창입니다.",
    href: "create-study/created-study-check",
  },
  "delete-study-check": {
    description: "스터디 생성을 확인하는 모달창입니다.",
    href: "/studies/delete-study-check",
  },
  "assignment-detail": {
    description: "과제 내용 보기 페이지로 이동합니다.",
    href: (studyDetailId: number | string) =>
      `/studies/assignments/${studyDetailId}`,
  },
  "assignment-edit": {
    description: "과제 개설/수정 페이지로 이동합니다.",
    href: (studyDetailId: number | string) =>
      `/studies/assignments/${studyDetailId}/edit-assignment`,
  },
  students: {
    description: "스터디 학생 관리 페이지로 이동합니다.",
    href: "/students",
  },
};
