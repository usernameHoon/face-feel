import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

// 색상 및 이모지 매핑 (객체 형태)
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

const EmotionDonutChart = ({ data }) => {
  const emotionCounts = data.reduce((acc, cur) => {
    acc[cur.emotion] = (acc[cur.emotion] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(emotionCounts).map(([emotion, count]) => ({
    emotion, // 감정명 추가
    name: `${EMOTION_EMOJI[emotion] || ''} ${emotion}`,
    value: count,
  }));

  return (
    <div className="relative w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="45%"
            innerRadius={50}
            outerRadius={80}
            label
            isAnimationActive={true}
          >
            {chartData.map((entry) => (
              <Cell
                key={`cell-${entry.emotion}`}
                fill={COLORS[entry.emotion] || '#ccc'}
              />
            ))}
          </Pie>

          <Legend
            iconType="circle"
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
            wrapperStyle={{ whiteSpace: 'normal', lineHeight: '1.5em' }}
            payload={chartData.map((entry) => ({
              value: `${EMOTION_EMOJI[entry.emotion] || ''} ${entry.emotion}`,
              type: 'circle',
              color: COLORS[entry.emotion] || '#ccc',
              id: entry.emotion,
            }))}
          />

          <Tooltip
            formatter={(value, name) => [`${value}회`, name]}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EmotionDonutChart;
