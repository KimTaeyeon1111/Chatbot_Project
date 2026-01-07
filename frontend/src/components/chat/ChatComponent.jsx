// ChatList, ChatRoom, Detail


import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { TokenManager, protectedApi } from "../../api/User_Api";
import "../../css/ChatComponent.css";
import { GetRoomMessages } from "../../api/Chatlist_Api";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


export default function ChatComponent() {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [nickname, setNickname] = useState("사용자");

    const [activeRoomId, setActiveRoomId] = useState(null);
    const [mobileView, setMobileView] = useState("list"); 
    const [rooms, setRooms] = useState([]); 
    const [messagesByRoom, setMessagesByRoom] = useState({}); 
    const [loadingMessages, setLoadingMessages] = useState(false);
    const [lastPreview, setLastPreview] = useState({});   
    const [selectedType, setSelectedType] = useState(null);
    const [loadingRooms, setLoadingRooms] = useState(false);

    // intro / chat / report
    const [intro, setIntro] = useState("");
    const [hasStartedChat, setHasStartedChat] = useState(false);
    const [chat, setChat] = useState([]);
    
    const [msg, setMsg] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    const [reportLoading, setReportLoading] = useState(false);
    const [report, setReport] = useState("");

    const chatEndRef = useRef(null);

    // ----------------------------
    // 봇 설정
    // ----------------------------
    const botConfigs = useMemo(
        () => ({
            wellness: { title: `🌿 ${nickname}님의 웰니스 코치`, color: "#4CAF50", placeholder: "마음 상태를 들려주세요..." },
            career: { title: `🚀 ${nickname}님의 커리어 멘토`, color: "#FF8C00", placeholder: "진로 고민을 함께 나눠보시죠..." },
            finance: { title: `💰 ${nickname}님의 금융 가이드`, color: "#1E88E5", placeholder: "자산 관리에 대해 궁금함을 알려주세요..." },
            health: { title: `🏥 ${nickname}님의 건강 매니저`, color: "#E53935", placeholder: "건강 상태를 알려주세요..." },
            daily: { title: `📅 ${nickname}님의 데일리 도우미`, color: "#9C27B0", placeholder: "오늘 하루는 어땠나요?" },
            learning: { title: `✍️ ${nickname}님의 학습 서포터`, color: "#795548", placeholder: "공부 계획을 세워볼까요?" },
            legal: { title: `⚖️ ${nickname}님의 법률 자문`, color: "#607D8B", placeholder: "상담이 필요한 법률 문제를 알려주세요..." },
            tech: { title: `💻 ${nickname}님의 테크 가이드`, color: "#263238", placeholder: "기술적 궁금증을 해결해드릴게요." },
        }),
        [nickname]
    );

    const currentBot = selectedType
        ? botConfigs[selectedType] || { title: `🤖 ${nickname}님의 AI 어시스턴트`, color: "#333", placeholder: "메시지를 입력하세요..." }
        : { title: "대화를 선택해주세요.", color: "#6b7280", placeholder: "" };

    const cssVars = useMemo(() => ({ "--bot-color": currentBot.color }), [currentBot.color]);

    // ----------------------------
    // 스크롤
    // ----------------------------
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chat, isTyping]);

    // ----------------------------
    // 초기: 로그인/닉네임
    // ----------------------------
    useEffect(() => {
        const init = async () => {
            if (TokenManager.isLoggedIn && !TokenManager.isLoggedIn()) {
                setLoading(false);
                return;
            }
            const nick = TokenManager.getNickname?.();
            setNickname(nick || "사용자");
            setLoading(false);
        };
        init();
    }, []);

    // ----------------------------
    // AI 선택 시: intro + history 로드
    // ----------------------------
    const selectAI = async (type) => {
        if (!type) return;

        setSelectedType(type);

        // 우측 상태 초기화
        setIntro("");
        setChat([]);
        setReport("");
        setHasStartedChat(false);
        setMsg("");
        setIsTyping(false);
        setReportLoading(false);

        setLoading(true);
        try {
            // 서버에서 intro + history 같이 주는 기존 API를 그대로 사용
            const res = await protectedApi.get(`/${type}/`);
            const data = res.data;

            if (data.status === "success") {
                setIntro(data.intro_html || "");

                if (data.history && Array.isArray(data.history)) {
                    const loaded = [];
                    data.history.forEach((item) => {
                        loaded.push({ role: "user", text: item.question });
                        loaded.push({ role: "ai", text: item.answer });
                    });
                    setChat(loaded);

                    // history가 있으면 이미 대화를 시작한 상태로 취급 (원하면 false로 둬도 됨)
                    if (loaded.length > 0) setHasStartedChat(true);
                }
            }
        } catch (e) {
            console.error("AI 선택 데이터 로드 실패:", e);
        } finally {
            setLoading(false);
        }
    };

    const getLastPreview = useCallback((room) => {
        if (room.preview) return room.preview;
        const list = messagesByRoom?.[room.id] || [];
        return list[list.length - 1]?.text ?? "";
      }, [messagesByRoom]);

    const handleClickRoom = async (roomId) => {
        setActiveRoomId(roomId);
        setMobileView("chat");

        if (!messagesByRoom[roomId]) {
        setLoadingMessages(true);
        try {
            const data = await GetRoomMessages(roomId);

            if (data?.success && Array.isArray(data.messages)) {
            const messages = data.messages.map((m) => ({
                id: m.id,
                text: m.text,
                me: m.sender === "user",
                createdAt: new Date(m.created_at).getTime(),
            }));

            setMessagesByRoom((prev) => ({
                ...prev,
                [roomId]: messages,
            }));

            setLastPreview((prev) => ({
                ...prev,
                [roomId]: messages[messages.length - 1]?.text || "",
            }));
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoadingMessages(false);
        }
        }
    };

    // ----------------------------
    // 전송
    // ----------------------------
    const send = async () => {
        if (!selectedType) return;
        if (!msg.trim() || isTyping) return;

        const currentMsg = msg.trim();
        setMsg("");

        // 첫 전송이면 intro 숨기고 채팅 시작
        if (!hasStartedChat) setHasStartedChat(true);

        // 화면에 유저 메시지 먼저 반영
        setChat((prev) => [...prev, { role: "user", text: currentMsg }]);
        setIsTyping(true);

        try {
            const res = await protectedApi.post(`/${selectedType}/ask`, { message: currentMsg });
            const data = res.data;

            const answer = data?.response || data?.answer || "";
            if (data.status === "success" || answer) {
                setChat((prev) => [...prev, { role: "ai", text: answer }]);
            } else {
                setChat((prev) => [...prev, { role: "ai", text: "답변을 가져오지 못했습니다." }]);
            }
        } catch (e) {
            console.error("전송 에러:", e);
            setChat((prev) => [...prev, { role: "ai", text: "전송 중 오류가 발생했습니다." }]);
        } finally {
            setIsTyping(false);
        }
    };

    // ----------------------------
    // 리포트
    // 왕복 3번 = 메시지 6개 이상
    // ----------------------------
    const canShowReport = chat.length >= 6;

    const generateReport = async () => {
        if (!selectedType) return;
        if (!canShowReport) return;

        setReportLoading(true);
        try {
            const res = await protectedApi.get(`/${selectedType}/report`);
            const data = res.data;
            if (data?.report) setReport(data.report);
        } catch (e) {
            console.error("리포트 생성 실패:", e);
        } finally {
            setReportLoading(false);
        }
    };

    // ----------------------------
    // 좌측 목록(여기서는 AI 타입 목록)
    // 실제 “대화방 목록” API가 있다면 여기만 교체해서 렌더하면 됨
    // ----------------------------
    const aiList = useMemo(
        () => [
            { type: "daily", label: "데일리 도우미" },
            { type: "legal", label: "법률 자문" },
            { type: "career", label: "커리어 멘토" },
            { type: "health", label: "건강 매니저" },
            { type: "finance", label: "금융 가이드" },
            { type: "learning", label: "학습 서포터" },
            { type: "tech", label: "테크 가이드" },
            { type: "wellness", label: "웰니스 코치" },
        ],
        []
    );

    // ----------------------------
    // 렌더
    // ----------------------------
    return (
        <div className="chatShell" style={cssVars}>
            <aside className="chatSidebar">
                <div className="sidebarHeader">
                    <button
                    type="button"
                    className="backBtn"
                    onClick={() => {
                        navigate("/");
                        setMobileView("list");
                    }}
                    title="메인으로"
                    >
                    ⟵
                    </button>
                    <div className="chatTopTitle">뒤로가기</div>
                </div>
                
                <div className="chatListBody">
                    {aiList.map((ai) => (
                        <button
                        key={ai.type}
                        type="button"
                        className={`chatRoomRow ${selectedType === ai.type ? "active" : ""}`}
                        onClick={() => selectAI(ai.type)}
                        >
                        <div className="chatAvatar" />
                        <div className="chatRoomText">
                            <div className="chatRoomTitle">{ai.label}</div>
                            <div className="chatRoomPreview">클릭해서 대화를 시작하세요</div>
                        </div>
                        </button>
                    ))}
                </div>
            </aside>

            {/* 우측 메인 */}
            <main className="chatMain">
                <div className=" d-flex">
                    <h2 className="chatTitle">{currentBot.title}</h2>
                    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
                        <Container>
                            <Navbar.Collapse id="responsive-navbar-nav">
                                <Nav className="me-auto chatting-navbar-icon">
                                    <NavDropdown  id="collapsible-nav-dropdown">
                                        <NavDropdown.Item>
                                            리포트 생성
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </div>

                {loading ? (
                    <div className="stateBox">로딩 중...</div>
                ) : !selectedType ? (
                    // ✅ 1번 화면 오른쪽: 선택 전 안내
                    <div className="stateBox">
                        <div className="stateTitle">목록을 선택해주세요.</div>
                        <div className="stateDesc">왼쪽 대화목록을 누르면 대화가 보여요.</div>
                    </div>
                ) : (
                    <>
                        {/* ✅ 2번 화면: 선택 직후에는 intro만 보여주고, 첫 대화 시작하면 숨김 */}
                        {!hasStartedChat && intro && (
                            <div className="introBox" dangerouslySetInnerHTML={{ __html: intro }} />
                        )}

                        {/* ✅ 채팅 패널(대화 시작 후 표시) */}
                        {hasStartedChat && (
                            <div className="chatPanel">
                                <div className="chatMessages">
                                    {chat.length === 0 ? (
                                        <div className="chatEmpty">
                                            <p className="chatEmptyEmoji">💬</p>
                                            <p>{nickname}님, 무엇을 도와드릴까요?</p>
                                        </div>
                                    ) : (
                                        chat.map((c, i) => (
                                            <div key={i} className={`chatRow ${c.role === "user" ? "isUser" : "isAi"}`}>
                                                <div className={`chatBubble ${c.role === "user" ? "user" : "ai"}`}>
                                                    {c.role === "ai" ? <ReactMarkdown>{c.text}</ReactMarkdown> : c.text}
                                                </div>
                                            </div>
                                        ))
                                    )}

                                    {isTyping && <div className="chatTyping">답변 중...</div>}
                                    <div ref={chatEndRef} />
                                </div>
                            </div>
                        )}

                        {/* ✅ 입력바는 선택 후 항상 표시 (intro 상태에서도 입력 가능) */}
                        <div className="chatInputBar">
                            <input
                                className="chatInput"
                                value={msg}
                                onChange={(e) => setMsg(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && send()}
                                placeholder={currentBot.placeholder}
                                disabled={!selectedType}
                            />
                            <button className="chatSendBtn" onClick={send} disabled={isTyping || !msg.trim() || !selectedType}>
                                전송
                            </button>
                        </div>

                        {/* ✅ 리포트 버튼 */}
                        {hasStartedChat && canShowReport && (
                            <button className="chatReportBtn" onClick={generateReport} disabled={reportLoading}>
                                {reportLoading ? "리포트 생성 중..." : "AI 분석 리포트 생성"}
                            </button>
                        )}

                        {/* ✅ 리포트 결과 */}
                        {report && (
                            <div className="chatReportBox">
                                <ReactMarkdown>{report}</ReactMarkdown>
                            </div>
                        )}
                    </>
                )}
            </main>
        </div>
    );
}
