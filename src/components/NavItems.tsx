'use client'

import { PRODUCT_CATEGORIES } from "@/config";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import NavItem from "./NavItem";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";


function NavItems() {
    const [activeIndex, setActiveIndex] = useState<null | number>(null)

    const isAnyOpen = activeIndex != null


    const navRef = useRef<HTMLDivElement | null>()

    // @ts-ignore
    useOnClickOutside(navRef, () => setActiveIndex(null))

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e?.key == 'Escape') {
                setActiveIndex(null)
            }
        }
        // @ts-ignore
        document.addEventListener('keydown', handler)

        return () => {
            // @ts-ignore
            document.removeEventListener('keydown', handler)

        }
    }, [])

    return (
        // @ts-ignore
        <div ref={navRef} className="flex gap-4 h-full">
            {
                PRODUCT_CATEGORIES.map((category, i) => {
                    const handleOpen = () => {
                        if (activeIndex == i) setActiveIndex(null)
                        else setActiveIndex(i)
                    }

                    const isOpen = i == activeIndex

                    return (
                        <NavItem
                            category={category}
                            handleOpen={handleOpen}
                            isOpen={isOpen}
                            key={category?.value}
                            isAnyOpen={isAnyOpen}
                        />
                    )
                })
            }
        </div>
    );
}

export default NavItems;