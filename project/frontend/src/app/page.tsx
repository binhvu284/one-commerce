import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl text-center space-y-8">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
          OneCommerce
        </h1>
        <p className="text-xl text-slate-400 font-medium">
          The impeccable platform for premium merchant storefronts.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          <Link 
            href="/admin" 
            className="w-full sm:w-auto px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-slate-200 transition-colors"
          >
            Super Admin
          </Link>
          <Link 
            href="/business" 
            className="w-full sm:w-auto px-8 py-3 bg-transparent border border-slate-700 text-white font-semibold rounded-full hover:bg-slate-800 transition-colors"
          >
            Business Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
