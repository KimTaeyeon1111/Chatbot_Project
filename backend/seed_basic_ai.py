# seed_basic_ai.py
'''
초기 basicAI 데이터 세팅 하기 위한 공간
실행방법
cd backend
python seed_basic_ai.py
끝
추후에 기본 데이터 세팅이 필요할때도 이방법으로 진행하면 됌
'''

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from models import BasicAI

# DB 설정
BASE_DIR = Path(__file__).parent.absolute()
DB_PATH = BASE_DIR / "instance" / "AI.db"
DB_PATH.parent.mkdir(parents=True, exist_ok=True)

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{DB_PATH.as_posix()}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)


def seed_basic_ai():
    """BasicAI 8개 데이터 세팅"""
    with app.app_context():
        # 기존 데이터 초기화
        db.session.query(BasicAI).delete()
        db.session.commit()

        # 8개 기본 AI
        configs = {
            'wellness': ('웰니스 코치', '#웰니스,#멘탈케어',"마음과 몸의 균형을 찾아드립니다"),
            'career': ('커리어 멘토', '#커리어,#진로'," 꿈의 직업으로 안내합니다."),
            'finance': ('금융 가이드', '#재테크,#투자',"부의 성장을 도와드립니다"),
            'health': ('건강 매니저', '#건강,#다이어트',"건강한 생활을 관리합니다"),
            'daily': ('데일리 도우미', '#일상,#생산성', "효율적인 하루를 만들어드립니다"),
            'learning': ('학습 서포터', '#공부,#학습', "쉽고 빠른 학습을 지원합니다"),
            'legal': ('법률 자문', '#법률,#상담',"법적 고민을 해결합니다"),
            'tech': ('테크 가이드', '#프로그래밍,#개발',"최신 기술을 쉽게 배웁니다")
        }

        # 데이터 생성 & 저장
        for key, (title, hashtags,tip) in configs.items():
            ai = BasicAI(
                ai_name=title,
                ai_type=False,
                ai_tip=tip,
                ai_content=key,
                ai_hashtag=hashtags,
                ai_price=0,
                ai_image=f"/static/images/ai/{key}.png",
                ai_prompt=f"너는 {title}야. 한국어로 전문적으로 답변해.",
                ai_use_count=0
            )
            db.session.add(ai)

        db.session.commit()
        print(f"✅ 8개 BasicAI 세팅 완료! ({DB_PATH})")


if __name__ == "__main__":
    seed_basic_ai()

