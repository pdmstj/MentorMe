import whisper
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import uuid
import os

app = FastAPI()

# ✅ CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 실제 운영 시 ["http://localhost:3000"] 처럼 제한 권장
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Whisper 모델 로딩
model = whisper.load_model("small")

@app.post("/stt/")
async def transcribe_audio(file: UploadFile = File(...)):
    if not file:
        raise HTTPException(status_code=400, detail="파일이 없습니다.")
    
    # 고유 파일명 생성
    temp_filename = f"temp_{uuid.uuid4()}.webm"  # 🔥 업로드 파일 포맷에 맞게 webm

    try:
        contents = await file.read()
        with open(temp_filename, "wb") as f:
            f.write(contents)

        # Whisper 변환
        result = model.transcribe(temp_filename)
        text = result.get("text", "")  # 혹시 모를 None 대비

        return {"text": text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"STT 처리 실패: {str(e)}")
    finally:
        # ✅ 파일 삭제 (항상 클린하게)
        if os.path.exists(temp_filename):
            os.remove(temp_filename)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
