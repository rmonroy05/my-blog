import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { NavLinks } from '@/constants';
import AuthProviders from './AuthProviders';
import {getCurrentUser} from "@/lib/session";

const Navbar = async () => {

    const session = await getCurrentUser();

    return (
        <nav className='flexBetween navbar'>
            <div className="flex-1 flexStart gap-10">
                <Link href="/">
                    <Image src="/logo.gif" alt="logo" width={115} height={43} className='rounded'/>
                </Link>
                <ul className='xl:flex hidden text-small gap-7'>
                    {NavLinks.map((links) => (
                        <Link href={links.href} key={links.key}>
                            {links.text}
                        </Link>
                    ))}
                </ul>
            </div>

            <div className="flexCenter gap-4">
                {session?.user ? (
                    <>
                        {session?.user?.image && (
                            <Image src={session.user.image} alt={session.user.name} width={40} height={40} className="rounded-full"/>
                        )}

                        <Link  href="/create-project">
                            Share a post
                        </Link>
                    </>
                ) : (
                    <AuthProviders/>
                )}
            </div>
        </nav>
    )
}

export default Navbar;