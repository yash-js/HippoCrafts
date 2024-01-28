"use client"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "./ui/button";
import { User } from "@/payload-types";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";


function UserAccountNav({ user }: { user: User }) {
    const { signOut } = useAuth()
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="overflow-visible">
                <Button
                    className="relative"
                    size={'sm'}
                    variant={'ghost'}
                >
                    My Account
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white w-60"
                align="end">
                <div className="felx items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-0.5 leading-none">
                        <p className="font-medium text-sm text-black">
                            {user.email}
                        </p>
                    </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href={'/sell'}> Seller Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={signOut}
                    className="cursor-pointer" >
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default UserAccountNav;