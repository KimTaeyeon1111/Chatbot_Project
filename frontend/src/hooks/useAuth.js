// src/hooks/useAuth.js
// 토큰 기반 로그인 상태 관리 + 1시간 유효, 만료 5분 전 갱신 알림

// 아직 공부 덜한 부분이라 일단 저장만 해놓고 추후에 작업할 예정

// src/hooks/useAuth.js
import { useState, useEffect } from "react";

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRenewal, setShowRenewal] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const getUserSession = () => {
    const session = localStorage.getItem("userSession");
    if (!session) return null;

    try {
      const data = JSON.parse(session);

      // 만료 체크
      if (Date.now() > data.expiresAt) {
        localStorage.removeItem("userSession");
        return null;
      }

      return data;
    } catch {
      localStorage.removeItem("userSession");
      return null;
    }
  };

  const checkLoginStatus = () => {
    const session = getUserSession();

    if (!session) {
      setIsLoggedIn(false);
      setUserInfo(null);
      setShowRenewal(false);
      return false;
    }

    const now = Date.now();
    const fiveMinBefore = session.expiresAt - 5 * 60 * 1000;

    // 5분 전 알림
    if (now >= fiveMinBefore) {
      setShowRenewal(true);
    }

    setIsLoggedIn(true);
    setUserInfo(session);
    return true;
  };

  // 세션 연장 (1시간 추가)
  const renewSession = () => {
    const session = getUserSession();
    if (!session) return false;

    const newSession = {
      ...session,
      timestamp: Date.now(),
      expiresAt: Date.now() + 60 * 60 * 1000,
    };

    localStorage.setItem("userSession", JSON.stringify(newSession));
    setShowRenewal(false);
    checkLoginStatus();
    return true;
  };

  const logout = () => {
    localStorage.removeItem("userSession");
    setIsLoggedIn(false);
    setUserInfo(null);
  };

  useEffect(() => {
    checkLoginStatus();
    const interval = setInterval(checkLoginStatus, 60 * 1000); // 1분마다
    return () => clearInterval(interval);
  }, []);

  return {
    isLoggedIn,
    userInfo,
    showRenewal,
    checkLoginStatus,
    renewSession,  // rename
    logout,
  };
};




{/*
frontend/src/pages/Main.jsx (예시, 갱신 알림 사용)
추후에 작업할 때 쓸 코드

// src/pages/Main.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Main() {
  const auth = useAuth();

  if (auth.showRenewal) {
    return (
      <div style={{ padding: '20px', background: '#fff3cd' }}>
        <p>⚠️ 세션이 5분 후 만료됩니다.</p>
        <button onClick={auth.renewSession}>1시간 연장</button>
        <button onClick={auth.logout}>로그아웃</button>
      </div>
    );
  }

  if (!auth.isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  const leftMinutes = Math.round((auth.userInfo.expiresAt - Date.now()) / 60000);

  return (
    <div>
      <h1>환영합니다, {auth.userInfo.nickname}님!</h1>
      <p>이메일: {auth.userInfo.email}</p>
      <p>남은 시간: {leftMinutes}분</p>
    </div>
  );
}
*/}
