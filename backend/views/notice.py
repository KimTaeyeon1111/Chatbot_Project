from flask import Blueprint, jsonify,request

from backend.models import db, Notice
from functools import wraps
from flask_login import current_user

notice_bp = Blueprint("notice_api", __name__, url_prefix="/api")


def login_required_or_redirect(f):
    """로그인 안하면 401 + JSON 응답 반환"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not current_user.is_authenticated:
            return jsonify({
                "success": False,
                "error": "로그인 필요",
                "redirect": "/login"
            }), 401
        return f(*args, **kwargs)
    return decorated_function


@notice_bp.route("/notices", methods=["GET"])
def get_notices():
    notices = Notice.query.all()
    return jsonify([n.to_dict() for n in notices])


@notice_bp.route("/notices", methods=["POST"])
@login_required_or_redirect
def add_notice():
    data = request.json or {}

    # 필수값 검증
    if not data.get("user_id") or not data.get("notice_title"):
        return jsonify({"error": "user_id와 notice_title은 필수입니다"}), 400

    notice = Notice(
        user_id=current_user.id,
        notice_title=data["notice_title"],
        notice_write=data["notice_write"],
        notice_image=data.get("notice_image"),
    )
    db.session.add(notice)
    db.session.commit()
    return jsonify(notice.to_dict()), 201
