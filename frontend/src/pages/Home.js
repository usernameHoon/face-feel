import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import Webcam from "react-webcam";
import axios from "axios";
import { getToken } from "../services/authService";

const EmotionLive = () => {
  const webcamRef = useRef(null);
  const [emotion, setEmotion] = useState("");
  const [confidence, setConfidence] = useState(null);
  const [lastSaved, setLastSaved] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const intervalRef = useRef(null);
  const isAuthenticated = !!getToken();

  const token = localStorage.getItem("token");

  const emotionDisplayMap = {
    angry: "화남 😠",
    disgust: "역겨움 🤢",
    fear: "두려움 😨",
    happy: "행복 😄",
    sad: "슬픔 😢",
    surprise: "놀람 😲",
    neutral: "무표정 😐",
  };

  // 감정 분석 시작/중지 토글
  const toggleAnalysis = () => {
    if (isAnalyzing) {
      clearInterval(intervalRef.current);
      setIsAnalyzing(false);
    } else {
      intervalRef.current = setInterval(analyzeEmotion, 1000);
      setIsAnalyzing(true);
    }
  };

  // 컴포넌트 언마운트 시 interval 정리
  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  const analyzeEmotion = async () => {
    if (!webcamRef.current) return;
    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) return;

    try {
      const res = await axios.post("http://localhost:5000/analyze", {
        image: imageSrc,
      });

      setEmotion(res.data.emotion);
      setConfidence(res.data.confidence.toFixed(2));
    } catch (err) {
      console.error("감정 분석 실패:", err);
    }
  };

  const saveEmotion = async () => {
    if (!emotion || !confidence) {
      alert("감정 분석이 완료되지 않았습니다.");
      return;
    }

    try {
      setLoading(true);
      await axios.post("http://localhost:8080/api/save-emotion", {
        emotion,
        confidence,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setLastSaved(new Date().toLocaleTimeString());
      alert("감정 저장 완료!");
      window.location.href = "/mypage";
    } catch (err) {
      console.error("감정 저장 실패:", err);
      alert("감정 저장 실패");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-2 flex flex-col items-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">실시간 감정 분석</h2>
      {isAuthenticated ? (
        <>
          <div className="relative">
            <Webcam
              ref={webcamRef}
              audio={false}
              screenshotFormat="image/jpeg"
              className="w-full max-w-lg rounded-2xl shadow-xl border border-gray-200"
            />
            {emotion && (
              <div className="absolute top-4 left-4 bg-black bg-opacity-80 text-white px-5 py-3 rounded-xl text-base shadow-md">
                😊 감정: <span className="font-semibold">{emotionDisplayMap[emotion] || emotion}</span><br />
                🔍 정확도: {confidence}%
              </div>
            )}
          </div>

          <div className="flex gap-5 mt-8">
            <button
              onClick={toggleAnalysis}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-lg font-semibold text-white transition
            ${isAnalyzing
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-blue-600 hover:bg-blue-700"
                }`}
            >
              {isAnalyzing ? "⛔ 분석 중지" : "▶️ 분석 시작"}
            </button>

            <button
              onClick={saveEmotion}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl text-lg font-semibold transition disabled:opacity-50"
              disabled={loading}
            >
              💾 {loading ? "저장 중..." : "감정 저장"}
            </button>
          </div>

          {lastSaved && (
            <p className="text-sm text-gray-500 mt-4">🕒 최근 저장: {lastSaved}</p>
          )}
        </>
      ) : (
        <div className="text-center text-gray-700 text-lg mt-12">
          감정 분석 기능을 사용하려면{" "}
          <Link to="/signin" className="font-bold text-blue-600 hover:underline">
            로그인
          </Link>
          이 필요합니다.
        </div>
      )}
    </div>
  );
};

export default EmotionLive;
