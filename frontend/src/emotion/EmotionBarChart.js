import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from 'recharts';

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

const EmotionBarChart = ({ data }) => {
  const emotionCounts = data.reduce((acc, cur) => {
    acc[cur.emotion] = (acc[cur.emotion] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(emotionCounts).map(([emotion, count]) => ({
    emotion, // 감정 이름 유지
    name: `${EMOTION_EMOJI[emotion] || ''} ${emotion}`,
    value: count,
  }));

  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 30 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
        <YAxis allowDecimals={false} />
        <Tooltip formatter={(value, name) => [`${value}회`, name]} />

        <Legend
          iconType="circle"
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
          payload={chartData.map((entry) => ({
            value: entry.name,
            type: 'circle',
            color: COLORS[entry.emotion] || '#ccc',
          }))}
        />

        <Bar dataKey="value" name="" legendType="none">
          {chartData.map((entry) => (
            <Cell key={entry.emotion} fill={COLORS[entry.emotion] || '#ccc'} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default EmotionBarChart;
