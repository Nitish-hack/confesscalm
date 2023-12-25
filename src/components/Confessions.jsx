"use client"
import React from 'react';
import ConfessionCard from './ConfessionCard';

const Confessions = ({data}) => {

  return (
    <div className='mt-10'>
      <div className="flex gap-5 flex-wrap w-full py-10 justify-center">
        {data?.map((item, index) => <ConfessionCard key={index} {...item} />)}
      </div>
    </div>
  );
};

export default Confessions;
