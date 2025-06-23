# 🧠 MentorMe - AI 기반 모의 면접 분석 플랫폼

> ✨ 당신의 면접 피드백을 AI가 도와드립니다.

MentorMe는 사용자의 면접 영상을 분석하여  
시선, 표정, 자세 등 비언어적 커뮤니케이션 요소를 정량적으로 평가하고  
AI 기반 피드백을 제공하는 모의 면접 분석 플랫폼입니다.

---

## 💡 주요 기능

| 기능 | 설명 |
|------|------|
| 🎤 음성 인식 | Whisper 모델로 사용자 음성을 텍스트로 변환 |
| 🗣️ TTS 질문 낭독 | 질문을 음성으로 들려주는 TTS 기능 |
| 👁 시선 분석 | 정면 응시 여부 분석 (MediaPipe) |
| 😊 표정 분석 | 웃음/중립 감정 분석 |
| 🧍 자세 분석 | 바른 자세 점수 및 요약 피드백 |
| 📊 점수화 시스템 | 각 항목에 점수를 부여하여 피드백 제공 |
| 🤖 GPT 피드백 | OpenAI API로 답변 강점/보완점 분석 |
| 💾 자동 저장 | 분석 결과 및 영상 저장 (.json + .webm) |
| 🗂 기록 조회 | 마이페이지에서 결과 다시 확인 가능 |
| ☁️ Firebase 저장 | 분석 결과: Firestore / 영상 파일: Storage |

---

## ⚙️ 기술 스택

- **Frontend**: React + TypeScript  
- **Backend**: Flask,FastAPI (Python)  
- **STT**: OpenAI Whisper
- **AI 분석**: GPT API
- **영상 분석**: MediaPipe, OpenCV  
- **데이터 저장소**: Firebase Firestore, Firebase Storage
- **기타 저장소**: 로컬 JSON + 영상 저장
- **기타**: UUID, OS, Uvicorn

---

## 🧪 사용된 API

| Method | Endpoint | 설명 |
|--------|----------|------|
| POST | `/generate-feedback` | GPT 기반 면접 피드백 생성 |
| POST | `/save-feedback` | 영상 및 분석 결과 저장 |
| GET | `/feedbacks?user=이름` | 사용자 기록 목록 조회 |
| GET | `/feedback/:filename` | 개별 피드백 상세 보기 |

---

## 🎯 개발 목적

- **개발 기간**: 2025.05 ~ 2025.06.18  
- **대상**: 면접을 준비하는 학생 및 취준생  
- **목표**: 누구나 혼자서도 면접 피드백을 받을 수 있는 AI 멘토 만들기

---

## 🚀 향후 업데이트

- 결과 PDF 저장 기능
- 다국어 지원
- 3D 모의 면접관 구현
- 자연스러운 TTS 구현
- GPT 질문 생성기

---

“AI 면접관이 실제 사람처럼 피드백을 주고  
혼자서도 자신 있게 면접 준비할 수 있도록 돕고 싶었습니다.”

