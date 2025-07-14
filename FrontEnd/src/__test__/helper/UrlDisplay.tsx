'use client'
import {usePathname} from "next/navigation"

const UrlDisplay = () =>{
    const PageUrl = usePathname()
    return <div data-testid="location-display">{PageUrl}</div>
}

export default UrlDisplay