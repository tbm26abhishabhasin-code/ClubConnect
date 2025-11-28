import React, { useState, useEffect } from 'react';
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

  const navLinks = [
    { label: 'Explore', view: View.EXPLORE },
    { label: 'Dashboard', view: View.DASHBOARD },
  ];

  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans selection:bg-purple-500/30">
      {/* Navbar */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'bg-black/80 backdrop-blur-lg border-b border-white/5 py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <div 
            onClick={() => onNavigate(View.LANDING)}
            className="text-2xl font-bold tracking-tighter cursor-pointer flex items-center gap-1 group"
          >
            CLUB<span className="text-purple-500 group-hover:text-purple-400 transition-colors">CONNECT</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {user && navLinks.map(link => (
              <button
                key={link.label}
                onClick={() => onNavigate(link.view)}
                className={`text-sm font-medium tracking-wide transition-colors ${
                  currentView === link.view ? 'text-white' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-6">
            <button className="text-zinc-400 hover:text-white transition-colors">
              <Search size={20} />
            </button>
            {user ? (
              <>
                <button className="text-zinc-400 hover:text-white transition-colors relative">
                  <Bell size={20} />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                </button>
                <div className="relative group">
                    <button onClick={() => onNavigate(View.PROFILE)} className="flex items-center gap-3 hover:bg-white/5 p-1 pr-3 rounded-full transition-colors border border-transparent hover:border-white/10">
                        <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
                        <span className="text-sm font-medium text-zinc-300">{user.name.split(' ')[0]}</span>
                    </button>
                </div>
                <button onClick={onLogout} className="text-zinc-500 hover:text-red-400 transition-colors" title="Logout">
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
        <div className="fixed inset-0 z-40 bg-black pt-24 px-6 md:hidden animate-in slide-in-from-top-10 duration-300">
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
      <main className="pt-24 min-h-screen">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-black py-12 mt-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
                 <div className="text-xl font-bold tracking-tighter mb-4">
                    CLUB<span className="text-purple-500">CONNECT</span>
                </div>
                <p className="text-zinc-500 text-sm">
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
