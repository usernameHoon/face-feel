import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

import dayjs from 'dayjs';

// 색상 및 이모지 매핑 (객체 형태로 수정)
const COLORS = {
  happy: '#82ca9d',
  sad: '#8884d8',
  angry: '#ff8042',
  surprise: '#ffc658',
  neutral: '#a4de6c',
  fear: '#d0ed57',
};

const EMOTION_EMOJI = {
  happy: '😊',
  sad: '😢',
  angry: '😠',
  surprise: '😲',
  neutral: '😐',
  fear: '😨',
};

const EmotionLineChart = ({ data }) => {
  if (!data || data.length === 0) return null;

  // 날짜 단위별 감정 count 정리
  const grouped = {};
  data.forEach(({ timestamp, emotion }) => {
    const dateKey = dayjs(timestamp).format('YYYY-MM-DD'); // 🔄 날짜 기준으로 변경
    if (!grouped[dateKey]) grouped[dateKey] = {};
    grouped[dateKey][emotion] = (grouped[dateKey][emotion] || 0) + 1;
  });

  // 차트용 배열 데이터
  const EMOTION_KEYS = ['happy', 'neutral', 'angry', 'sad', 'fear', 'surprise'];

  const chartData = Object.entries(grouped).map(([date, emotions]) => {
    const entry = { date };
    EMOTION_KEYS.forEach((emotion) => {
      entry[emotion] = emotions[emotion] || 0;
    });
    return entry;
  });

  const uniqueEmotions = [...new Set(data.map((entry) => entry.emotion))];

  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart
        data={chartData}
        margin={{ top: 10, right: 20, left: 0, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" tick={{ fontSize: 12 }} />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Legend />
        {uniqueEmotions.map((emotion) => (
          <Line
            key={emotion}
            type="monotone"
            dataKey={emotion}
            stroke={COLORS[emotion] || '#000'}
            name={`${EMOTION_EMOJI[emotion] || ''} ${emotion}`}
            strokeWidth={2}
            dot={{ r: 2 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};


export default EmotionLineChart;
