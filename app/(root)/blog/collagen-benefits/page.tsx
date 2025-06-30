// pages/blog/collagen-benefits.tsx
import Head from "next/head";
import Image from "next/image";

export default function CollagenBenefits() {
  return (
    <>
      <Head>
        <title>
          Top 10 Collagen Supplement Benefits for Glowing Skin & Joint Health
        </title>
        <meta
          name="description"
          content="Discover the top 10 collagen supplement benefits for skin, hair, nails, joints, and more. Learn what type of collagen is best and how to take it for maximum results."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 text-gray-800">
        <header className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 lg:mb-8 leading-tight text-gray-900">
            🌟 Top 10 Benefits of Taking Collagen Supplements
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl mb-6 sm:mb-8 text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Your Ultimate Guide to Younger-Looking Skin and Stronger Joints
          </p>
        </header>

        <section className="space-y-6 sm:space-y-8 mb-12 sm:mb-16 lg:mb-20">
          <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
            <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-gray-700">
              Picture this: You’re scrolling through Instagram, and suddenly
              you’re hit with yet another flawless selfie from that friend who
              somehow looks <em>exactly</em> the same as she did five years ago.
              What’s her secret? Well, beyond good genetics and that perfect
              lighting, there’s a good chance she’s discovered the magic of{" "}
              <strong>collagen supplements</strong>.
            </p>
            <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-gray-700">
              I’ll be honest with you – I used to roll my eyes at the whole
              collagen craze. Another wellness trend, right? But after diving
              deep into the research (and yes, trying it myself), I’m here to
              tell you that the <strong>collagen supplements benefits</strong>{" "}
              are actually pretty incredible. And no, this isn’t just another
              “drink this powder and look like a supermodel” story.
            </p>
          </div>
        </section>

        <section className="mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-6 sm:mb-8 lg:mb-10 text-gray-900">
            🧬 What Are Collagen Supplements?
          </h2>
          <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
            <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-gray-700">
              Before we jump into the good stuff, let me break it down for you.{" "}
              <strong>Collagen</strong> is basically the scaffolding that holds
              your body together – it’s the most abundant protein in your body,
              making up everything from your skin to your bones. Think of it as
              your body’s natural glue.
            </p>
            <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-gray-700">
              <strong>Hydrolyzed collagen</strong> (also called{" "}
              <strong>collagen peptides</strong>) is what you’ll find in most
              supplements. It’s collagen that’s been broken down into smaller,
              more easily absorbed pieces. Smart, right?
            </p>
          </div>

          <blockquote className="bg-blue-50 border-l-4 border-blue-400 p-6 sm:p-8 my-8 sm:my-10 lg:my-12 italic text-base sm:text-lg lg:text-xl rounded-r-lg max-w-4xl mx-auto">
            💡 Think of it as your body's "glue"—but in powder form.
          </blockquote>
        </section>

        <section className="mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-8 sm:mb-12 lg:mb-16 text-center text-gray-900">
            🔟 Top 10 Collagen Supplement Benefits for Skin, Joints & More
          </h2>

          <div className="space-y-8 sm:space-y-12 lg:space-y-16">
            {[
              {
                title: "Skin That Glows Like You Slept 8 Hours:",
                description:
                  "Improves elasticity, hydration, firmness, and reduces wrinkles.",
                image: "/Images/collagen/collagen-skin-benefit-glowing.jpg",
                detail:
                  "Collagen is basically your skin's scaffolding. Supplementing with collagen peptides has been shown to improve skin elasticity, hydration, and smoothness. Studies show a reduction in fine lines and wrinkles in as little as 4–12 weeks. Bonus: your skin might just start glowing like you've actually been getting enough sleep.",
                alt: "Glowing youthful skin from collagen supplements",
              },
              {
                title: "Relief from Joint Pain:",
                detail:
                  "Here's something that might surprise you – **collagen for joints** is backed by solid science. If you're dealing with creaky knees or achy joints (hello, post-workout soreness), collagen supplements can be a game-changer. The **benefits of collagen for joint pain** include reduced inflammation and improved joint flexibility. It's like WD-40 for your body, but way more natural.",
                image: "/Images/collagen/collagen-joint-relief.jpg",
                alt: "Joint support and relief with collagen peptides",
              },
              {
                title: "Hair That's Thicker and Stronger:",
                detail:
                  "If your brush is collecting more hair than you'd like, collagen might help. It supports the structure of hair follicles and delivers amino acids that are essential for keratin production. Over time, users report thicker, shinier hair with less breakage.",
                image: "/Images/collagen/collagen-hair-thicker-stronger.jpg",
                alt: "Thicker and healthier hair from collagen use",
              },
              {
                title: "Nails That Don't Break:",
                description: "Supports nail growth and reduces brittleness.",
                detail:
                  "Say goodbye to brittle, splitting nails. A study found that daily collagen supplementation led to a 12% increase in nail growth rate and a 42% decrease in broken nails. It helps strengthen the nail bed and encourages healthier regrowth.",
                image: "/Images/collagen/collagen-nail-growth-strong.jpg",
                alt: "Stronger and faster-growing nails with collagen",
              },
              {
                title: "Bone Density Support:",
                description:
                  "Helps maintain strong bones, especially as you age.",
                detail: `As we age, our bones naturally lose density. **Collagen for bone density** helps maintain bone strength and may reduce the risk of fractures. It's like insurance for your skeleton.`,
                image: "/Images/collagen/collagen-bone-density-support.jpg",
                alt: "Bone strength and density improved by collagen supplements",
              },
              {
                title: "Maintain Muscle Mass:",
                description:
                  "Especially when paired with resistance training or physical therapy.",
                detail: `Collagen supplements for muscle growth** work by providing the amino acids your muscles need to repair and grow. It's especially helpful if you're trying to maintain muscle mass as you age.`,
                image: "/Images/collagen/collagen-muscle-mass-maintain.jpg",
                alt: "Muscle mass maintenance supported by collagen",
              },
              {
                title: "Improved Gut Health:",
                description:
                  "Glycine and glutamine in collagen help protect your gut lining.",
                detail: `This one's fascinating – the amino acids in collagen (particularly glycine and glutamine) may help strengthen your gut lining. A healthy gut means better digestion and potentially fewer tummy troubles.`,
                image: "/Images/collagen/collagen-gut-health-improvement.jpg",
                alt: "Collagen helping gut lining and digestion",
              },
              {
                title: "Anti-Aging Benefits:",
                description:
                  "Supports cell regeneration for a firmer, youthful look.",
                detail: `Collagen anti-aging** benefits extend throughout your entire body. We're talking cellular repair, improved protein synthesis, and overall better body function.`,
                image: "/Images/collagen/collagen-anti-aging-benefits.jpg",
                alt: "Anti-aging skin effects from collagen peptides",
              },
              {
                title: "Better Sleep:",
                description:
                  "Glycine in collagen may promote restful, deeper sleep cycles.",
                detail: `Glycine, an amino acid found in collagen, has been shown to improve sleep quality. Who knew your bedtime routine could include a beauty supplement?`,
                image: "/Images/collagen/collagen-better-sleep-quality.jpg",
                alt: "Improved sleep quality from collagen's glycine",
              },
              {
                title: "Faster Wound Healing:",
                description: "Aids in tissue repair and collagen regeneration.",
                detail: `Collagen plays a crucial role in tissue repair. Taking supplements may help your body heal faster from minor cuts, scrapes, and even exercise-induced micro-tears.`,
                image: "/Images/collagen/collagen-faster-wound-healing.jpg",
                alt: "Tissue and skin repair accelerated by collagen intake",
              },
            ].map((benefit, index) => (
              <article
                key={index}
                className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 lg:p-10 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex items-start gap-4 sm:gap-6 mb-6 sm:mb-8">
                  <span className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-full flex items-center justify-center text-lg sm:text-xl lg:text-2xl font-bold shadow-lg">
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <h3 className="font-bold text-xl sm:text-2xl lg:text-3xl mb-3 sm:mb-4 text-gray-900 leading-tight">
                      {benefit.title}
                    </h3>
                    {benefit.description && (
                      <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                        {benefit.description}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mb-6 sm:mb-8">
                  <Image
                    src={benefit.image}
                    alt={benefit.alt}
                    width={800}
                    height={400}
                    className="rounded-lg shadow-md w-full h-auto"
                    priority={index < 3}
                  />
                </div>
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                  {benefit.detail}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-12 sm:space-y-16 lg:space-y-20">
          <div className="bg-white rounded-xl p-6 sm:p-8 lg:p-10 border border-gray-200 shadow-sm">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 lg:mb-10 text-gray-900">
              ⏳ When Will You See Results?
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[400px] text-sm sm:text-base lg:text-lg border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
                    <th className="p-4 sm:p-6 border-b border-gray-200 text-left font-bold text-gray-900">
                      Benefit
                    </th>
                    <th className="p-4 sm:p-6 border-b border-gray-200 text-left font-bold text-gray-900">
                      Timeline
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="p-4 sm:p-6 text-gray-700">
                      Skin improvements
                    </td>
                    <td className="p-4 sm:p-6 font-semibold text-blue-600">
                      4–12 weeks
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="p-4 sm:p-6 text-gray-700">
                      Joint pain relief
                    </td>
                    <td className="p-4 sm:p-6 font-semibold text-blue-600">
                      3–5 months
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="p-4 sm:p-6 text-gray-700">
                      Hair & nail strength
                    </td>
                    <td className="p-4 sm:p-6 font-semibold text-blue-600">
                      6–8 weeks
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 sm:p-6 text-gray-700">
                      Muscle recovery
                    </td>
                    <td className="p-4 sm:p-6 font-semibold text-blue-600">
                      2–4 weeks
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 rounded-xl p-6 sm:p-8 lg:p-10 border border-pink-200 shadow-lg">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 text-pink-800">
              🥇 Best Type of Collagen
            </h3>
            <div className="space-y-4 sm:space-y-6 text-base sm:text-lg lg:text-xl">
              <p className="text-gray-700 leading-relaxed">
                <strong className="text-pink-700">Marine collagen:</strong> Best
                for skin and highly absorbable.
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong className="text-pink-700">Bovine collagen:</strong> More
                affordable and versatile.
              </p>
              <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-white rounded-lg border border-pink-200 shadow-sm">
                <p className="font-bold text-pink-800 text-lg sm:text-xl">
                  💡 Always choose hydrolyzed collagen peptides for better
                  absorption.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-6 sm:p-8 lg:p-10 border border-blue-200 shadow-lg">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 lg:mb-10 text-blue-800">
              🧂 Collagen Dosage Guide
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              <div className="bg-white p-6 sm:p-8 rounded-xl border border-blue-200 shadow-md text-center">
                <div className="font-bold text-lg sm:text-xl text-blue-700 mb-2">
                  Skin health
                </div>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-blue-900 mb-2">
                  2.5–5g
                </div>
                <div className="text-base sm:text-lg text-blue-600">daily</div>
              </div>
              <div className="bg-white p-6 sm:p-8 rounded-xl border border-blue-200 shadow-md text-center">
                <div className="font-bold text-lg sm:text-xl text-blue-700 mb-2">
                  Joint support
                </div>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-blue-900 mb-2">
                  8–12g
                </div>
                <div className="text-base sm:text-lg text-blue-600">daily</div>
              </div>
              <div className="bg-white p-6 sm:p-8 rounded-xl border border-blue-200 shadow-md text-center sm:col-span-2 lg:col-span-1">
                <div className="font-bold text-lg sm:text-xl text-blue-700 mb-2">
                  Muscle growth
                </div>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-blue-900 mb-2">
                  15g
                </div>
                <div className="text-base sm:text-lg text-blue-600">daily</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-50 via-pink-50 to-rose-50 rounded-xl p-8 sm:p-10 lg:p-12 border border-orange-200 text-center shadow-lg">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 text-orange-800">
              🧡 My Favorite Collagen Pick
            </h3>
            <p className="text-lg sm:text-xl lg:text-2xl mb-8 sm:mb-10 text-gray-700 max-w-3xl mx-auto leading-relaxed">
              I highly recommend{" "}
              <a
                href="https://nplink.net/wks2fhji"
                className="text-blue-600 underline font-bold hover:text-blue-800 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Collagen Select
              </a>
              — it's clinically tested and includes Verisol®, biotin, vitamin
              C, and more.
            </p>
            <a
              href="https://nplink.net/wks2fhji"
              className="inline-block bg-gradient-to-r from-pink-500 to-pink-600 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-full shadow-xl hover:from-pink-600 hover:to-pink-700 transition-all duration-300 font-bold text-lg sm:text-xl transform hover:scale-105 hover:shadow-2xl"
              target="_blank"
              rel="noopener noreferrer"
            >
              👉 Try Collagen Select Now
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
            <div className="bg-red-50 rounded-xl p-6 sm:p-8 lg:p-10 border border-red-200 shadow-lg">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-red-800">
                ⚠️ Side Effects & Safety
              </h3>
              <p className="text-base sm:text-lg leading-relaxed text-gray-700">
                Most people tolerate collagen well, but minor digestive upset or
                rare allergic reactions may occur. Always consult your doctor if
                you're pregnant, nursing, or taking medication.
              </p>
            </div>

            <div className="bg-green-50 rounded-xl p-6 sm:p-8 lg:p-10 border border-green-200 shadow-lg">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-green-800">
                🌱 Vegan Alternatives
              </h3>
              <p className="text-base sm:text-lg leading-relaxed text-gray-700">
                Vegan collagen doesn't contain actual collagen—it helps your
                body produce its own. Look for boosters with vitamin C, silica,
                and amino acids.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 via-blue-50 to-indigo-50 rounded-xl p-6 sm:p-8 lg:p-10 border border-purple-200 shadow-lg">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 sm:mb-10 lg:mb-12 text-purple-800 text-center">
              🚀 Maximize Your Results
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              <div className="bg-white p-6 sm:p-8 rounded-xl border border-purple-200 text-center shadow-md hover:shadow-lg transition-shadow">
                <div className="text-4xl sm:text-5xl mb-4">🍊</div>
                <div className="text-lg sm:text-xl font-bold text-purple-700 mb-2">
                  Vitamin C
                </div>
                <div className="text-sm sm:text-base text-gray-600">
                  For better collagen synthesis
                </div>
              </div>
              <div className="bg-white p-6 sm:p-8 rounded-xl border border-purple-200 text-center shadow-md hover:shadow-lg transition-shadow">
                <div className="text-4xl sm:text-5xl mb-4">💧</div>
                <div className="text-lg sm:text-xl font-bold text-purple-700 mb-2">
                  Stay Hydrated
                </div>
                <div className="text-sm sm:text-base text-gray-600">
                  Avoid too much sun
                </div>
              </div>
              <div className="bg-white p-6 sm:p-8 rounded-xl border border-purple-200 text-center shadow-md hover:shadow-lg transition-shadow sm:col-span-2 lg:col-span-1">
                <div className="text-4xl sm:text-5xl mb-4">📅</div>
                <div className="text-lg sm:text-xl font-bold text-purple-700 mb-2">
                  Be Consistent
                </div>
                <div className="text-sm sm:text-base text-gray-600">
                  Daily use is best
                </div>
              </div>
            </div>
          </div>
        </section>

        <hr className="my-12 sm:my-16 lg:my-20 border-gray-300" />

        <div className="text-center bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50 rounded-xl p-8 sm:p-10 lg:p-12 border border-green-200 shadow-xl">
          <p className="text-xl sm:text-2xl lg:text-3xl font-bold mb-6 sm:mb-8 lg:mb-10 text-green-800 leading-tight">
            Try it for 8–12 weeks and watch your skin, joints, and hair thank
            you.
          </p>
          <a
            href="https://nplink.net/wks2fhji"
            className="inline-block bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-full shadow-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 font-bold text-lg sm:text-xl transform hover:scale-105 hover:shadow-2xl"
            target="_blank"
            rel="noopener noreferrer"
          >
            🌟 Get Collagen Select Now
          </a>
        </div>

        <p className="text-sm sm:text-base text-gray-500 mt-8 sm:mt-10 lg:mt-12 text-center leading-relaxed max-w-3xl mx-auto">
          *Disclaimer: This post contains affiliate links. Always consult a
          medical professional before starting any new supplement.*
        </p>
      </main>
    </>
  );
}
