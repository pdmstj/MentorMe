from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import json

app = Flask(__name__)
CORS(app)

SAVE_DIR = os.path.join(os.path.dirname(__file__), 'saved_feedback')
os.makedirs(SAVE_DIR, exist_ok=True)

print("✅ Flask 서버 시작 - save_feedback.py")


# ✅ 저장 API
@app.route("/save-feedback", methods=["POST"])
def save_feedback():
    print("📥 [POST] /save-feedback 요청 받음")
    try:
        if request.content_type and request.content_type.startswith("multipart/form-data"):
            # FormData 파싱
            sttText = request.form.get("sttText")
            question = request.form.get("question")
            user = request.form.get("user")
            type_ = request.form.get("type")
            timestamp = request.form.get("timestamp")
            expressionResult = json.loads(request.form.get("expressionResult", "{}"))
            gptFeedback = json.loads(request.form.get("gptFeedback", "{}"))
            video_path = request.form.get("video_path") or request.form.get("video") or "unknown"

            # 파일명 추출
            filename = os.path.basename(video_path).split(".")[0]
            save_path = os.path.join(SAVE_DIR, f"{filename}.json")

            data = {
                "sttText": sttText,
                "question": question,
                "user": user,
                "type": type_,
                "timestamp": timestamp,
                "expressionResult": expressionResult,
                "gptFeedback": gptFeedback,
                "video_path": video_path
            }

            with open(save_path, "w", encoding="utf-8") as f:
                json.dump(data, f, ensure_ascii=False, indent=2)

            print(f"✅ 저장 완료 → {save_path}")
            return jsonify({"message": "Feedback saved", "path": save_path}), 200

        else:
            print("❌ Content-Type 오류:", request.content_type)
            return jsonify({"error": "Content-Type must be multipart/form-data"}), 400

    except Exception as e:
        print("❌ 예외 발생:", str(e))
        return jsonify({"error": str(e)}), 500


# ✅ 피드백 리스트 조회
@app.route("/feedbacks", methods=["GET"])
def get_feedbacks():
    print("📥 [GET] /feedbacks 요청 받음")
    user = request.args.get("user")
    if not user:
        return jsonify({"error": "user 파라미터가 필요합니다."}), 400

    results = []
    for filename in os.listdir(SAVE_DIR):
        if filename.endswith(".json"):
            file_path = os.path.join(SAVE_DIR, filename)
            with open(file_path, "r", encoding="utf-8") as f:
                data = json.load(f)
                if data.get("user") == user:
                    results.append({
                        "type": data.get("type"),
                        "field": data.get("field", "직군 미지정"),
                        "timestamp": data.get("timestamp"),
                        "video_path": data.get("video_path") or data.get("savedPath")
                    })

    print(f"✅ {len(results)}개 피드백 반환")
    return jsonify(results)


# ✅ 상세 보기
@app.route("/feedback/<filename>", methods=["GET"])
def get_feedback_detail(filename):
    print(f"📥 [GET] /feedback/{filename} 요청 받음")
    base_name = filename.split(".")[0]
    file_path = os.path.join(SAVE_DIR, f"{base_name}.json")

    if not os.path.exists(file_path):
        return jsonify({"error": "파일이 존재하지 않습니다."}), 404

    with open(file_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    return jsonify(data)


# ✅ 서버 실행
if __name__ == "__main__":
    print("🚀 Flask 서버 실행 중... http://127.0.0.1:5002")
    app.run(host="0.0.0.0", port=5002)
