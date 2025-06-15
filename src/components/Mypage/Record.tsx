import React from "react";
import { Link } from "react-router-dom";
import {
  PageWrapper,
  SectionBox,
  SubTitle,
  RecordCard,
  DateText,
  ContentRow,
  TypeBox,
  FieldBox,
  FixedLogo
} from "./Record_styles";
import MypageTabs from "../../components/MypageTabs";
import logoImg from "../../image/Mentorme.png";

const records = [
  {
    type: "대화형 실전 면접",
    field: "기획·경영·마케팅 직군",
    date: "2025.06.13",
  },
  {
    type: "대화형 실전 면접",
    field: "디자인·미디어·콘텐츠 직군",
    date: "2025.06.13",
  },
  {
    type: "셀프 연습 면접",
    field: "기획·경영·마케팅 직군",
    date: "2025.06.13",
  },
];

const Record = () => {
  return (
    <>
      {/* 🔷 로고 + 탭 묶어서 상단 왼쪽 정렬 */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", padding: "20px 40px 0" }}>
        <Link to="/">
          <FixedLogo src={logoImg} alt="로고" />
        </Link>
        <div style={{ marginTop: "10px" }}>
          <MypageTabs />
        </div>
      </div>

      <PageWrapper>
        <SectionBox>
          <SubTitle>최근 면접 기록</SubTitle>
          {records.map((record, idx) => (
            <RecordCard key={idx}>
              <ContentRow>
                <TypeBox>{record.type}</TypeBox>
                <FieldBox>{record.field}</FieldBox>
              </ContentRow>
              <DateText>{record.date}</DateText>
            </RecordCard>
          ))}
        </SectionBox>
      </PageWrapper>
    </>
  );
};

export default Record;
