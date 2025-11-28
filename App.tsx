import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { MOCK_CLUBS, MOCK_EVENTS, MOCK_USER, MOCK_POSTS } from './constants';
import { View, User, Club, Event, Post, CATEGORIES } from './types';
import { Button, Card, Input, TextArea, Badge } from './components/UI';
import { Calendar, MapPin, Users, Heart, MessageSquare, Share2, Plus, Sparkles, ArrowRight, ChevronRight, Hash, Search } from 'lucide-react';
import { generateEventDescription, generateClubMission } from './services/geminiService';

// --- Sub-Components for Views ---

const ClubCard: React.FC<{ club: Club; onClick: () => void }> = ({ club, onClick }) => (
  <Card onClick={onClick} className="h-full cursor-pointer flex flex-col hover:scale-[1.02]">
    <div className="h-48 mb-4 overflow-hidden -mx-6 -mt-6">
      <img src={club.image} alt={club.name} className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
    </div>
    <div className="flex justify-between items-start mb-2">
      <Badge>{club.category}</Badge>
      <div className="flex items-center text-zinc-400 text-xs">
        <Users size={14} className="mr-1" />
        {club.memberCount.toLocaleString()}
      </div>
    </div>
    <h3 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors">{club.name}</h3>
    <p className="text-zinc-400 text-sm line-clamp-2 mb-4 flex-grow">{club.description}</p>
    <div className="flex gap-2 flex-wrap">
      {club.tags.slice(0, 2).map(tag => (
        <span key={tag} className="text-xs text-zinc-600">#{tag}</span>
      ))}
    </div>
  </Card>
);

const LandingView: React.FC<{ onExplore: () => void; onLogin: () => void }> = ({ onExplore, onLogin }) => {
    // Parallax logic
    const [offset, setOffset] = useState(0);
    useEffect(() => {
        const handleScroll = () => setOffset(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="relative">
            {/* Hero */}
            <section className="relative min-h-[90vh] flex flex-col justify-center items-center text-center px-6 overflow-hidden">
                <div 
                    className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black"
                    style={{ transform: `translateY(${offset * 0.5}px)` }}
                />
                <div className="z-10 max-w-4xl space-y-8 animate-in fade-in zoom-in duration-1000">
                    <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9]">
                        FIND YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 text-glow">TRIBE.</span><br/>
                        JOIN THE <span className="text-white">CLUB.</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto font-light">
                        Discover interest-based communities, connect with like-minded souls, and attend powerful real-world experiences.
                    </p>
                    <div className="flex flex-col md:flex-row gap-4 justify-center pt-8">
                        <Button size="lg" onClick={onLogin}>Start Your Journey</Button>
                        <Button size="lg" variant="outline" onClick={onExplore}>Explore Clubs</Button>
                    </div>
                </div>
                
                {/* Abstract Floating Elements */}
                <div className="absolute top-1/4 left-10 w-24 h-24 bg-purple-500/10 rounded-full blur-3xl animate-float" />
                <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
            </section>

            {/* Feature Strip */}
            <section className="py-20 bg-zinc-950 border-y border-white/5">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
                    {[
                        { title: "Curated Communities", desc: "Hand-picked clubs for high-quality interactions." },
                        { title: "Exclusive Events", desc: "Access to members-only meetups and workshops." },
                        { title: "Real Connections", desc: "Move beyond the screen. Meet people IRL." }
                    ].map((feature, i) => (
                        <div key={i} className="text-center space-y-4">
                            <h3 className="text-2xl font-bold">{feature.title}</h3>
                            <p className="text-zinc-500">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

             {/* Featured Clubs */}
             <section className="py-24 max-w-7xl mx-auto px-6">
                <div className="flex justify-between items-end mb-12">
                     <div>
                        <h2 className="text-4xl font-bold mb-2">Featured Clubs</h2>
                        <p className="text-zinc-500">Trending communities you shouldn't miss</p>
                     </div>
                     <Button variant="ghost" onClick={onExplore} className="group">View All <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} /></Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {MOCK_CLUBS.slice(0, 4).map(club => (
                        <ClubCard key={club.id} club={club} onClick={onExplore} />
                    ))}
                </div>
             </section>
        </div>
    );
}

const AuthView: React.FC<{ onLogin: () => void }> = ({ onLogin }) => (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="w-full max-w-md space-y-8">
            <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold">Welcome Back</h2>
                <p className="text-zinc-500">Enter your credentials to access the club.</p>
            </div>
            <div className="space-y-4">
                <Input type="email" placeholder="Email Address" defaultValue="alex@example.com" />
                <Input type="password" placeholder="Password" defaultValue="password123" />
                <Button className="w-full" onClick={onLogin}>Sign In</Button>
            </div>
            <div className="text-center">
                <button className="text-sm text-zinc-500 hover:text-white transition-colors">Forgot Password?</button>
            </div>
        </div>
    </div>
);

const ExploreView: React.FC<{ onClubClick: (id: string) => void }> = ({ onClubClick }) => {
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [search, setSearch] = useState('');

    const filteredClubs = MOCK_CLUBS.filter(club => {
        const matchesCategory = selectedCategory === 'All' || club.category === selectedCategory;
        const matchesSearch = club.name.toLowerCase().includes(search.toLowerCase()) || club.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/10 pb-8">
                <div>
                    <h1 className="text-4xl font-bold mb-4">Explore Clubs</h1>
                    <div className="flex flex-wrap gap-2">
                         <button 
                            onClick={() => setSelectedCategory('All')}
                            className={`px-4 py-2 text-sm rounded-full transition-all ${selectedCategory === 'All' ? 'bg-white text-black' : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800'}`}
                        >
                            All
                        </button>
                        {CATEGORIES.slice(0, 8).map(cat => (
                            <button 
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 text-sm rounded-full transition-all ${selectedCategory === cat ? 'bg-white text-black' : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="w-full md:w-auto">
                    <div className="relative">
                        <Search className="absolute left-3 top-3 text-zinc-500" size={20} />
                        <Input 
                            placeholder="Search clubs..." 
                            className="pl-10 w-full md:w-64"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-in fade-in duration-700">
                {filteredClubs.map(club => (
                    <ClubCard key={club.id} club={club} onClick={() => onClubClick(club.id)} />
                ))}
            </div>
            {filteredClubs.length === 0 && (
                <div className="text-center py-20 text-zinc-500">
                    No clubs found matching your criteria.
                </div>
            )}
        </div>
    );
};

const ClubDetailView: React.FC<{ clubId: string; user: User | null; onBack: () => void }> = ({ clubId, user, onBack }) => {
    const club = MOCK_CLUBS.find(c => c.id === clubId);
    const [activeTab, setActiveTab] = useState<'feed' | 'events' | 'members'>('events');
    const [isJoined, setIsJoined] = useState(user?.joinedClubs.includes(clubId));

    if (!club) return <div>Club not found</div>;

    const handleJoin = () => {
        if (!user) return alert("Please login to join");
        setIsJoined(!isJoined);
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Banner */}
            <div className="relative h-80 w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
                <img src={club.coverImage} alt={club.name} className="w-full h-full object-cover" />
                <div className="absolute bottom-0 left-0 p-8 z-20 max-w-7xl mx-auto w-full">
                    <button onClick={onBack} className="text-zinc-400 hover:text-white mb-4 flex items-center gap-2"><ArrowRight className="rotate-180" size={16} /> Back</button>
                    <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                        <div>
                            <Badge>{club.category}</Badge>
                            <h1 className="text-5xl font-bold mt-2 mb-2">{club.name}</h1>
                            <div className="flex items-center gap-4 text-zinc-300">
                                <span className="flex items-center gap-1"><Users size={16} /> {club.memberCount + (isJoined ? 1 : 0)} Members</span>
                                <span className="flex items-center gap-1"><MapPin size={16} /> Global</span>
                            </div>
                        </div>
                        <Button 
                            variant={isJoined ? 'outline' : 'primary'} 
                            onClick={handleJoin}
                            className="min-w-[150px]"
                        >
                            {isJoined ? 'Joined' : 'Join Club'}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Column */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Tabs */}
                    <div className="flex gap-8 border-b border-white/10 pb-1">
                        {['events', 'feed', 'members'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab as any)}
                                className={`pb-3 text-sm font-medium uppercase tracking-wider transition-all border-b-2 ${activeTab === tab ? 'border-purple-500 text-white' : 'border-transparent text-zinc-500 hover:text-zinc-300'}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {activeTab === 'events' && (
                        <div className="space-y-4">
                            {MOCK_EVENTS.filter(e => e.clubId === club.id).length > 0 ? (
                                MOCK_EVENTS.filter(e => e.clubId === club.id).map(event => (
                                    <Card key={event.id} className="flex flex-col md:flex-row gap-6 p-6">
                                        <div className="bg-zinc-800 w-full md:w-24 h-24 flex flex-col items-center justify-center border border-white/5 shrink-0">
                                            <span className="text-sm text-zinc-400 uppercase">{new Date(event.date).toLocaleString('default', { month: 'short' })}</span>
                                            <span className="text-2xl font-bold">{new Date(event.date).getDate()}</span>
                                        </div>
                                        <div className="flex-grow">
                                            <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                                            <p className="text-zinc-400 text-sm mb-4">{event.description}</p>
                                            <div className="flex gap-4 text-sm text-zinc-500">
                                                <span className="flex items-center gap-1"><Calendar size={14}/> {new Date(event.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                                                <span className="flex items-center gap-1"><MapPin size={14}/> {event.location}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <Button variant="outline" size="sm">RSVP</Button>
                                        </div>
                                    </Card>
                                ))
                            ) : (
                                <div className="text-zinc-500 py-8">No upcoming events.</div>
                            )}
                        </div>
                    )}

                    {activeTab === 'feed' && (
                        <div className="space-y-6">
                             {isJoined && (
                                <div className="flex gap-4 mb-8">
                                    <div className="w-10 h-10 rounded-full bg-zinc-800 shrink-0" />
                                    <div className="flex-grow space-y-2">
                                        <TextArea placeholder="Share something with the club..." rows={2} className="bg-zinc-900 border-none resize-none" />
                                        <div className="flex justify-end">
                                            <Button size="sm">Post</Button>
                                        </div>
                                    </div>
                                </div>
                             )}
                             {MOCK_POSTS.filter(p => p.clubId === club.id).map(post => (
                                 <div key={post.id} className="border-b border-white/5 pb-6">
                                     <div className="flex gap-3 mb-2">
                                         <img src={post.user.avatar} className="w-8 h-8 rounded-full" />
                                         <div>
                                             <div className="text-sm font-bold">{post.user.name}</div>
                                             <div className="text-xs text-zinc-500">{post.timestamp}</div>
                                         </div>
                                     </div>
                                     <p className="text-zinc-300 mb-3">{post.content}</p>
                                     <div className="flex gap-4 text-zinc-500 text-sm">
                                         <button className="flex items-center gap-1 hover:text-white"><Heart size={14}/> {post.likes}</button>
                                         <button className="flex items-center gap-1 hover:text-white"><MessageSquare size={14}/> Reply</button>
                                     </div>
                                 </div>
                             ))}
                        </div>
                    )}

                    {activeTab === 'members' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Mock members */}
                            {[1,2,3,4,5,6].map(i => (
                                <div key={i} className="flex items-center gap-3 p-3 border border-white/5 bg-zinc-900/30">
                                    <div className="w-10 h-10 rounded-full bg-zinc-800" />
                                    <div>
                                        <div className="text-sm font-bold text-zinc-200">Member Name</div>
                                        <div className="text-xs text-zinc-500">Joined 2 days ago</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <Card className="p-6">
                        <h3 className="text-lg font-bold mb-4">About</h3>
                        <p className="text-zinc-400 text-sm mb-4 leading-relaxed">{club.description}</p>
                        <div className="flex flex-wrap gap-2">
                            {club.tags.map(t => <span key={t} className="text-xs bg-zinc-800 px-2 py-1 rounded text-zinc-400">#{t}</span>)}
                        </div>
                    </Card>
                    
                     <Card className="p-6">
                        <h3 className="text-lg font-bold mb-4">Admins</h3>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-purple-500" />
                            <div className="text-sm">
                                <div className="font-bold">Club Creator</div>
                                <div className="text-zinc-500 text-xs">Owner</div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

const CreateClubView: React.FC<{ onCancel: () => void }> = ({ onCancel }) => (
    <div className="max-w-2xl mx-auto px-6 py-12 animate-in fade-in duration-500">
        <h1 className="text-3xl font-bold mb-8">Create a New Club</h1>
        <div className="space-y-6">
            <div className="space-y-2">
                <label className="text-sm text-zinc-400">Club Name</label>
                <Input placeholder="e.g. Midnight Runners" />
            </div>
             <div className="space-y-2">
                <label className="text-sm text-zinc-400">Category</label>
                <select className="w-full bg-zinc-900/50 text-white border border-zinc-800 rounded-none px-4 py-3 focus:outline-none focus:border-purple-500">
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
            </div>
            <div className="space-y-2">
                <label className="text-sm text-zinc-400">Description</label>
                <TextArea placeholder="What is this community about?" rows={4} />
            </div>
             <div className="space-y-2">
                <label className="text-sm text-zinc-400">Cover Image URL</label>
                <Input placeholder="https://..." />
            </div>
            <div className="flex gap-4 pt-4">
                <Button className="flex-1">Create Club</Button>
                <Button variant="secondary" onClick={onCancel}>Cancel</Button>
            </div>
        </div>
    </div>
);

const CreateEventView: React.FC<{ onCancel: () => void }> = ({ onCancel }) => {
    const [title, setTitle] = useState('');
    const [tags, setTags] = useState('');
    const [location, setLocation] = useState('');
    const [desc, setDesc] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    const handleMagicDraft = async () => {
        if (!title) return alert("Please enter a title first");
        setIsGenerating(true);
        const generated = await generateEventDescription(title, tags.split(','), location);
        setDesc(generated);
        setIsGenerating(false);
    };

    return (
        <div className="max-w-2xl mx-auto px-6 py-12 animate-in fade-in duration-500">
            <h1 className="text-3xl font-bold mb-8">Host an Event</h1>
            <div className="space-y-6">
                <div className="space-y-2">
                    <label className="text-sm text-zinc-400">Event Title</label>
                    <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Summer Networking Mixer" />
                </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm text-zinc-400">Date</label>
                        <Input type="datetime-local" />
                    </div>
                     <div className="space-y-2">
                        <label className="text-sm text-zinc-400">Location</label>
                        <Input value={location} onChange={e => setLocation(e.target.value)} placeholder="e.g. Central Park" />
                    </div>
                 </div>
                 <div className="space-y-2">
                     <label className="text-sm text-zinc-400">Tags (comma separated)</label>
                     <Input value={tags} onChange={e => setTags(e.target.value)} placeholder="e.g. social, fun, outdoor" />
                 </div>
                <div className="space-y-2 relative">
                    <div className="flex justify-between items-center mb-1">
                        <label className="text-sm text-zinc-400">Description</label>
                        <button 
                            onClick={handleMagicDraft}
                            disabled={isGenerating}
                            className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 disabled:opacity-50"
                        >
                            <Sparkles size={12} /> {isGenerating ? 'Generating...' : 'AI Magic Draft'}
                        </button>
                    </div>
                    <TextArea value={desc} onChange={e => setDesc(e.target.value)} placeholder="Details about the event..." rows={4} />
                </div>
                <div className="flex gap-4 pt-4">
                    <Button className="flex-1">Publish Event</Button>
                    <Button variant="secondary" onClick={onCancel}>Cancel</Button>
                </div>
            </div>
        </div>
    );
}

const DashboardView: React.FC<{ user: User; onNavigate: (v: View) => void }> = ({ user, onNavigate }) => {
    return (
        <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-light mb-1">Welcome back,</h1>
                    <h2 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-500">{user.name}</h2>
                </div>
                <Button onClick={() => onNavigate(View.CREATE_CLUB)} variant="outline"><Plus size={18} className="mr-2"/> Create Club</Button>
            </div>

            {/* Upcoming Section */}
            <section>
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><Calendar className="text-purple-500" size={20} /> Your Upcoming Events</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card className="border-l-4 border-l-purple-500">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <div className="text-2xl font-bold mb-1">15 NOV</div>
                                <div className="text-sm text-zinc-400">18:00 PM</div>
                            </div>
                            <Badge>Tech</Badge>
                        </div>
                        <h4 className="text-lg font-bold mb-1">Late Night Hackathon</h4>
                        <p className="text-sm text-zinc-400 mb-4">TechHub Downtown</p>
                        <div className="flex -space-x-2">
                            {[1,2,3].map(i => <div key={i} className="w-8 h-8 rounded-full bg-zinc-700 border border-black" />)}
                            <div className="w-8 h-8 rounded-full bg-zinc-800 border border-black flex items-center justify-center text-xs text-zinc-400">+39</div>
                        </div>
                    </Card>
                </div>
            </section>

             {/* Your Clubs */}
             <section>
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold flex items-center gap-2"><Users className="text-blue-500" size={20} /> Your Clubs</h3>
                    <button onClick={() => onNavigate(View.EXPLORE)} className="text-sm text-zinc-400 hover:text-white">Find More</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {MOCK_CLUBS.filter(c => user.joinedClubs.includes(c.id)).map(club => (
                        <Card key={club.id} className="p-4 flex items-center gap-4 cursor-pointer hover:bg-zinc-800/50" onClick={() => onNavigate(View.CLUB_DETAIL)}>
                            <img src={club.image} className="w-16 h-16 rounded object-cover" />
                            <div>
                                <h4 className="font-bold">{club.name}</h4>
                                <div className="text-xs text-zinc-500">{club.memberCount} Members</div>
                            </div>
                        </Card>
                    ))}
                    <button 
                        onClick={() => onNavigate(View.EXPLORE)}
                        className="p-4 flex flex-col items-center justify-center gap-2 border border-dashed border-zinc-800 rounded hover:border-zinc-600 hover:bg-zinc-900 transition-all text-zinc-500 hover:text-zinc-300 h-24 md:h-auto"
                    >
                        <Plus size={24} />
                        <span className="text-sm font-medium">Join New Club</span>
                    </button>
                </div>
            </section>
        </div>
    );
};

// --- Main App Component ---

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.LANDING);
  const [user, setUser] = useState<User | null>(null);
  const [activeClubId, setActiveClubId] = useState<string | null>(null);

  const handleLogin = () => {
    // Simulate login
    setTimeout(() => {
        setUser(MOCK_USER);
        setCurrentView(View.DASHBOARD);
    }, 800);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView(View.LANDING);
  };

  const navigateToClub = (id: string) => {
      setActiveClubId(id);
      setCurrentView(View.CLUB_DETAIL);
  };

  const renderView = () => {
    switch (currentView) {
      case View.LANDING:
        return <LandingView onExplore={() => setCurrentView(View.EXPLORE)} onLogin={() => setCurrentView(View.AUTH)} />;
      case View.AUTH:
        return <AuthView onLogin={handleLogin} />;
      case View.DASHBOARD:
        if (!user) return <AuthView onLogin={handleLogin} />;
        return <DashboardView user={user} onNavigate={setCurrentView} />;
      case View.EXPLORE:
        return <ExploreView onClubClick={navigateToClub} />;
      case View.CLUB_DETAIL:
        if (!activeClubId) return <ExploreView onClubClick={navigateToClub} />;
        return <ClubDetailView clubId={activeClubId} user={user} onBack={() => setCurrentView(View.EXPLORE)} />;
      case View.CREATE_CLUB:
        return <CreateClubView onCancel={() => setCurrentView(View.DASHBOARD)} />;
      case View.CREATE_EVENT:
        return <CreateEventView onCancel={() => setCurrentView(View.CLUB_DETAIL)} />;
      case View.PROFILE:
        return <div className="p-10 text-center">Profile Coming Soon</div>; // Placeholder
      default:
        return <LandingView onExplore={() => setCurrentView(View.EXPLORE)} onLogin={() => setCurrentView(View.AUTH)} />;
    }
  };

  return (
    <Layout 
        currentView={currentView} 
        user={user} 
        onNavigate={setCurrentView} 
        onLogout={handleLogout}
    >
      {renderView()}
    </Layout>
  );
};

export default App;