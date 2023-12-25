import Link from 'next/link'
import Image from 'next/image'
import HeroImg from "/public/hero.png"

const Hero = () => {
  return (
    <div className='flex max-md:flex-col-reverse'>

      <div className=" heroitem ">
         <h1 className='text-3xl font-bold'>Confess Calm</h1>
         <div className="desc max-w-md  max-md:text-center">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe error voluptas deleniti, ut quis magni dolor sapiente eos, repellendus obcaecati sequi quas? Alias unde aliquam architecto laudantium at dolorum perspiciatis.
         </div>
         <Link href="/profile"> <button className='gradient md:self-start text-white font-bold tracking-wide rounded-lg text-sm ' >view Profile</button></Link>
      </div>
     
      <div className=" md:w-1/2 flex items-center md:justify-end relative">
        <Image src={HeroImg} className='h-56 md:h-96 heroimg' alt='hero image'/>
      </div>

    </div>
  )
}

export default Hero