"use client"

import { trpc } from "@/trpc/client";
import { Loader2, XCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "./ui/button";


interface Props {
    token: string
}

function VerifyEmail({ token }: Props) {

    const { data, isLoading, isError } = trpc.auth.verifyEmail.useQuery({
        token
    })
    if (isError) {
        return <div className="flex flex-col items-center justify-center h-96 gap-2 w-96 mx-auto">
            <XCircle className="h-8 w-8 text-red-600" />
            <h3 className="font-semibold text-xl">
                There was a problem
            </h3>
            <p className="text-muted-foreground text-sm">
                This token is not valid or mighth be expired. Please try again!
            </p>
        </div>
    }
    if (data?.success) {
        return <div className="h-full flex flex-col items-center justify-center">
            <div className="relative mb-4 w-96 h-96 text-muted-foreground">
                <Image
                    src='/hippo-email-sent.png'
                    fill
                    alt='Email Sent!'
                />
            </div>
            <h3 className="font-semibold text-2xl">
                You&apos;re all set!
            </h3>
            <p className="text-muted-foreground text-center mt-1">Thank you for verifying your email.</p>
            <Link href={'/sign-in'}
                className={buttonVariants({
                    className: 'mt-4',
                })}
            >
                Sign In
            </Link>
        </div>
    }
    if (isLoading) {
        return <div className="flex flex-col items-center justify-center h-96 gap-2 w-96 mx-auto">
            <Loader2 className=" animate-spin  h-8 w-8 text-yellow-400" />
            <h3 className="font-semibold text-xl">
                Verifying...
            </h3>
            <p className="text-muted-foreground text-sm">
                This won&apos;t take long.
            </p>
        </div>
    }
}

export default VerifyEmail;