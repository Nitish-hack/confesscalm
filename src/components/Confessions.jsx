"use client"
import React from 'react';
import ConfessionCard from './ConfessionCard';
import Image from 'next/image';
import Loading from "../../public/loading.gif"

const Confessions = ({data}) => {

  return (
    <div className='mt-10'>
      {data.length!==0 ?
      <div className="flex gap-5 flex-wrap w-full py-10 justify-center">
        {data?.map((item, index) => <ConfessionCard key={index} {...item} />)}
      </div>
:
<div className="flex justify-center">
<Image src={Loading} style={{height:"100px", width:"100px"}} alt="loading..." />
</div>
}
    </div>
  );
};

export default Confessions;
