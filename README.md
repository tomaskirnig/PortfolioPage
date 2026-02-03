# Portfolio App - 3D Interactive Portfolio

A modern portfolio application built with Next.js, featuring an immersive 3D landing page and a clean grid view for showcasing projects.

## Features

- **3D Landing Page**: Interactive 3D background using React Three Fiber and Drei
- **Grid View**: Clean, responsive grid layout for portfolio items
- **View Switching**: Seamless navigation between 3D and grid views
- **TypeScript**: Fully typed codebase for better developer experience
- **Animations**: Smooth transitions powered by Framer Motion
- **Responsive Design**: Optimized for all screen sizes using Tailwind CSS

## Technologies

- **Framework**: Next.js 16 (React 19) with App Router
- **3D Graphics**: React Three Fiber + Drei
- **Animation**: Framer Motion
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript
- **Data**: Local TypeScript file (easily extendable to API/CMS)

## Getting Started

### Prerequisites

- Node.js 18+ installed on your system
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/tomaskirnig/PortfolioPage.git
cd PortfolioPage
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
/app
  /grid
    page.tsx          # Grid view page
  layout.tsx          # Root layout
  page.tsx            # Landing page (3D view)
  globals.css         # Global styles
/components
  Scene3D.tsx         # 3D background component
  PortfolioCard.tsx   # Portfolio card component
  ViewToggle.tsx      # View switcher component
/data
  portfolio.ts        # Portfolio data (TypeScript)
```

## Customization

### Adding Portfolio Items

Edit `data/portfolio.ts` to add your own projects:

```typescript
export const portfolioData: PortfolioItem[] = [
  {
    id: "1",
    title: "Your Project",
    description: "Project description",
    imageUrl: "/your-image.jpg",
    tags: ["React", "TypeScript"],
    link: "https://yourproject.com",
  },
  // Add more projects...
];
```

### Customizing the 3D Scene

Modify `components/Scene3D.tsx` to change the 3D background:
- Adjust sphere properties (size, distortion, colors)
- Add more 3D objects
- Import custom 3D models

### Styling

- Global styles: `app/globals.css`
- Tailwind config: `tailwind.config.ts`
- Component-level styling using Tailwind utility classes

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## License

ISC

## Author

Tomas Kirnig