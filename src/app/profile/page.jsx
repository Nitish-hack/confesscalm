"use client"
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import React,{useState,useEffect} from 'react'
import Hello from "../../../public/hello.png"
import Image from 'next/image';
import AddConfessionModal from '@/components/AddConfessionModal';
import Confessions from '@/components/Confessions';

const Profile = () => {
    const session=useSession();
    const router = useRouter();      
    const name=session?.data?.user?.name;
    const [data, setData] = useState([]);



    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await fetch(`/api/confessions/${name}`, {
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
    }, [name]); 
  
    function pushData(newConfession){
      
      const newData = [...data, newConfession];
        setData(newData);
    }

    
    if (session.status === "unauthenticated") {
      router?.push("/login");
    }
    if (session.status === "loading") {
         return <p>Loading...</p>;
       }
  return (
    <div  className='container  '>
     <div className="flex w-full max-lg:flex-col max-lg:gap-2 max-lg:mb-20">
      <div className="flex w-full lg:w-1/4">
       <Image className='heroimg' src={Hello} alt="hello user" style={{width:"100%",height:"300px",objectFit:"contain"}}/>
      </div>  
      <div className="flex lg:w-3/4 w-full flex-col gap-2 justify-center max-lg:items-center max-lg:text-center max-lg:gap-4 ">
        <h1 className='sm:text-6xl text-5xl font-extrabold'>Welcome <span className='orange_gradient'>{name}</span></h1>
        <p>Post your confession anonymously, play Stress relief games with our safe and secure platform Confess Calm !</p>
        <AddConfessionModal pushData={pushData}/>
      </div> 
     </div>

    <h1 className="text-5xl font-extrabold text-center text-white p-5 gradient">My Confessions</h1>
    <Confessions data={data} />

    </div>
  )
}

export default Profile