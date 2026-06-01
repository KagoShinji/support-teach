import React, { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { BookOpen, Key, Mail, ShieldAlert } from 'lucide-react';

interface AdminLoginProps {
  navigateTo: (path: string) => void;
}

export const AdminLogin = ({ navigateTo }: AdminLoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // If already authenticated and admin, redirect immediately
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsLoading(true);
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists() && userDoc.data().role === 'admin') {
            navigateTo('/admin');
          }
        } catch (err) {
          console.error("Auth check failed:", err);
        } finally {
          setIsLoading(false);
        }
      }
    });
    return () => unsubscribe();
  }, [navigateTo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Verify Admin Role in Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      
      if (userDoc.exists() && userDoc.data().role === 'admin') {
        navigateTo('/admin');
      } else {
        // Log them out if not admin
        await auth.signOut();
        setError("Unauthorized access. You do not have the Admin role assigned to this account in the database.");
      }
    } catch (err: any) {
      console.error("Login failed:", err);
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setError("Invalid email or password.");
      } else {
        setError(err.message || "Authentication failed.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-light bg-grid-pattern flex flex-col items-center justify-center p-6 relative">
      
      {/* Back button */}
      <button 
        onClick={() => navigateTo('/')}
        className="absolute top-8 left-8 bg-white border-[2px] border-black px-4 py-2 font-bold shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:-translate-x-0.5 active:translate-y-0 active:translate-x-0 cursor-pointer"
      >
        ← Back to Site
      </button>

      <div className="w-full max-w-md">
        {/* Brand Header */}
        <div className="flex items-center justify-center gap-2 mb-8 select-none">
          <div className="h-10 w-10 bg-[#FFD147] border-[2px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center -rotate-3">
            <BookOpen className="w-6 h-6 text-black" strokeWidth={2.5} />
          </div>
          <span className="font-dm text-3xl font-black tracking-tight text-black">
            Support<span className="text-[#21C57D] drop-shadow-[1px_1px_0px_rgba(0,0,0,1)]">Teach</span>
          </span>
        </div>

        {/* Login Card */}
        <Card className="p-8 bg-white border-[3px] border-black shadow-[8px_8px_0px_rgba(0,0,0,1)]">
          <div className="inline-block bg-[#FFD147] border-[2px] border-black text-black text-[12px] font-black uppercase tracking-wider px-3 py-1.5 rounded-none shadow-[2px_2px_0px_rgba(0,0,0,1)] mb-4 -rotate-1">
            Secure Entry
          </div>

          <h2 className="text-3xl font-dm font-black text-black mb-6">Admin Login</h2>

          {error && (
            <div className="bg-[#FF4747] text-black border-[2px] border-black p-3.5 mb-6 font-bold text-[14px] shadow-[3px_3px_0px_rgba(0,0,0,1)] flex gap-2.5 items-start">
              <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5 text-black" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-[13px] font-black text-black uppercase tracking-wider flex items-center gap-1.5">
                <Mail className="w-4 h-4" /> Email Address
              </label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className="w-full bg-gray-50 border-[2px] border-black rounded-none px-3.5 py-3 text-black focus:outline-none focus:ring-0 shadow-[3px_3px_0px_rgba(0,0,0,1)] transition-transform focus:-translate-y-0.5 focus:-translate-x-0.5 placeholder-gray-500 font-bold text-[15px]" 
                placeholder="admin@supportteach.com" 
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[13px] font-black text-black uppercase tracking-wider flex items-center gap-1.5">
                <Key className="w-4 h-4" /> Password
              </label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                className="w-full bg-gray-50 border-[2px] border-black rounded-none px-3.5 py-3 text-black focus:outline-none focus:ring-0 shadow-[3px_3px_0px_rgba(0,0,0,1)] transition-transform focus:-translate-y-0.5 focus:-translate-x-0.5 placeholder-gray-500 font-bold text-[15px]" 
                placeholder="••••••••" 
              />
            </div>

            <div className="pt-2">
              <Button 
                type="submit" 
                variant="primary" 
                disabled={isLoading}
                className="w-full justify-center text-[16px] py-3.5 shadow-[4px_4px_0px_rgba(0,0,0,1)] border-[2px] hover:-translate-y-0.5 hover:-translate-x-0.5 active:translate-y-0 active:translate-x-0 cursor-pointer font-black"
              >
                {isLoading ? "Signing in..." : "Enter Dashboard →"}
              </Button>
            </div>
          </form>
         </Card>
      </div>
    </div>
  );
};
