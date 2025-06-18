import React, { useState } from 'react';
import {
    Container, Section, Title, Select,
    InfoRow, FixedImage, SettingDropdown,
    SwitchLabel, SwitchInput, SwitchRow
} from './setting_styles';
import MypageTabs from '../../components/MypageTabs';
import logoImg from "../../image/Mentorme.png";
import { Link } from "react-router-dom";

const SettingPage: React.FC = () => {
    const [notifications, setNotifications] = useState({
        offer: true,
        interview: false,
        system: true,
    });

    const [notificationTime, setNotificationTime] = useState("08:00");
    const [interfaceMode, setInterfaceMode] = useState<'light' | 'dark'>('light');
    const [theme, setTheme] = useState<'light' | 'dark' | 'blue' | 'pink'>('light');
    const [language, setLanguage] = useState<'ko' | 'en'>('ko');
    const [twoFactorAuth, setTwoFactorAuth] = useState(false);
    const [autoLogin, setAutoLogin] = useState(true);
    const [marketingConsent, setMarketingConsent] = useState(true);

    const toggleNotification = (key: keyof typeof notifications) => {
        setNotifications({ ...notifications, [key]: !notifications[key] });
    };

    return (
        <>
            <Link to="/">
                <FixedImage src={logoImg} alt="로고" style={{ cursor: "pointer" }} />
            </Link>
            <MypageTabs />
            <Container>
                {/* 알림 설정 */}
                <Section>
                    <Title>알림 설정</Title>
                    <SwitchRow>
                        <SwitchLabel>기업 제안 알림</SwitchLabel>
                        <SwitchInput
                            type="checkbox"
                            checked={notifications.offer}
                            onChange={() => toggleNotification('offer')}
                        />
                    </SwitchRow>
                    <SwitchRow>
                        <SwitchLabel>면접 결과 알림</SwitchLabel>
                        <SwitchInput
                            type="checkbox"
                            checked={notifications.interview}
                            onChange={() => toggleNotification('interview')}
                        />
                    </SwitchRow>
                    <SwitchRow>
                        <SwitchLabel>시스템 공지 수신</SwitchLabel>
                        <SwitchInput
                            type="checkbox"
                            checked={notifications.system}
                            onChange={() => toggleNotification('system')}
                        />
                    </SwitchRow>
                    <Title>알림 수신 시간</Title>
                    <SettingDropdown>
                        <Select value={notificationTime} onChange={(e) => setNotificationTime(e.target.value)}>
                            <option value="08:00">오전 8시</option>
                            <option value="12:00">오후 12시</option>
                            <option value="18:00">오후 6시</option>
                            <option value="21:00">오후 9시</option>
                        </Select>
                    </SettingDropdown>
                </Section>

                {/* 인터페이스 설정 */}
                <Section>
                    <Title>언어 설정</Title>
                    <SettingDropdown>
                        <Select value={language} onChange={(e) => setLanguage(e.target.value as 'ko' | 'en')}>
                            <option value="ko">한국어</option>
                            <option value="en">영어</option>
                        </Select>
                    </SettingDropdown>

                    <Title>화면 모드</Title>
                    <SwitchRow>
                        <SwitchLabel>다크모드</SwitchLabel>
                        <SwitchInput
                            type="checkbox"
                            checked={interfaceMode === 'dark'}
                            onChange={() =>
                                setInterfaceMode((prev) => (prev === 'light' ? 'dark' : 'light'))
                            }
                        />
                    </SwitchRow>

                    <Title>테마 선택</Title>
                    <SettingDropdown>
                        <Select value={theme} onChange={(e) => setTheme(e.target.value as any)}>
                            <option value="light">라이트</option>
                            <option value="dark">다크</option>
                            <option value="blue">블루</option>
                            <option value="pink">핑크</option>
                        </Select>
                    </SettingDropdown>
                </Section>

                {/* 보안 및 로그인 */}
                <Section>
                    <Title>보안 및 로그인</Title>
                    <SwitchRow>
                        <SwitchLabel>2단계 인증</SwitchLabel>
                        <SwitchInput
                            type="checkbox"
                            checked={twoFactorAuth}
                            onChange={() => setTwoFactorAuth(!twoFactorAuth)}
                        />
                    </SwitchRow>
                    <SwitchRow>
                        <SwitchLabel>자동 로그인</SwitchLabel>
                        <SwitchInput
                            type="checkbox"
                            checked={autoLogin}
                            onChange={() => setAutoLogin(!autoLogin)}
                        />
                    </SwitchRow>
                    <SwitchRow>
                        <SwitchLabel>마케팅 수신 동의</SwitchLabel>
                        <SwitchInput
                            type="checkbox"
                            checked={marketingConsent}
                            onChange={() => setMarketingConsent(!marketingConsent)}
                        />
                    </SwitchRow>
                    <InfoRow><a href="/Record">로그인 기록 보기</a></InfoRow>
                </Section>

                {/* 계정 관리 */}
                <Section>
                    <Title>계정 관리</Title>
                    <InfoRow><a href="/change-password">비밀번호 변경</a></InfoRow>
                    <InfoRow><a href="/Withdrawal">회원탈퇴</a></InfoRow>
                    <InfoRow><a href="/logout">로그아웃</a></InfoRow>
                    <InfoRow><a href="/backup">데이터 백업/다운로드</a></InfoRow>
                </Section>

                {/* 앱 정보 */}
                <Section>
                    <Title>앱 정보</Title>
                    <InfoRow>버전: 1.0.0</InfoRow>
                    <InfoRow><a href="/Customer Service">고객센터</a> / <a href="/Contact">문의하기</a></InfoRow>
                    <InfoRow><a href="/Personal information">개인정보 처리방침</a> / <a href="/Conditions">이용약관</a></InfoRow>
                    <InfoRow><a href="/feedback">피드백 보내기</a></InfoRow>
                    <InfoRow>
                        <button onClick={() => {
                            localStorage.clear();
                            alert('캐시가 초기화되었습니다.');
                        }}>
                            캐시 초기화
                        </button>
                    </InfoRow>
                </Section>
            </Container>
        </>
    );
};

export default SettingPage;
