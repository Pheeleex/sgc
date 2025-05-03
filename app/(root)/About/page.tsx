import Image from 'next/image';

const page = () => {
  return (
    <section className="bg-pink-50 py-20 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Image */}
        <div className="relative w-full h-80 md:h-[500px] rounded-3xl overflow-hidden shadow-lg">
          <Image
            src="/Images/pinteresty10.jpg" // Add your image to the /public/images folder
            alt="Soft Girl Aesthetic"
            fill
            className="object-cover"
          />
        </div>

        {/* Text Content */}
        <div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Welcome to the Soft Girl Circle</h2>
          <p className="text-gray-700 text-lg mb-4">
            This space is your gentle reminder that it’s okay to slow down, care for yourself, and fully embrace your
            soft side—even when the world feels loud and overwhelming.
          </p>
          <p className="text-gray-700 text-lg mb-4">
            Here, I share the little things that make me feel good: skincare rituals, haircare routines, moments of
            stillness, and soft everyday joys.
          </p>
          <p className="text-gray-700 text-lg mb-6">
            It’s not about perfection—it’s about feeling beautiful in your own way. Real, pretty, and tender. You're
            always welcome here. 💗
          </p>
        </div>
      </div>
    </section>
  );
};

export default page;
