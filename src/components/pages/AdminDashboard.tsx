import { useState, useEffect } from 'react';
import { Card } from '../ui/Card';
import { auth, db } from '../../lib/firebase';
import { 
  collection, 
  doc, 
  getDoc, 
  updateDoc, 
  deleteDoc, 
  onSnapshot, 
  query, 
  orderBy 
} from 'firebase/firestore';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { 
  BookOpen, 
  LogOut, 
  Users, 
  MessageSquare, 
  Calendar, 
  Package, 
  Check, 
  X, 
  ExternalLink,
  Shield, 
  RefreshCw,
  Video
} from 'lucide-react';

interface AdminDashboardProps {
  navigateTo: (path: string) => void;
}

export const AdminDashboard = ({ navigateTo }: AdminDashboardProps) => {
  const [activeTab, setActiveTab] = useState<'inquiries' | 'bundles' | 'bookings' | 'rules'>('inquiries');
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  // Firestore Collections State
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [bundles, setBundles] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);

  // Auth Protection Guard
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        navigateTo('/admin/login');
      } else {
        setUserEmail(user.email);
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists() && userDoc.data().role === 'admin') {
            setIsAuthorized(true);
          } else {
            console.warn("User is logged in but does not have the admin role.");
            await signOut(auth);
            navigateTo('/admin/login');
          }
        } catch (err) {
          console.error("Error verifying admin role:", err);
          await signOut(auth);
          navigateTo('/admin/login');
        } finally {
          setIsLoading(false);
        }
      }
    });

    return () => unsubscribe();
  }, [navigateTo]);

  // Real-time Firestore Subscriptions
  useEffect(() => {
    if (!isAuthorized) return;

    // 1. Inquiries Subscription
    const qInquiries = query(collection(db, 'inquiries'), orderBy('createdAt', 'desc'));
    const unsubInquiries = onSnapshot(qInquiries, (snapshot) => {
      const list: any[] = [];
      snapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      setInquiries(list);
    }, (err) => console.error("Error loading inquiries:", err));

    // 2. Bundle Orders Subscription
    const qBundles = query(collection(db, 'bundle_orders'), orderBy('createdAt', 'desc'));
    const unsubBundles = onSnapshot(qBundles, (snapshot) => {
      const list: any[] = [];
      snapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      setBundles(list);
    }, (err) => console.error("Error loading bundles:", err));

    // 3. Bookings Subscription
    const qBookings = query(collection(db, 'bookings'), orderBy('createdAt', 'desc'));
    const unsubBookings = onSnapshot(qBookings, (snapshot) => {
      const list: any[] = [];
      snapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      setBookings(list);
    }, (err) => console.error("Error loading bookings:", err));

    return () => {
      unsubInquiries();
      unsubBundles();
      unsubBookings();
    };
  }, [isAuthorized]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigateTo('/admin/login');
    } catch (err) {
      console.error("Signout error:", err);
    }
  };

  // Status Toggles
  const handleUpdateStatus = async (collectionName: string, docId: string, currentStatus: string) => {
    let nextStatus = 'resolved';
    if (collectionName === 'bundle_orders') {
      nextStatus = currentStatus === 'new' ? 'contacted' : 'closed';
    } else if (collectionName === 'bookings') {
      nextStatus = currentStatus === 'scheduled' ? 'completed' : 'scheduled';
    } else {
      nextStatus = currentStatus === 'new' ? 'replied' : 'archived';
    }

    try {
      await updateDoc(doc(db, collectionName, docId), { status: nextStatus });
    } catch (err) {
      console.error(`Failed to update status on ${collectionName}:`, err);
    }
  };

  const handleDeleteDoc = async (collectionName: string, docId: string) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;
    try {
      await deleteDoc(doc(db, collectionName, docId));
    } catch (err) {
      console.error(`Failed to delete doc in ${collectionName}:`, err);
    }
  };

  // Helper formatting for timestamps
  const formatTime = (firebaseTimestamp: any) => {
    if (!firebaseTimestamp) return 'N/A';
    // Handle Firestore timestamp vs raw ISO string
    const date = firebaseTimestamp.seconds 
      ? new Date(firebaseTimestamp.seconds * 1000) 
      : new Date(firebaseTimestamp);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-brand-light flex items-center justify-center font-bold text-[18px]">
        <div className="flex flex-col items-center gap-4">
          <RefreshCw className="w-8 h-8 text-black animate-spin" />
          <span>Verifying Admin Session...</span>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return null; // Redirect logic handled by hook
  }

  // Count active stats
  const activeInquiries = inquiries.filter(i => i.status === 'new').length;
  const activeBundles = bundles.filter(b => b.status === 'new').length;
  const upcomingCalls = bookings.filter(bk => bk.status === 'scheduled').length;

  return (
    <div className="min-h-screen bg-brand-light font-dm text-black pb-20">
      
      {/* Top Navigation */}
      <header className="border-b-[3px] border-black bg-white sticky top-0 z-40 py-4 px-6 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[0_4px_0_rgba(0,0,0,1)]">
        <div className="flex items-center gap-2 group cursor-pointer" onClick={() => navigateTo('/')}>
          <div className="h-9 w-9 bg-[#FFD147] border-[2px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center -rotate-3">
            <BookOpen className="w-5 h-5 text-black" strokeWidth={2.5} />
          </div>
          <span className="font-dm text-2xl font-black tracking-tight text-black">
            Support<span className="text-[#21C57D]">Teach</span> <span className="text-[12px] bg-black text-[#FFD147] px-2 py-0.5 ml-2 font-mono uppercase rounded-none border border-black">Admin</span>
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-[14px] text-gray-500 font-bold hidden md:inline">
            Logged in: <span className="text-black font-black">{userEmail}</span>
          </span>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 bg-white hover:bg-gray-50 border-[2px] border-black px-4 py-2 text-[14px] font-black shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:-translate-x-0.5 active:translate-y-0 active:translate-x-0 cursor-pointer transition-transform"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-6 md:px-12 pt-12 space-y-10">
        
        {/* Dashboard Title */}
        <div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2">Workspace Overview</h1>
          <p className="text-gray-500 font-bold">Real-time visitor inquiries, bundle leads, and scheduled video calls.</p>
        </div>

        {/* Dashboard KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 bg-white border-[3px] border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] flex items-center justify-between">
            <div>
              <span className="text-[13px] font-black text-gray-500 uppercase tracking-wider block mb-1">New Inquiries</span>
              <span className="text-4xl font-black">{activeInquiries}</span>
              <span className="text-[12px] text-gray-400 block mt-1">Total: {inquiries.length}</span>
            </div>
            <div className="w-14 h-14 bg-[#FFD147] border-[2px] border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] flex items-center justify-center text-black -rotate-3">
              <MessageSquare className="w-7 h-7" strokeWidth={2.5} />
            </div>
          </Card>

          <Card className="p-6 bg-white border-[3px] border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] flex items-center justify-between">
            <div>
              <span className="text-[13px] font-black text-gray-500 uppercase tracking-wider block mb-1">Bundle Leads</span>
              <span className="text-4xl font-black">{activeBundles}</span>
              <span className="text-[12px] text-gray-400 block mt-1">Total: {bundles.length}</span>
            </div>
            <div className="w-14 h-14 bg-[#21C57D] border-[2px] border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] flex items-center justify-center text-black rotate-3">
              <Package className="w-7 h-7" strokeWidth={2.5} />
            </div>
          </Card>

          <Card className="p-6 bg-white border-[3px] border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] flex items-center justify-between">
            <div>
              <span className="text-[13px] font-black text-gray-500 uppercase tracking-wider block mb-1">Upcoming Calls</span>
              <span className="text-4xl font-black">{upcomingCalls}</span>
              <span className="text-[12px] text-gray-400 block mt-1">Total: {bookings.length}</span>
            </div>
            <div className="w-14 h-14 bg-[#3B82F6] border-[2px] border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] flex items-center justify-center text-white -rotate-2">
              <Calendar className="w-7 h-7" strokeWidth={2.5} />
            </div>
          </Card>

          <Card className="p-6 bg-white border-[3px] border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] flex items-center justify-between">
            <div>
              <span className="text-[13px] font-black text-gray-500 uppercase tracking-wider block mb-1">Admin Identity</span>
              <span className="text-lg font-black truncate max-w-[160px] block leading-tight">{userEmail?.split('@')[0]}</span>
              <span className="text-[11px] bg-green-100 text-green-800 border border-green-300 font-bold px-1.5 py-0.5 rounded-none inline-block mt-2">Active Admin</span>
            </div>
            <div className="w-14 h-14 bg-[#CA8A04] border-[2px] border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] flex items-center justify-center text-white rotate-2">
              <Users className="w-7 h-7" strokeWidth={2.5} />
            </div>
          </Card>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap gap-2 border-b-3 border-black pb-0">
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`px-5 py-3 font-black text-[15px] border-[2.5px] border-b-0 border-black transition-all cursor-pointer ${
              activeTab === 'inquiries' 
                ? 'bg-[#FFD147] shadow-[2px_-2px_0px_rgba(0,0,0,1)] -translate-y-0.5' 
                : 'bg-white hover:bg-gray-50'
            }`}
          >
            Inquiries ({inquiries.length})
          </button>
          <button
            onClick={() => setActiveTab('bundles')}
            className={`px-5 py-3 font-black text-[15px] border-[2.5px] border-b-0 border-black transition-all cursor-pointer ${
              activeTab === 'bundles' 
                ? 'bg-[#21C57D] shadow-[2px_-2px_0px_rgba(0,0,0,1)] -translate-y-0.5' 
                : 'bg-white hover:bg-gray-50'
            }`}
          >
            Bundle Leads ({bundles.length})
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-5 py-3 font-black text-[15px] border-[2.5px] border-b-0 border-black transition-all cursor-pointer ${
              activeTab === 'bookings' 
                ? 'bg-[#3B82F6] text-white shadow-[2px_-2px_0px_rgba(0,0,0,1)] -translate-y-0.5' 
                : 'bg-white hover:bg-gray-50'
            }`}
          >
            Call Bookings ({bookings.length})
          </button>
          <button
            onClick={() => setActiveTab('rules')}
            className={`px-5 py-3 font-black text-[15px] border-[2.5px] border-b-0 border-black transition-all cursor-pointer ${
              activeTab === 'rules' 
                ? 'bg-[#CA8A04] text-white shadow-[2px_-2px_0px_rgba(0,0,0,1)] -translate-y-0.5' 
                : 'bg-white hover:bg-gray-50'
            }`}
          >
            Security Rules Helper
          </button>
        </div>

        {/* Tab Contents */}
        <div className="bg-white border-[3px] border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] p-6 md:p-8 min-h-[400px]">
          
          {/* TAB 1: INQUIRIES */}
          {activeTab === 'inquiries' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b-2 border-black pb-4">
                <h3 className="text-2xl font-black">Website Inquiries</h3>
                <span className="text-[13px] bg-gray-100 border border-black px-2.5 py-1 font-bold">
                  {activeInquiries} pending review
                </span>
              </div>

              {inquiries.length === 0 ? (
                <div className="text-center py-20">
                  <MessageSquare className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500 font-bold text-lg">No inquiries submitted yet.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full border-[2.5px] border-black text-left font-bold text-[14px]">
                    <thead className="bg-gray-100 border-b-2 border-black">
                      <tr>
                        <th className="p-3.5 border-r border-black">Date</th>
                        <th className="p-3.5 border-r border-black">Contact Details</th>
                        <th className="p-3.5 border-r border-black">Organization & Location</th>
                        <th className="p-3.5 border-r border-black">Service Requested</th>
                        <th className="p-3.5 border-r border-black">Project Description</th>
                        <th className="p-3.5 border-r border-black">Status</th>
                        <th className="p-3.5 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y border-black divide-black">
                      {inquiries.map((inq) => (
                        <tr key={inq.id} className={`hover:bg-gray-50/50 ${inq.status !== 'new' ? 'opacity-60 bg-gray-50' : ''}`}>
                          <td className="p-3.5 border-r border-black font-mono text-[12px] whitespace-nowrap">
                            {formatTime(inq.createdAt)}
                          </td>
                          <td className="p-3.5 border-r border-black space-y-0.5">
                            <div className="font-black text-black">{inq.contactName}</div>
                            <div className="text-[12px] text-gray-500 font-medium">{inq.contactEmail}</div>
                            <div className="text-[12px] text-gray-500 font-medium">{inq.contactPhone}</div>
                          </td>
                          <td className="p-3.5 border-r border-black space-y-0.5">
                            <div className="text-black">{inq.orgName}</div>
                            <div className="text-[12px] text-gray-500 font-medium">{inq.location}</div>
                          </td>
                          <td className="p-3.5 border-r border-black">
                            <span className="px-2 py-0.5 border border-black font-mono text-[11px] uppercase bg-[#FFD147]">
                              {inq.service}
                            </span>
                          </td>
                          <td className="p-3.5 border-r border-black max-w-xs font-medium text-[13px] leading-relaxed">
                            {inq.description}
                          </td>
                          <td className="p-3.5 border-r border-black">
                            <span className={`px-2.5 py-1 border border-black text-[11px] font-black uppercase ${
                              inq.status === 'new' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                            }`}>
                              {inq.status}
                            </span>
                          </td>
                          <td className="p-3.5 text-center flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleUpdateStatus('inquiries', inq.id, inq.status)}
                              className="bg-white border border-black p-1.5 hover:bg-[#21C57D] shadow-[1px_1px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
                              title={inq.status === 'new' ? 'Mark as Replied' : 'Re-open Inquiry'}
                            >
                              <Check className="w-4 h-4 text-black" strokeWidth={3} />
                            </button>
                            <button
                              onClick={() => handleDeleteDoc('inquiries', inq.id)}
                              className="bg-white border border-black p-1.5 hover:bg-[#FF4747] shadow-[1px_1px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
                              title="Delete Record"
                            >
                              <X className="w-4 h-4 text-black" strokeWidth={3} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: BUNDLES */}
          {activeTab === 'bundles' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b-2 border-black pb-4">
                <h3 className="text-2xl font-black">Bundle Leads (Checkout Requests)</h3>
                <span className="text-[13px] bg-gray-100 border border-black px-2.5 py-1 font-bold">
                  {activeBundles} pending contact
                </span>
              </div>

              {bundles.length === 0 ? (
                <div className="text-center py-20">
                  <Package className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500 font-bold text-lg">No bundle selection submissions yet.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full border-[2.5px] border-black text-left font-bold text-[14px]">
                    <thead className="bg-gray-100 border-b-2 border-black">
                      <tr>
                        <th className="p-3.5 border-r border-black">Date</th>
                        <th className="p-3.5 border-r border-black">Selected Package</th>
                        <th className="p-3.5 border-r border-black">Client Name</th>
                        <th className="p-3.5 border-r border-black">Contact Details</th>
                        <th className="p-3.5 border-r border-black">Organization</th>
                        <th className="p-3.5 border-r border-black">Additional Notes</th>
                        <th className="p-3.5 border-r border-black">Status</th>
                        <th className="p-3.5 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y border-black divide-black">
                      {bundles.map((bundle) => (
                        <tr key={bundle.id} className={`hover:bg-gray-50/50 ${bundle.status !== 'new' ? 'opacity-60 bg-gray-50' : ''}`}>
                          <td className="p-3.5 border-r border-black font-mono text-[12px] whitespace-nowrap">
                            {formatTime(bundle.createdAt)}
                          </td>
                          <td className="p-3.5 border-r border-black">
                            <div className="font-black text-black underline decoration-[#21C57D] decoration-[2px]">
                              {bundle.bundleTitle}
                            </div>
                            <span className="font-mono text-[10px] text-gray-400 block mt-0.5">ID: {bundle.bundleId}</span>
                          </td>
                          <td className="p-3.5 border-r border-black font-black text-black">
                            {bundle.name}
                          </td>
                          <td className="p-3.5 border-r border-black space-y-0.5">
                            <div className="text-[13px] text-black font-medium">{bundle.email}</div>
                            <div className="text-[12px] text-gray-500 font-medium">{bundle.phone}</div>
                          </td>
                          <td className="p-3.5 border-r border-black">
                            {bundle.orgName}
                          </td>
                          <td className="p-3.5 border-r border-black font-medium text-[13px] leading-relaxed max-w-xs">
                            {bundle.message || <span className="text-gray-400 font-normal">None provided</span>}
                          </td>
                          <td className="p-3.5 border-r border-black">
                            <span className={`px-2.5 py-1 border border-black text-[11px] font-black uppercase ${
                              bundle.status === 'new' ? 'bg-[#21C57D] text-black shadow-[1px_1px_0px_rgba(0,0,0,1)]' : 'bg-gray-200 text-gray-600'
                            }`}>
                              {bundle.status}
                            </span>
                          </td>
                          <td className="p-3.5 text-center flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleUpdateStatus('bundle_orders', bundle.id, bundle.status)}
                              className="bg-white border border-black p-1.5 hover:bg-[#21C57D] shadow-[1px_1px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
                              title="Toggle status"
                            >
                              <Check className="w-4 h-4 text-black" strokeWidth={3} />
                            </button>
                            <button
                              onClick={() => handleDeleteDoc('bundle_orders', bundle.id)}
                              className="bg-white border border-black p-1.5 hover:bg-[#FF4747] shadow-[1px_1px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
                              title="Delete Lead"
                            >
                              <X className="w-4 h-4 text-black" strokeWidth={3} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: BOOKINGS */}
          {activeTab === 'bookings' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b-2 border-black pb-4">
                <h3 className="text-2xl font-black">Call Bookings Calendar</h3>
                <span className="text-[13px] bg-gray-100 border border-black px-2.5 py-1 font-bold">
                  {upcomingCalls} calls scheduled
                </span>
              </div>

              {bookings.length === 0 ? (
                <div className="text-center py-20">
                  <Calendar className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500 font-bold text-lg">No calls scheduled yet.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full border-[2.5px] border-black text-left font-bold text-[14px]">
                    <thead className="bg-gray-100 border-b-2 border-black">
                      <tr>
                        <th className="p-3.5 border-r border-black">Scheduled Date & Time</th>
                        <th className="p-3.5 border-r border-black">Client Name</th>
                        <th className="p-3.5 border-r border-black">Contact Details</th>
                        <th className="p-3.5 border-r border-black">Meeting Purpose</th>
                        <th className="p-3.5 border-r border-black">Live Meeting Portal</th>
                        <th className="p-3.5 border-r border-black">Status</th>
                        <th className="p-3.5 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y border-black divide-black">
                      {bookings.map((booking) => {
                        return (
                          <tr key={booking.id} className={`hover:bg-gray-50/50 ${booking.status !== 'scheduled' ? 'opacity-60 bg-gray-50' : ''}`}>
                            <td className="p-3.5 border-r border-black whitespace-nowrap bg-blue-50/20">
                              <div className="font-black text-black text-[15px]">{booking.date}</div>
                              <div className="text-[13px] text-blue-600 font-bold">{booking.time} {booking.timezone ? `(${booking.timezone})` : ''}</div>
                              <span className="text-[10px] text-gray-400 font-mono block">Booked: {formatTime(booking.createdAt)}</span>
                            </td>
                            <td className="p-3.5 border-r border-black font-black text-black">
                              {booking.name}
                            </td>
                            <td className="p-3.5 border-r border-black space-y-0.5">
                              <div className="text-[13px] text-black font-medium">{booking.email}</div>
                              <div className="text-[12px] text-gray-500 font-medium">{booking.phone}</div>
                            </td>
                            <td className="p-3.5 border-r border-black max-w-xs font-medium text-[13px] leading-relaxed">
                              {booking.description}
                            </td>
                            <td className="p-3.5 border-r border-black whitespace-nowrap">
                              {booking.status === 'scheduled' ? (
                                <a 
                                  href={`/call/${booking.id}`} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 bg-[#21C57D] text-black border-[2px] border-black px-3 py-1.5 text-[12px] font-black shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 active:translate-y-0 transition-transform cursor-pointer"
                                >
                                  <Video className="w-3.5 h-3.5" /> Start Call <ExternalLink className="w-3 h-3" />
                                </a>
                              ) : (
                                <span className="text-gray-400 text-[12px]">Meeting over / cancelled</span>
                              )}
                            </td>
                            <td className="p-3.5 border-r border-black">
                              <span className={`px-2.5 py-1 border border-black text-[11px] font-black uppercase ${
                                booking.status === 'scheduled' ? 'bg-[#3B82F6] text-white shadow-[1px_1px_0px_rgba(0,0,0,1)]' : 'bg-gray-200 text-gray-600'
                              }`}>
                                {booking.status}
                              </span>
                            </td>
                            <td className="p-3.5 text-center flex items-center justify-center gap-2">
                              <button
                                onClick={() => handleUpdateStatus('bookings', booking.id, booking.status)}
                                className="bg-white border border-black p-1.5 hover:bg-[#21C57D] shadow-[1px_1px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
                                title="Toggle complete"
                              >
                                <Check className="w-4 h-4 text-black" strokeWidth={3} />
                              </button>
                              <button
                                onClick={() => handleDeleteDoc('bookings', booking.id)}
                                className="bg-white border border-black p-1.5 hover:bg-[#FF4747] shadow-[1px_1px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
                                title="Delete Booking"
                              >
                                <X className="w-4 h-4 text-black" strokeWidth={3} />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: RULES HELPER */}
          {activeTab === 'rules' && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 border-b-2 border-black pb-4">
                <Shield className="w-6 h-6 text-[#CA8A04]" />
                <h3 className="text-2xl font-black">Firebase Security Rules Reference</h3>
              </div>

              <div className="bg-gray-50 border-[2px] border-black p-6 space-y-4 shadow-[3px_3px_0px_rgba(0,0,0,1)]">
                <p className="font-bold leading-relaxed text-[15px]">
                  To secure your application database in the **Firebase Free Tier**, please copy-paste the rules below into your **Cloud Firestore Security Rules** in the Firebase Console:
                </p>

                <div className="relative">
                  <div className="absolute top-2 right-2 bg-black text-[#FFD147] px-2 py-0.5 text-[11px] font-mono uppercase font-black border border-black shadow-[1px_1px_0px_rgba(255,255,255,1)]">
                    Firestore Rules
                  </div>
                  <pre className="bg-[#1E1E1E] text-white p-4 font-mono text-[13px] rounded-none border-[2px] border-black overflow-x-auto whitespace-pre leading-relaxed select-all">
{`rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper: Checks if the user is an authenticated Admin
    function isAdmin() {
      return request.auth != null && 
        exists(/databases/\$(database)/documents/users/\$(request.auth.uid)) && 
        get(/databases/\$(database)/documents/users/\$(request.auth.uid)).data.role == 'admin';
    }

    // Inquiries collection
    match /inquiries/{inquiryId} {
      allow create: if true; // Public submission
      allow read, update, delete: if isAdmin(); // Admin only
    }

    // Bookings collection
    match /bookings/{bookingId} {
      allow create: if true; // Public booking
      allow read: if true; // Public read so clients can view their booked slot and call state
      allow update, delete: if isAdmin(); // Admin only updates/deletions
    }

    // Bundle Orders collection
    match /bundle_orders/{orderId} {
      allow create: if true; // Public package selection
      allow read, update, delete: if isAdmin(); // Admin only
    }

    // Users collection (Admin roles)
    match /users/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      // Disable writing roles from the client to prevent security elevation.
      // Register via the Admin Register page, and then manually set "role: admin" in your Firebase console for your UID.
      allow create: if request.auth != null && request.auth.uid == userId && !exists(/databases/\$(database)/documents/users/\$(userId));
      allow update, delete: if isAdmin();
    }
  }
}`}
                  </pre>
                </div>

                <div className="bg-yellow-50 border-[2px] border-black p-4 text-[13px] leading-relaxed font-bold">
                  <p className="text-black font-black mb-1">💡 Tips on configuring users manually in Firebase Console:</p>
                  <ol className="list-decimal list-inside space-y-1 text-gray-700">
                    <li>Register an account on the **Register Admin** page of this site.</li>
                    <li>Open Cloud Firestore in your Firebase Console.</li>
                    <li>If the <code className="font-mono bg-white px-1 text-black font-bold border border-black">users</code> collection doesn't exist, create it.</li>
                    <li>Add/modify the document where the **Document ID** matches your UID (which is shown after registration).</li>
                    <li>Add a field named <code className="font-mono bg-white px-1 text-black font-bold border border-black">role</code> with string value <code className="font-mono text-green-600 font-bold">"admin"</code>.</li>
                  </ol>
                </div>
              </div>
            </div>
          )}

        </div>

      </main>
    </div>
  );
};
