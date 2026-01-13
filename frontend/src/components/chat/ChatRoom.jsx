// - room, messages를 props로 받음
// - 전송 버튼/엔터로 onSend 호출
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/ChatRoom.css";

export default function ChatRoom({ room, messages = [], onSend }) {
  const endRef = useRef(null);
  const navigate = useNavigate();

  // 메시지 추가되면 맨 아래로 자동 스크롤
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleGoToAI = () => {
    navigate(`/aichat/${room.ai_content}`);
  };

  return (
    <div className="chatRoom">
      {/* 상단 해더 */}
      <div className="chatRoomHeader">
          {room.title}
          <button className="chatRoomSwitchBtn" onClick={handleGoToAI}>대화하러 가기</button>
      </div>

      {/* 메시지 영역 */}
      <div className="chatRoomBody">
        {messages.map((m) => (
          <div key={m.id} className={`chatBubble ${m.me ? "me" : ""}`}>
            {m.text}
            <div className="chatBubbleTime">
              {new Date(m.createdAt).toLocaleTimeString("ko-KR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>
    </div>
  );
}
