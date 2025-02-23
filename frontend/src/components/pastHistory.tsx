import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const pastHistory = ({ userData }) => {
  const [doctorName, setDoctorName] = useState("");
  const [doctorContact, setDoctorContact] = useState("");
  const [threshold, setThreshold] = useState(0);
  const [averageScore, setAverageScore] = useState(0);

  useEffect(() => {
    if (userData && userData.data.length > 0) {
      const totalScore = userData.data.reduce(
        (sum, entry) => sum + entry.drawing.reduce((a, b) => a + b, 0),
        0
      );
      const count = userData.data.reduce(
        (sum, entry) => sum + entry.drawing.length,
        0
      );
      const avgScore = totalScore / count;
      setAverageScore(avgScore);

      if (avgScore < threshold) {
        alert(
          `Average score is below threshold! Contact Dr. ${doctorName} at ${doctorContact}.`
        );
      }
    }
  }, [userData, threshold, doctorName, doctorContact]);

  const chartData = userData.data.map((entry) => ({
    date: entry.date,
    score: entry.drawing.reduce((a, b) => a + b, 0) / entry.drawing.length,
  }));

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">User Scores Over Time</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={[0, 1]} />
          <Tooltip />
          <Line type="monotone" dataKey="score" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>

      <div className="mt-4">
        <label className="block mb-2">
          Doctor's Name:
          <input
            type="text"
            value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
          />
        </label>
        <label className="block mb-2">
          Doctor's Contact:
          <input
            type="text"
            value={doctorContact}
            onChange={(e) => setDoctorContact(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
          />
        </label>
        <label className="block mb-2">
          Threshold:
          <input
            type="number"
            value={threshold}
            onChange={(e) => setThreshold(parseFloat(e.target.value))}
            className="mt-1 p-2 border rounded w-full"
          />
        </label>
      </div>
    </div>
  );
};

export default pastHistory;
