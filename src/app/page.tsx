
export default function Home() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-cover bg-center" 
      style={{ backgroundImage: "url('/home.jpg')" }}>
      
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative text-white text-center p-6 max-w-3xl">
        <h1 className="text-5xl font-bold mb-6">Welcome to the Rick & Morty Universe!</h1>
        <p className="text-lg leading-relaxed">
          Explore the adventures of the genius scientist Rick Sanchez and his kind-hearted but easily influenced grandson Morty. 
          Discover characters, locations, episodes, and more from this thrilling animated series. Get ready for interdimensional travel, 
          mind-bending plots, and cosmic humor!
        </p>
      </div>
    </div>
  );
}

