import React, { useState, useEffect } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { collection, addDoc, query, where, getDocs, serverTimestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Calendar, Clock, Check, Copy } from 'lucide-react';

interface BookCallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TIME_SLOTS = [
  "09:00 AM", "10:00 AM", "11:00 AM",
  "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"
];

export const BookCallModal = ({ isOpen, onClose }: BookCallModalProps) => {
  const [step, setStep] = useState(1);
  const [dates, setDates] = useState<{ value: string; label: string; day: string }[]>([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    description: ''
  });

  // Generate next 10 business days
  useEffect(() => {
    const list: typeof dates = [];
    let current = new Date();

    // Add time zone offset or use local time
    while (list.length < 10) {
      // Increment date
      current.setDate(current.getDate() + 1);
      const day = current.getDay();

      // Skip Saturday (6) and Sunday (0)
      if (day !== 0 && day !== 6) {
        const value = current.toISOString().split('T')[0];
        const label = current.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        const dayName = current.toLocaleDateString('en-US', { weekday: 'short' });
        list.push({ value, label, day: dayName });
      }
    }
    setDates(list);
    if (list.length > 0) {
      setSelectedDate(list[0].value);
    }
  }, []);

  // Fetch booked slots for the selected date
  useEffect(() => {
    if (!selectedDate || !isOpen) return;

    const fetchBookings = async () => {
      setIsLoadingSlots(true);
      try {
        const q = query(
          collection(db, 'bookings'),
          where('date', '==', selectedDate),
          where('status', '==', 'scheduled')
        );
        const snapshot = await getDocs(q);
        const slots: string[] = [];
        snapshot.forEach(doc => {
          const data = doc.data();
          if (data.time) slots.push(data.time);
        });
        setBookedSlots(slots);
      } catch (err) {
        console.error("Error fetching booked slots:", err);
      } finally {
        setIsLoadingSlots(false);
      }
    };

    fetchBookings();
  }, [selectedDate, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) {
      setError("Please select a date and time slot.");
      return;
    }
    setError(null);
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const docRef = await addDoc(collection(db, 'bookings'), {
        ...formData,
        date: selectedDate,
        time: selectedTime,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        status: 'scheduled',
        createdAt: serverTimestamp()
      });
      setBookingId(docRef.id);
      setStep(3);
    } catch (err) {
      console.error("Error scheduling booking:", err);
      setError("Failed to create booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyLink = () => {
    if (!bookingId) return;
    const url = `${window.location.origin}/call/${bookingId}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClose = () => {
    onClose();
    // Reset state after close animation
    setTimeout(() => {
      setStep(1);
      setSelectedTime('');
      setBookingId(null);
      setError(null);
      setFormData({
        name: '',
        email: '',
        phone: '',
        description: ''
      });
    }, 300);
  };

  // Render Step 1: Date & Time Picker
  const renderStep1 = () => (
    <form onSubmit={handleNext} className="space-y-6">
      {error && (
        <div className="bg-[#FF4747] text-black border-[2px] border-black p-3 font-bold text-[14px] shadow-[2px_2px_0px_rgba(0,0,0,1)]">
          {error}
        </div>
      )}

      {/* Date list */}
      <div className="space-y-2">
        <label className="text-[13px] font-black text-black uppercase tracking-wider flex items-center gap-1.5">
          <Calendar className="w-4 h-4" /> Select a Date
        </label>
        <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-black">
          {dates.map((d) => (
            <button
              key={d.value}
              type="button"
              onClick={() => {
                setSelectedDate(d.value);
                setSelectedTime('');
              }}
              className={`flex-shrink-0 flex flex-col items-center justify-center p-3 border-[2px] border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] transition-all cursor-pointer ${selectedDate === d.value
                  ? 'bg-[#FFD147] -translate-y-0.5 -translate-x-0.5 shadow-[4px_4px_0px_rgba(0,0,0,1)]'
                  : 'bg-white hover:bg-gray-50 hover:-translate-y-0.5 hover:-translate-x-0.5'
                }`}
            >
              <span className="text-[11px] font-bold text-gray-500 uppercase">{d.day}</span>
              <span className="text-[16px] font-black text-black mt-0.5">{d.label.split(' ')[1]}</span>
              <span className="text-[10px] font-bold text-gray-600">{d.label.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Time slots */}
      <div className="space-y-2">
        <label className="text-[13px] font-black text-black uppercase tracking-wider flex items-center gap-1.5">
          <Clock className="w-4 h-4" /> Select an Available Time (Local Time)
        </label>

        {isLoadingSlots ? (
          <div className="py-6 text-center text-gray-600 font-bold">Checking availability...</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {TIME_SLOTS.map((t) => {
              const isBooked = bookedSlots.includes(t);
              return (
                <button
                  key={t}
                  type="button"
                  disabled={isBooked}
                  onClick={() => setSelectedTime(t)}
                  className={`py-3 border-[2px] border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] font-bold text-[14px] transition-all cursor-pointer ${isBooked
                      ? 'bg-gray-200 text-gray-400 border-gray-400 cursor-not-allowed shadow-none'
                      : selectedTime === t
                        ? 'bg-[#21C57D] text-black -translate-y-0.5 -translate-x-0.5 shadow-[4px_4px_0px_rgba(0,0,0,1)] font-black'
                        : 'bg-white text-black hover:bg-gray-50 hover:-translate-y-0.5 hover:-translate-x-0.5'
                    }`}
                >
                  {t}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="pt-4 border-t-2 border-black flex justify-between items-center bg-gray-50 -mx-6 -mb-6 p-6">
        <div className="text-left">
          <span className="text-[12px] font-bold text-gray-500 block">SELECTED SLOT</span>
          <span className="text-[14px] font-black text-black">
            {selectedDate && selectedTime
              ? `${dates.find(d => d.value === selectedDate)?.day}, ${dates.find(d => d.value === selectedDate)?.label} @ ${selectedTime}`
              : "None selected"
            }
          </span>
        </div>
        <Button
          type="submit"
          variant="primary"
          disabled={!selectedDate || !selectedTime || isLoadingSlots}
          className="shadow-[3px_3px_0px_rgba(0,0,0,1)]"
        >
          Next Step →
        </Button>
      </div>
    </form>
  );

  // Render Step 2: Contact Details Form
  const renderStep2 = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-[#FF4747] text-black border-[2px] border-black p-3 font-bold text-[14px] shadow-[2px_2px_0px_rgba(0,0,0,1)]">
          {error}
        </div>
      )}

      <div className="space-y-1">
        <label className="text-[12px] font-black text-black uppercase tracking-wider">Your Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full bg-gray-50 border-[2px] border-black rounded-none px-3 py-2.5 text-black focus:outline-none focus:ring-0 shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-transform focus:-translate-y-0.5 focus:-translate-x-0.5 placeholder-gray-500 font-bold text-[14px]"
          placeholder="Contact Name"
          required
          disabled={isSubmitting}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-[12px] font-black text-black uppercase tracking-wider">Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-gray-50 border-[2px] border-black rounded-none px-3 py-2.5 text-black focus:outline-none focus:ring-0 shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-transform focus:-translate-y-0.5 focus:-translate-x-0.5 placeholder-gray-500 font-bold text-[14px]"
            placeholder="name@organization.com"
            required
            disabled={isSubmitting}
          />
        </div>
        <div className="space-y-1">
          <label className="text-[12px] font-black text-black uppercase tracking-wider">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full bg-gray-50 border-[2px] border-black rounded-none px-3 py-2.5 text-black focus:outline-none focus:ring-0 shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-transform focus:-translate-y-0.5 focus:-translate-x-0.5 placeholder-gray-500 font-bold text-[14px]"
            placeholder="+1 (555) 000-0000"
            required
            disabled={isSubmitting}
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-[12px] font-black text-black uppercase tracking-wider">Briefly, what is the goal of this call?</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="w-full bg-gray-50 border-[2px] border-black rounded-none px-3 py-2.5 text-black focus:outline-none focus:ring-0 shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-transform focus:-translate-y-0.5 focus:-translate-x-0.5 resize-none placeholder-gray-500 font-bold text-[14px]"
          placeholder="E.g., Review curriculum outline, map assessments..."
          required
          disabled={isSubmitting}
        ></textarea>
      </div>

      <div className="pt-4 border-t-2 border-black flex justify-between items-center bg-gray-50 -mx-6 -mb-6 p-6">
        <button
          type="button"
          onClick={() => setStep(1)}
          disabled={isSubmitting}
          className="text-[14px] font-black underline text-black cursor-pointer hover:opacity-80"
        >
          ← Change Time
        </button>
        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting}
          className="shadow-[3px_3px_0px_rgba(0,0,0,1)]"
        >
          {isSubmitting ? "Booking..." : "Schedule Call ✓"}
        </Button>
      </div>
    </form>
  );

  // Render Step 3: Success & Share Booking Link
  const renderStep3 = () => {
    const formattedDate = dates.find(d => d.value === selectedDate);
    const callUrl = `${window.location.origin}/call/${bookingId}`;
    return (
      <div className="space-y-6 text-center">
        <div className="w-20 h-20 bg-[#21C57D] border-[3px] border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] mx-auto flex items-center justify-center -rotate-3 mb-4">
          <Check className="w-12 h-12 text-black" strokeWidth={3} />
        </div>

        <h3 className="text-2xl font-dm font-black text-black">Call Successfully Booked!</h3>

        <div className="p-4 bg-gray-50 border-[2px] border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] text-left space-y-2">
          <div className="flex justify-between border-b border-black/10 pb-2">
            <span className="font-bold text-gray-500 text-[13px]">DATE</span>
            <span className="font-black text-black text-[14px]">{formattedDate?.day}, {formattedDate?.label}</span>
          </div>
          <div className="flex justify-between border-b border-black/10 pb-2">
            <span className="font-bold text-gray-500 text-[13px]">TIME</span>
            <span className="font-black text-black text-[14px]">{selectedTime} ({Intl.DateTimeFormat().resolvedOptions().timeZone})</span>
          </div>
          <div className="flex justify-between">
            <span className="font-bold text-gray-500 text-[13px]">CONTACT</span>
            <span className="font-black text-black text-[14px]">{formData.name}</span>
          </div>
        </div>

        <div className="space-y-2 text-left">
          <label className="text-[12px] font-black text-black uppercase tracking-wider">Your Live Video Call Room Link</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={callUrl}
              className="flex-1 bg-gray-50 border-[2px] border-black px-3 py-2 text-gray-700 font-mono text-[13px] overflow-x-auto select-all focus:outline-none"
            />
            <button
              onClick={copyLink}
              className="bg-[#FFD147] border-[2px] border-black p-2 shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:-translate-x-0.5 active:translate-y-0 active:translate-x-0 transition-all cursor-pointer"
              title="Copy link"
            >
              <Copy className="w-5 h-5 text-black" strokeWidth={2.5} />
            </button>
          </div>
          {copied && (
            <span className="text-[12px] font-bold text-[#21C57D] block">Link copied to clipboard!</span>
          )}
          <p className="text-gray-600 text-[13px] font-medium leading-relaxed mt-2">
            Save this link! At the scheduled time, open this link in your browser to start the video meeting. No account required.
          </p>
        </div>

        <div className="pt-4 border-t-2 border-black flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            className="flex-1 shadow-[2px_2px_0px_rgba(0,0,0,1)]"
          >
            Close
          </Button>
          <a href={`/call/${bookingId}`} className="flex-1">
            <Button
              type="button"
              variant="primary"
              className="w-full shadow-[2px_2px_0px_rgba(0,0,0,1)]"
            >
              Join Room →
            </Button>
          </a>
        </div>
      </div>
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={step === 1 ? "Schedule a Call" : step === 2 ? "Provide Details" : ""}
    >
      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}
      {step === 3 && renderStep3()}
    </Modal>
  );
};
