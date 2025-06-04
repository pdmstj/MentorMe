// Board_styles.ts
import styled from "styled-components";

export const BoardContainer = styled.div`
  max-width: 1200px;        // 전체 콘텐츠 폭 제한
  margin: 0 auto;           // 중앙 정렬
  padding: 40px 24px;       // 위아래 & 좌우 여백
  font-family: 'Pretendard', sans-serif;
`;

export const TopNavProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: #111827;
  font-weight: 500;
  cursor: pointer;
`;

export const ProfileImage = styled.img`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  object-fit: cover;
`;

// 상단 목록
export const TopNav = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 18px;
  color: #4b5563;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;
`;

export const TopNavItem = styled.div<{ $highlight?: boolean }>`
  cursor: pointer;
  color: ${({ $highlight }) => ($highlight ? "#6366f1" : "#4b5563")};
  font-weight: ${({ $highlight }) => ($highlight ? "600" : "normal")};
`;

// 로고
export const FixedImage = styled.img`
  position: fixed;
  top: 3px;
  left: 270px;
  width: 255px;
  height: 55px;
  z-index: 999;
  pointer-events: none; // 필요시 클릭 방지
`;

// 페이지 타이틀
export const PageTitle = styled.h1`
  font-size: 36px;
  font-weight: bold;
  margin: 0;
  margin-bottom: 20px;
  color: #111827;
`;

// 카테고리 메뉴 
export const CategoryMenu = styled.div`
  display: flex;
  gap: 2.6rem;
  margin-top: 0;       
  margin-bottom: 2rem;
  overflow-x: auto;
  padding : 0 15px;
  font-size: 18px
`;

// 전체 상단 바 (배경 + border-bottom)
export const TopBar = styled.div`
  width: 100%;
  background-color: #fff;
  border-bottom: 1px solid #e5e7eb;
`;

export const TitleSearchWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0 1.5rem 0;
  border-bottom: 2px solid #e5e7eb;
`;

export const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #F1F1F1;
  border-radius: 24px;
  padding: 8px 16px;
  transition: border-color 0.3s ease;
  border: 1px solid #F1F1F1;
  width: 267px;
  height: 38px;
  box-sizing: border-box;
  margin-bottom: 20px;

  &:focus-within {
    border: 2px solid #d0d0d0;
  }
`;

export const SearchIcon = styled.span`
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  color: #ACACAC;
  margin-right: 8px;
`;

export const SearchInput = styled.input`
  font-family: 'Pretendard', sans-serif;
  border: none;
  background: transparent;
  outline: none;
  font-size: 18px;
  color: #222;
  width: 100%;  /*267px*/
  &::placeholder {
    color: #ACACAC;
    font-size: 16px;
  }
`;

// 상단바 내부 콘텐츠 정렬 (고정폭 + 오른쪽 정렬)
export const TopBarContent = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  padding: 12px 24px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1.5rem;
`;

// 카테고리 아이템 스타일
export const CategoryItem = styled.div<{ active?: boolean }>`
  padding: 0.5rem 0;
  font-weight: normal;
  color: ${({ active }) => (active ? "#6366f1" : "#374151")};
  border-bottom: 3px solid ${({ active }) => (active ? "#6366f1" : "transparent")};
  cursor: pointer;
  white-space: nowrap;
  font-size: 18px;
`;

export const PostGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(366px, 1fr));
  gap: 1.5rem;
`;

export const PostCard = styled.div`
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  padding: 28px 24px 18px 24px;
  display: flex;
  flex-direction: column;
  min-height: 340px;
  position: relative;
  border: 1px solid #eee;
`;

export const PostTag = styled.div`
  font-size: 15px;
  color: #9ca3af;
  margin-bottom: 8px;
`;

export const PostTitle = styled.div`
  font-size: 22px;
  font-weight: 700;
  color: #111;
  margin-bottom: 13px;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  min-height: 3.2em;  // 1.6em(line-height) * 2줄 = 3.2em (필요에 따라 조절)
`;

export const PostProfileRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
  justify-content: flex-end;
`;

export const PostProfileImg = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
`;

export const PostProfileName = styled.div`
  font-size: 14px;
  color: #bdbdbd;
  font-weight: 500;
  margin-left: 10px;
`;

export const PostContent = styled.div`
  font-size: 16px;
  color: #444;
  margin-bottom: 24px;
  line-height: 1.6;
`;

export const PostActionBar = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: auto;
  padding-top: 8px;
`;

export const PostAction = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 15px;
  color: #6b7280;
  cursor: pointer;
  user-select: none;

  &.active {
    color: #6366f1; // 파란색
    font-weight: 600;
  }
`;

export const PostCommentInputWrapper = styled.div`
  position: relative;
  max-width: 199px;      // 최소 199px 보장
  width: 100%;           // 부모 영역만큼 늘어남
  max-width: 400px;      // 너무 길어지지 않게 최대값 설정
  display: flex;
  align-items: center;
  background: #f4f4f4;
  border-radius: 18px;
  padding: 6px 40px 6px 14px;
  margin: 0 8px;
  border: 1px solid #f4f4f4;
  transition: border-color 0.3s ease;

  &:focus-within {
    border: 2px solid #d0d0d0;
  }
`;

export const SendIcon = styled.img`
  position: absolute;
  right: 12px;
  width: 20px;
  height: 20px;
  cursor: pointer;
  user-select: none;
`;

export const PostCommentInput = styled.input`
  border: none;
  background: transparent;
  outline: none;
  font-size: 15px;
  width: 100%;
  color: #222;

  &::placeholder {
    color: #bdbdbd;
  }
`;

export const PostSendBtn = styled.button`
  background: none;
  border: none;
  color: #bbb;
  font-size: 22px;
  cursor: pointer;
  padding: 0 2px;
  display: flex;
  align-items: center;
`;

export const ContentWrapper = styled.div`
  display: flex;
  gap: 24px;
  align-items: flex-start;
`;

// 페이지네이션 컨테이너 (하단 고정)
export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  position: fixed;
  bottom: 80px;  /* 화면 하단에 고정 */
  left: 50%;
  transform: translateX(-50%);  /* 중앙 정렬 */
  z-index: 10;  /* 다른 요소 위에 표시되도록 */
`;

// 페이지 버튼
export const PageButton = styled.button<{ active?: boolean }>`
  width: 40px;               /* 버튼 크기 */
  height: 40px;              /* 버튼 크기 */
  border-radius: 50%;        /* 원형으로 만들기 */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  font-size: 18px;           /* 글자 크기 */
  cursor: pointer;
  border: 1px solid #ddd;
  background-color: ${({ active }) => (active ? "#6366f1" : "#fff")};
  color: ${({ active }) => (active ? "#fff" : "#6366f1")};
  transition: background-color 0.3s;

  &:hover {
    background-color: #ddd;
  }
`;

// 글 추가 버튼
export const WriteButtonWrapper = styled.div`
  position: fixed;
  bottom: 125px;
  right: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1000;
`;

// 버튼 스타일
export const WriteButton = styled.button`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: #6366f1;  // 보라색
  color: white;
  font-size: 32px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  z-index: 1000;

  &:hover {
    background-color: #4f46e5;
  }

  &:hover + div {
    opacity: 1;
    transform: translateY(0);
  }
`;

// hover시 글싸보임 효과
export const Tooltip = styled.div`
  margin-top: 8px;
  padding: 6px 12px;
  background-color: #374151;
  color: white;
  font-size: 13px;
  border-radius: 6px;
  white-space: nowrap;
  opacity: 0;
  transform: translateY(5px);
  transition: all 0.2s ease;
  pointer-events: none;
`;










