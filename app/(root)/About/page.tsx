import Image from "next/image";

const Page = () => {
  return (
    <main className="w-full">
      {/* HERO */}
      <header className="relative h-[500px] w-full">
        <Image
          src="/Images/pinteresty10.jpg"
          alt="Soft Girl Aesthetic"
          fill
          priority
          sizes="100%"
          className="object-cover"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />

        <div className="relative z-10 flex h-full items-center justify-center px-6">
          <div className="max-w-3xl text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg">
              Welcome to the Soft Girl Circle
            </h1>

            <p className="text-base md:text-2xl text-white leading-relaxed drop-shadow-md">
              Your gentle reminder to slow down, care for yourself, and fully
              embrace your soft side, even when the world feels loud and
              overwhelming.
            </p>
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <section className="bg-pink-50 py-24 px-6">
        <div className="max-w-6xl mx-auto space-y-24">
          {/* ABOUT */}
          <div className="bg-white rounded-3xl p-10 md:p-14 border border-pink-100">
            <h3 className="text-3xl font-semibold text-pink-600 mb-6">
              About Soft Girl Circle
            </h3>

            <div className="space-y-4">
              <p className="text-gray-700 text-lg leading-loose">
                Soft Girl Circle is a faith-led brand and digital sanctuary that
                helps women cultivate wholeness in body, soul, and spirit, so
                they can glow with God-given radiance. We believe that where
                softness meets discipline and structure, and where faith becomes
                an anchor, true self-care becomes a lifestyle.
              </p>

              <p className="text-gray-700 text-lg leading-loose">
                In a world that feels loud and overwhelming, we guide women into
                a slower, gentler, more intentional way of living, rooted in
                intentional habits, faith-led guidance, and daily practices that
                honor the vessel God designed.
              </p>
            </div>
          </div>

          {/* MISSION & VISION */}
          <div className="grid md:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="rounded-3xl bg-gradient-to-br from-pink-100 to-pink-200 p-10 md:p-14 text-center">
              <h3 className="text-3xl font-semibold text-pink-700 mb-6">
                Mission
              </h3>
              <p className="text-gray-800 text-lg leading-loose">
                To help women slow down, feel beautiful, and glow from within
                through simple, structured self-care guided by faith.
              </p>
            </div>

            {/* Vision */}
            <div className="rounded-3xl bg-gradient-to-br from-pink-50 to-pink-100 p-10 md:p-14 text-center">
              <h3 className="text-3xl font-semibold text-pink-600 mb-6">
                Vision
              </h3>
              <p className="text-gray-800 text-lg leading-loose">
                A world where women feel confident, cared for, and connected to
                God through how they care for themselves daily.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Page;
