import ThemeController from "@/components/ThemeController";

export default function Home() {
  return (
    <main className="max-w-full w-full flex justify-center items-center">
      <article className="max-w-xl min-h-screen flex-col w-full flex justify-center items-center p-6 md:p-4">
        <section className="flex w-full items-center justify-between">
          <h1 className="text-center font-bold text-3xl md:text-5xl tracking-tight">
            Arukaifu
          </h1>
          <div className="">
            <ThemeController w="2" h="2" />
          </div>
        </section>

        <section className="mt-3 md:mt-4 leading-6 text-base">
          <p>
            <b>Arukaifu</b> was built for me to archive something important that
            i frequently forget.
          </p>
        </section>

        <div className="flex w-full mt-4 justify-start items-start">
          <a href="/login">
            <button className="btn">Login</button>
          </a>
        </div>
      </article>
    </main>
  );
}
