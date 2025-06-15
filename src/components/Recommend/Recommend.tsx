import React, { useRef, useEffect, useState, useMemo } from "react";
import Slider from "react-slick";
import { auth } from "../../firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import companiesRaw from "../../data/companies.json";

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
  ArrowButton
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
  const [filteredCompanies, setFilteredCompanies] = useState<CompanyType[]>([]);

  // ✅ 고정된 회사 데이터
  const allCompanies: CompanyType[] = useMemo(() => {
    const companiesData = companiesRaw as Record<string, CompanyType[]>;
    return Object.values(companiesData).flat();
  }, []);

  // ✅ 관심 직무 배열도 useMemo로 고정
  const userJobCategories = useMemo(() => ["IT개발", "디자인"], []);

  // 사용자 이름 가져오기
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        setUserName(user.displayName || user.email?.split("@")[0] || "사용자");
      } else {
        setUserName("사용자");
      }
    });
    return () => unsubscribe();
  }, []);

  // 필터링 로직 (무한 루프 방지됨)
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

      <InfoText>
        결과는 <Highlight>[마이페이지&gt;기업 추천]</Highlight>에서 다시 확인할 수 있어요
      </InfoText>
    </Container>
  );
};

export default Recommend;
