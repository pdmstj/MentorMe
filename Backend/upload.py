from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from flask_cors import CORS
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)  # CORS 정책 허용, 다른 도메인(포트)에서 요청해도 문제없도록 설정

# 업로드된 파일을 저장할 폴더 경로 설정
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)  # 폴더가 없으면 생성
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/upload', methods=['POST'])
def upload_file():
    # 클라이언트가 보낸 요청에 'file' 키가 없으면 에러 반환
    if 'file' not in request.files:
        return jsonify({'error': 'No file part in the request'}), 400

    file = request.files['file']

    # 파일이 선택되지 않은 경우 에러 반환
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    # 안전한 파일명으로 변환 (보안상 중요)
    filename = secure_filename(file.filename)

    # 현재 시간으로 타임스탬프 생성 (중복 방지 및 파일 관리 편리)
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    saved_filename = f"{timestamp}_{filename}"

    # 저장 경로 지정
    save_path = os.path.join(app.config['UPLOAD_FOLDER'], saved_filename)
    
    # 실제 파일 저장
    file.save(save_path)
    print(f"파일 저장 완료: {save_path}")

    # 저장 성공 메시지와 저장된 파일 경로를 JSON으로 반환
    return jsonify({'message': '파일 저장 성공', 'path': f"/{UPLOAD_FOLDER}/{saved_filename}"}), 200

if __name__ == '__main__':
    # 서버 실행 (로컬호스트 5000포트, 외부 접근 가능)
    app.run(host='0.0.0.0', port=5000)
