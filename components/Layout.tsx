import React, { useState, useEffect, useMemo } from 'react';
import { Menu, X, Search, Bell, User as UserIcon, LogOut } from 'lucide-react';
import { View, User } from '../types';
import { Button } from './UI';

interface LayoutProps {
  children: React.ReactNode;
  currentView: View;
  user: User | null;
  onNavigate: (view: View) => void;
  onLogout: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentView, user, onNavigate, onLogout }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Generate random stars for background
  const stars = useMemo(() => {
    return Array.from({ length: 70 }).map((_, i) => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2,
    }));
  }, []);

  const navLinks = [
    { label: 'Explore', view: View.EXPLORE },
    { label: 'Dashboard', view: View.DASHBOARD },
  ];

  return (
    <div className="min-h-screen font-sans selection:bg-purple-500/30 text-zinc-100 relative">
      {/* Dynamic Background Layer */}
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
        {/* Deep Gradient: Interpreting 'Light Purple' as a glowing violet top to maintain dark theme contrast */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#581c87,#4c1d95,#3b0764,#000000)] opacity-90" />
        
        {/* Glitter/Noise Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
        />

        {/* Twinkling Stars */}
        {stars.map((star, i) => (
          <div
            key={i}
            className="star"
            style={{
              left: star.left,
              top: star.top,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`,
              opacity: Math.random() * 0.5 + 0.3
            }}
          />
        ))}
        
        {/* Glow Orbs */}
        <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px] mix-blend-screen animate-float" />
        <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px] mix-blend-screen animate-float" style={{ animationDelay: '3s' }} />
      </div>

      {/* Navbar */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'bg-black/60 backdrop-blur-lg border-b border-white/5 py-4 shadow-lg' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <div 
            onClick={() => onNavigate(View.LANDING)}
            className="text-2xl font-bold tracking-tighter cursor-pointer flex items-center gap-1 group"
          >
            <div className="flex items-center text-white group-hover:text-purple-300 transition-colors drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
               <span className="inline-block animate-spin-slow text-purple-400 mr-[1px]">C</span>ONNECT
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {user && navLinks.map(link => (
              <button
                key={link.label}
                onClick={() => onNavigate(link.view)}
                className={`text-sm font-medium tracking-wide transition-colors ${
                  currentView === link.view ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]' : 'text-zinc-300 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-6">
            <button className="text-zinc-300 hover:text-white transition-colors">
              <Search size={20} />
            </button>
            {user ? (
              <>
                <button className="text-zinc-300 hover:text-white transition-colors relative">
                  <Bell size={20} />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
                </button>
                <div className="relative group">
                    <button onClick={() => onNavigate(View.PROFILE)} className="flex items-center gap-3 hover:bg-white/10 p-1 pr-3 rounded-full transition-colors border border-transparent hover:border-white/20 backdrop-blur-sm">
                        <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover ring-2 ring-purple-500/50" />
                        <span className="text-sm font-medium text-zinc-200">{user.name.split(' ')[0]}</span>
                    </button>
                </div>
                <button onClick={onLogout} className="text-zinc-400 hover:text-red-400 transition-colors" title="Logout">
                    <LogOut size={18} />
                </button>
              </>
            ) : (
              <Button size="sm" onClick={() => onNavigate(View.AUTH)}>Login</Button>
            )}
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-zinc-100"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl pt-24 px-6 md:hidden animate-in slide-in-from-top-10 duration-300">
          <div className="flex flex-col gap-8">
            {user && navLinks.map(link => (
              <button
                key={link.label}
                onClick={() => {
                  onNavigate(link.view);
                  setIsMobileMenuOpen(false);
                }}
                className="text-2xl font-light text-left text-zinc-300 hover:text-white"
              >
                {link.label}
              </button>
            ))}
            {!user && (
                <button onClick={() => { onNavigate(View.AUTH); setIsMobileMenuOpen(false); }} className="text-2xl font-light text-left text-zinc-300 hover:text-white">
                    Login
                </button>
            )}
            {user && (
                 <button onClick={() => { onNavigate(View.PROFILE); setIsMobileMenuOpen(false); }} className="text-2xl font-light text-left text-zinc-300 hover:text-white">
                    Profile
                </button>
            )}
          </div>
        </div>
      )}

      {/* Content */}
      <main className="pt-24 min-h-screen relative z-10">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-black/40 backdrop-blur-lg py-12 mt-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
                 <div className="text-xl font-bold tracking-tighter mb-4">
                    <div className="flex items-center text-white drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
                        <span className="inline-block animate-spin-slow text-purple-400 mr-[1px]">C</span>ONNECT
                    </div>
                </div>
                <p className="text-zinc-400 text-sm">
                    Find your tribe. Join the movement.
                </p>
            </div>
            <div>
                <h4 className="text-white font-semibold mb-4">Discover</h4>
                <ul className="space-y-2 text-zinc-500 text-sm">
                    <li className="hover:text-purple-400 cursor-pointer">All Clubs</li>
                    <li className="hover:text-purple-400 cursor-pointer">Events</li>
                    <li className="hover:text-purple-400 cursor-pointer">Trending</li>
                </ul>
            </div>
             <div>
                <h4 className="text-white font-semibold mb-4">Company</h4>
                <ul className="space-y-2 text-zinc-500 text-sm">
                    <li className="hover:text-purple-400 cursor-pointer">About</li>
                    <li className="hover:text-purple-400 cursor-pointer">Careers</li>
                    <li className="hover:text-purple-400 cursor-pointer">Privacy</li>
                </ul>
            </div>
             <div>
                <h4 className="text-white font-semibold mb-4">Social</h4>
                <ul className="space-y-2 text-zinc-500 text-sm">
                    <li className="hover:text-purple-400 cursor-pointer">Twitter</li>
                    <li className="hover:text-purple-400 cursor-pointer">Instagram</li>
                    <li className="hover:text-purple-400 cursor-pointer">LinkedIn</li>
                </ul>
            </div>
        </div>
      </footer>
    </div>
  );
};