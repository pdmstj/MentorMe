import whisper
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware  # ✅ CORS
import uvicorn
import uuid  # ✅ 파일명 고유하게
import os  # ✅ 파일 삭제

app = FastAPI()

# ✅ CORS 설정 (프론트 연동 필수)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Whisper 모델 로딩 (small 모델 사용)
model = whisper.load_model("small")

@app.post("/stt/")
async def transcribe_audio(file: UploadFile = File(...)):
    # ✅ 고유 파일명 생성 (uuid 사용)
    temp_filename = f"temp_{uuid.uuid4()}.wav"
    
    contents = await file.read()
    with open(temp_filename, "wb") as f:
        f.write(contents)

    # Whisper로 음성 변환
    result = model.transcribe(temp_filename)
    text = result["text"]

    # ✅ 파일 삭제 (깨끗하게!)
    os.remove(temp_filename)

    return {"text": text}

if __name__ == "__main__":
    # 로컬 실행
    uvicorn.run(app, host="0.0.0.0", port=8000)
