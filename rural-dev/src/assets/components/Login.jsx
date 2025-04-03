import { useState } from "react";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = ({ toggle }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
    } catch (err) {
      setError("Invalid credentials! Try again.");
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-yellow-300 rounded-lg shadow-xl">
      <h2 className="text-3xl text-red-700 mb-4">Sign In</h2>
      {error && <p className="text-red-500">{error}</p>}
      <input className="w-full p-2 my-2 border rounded" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input className="w-full p-2 my-2 border rounded" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button className="w-full bg-red-700 text-white p-2 rounded mt-2 hover:bg-red-800" onClick={handleLogin}>Sign In</button>
      <p className="mt-4">Don't have an account? <span className="text-blue-500 cursor-pointer" onClick={toggle}>Sign-up →</span></p>
    </div>
  );
};

export default Login;
