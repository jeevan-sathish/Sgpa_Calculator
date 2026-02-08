import React, { useState } from "react";
import { ClipLoader } from "react-spinners";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const App = () => {
  const [size, setSize] = useState(0);
  const [subjects, setSubjects] = useState([]);
  const [sgpa, setSgpa] = useState(null);
  const [gradepoints, setGradepoints] = useState([]);
  const [loading, setLoading] = useState(false); 

  const handleChange = (index, field, value) => {
    const copy = [...subjects];
    copy[index] = {
      ...copy[index],
      [field]: Number(value),
    };
    setSubjects(copy);
  };

  const handleResult = async () => {
    try {
      setLoading(true);

      const response = await fetch("http://127.0.0.1:5000/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(subjects),
      });

      const data = await response.json();
      setSgpa(data.sgpa);
      setGradepoints(data.grade_points);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-green-400 relative">

      
      {loading && (
        <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <ClipLoader color="#22c55e" size={80} />
        </div>
      )}

      <nav className="h-[10vh] flex items-center px-10 border-b border-green-600">
        <h1 className="text-2xl font-bold tracking-wide">
          SGPA Calculator
        </h1>
      </nav>

      <main className="min-h-[70vh] flex justify-center items-start py-10 relative">
        <div className="w-[80%] bg-gray-900 rounded-xl p-8 shadow-lg">

          <div className="mb-6">
            <label className="block mb-2 text-green-300">
              Number of Subjects
            </label>
            <input
              type="number"
              min="0"
              className="w-60 px-4 py-2 bg-black border border-green-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              onChange={(e) => setSize(Number(e.target.value))}
            />
          </div>

          {size > 0 && (
            <div className="grid grid-cols-3 gap-4 mb-4 text-green-300 font-semibold">
              <div>Subject</div>
              <div>Marks</div>
              <div>Credits</div>
            </div>
          )}

          {Array.from({ length: size }).map((_, i) => (
            <div key={i} className="grid grid-cols-3 gap-4 mb-3 items-center">
              <div>Subject {i + 1}</div>

              <input
                type="number"
                placeholder="0 - 100"
                className="px-3 py-2 bg-black border border-green-600 rounded-md"
                onChange={(e) => handleChange(i, "marks", e.target.value)}
              />

              <input
                type="number"
                placeholder="Credits"
                className="px-3 py-2 bg-black border border-green-600 rounded-md"
                onChange={(e) => handleChange(i, "credits", e.target.value)}
              />
            </div>
          ))}

          {size > 0 && (
            <button
              onClick={handleResult}
              className="mt-6 px-8 py-2 bg-green-400 text-black rounded-lg font-semibold hover:bg-green-500"
            >
              Calculate SGPA
            </button>
          )}
        </div>

    
        {sgpa !== null && !loading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 bg-black bg-opacity-95 flex justify-center items-center z-40"
          >
            <div className="w-[80%] max-w-3xl bg-gray-900 rounded-xl p-8 border border-green-600">

              <h1 className="text-3xl font-bold text-green-400 mb-4 text-center">
                SGPA Result
              </h1>

              <div className="text-center text-4xl font-bold text-green-300 mb-6">
                SGPA: <span className="text-green-400">{sgpa}</span>
              </div>

              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={gradepoints.map((gp, i) => ({
                      subject: `Subject: ${i + 1}`,
                      grade: gp,
                    }))}
                  >
                    <XAxis dataKey="subject" stroke="#22c55e" />
                    <YAxis domain={[0, 10]} stroke="#22c55e" />
                    <Tooltip />
                    <Bar dataKey="grade" fill="#22c55e" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <button
                onClick={() => setSgpa(null)}
                className="mt-6 w-full py-2 bg-green-400 text-black rounded-lg font-semibold"
              >
                Close
              </button>
            </div>
          </motion.div>
        )}
      </main>

      <footer className="h-[20vh] flex flex-col items-center justify-center text-green-500 border-t border-green-600">
        <p>Built with React & Python and flask</p> <br />
      
        <p>love from 💗 jeevan S</p>
      </footer>

    </div>
  );
};

export default App;
