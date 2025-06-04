import React, { useState } from "react";
import {
    TopBar,
    TopBarContent,
    TopNavItem,
    TopNavProfile,
    ProfileImage,
    BoardContainer,
    PageTitle,
    CategoryMenu,
    CategoryItem,
    PostGrid,
    PostCard,
    PostTag,
    PostTitle,
    PostProfileRow,
    PostProfileImg,
    PostProfileName,
    PostContent,
    PostActionBar,
    PostAction,
    PostCommentInputWrapper,
    PostCommentInput,
    SendIcon,
    TitleSearchWrapper,
    SearchBarContainer,
    SearchIcon,
    SearchInput,
    PaginationContainer,
    PageButton,
    WriteButtonWrapper,
    WriteButton,
    Tooltip,
    FixedImage
} from "./Board_styles";
// 이미지 import
import accountImg from "../../image/account.png";
import profile from "../../image/account.png";
import heartIcon from "../../image/heart.png";
import heartBlue from "../../image/heart_blue.png";
import shareIcon from "../../image/share.png";
import sendIcon from "../../image/send.png";
// 로고 import
import logoImg from "../../image/Mentorme.png";

const categories = [
    "전체",
    "면접 자료 & 꿀팁 공유",
    "면접 경험 공유",
    "모의 면접 & 피드백",
    "취업고민 & 자유게시판",
    "기업별 면접 트렌드 분석",
    "전문가 & AI 피드백 제공",
];

type Post = {
    id: number;
    tag: string;
    title: string;
    profileName: string;
    profileImg: string;
    content: string;
    like: number;
    share: number;
};

const posts: Post[] = [
    {
        id: 1,
        tag: "면접 후기 공유",
        title: "[카카오 면접 후기] 생각보다 논리력이 중요했던 면접이었어요",
        profileName: "오레오맛 콜라",
        profileImg: profile,
        content: "기술 면접보다는 문제 해결력과 논리적인 사고를 중요하게 보는 느낌이었어요. ‘디자인을 할 때 사용자의 행동을 어떻게 예측할 것인가?’ 같은 질문이 나왔고, 그냥 기능 설명하는 게 아니라 실제 유저 사례를 들어서 설명해야 했어요.",
        like: 458,
        share: 269,
    },
    {
        id: 2,
        tag: "모의 면접 매칭 & 피드백",
        title: "[모의 면접 구합니다! PM 직군]",
        profileName: "마이멜로디",
        profileImg: profile,
        content: "PM 직군 준비 중인데 모의 면접 같이 연습하실 분 구해요! 서로 피드백 주고받으면서 연습하면 좋을 것 같아요. 관심 있으신 분 댓글 주세요~",
        like: 695,
        share: 486,
    },
    {
        id: 3,
        tag: "면접 질문 데이터베이스",
        title: "[UX/UI 디자인] 지원동기 질문에 이런 답변 괜찮을까요?",
        profileName: "동그리에몽",
        profileImg: profile,
        content: "저는 UI/UX 디자인이 사용자 경험을 개선하는 과정이라는 점에서 매력을 느꼈습니다. 특히 지난 프로젝트에서 사용성 테스트를 진행하며 사용자 입장에서 디자인하는 것이 중요하다는 걸 깨달았습니다. 이를 바탕으로 우리 회사에서 고객 중심의 디자인을 만들고 싶습니다.",
        like: 154,
        share: 76,
    },
    {
        id: 4,
        tag: "면접 자료 & 꿀팁 공유",
        title: "[UX/UI 디자이너] 면접에서 포트폴리오 발표할 때 주의할 점",
        profileName: "디자인이 조아",
        profileImg: profile,
        content: "프로젝트 과정에서 내가 한 역할을 명확하게 설명하기! 디자인을 왜 그렇게 했는지, 선택의 이유를 논리적으로 말하기~ 기능 설명만 하지 말고, 문제 해결 과정과 결과를 강조하기!! 사용자 반응 및 피드백 반영한 사례 있으면 어필하기 이렇게만 해봐~",
        like: 784,
        share: 568,
    },
    {
        id: 5,
        tag: "기업별 면접 트렌드 분석",
        title: "[네이버 면접 후기] 최근 AI 관련 질문이 많아졌어요!",
        profileName: "졸리다핑",
        profileImg: profile,
        content: "네이버 면접에서 AI와 디자인의 접점에 대한 질문을 받았어요. AI를 활용한 UX 개선 사례나 인터랙션 디자인 관련 지식이 중요해진 것 같아요. 요즘 면접 보시는 분들은 AI 관련 경험도 정리해 두시면 좋을 것 같아요!",
        like: 148,
        share: 102,
    },
    {
        id: 6,
        tag: "취업 고민 & 자유게시판",
        title: "[취업 고민] 나만 너무 늦은 것 같아서 불안해요...",
        profileName: "우에에에잉",
        profileImg: profile,
        content: "친구들은 다 취업 준비 끝나가는데 저는 아직도 면접 준비 중이라 조급하네요. 다들 이런 고민 안 해보셨나요?",
        like: 378,
        share: 415,
    },
    {
        id: 5,
        tag: "기업별 면접 트렌드 분석",
        title: "[네이버 면접 후기] 최근 AI 관련 질문이 많아졌어요!",
        profileName: "졸리다핑",
        profileImg: profile,
        content: "네이버 면접에서 AI와 디자인의 접점에 대한 질문을 받았어요. AI를 활용한 UX 개선 사례나 인터랙션 디자인 관련 지식이 중요해진 것 같아요. 요즘 면접 보시는 분들은 AI 관련 경험도 정리해 두시면 좋을 것 같아요!",
        like: 148,
        share: 102,
    },
    {
        id: 6,
        tag: "취업 고민 & 자유게시판",
        title: "[취업 고민] 나만 너무 늦은 것 같아서 불안해요...",
        profileName: "우에에에잉",
        profileImg: profile,
        content: "친구들은 다 취업 준비 끝나가는데 저는 아직도 면접 준비 중이라 조급하네요. 다들 이런 고민 안 해보셨나요?",
        like: 378,
        share: 415,
    },
    {
        id: 7,
        tag: "면접 후기 공유",
        title: "[카카오 면접 후기] 생각보다 논리력이 중요했던 면접이었어요",
        profileName: "오레오맛 콜라",
        profileImg: profile,
        content: "기술 면접보다는 문제 해결력과 논리적인 사고를 중요하게 보는 느낌이었어요. ‘디자인을 할 때 사용자의 행동을 어떻게 예측할 것인가?’ 같은 질문이 나왔고, 그냥 기능 설명하는 게 아니라 실제 유저 사례를 들어서 설명해야 했어요.",
        like: 458,
        share: 269,
    },
    {
        id: 8,
        tag: "모의 면접 매칭 & 피드백",
        title: "[모의 면접 구합니다! PM 직군]",
        profileName: "마이멜로디",
        profileImg: profile,
        content: "PM 직군 준비 중인데 모의 면접 같이 연습하실 분 구해요! 서로 피드백 주고받으면서 연습하면 좋을 것 같아요. 관심 있으신 분 댓글 주세요~",
        like: 695,
        share: 486,
    },
    {
        id: 9,
        tag: "면접 질문 데이터베이스",
        title: "[UX/UI 디자인] 지원동기 질문에 이런 답변 괜찮을까요?",
        profileName: "동그리에몽",
        profileImg: profile,
        content: "저는 UI/UX 디자인이 사용자 경험을 개선하는 과정이라는 점에서 매력을 느꼈습니다. 특히 지난 프로젝트에서 사용성 테스트를 진행하며 사용자 입장에서 디자인하는 것이 중요하다는 걸 깨달았습니다. 이를 바탕으로 우리 회사에서 고객 중심의 디자인을 만들고 싶습니다.",
        like: 154,
        share: 76,
    },
    {
        id: 10,
        tag: "면접 자료 & 꿀팁 공유",
        title: "[UX/UI 디자이너] 면접에서 포트폴리오 발표할 때 주의할 점",
        profileName: "디자인이 조아",
        profileImg: profile,
        content: "프로젝트 과정에서 내가 한 역할을 명확하게 설명하기! 디자인을 왜 그렇게 했는지, 선택의 이유를 논리적으로 말하기~ 기능 설명만 하지 말고, 문제 해결 과정과 결과를 강조하기!! 사용자 반응 및 피드백 반영한 사례 있으면 어필하기 이렇게만 해봐~",
        like: 784,
        share: 568,
    },
    {
        id: 11,
        tag: "취업 고민 & 자유게시판",
        title: "[취업 고민] 나만 너무 늦은 것 같아서 불안해요...",
        profileName: "우에에에잉",
        profileImg: profile,
        content: "친구들은 다 취업 준비 끝나가는데 저는 아직도 면접 준비 중이라 조급하네요. 다들 이런 고민 안 해보셨나요?",
        like: 378,
        share: 415,
    },
    {
        id: 12,
        tag: "면접 후기 공유",
        title: "[카카오 면접 후기] 생각보다 논리력이 중요했던 면접이었어요",
        profileName: "오레오맛 콜라",
        profileImg: profile,
        content: "기술 면접보다는 문제 해결력과 논리적인 사고를 중요하게 보는 느낌이었어요. ‘디자인을 할 때 사용자의 행동을 어떻게 예측할 것인가?’ 같은 질문이 나왔고, 그냥 기능 설명하는 게 아니라 실제 유저 사례를 들어서 설명해야 했어요.",
        like: 458,
        share: 269,
    },

];

const Board = () => {
    const [likedArr, setLikedArr] = useState<boolean[]>(Array(posts.length).fill(false));
    const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 6;

    // 페이지에 맞게 게시글 필터링
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    // 페이지 변경 함수
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleLikeClick = idx => {
        setLikedArr(prev =>
            prev.map((liked, i) => (i === idx ? !liked : liked))
        );
    };

    const handleCategoryClick = (index: number) => {
        setSelectedCategoryIndex(index);
    };

    return (
        <>
            {/* 전체 상단바 (BoardContainer 바깥) */}
            <FixedImage src={logoImg} alt="로고" />
            <TopBar>
                <TopBarContent>
                    <TopNavItem>내 게시판</TopNavItem>
                    <TopNavProfile>
                        <ProfileImage src={accountImg} alt="프로필" />
                        김미림
                    </TopNavProfile>
                    <TopNavItem>설정</TopNavItem>
                    <TopNavItem $highlight>로그아웃</TopNavItem>
                </TopBarContent>
            </TopBar>

            {/* 게시판 본문 */}
            <BoardContainer>
                <TitleSearchWrapper>
                    <PageTitle>면접 커뮤니티</PageTitle>
                    <SearchBarContainer>
                        <SearchIcon>
                            {/* 통합 검색 SVG 돋보기 아이콘 */}
                            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <circle cx="11" cy="11" r="7" />
                                <line x1="17" y1="17" x2="21" y2="21" />
                            </svg>
                        </SearchIcon>
                        <SearchInput placeholder="통합 검색" />
                    </SearchBarContainer>
                </TitleSearchWrapper>
                <CategoryMenu>
                    {categories.map((category, index) => (
                        <CategoryItem
                            key={index}
                            active={index === selectedCategoryIndex}
                            onClick={() => handleCategoryClick(index)}
                        >
                            {category}
                        </CategoryItem>
                    ))}
                </CategoryMenu>

                {/* 게시물 보여줌 */}
                <PostGrid>
                    {currentPosts.map((post, idx) => (
                        <PostCard key={post.id}>
                            <PostTag>{post.tag}</PostTag>
                            <PostTitle>{post.title}</PostTitle>
                            <PostProfileRow>
                                <PostProfileImg>
                                    <img src={post.profileImg} alt="프로필" />
                                </PostProfileImg>
                                <PostProfileName>{post.profileName}</PostProfileName>
                            </PostProfileRow>
                            <PostContent>{post.content}</PostContent>
                            <PostActionBar>
                                <PostAction
                                    className={likedArr[idx] ? "active" : ""}
                                    onClick={() => handleLikeClick(idx)}
                                >
                                    <img
                                        src={likedArr[idx] ? heartBlue : heartIcon}
                                        alt="좋아요"
                                        width={20}
                                        height={20}
                                    />
                                    {post.like + (likedArr[idx] ? 1 : 0)}
                                </PostAction>
                                <PostAction>
                                    <img src={shareIcon} alt="공유" width={20} height={20} style={{ display: 'block' }} />
                                    {post.share}
                                </PostAction>
                                <PostCommentInputWrapper>
                                    <PostCommentInput placeholder="댓글 달기" />
                                    <SendIcon src={sendIcon} alt="보내기" />
                                </PostCommentInputWrapper>
                            </PostActionBar>
                        </PostCard>
                    ))}
                </PostGrid>
                {/* 페이지네이션 */}
                <PaginationContainer>
                    {Array.from({ length: Math.ceil(posts.length / postsPerPage) }).map((_, index) => (
                        <PageButton
                            key={index + 1}
                            onClick={() => handlePageChange(index + 1)}
                            active={currentPage === index + 1}
                        >
                            {index + 1}
                        </PageButton>
                    ))}
                </PaginationContainer>
            </BoardContainer>
            <WriteButtonWrapper>
                <WriteButton>
                    +
                </WriteButton>
                <Tooltip>글 작성</Tooltip>
            </WriteButtonWrapper>
        </>
    );
};

export default Board;
