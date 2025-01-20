'use client'

import { useRouter } from "next/navigation";

export default function useGoRouter(){
    const router = useRouter()

    function goToRoute(newRoute: string) {
        router.refresh();
        router.push(`/${newRoute}`);
      }
    
    return goToRoute;
    
}