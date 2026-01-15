![메인페이지](./docs/images/wmd_main.png)


## 💫 AI Web App Team Project
생성형 AI Web App 기획 및 개발 - 개인 맞춤형 AI 플랫폼

## 🕒 개발 시간
2025/12/08 ~ 2025/01/09 (약 4주간)

## 🤝 같이 개발한 팀원들
🐧 이상수 : <br>
🐣 김태연 : <br>
🦒 백기림 : <br>
🐶 이기화 : <br>
🐸 지수정 : 

<br>

## 📜 프로젝트 소개
**특정 파트에 최적화 된 AI를 제공하는 플랫폼**<br>
역할별로 분리된 AI 설계를 통해, 각 기능 영역에서 일관된 응답 품질을 유지합니다.<br>
사용자는 목적에 맞는 AI와 상호작용하며, 단순한 질의응답을 넘어 지속적인 AI 경험을 제공합니다.

<br>

## 🌞프로젝트 구조
<details><summary>AI 챗봇 프로젝트</summary>
<br>

![AI챗봇프로젝트구조](./docs/images/pj_structure.png)

</details>
<br>


## 📢 기획 의도
개인비서 AI는 단순한 기능 구현보다,<br>
서비스 구조와 사용자 흐름에 대한 설계가 중요하다고 판단했습니다.
<br><br>
이에 따라 본 프로젝트는<br>
AI 채팅을 중심으로 한 기본 서비스 흐름을 먼저 구현하고,<br>
개인비서 기능은 향후 확장이 가능하도록 구조를 설계하는데 중점을 두었습니다.
<br><br>
이를 통해 실제 서비스로 발전시킬 수 있는 기반을 마련하고자 했습니다.

<br>

## 📚 개발환경
<b>→ Frontend</b>: React, JavaScript, React-Bootstrap <br>
<b>→ Backend</b>: Flask, Python, SQLAIchemy <br>
<b>→ Auth</b>: LocalStorage 기반 인증 <br>
<b>→ AI</b>: OpenAI 외부 API 인증 <br>
<b>→ DB</b>: SQLite (개발 환경) <br>
<b>→ Infra</b>: Docker, Nginx <br>
<b>→ Tool</b>: VS code, PyCharm, Figma, Notion, GitHub

<br>

## 📚목차📚
01. 📐 [Diagram](#-diagram)
02. 🖥 [화면구현](#-화면구현)
03. 🔎 [주요기능](#-주요-기능)
04. 🎬 [기능 실행화면](#-기능-실행화면)
05. 📂 [프로젝트 보고서](#-프로젝트-보고서)
06. ✌ [현재 구현 범위](#-현재-구현-범위)
07. 📚 [향후 개선 및 추가 기능](#-향후-개선-및-추가-기능)
08. 🧩 [문제 해결 사례](#-문제-해결-사례)
09. 🚀 [프로젝트 회고](#-프로젝트-회고)
10. ⚙️ [참고 자료](#️-참고-자료)

<br>

## 📐 Diagram
<details><summary>UseCase</summary>
<br>

![usecase](./docs/images/usecase.png)

</details>

<details><summary>Navigation</summary>
<br>

![navigation](./docs/images/navigation.png)

</details>

<br>

## 🖥 화면구현
<details><summary>메인페이지</summary>
<br>

![mainpage](/docs/images/main.png)

</details>

<details><summary>회원가입</summary>
<br>

![signup](/docs/images/signup.png)

</details>

<details><summary>로그인</summary>
<br>

![login](/docs/images/login.png)

</details>

<details><summary>마이페이지</summary>
<br>

![mypage](/docs/images/myPage.png)

</details>

<details><summary>결제페이지</summary>
<br>

![pay](/docs/images/pay.png)

</details>

<details><summary>대화 목록</summary>
<br>

![chatlist](/docs/images/chatlist.png)

</details>

<details><summary>대화 리뷰</summary>
<br>

![review-ai8](/docs/images/ai_8.png)

</details>

<details><summary>AI 대화창</summary>
<br>

![aichat](/docs/images/aichat_tech.png)

</details>

<details><summary>게시판</summary>
<br>

![notice](/docs/images/notice.png)

</details>

<details><summary>게시판 작성</summary>
<br>

![noticeWrite](/docs/images/noticeWrite.png)

</details>

<br>

## 🔎 주요 기능

<br>

## 🎬 기능 실행화면

<br>

## 📂 프로젝트 보고서

<br>

## ✌ 현재 구현 범위

<br>

## 📚 향후 개선 및 추가 기능

<br>

## 🧩 문제 해결 사례

<br>

## 🚀 프로젝트 회고

<br>

## ⚙️ 참고 자료










## 프로젝트 실행 준비
[Flask]
pip install -r requirements.txt  # 확장프로그램 설치
python seed_basic_ai.py          # 초기 basic AI 세팅

[Front]
cd frontend                     # 프론트엔드 폴더 이동
npm install                     # package내 확장프로그램 설치


