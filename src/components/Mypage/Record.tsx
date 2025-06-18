import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { useUserContext } from "../../contexts/UserContext"; // ✅ 사용자 이름 사용

const Record = () => {
  const [records, setRecords] = useState([]);
  const { user } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecords = async () => {
      if (!user?.name) return;

      try {
        // ✅ 포트 번호 수정됨: 8000 → 5002
        const res = await fetch(`http://localhost:5002/feedbacks?user=${user.name}`);
        const data = await res.json();
        setRecords(data);
      } catch (err) {
        console.error("면접 기록 불러오기 실패", err);
      }
    };

    fetchRecords();
  }, [user]);

  return (
    <>
    <Link to="/">
          <FixedLogo src={logoImg} alt="로고" />
        </Link>

      <PageWrapper>
              {/* 🔷 로고 + 탭 묶어서 상단 왼쪽 정렬 */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", padding: "20px 40px 0" }}>
    
        <div style={{ marginTop: "10px" }}>
          <MypageTabs />
        </div>
      </div>
        <SectionBox>
          <SubTitle>최근 면접 기록</SubTitle>
          {records.length > 0 ? (
            records.map((record, idx) => {
              const filename = record.video_path?.split("/").pop();

              return (
                <RecordCard
                  key={idx}
                  onClick={() => navigate(`/record/${filename}`)}
                  style={{ cursor: "pointer" }}
                >
                  <ContentRow>
                    <TypeBox>{record.type}</TypeBox>
                    <FieldBox>{record.field || "직군 미지정"}</FieldBox>
                  </ContentRow>
                  <DateText>{new Date(record.timestamp).toLocaleDateString()}</DateText>
                </RecordCard>
              );
            })
          ) : (
            <p>저장된 면접 기록이 없습니다.</p>
          )}
        </SectionBox>
      </PageWrapper>
    </>
  );
};

export default Record;
