import { useState, useEffect } from 'react';
import { db, auth } from '../../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { Card } from '../ui/Card';
import { 
  Video, 
  User, 
  Calendar, 
  Clock, 
  Mail, 
  Phone, 
  MessageSquare,
  ShieldAlert,
  ArrowLeft,
  ExternalLink
} from 'lucide-react';

interface CallRoomProps {
  bookingId: string;
  navigateTo: (path: string) => void;
}

export const CallRoom = ({ bookingId, navigateTo }: CallRoomProps) => {
  const [booking, setBooking] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userDisplayName, setUserDisplayName] = useState('Guest');

  useEffect(() => {
    // 1. Fetch booking details
    const fetchBooking = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const docRef = doc(db, 'bookings', bookingId);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          setBooking(data);
          setUserDisplayName(data.name || 'Client');
        } else {
          setError("Meeting room not found. The call booking may have expired or been deleted.");
        }
      } catch (err) {
        console.error("Error loading booking for call room:", err);
        setError("Failed to verify meeting credentials. Check your network or database connection.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooking();

    // 2. Check if user is Admin to adjust name/labels
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists() && userDoc.data().role === 'admin') {
            setIsAdmin(true);
            setUserDisplayName('Admin Advisor');
          }
        } catch (e) {
          console.error("Auth check failed in call room:", e);
        }
      }
    });

    return () => unsubscribe();
  }, [bookingId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-brand-light flex items-center justify-center font-bold text-[18px]">
        <div className="flex flex-col items-center gap-4">
          <svg className="w-8 h-8 text-black animate-spin" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span>Entering Meeting Room...</span>
        </div>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen bg-brand-light bg-grid-pattern flex flex-col items-center justify-center p-6 text-center">
        <Card className="max-w-md p-8 bg-white border-[3px] border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] space-y-6">
          <div className="w-16 h-16 bg-[#FF4747] border-[2px] border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] mx-auto flex items-center justify-center -rotate-3 text-black">
            <ShieldAlert className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-black text-black">Call Verification Error</h2>
          <p className="text-gray-700 font-bold text-[15px] leading-relaxed">{error}</p>
          <div className="pt-4 flex gap-4">
            <button
              onClick={() => navigateTo('/')}
              className="flex-1 bg-white hover:bg-gray-50 border-[2px] border-black py-2.5 font-bold shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              Back to Site
            </button>
          </div>
        </Card>
      </div>
    );
  }

  const meetingRoomName = `support-teach-call-${bookingId}`;
  // Construct embedded iframe URL for Jitsi Meet
  const jitsiIframeUrl = `https://meet.jit.si/${meetingRoomName}#userInfo.displayName="${encodeURIComponent(userDisplayName)}"&config.startWithAudioMuted=true&config.startWithVideoMuted=true`;

  return (
    <div className="min-h-screen bg-brand-light font-dm text-black flex flex-col">
      
      {/* Header bar */}
      <header className="border-b-[3px] border-black bg-white py-4 px-6 md:px-12 flex items-center justify-between shadow-[0_3px_0_rgba(0,0,0,1)] z-10">
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              if (isAdmin) {
                navigateTo('/admin');
              } else {
                navigateTo('/');
              }
            }}
            className="flex items-center gap-1.5 bg-white hover:bg-gray-50 border-[2px] border-black px-3 py-1.5 text-[13px] font-black shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 active:translate-y-0 transition-transform cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> {isAdmin ? "Admin Dashboard" : "Back to Website"}
          </button>
        </div>

        <div className="flex items-center gap-2 select-none">
          <div className="h-8 w-8 bg-[#21C57D] border-[2px] border-black shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)] flex items-center justify-center -rotate-3">
            <Video className="w-4 h-4 text-black" strokeWidth={2.5} />
          </div>
          <span className="font-dm text-lg font-black tracking-tight text-black">
            SupportTeach <span className="text-gray-500 font-bold">Call Room</span>
          </span>
        </div>

        <div className="text-[12px] bg-red-100 text-red-800 border border-red-300 font-bold px-2 py-0.5 animate-pulse rounded-none">
          ● Live Room
        </div>
      </header>

      {/* Main Workspace Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 overflow-hidden h-[calc(100vh-70px)]">
        
        {/* Left Column: Meeting Details Panel */}
        <div className="lg:col-span-1 border-r-[3px] border-black bg-white p-6 overflow-y-auto space-y-6 flex flex-col">
          <div>
            <div className="inline-block bg-[#FFD147] border-[2px] border-black text-black text-[11px] font-black uppercase tracking-wider px-2 py-1 shadow-[2px_2px_0px_rgba(0,0,0,1)] mb-3">
              Meeting Info
            </div>
            <h2 className="text-2xl font-black text-black leading-tight">Advisor Call</h2>
            <p className="text-[13px] text-gray-500 font-bold mt-1">Verify scheduling and notes below</p>
          </div>

          <div className="space-y-4 flex-1">
            {/* Booking Details Cards */}
            <div className="p-4 bg-gray-50 border-[2px] border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] space-y-3.5 text-[14px]">
              
              <div className="flex items-start gap-3">
                <User className="w-4 h-4 text-gray-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[11px] font-bold text-gray-500 uppercase block leading-none mb-0.5">Client Name</span>
                  <span className="font-black text-black">{booking.name}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 border-t border-black/10 pt-3">
                <Calendar className="w-4 h-4 text-gray-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[11px] font-bold text-gray-500 uppercase block leading-none mb-0.5">Booking Date</span>
                  <span className="font-black text-black">{booking.date}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 border-t border-black/10 pt-3">
                <Clock className="w-4 h-4 text-gray-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[11px] font-bold text-gray-500 uppercase block leading-none mb-0.5">Time Slot</span>
                  <span className="font-black text-blue-600">{booking.time} {booking.timezone ? `(${booking.timezone})` : ''}</span>
                </div>
              </div>

              {isAdmin && (
                <>
                  <div className="flex items-start gap-3 border-t border-black/10 pt-3">
                    <Mail className="w-4 h-4 text-gray-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[11px] font-bold text-gray-500 uppercase block leading-none mb-0.5">Email</span>
                      <a href={`mailto:${booking.email}`} className="font-black text-black hover:underline">{booking.email}</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 border-t border-black/10 pt-3">
                    <Phone className="w-4 h-4 text-gray-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[11px] font-bold text-gray-500 uppercase block leading-none mb-0.5">Phone Number</span>
                      <a href={`tel:${booking.phone}`} className="font-black text-black hover:underline">{booking.phone}</a>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Purpose card */}
            <div className="p-4 bg-gray-50 border-[2px] border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] text-[14px]">
              <span className="text-[11px] font-bold text-gray-500 uppercase block flex items-center gap-1.5 mb-1.5">
                <MessageSquare className="w-3.5 h-3.5" /> Agenda / Topic
              </span>
              <p className="font-medium text-gray-800 text-[13px] leading-relaxed">
                {booking.description}
              </p>
            </div>
          </div>

          {/* Quick Help Card */}
          <div className="p-4 border-[2px] border-black bg-blue-50 text-[12px] font-bold leading-relaxed space-y-1">
            <span className="text-black block font-black">ℹ️ Troubleshooting:</span>
            <p className="text-gray-700">
              Allow browser access to your webcam and microphone if prompted. 
            </p>
            <a 
              href={`https://meet.jit.si/${meetingRoomName}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] text-blue-600 underline font-black mt-1"
            >
              Open in full Jitsi app <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Right Column: Embedded Jitsi Video Call Workspace */}
        <div className="lg:col-span-3 bg-gray-900 flex flex-col justify-center items-center p-4 relative">
          
          <div className="w-full h-full max-w-6xl max-h-[85%] bg-black border-[4px] border-black shadow-[10px_10px_0px_rgba(0,0,0,1)] relative overflow-hidden flex flex-col">
            {/* Embedded Iframe */}
            <iframe
              src={jitsiIframeUrl}
              allow="camera; microphone; fullscreen; display-capture; autoplay"
              className="w-full flex-1 border-none bg-black"
              title="Jitsi Video Meeting Room"
            />
          </div>

          <div className="mt-4 text-center">
            <p className="text-gray-400 font-bold text-[13px] uppercase tracking-wider">
              Secure call workspace • Encrypted Connection • Powered by Jitsi Meet
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
