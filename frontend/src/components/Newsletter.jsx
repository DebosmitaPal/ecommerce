// import React, { useState } from 'react';
// import { Mail, Send, CheckCircle, Gift, Bell, Sparkles } from 'lucide-react';

// const Newsletter = () => {
//   const [email, setEmail] = useState('');
//   const [isSubscribed, setIsSubscribed] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = () => {
//     if (email) {
//       setIsLoading(true);
//       setTimeout(() => {
//         setIsLoading(false);
//         setIsSubscribed(true);
//         setEmail('');
//         setTimeout(() => setIsSubscribed(false), 5000);
//       }, 1500);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       handleSubmit();
//     }
//   };

//   return (
//     <section className="relative py-20 px-6 overflow-hidden bg-gradient-to-br from-stone-50 via-amber-50/30 to-rose-50/40">
//       {/* Background Decorative Elements */}
//       <div className="absolute top-0 left-0 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl" />
//       <div className="absolute bottom-0 right-0 w-96 h-96 bg-rose-200/20 rounded-full blur-3xl" />
      
//       {/* Pattern Overlay */}
//       <div className="absolute inset-0 opacity-5">
//         <div className="absolute inset-0" style={{
//           backgroundImage: `radial-gradient(circle at 2px 2px, rgba(139, 92, 61, 0.15) 1px, transparent 0)`,
//           backgroundSize: '40px 40px'
//         }} />
//       </div>

//       <div className="relative max-w-6xl mx-auto">
//         <div className="bg-white/60 backdrop-blur-sm border border-stone-200/50 rounded-3xl shadow-xl overflow-hidden">
//           <div className="grid md:grid-cols-2 gap-0">
            
//             {/* Left Side - Content */}
//             <div className="p-12 flex flex-col justify-center">
//               {/* Icon Badge */}
//               <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100/80 border border-amber-200/50 w-fit mb-6">
//                 <Mail className="w-4 h-4 text-amber-700" strokeWidth={1.5} />
//                 <span className="text-xs uppercase tracking-widest text-amber-900 font-light" style={{fontFamily: 'Georgia, serif'}}>
//                   Newsletter
//                 </span>
//               </div>

//               {/* Heading */}
//               <h2 className="text-4xl md:text-5xl mb-4 text-stone-700" style={{
//                 fontFamily: 'Georgia, Garamond, serif',
//                 fontWeight: '400',
//                 letterSpacing: '-0.02em'
//               }}>
//                 Stay in the Loop
//               </h2>

//               {/* Decorative Line */}
//               <div className="flex items-center gap-3 mb-6">
//                 <div className="h-px w-12 bg-gradient-to-r from-amber-300 to-transparent" />
//                 <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
//               </div>

//               {/* Description */}
//               <p className="text-lg text-stone-600 mb-8" style={{
//                 fontFamily: 'Georgia, serif',
//                 fontWeight: '300',
//                 fontStyle: 'italic'
//               }}>
//                 Subscribe to receive exclusive offers, style inspiration, and be the first to know about new arrivals.
//               </p>

//               {/* Benefits List */}
//               <div className="space-y-4 mb-8">
//                 {[
//                   { icon: Gift, text: 'Get 15% off your first order' },
//                   { icon: Bell, text: 'Early access to sales & events' },
//                   { icon: Sparkles, text: 'Curated style tips & trends' }
//                 ].map((benefit, index) => (
//                   <div key={index} className="flex items-center gap-3">
//                     <div className="w-8 h-8 rounded-full bg-amber-100/80 flex items-center justify-center">
//                       <benefit.icon className="w-4 h-4 text-amber-700" strokeWidth={1.5} />
//                     </div>
//                     <span className="text-stone-600 font-light">{benefit.text}</span>
//                   </div>
//                 ))}
//               </div>

//               {/* Input Section */}
//               {!isSubscribed ? (
//                 <div className="relative">
//                   <div className="relative">
//                     <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" strokeWidth={1.5} />
//                     <input
//                       type="email"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       onKeyPress={handleKeyPress}
//                       placeholder="Enter your email address"
//                       className="w-full pl-14 pr-36 py-4 rounded-full border border-stone-300 bg-white/80 backdrop-blur-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-200/50 transition-all duration-300 text-stone-700"
//                       style={{fontFamily: 'Georgia, serif'}}
//                     />
//                     <button
//                       onClick={handleSubmit}
//                       disabled={isLoading}
//                       className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2.5 bg-gradient-to-r from-amber-400 to-rose-400 text-white rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
//                       style={{fontFamily: 'Georgia, serif', letterSpacing: '0.05em'}}
//                     >
//                       {isLoading ? (
//                         <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                       ) : (
//                         <>
//                           Subscribe
//                           <Send className="w-4 h-4" strokeWidth={1.5} />
//                         </>
//                       )}
//                     </button>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-full animate-fadeIn">
//                   <CheckCircle className="w-6 h-6 text-green-600" />
//                   <span className="text-green-700 font-light" style={{fontFamily: 'Georgia, serif'}}>
//                     Thank you for subscribing! Check your inbox.
//                   </span>
//                 </div>
//               )}

//               {/* Privacy Note */}
//               <p className="text-xs text-stone-500 mt-4 font-light">
//                 We respect your privacy. Unsubscribe at any time.
//               </p>
//             </div>

//             {/* Right Side - Image */}
//             <div className="relative h-full min-h-[400px] md:min-h-[600px]">
//               <img
//                 src="/images/bags.avif"
//                 alt="Newsletter"
//                 className="absolute inset-0 w-full h-full object-cover"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-amber-900/20 to-transparent" />
              
//               {/* Floating Badge */}
//               <div className="absolute bottom-8 left-8 right-8 p-6 bg-white/90 backdrop-blur-md rounded-2xl border border-stone-200/50 shadow-lg">
//                 <div className="flex items-center gap-4">
//                   <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-rose-400 flex items-center justify-center">
//                     <Gift className="w-6 h-6 text-white" strokeWidth={1.5} />
//                   </div>
//                   <div>
//                     <p className="font-light text-stone-700 mb-1" style={{fontFamily: 'Georgia, serif'}}>
//                       Welcome Gift
//                     </p>
//                     <p className="text-2xl text-stone-800" style={{
//                       fontFamily: 'Georgia, serif',
//                       fontWeight: '400'
//                     }}>
//                       15% OFF
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Bottom Stats */}
//         <div className="mt-12 grid grid-cols-3 gap-8 max-w-3xl mx-auto">
//           {[
//             { number: '50K+', label: 'Happy Subscribers' },
//             { number: '100%', label: 'Spam Free' },
//             { number: 'Weekly', label: 'New Updates' }
//           ].map((stat, index) => (
//             <div key={index} className="text-center">
//               <p className="text-3xl text-stone-700 mb-2" style={{
//                 fontFamily: 'Georgia, serif',
//                 fontWeight: '400'
//               }}>
//                 {stat.number}
//               </p>
//               <p className="text-sm text-stone-500 font-light uppercase tracking-wider">
//                 {stat.label}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//             transform: scale(0.95);
//           }
//           to {
//             opacity: 1;
//             transform: scale(1);
//           }
//         }
//         .animate-fadeIn {
//           animation: fadeIn 0.5s ease-out;
//         }
//       `}</style>
//     </section>
//   );
// };

// export default Newsletter;


import React, { useState } from "react";
import { Mail, Send, CheckCircle, Gift, Bell, Sparkles } from "lucide-react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!email) return;

    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Subscription failed");

      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 5000);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <section className="relative py-20 px-6 overflow-hidden bg-gradient-to-br from-stone-50 via-amber-50/30 to-rose-50/40">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-rose-200/20 rounded-full blur-3xl" />

      {/* Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, rgba(139,92,61,0.15) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto">
        <div className="bg-white/60 backdrop-blur-sm border border-stone-200/50 rounded-3xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            {/* LEFT SIDE */}
            <div className="p-12 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100/80 border border-amber-200/50 w-fit mb-6">
                <Mail className="w-4 h-4 text-amber-700" />
                <span className="text-xs uppercase tracking-widest text-amber-900 font-light">
                  Newsletter
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl mb-4 text-stone-700">
                Stay in the Loop
              </h2>

              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-12 bg-gradient-to-r from-amber-300 to-transparent" />
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              </div>

              <p className="text-lg text-stone-600 mb-8 italic">
                Subscribe to receive exclusive offers, style inspiration, and be
                the first to know about new arrivals.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  { icon: Gift, text: "Get 15% off your first order" },
                  { icon: Bell, text: "Early access to sales & events" },
                  { icon: Sparkles, text: "Curated style tips & trends" },
                ].map((b, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-amber-100/80 flex items-center justify-center">
                      <b.icon className="w-4 h-4 text-amber-700" />
                    </div>
                    <span className="text-stone-600 font-light">
                      {b.text}
                    </span>
                  </div>
                ))}
              </div>

              {!isSubscribed ? (
                <div className="relative">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter your email address"
                    className="w-full pl-14 pr-36 py-4 rounded-full border border-stone-300"
                  />
                  <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2.5 bg-gradient-to-r from-amber-400 to-rose-400 text-white rounded-full flex items-center gap-2"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        Subscribe <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-full animate-fadeIn">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <span className="text-green-700">
                    Thank you for subscribing! Check your inbox.
                  </span>
                </div>
              )}

              {error && (
                <p className="text-red-600 mt-3 text-sm">{error}</p>
              )}

              <p className="text-xs text-stone-500 mt-4 font-light">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>

            {/* RIGHT SIDE IMAGE + FLOATING BADGE */}
            <div className="relative h-full min-h-[400px] md:min-h-[600px]">
              <img
                src="/images/bags.avif"
                alt="Newsletter"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-amber-900/20 to-transparent" />

              {/* FLOATING BADGE (UNCHANGED) */}
              <div className="absolute bottom-8 left-8 right-8 p-6 bg-white/90 backdrop-blur-md rounded-2xl border border-stone-200/50 shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-rose-400 flex items-center justify-center">
                    <Gift className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-stone-700 mb-1">Welcome Gift</p>
                    <p className="text-2xl text-stone-800">15% OFF</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM STATS (UNCHANGED) */}
        <div className="mt-12 grid grid-cols-3 gap-8 max-w-3xl mx-auto">
          {[
            { number: "50K+", label: "Happy Subscribers" },
            { number: "100%", label: "Spam Free" },
            { number: "Weekly", label: "New Updates" },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <p className="text-3xl text-stone-700 mb-2">{s.number}</p>
              <p className="text-sm text-stone-500 uppercase tracking-wider">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
