"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import DarkModeToggle from './DarkModeToggle/DarkModeToggle';
import { CgProfile } from "react-icons/cg";
import { signOut, useSession } from "next-auth/react";
import CompanyLogo from "../../public/logo.png"

const links = [
  {
    id: 1,
    title: "Home",
    url: "/"
  },
  {
    id: 2,
    title: "Game",
    url: "/dicegame"
  },

]

const Navbar = () => {
  const session = useSession();
  const [toggleDropdown, setToggleDropdown] = useState(false);

  return (
    <div className='flex justify-between py-3 items-center '>
      <Link href={"/"}>
        <Image
          src={CompanyLogo}
          style={{ height: "40px", width: "auto" }}
          alt="company logo"
        />
      </Link>
      {/* desktop navigation */}
      <div className="sm:flex hidden gap-3 items-center">
        <DarkModeToggle />
        {links.map((item) =>
          <Link href={item.url} key={item.id}>{item.title}</Link>
        )}
        {
          session.status !== "authenticated" && <Link href={"/login"}><button className='gradient text-white rounded-lg py-2 font-bold trackingz-wide px-2 text-sm' >
            Sign In
          </button> </Link>
        }
        {session.status === "authenticated" && (
          <>
            <Link href={"/profile"} className='text-3xl'><CgProfile /></Link>
            <button className='gradient text-white rounded-lg py-2 font-bold tracking-wide px-2 text-sm' onClick={signOut}>
              Logout
            </button>
          </>
        )}
      </div>

      {/* mobile navigation */}
      <div className="sm:hidden flex relative items-center gap-2">

        <DarkModeToggle />
        {session.status === "authenticated"?
        <span className='text-3xl' onClick={()=>setToggleDropdown(prev=>!prev)}><CgProfile /></span>:
        <Link href={"/login"}><button className='gradient text-white rounded-lg py-2 font-bold trackingz-wide px-2 text-sm' >
        Sign In
      </button> </Link>
        }

        {toggleDropdown && (
          <div className="dropdown" style={{zIndex:"1"}}>
            <Link
              href='/profile'
              className='dropdown_link'
              onClick={() => setToggleDropdown(false)}
            >
              My Profile
            </Link>
            <Link
              href='/game'
              className='dropdown_link'
              onClick={() => setToggleDropdown(false)}
            >
              Game
            </Link>
            <span
          
              className='dropdown_link'
              onClick={() => {
              signOut();
                setToggleDropdown(false)}}
            >
              Logout
            </span>
          </div>


        )}

      </div>

    </div>
  )
}

export default Navbar