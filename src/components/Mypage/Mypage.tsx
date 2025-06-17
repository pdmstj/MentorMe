import React, { useState, useMemo, useEffect } from "react";
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
import { useUserContext } from "../../contexts/UserContext";
import { doc, setDoc, getDoc, Timestamp } from "firebase/firestore";
import { db } from "../../firebase";

import logoImg from "../../image/Mentorme.png";
import profileDefault from "../../image/ko.jpg";

type License = {
  name: string;
  issuer: string;
  date: string;
};

type Education = {
  school: string;
  major: string;
  startYear: string;
  endYear: string;
  status: string;
};

type Career = {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  status: string;
};

type Award = {
  name: string;
  issuer: string;
  date: string;
};

const jobOptions = ['기획·전략', '마케팅·홍보·조사', '회계·세무·재무', '인사·노무·HRD', '총무·법무·사무',
  'IT개발·데이터', '디자인', '영업·판매·무역', '고객상담·TM', '구매·자재·물류',
  '상품기획·MD', '온라인·운송·배송', '서비스', '생산', '건설·건축', '의료',
  '연구·R&D', '교육', '미디어·문화·스포츠', '금융·보험', '공공·복지'];
const skillOptions = ['React', 'Javascript', 'JAVA', 'CSS', '의사소통',
  'TypeScript', 'HTML', 'MySQL', 'Redux', '명확성',
  'Git', 'Angular', 'ReactJS', 'AWS', '분석력',
  'RDBMS', 'JPA', 'Spring Boot', 'Jquery', '경쟁력'];

const Mypage = () => {
  const { user } = useUserContext();

  // 디버깅을 위한 로그
  console.log("Mypage 컴포넌트 렌더링");
  console.log("현재 user 상태:", user);
  console.log("user가 존재하는가?", !!user);
  console.log("user.email이 존재하는가?", !!(user && user.email));

  // 기본 정보
  const [profileImage, setProfileImage] = useState<string>(profileDefault);
  const [careerLevel, setCareerLevel] = useState<string>("신입");
  const [address, setAddress] = useState<string>("");
  
  // 선호 정보
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [customJobs, setCustomJobs] = useState<string[]>([]); // 사용자가 추가한 직업
  
  // 기술/스킬
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [skillSearchTerm, setSkillSearchTerm] = useState("");
  const [customSkills, setCustomSkills] = useState<string[]>([]); // 사용자가 추가한 스킬
  
  // 자격증
  const [licenses, setLicenses] = useState<License[]>([]);
  const [showLicenseInputs, setShowLicenseInputs] = useState(false);
  
  // 학력
  const [educations, setEducations] = useState<Education[]>([]);
  const [showEducationInputs, setShowEducationInputs] = useState(false);
  
  // 경력
  const [careers, setCareers] = useState<Career[]>([]);
  const [showCareerInputs, setShowCareerInputs] = useState(false);
  
  // 수상내역
  const [awards, setAwards] = useState<Award[]>([]);
  const [showAwardInputs, setShowAwardInputs] = useState(false);

  // Firebase에서 사용자 데이터 로드
  useEffect(() => {
    const loadUserData = async () => {
      if (!user || !user.email) return;

      try {
        // 로컬 스토리지에서 프로필 이미지 먼저 로드
        const storageKey = `profileImage_${user.email.replace(/[@.]/g, '_')}`;
        const savedImage = localStorage.getItem(storageKey);
        if (savedImage) {
          setProfileImage(savedImage);
        }

        // 이메일을 문서 ID로 사용 (특수문자 처리)
        const docId = user.email.replace(/[@.]/g, '_');
        const userDocRef = doc(db, "users", docId);
        const userDoc = await getDoc(userDocRef);
        
        if (userDoc.exists()) {
          const userData = userDoc.data();
          
          // 기존 데이터가 있으면 state에 설정 (프로필 이미지는 제외)
          if (userData.jobs) setSelectedJobs(userData.jobs);
          if (userData.skills) setSelectedSkills(userData.skills);
          if (userData.customJobs) setCustomJobs(userData.customJobs);
          if (userData.customSkills) setCustomSkills(userData.customSkills);
          if (userData.licenses) {
            setLicenses(userData.licenses);
            setShowLicenseInputs(userData.licenses.length > 0);
          }
          if (userData.educations) {
            setEducations(userData.educations);
            setShowEducationInputs(userData.educations.length > 0);
          }
          if (userData.careers) {
            setCareers(userData.careers);
            setShowCareerInputs(userData.careers.length > 0);
          }
          if (userData.awards) {
            setAwards(userData.awards);
            setShowAwardInputs(userData.awards.length > 0);
          }
          if (userData.careerLevel) setCareerLevel(userData.careerLevel);
          if (userData.address) setAddress(userData.address);
          // profileImage는 로컬 스토리지에서만 가져오므로 제외
        }
      } catch (error) {
        console.error("사용자 데이터 로드 실패:", error);
      }
    };

    loadUserData();
  }, [user]);

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && typeof event.target.result === 'string') {
          const imageData = event.target.result;
          setProfileImage(imageData);
          
          // 로컬 스토리지에 이미지 저장 (사용자별로)
          if (user && user.email) {
            const storageKey = `profileImage_${user.email.replace(/[@.]/g, '_')}`;
            localStorage.setItem(storageKey, imageData);
          }
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // 모든 직업 옵션 (기본 + 사용자 추가)
  const allJobOptions = useMemo(() => [...jobOptions, ...customJobs], [customJobs]);
  
  // 모든 스킬 옵션 (기본 + 사용자 추가)
  const allSkillOptions = useMemo(() => [...skillOptions, ...customSkills], [customSkills]);

  const filteredJobs = useMemo(() =>
    allJobOptions.filter(job =>
      job.toLowerCase().includes(searchTerm.toLowerCase())
    ), [searchTerm, allJobOptions]);

  const filteredSkills = useMemo(() =>
    allSkillOptions.filter(skill =>
      skill.toLowerCase().includes(skillSearchTerm.toLowerCase())
    ), [skillSearchTerm, allSkillOptions]);

  const toggleJob = (job: string) => {
    setSelectedJobs(prev => 
      prev.includes(job) ? prev.filter(j => j !== job) : [...prev, job]
    );
  };

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  // 새로운 직업 추가 함수
  const handleAddCustomJob = () => {
    const trimmedJob = searchTerm.trim();
    if (trimmedJob && !allJobOptions.includes(trimmedJob)) {
      setCustomJobs(prev => [...prev, trimmedJob]);
      setSelectedJobs(prev => [...prev, trimmedJob]);
      setSearchTerm("");
    }
  };

  // 새로운 스킬 추가 함수
  const handleAddCustomSkill = () => {
    const trimmedSkill = skillSearchTerm.trim();
    if (trimmedSkill && !allSkillOptions.includes(trimmedSkill)) {
      setCustomSkills(prev => [...prev, trimmedSkill]);
      setSelectedSkills(prev => [...prev, trimmedSkill]);
      setSkillSearchTerm("");
    }
  };

  // Enter 키 처리 함수
  const handleJobKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddCustomJob();
    }
  };

  const handleSkillKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddCustomSkill();
    }
  };

  // 자격증 관련 함수들
  const handleAddLicense = () => {
    if (!showLicenseInputs) {
      setShowLicenseInputs(true);
    }
    setLicenses(prev => [...prev, { name: '', issuer: '', date: '' }]);
  };

  const handleRemoveLicense = (index: number) => {
    setLicenses(prev => prev.filter((_, i) => i !== index));
  };

  const handleLicenseChange = (index: number, field: keyof License, value: string) => {
    setLicenses(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  // 학력 관련 함수들
  const handleAddEducation = () => {
    if (!showEducationInputs) {
      setShowEducationInputs(true);
    }
    setEducations(prev => [...prev, { school: '', major: '', startYear: '', endYear: '', status: '재학중' }]);
  };

  const handleRemoveEducation = (index: number) => {
    setEducations(prev => prev.filter((_, i) => i !== index));
  };

  const handleEducationChange = (index: number, field: keyof Education, value: string) => {
    setEducations(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  // 경력 관련 함수들
  const handleAddCareer = () => {
    if (!showCareerInputs) {
      setShowCareerInputs(true);
    }
    setCareers(prev => [...prev, { company: '', position: '', startDate: '', endDate: '', status: '재직중' }]);
  };

  const handleRemoveCareer = (index: number) => {
    setCareers(prev => prev.filter((_, i) => i !== index));
  };

  const handleCareerChange = (index: number, field: keyof Career, value: string) => {
    setCareers(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  // 수상내역 관련 함수들
  const handleAddAward = () => {
    if (!showAwardInputs) {
      setShowAwardInputs(true);
    }
    setAwards(prev => [...prev, { name: '', issuer: '', date: '' }]);
  };

  const handleRemoveAward = (index: number) => {
    setAwards(prev => prev.filter((_, i) => i !== index));
  };

  const handleAwardChange = (index: number, field: keyof Award, value: string) => {
    setAwards(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleSave = async () => {
    try {
      // 디버깅을 위한 로그
      console.log("저장 시도 중...");
      console.log("user 객체:", user);
      
      if (!user || !user.email) {
        alert("사용자 정보가 없습니다. 다시 로그인해주세요.");
        return;
      }

      // 이메일을 문서 ID로 사용 (특수문자 처리)
      const docId = user.email.replace(/[@.]/g, '_');
      console.log("Firebase에 저장 중...", docId);

      const userDocRef = doc(db, "users", docId);

      const saveData = {
        uid: user.uid || docId, // uid가 없으면 docId 사용
        id: user.id || docId, // id가 없으면 docId 사용
        name: user.name || "이름 없음",
        email: user.email || "",
        phone: user.phone || "",
        birth: user.birth || "",
        // profileImage는 Firebase에 저장하지 않음 (로컬에만 저장)
        careerLevel,
        address,
        jobs: selectedJobs,
        skills: selectedSkills,
        customJobs, // 사용자가 추가한 직업 목록
        customSkills, // 사용자가 추가한 스킬 목록
        licenses: licenses.filter(license => license.name.trim() !== ''), // 빈 항목 제거
        educations: educations.filter(edu => edu.school.trim() !== ''), // 빈 항목 제거
        careers: careers.filter(career => career.company.trim() !== ''), // 빈 항목 제거
        awards: awards.filter(award => award.name.trim() !== ''), // 빈 항목 제거
        createdAt: user.createdAt || Timestamp.now(),
        updatedAt: Timestamp.now(),
      };

      console.log("저장할 데이터:", saveData);

      await setDoc(userDocRef, saveData);

      alert("정보가 성공적으로 저장되었습니다!");
    } catch (error) {
      console.error("저장 실패:", error);
      alert(`저장 중 오류가 발생했습니다: ${error.message}`);
    }
  };

  if (!user) {
    return (
      <Container>
        <p>로그인이 필요합니다.</p>
      </Container>
    );
  }

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
                  {user.name}
                </h1>
                <Select 
                  style={{ minWidth: "140px", marginBottom: 0 }}
                  value={careerLevel}
                  onChange={(e) => setCareerLevel(e.target.value)}
                >
                  <option value="신입">신입</option>
                  <option value="경력">경력</option>
                </Select>
              </div>
              <p>{user.birth} (만 {2025 - parseInt(user.birth.slice(0, 4))}세)</p>
              <InfoRow>📧 {user.email}</InfoRow>
              <InfoRow>📞 {user.phone}</InfoRow>
              <InfoRow>
                🏠 
                <input
                  type="text"
                  placeholder="주소를 입력하세요"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  style={{
                    border: 'none',
                    background: 'transparent',
                    marginLeft: '8px',
                    fontSize: 'inherit',
                    outline: 'none',
                    borderBottom: '1px solid #ccc',
                    minWidth: '200px'
                  }}
                />
              </InfoRow>
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
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
            <div style={{ position: "relative", flex: 1 }}>
              <input
                type="text"
                placeholder="직업(직무) 또는 전문분야 입력"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                onKeyPress={handleJobKeyPress}
                style={{
                  padding: "12px 16px",
                  border: "1.5px solid #ccc",
                  width: "100%",
                  fontSize: "1rem",
                  boxSizing: "border-box",
                  borderRadius: "4px",
                }}
              />
            </div>
            <button
              type="button"
              onClick={handleAddCustomJob}
              disabled={!searchTerm.trim() || allJobOptions.includes(searchTerm.trim())}
              style={{
                padding: "12px 20px",
                backgroundColor: !searchTerm.trim() || allJobOptions.includes(searchTerm.trim()) ? "#ccc" : "#6482ED",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: !searchTerm.trim() || allJobOptions.includes(searchTerm.trim()) ? "not-allowed" : "pointer",
                fontSize: "1rem",
                whiteSpace: "nowrap",
              }}
            >
              추가
            </button>
          </div>
          <JobList>
            {filteredJobs.map(job => (
              <JobItem
                key={job}
                isSelected={selectedJobs.includes(job)}
                onClick={() => toggleJob(job)}
              >
                {selectedJobs.includes(job) ? '✔' : '+'} {job}
                {customJobs.includes(job) && <span style={{ color: '#6482ED', fontSize: '0.8em' }}> (직접추가)</span>}
              </JobItem>
            ))}
          </JobList>
        </Section>

        {/* 3. 지식/기술 섹션 */}
        <Section id="skill-info">
          <Title>지식 · 기술</Title>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
            <div style={{ position: "relative", flex: 1 }}>
              <input
                type="text"
                placeholder="찾으시는 스킬이 있나요?"
                value={skillSearchTerm}
                onChange={e => setSkillSearchTerm(e.target.value)}
                onKeyPress={handleSkillKeyPress}
                style={{
                  padding: "12px 16px",
                  border: "1.5px solid #ccc",
                  width: "100%",
                  fontSize: "1rem",
                  boxSizing: "border-box",
                  borderRadius: "4px",
                }}
              />
            </div>
            <button
              type="button"
              onClick={handleAddCustomSkill}
              disabled={!skillSearchTerm.trim() || allSkillOptions.includes(skillSearchTerm.trim())}
              style={{
                padding: "12px 20px",
                backgroundColor: !skillSearchTerm.trim() || allSkillOptions.includes(skillSearchTerm.trim()) ? "#ccc" : "#6482ED",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: !skillSearchTerm.trim() || allSkillOptions.includes(skillSearchTerm.trim()) ? "not-allowed" : "pointer",
                fontSize: "1rem",
                whiteSpace: "nowrap",
              }}
            >
              추가
            </button>
          </div>
          <SkillList>
            {filteredSkills.map(skill => (
              <SkillTag
                key={skill}
                isSelected={selectedSkills.includes(skill)}
                onClick={() => toggleSkill(skill)}
              >
                {selectedSkills.includes(skill) ? '✔' : '+'} {skill}
                {customSkills.includes(skill) && <span style={{ color: '#6482ED', fontSize: '0.8em' }}> (직접추가)</span>}
              </SkillTag>
            ))}
          </SkillList>
        </Section>

        {/* 4. 자격증 섹션 */}
        <Section id="certificate-info">
          <Title>자격증</Title>
          {showLicenseInputs && licenses.map((license, index) => (
            <LicenseInputRow key={index}>
              <input
                type="text"
                placeholder="자격증명"
                value={license.name}
                onChange={(e) => handleLicenseChange(index, 'name', e.target.value)}
              />
              <input
                type="text"
                placeholder="발행처"
                value={license.issuer}
                onChange={(e) => handleLicenseChange(index, 'issuer', e.target.value)}
              />
              <input
                type="text"
                placeholder="취득일"
                value={license.date}
                onChange={(e) => handleLicenseChange(index, 'date', e.target.value)}
              />
              <RemoveButton onClick={() => handleRemoveLicense(index)}>✕</RemoveButton>
            </LicenseInputRow>
          ))}
          <AddLicenseButton onClick={handleAddLicense}>
            + 자격증 추가
          </AddLicenseButton>
        </Section>

        {/* 5. 학력 */}
        <Section id="education-info">
          <Title>학력</Title>
          {showEducationInputs && educations.map((education, index) => (
            <LicenseInputRow key={index}>
              <input 
                type="text" 
                placeholder="학교명" 
                value={education.school}
                onChange={(e) => handleEducationChange(index, 'school', e.target.value)}
              />
              <input 
                type="text" 
                placeholder="전공" 
                value={education.major}
                onChange={(e) => handleEducationChange(index, 'major', e.target.value)}
              />
              <input 
                type="text" 
                placeholder="입학년도 (예: 2021)" 
                value={education.startYear}
                onChange={(e) => handleEducationChange(index, 'startYear', e.target.value)}
              />
              <input 
                type="text" 
                placeholder="졸업년도 (예: 2025)" 
                value={education.endYear}
                onChange={(e) => handleEducationChange(index, 'endYear', e.target.value)}
              />
              <Select 
                value={education.status}
                onChange={(e) => handleEducationChange(index, 'status', e.target.value)}
              >
                <option value="재학중">재학중</option>
                <option value="졸업">졸업</option>
                <option value="중퇴">중퇴</option>
              </Select>
              <RemoveButton onClick={() => handleRemoveEducation(index)}>✕</RemoveButton>
            </LicenseInputRow>
          ))}
          <AddLicenseButton onClick={handleAddEducation}>+ 학력 추가</AddLicenseButton>
        </Section>

        {/* 6. 경력 */}
        <Section id="career-info">
          <Title>경력</Title>
          {showCareerInputs && careers.map((career, index) => (
            <LicenseInputRow key={index}>
              <input 
                type="text" 
                placeholder="회사명" 
                value={career.company}
                onChange={(e) => handleCareerChange(index, 'company', e.target.value)}
              />
              <input 
                type="text" 
                placeholder="직무" 
                value={career.position}
                onChange={(e) => handleCareerChange(index, 'position', e.target.value)}
              />
              <input 
                type="text" 
                placeholder="입사일 (예: 2022.01)" 
                value={career.startDate}
                onChange={(e) => handleCareerChange(index, 'startDate', e.target.value)}
              />
              <input 
                type="text" 
                placeholder="퇴사일 (예: 2024.12)" 
                value={career.endDate}
                onChange={(e) => handleCareerChange(index, 'endDate', e.target.value)}
              />
              <Select 
                value={career.status}
                onChange={(e) => handleCareerChange(index, 'status', e.target.value)}
              >
                <option value="재직중">재직중</option>
                <option value="퇴사">퇴사</option>
              </Select>
              <RemoveButton onClick={() => handleRemoveCareer(index)}>✕</RemoveButton>
            </LicenseInputRow>
          ))}
          <AddLicenseButton onClick={handleAddCareer}>+ 경력 추가</AddLicenseButton>
        </Section>

        {/* 7. 수상내역 */}
        <Section id="award-info">
          <Title>수상내역</Title>
          {showAwardInputs && awards.map((award, index) => (
            <LicenseInputRow key={index}>
              <input 
                type="text" 
                placeholder="수상명" 
                value={award.name}
                onChange={(e) => handleAwardChange(index, 'name', e.target.value)}
              />
              <input 
                type="text" 
                placeholder="발급 기관" 
                value={award.issuer}
                onChange={(e) => handleAwardChange(index, 'issuer', e.target.value)}
              />
              <input 
                type="text" 
                placeholder="수상일 (예: 2023.05)" 
                value={award.date}
                onChange={(e) => handleAwardChange(index, 'date', e.target.value)}
              />
              <RemoveButton onClick={() => handleRemoveAward(index)}>✕</RemoveButton>
            </LicenseInputRow>
          ))}
          <AddLicenseButton onClick={handleAddAward}>+ 수상내역 추가</AddLicenseButton>
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