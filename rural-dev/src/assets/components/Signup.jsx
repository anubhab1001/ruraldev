import { useState } from "react";
import { auth, db } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

const Signup = ({ toggle }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", userCredential.user.uid), { name, email, mobile });
      alert("Account created successfully!");
      toggle();
    } catch (err) {
      setError("Error signing up! Try again.");
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-yellow-300 rounded-lg shadow-xl">
      <h2 className="text-3xl text-red-700 mb-4">Sign Up</h2>
      {error && <p className="text-red-500">{error}</p>}
      <input className="w-full p-2 my-2 border rounded" type="text" placeholder="Full Name" onChange={(e) => setName(e.target.value)} />
      <input className="w-full p-2 my-2 border rounded" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input className="w-full p-2 my-2 border rounded" type="number" placeholder="Mobile" onChange={(e) => setMobile(e.target.value)} />
      <input className="w-full p-2 my-2 border rounded" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button className="w-full bg-red-700 text-white p-2 rounded mt-2 hover:bg-red-800" onClick={handleSignup}>Sign Up</button>
      <p className="mt-4">Have an account? <span className="text-blue-500 cursor-pointer" onClick={toggle}>Sign-in →</span></p>
    </div>
  );
};

export default Signup;
