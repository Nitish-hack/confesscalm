"use client"
import React,{useState,useEffect} from 'react'
import Hero from '@/components/Hero'
import Confessions from '@/components/Confessions';
import { CiSearch } from "react-icons/ci";


const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/confessions", {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        const jsonData = await res.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures that the effect runs once after the initial render

  return (
    <div >
      <Hero />

      <div className='gradient'>
        <div className='flex justify-center mt-5 p-7 w-full'>
          <input type='text' placeholder='Search for the confessions...' className='text-black font-semibold placeholder_design w-3/4 p-5 outline-none rounded-l-lg' />

          <button className='bg-slate-400 text-white text-3xl rounded-r-lg '><CiSearch className='font-black' /></button>
        </div>
      </div>
      
      <Confessions  data={data}/>
     
    </div>
  )
}

export default Home