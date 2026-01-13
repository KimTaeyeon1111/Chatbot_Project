import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import "@fortawesome/fontawesome-free/css/all.min.css";


import Header from './components/common/Header.jsx'
import Footer from './components/common/Footer.jsx'
import Main from './components/Main.jsx'
import Login from './components/userbasic/Login.jsx'
import Signup from './components/userbasic/Signup.jsx'
import Mypage from './components/userbasic/Mypage.jsx'
import Pay from './components/userbasic/Pay.jsx'
import Detail from './components/chat/Detail.jsx'
import ErrorPage from "./components/common/ErrorPage.jsx"
import NoticeWrite from './components/notice/NoticeWrite.jsx';
import ChatList from './components/chat/ChatList.jsx';
import NoticeDetail from './components/notice/NoticeDetail.jsx';
import ChatComponent from './components/chat/ChatComponent.jsx';
import ChatComponentKTY from './components/chat/sample.jsx';

/* 자동 스크롤 import */
import BackToTop from "./components/common/BackToTop.jsx";
import { Outlet } from "react-router-dom"

// 내부 레이아웃
function MainLayout() {
    return (
        <>
            <Header />
            <Outlet />
            <BackToTop />
            <Footer />
        </>
    );
}

// 해더/푸터 없는 레이아웃
function EmptyLayout() {
    return <Outlet />;
}

// 해더만 있는 레이아웃
function NoFooterLayout() {
    return (
        <>
            <Header />
            <Outlet />
            <BackToTop />
        </>
    )
}

function App() {

    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<Main />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Signup" element={<Signup />} />
                <Route path="/Mypage" element={<Mypage />} />
                <Route path="/Pay" element={<Pay />} />
                {/*  <Route path='/Detail' element={<Detail />} /> */}
                <Route path="/ai/:aiId" element={<Detail />} />
                <Route path='/ErrorPage' element={<ErrorPage />} />
                <Route path='/NoticeWrite' element={<NoticeWrite />} />
                <Route path="/notice/:noticeId" element={<NoticeDetail />} />
            </Route>

            {/* 해더만 있음 */}
            <Route element={<NoFooterLayout />}>
                <Route path="/aichat/:type" element={<ChatComponent />} />
                <Route path="/KTY/:type" element={<ChatComponentKTY />} />
            </Route>

            {/* 해더푸터 없음 */}
            <Route element={<EmptyLayout />}>
                <Route path='/ChatList' element={<ChatList />} />
            </Route>

        </Routes>

    )
}

export default App;
