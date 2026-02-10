import AboutBackground from "@/components/AboutBackground";
import Navbar from "@/components/Navbar";

const aboutSections = [
  {
    title: "Who I Am",
    content: "I am a passionate Full-Stack Developer with a deep interest in creating immersive digital experiences. With a background in both design and engineering, I bridge the gap between aesthetics and functionality.",
    image: "/homePageIMGs/placeholder_image.png"
  },
  {
    title: "My Journey",
    content: "Starting from simple HTML pages, I've evolved into building complex 3D applications and scalable web systems. My journey is defined by constant learning and a drive to solve challenging problems through code.",
    image: "/homePageIMGs/placeholder_image.png"
  },
  {
    title: "Technical Expertise",
    content: "I specialize in React, Next.js, and Three.js for the frontend, while leveraging Node.js and various database technologies for the backend. I love exploring new technologies and pushing the boundaries of what's possible on the web.",
    image: "/homePageIMGs/placeholder_image.png"
  }
];

export default function AboutPage() {
  return (
    <main className="relative min-h-screen text-white overflow-x-hidden">
      <Navbar />
      <AboutBackground />

      {/* Hero Section */}
      <section className="h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-6xl md:text-8xl font-bold mb-4 tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">
          ABOUT ME
        </h1>
        <p className="text-xl md:text-2xl text-slate-400 max-w-2xl font-light">
          Crafting digital worlds with code and imagination.
        </p>
      </section>

      {/* Content Sections */}
      <div className="container mx-auto px-4 pb-24 space-y-32">
        {aboutSections.map((section, index) => (
          <div 
            key={index}
            className={`flex flex-col md:flex-row items-center gap-12 ${
              index % 2 === 1 ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Text Content */}
            <div className="flex-1 space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-indigo-400">
                {section.title}
              </h2>
              <p className="text-lg md:text-xl text-slate-300 leading-relaxed">
                {section.content}
              </p>
            </div>

            {/* Placeholder for Image or extra element */}
            <div className="flex-1 w-full aspect-video bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm flex items-center justify-center relative group overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
               <span className="text-slate-500 font-mono text-sm tracking-widest uppercase">
                 [ Visual Element {index + 1} ]
               </span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer-like section */}
      <section className="py-24 text-center border-t border-white/5 bg-black/20 backdrop-blur-sm">
        <h2 className="text-3xl font-bold mb-8">Let's build something amazing together.</h2>
        <button className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-full transition-all font-semibold">
          Get in Touch
        </button>
      </section>
    </main>
  );
}
