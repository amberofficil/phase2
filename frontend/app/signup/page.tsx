"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUp } from "../../lib/auth";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signUp(email.trim(), password); // trim() ensures no extra spaces
    if (res?.token) {
      // ✅ Save token locally
      localStorage.setItem("access_token", res.token);
      // ✅ Direct redirect to dashboard
      router.push("/dashboard");
    } else {
      alert("Signup failed!"); // optional
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />
      <button type="submit">Sign Up</button>
    </form>
  );
}
