"use client"

import { useEffect, useState } from "react";
import { Button } from "./ui/button";

function AddToCartButton() {
    const [isSuccess, setIsSuccess] = useState(false)


    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsSuccess(false)
        }, 2000)
        return () => clearTimeout(timeout)
    }, [isSuccess])


    return (
        <Button onClick={() => setIsSuccess(true)} size={'lg'}
            className="w-full"
        >
            {isSuccess ? "Added" : "Add to Cart"}
        </Button>
    );
}

export default AddToCartButton;