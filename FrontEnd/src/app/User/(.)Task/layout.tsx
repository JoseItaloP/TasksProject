import Main from "../page";

export default function layoutTask({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="h-full">
      <section className="top-0 z-10 h-screen w-screen absolute flex flex-col items-center justify-center bg-cold-900/30">
        {children}
      </section>
      <Main/>
    </section>
  );
}
