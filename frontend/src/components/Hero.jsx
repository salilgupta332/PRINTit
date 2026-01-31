function Hero() {
  return (
    <section className="relative isolate z-0 flex h-[calc(100vh-64px)] items-center bg-gray-900 px-6 lg:px-8 overflow-hidden">
      {/* Top Gradient */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu blur-3xl sm:-top-80"
      >
        <div
          className="relative left-1/2 aspect-[1155/678] w-[36rem] -translate-x-1/2 rotate-30 bg-gradient-to-tr from-pink-400 to-indigo-500 opacity-30 sm:w-[72rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-7xl">
          Printing made simple
        </h1>

        <p className="mt-8 text-lg font-medium text-gray-400 sm:text-xl">
          Upload assignments, choose print options, and get doorstep delivery —
          fast, affordable, and reliable.
        </p>

        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="/signup"
            className="rounded-md bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-400"
          >
            Get started
          </a>
          <a
            href="/services"
            className="text-sm font-semibold text-white"
          >
            Learn more <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu blur-3xl sm:top-[calc(100%-30rem)]"
      >
        <div
          className="relative left-1/2 aspect-[1155/678] w-[36rem] -translate-x-1/2 bg-gradient-to-tr from-pink-400 to-indigo-500 opacity-30 sm:w-[72rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
    </section>
  );
}

export default Hero;
