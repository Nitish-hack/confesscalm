"use client"
import { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { IoClose } from "react-icons/io5";
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export default function ViewConfessionModal({content}) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <button className='gradient md:self-start text-white font-bold tracking-wide rounded-lg text-sm px-2 py-1 mt-2' onClick={handleOpen}>read more</button>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={style} className="rounded-lg sm:w-2/4 w-3/4" >
                    <div className='flex flex-col gap-4'>
                        <div className="flex justify-between items-center">
                            <h2 className='text-3xl text-slate-700'> Confession</h2>
                            <span className='text-3xl cursor-pointer' onClick={handleClose}><IoClose /></span>
                        </div>
                        <div>
                            {content}
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}