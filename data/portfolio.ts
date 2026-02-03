export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  link?: string;
}

export const portfolioData: PortfolioItem[] = [
  {
    id: "1",
    title: "Project One",
    description: "A description of the first project with key features and technologies used.",
    imageUrl: "/placeholder-1.jpg",
    tags: ["React", "TypeScript", "Next.js"],
    link: "https://example.com/project-1",
  },
  {
    id: "2",
    title: "Project Two",
    description: "A description of the second project showcasing creative design and functionality.",
    imageUrl: "/placeholder-2.jpg",
    tags: ["Three.js", "WebGL", "Animation"],
    link: "https://example.com/project-2",
  },
  {
    id: "3",
    title: "Project Three",
    description: "A description of the third project highlighting technical implementation.",
    imageUrl: "/placeholder-3.jpg",
    tags: ["Node.js", "API", "Database"],
    link: "https://example.com/project-3",
  },
  {
    id: "4",
    title: "Project Four",
    description: "A description of the fourth project demonstrating problem-solving skills.",
    imageUrl: "/placeholder-4.jpg",
    tags: ["UI/UX", "Design", "Prototype"],
    link: "https://example.com/project-4",
  },
  {
    id: "5",
    title: "Project Five",
    description: "A description of the fifth project with innovative solutions.",
    imageUrl: "/placeholder-5.jpg",
    tags: ["Mobile", "React Native", "Cross-platform"],
    link: "https://example.com/project-5",
  },
  {
    id: "6",
    title: "Project Six",
    description: "A description of the sixth project featuring modern web technologies.",
    imageUrl: "/placeholder-6.jpg",
    tags: ["AWS", "Cloud", "DevOps"],
    link: "https://example.com/project-6",
  },
];
