"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Register = () => {
  const [error, setError] = useState(null);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
  
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      res.status === 201 && router.push("/profile/login?success=Account has been created");
    } catch (err) {
      setError(err);
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col w-full  items-center justify-center  " style={{ minHeight: "85vh" }}>
      <div className="max-w-lg w-full flex  flex-col items-center">
        <h1 className="text-3xl font-bold mb-2">Create an Account</h1>

        <form onSubmit={handleSubmit} className="flex flex-col w-full gap-5  p-4 ">
         
          <input
            type="text"
            placeholder="Username"
            required
            className="w-full p-4 outline-none rounded-lg border-4 border-orange-500 "
          />
          <input
            type="text"
            placeholder="Email"
            required
            className="w-full p-4 outline-none rounded-lg border-4 border-orange-500"
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="w-full p-4 outline-none rounded-lg border-4 border-orange-500"
          />
          <button className="gradient rounded-lg text-white p-4 font-bold tracking-wide" >Register</button>
          {error && "Something went wrong!"}
        </form>
        <span>- OR -</span>
        <Link href="/profile/login">
          Login with an existing account
        </Link>
      </div>
    </div>
  );
};

export default Register;