import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { ShieldCheck, Mail, Key, Code, HelpCircle } from 'lucide-react';

interface AdminRegisterProps {
  navigateTo: (path: string) => void;
}

export const AdminRegister = ({ navigateTo }: AdminRegisterProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [createdUid, setCreatedUid] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Validate access code
    // In production, roles are set securely via firebase rules / console.
    // For this dashboard, we accept "TEACHTEAM2026" or empty (pending console manual role setup)
    const isCodeValid = accessCode.trim() === 'TEACHTEAM2026';

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      setCreatedUid(user.uid);

      // Create document in users collection
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        role: isCodeValid ? 'admin' : 'pending_admin',
        createdAt: new Date().toISOString()
      });

      setSuccess(true);
      setError(null);
    } catch (err: any) {
      console.error("Registration failed:", err);
      if (err.code === 'auth/email-already-in-use') {
        setError("This email address is already in use.");
      } else if (err.code === 'auth/weak-password') {
        setError("Password is too weak. Make it at least 6 characters.");
      } else {
        setError(err.message || "An error occurred during registration.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-light bg-grid-pattern flex flex-col items-center justify-center p-6 relative">
      
      {/* Back to Login */}
      <button 
        onClick={() => navigateTo('/admin/login')}
        className="absolute top-8 left-8 bg-white border-[2px] border-black px-4 py-2 font-bold shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:-translate-x-0.5 active:translate-y-0 active:translate-x-0 cursor-pointer"
      >
        ← Back to Login
      </button>

      <div className="w-full max-w-lg">
        <Card className="p-8 bg-white border-[3px] border-black shadow-[8px_8px_0px_rgba(0,0,0,1)]">
          
          <div className="flex items-center gap-2 mb-6">
            <div className="h-10 w-10 bg-[#21C57D] border-[2px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center -rotate-3">
              <ShieldCheck className="w-6 h-6 text-black" strokeWidth={2.5} />
            </div>
            <span className="font-dm text-2xl font-black tracking-tight text-black">
              Register Admin Account
            </span>
          </div>

          {success ? (
            <div className="space-y-6">
              <div className="bg-[#21C57D]/20 text-black border-[2px] border-[#21C57D] p-5 font-bold text-[15px] shadow-[4px_4px_0px_rgba(33,197,125,0.4)]">
                <h4 className="text-lg font-black mb-2 text-black">✓ Account Created Successfully!</h4>
                <p className="text-[14px] font-bold text-gray-800 leading-relaxed mb-4">
                  Your account UID is: <code className="bg-white/80 px-1.5 py-0.5 border border-black font-mono text-[13px]">{createdUid}</code>
                </p>
                {accessCode.trim() === 'TEACHTEAM2026' ? (
                  <p className="text-[14px] text-gray-900">
                    You used a valid registration code. Your role has been set to **admin**. You can now log in directly!
                  </p>
                ) : (
                  <div className="bg-white p-4 border-[2px] border-black text-black space-y-3 shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                    <p className="text-[13px] leading-relaxed">
                      ⚠️ **Activate Admin Access (Required):**
                    </p>
                    <ol className="list-decimal list-inside text-[13px] text-gray-700 space-y-1 font-medium">
                      <li>Go to your **Firebase Console**.</li>
                      <li>Open **Cloud Firestore**.</li>
                      <li>Locate the collection named <code className="font-mono bg-gray-100 font-bold px-1 text-black">users</code>.</li>
                      <li>Select the document matching your UID: <code className="font-mono bg-gray-100 font-bold px-1 text-black">{createdUid}</code>.</li>
                      <li>Change the value of the field <code className="font-mono bg-gray-100 font-bold px-1 text-black">role</code> from <code className="font-mono text-red-500 font-bold">"pending_admin"</code> to <code className="font-mono text-[#21C57D] font-bold">"admin"</code>.</li>
                    </ol>
                  </div>
                )}
              </div>

              <Button 
                onClick={() => navigateTo('/admin/login')}
                variant="primary"
                className="w-full justify-center shadow-[3px_3px_0px_rgba(0,0,0,1)] py-3 font-black"
              >
                Go to Login Screen →
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-[#FF4747] text-black border-[2px] border-black p-3.5 font-bold text-[14px] shadow-[3px_3px_0px_rgba(0,0,0,1)]">
                  {error}
                </div>
              )}

              <div className="space-y-1">
                <label className="text-[12px] font-black text-black uppercase tracking-wider flex items-center gap-1.5">
                  <Mail className="w-4 h-4" /> Email Address
                </label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  className="w-full bg-gray-50 border-[2px] border-black rounded-none px-3.5 py-2.5 text-black focus:outline-none focus:ring-0 shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-transform focus:-translate-y-0.5 focus:-translate-x-0.5 placeholder-gray-500 font-bold text-[14px]" 
                  placeholder="admin@supportteach.com" 
                />
              </div>

              <div className="space-y-1">
                <label className="text-[12px] font-black text-black uppercase tracking-wider flex items-center gap-1.5">
                  <Key className="w-4 h-4" /> Password
                </label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  className="w-full bg-gray-50 border-[2px] border-black rounded-none px-3.5 py-2.5 text-black focus:outline-none focus:ring-0 shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-transform focus:-translate-y-0.5 focus:-translate-x-0.5 placeholder-gray-500 font-bold text-[14px]" 
                  placeholder="At least 6 characters" 
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="text-[12px] font-black text-black uppercase tracking-wider flex items-center gap-1.5">
                    <Code className="w-4 h-4" /> Admin Access Code (Optional)
                  </label>
                  <span className="text-[10px] text-gray-500 font-bold">Use "TEACHTEAM2026" for instant access</span>
                </div>
                <input 
                  type="text" 
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  disabled={isLoading}
                  className="w-full bg-gray-50 border-[2px] border-black rounded-none px-3.5 py-2.5 text-black focus:outline-none focus:ring-0 shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-transform focus:-translate-y-0.5 focus:-translate-x-0.5 placeholder-gray-500 font-bold text-[14px]" 
                  placeholder="Enter code if you have one" 
                />
              </div>

              <div className="bg-blue-50 border-[2px] border-black p-3.5 text-black font-bold text-[13px] shadow-[2px_2px_0px_rgba(0,0,0,1)] flex gap-2.5">
                <HelpCircle className="w-5 h-5 shrink-0 text-black mt-0.5" />
                <p className="leading-relaxed">
                  If you leave the Access Code blank, your account will be created in **pending mode**. You can elevate it to admin manually via your Firestore Console at any time.
                </p>
              </div>

              <div className="pt-2">
                <Button 
                  type="submit" 
                  variant="primary" 
                  disabled={isLoading}
                  className="w-full justify-center text-[15px] py-3 shadow-[3px_3px_0px_rgba(0,0,0,1)] border-[2px] hover:-translate-y-0.5 hover:-translate-x-0.5 active:translate-y-0 active:translate-x-0 cursor-pointer font-black"
                >
                  {isLoading ? "Creating Account..." : "Create Account ✓"}
                </Button>
              </div>
            </form>
          )}

          <div className="mt-6 text-center">
            <button 
              onClick={() => navigateTo('/admin/login')}
              className="text-[13px] font-black underline hover:text-[#21C57D] cursor-pointer"
            >
              Already have an account? Sign in
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};
