from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import cv2
import mediapipe as mp
import numpy as np
import requests

app = Flask(__name__)
CORS(app)

# 업로드 폴더 설정
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
UPLOAD_FOLDER = os.path.join(BASE_DIR, 'uploads')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/analyze", methods=["POST"])
def analyze_video():
    try:
        # 요청에서 파일명 받기
        data = request.get_json()
        filename = data.get("filename")
        if not filename:
            return jsonify({"error": "filename is required"}), 400

        video_path = os.path.join(UPLOAD_FOLDER, filename)
        if not os.path.exists(video_path):
            return jsonify({"error": "영상 파일을 찾을 수 없습니다."}), 404

        # Whisper 서버에 .webm 영상 전송
        with open(video_path, "rb") as f:
            stt_response = requests.post("http://localhost:8000/stt/", files={"file": f})
            text = stt_response.json().get("text", "")

        # MediaPipe 설정
        mp_face = mp.solutions.face_mesh.FaceMesh(static_image_mode=False)
        mp_pose = mp.solutions.pose.Pose(static_image_mode=False)
        cap = cv2.VideoCapture(video_path)
        fps = cap.get(cv2.CAP_PROP_FPS)
        frame_interval = int(fps * 3)  # 3초 간격
        frame_num = 0
        results = []

        prev_nose_x, prev_nose_y = None, None

        while cap.isOpened():
            cap.set(cv2.CAP_PROP_POS_FRAMES, frame_num)
            ret, frame = cap.read()
            if not ret:
                break

            rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            face_result = mp_face.process(rgb)
            pose_result = mp_pose.process(rgb)

            # 기본 분석 결과
            entry = {
                "time": f"{int(frame_num / fps)}초",
                "face_detected": bool(face_result.multi_face_landmarks),
                "posture_score": 0.0,
                "expression": "감정 없음",
                "gaze": "분석 불가",
                "head_movement": "정상",
                "posture_stability": "정상"
            }

            # 자세 점수 계산 (어깨 수평성)
            if pose_result.pose_landmarks:
                landmarks = pose_result.pose_landmarks.landmark
                left = landmarks[mp.solutions.pose.PoseLandmark.LEFT_SHOULDER]
                right = landmarks[mp.solutions.pose.PoseLandmark.RIGHT_SHOULDER]
                dx = abs(left.x - right.x)
                entry["posture_score"] = round(1 - dx, 2)

                # 자세 흔들림 감지 (어깨 높이 차이 분석)
                shoulder_diff = abs(left.y - right.y)
                if shoulder_diff > 0.1:
                    entry["posture_stability"] = "자세 흔들림 감지"

            # 얼굴 분석
            if face_result.multi_face_landmarks:
                face = face_result.multi_face_landmarks[0]
                left_eye = face.landmark[33]
                right_eye = face.landmark[263]
                nose_tip = face.landmark[1]
                eye_center_x = (left_eye.x + right_eye.x) / 2
                gaze_diff = nose_tip.x - eye_center_x
                if abs(gaze_diff) < 0.01:
                    entry["gaze"] = "정면 응시"
                elif gaze_diff > 0:
                    entry["gaze"] = "시선 우측"
                else:
                    entry["gaze"] = "시선 좌측"

                # 표정 감정 추정 (입 벌림 정도 기반)
                mouth_top = face.landmark[13]
                mouth_bottom = face.landmark[14]
                mouth_gap = abs(mouth_top.y - mouth_bottom.y)
                if mouth_gap > 0.05:
                    entry["expression"] = "웃는 표정"
                else:
                    entry["expression"] = "중립 표정"

                # 고개 움직임 감지
                if prev_nose_x is not None and prev_nose_y is not None:
                    move_dist = ((nose_tip.x - prev_nose_x) ** 2 + (nose_tip.y - prev_nose_y) ** 2) ** 0.5
                    if move_dist > 0.02:
                        entry["head_movement"] = "고개 움직임 많음"
                prev_nose_x, prev_nose_y = nose_tip.x, nose_tip.y

            results.append(entry)
            frame_num += frame_interval

        cap.release()

        return jsonify({
            "text": text,
            "frames": results
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001)
