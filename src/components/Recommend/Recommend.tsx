import React, { useRef, useEffect, useState, useMemo} from "react";
import Slider from "react-slick";
import { auth } from "../../firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import companiesRaw from "../../data/companies.json";
import { useNavigate } from "react-router-dom"; 

import {
  Container,
  Title,
  CardArea,
  Card,
  CardImage,
  CardBody,
  CardTitle,
  CardTitleWrapper,
  CardDesc,
  TagList,
  Tag,
  HeartButton,
  HeartCount,
  InfoText,
  Highlight,
  StyledSlider,
  ArrowButton,
  ExitButton
} from "./Recommend_styles";

interface CompanyType {
  id?: string;
  name: string;
  description: string;
  tags: string[];
  jobCategories: string[];
  logo: string;
  heartCount?: number;
}

// 🔑 세부 직무 → 상위 직무 매핑 테이블
const jobMapping: Record<string, string> = {
  "기획·전략": "기획",
  "마케팅·홍보·조사": "기획",
  "상품기획·MD": "기획",
  "고객상담·TM": "기획",
  "구매·자재·물류": "기획",
  "온라인·운송·배송": "기획",

  "회계·세무·재무": "회계",
  "인사·노무·HRD": "회계",
  "총무·법무·사무": "회계",
  "금융·보험": "회계",
  "서비스": "회계",
  "생산": "회계",

  "IT개발·데이터": "IT개발",

  "디자인": "디자인",
  "미디어·문화·스포츠": "디자인",

  "의료": "의료",
  "연구·R&D": "의료",
  "교육": "의료",
  "공공·복지": "의료",

  "영업·판매·무역": "영업",
  "건설·건축": "건설"
};

const sliderSettings = {
  dots: false,
  infinite: false,
  speed: 600,
  slidesToShow: 6,
  slidesToScroll: 3,
  arrows: false
};

const Recommend: React.FC = () => {
  const sliderRef = useRef<Slider>(null);
  const [userName, setUserName] = useState<string>("사용자");
  const [userJobCategories, setUserJobCategories] = useState<string[]>([]);
  const [filteredCompanies, setFilteredCompanies] = useState<CompanyType[]>([]);
  const db = getFirestore();
  const navigate = useNavigate(); 

  const allCompanies: CompanyType[] = useMemo(() => {
    const companiesData = companiesRaw as Record<string, CompanyType[]>;
    return Object.values(companiesData).flat();
  }, []);

  // 사용자 정보 + 상위 job category 추출
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
      if (user) {
        setUserName(user.displayName || user.email?.split("@")[0] || "사용자");

        try {
          const userDocId = user.email?.replace(/[@.]/g, "_");
          if (!userDocId) return;

          const userDocRef = doc(db, "users", userDocId);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            if (Array.isArray(userData.jobs)) {
              const mappedJobs = [
                ...new Set(
                  userData.jobs
                    .map((job: string) => jobMapping[job])
                    .filter((job): job is string => !!job)
                )
              ];
              setUserJobCategories(mappedJobs);
            }
          }
        } catch (error) {
          console.error("사용자 데이터 불러오기 오류:", error);
        }
      } else {
        setUserName("사용자");
        setUserJobCategories([]);
      }
    });

    return () => unsubscribe();
  }, []);

  // 추천 기업 필터링
  useEffect(() => {
    const filtered = allCompanies.filter(company =>
      company.jobCategories.some(cat => userJobCategories.includes(cat))
    );
    setFilteredCompanies(filtered);
  }, [allCompanies, userJobCategories]);

  return (
    <Container>
      <Title>{userName} 님에게 꼭 맞는 기업을 추천해드려요!</Title>

      <ArrowButton
        aria-label="이전"
        onClick={() => sliderRef.current?.slickPrev()}
        style={{ position: "absolute", top: "50%", left: "70px", zIndex: 20 }}
      >
        {"<"}
      </ArrowButton>

      <ArrowButton
        aria-label="다음"
        onClick={() => sliderRef.current?.slickNext()}
        style={{ position: "absolute", top: "50%", right: "70px", zIndex: 20 }}
      >
        {">"}
      </ArrowButton>

      <CardArea style={{ position: "relative" }}>
        <StyledSlider ref={sliderRef} {...sliderSettings}>
          {filteredCompanies.length === 0 ? (
            <div>추천할 기업이 없습니다.</div>
          ) : (
            filteredCompanies.map((company, index) => (
              <Card key={company.id || index}>
                <CardImage src={company.logo || undefined} />
                <CardBody>
                  <CardTitleWrapper>
                    <CardTitle>{company.name}</CardTitle>
                    <HeartButton aria-label="관심기업">
                      ♡
                      <HeartCount>{company.heartCount || 0}</HeartCount>
                    </HeartButton>
                  </CardTitleWrapper>
                  <CardDesc>{company.description}</CardDesc>
                  <TagList>
                    {company.tags.map(tag => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </TagList>
                </CardBody>
              </Card>
            ))
          )}
        </StyledSlider>
      </CardArea>
      <ExitButton onClick={() => navigate("/")}>나가기</ExitButton>
      <InfoText>
        결과는 <Highlight>[마이페이지&gt;기업 추천]</Highlight>에서 다시 확인할 수 있어요
      </InfoText>
    </Container>
  );
};

export default Recommend;
