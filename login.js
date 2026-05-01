import React, { useState } from 'react';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
    const data = await response.json();

    if (data.success) {
      localStorage.setItem("token", data.token);
      setMessage("Logged in successfully!");
    } else {
      setMessage("Login failed!");
    }
  };

  const fetchDashboard = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:5000/dashboard", {
      headers: { "Authorization": `Bearer ${token}` }
    });
    const data = await response.json();
    setMessage(data.message || data.secretData || "Access Denied");
  };

  return (
    <div style={{
      padding: '250px',
      backgroundImage: "url('/aura_stewie1.svg')",
      }}>
      <h1>what fo lunch teach</h1>
      <input type="text" placeholder="Username" onChange={e => setUsername(e.target.value)} /><br/>
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} /><br/>
      <button onClick={handleLogin}>Login</button>
      <p>{message}</p>
    </div>
  );
}

export default Login;
