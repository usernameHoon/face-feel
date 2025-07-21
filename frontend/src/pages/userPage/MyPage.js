import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import EmotionPieChart from '../../emotion/EmotionPieChart';
import EmotionBarChart from '../../emotion/EmotionBarChart';
import EmotionLineChart from '../../emotion/EmotionLineChart';
import EmotionDonutChart from '../../emotion/EmotionDonutChart';

const MyPage = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [emotionLogs, setEmotionLogs] = useState([]);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [chartType, setChartType] = useState('circle');

  const emotionCounts = emotionLogs.reduce((acc, cur) => {
    acc[cur.emotion] = (acc[cur.emotion] || 0) + 1;
    return acc;
  }, {});

  const maxCount = Math.max(...Object.values(emotionCounts));
  const topEmotions = Object.entries(emotionCounts)
    .filter(([_, count]) => count === maxCount)
    .map(([emotion]) => emotion);

  const sortedLogs = [...emotionLogs].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  const EMOTION_EMOJI = {
    happy: '😊',
    sad: '😢',
    angry: '😠',
    surprised: '😲',
    neutral: '😐',
    fear: '😨',
  };

  useEffect(() => {
    const fetchEmotionData = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const logsRes = await axios.get(`http://localhost:8080/api/emotion-log?userId=${user.id}`, config);
        const feedbackRes = await axios.get(`http://localhost:8080/api/emotion-feedback?userId=${user.id}`, config);

        setEmotionLogs(logsRes.data);
        setFeedbackMessage(feedbackRes.data);
      } catch (error) {
        console.error("감정 데이터 가져오기 실패", error);
      }
    };

    if (user?.id) {
      fetchEmotionData();
    }
  }, [user?.id]);

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm("정말로 회원 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다.");
    if (!confirmDelete) return;

    try {
      await await axios.delete('http://localhost:8080/api/withdraw', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      alert("회원 탈퇴가 완료되었습니다.");
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      window.location.href = "/login";
    } catch (err) {
      console.error("회원 탈퇴 실패", err);
      alert("회원 탈퇴 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="mt-4 w-full max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">마이페이지</h2>

      <div className="text-right mb-4">
        <Link
          to="/"
          className="text-blue-600 hover:text-blue-800 hover:underline text-sm"
        >
          ← 홈으로 이동
        </Link>
      </div>

      {/* 4분할 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
        {/* 1. 사용자 정보 */}
        <section className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">👤 사용자 정보</h3>
          <div className="space-y-2 text-gray-700 text-sm">
            <p><span className="font-medium text-gray-900">이메일: </span>{user?.email}</p>
            <p><span className="font-medium text-gray-900">이름: </span>{user?.name}</p>
          </div>
          <div className="mt-6 border-t pt-4 text-right">
            <p className="text-sm text-gray-500 mb-2">
              회원 탈퇴 시 모든 정보가 삭제되며 복구되지 않습니다.
            </p>
            <button
              onClick={handleDeleteAccount}
              className="text-red-600 hover:text-red-800 hover:underline text-sm"
            >
              회원 탈퇴
            </button>
          </div>
        </section>

        {/* 2. 최근 감정 기록 */}
        <section className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
          <h4 className="text-lg font-semibold mb-2 text-gray-800">🧠 최근 감정 기록</h4>
          {emotionLogs.length > 0 ? (
            <ul className="text-sm text-gray-700 space-y-1">
              {sortedLogs.slice(0, 5).map((log) => (
                <li key={log.id}>
                  {new Date(log.timestamp).toLocaleString()} -
                  <span className="font-medium ml-1">{log.emotion}</span> ({log.confidence}%)
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm">최근 감정 기록이 없습니다.</p>
          )}
        </section>

        {/* 3. 감정 통계 */}
        <section className="bg-white p-6 rounded-2xl border border-gray-200 md:col-span-2">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-lg font-semibold text-gray-800">📊 감정 통계</h4>
            <div className="flex space-x-2">
              <select
                value={chartType}
                onChange={(e) => setChartType(e.target.value)}
                className="text-sm border rounded px-2 py-1"
              >
                <option value="circle">원형</option>
                <option value="bar">막대</option>
                <option value="line">날짜별</option>
              </select>
            </div>
          </div>

          {emotionLogs.length > 0 ? (
            <>

              {/* ✅ 중심 감정 강조 표시 */}
              <div className="text-sm font-semibold text-center text-gray-700 mb-2">
                <div className="text-2xl flex flex-wrap justify-center gap-2">
                  {topEmotions.map((e) => (
                    <span key={e}>{EMOTION_EMOJI[e] || ''} {e}</span>
                  ))}
                </div>
                <div className="mt-2 text-sm text-gray-700 text-center">
                  가장 많이 감지된 감정:
                  <strong className="ml-1">
                    {topEmotions.join(', ')} ({maxCount}회)
                  </strong>
                  <div className="mt-4 text-sm text-gray-600 text-center">
                    총 감정 분석 횟수: {emotionLogs.length}회
                  </div>
                </div>
              </div>

              {chartType === 'circle' && (
                <div className="flex items-center justify-center">
                  <div className="w-[40%]">
                    <EmotionPieChart data={emotionLogs} />
                  </div>
                  <div className="w-[40%]">
                    <EmotionDonutChart data={emotionLogs} />
                  </div>
                </div>
              )}
              {chartType === 'bar' && <EmotionBarChart data={emotionLogs} />}
              {chartType === 'line' && <EmotionLineChart data={emotionLogs} />}
            </>
          ) : (
            <p className="text-sm text-gray-500 mt-4">감정 로그가 없습니다.</p>
          )}
        </section>

        {/* 4. 감정 피드백 */}
        {feedbackMessage ? (
          <section className="bg-yellow-50 p-6 rounded-2xl border border-yellow-300 md:col-span-2 mb-5">
            <h4 className="text-md font-semibold mb-1 text-yellow-800">💬 감정 피드백</h4>
            <p className="text-sm text-yellow-700 whitespace-pre-line leading-loose">{feedbackMessage}</p>
          </section>
        ) : (
          <section className="bg-yellow-50 p-6 rounded-2xl border border-yellow-300 flex items-center justify-center text-sm text-yellow-600 md:col-span-2">
            감정 피드백이 없습니다.
          </section>
        )}
      </div>
    </div>
  );
};

export default MyPage;
