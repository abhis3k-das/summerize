import { getUserSubscriptionPlan } from '@/lib/stripe'
import React from 'react'
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Icons } from './Icons';
import { DropdownMenuContent, DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu';
import Link from 'next/link';
import { Gem } from 'lucide-react';
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components';


interface UserAccountNavProps {
    email : string | undefined,
    name : string,
    imgUrl : string,
}
const UserAccountNav = async({email,name} : UserAccountNavProps) => {
  
  const subscriptionPlan = await getUserSubscriptionPlan();
  return (
    <DropdownMenu>
     <DropdownMenuTrigger
        asChild
        className='overflow-visible'>
        <Button className='rounded-full h-8 w-8 aspect-square bg-slate-400'>
          <Avatar className='relative w-8 h-8'>
              <AvatarFallback>
                <span className='sr-only'>{name}</span>
                <Icons.user className='h-4 w-4 text-zinc-900' />
              </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='bg-white' align='end'>
        <div className='flex items-center justify-start gap-2 p-2'>
            <div className='flex flex-col space-y-0.5 leading-none'>
                {name && <p className='font-medium text-sm text-black'>{name}</p>}
                {email && (
                    <p className='w-[200px] truncate text-sm text-zinc-700'>{email}</p>
                )}
            </div>
        </div>
        <DropdownMenuSeparator/>
        <DropdownMenuItem asChild>
            <Link href='/dashboard'>Dashboard</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
            {subscriptionPlan?.isSubscribed ? (
                <Link href='/billing'>Manage Subscription</Link>
            ) : (
                <Link href='/pricing'>Upgrade<Gem className='text-blue-600 h-4 w-4 ml-1.5'/></Link>
            )}
        </DropdownMenuItem>
        <DropdownMenuSeparator/>
        <DropdownMenuItem asChild className='cursor-pointer'>
            <LogoutLink>Log out</LogoutLink>
        </DropdownMenuItem>
      </DropdownMenuContent>

    </DropdownMenu>
  )
}

export default UserAccountNav
