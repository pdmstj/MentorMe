import React, { useRef, useEffect, useState } from "react";
import Slider from "react-slick";
import { auth, db } from "../../firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import {
  Company,
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

const companies: Company[] = [
  { id: "naver", name: "네이버", description: "대한민국 대표 포털 사이트로 다양한 온라인 서비스를 제공하는 IT 기업.", tags: ["#UI/UX", "#그래픽"], image: "", heartCount: 764 },
  { id: "oliveyoung", name: "올리브영", description: "국내 최대 H&B(헬스&뷰티) 스토어로, 화장품·건강식품 등을 온·오프라인에서 판매.", tags: ["#UI/UX", "#영상"], image: "", heartCount: 956 },
  { id: "toss", name: "토스", description: "간편송금 서비스로 시작해 금융, 투자, 보험까지 아우르는 금융 플랫폼.", tags: ["#UI/UX", "#그래픽"], image: "", heartCount: 865 },
  { id: "google", name: "구글", description: "세계 최대 검색 엔진과 운영체제, 안드로이드, 유튜브, 클라우드 등 다양한 IT 서비스 제공.", tags: ["#UI/UX", "#3D"], image: "", heartCount: 485 },
  { id: "apple", name: "애플", description: "글로벌 테크 기업으로, 하드웨어·소프트웨어·서비스 등 완성형 생태계를 구축.", tags: ["#UI/UX", "#3D", "#영상"], image: "", heartCount: 236 },
  { id: "samsung", name: "삼성", description: "글로벌 전자 기업으로 스마트폰, 가전, 반도체 등 다양한 분야에서 활동.", tags: ["#UI/UX", "#그래픽", "#영상"], image: "", heartCount: 1000 },
  { id: "microsoft", name: "마이크로소프트", description: "세계적인 소프트웨어 기업으로, Windows 운영체제와 Office 제품군 등을 제공.", tags: ["#UI/UX", "#3D", "#그래픽"], image: "", heartCount: 1123 },
  { id: "app", name: "애플", description: "글로벌 테크 기업으로, 하드웨어·소프트웨어·서비스 등 완성형 생태계를 구축.", tags: ["#UI/UX", "#3D", "#영상"], image: "", heartCount: 236 },
  { id: "samsg", name: "삼성", description: "글로벌 전자 기업으로 스마트폰, 가전, 반도체 등 다양한 분야에서 활동.", tags: ["#UI/UX", "#그래픽", "#영상"], image: "", heartCount: 1000 },
  { id: "microft", name: "마이크로소프트", description: "세계적인 소프트웨어 기업으로, Windows 운영체제와 Office 제품군 등을 제공.", tags: ["#UI/UX", "#3D", "#그래픽"], image: "", heartCount: 1123 },
  { id: "samsg", name: "삼성", description: "글로벌 전자 기업으로 스마트폰, 가전, 반도체 등 다양한 분야에서 활동.", tags: ["#UI/UX", "#그래픽", "#영상"], image: "", heartCount: 1000 },
  { id: "microft", name: "마이크로소프트", description: "세계적인 소프트웨어 기업으로, Windows 운영체제와 Office 제품군 등을 제공.", tags: ["#UI/UX", "#3D", "#그래픽"], image: "", heartCount: 1123 },
];

// 슬라이드 설정
const sliderSettings = {
  dots: false,
  infinite: false,
  speed: 600,
  slidesToShow: 4,
  slidesToScroll: 3,
  arrows: false
};

const Recommend: React.FC = () => {
  const sliderRef = useRef<Slider>(null);
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    // 로그인 상태 감지
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        // displayName이 없으면 이메일에서 이름 추출하는 등 추가 처리 가능
        setUserName(user.displayName || user.email?.split("@")[0] || "사용자");
      } else {
        setUserName("사용자");  // 비로그인 상태 시 기본값
      }
    });

    return () => unsubscribe();
  }, []);

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
          {companies.map((company) => (
            <Card key={company.id}>
              <CardImage src={company.image || undefined} />
              <CardBody>
                <CardTitleWrapper>
                  <CardTitle>{company.name}</CardTitle>
                  <HeartButton aria-label="관심기업">
                    ♡
                    <HeartCount>{company.heartCount}</HeartCount>
                  </HeartButton>
                </CardTitleWrapper>
                <CardDesc>{company.description}</CardDesc>
                <TagList>
                  {company.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </TagList>
              </CardBody>
            </Card>
          ))}
        </StyledSlider>
      </CardArea>
      <InfoText>
        결과는 <Highlight>[마이페이지&gt;기업 추천]</Highlight>에서 다시 확인할 수 있어요
      </InfoText>
    </Container>
  );
};

export default Recommend;
