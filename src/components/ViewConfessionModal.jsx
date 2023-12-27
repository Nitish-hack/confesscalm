"use client"
import { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { IoClose } from "react-icons/io5";
import Image from 'next/image';
import UserIcon from "../../public/usericon.jpg"
import { FaCommentAlt } from "react-icons/fa";
import {toast} from "react-toastify"
import { useSession } from 'next-auth/react';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    maxHeight: "90vh",
    boxShadow: 24,
    p: 4,
};
const formattedDate = (createdAt) => {
    const date = new Date(createdAt);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };


export default function ViewConfessionModal({ content, comments,confessionId }) {
    const [open, setOpen] = useState(false);
    const [comment, setComment] = useState("");
    const [allcomments,setAllcomments]=useState(comments);
    const session=useSession();
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubmit = async (e) => {
        const name=session?.data?.user?.name;
        if(name){
        try {
          const res = await fetch(`/api/confessions/comment/${confessionId}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
             name:name,
             desc:comment
            }),
          });
         
          if(res.status === 200){
            const currentDate = new Date().toISOString();
           const newComment={
            name:name,
            desc:comment,
            createdAt:currentDate
           }
           const newData = [...allcomments, newComment];
           setAllcomments(newData);

            toast.success("comment added");
            setComment("");
          } 
        } catch (err) { 
          console.log(err); 
          toast.error("some error encountered! ");
        }
        }
        else toast("wait for some time!")
      };
    

    return (
        <div>
            <button className='gradient md:self-start text-white font-bold tracking-wide rounded-lg text-sm px-2 py-1 ' onClick={handleOpen}>Read more / Comment</button>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={style} className="rounded-lg sm:w-2/4 w-3/4  overflow-scroll scroll-design" >
                    <div className='flex flex-col gap-4'>
                        <div className="flex justify-between items-center">
                            <h2 className='text-5xl font-extrabold orange_gradient text-slate-700'> Confession</h2>
                            <span className='text-3xl cursor-pointer' onClick={handleClose}><IoClose /></span>
                        </div>
                        <div className='text-justify'>
                            {content}
                        </div>
                        <h2 className='font-bold  text-xl'>{comments?.length} comments</h2>
                        <div className="flex flex-col gap-2">
                            <div className='flex gap-2'>
                                <span className="text-orange-700 text-xl"><FaCommentAlt /></span>
                                <div className='flex flex-col gap-1  flex-1 '>
                                <textarea type='text' value={comment} onChange={(e) => setComment(e.target.value)} style={{ height: "56px" }} className='outline-none p-4 bg-orange-300 placeholder_design rounded-lg' placeholder='Add your comment!' />
                                <button className='gradient rounded-lg text-sm  text-white px-3 py-1 self-end' onClick={handleSubmit}>comment</button>
                                </div>
                            </div>
                            {allcomments?.map((cmt, index) => <div key={index}>
                                <div className="flex gap-2 items-center ">
                                    <Image src={UserIcon} height={50} width={50} className="rounded-full self-start" alt="usericon" />
                                    <div className='pt-1'>
                                        <p className="font-bold ">{cmt.name}</p>
                                        <p className="text-xs font-bold text-slate-600">{formattedDate(cmt.createdAt)}</p>
                                        <div className='text-justify '>{cmt.desc}</div>
                                    </div>
                                </div>
                            </div>
                            )}
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}