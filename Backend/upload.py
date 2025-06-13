from flask import Flask, request, jsonify, send_from_directory
from werkzeug.utils import secure_filename
from flask_cors import CORS
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)  # React 등 다른 도메인에서 호출 허용

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# 파일 업로드 API
@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part in the request'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    filename = secure_filename(file.filename)
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    saved_filename = f"{timestamp}_{filename}"
    save_path = os.path.join(app.config['UPLOAD_FOLDER'], saved_filename)
    file.save(save_path)
    print(f"파일 저장 완료: {save_path}")

    return jsonify({'message': '파일 저장 성공', 'path': f"/uploads/{saved_filename}"}), 200

# 업로드 폴더 내 영상 목록 반환 API
@app.route('/videos', methods=['GET'])
def get_videos():
    try:
        files = os.listdir(app.config['UPLOAD_FOLDER'])
        # 영상 확장자만 필터링 (필요시 확장자 추가 가능)
        video_files = [f for f in files if f.lower().endswith(('.webm', '.mp4', '.mov'))]
        # React가 직접 접근 가능하도록 절대 경로(서버주소 포함)로 반환
        video_urls = [f"http://localhost:5000/uploads/{filename}" for filename in video_files]
        return jsonify({'videos': video_urls})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# 영상 파일 직접 서빙 (React에서 src로 요청 가능)
@app.route('/uploads/<filename>')
def serve_video(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
