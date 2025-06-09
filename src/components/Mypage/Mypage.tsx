import React, { useState, useMemo, useContext } from "react";
import {
  Container,
  FixedImage,
  Section,
  Title,
  ProfileSection,
  ProfileImage,
  ProfileButton,
  InfoRow,
  Select,
  JobList,
  JobItem,
  SkillList,
  SkillTag,
  AddLicenseButton,
  LicenseInputRow,
  RemoveButton,
} from "./Mypage_styles";
import { Link } from 'react-router-dom'; 
import { UserContext } from "../../contexts/UserContext";

import logoImg from "../../image/Mentorme.png";
import profileDefault from "../../image/ko.jpg";

type License = {
  name: string;
  issuer: string;
  date: string;
};

const jobOptions = [
  '기획·전략', '마케팅·홍보·조사', '회계·세무·재무', '인사·노무·HRD', '총무·법무·사무',
  'IT개발·데이터', '디자인', '영업·판매·무역', '고객상담·TM', '구매·자재·물류',
  '상품기획·MD', '온라인·운송·배송', '서비스', '생산', '건설·건축', '의료',
  '연구·R&D', '교육', '미디어·문화·스포츠', '금융·보험', '공공·복지'
];

const skillOptions = [
  'React', 'Javascript', 'JAVA', 'CSS', '의사소통',
  'TypeScript', 'HTML', 'MySQL', 'Redux', '명확성',
  'Git', 'Angular', 'ReactJS', 'AWS', '분석력',
  'RDBMS', 'JPA', 'Spring Boot', 'Jquery', '경쟁력'
];

const Mypage = () => {
  const { user } = useContext(UserContext);

  const [profileImage, setProfileImage] = useState<string>(() => {
    return localStorage.getItem('profileImage') || profileDefault;
  });

  const [selectedJobs, setSelectedJobs] = useState<string[]>(() => {
    const saved = localStorage.getItem('selectedJobs');
    return saved ? JSON.parse(saved) : [];
  });
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedSkills, setSelectedSkills] = useState<string[]>(() => {
    const saved = localStorage.getItem('selectedSkills');
    return saved ? JSON.parse(saved) : [];
  });
  const [skillSearchTerm, setSkillSearchTerm] = useState("");

  const [licenses, setLicenses] = useState<License[]>(() => {
    const saved = localStorage.getItem('licenses');
    return saved ? JSON.parse(saved) : [];
  });
  const [showInputs, setShowInputs] = useState(licenses.length > 0);

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && typeof event.target.result === 'string') {
          setProfileImage(event.target.result);
          localStorage.setItem('profileImage', event.target.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const filteredJobs = useMemo(() => {
    return jobOptions.filter(job =>
      job.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const filteredSkills = useMemo(() => {
    return skillOptions.filter(skill =>
      skill.toLowerCase().includes(skillSearchTerm.toLowerCase())
    );
  }, [skillSearchTerm]);

  const toggleJob = (job: string) => {
    setSelectedJobs(prev => {
      const updated = prev.includes(job) ? prev.filter(j => j !== job) : [...prev, job];
      localStorage.setItem('selectedJobs', JSON.stringify(updated));
      return updated;
    });
  };

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => {
      const updated = prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill];
      localStorage.setItem('selectedSkills', JSON.stringify(updated));
      return updated;
    });
  };

  const handleAddClick = () => {
    setShowInputs(true);
    const updated = [...licenses, { name: '', issuer: '', date: '' }];
    setLicenses(updated);
    localStorage.setItem('licenses', JSON.stringify(updated));
  };

  const handleAddLicense = () => {
    const updated = [...licenses, { name: '', issuer: '', date: '' }];
    setLicenses(updated);
    localStorage.setItem('licenses', JSON.stringify(updated));
  };

  const handleRemoveLicense = (index: number) => {
    const updated = [...licenses];
    updated.splice(index, 1);
    setLicenses(updated);
    localStorage.setItem('licenses', JSON.stringify(updated));
  };

  const handleChange = (index: number, field: string, value: string) => {
    const updated = [...licenses];
    updated[index][field] = value;
    setLicenses(updated);
    localStorage.setItem('licenses', JSON.stringify(updated));
  };

  // 저장하기 버튼 클릭 시 전체 상태 저장 함수
  const handleSave = () => {
    localStorage.setItem('selectedJobs', JSON.stringify(selectedJobs));
    localStorage.setItem('selectedSkills', JSON.stringify(selectedSkills));
    localStorage.setItem('licenses', JSON.stringify(licenses));
    alert("저장되었습니다!");
  };

  return (
    <>
      <Link to="/">
        <FixedImage
          src={logoImg}
          alt="로고"
          style={{ cursor: "pointer" }}
        />
      </Link>

      <Container>
        {/* 1. 기본정보 섹션 */}
        <Section id="basic-info">
          <ProfileSection>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "1rem" }}>
                <h1 style={{ margin: 0, fontSize: "1.6rem" }}>
                  {user ? user.name : "로그인 필요"}
                </h1>
                <Select style={{ minWidth: "140px", marginBottom: 0 }}>
                  <option>신입</option>
                  <option>경력</option>
                </Select>
              </div>
              {user ? (
                <>
                  <p>{user.birth} (만 {2025 - parseInt(user.birth.slice(0, 4))}세)</p>
                  <InfoRow>📧 {user.email}</InfoRow>
                  <InfoRow>📞 {user.phone}</InfoRow>
                  <InfoRow>🏠 주소를 입력하세요</InfoRow>
                </>
              ) : (
                <p>로그인된 사용자 정보가 없습니다.</p>
              )}
            </div>
            <div>
              <ProfileImage src={profileImage} alt="profile" />
              <ProfileButton as="label" htmlFor="profileUpload">✏️</ProfileButton>
              <input
                type="file"
                id="profileUpload"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleProfileImageChange}
              />
            </div>
          </ProfileSection>
        </Section>

        {/* 2. 선호 정보 섹션 */}
        <Section id="preference-info">
          <Title>선호 정보</Title>
          <div style={{ position: "relative", width: "950px", marginBottom: "10px" }}>
            <input
              type="text"
              placeholder="직업(직무) 또는 전문분야 입력"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{
                padding: "12px 48px 12px 16px",
                border: "1.5px solid #ccc",
                width: "1000px",
                fontSize: "1rem",
                boxSizing: "border-box",
              }}
            />
          </div>
          <JobList>
            {filteredJobs.map(job => (
              <JobItem
                key={job}
                isSelected={selectedJobs.includes(job)}
                onClick={() => toggleJob(job)}
              >
                {selectedJobs.includes(job) ? '✔' : '+'} {job}
              </JobItem>
            ))}
          </JobList>
        </Section>

        {/* 3. 지식/기술 섹션 */}
        <Section id="skill-info">
          <Title>지식 · 기술</Title>
          <div style={{ position: "relative", width: "100%", maxWidth: "950px", marginBottom: "20px" }}>
            <input
              type="text"
              placeholder="찾으시는 스킬이 있나요?"
              value={skillSearchTerm}
              onChange={e => setSkillSearchTerm(e.target.value)}
              style={{
                padding: "12px 48px 12px 16px",
                border: "1.5px solid #ccc",
                width: "1000px",
                fontSize: "1rem",
                boxSizing: "border-box",
              }}
            />
          </div>
          <SkillList>
            {filteredSkills.map(skill => (
              <SkillTag
                key={skill}
                isSelected={selectedSkills.includes(skill)}
                onClick={() => toggleSkill(skill)}
              >
                {selectedSkills.includes(skill) ? '✔' : '+'} {skill}
              </SkillTag>
            ))}
          </SkillList>
        </Section>

        {/* 4. 자격증 섹션 */}
        <Section id="certificate-info">
          <Title>자격증</Title>
          {showInputs && licenses.map((license, index) => (
            <LicenseInputRow key={index}>
              <input
                type="text"
                placeholder="자격증명"
                value={license.name}
                onChange={(e) => handleChange(index, 'name', e.target.value)}
              />
              <input
                type="text"
                placeholder="발행처"
                value={license.issuer}
                onChange={(e) => handleChange(index, 'issuer', e.target.value)}
              />
              <input
                type="text"
                placeholder="취득일"
                value={license.date}
                onChange={(e) => handleChange(index, 'date', e.target.value)}
              />
              <RemoveButton onClick={() => handleRemoveLicense(index)}>✕</RemoveButton>
            </LicenseInputRow>
          ))}
          <AddLicenseButton onClick={showInputs ? handleAddLicense : handleAddClick}>
            + 자격증 추가
          </AddLicenseButton>
        </Section>

        {/* 5. 학력 */}
        <Section id="education-info">
          <Title>학력</Title>
          <LicenseInputRow>
            <input type="text" placeholder="학교명" />
            <input type="text" placeholder="전공" />
            <input type="text" placeholder="입학년도 (예: 2021)" />
            <input type="text" placeholder="졸업년도 (예: 2025)" />
            <Select>
              <option>재학중</option>
              <option>졸업</option>
              <option>중퇴</option>
            </Select>
            <RemoveButton>✕</RemoveButton>
          </LicenseInputRow>
          <AddLicenseButton>+ 학력 추가</AddLicenseButton>
        </Section>

        {/* 6. 경력 */}
        <Section id="career-info">
          <Title>경력</Title>
          <LicenseInputRow>
            <input type="text" placeholder="회사명" />
            <input type="text" placeholder="직무" />
            <input type="text" placeholder="입사일 (예: 2022.01)" />
            <input type="text" placeholder="퇴사일 (예: 2024.12)" />
            <Select>
              <option>재직중</option>
              <option>퇴사</option>
            </Select>
            <RemoveButton>✕</RemoveButton>
          </LicenseInputRow>
          <AddLicenseButton>+ 경력 추가</AddLicenseButton>
        </Section>

        {/* 7. 수상내역 */}
        <Section id="award-info">
          <Title>수상내역</Title>
          <LicenseInputRow>
            <input type="text" placeholder="수상명" />
            <input type="text" placeholder="발급 기관" />
            <input type="text" placeholder="수상일 (예: 2023.05)" />
            <RemoveButton>✕</RemoveButton>
          </LicenseInputRow>
          <AddLicenseButton>+ 수상내역 추가</AddLicenseButton>
        </Section>

        {/* 저장하기 버튼 */}
        <Section style={{ textAlign: "center", marginTop: "30px" }}>
          <AddLicenseButton
            onClick={handleSave}
            style={{
              backgroundColor: '#6482ED',
              color: 'white',
              padding: '12px 24px',
              fontSize: '1rem',
              borderRadius: '12px',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            저장하기
          </AddLicenseButton>
        </Section>

      </Container>
    </>
  );
};

export default Mypage;

