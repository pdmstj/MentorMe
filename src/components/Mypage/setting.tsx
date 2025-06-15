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

    const [interfaceMode, setInterfaceMode] = useState<'light' | 'dark'>('light');
    const [language, setLanguage] = useState<'ko' | 'en'>('ko');

    const [twoFactorAuth, setTwoFactorAuth] = useState(false);
    const [autoLogin, setAutoLogin] = useState(true);

    const toggleNotification = (key: keyof typeof notifications) => {
        setNotifications({ ...notifications, [key]: !notifications[key] });
    };

    return (
        <>
          <Link to="/"> {/* ✅ 로고를 클릭하면 홈으로 이동 */}
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
                    <InfoRow><a href="/Record">로그인 기록 보기</a></InfoRow>
                </Section>

                {/* 계정 관리 */}
                <Section>
                    <Title>계정 관리</Title>
                    <InfoRow><a href="/Withdrawal">회원탈퇴</a></InfoRow>
                    <InfoRow><a href="/logout">로그아웃</a></InfoRow>
                    <InfoRow><a href="backup">데이터 백업/다운로드</a></InfoRow>
                </Section>

                {/* 앱 정보 */}
                <Section>
                    <Title>앱 정보</Title>
                    <InfoRow>버전: 1.0.0</InfoRow>
                    <InfoRow><a href="/Customer Service">고객센터</a> / <a href="/Contact">문의하기</a></InfoRow>
                    <InfoRow><a href="/Personal information">개인정보 처리방침</a> / <a href="/Conditions">이용약관</a></InfoRow>
                </Section>
            </Container>
        </>
    );
};

export default SettingPage;