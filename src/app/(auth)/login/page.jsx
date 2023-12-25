"use client";
import React, { useEffect, useState } from "react";
import { getProviders, signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

const Login = ({ url }) => {
  const session = useSession();
  const router = useRouter();
  const params = useSearchParams();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    setError(params.get("error"));
    setSuccess(params.get("success"));
  }, [params]);

  if (session.status === "loading") {
    return <p>Loading...</p>;
  }

  if (session.status === "authenticated") {
    router?.push("/profile");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const password = e.target[1].value;

    signIn("credentials", {
      name,
      password,
    });
  };

  return (
    <div className="flex flex-col w-full  items-center justify-center  " style={{ minHeight: "85vh" }}>
   <div className="max-w-lg w-full flex  flex-col items-center">
      {/* <h1 >{success ? success : "Welcome Back"}</h1> */}
      <h2 className="text-3xl font-bold mb-2">Sign in to Confess Calm.</h2>

      <form onSubmit={handleSubmit} className="flex flex-col w-full gap-5  p-4 ">
        <input
          type="text"
          placeholder="Username"
          required
          className="w-full p-4 outline-none rounded-lg border-4 border-orange-500 "
         
        />
        <input
          type="password"
          placeholder="Password"
          required
          className="w-full p-4 outline-none rounded-lg border-4 border-orange-500 "
        />
        <button className="gradient rounded-lg text-white p-4 font-bold tracking-wide" >Login</button>
        {error && error}
      </form>
      {/* <div className="w-full px-4">
      <button onClick={() => {signIn("google");}} className="bg-black text-white w-full rounded-lg">
        Login with Google
      </button>
      </div> */}
      <br />  
      <span>- OR -</span>
      <Link  href="/register">
        Create new account
      </Link>
    </div>
    </div>
  );
};

export default Login;