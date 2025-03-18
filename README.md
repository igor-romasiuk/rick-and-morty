# Wubba Lubba Dub Dub! Rick and Morty Explorer

## 🚀 About This Project

Welcome to the interdimensional database of Rick and Morty characters, episodes, and locations! This portal lets you explore the multiverse in style, with all your favorite moments from the hit show.

This Next.js application features a sci-fi themed UI that connects to the official [Rick and Morty API](https://rickandmortyapi.com/) to bring you comprehensive data about the show's universe. Browse characters, search through episodes, explore exotic locations, and maintain your own list of favorites.

## ✨ Features

- **Character Profiles**: Browse detailed information about Rick, Morty, and the whole bizarre cast including status, species, gender, and origin
- **Episode Guide**: Explore all seasons and episodes with air dates, codes, and character appearances
- **Location Explorer**: Visit exotic locations across dimensions and view resident information
- **User Accounts**: Create a profile to save favorite characters, episodes, and locations
- **Advanced Filtering**: Filter content by various attributes like status, gender, dimension, and more
- **Responsive Design**: Looks great on devices across all dimensions with a sci-fi themed UI
- **Dark Mode**: Toggle between light and dark themes for comfortable viewing
- **API Integration**: Real-time data from the official Rick and Morty API
- **Optimized Performance**: Client-side caching for faster browsing experience

## 🛠️ Technology Stack

- **Framework**: Next.js 15 with App Router
- **UI**: 
  - Tailwind CSS for styling
  - Radix UI components for accessible UI elements
  - Framer Motion for smooth animations
- **Authentication**: NextAuth.js with Prisma adapter
- **Database**: Neon
- **Data Source**: Rick and Morty API (RESTful)
- **Development**: TypeScript for type safety

## 🧪 Getting Started

```bash
# Clone the repository
git clone https://github.com/yourusername/rick-and-morty-test.git

# Navigate to the project
cd rick-and-morty-test

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your database and authentication settings

# Run database migrations
npx prisma migrate dev

# Run the development server with Turbopack
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
