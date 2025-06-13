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

type Experience = {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
};

type Award = {
  title: string;
  organization: string;
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

  // 새로 추가된 상태들
  const [experiences, setExperiences] = useState<Experience[]>(() => {
    const saved = localStorage.getItem('experiences');
    return saved ? JSON.parse(saved) : [];
  });
  const [showExperienceInputs, setShowExperienceInputs] = useState(experiences.length > 0);

  const [awards, setAwards] = useState<Award[]>(() => {
    const saved = localStorage.getItem('awards');
    return saved ? JSON.parse(saved) : [];
  });
  const [showAwardInputs, setShowAwardInputs] = useState(awards.length > 0);

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

  // 경력 함수들
  const handleAddExperienceClick = () => {
    setShowExperienceInputs(true);
    const updated = [...experiences, { company: '', position: '', startDate: '', endDate: '' }];
    setExperiences(updated);
    localStorage.setItem('experiences', JSON.stringify(updated));
  };

  const handleAddExperience = () => {
    const updated = [...experiences, { company: '', position: '', startDate: '', endDate: '' }];
    setExperiences(updated);
    localStorage.setItem('experiences', JSON.stringify(updated));
  };

  const handleRemoveExperience = (index: number) => {
    const updated = [...experiences];
    updated.splice(index, 1);
    setExperiences(updated);
    localStorage.setItem('experiences', JSON.stringify(updated));
  };

  const handleExperienceChange = (index: number, field: string, value: string) => {
    const updated = [...experiences];
    updated[index][field] = value;
    setExperiences(updated);
    localStorage.setItem('experiences', JSON.stringify(updated));
  };

  // 수상내역 함수들
  const handleAddAwardClick = () => {
    setShowAwardInputs(true);
    const updated = [...awards, { title: '', organization: '', date: '' }];
    setAwards(updated);
    localStorage.setItem('awards', JSON.stringify(updated));
  };

  const handleAddAward = () => {
    const updated = [...awards, { title: '', organization: '', date: '' }];
    setAwards(updated);
    localStorage.setItem('awards', JSON.stringify(updated));
  };

  const handleRemoveAward = (index: number) => {
    const updated = [...awards];
    updated.splice(index, 1);
    setAwards(updated);
    localStorage.setItem('awards', JSON.stringify(updated));
  };

  const handleAwardChange = (index: number, field: string, value: string) => {
    const updated = [...awards];
    updated[index][field] = value;
    setAwards(updated);
    localStorage.setItem('awards', JSON.stringify(updated));
  };

  // 저장하기 버튼 클릭 시 전체 상태 저장 함수
  const handleSave = () => {
    localStorage.setItem('selectedJobs', JSON.stringify(selectedJobs));
    localStorage.setItem('selectedSkills', JSON.stringify(selectedSkills));
    localStorage.setItem('licenses', JSON.stringify(licenses));
    localStorage.setItem('experiences', JSON.stringify(experiences));
    localStorage.setItem('awards', JSON.stringify(awards));
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
                </>
              ) : (
                <p>유저 정보가 없습니다.</p>
              )}
            </div>

            <div>
              <ProfileImage src={profileImage} alt="프로필 이미지" />
              <ProfileButton htmlFor="profile-upload">사진 업로드</ProfileButton>
              <input
                id="profile-upload"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleProfileImageChange}
              />
            </div>
          </ProfileSection>
        </Section>

        {/* 2. 희망직무 선택 */}
        <Section id="job-selection">
          <Title>희망직무 선택</Title>
          <input
            type="text"
            placeholder="검색어 입력"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <JobList>
            {filteredJobs.map((job) => (
              <JobItem
                key={job}
                $isSelected={selectedJobs.includes(job)}
                onClick={() => toggleJob(job)}
              >
                {selectedJobs.includes(job) ? "✔" : "+"} {job}
              </JobItem>
            ))}
          </JobList>
        </Section>

        {/* 3. 보유기술 선택 */}
        <Section id="skill-selection">
          <Title>보유기술 선택</Title>
          <input
            type="text"
            placeholder="검색어 입력"
            value={skillSearchTerm}
            onChange={(e) => setSkillSearchTerm(e.target.value)}
          />
          <SkillList>
            {filteredSkills.map((skill) => (
              <SkillTag
                key={skill}
                $isSelected={selectedSkills.includes(skill)}
                onClick={() => toggleSkill(skill)}
              >
                {selectedSkills.includes(skill) ? "✔" : "+"} {skill}
              </SkillTag>
            ))}
          </SkillList>
        </Section>

        {/* 4. 자격증 입력 */}
        <Section id="license-input">
          <Title>자격증</Title>
          {showInputs ? (
            licenses.map((license, index) => (
              <LicenseInputRow key={index}>
                <input
                  type="text"
                  placeholder="자격증명"
                  value={license.name}
                  onChange={(e) => handleChange(index, "name", e.target.value)}
                />
                <input
                  type="text"
                  placeholder="발행처"
                  value={license.issuer}
                  onChange={(e) => handleChange(index, "issuer", e.target.value)}
                />
                <input
                  type="date"
                  placeholder="취득일"
                  value={license.date}
                  onChange={(e) => handleChange(index, "date", e.target.value)}
                />
                <RemoveButton onClick={() => handleRemoveLicense(index)}>X</RemoveButton>
              </LicenseInputRow>
            ))
          ) : (
            <AddLicenseButton onClick={handleAddClick}>+ 자격증 추가</AddLicenseButton>
          )}
          {showInputs && <AddLicenseButton onClick={handleAddLicense}>+ 자격증 추가</AddLicenseButton>}
        </Section>

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
        </LicenseInputRow>
      </Section>

        {/* 5. 경력 입력 */}
        <Section id="experience-input">
          <Title>경력</Title>
          {showExperienceInputs ? (
            experiences.map((exp, index) => (
              <LicenseInputRow key={index}>
                <input
                  type="text"
                  placeholder="회사명"
                  value={exp.company}
                  onChange={(e) => handleExperienceChange(index, "company", e.target.value)}
                />
                <input
                  type="text"
                  placeholder="직책"
                  value={exp.position}
                  onChange={(e) => handleExperienceChange(index, "position", e.target.value)}
                />
                <input
                  type="date"
                  placeholder="시작일"
                  value={exp.startDate}
                  onChange={(e) => handleExperienceChange(index, "startDate", e.target.value)}
                />
                <input
                  type="date"
                  placeholder="종료일"
                  value={exp.endDate}
                  onChange={(e) => handleExperienceChange(index, "endDate", e.target.value)}
                />
                <RemoveButton onClick={() => handleRemoveExperience(index)}>X</RemoveButton>
              </LicenseInputRow>
            ))
          ) : (
            <AddLicenseButton onClick={handleAddExperienceClick}>+ 경력 추가</AddLicenseButton>
          )}
          {showExperienceInputs && <AddLicenseButton onClick={handleAddExperience}>+ 경력 추가</AddLicenseButton>}
        </Section>

        {/* 6. 수상내역 입력 */}
        <Section id="award-input">
          <Title>수상내역</Title>
          {showAwardInputs ? (
            awards.map((award, index) => (
              <LicenseInputRow key={index}>
                <input
                  type="text"
                  placeholder="제목"
                  value={award.title}
                  onChange={(e) => handleAwardChange(index, "title", e.target.value)}
                />
                <input
                  type="text"
                  placeholder="기관"
                  value={award.organization}
                  onChange={(e) => handleAwardChange(index, "organization", e.target.value)}
                />
                <input
                  type="date"
                  placeholder="수상일"
                  value={award.date}
                  onChange={(e) => handleAwardChange(index, "date", e.target.value)}
                />
                <RemoveButton onClick={() => handleRemoveAward(index)}>X</RemoveButton>
              </LicenseInputRow>
            ))
          ) : (
            <AddLicenseButton onClick={handleAddAwardClick}>+ 수상내역 추가</AddLicenseButton>
          )}
          {showAwardInputs && <AddLicenseButton onClick={handleAddAward}>+ 수상내역 추가</AddLicenseButton>}
        </Section>

        {/* 저장 버튼 */}
        <Section>
          <button onClick={handleSave}>저장하기</button>
        </Section>
      </Container>
    </>
  );
};

export default Mypage;
