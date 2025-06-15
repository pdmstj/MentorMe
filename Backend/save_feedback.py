from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import json

app = Flask(__name__)
CORS(app)

SAVE_DIR = os.path.join(os.path.dirname(__file__), 'saved_feedback')
os.makedirs(SAVE_DIR, exist_ok=True)

@app.route("/save-feedback", methods=["POST"])
def save_feedback():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No data received"}), 400

        # 파일 이름 설정 (timestamp 등)
        filename = data.get("savedPath", "feedback_result")  # 예: uploads/파일명
        base_name = os.path.basename(filename).split('.')[0]
        save_path = os.path.join(SAVE_DIR, f"{base_name}.json")

        # 저장
        with open(save_path, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)

        return jsonify({"message": "Feedback saved", "path": save_path}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ✅ 이 부분이 반드시 있어야 함!
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5002)
