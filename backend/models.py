from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = "user"

    # 유저DB
    user_id = db.Column(db.Integer, primary_key=True, autoincrement=True)          # 유저일련번호
    user_email = db.Column(db.String(255), unique=True, nullable=True)             # 로그인 이메일
    user_password = db.Column(db.String(255), nullable=True)                       # 비밀번호 (secret_key 적용 예정)
    user_nickname = db.Column(db.String(50), unique=True, nullable=False)          # 닉네임, 기본값 'user'는 애플리케이션 레벨에서 처리 권장
    user_image = db.Column(db.String(500), nullable=True, default="기본이미지")      # 프로필 사진 경로
    user_birthdate = db.Column(db.Date, nullable=True)                             # 생년월일
    user_delete = db.Column(db.Boolean, nullable=False, default=False)             # 유저 유지(삭제 여부 플래그, 0이면 존재 1이면 삭제)
    user_is_social = db.Column(db.Boolean, nullable=False, default=False)          # 소셜 가능 여부(0이면 로컬 1이면 소셜)
    user_money = db.Column(db.Integer, nullable=False, default=0)                  # 가진 돈 금액
    user_start = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)   # 유저 생성 날짜

    def __repr__(self):
        return f"<User {self.user_id} {self.user_email}>"

    def to_dict(self):
        return {
            "user_id": self.user_id,
            "user_email": self.user_email,
            "user_nickname": self.user_nickname,
            "user_image": self.user_image,
            "user_birthdate": self.user_birthdate.isoformat() if self.user_birthdate else None,
            "user_delete": self.user_delete,
            "user_is_social": self.user_is_social,
            "user_money": self.user_money,
            "user_start": self.user_start.isoformat() if self.user_start else None,
        }