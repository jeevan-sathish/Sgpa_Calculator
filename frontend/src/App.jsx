import { useState } from "react";

function App() {
  const [marks, setMarks] = useState([80, 45, 72, 98, 77]);
  const [credits] = useState([4, 3, 4, 3, 2]);
  const [sgpa, setSgpa] = useState(null);

  const calculateSGPA = async () => {
    const res = await fetch("http://localhost:5000/calculate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ marks, credits })
    });
    const data = await res.json();
    setSgpa(data.sgpa);
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>VTU SGPA Calculator</h1>

      {marks.map((m, i) => (
        <input
          key={i}
          type="number"
          value={m}
          onChange={(e) => {
            const copy = [...marks];
            copy[i] = Number(e.target.value);
            setMarks(copy);
          }}
        />
      ))}

      <br /><br />
      <button onClick={calculateSGPA}>Calculate SGPA</button>

      {sgpa && <h2>SGPA: {sgpa}</h2>}
    </div>
  );
}

export default App;
