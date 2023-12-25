"use client"
import { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { IoClose } from "react-icons/io5";
import { useSession } from 'next-auth/react';
import {toast} from "react-toastify"

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function AddConfessionModal({pushData}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const session=useSession();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = e.target[0].value;
    const content = e.target[1].value;
    const name=session?.data?.user?.name;

 
    try {
      const res = await fetch("/api/confessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          name
        }),
      });
     
      if(res.status === 201){
        const currentDate = new Date().toISOString();
        const newConfession = {
          title,
          content,
          name,
          createdAt: currentDate,
        };
  
       pushData(newConfession);
        
        handleClose();
        toast("confession added");
      
      } 
    } catch (err) { 
      console.log(err); 
    }

  };

  return (
    <div>

      <button className='gradient md:self-start text-white font-bold tracking-wide rounded-lg text-sm ' onClick={handleOpen}>Add Confession</button>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style} className="rounded-lg sm:w-2/5 w-3/4">
          <div className='flex flex-col gap-4'>
            <div className="flex justify-between items-center">
              <h2 className='text-3xl text-slate-700'>Add Confession</h2>
              <span className='text-3xl cursor-pointer' onClick={handleClose}><IoClose /></span>
            </div>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <input type="text" className='w-full bg-orange-300 px-5 py-3 rounded-lg placeholder:text-black outline-none' placeholder='Enter the Title' />
            <textarea className='w-full bg-orange-300 p-5 rounded-lg placeholder:text-black outline-none' placeholder='Enter your Confession' style={{ height: "200px" }} />
            <button className='gradient text-white rounded-lg font-bold tracking-wide'>Submit</button>
            </form>
          </div>
        </Box>
      </Modal>
    </div>
  );
}