import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function SupportChat() {
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const [inputText, setInputText] = useState("");
  const [showScrollDown, setShowScrollDown] = useState(false);
  const scrollContainerRef = useRef(null);

  // Initial chat history exactly transcribing chats 1 through 6, followed by the refund request and resolution
  const [messages, setMessages] = useState([
    // --- October 27 (Chat 1 & 2) ---
    { id: 1, type: "date", text: "October 27" },
    {
      id: 2,
      sender: "ai",
      senderName: "Support • AI Agent",
      badge: "Munify",
      text: "Hi Rino! thanks for reaching out, I would love to assist you. Let me know how can I help you today?"
    },
    {
      id: 3,
      sender: "user",
      text: "contact support"
    },
    {
      id: 4,
      sender: "ai",
      senderName: "Support • AI Agent",
      badge: "Munify",
      text: "I'm here to help, Rino. Would you like me to connect you with a human agent? If not, tell me what you need help with and I'll continue assisting you."
    },
    {
      id: 5,
      sender: "user",
      text: "yes please"
    },
    {
      id: 6,
      sender: "ai",
      senderName: "Support • AI Agent",
      badge: "Munify",
      text: "I'll connect you with a human agent. Please share any details about what you need help with so we can better understand your request."
    },
    {
      id: 7,
      sender: "user",
      text: "I received a payment of 6,500€ and wasn't allowed to make withdrawals"
    },

    // --- October 28 (Chat 2, 3, 4, 5) ---
    { id: 8, type: "date", text: "October 28" },
    {
      id: 9,
      sender: "user",
      text: "hello"
    },
    {
      id: 10,
      sender: "user",
      text: "I submitted what was asked I need feedback"
    },
    {
      id: 11,
      sender: "user",
      text: "hello?"
    },
    {
      id: 12,
      type: "system",
      text: "Ahmed joined the conversation"
    },
    {
      id: 13,
      sender: "ahmed",
      senderName: "Ahmed • 6d ago",
      text: "Hi Rino, thanks for your patience, and sorry for the wait! | Your account is currently under review by our compliance team, which is why the withdrawal can't be processed."
    },
    {
      id: 14,
      sender: "ahmed",
      senderName: "Ahmed • 6d ago",
      text: "To move the review forward, please make sure you've replied to the email our compliance team sent you from compliancereporting@munify.ai with the information requested in it. If you've already replied there, thank you. Our compliance team will review it and get back to you by email. I'm not able to share a specific timeline, but I appreciate your patience while they complete the review.",
      hasEmail: true
    },
    {
      id: 15,
      sender: "user",
      text: "I've responded but no response it's over 48hrs"
    },
    {
      id: 16,
      sender: "user",
      text: "please help me tag the complete team on this is all I ask a possible reminder"
    },
    {
      id: 17,
      sender: "ahmed",
      senderName: "Ahmed • 6d ago",
      text: "I see , Am so sorry for the delay i will do a quick follow up for you as a reminder."
    },
    {
      id: 18,
      sender: "user",
      text: "please go ahead and escalate this and feed me back"
    },
    {
      id: 19,
      sender: "user",
      text: "and how do I get to contact you Ahmed"
    },
    {
      id: 20,
      sender: "user",
      text: "please give me your active mail or number let's talk privately"
    },
    {
      id: 21,
      sender: "ahmed",
      senderName: "Ahmed • 6d ago",
      text: "Through this conversation sir , i will keep you updated once there are any , Don't worry rest assured your case is being reviewed and your funds are safe."
    },
    {
      id: 22,
      sender: "user",
      text: "no duration regarding this?"
    },
    {
      id: 23,
      sender: "user",
      text: "why did it take more than 2 days to respond?"
    },
    {
      id: 24,
      sender: "user",
      text: "I just wanted to get your contact if possible email just in case the chat doesn't come up and delay further"
    },

    // --- October 29 (Chat 5) ---
    { id: 25, type: "date", text: "October 29" },
    {
      id: 26,
      sender: "user",
      text: "hello I want to know has the compliance team received the information yet? why no acknowledgement email yet?"
    },
    {
      id: 27,
      sender: "user",
      text: "Please I need proper response it's been 3 days"
    },
    {
      id: 28,
      sender: "user",
      text: "hello"
    },
    {
      id: 29,
      sender: "user",
      text: "I'm still yet to get feedback"
    },

    // --- October 30 (Chat 6) ---
    { id: 30, type: "date", text: "October 30" },
    {
      id: 31,
      sender: "user",
      text: "hello?"
    },

    // --- November 2 (Chat 6) ---
    { id: 32, type: "date", text: "November 2" },
    {
      id: 33,
      sender: "user",
      text: "please help out"
    },
    {
      id: 34,
      sender: "user",
      text: "I asked you for support you didn't respond"
    },

    // --- November 4 (Requested Refund Request & Customer Care Resolution) ---
    { id: 35, type: "date", text: "November 4" },
    {
      id: 36,
      sender: "user",
      text: "Since you guys are holding my funds and compliance is not responding, I can't keep waiting like this"
    },
    {
      id: 37,
      sender: "user",
      text: "please I want my money to be refunded back to the sender"
    },
    {
      id: 38,
      sender: "user",
      text: "I need the 6,500€ refunded back to DE DONDER-GEORGE immediately I can't wait on this compliance again"
    },
    {
      id: 39,
      sender: "user",
      text: "kindly process the refund back to the bank it came from please confirm"
    },
    {
      id: 40,
      sender: "ahmed",
      senderName: "Ahmed • Today",
      text: "Hi Rino, thanks for reaching out. We have heard your complaint and we've listened to you. We sincerely apologize for the frustration and prolonged delay you've experienced with this compliance review."
    },
    {
      id: 41,
      sender: "ahmed",
      senderName: "Ahmed • Today",
      text: "We have reviewed your request with our senior operations and compliance management, and we have officially approved and issued a refund of the 6,500.00 EUR back to the originating bank account (DE DONDER-GEORGE)."
    },
    {
      id: 42,
      sender: "ahmed",
      senderName: "Ahmed • Today",
      text: "Please note that the refund will take place between now to 90 days in accordance with standard international banking protocol and compliance clearance. You can view the pending refund transaction on your Payments tab under reference REF-6500-REV, and you will receive full email confirmation."
    },
    {
      id: 43,
      sender: "user",
      text: "okay thank you please make sure it doesn't take up to 90 days"
    },
    {
      id: 44,
      sender: "ahmed",
      senderName: "Ahmed • Just now",
      text: "You're very welcome, Rino. We have marked this case with highest priority to expedite it as quickly as possible. Rest assured the refund is officially initiated. Feel free to message here if you need any further updates."
    }
  ]);

  const scrollToBottom = (behavior = "smooth") => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior
      });
    }
  };

  useEffect(() => {
    scrollToBottom("auto");
    // Switch document and root background to pure white for chat screen
    const origBodyBg = document.body.style.backgroundColor;
    const rootEl = document.getElementById("root");
    const origRootBg = rootEl ? rootEl.style.backgroundColor : "";

    document.body.style.backgroundColor = "#ffffff";
    if (rootEl) rootEl.style.backgroundColor = "#ffffff";

    return () => {
      document.body.style.backgroundColor = origBodyBg || "#000000";
      if (rootEl) rootEl.style.backgroundColor = origRootBg || "#000000";
    };
  }, []);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
    if (scrollHeight - scrollTop - clientHeight > 150) {
      setShowScrollDown(true);
    } else {
      setShowScrollDown(false);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsgText = inputText.trim();
    setInputText("");

    const newMsg = {
      id: Date.now(),
      sender: "user",
      text: userMsgText
    };

    setMessages((prev) => [...prev, newMsg]);
    setTimeout(() => scrollToBottom("smooth"), 100);

    // Simulated Ahmed reply
    setTimeout(() => {
      const replyMsg = {
        id: Date.now() + 1,
        sender: "ahmed",
        senderName: "Ahmed • Just now",
        text: "Thank you for the message Rino. Our compliance and operations team is monitoring the 6,500.00 EUR refund to DE DONDER-GEORGE. Everything is set to settle between now and 90 days. We will notify you immediately once finalized."
      };
      setMessages((prev) => [...prev, replyMsg]);
      setTimeout(() => scrollToBottom("smooth"), 100);
    }, 1200);
  };

  return (
    <div
      style={{ backgroundColor: "#ffffff", color: "#111827" }}
      className="app-screen app-screen-light h-[100dvh] max-h-[100dvh] bg-white text-gray-900 flex flex-col overflow-hidden relative select-none shadow-2xl"
    >
      {/* Top Header - White clean UI matching screenshots 1.jpeg to 6.jpeg */}
      <header
        style={{ backgroundColor: "#ffffff" }}
        className="sticky top-0 z-30 bg-white border-b border-gray-100 px-4 py-2.5 flex items-center justify-between flex-shrink-0"
      >
        <div className="flex items-center gap-3">
          {/* Back Arrow Button */}
          <button
            onClick={() => navigate("/support")}
            className="p-1.5 -ml-1 text-gray-800 hover:text-black hover:bg-gray-100 rounded-full transition active:scale-95"
            title="Back to Support"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
          </button>

          {/* Avatar A */}
          <div className="w-9 h-9 rounded-full bg-[#544de8] text-white font-bold text-sm flex items-center justify-center flex-shrink-0 shadow-sm">
            A
          </div>

          {/* Name & Active Status */}
          <div className="flex flex-col">
            <span className="text-[16px] font-bold text-gray-900 leading-tight">
              Ahmed
            </span>
            <span className="text-[12px] text-gray-500 font-medium">
              Active 3h ago
            </span>
          </div>
        </div>
      </header>

      {/* Chat Messages Body */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        style={{ backgroundColor: "#ffffff" }}
        className="flex-1 overflow-y-auto px-4 py-4 space-y-3.5 scrollbar-hide pb-6 bg-white"
      >
        {messages.map((msg) => {
          // Date separator pill
          if (msg.type === "date") {
            return (
              <div key={msg.id} className="text-center my-3">
                <span className="bg-[#f0f2f5] text-gray-600 text-[12px] font-semibold px-4 py-1 rounded-full shadow-2xs">
                  {msg.text}
                </span>
              </div>
            );
          }

          // System event (Ahmed joined)
          if (msg.type === "system") {
            return (
              <div key={msg.id} className="flex items-center justify-center gap-2 my-3 text-center">
                <div className="w-5 h-5 rounded-full bg-[#f0f2f5] text-gray-700 text-[10px] font-bold flex items-center justify-center">
                  A
                </div>
                <span className="text-[12px] text-gray-500 font-medium">
                  {msg.text}
                </span>
              </div>
            );
          }

          // User message (Right-aligned indigo/purple bubble)
          if (msg.sender === "user") {
            return (
              <div key={msg.id} className="flex justify-end">
                <div className="max-w-[82%] bg-[#5452eb] text-white text-[14px] leading-relaxed px-4 py-2.5 rounded-[20px] rounded-br-sm shadow-2xs break-words font-sans">
                  {msg.text}
                </div>
              </div>
            );
          }

          // Support AI Agent message
          if (msg.sender === "ai") {
            return (
              <div key={msg.id} className="flex justify-start">
                <div className="max-w-[85%] bg-[#f1f3f5] rounded-[22px] rounded-tl-sm p-4 text-gray-900 shadow-2xs">
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="bg-[#48c73e] text-white text-[10px] font-black px-1.5 py-0.5 rounded-[5px] tracking-tight">
                      Munify
                    </span>
                    <span className="text-[12px] font-bold text-gray-900">
                      {msg.senderName}
                    </span>
                  </div>
                  <p className="text-[14px] text-gray-900 leading-relaxed font-sans">
                    {msg.text}
                  </p>
                </div>
              </div>
            );
          }

          // Support Human Agent (Ahmed) message
          if (msg.sender === "ahmed") {
            return (
              <div key={msg.id} className="flex justify-start">
                <div className="max-w-[85%] bg-[#f1f3f5] rounded-[22px] rounded-tl-sm p-4 text-gray-900 shadow-2xs">
                  <div className="flex items-center gap-1.5 mb-2">
                    <div className="w-5 h-5 rounded-full bg-[#544de8] text-white text-[10px] font-bold flex items-center justify-center">
                      A
                    </div>
                    <span className="text-[12px] font-bold text-gray-900">
                      {msg.senderName}
                    </span>
                  </div>
                  <div className="text-[14px] text-gray-900 leading-relaxed font-sans space-y-2">
                    {msg.hasEmail ? (
                      <p>
                        To move the review forward, please make sure you've replied to the email our compliance team sent you from{" "}
                        <span className="text-[#3b82f6] underline font-medium cursor-pointer">
                          compliancereporting@munify.ai
                        </span>{" "}
                        with the information requested in it. If you've already replied there, thank you. Our compliance team will review it and get back to you by email. I'm not able to share a specific timeline, but I appreciate your patience while they complete the review.
                      </p>
                    ) : (
                      <p>{msg.text}</p>
                    )}
                  </div>
                </div>
              </div>
            );
          }

          return null;
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Floating Scroll-Down Chevron Button (seen in 1.jpeg, 2.jpeg, etc.) */}
      {showScrollDown && (
        <button
          onClick={() => scrollToBottom("smooth")}
          className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 w-9 h-9 rounded-full bg-white shadow-[0_4px_16px_rgba(0,0,0,0.15)] border border-gray-200 flex items-center justify-center text-gray-700 hover:text-black active:scale-95 transition animate-in fade-in"
          title="Scroll to bottom"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      )}

      {/* Bottom Message Input Bar matching screenshot */}
      <div
        style={{ backgroundColor: "#ffffff" }}
        className="sticky bottom-0 z-20 bg-white border-t border-gray-200 px-3 py-2.5 pb-[max(12px,env(safe-area-inset-bottom,12px))] flex items-center gap-2 mt-auto w-full flex-shrink-0"
      >
        <form onSubmit={handleSendMessage} className="flex-1 flex items-center bg-[#f3f4f6] rounded-full px-4 py-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Message..."
            className="flex-1 bg-transparent text-[14px] text-gray-900 placeholder-gray-500 outline-none"
          />

          <div className="flex items-center gap-2 ml-2">
            <button
              type="button"
              className="text-gray-500 hover:text-gray-700 text-xs font-bold px-1.5 py-0.5 rounded border border-gray-300"
            >
              GIF
            </button>
            <button
              type="button"
              className="text-gray-500 hover:text-gray-700 p-0.5"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
          </div>
        </form>

        {inputText.trim() && (
          <button
            onClick={handleSendMessage}
            className="w-10 h-10 rounded-full bg-[#5452eb] text-white flex items-center justify-center shadow-md active:scale-95 transition flex-shrink-0"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 translate-x-0.5">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}