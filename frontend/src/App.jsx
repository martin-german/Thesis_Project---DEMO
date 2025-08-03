import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

import HomePage from "./pages/HomePage";
import CommunityPage from "./pages/CommunityPage";
import ArticlePage from "./pages/ArticlesPage";
import MeditationPage from "./pages/MeditationPage";
import LearnPage from "./pages/LearnPage";
import Authpage from "./pages/Authpage";
import ProfilePage from "./pages/ProfilePage";
import JournalPage from "./pages/JournalPage";

import Article from "./components/articleComponents/Article";
import WriteArticle from "./components/articleComponents/WriteArticle";

import ScrollToTop from "./components/utilityComponents/ScrollToTop";
import LoadingScreen from "./components/utilityComponents/LoadingScreen";
import VerifyRedirect from "./components/authComponents/VerifyRedirect";

import CommunityPostDetail from "./components/communityComponents/CommunityPostDetail";

import Layout from "./components/utilityComponents/Layer";
import "./css/index.css";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <LoadingScreen />;

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Public routes without layout */}
        <Route path="/" element={<HomePage />} />

        <Route path="/authpage" element={<Authpage />} />
        <Route path="/verify" element={<VerifyRedirect />} />

        {/* Protected + layout-wrapped routes */}
        <Route element={<Layout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/post/:id" element={<Article />} />
          <Route path="/write" element={<WriteArticle />} />
          <Route path="/journal" element={<JournalPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/community/:id" element={<CommunityPostDetail />} />

          <Route path="/articles" element={<ArticlePage />} />
          <Route path="/meditation" element={<MeditationPage />} />
          <Route path="/learn" element={<LearnPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;