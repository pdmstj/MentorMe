from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import json
import os
from dotenv import load_dotenv

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

app = Flask(__name__)
CORS(app)

@app.route("/generate-feedback", methods=["POST"])
def generate_feedback():
    data = request.get_json()
    stt_text = data.get("sttText", "").strip()
    interview_type = data.get("type", "self")

    if not stt_text:
        return jsonify({
            "error": "면접 답변이 비어 있습니다. 다시 녹음해주세요.",
            "strengths": [],
            "improvements": [],
            "tips": []
        }), 400

    prompt = f"""
    너는 AI 모의면접 시스템의 피드백 분석가야.
    아래는 사용자의 면접 답변이야:

    "{stt_text}"

    이 답변을 읽고 다음 기준에 따라 평가해줘:

    [강점]: 말하기 태도, 전달력, 사고력 등에서 돋보이는 점 3가지
    [보완점]: 논리성 부족, 구체성 부족, 말투나 표정 등에서 개선할 점 3가지
    [면접 팁]: 다음 면접에서 도움이 될 조언 3가지

    단, 답변이 질문과 무관하거나 너무 짧아서 분석이 어렵다면, 모든 항목에 "답변이 너무 짧거나 명확하지 않아서 분석이 어렵습니다."를 넣어줘.

    결과는 아래 형식의 JSON 문자열로 반환해줘:

    {{
      "strengths": ["...", "...", "..."],
      "improvements": ["...", "...", "..."],
      "tips": ["...", "...", "..."]
    }}
    """

    try:
        client = openai.OpenAI()  # ✅ 최신 방식: 객체 생성
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.7
        )

        content = response.choices[0].message.content
        print("🧠 GPT 응답 원문:", content)
        feedback_json = json.loads(content)
        return jsonify(feedback_json)

    except Exception as e:
        print("GPT 호출 실패:", str(e))
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=5002, debug=True)
