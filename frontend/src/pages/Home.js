import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";

const EmotionLive = () => {
  const webcamRef = useRef(null);
  const [emotion, setEmotion] = useState("");
  const [confidence, setConfidence] = useState(null);
  const [lastSaved, setLastSaved] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const intervalRef = useRef(null);

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
      await axios.post("http://localhost:5000/save-emotion", {
        emotion,
        confidence,
      });

      setLastSaved(new Date().toLocaleTimeString());
      alert("감정 저장 완료!");
    } catch (err) {
      console.error("감정 저장 실패:", err);
      alert("감정 저장 실패");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* <h1 className="text-2xl font-bold">실시간 감정 분석</h1>

      <div className="relative">
        <Webcam
          ref={webcamRef}
          audio={false}
          screenshotFormat="image/jpeg"
          width={400}
          height={300}
          className="rounded shadow"
        />
        {emotion && (
          <div className="absolute top-2 left-2 bg-black bg-opacity-60 text-white px-3 py-1 rounded">
            감정: {emotionDisplayMap[emotion] || emotion} ({confidence}%)
          </div>
        )}
      </div>

      <div className="flex gap-4">
        <button
          onClick={toggleAnalysis}
          className={`${isAnalyzing ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"
            } text-white px-4 py-2 rounded`}
        >
          {isAnalyzing ? "분석 중지" : "분석 시작"}
        </button>

        <button
          onClick={saveEmotion}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "저장 중..." : "감정 저장"}
        </button>
      </div>

      {lastSaved && (
        <p className="text-sm text-gray-500">최근 저장: {lastSaved}</p>
      )} */}
    </div>
  );
};

export default EmotionLive;
