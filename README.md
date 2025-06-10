# 🧠 MentorMe - AI 기반 모의 면접 분석 플랫폼

> ✨ 당신의 면접 피드백을 AI가 도와드립니다.

MentorMe는 사용자의 면접 영상을 분석하여  
시선, 표정, 자세 등 비언어적 커뮤니케이션 요소를 정량적으로 평가하고  
AI 기반 피드백을 제공하는 모의 면접 분석 플랫폼입니다.

---

## 📌 데모 영상  
🚧 준비 중입니다 (프론트엔드와 통합 예정)

---

## 🧩 기능 요약

| 기능 | 설명 |
|------|------|
| 🎤 음성 인식 (STT) | Whisper 모델 기반 음성 → 텍스트 변환 |
| 👁 시선 분석 | MediaPipe로 시선 추적 (면접자 집중도 확인) |
| 😊 표정 분석 | 감정 상태 분석 (기쁨, 슬픔, 분노 등) |
| 🧍 자세 분석 | 자세 흐트러짐/움직임 분석 |
| 📊 점수화 시스템 | 각 항목에 점수를 부여하여 피드백 제공 |
| ☁️ Firebase 저장 | 분석 결과: Firestore / 영상 파일: Storage |

---

## ⚙️ 기술 스택

- **Backend**: FastAPI (Python)  
- **STT**: OpenAI Whisper  
- **영상 분석**: MediaPipe, OpenCV  
- **데이터 저장소**: Firebase Firestore, Firebase Storage  
- **기타**: UUID, OS, Uvicorn

---

## 🔮 향후 업데이트 예정
 Whisper 기반 음성 인식

 MediaPipe + OpenCV 기반 시선/표정/자세 분석

 Firebase 연동을 통한 분석 결과 저장

 프론트엔드와 통합된 웹 UI

 AI 질문자: GPT 기반 면접 질문 생성기

 결과 기반 피드백 요약 생성 (LLM 연동)

---
