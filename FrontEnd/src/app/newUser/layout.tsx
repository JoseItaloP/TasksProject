export default function LayoutNewUser({
    children,
}: Readonly<{children: React.ReactNode}>){
    return(

        <main className="-my-10 h-full w-auto flex flex-col items-center">
            {children}
        </main>

    )
}