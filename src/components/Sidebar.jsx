'use client';

import { sideBarLinks } from '../constants'
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React from 'react'

const Sidebar = () => {
    const pathName = usePathname();

  return (
    <>
    <div className='sticky left-0 top-0 flex h-screen w-fit flex-col justify-between p-6 pt-28 max-sm:hidden lg:w-[264px]'>
        <div className='flex flex-col gap-6'>
        {sideBarLinks.map((link)=>{
            const isActive = pathName === link.route || pathName.startsWith(link.route);
            return(
                <Link href={link.route}
                key={link.label}
                className={cn('flex items-center p-4 rounded-lg justify-start',{
                    'bg-blue-500' : isActive,
                })}>{link.label}
                </Link>
            )
        })}
        </div>
    </div>
    </>
  )
}

export default Sidebar