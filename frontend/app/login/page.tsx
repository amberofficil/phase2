"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "../../lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn(email.trim(), password); // trim() for safety

    console.log("Login response:", res);
    if (res?.token) {
      // ✅ Save token locally
      localStorage.setItem("access_token", res.token);
      // ✅ Direct redirect to dashboard
      router.push("/dashboard");
    } else {
      alert("Login failed!"); // optional
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />
      <button type="submit">Sign In</button>
    </form>
  );
}

