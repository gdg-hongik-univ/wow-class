import { studyApi } from "apis/study/studyApi";
import { metaData } from "constants/metaData";

import CreateStudyDetailInfo from "./_components/CreateStudyDetailInfo";

export const generateMetadata = async ({
  params: { studyId },
}: {
  params: { studyId: string };
}) => {
  const study = await studyApi.getStudyBasicInfo(+studyId);
  return {
    title: study
      ? `${study.title} 스터디 상세 작성하기`
      : "스터디 상세 작성하기",
    openGraph: {
      ...metaData.openGraph,
      ...(study && {
        title: `${study.title} 스터디 상세 작성하기`,
        description: study.description,
      }),
    },
  };
};

const CreateStudyDetailInfoPage = ({
  params,
}: {
  params: { studyId: string };
}) => {
  return <CreateStudyDetailInfo params={params} />;
};

export default CreateStudyDetailInfoPage;
