export default function Footer() {
  return (
    <footer className="w-full p-20 bg-cold-900 mt-10 max-[800px]:p-10">
      <div className="flex items-center justify-between max-[800px]:flex-col max-[800px]:items-start">
        <section className="flex flex-col items-center max-[800px]:items-start ">
          <h1 className="text-2xl">WebSite feito por:</h1>
          <h2 className="text-xl text-cold-300">José Italo</h2>
        </section>
        <section className="max-[800px]:mt-4">
          <h1 className="text-2xl">Contatos:</h1>
          <ul>
            <li className="mt-2">
              <strong className="text-xl">Email</strong>:{" "}
              <a
                href="mailto:jose_italo_pf021@hotmail.com?subject=Vim do seu site de Tasks"
                target="blank"
                className="text-lg text-cold-300 hover:underline"
              >
                jose_italo_pf021@hotmail.com
              </a>
            </li>
            <li className="mt-1">
              <strong className="text-xl">Linkeding</strong>:{" "}
              <a
                href="https://www.linkedin.com/in/jos%C3%A9-italo/"
                target="blank"
                className="text-lg text-cold-300 hover:underline"
              >
                José Italo
              </a>
            </li>
          </ul>
        </section>
      </div>
    </footer>
  );
}
