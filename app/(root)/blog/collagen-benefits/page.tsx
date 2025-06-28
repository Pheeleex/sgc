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
      <main className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-8 md:py-12 text-gray-800">
        <header className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4 leading-tight">
            🌟 Top 10 Benefits of Taking Collagen Supplements
          </h1>
          <p className="text-base sm:text-lg mb-4 sm:mb-6 text-gray-600 px-2">
            Your Ultimate Guide to Younger-Looking Skin and Stronger Joints
          </p>
        </header>

        <section className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
          <p className="text-sm sm:text-base leading-relaxed">
            You're scrolling through Instagram and <em>bam</em>—another flawless
            selfie from that friend who looks exactly the same as she did five
            years ago. Her secret? Beyond genetics and good lighting, she might
            be riding the <strong>collagen supplement</strong> wave.
          </p>
          <p className="text-sm sm:text-base leading-relaxed">
            I get it—I used to roll my eyes too. But after diving into research
            and trying it myself, I'm here to tell you: the benefits of collagen
            supplements are actually pretty incredible.
          </p>
        </section>

        <h2 className="text-xl sm:text-2xl font-semibold mt-8 sm:mt-10 mb-3 sm:mb-4">
          🧬 What Are Collagen Supplements?
        </h2>
        <div className="space-y-3 sm:space-y-4 mb-6">
          <p className="text-sm sm:text-base leading-relaxed">
            Collagen is the most abundant protein in your body. It's like
            scaffolding for your skin, bones, joints, and more.
          </p>
          <p className="text-sm sm:text-base leading-relaxed">
            <strong>Collagen peptides</strong> (also called hydrolyzed collagen)
            are broken-down bits of collagen that are easier for your body to
            absorb.
          </p>
        </div>

        <blockquote className="bg-blue-50 border-l-4 border-blue-400 p-3 sm:p-4 my-4 sm:my-6 italic text-sm sm:text-base rounded-r-lg">
          💡 Think of it as your body's "glue"—but in powder form.
        </blockquote>

        <h2 className="text-xl sm:text-2xl font-semibold mt-8 sm:mt-10 mb-4 sm:mb-6">
          🔟 Top 10 Collagen Supplement Benefits for Skin, Joints & More
        </h2>

        <div className="space-y-6 sm:space-y-8">
          {[
            {
              title: "Skin That Glows Like You Slept 8 Hours:",
              description:
                "Improves elasticity, hydration, firmness, and reduces wrinkles.",
              image: "/Images/collagen/collagen-skin-benefit-glowing.jpg",
              detail:
                "Collagen is basically your skin’s scaffolding. Supplementing with collagen peptides has been shown to improve skin elasticity, hydration, and smoothness. Studies show a reduction in fine lines and wrinkles in as little as 4–12 weeks. Bonus: your skin might just start glowing like you’ve actually been getting enough sleep.",
              alt: "Glowing youthful skin from collagen supplements",
            },
            {
              title: "Relief from Joint Pain:",
              detail:
                "Here’s something that might surprise you – **collagen for joints** is backed by solid science. If you’re dealing with creaky knees or achy joints (hello, post-workout soreness), collagen supplements can be a game-changer. The **benefits of collagen for joint pain** include reduced inflammation and improved joint flexibility. It’s like WD-40 for your body, but way more natural.",
              image: "/Images/collagen/collagen-joint-relief.jpg",
              alt: "Joint support and relief with collagen peptides",
            },
            {
              title: "Hair That's Thicker and Stronger:",
              detail:
                "If your brush is collecting more hair than you’d like, collagen might help. It supports the structure of hair follicles and delivers amino acids that are essential for keratin production. Over time, users report thicker, shinier hair with less breakage.",
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
                detail: `As we age, our bones naturally lose density. **Collagen for bone density** helps maintain bone strength and may reduce the risk of fractures. It’s like insurance for your skeleton.
`,
              image: "/images/collagen-bone-density-support.jpg",
              alt: "Bone strength and density improved by collagen supplements",
            },
            {
              title: "Maintain Muscle Mass:",
              description:
                "Especially when paired with resistance training or physical therapy.",
                detail: `Collagen supplements for muscle growth** work by providing the amino acids your muscles need to repair and grow. It’s especially helpful if you’re trying to maintain muscle mass as you age.`,
              image: "/Images/collagen/collagen-muscle-mass-maintain.jpg",
              alt: "Muscle mass maintenance supported by collagen",
            },
            {
              title: "Improved Gut Health:",
              description:
                "Glycine and glutamine in collagen help protect your gut lining.",
                detail: `This one’s fascinating – the amino acids in collagen (particularly glycine and glutamine) may help strengthen your gut lining. A healthy gut means better digestion and potentially fewer tummy troubles.`,
              image: "/Images/collagen/collagen-gut-health-improvement.jpg",
              alt: "Collagen helping gut lining and digestion",
            },
            {
              title: "Anti-Aging Benefits:",
              description:
                "Supports cell regeneration for a firmer, youthful look.",
                detail: `Collagen anti-aging** benefits extend throughout your entire body. We’re talking cellular repair, improved protein synthesis, and overall better body function.`,
              image: "/Images/collagen/collagen-anti-aging-benefits.jpg",
              alt: "Anti-aging skin effects from collagen peptides",
            },
            {
              title: "Better Sleep:",
              description:
                "Glycine in collagen may promote restful, deeper sleep cycles.",
                detail: `Glycine, an amino acid found in collagen, has been shown to improve sleep quality. Who knew your bedtime routine could include a beauty supplement?
`,
              image: "/Images/collagen/collagen-better-sleep-quality.jpg",
              alt: "Improved sleep quality from collagen's glycine",
            },
            {
              title: "Faster Wound Healing:",
              description: "Aids in tissue repair and collagen regeneration.",
              detail: `Collagen plays a crucial role in tissue repair. Taking supplements may help your body heal faster from minor cuts, scrapes, and even exercise-induced micro-tears.
`,
              image: "/images/collagen-faster-wound-healing.jpg",
              alt: "Tissue and skin repair accelerated by collagen intake",
            },
          ].map((benefit, index) => (
            <div
              key={index}
              className="bg-white rounded-lg border border-gray-100 p-3 sm:p-4 shadow-sm"
            >
              <div className="flex items-start gap-3 mb-3">
                <span className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold">
                  {index + 1}
                </span>
                <div className="flex-1">
                  <h3 className="font-semibold text-sm sm:text-base mb-1 sm:mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
              <Image
                src={benefit.image}
                alt={benefit.alt}
                width={800}
                height={400}
                className="rounded-lg shadow-sm w-full h-auto"
                priority={index < 3}
              />
              <p className="text-sm text-gray-700 mt-3 leading-relaxed">
                {benefit.detail}
              </p>
            </div>
          ))}
        </div>

        <section className="mt-8 sm:mt-12 space-y-6 sm:space-y-8">
          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
              ⏳ When Will You See Results?
            </h3>
            <div className="overflow-x-auto -mx-3 sm:mx-0">
              <table className="w-full min-w-[300px] text-xs sm:text-sm border border-gray-200 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 sm:p-3 border-b border-gray-200 text-left font-semibold">
                      Benefit
                    </th>
                    <th className="p-2 sm:p-3 border-b border-gray-200 text-left font-semibold">
                      Timeline
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="p-2 sm:p-3">Skin improvements</td>
                    <td className="p-2 sm:p-3">4–12 weeks</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="p-2 sm:p-3">Joint pain relief</td>
                    <td className="p-2 sm:p-3">3–5 months</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="p-2 sm:p-3">Hair & nail strength</td>
                    <td className="p-2 sm:p-3">6–8 weeks</td>
                  </tr>
                  <tr>
                    <td className="p-2 sm:p-3">Muscle recovery</td>
                    <td className="p-2 sm:p-3">2–4 weeks</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-lg p-4 sm:p-6 border border-pink-100">
            <h3 className="text-lg sm:text-xl font-semibold mb-3 text-pink-800">
              🥇 Best Type of Collagen
            </h3>
            <div className="space-y-2 text-sm sm:text-base">
              <p>
                <strong>Marine collagen:</strong> Best for skin and highly
                absorbable.
              </p>
              <p>
                <strong>Bovine collagen:</strong> More affordable and versatile.
              </p>
              <p className="mt-3 p-3 bg-white rounded-lg border border-pink-200">
                <strong>
                  💡 Always choose hydrolyzed collagen peptides for better
                  absorption.
                </strong>
              </p>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4 sm:p-6 border border-blue-100">
            <h3 className="text-lg sm:text-xl font-semibold mb-3 text-blue-800">
              🧂 Collagen Dosage Guide
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <div className="bg-white p-3 rounded-lg border border-blue-200">
                <div className="font-semibold text-sm text-blue-700">
                  Skin health
                </div>
                <div className="text-lg font-bold text-blue-900">2.5–5g</div>
                <div className="text-xs text-blue-600">daily</div>
              </div>
              <div className="bg-white p-3 rounded-lg border border-blue-200">
                <div className="font-semibold text-sm text-blue-700">
                  Joint support
                </div>
                <div className="text-lg font-bold text-blue-900">8–12g</div>
                <div className="text-xs text-blue-600">daily</div>
              </div>
              <div className="bg-white p-3 rounded-lg border border-blue-200">
                <div className="font-semibold text-sm text-blue-700">
                  Muscle growth
                </div>
                <div className="text-lg font-bold text-blue-900">15g</div>
                <div className="text-xs text-blue-600">daily</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-50 to-pink-50 rounded-lg p-4 sm:p-6 border border-orange-200 text-center">
            <h3 className="text-lg sm:text-xl font-semibold mb-3 text-orange-800">
              🧡 My Favorite Collagen Pick
            </h3>
            <p className="text-sm sm:text-base mb-4 text-gray-700">
              I highly recommend{" "}
              <a
                href="https://nplink.net/wks2fhji"
                className="text-blue-600 underline font-semibold"
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
              className="inline-block bg-gradient-to-r from-pink-500 to-pink-600 text-white px-6 py-3 rounded-full shadow-lg hover:from-pink-600 hover:to-pink-700 transition-all duration-200 font-semibold text-sm sm:text-base transform hover:scale-105"
              target="_blank"
              rel="noopener noreferrer"
            >
              👉 Try Collagen Select Now
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-red-50 rounded-lg p-4 sm:p-5 border border-red-200">
              <h3 className="text-lg font-semibold mb-3 text-red-800">
                ⚠️ Side Effects & Safety
              </h3>
              <p className="text-sm leading-relaxed text-gray-700">
                Most people tolerate collagen well, but minor digestive upset or
                rare allergic reactions may occur. Always consult your doctor if
                you're pregnant, nursing, or taking medication.
              </p>
            </div>

            <div className="bg-green-50 rounded-lg p-4 sm:p-5 border border-green-200">
              <h3 className="text-lg font-semibold mb-3 text-green-800">
                🌱 Vegan Alternatives
              </h3>
              <p className="text-sm leading-relaxed text-gray-700">
                Vegan collagen doesn't contain actual collagen—it helps your
                body produce its own. Look for boosters with vitamin C, silica,
                and amino acids.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 sm:p-6 border border-purple-200">
            <h3 className="text-lg sm:text-xl font-semibold mb-4 text-purple-800">
              🚀 Maximize Your Results
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-white p-3 rounded-lg border border-purple-200 text-center">
                <div className="text-2xl mb-2">🍊</div>
                <div className="text-sm font-semibold text-purple-700 mb-1">
                  Vitamin C
                </div>
                <div className="text-xs text-gray-600">
                  For better collagen synthesis
                </div>
              </div>
              <div className="bg-white p-3 rounded-lg border border-purple-200 text-center">
                <div className="text-2xl mb-2">💧</div>
                <div className="text-sm font-semibold text-purple-700 mb-1">
                  Stay Hydrated
                </div>
                <div className="text-xs text-gray-600">Avoid too much sun</div>
              </div>
              <div className="bg-white p-3 rounded-lg border border-purple-200 text-center">
                <div className="text-2xl mb-2">📅</div>
                <div className="text-sm font-semibold text-purple-700 mb-1">
                  Be Consistent
                </div>
                <div className="text-xs text-gray-600">Daily use is best</div>
              </div>
            </div>
          </div>
        </section>

        <hr className="my-8 sm:my-10 border-gray-200" />

        <div className="text-center bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 sm:p-8 border border-green-200">
          <p className="text-base sm:text-lg font-semibold mb-4 text-green-800">
            Try it for 8–12 weeks and watch your skin, joints, and hair thank
            you.
          </p>
          <a
            href="https://nplink.net/wks2fhji"
            className="inline-block bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-full shadow-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200 font-semibold text-sm sm:text-base transform hover:scale-105"
            target="_blank"
            rel="noopener noreferrer"
          >
            🌟 Get Collagen Select Now
          </a>
        </div>

        <p className="text-xs sm:text-sm text-gray-500 mt-6 sm:mt-8 text-center leading-relaxed">
          *Disclaimer: This post contains affiliate links. Always consult a
          medical professional before starting any new supplement.*
        </p>
      </main>
    </>
  );
}
