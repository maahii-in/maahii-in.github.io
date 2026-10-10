import { useState, useRef, useEffect, useCallback } from "react";
import {
  Send,
  X,
  User,
  Minimize2,
  Maximize2,
  Loader2,
  Loader,
} from "lucide-react";

// Add global style for body when chat is open
const styleElement = document.createElement("style");
styleElement.textContent = `
  body.chat-open {
    overflow: hidden;
  }
  
  /* Improve mobile scrolling performance */
  @media (max-width: 768px) {
    .chat-container {
      -webkit-overflow-scrolling: touch;
      scroll-behavior: smooth;
      will-change: scroll-position;
    }
    
    /* Reduce scroll bounce on iOS */
    .chat-container::-webkit-scrollbar {
      display: none;
    }
  }
`;

const pulseAnimation = `
  @keyframes pulse-border {
    0% {
      box-shadow: 0 0 0 0 rgba(96, 165, 250, 0.7);
    }
    70% {
      box-shadow: 0 0 0 10px rgba(96, 165, 250, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(96, 165, 250, 0);
    }
  }
  .pulse-animate {
    animation: pulse-border 2s infinite;
  }
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = pulseAnimation;
document.head.appendChild(styleSheet);

document.head.appendChild(styleElement);

interface Message {
  id: string;
  text: string;
  sender: "user" | "assistant";
  timestamp: Date;

}

const QUICK_QUESTIONS = [
  "What are his core skills?",
  "Tell me about his projects",
  "How to contact him?",
  "Does he have experience with React?",
  "What is his educational background?",
  "Show me his best work",
];

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => {
    if (typeof window !== "undefined") {
      const savedMessages = localStorage.getItem("ai-assistant-messages");
      if (savedMessages) {
        // Parse date strings back to Date objects
        return JSON.parse(savedMessages, (key, value) => {
          if (key === "timestamp") return new Date(value);
          return value;
        });
      }
    }
    return [];
  });
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(false);
  const [showWelcomeNotification, setShowWelcomeNotification] = useState(false);
  const [notificationShown, setNotificationShown] = useState(false);
  const [userHasScrolledUp, setUserHasScrolledUp] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const lastScrollTop = useRef<number>(0);

  const scrollToBottom = useCallback(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 50;

    // Only auto-scroll if user is at the bottom AND hasn't manually scrolled up
    if (isAtBottom && !userHasScrolledUp) {
      container.scrollTo({
        top: scrollHeight,
        behavior: "smooth",
      });
    }
  }, [userHasScrolledUp]);



  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("ai-assistant-messages", JSON.stringify(messages));
    }
  }, [messages]);

  useEffect(() => {
    // Check if welcome notification was already shown in this session
    const hasShownInSession = sessionStorage.getItem("ai-assistant-welcome-shown");

    if (!notificationShown && !hasShownInSession) {
      const timer = setTimeout(() => {
        if (!isOpen) {
          setShowWelcomeNotification(true);
          sessionStorage.setItem("ai-assistant-welcome-shown", "true");
        }
      }, 1500); // Show notification after 1.5 second

      return () => clearTimeout(timer);
    }
  }, [isOpen, notificationShown]);

  useEffect(() => {
    // Only auto-scroll if user hasn't manually scrolled up
    if (!userHasScrolledUp) {
      const timeoutId = setTimeout(scrollToBottom, 50);
      return () => clearTimeout(timeoutId);
    }
  }, [messages, userHasScrolledUp, scrollToBottom]);

  useEffect(() => {
    // Only focus input on desktop devices to avoid keyboard popup on mobile
    if (
      isOpen &&
      !isMinimized &&
      inputRef.current &&
      window.innerWidth >= 768
    ) {
      inputRef.current.focus();
    }

    // Prevent body scroll when chat is open
    if (isOpen && !isMinimized) {
      document.body.classList.add("chat-open");
    } else {
      document.body.classList.remove("chat-open");
    }

    return () => {
      document.body.classList.remove("chat-open");
    };
  }, [isOpen, isMinimized]);

  // Optimize scrolling for better mobile experience and detect manual scrolling
  useEffect(() => {
    const messagesContainer = messagesContainerRef.current;
    if (!messagesContainer || isMinimized || !isOpen) return;

    // Handle scroll events to detect user manual scrolling
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = messagesContainer;
      const currentScrollTop = scrollTop;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 20;

      // Immediately detect if user scrolled up manually (even slightly)
      if (currentScrollTop < lastScrollTop.current - 5) {
        setUserHasScrolledUp(true);
      } else if (isAtBottom) {
        // Only reset when user is truly at the bottom
        setUserHasScrolledUp(false);
      }

      lastScrollTop.current = currentScrollTop;
    };

    // For desktop: Handle wheel events to prevent page scrolling
    const handleWheel = (e: WheelEvent) => {
      // Only prevent default if the container can actually scroll
      const { scrollTop, scrollHeight, clientHeight } = messagesContainer;
      const canScrollUp = scrollTop > 0;
      const canScrollDown = scrollTop < scrollHeight - clientHeight;

      // If scrolling up and at top, or scrolling down and at bottom, allow page scroll
      if ((e.deltaY < 0 && !canScrollUp) || (e.deltaY > 0 && !canScrollDown)) {
        return; // Let the page scroll
      }

      // Otherwise, prevent page scroll and let container scroll naturally
      e.stopPropagation();
    };

    // Add scroll listener for both desktop and mobile
    messagesContainer.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    // Only add wheel event listener for desktop
    if (window.innerWidth >= 768) {
      messagesContainer.addEventListener("wheel", handleWheel, {
        passive: false,
      });
    }

    // Prevent body scroll only when chat container is being interacted with
    const preventBodyScroll = (e: Event) => {
      const target = e.target as Element;
      if (messagesContainer && messagesContainer.contains(target)) {
        e.stopPropagation();
      }
    };

    // Add touch event listeners only for preventing body scroll on mobile
    if (window.innerWidth < 768) {
      document.body.addEventListener("touchmove", preventBodyScroll, {
        passive: true,
      });
    }

    return () => {
      messagesContainer.removeEventListener("scroll", handleScroll);
      messagesContainer.removeEventListener("wheel", handleWheel);
      document.body.removeEventListener("touchmove", preventBodyScroll);
    };
  }, [isOpen, isMinimized]);


  // Handle initial loading when chat is opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setInitialLoading(true);

      // Show loading for 1 second, then display initial message
      const timer = setTimeout(() => {
        const initialMessageId = "1";
        const initialText =
          "Hi! I'm Manikanta's AI assistant. I can help you learn more about his skills, projects, and experience. What would you like to know?";

        const initialMessage: Message = {
          id: initialMessageId,
          text: initialText,
          sender: "assistant",
          timestamp: new Date(),
        };

        setMessages([initialMessage]);
        setInitialLoading(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isOpen, messages.length]);

  // Listen for custom event to open AI Assistant from search
  useEffect(() => {
    const handleOpenAI = () => {
      setIsOpen(true);
    };

    window.addEventListener("openAIAssistant", handleOpenAI);
    return () => window.removeEventListener("openAIAssistant", handleOpenAI);
  }, []);

  const sendMessage = async (text: string = inputMessage) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);
    setUserHasScrolledUp(false); // Reset scroll state when sending new message

    // Force scroll to bottom when user sends a message
    setTimeout(() => {
      const container = messagesContainerRef.current;
      if (container) {
        container.scrollTo({
          top: container.scrollHeight,
          behavior: "smooth",
        });
      }
    }, 50);

    try {
      // Format conversation history for the API
      const conversationHistory = messages.map((msg) => ({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.text,
      }));

      const response = await fetch(
        "https://portfolio-chat-assist.vercel.app/api/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: text,
            history: conversationHistory,
            context:
              "You are an AI assistant for Manikanta Darapureddy's portfolio. Help visitors learn about his skills, projects, education, and professional experience. Be helpful, professional, and engaging.",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to get response");
      }
      
      if (!response.body) throw new Error("No response body");

      // Play notification sound on successful response
      try {
        const audio = new Audio("/sound.mp3");
        audio.play().catch((err) => console.log("Audio play failed:", err));
      } catch (error) {
        console.error("Error initializing audio:", error);
      }

      const assistantMessageId = (Date.now() + 1).toString();
      
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedText = "";
      let isFirstChunk = true;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        accumulatedText += chunk;

        if (isFirstChunk) {
          isFirstChunk = false;
          setIsLoading(false);
          
          const assistantMessage: Message = {
            id: assistantMessageId,
            text: accumulatedText,
            sender: "assistant",
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, assistantMessage]);
        } else {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMessageId
                ? { ...msg, text: accumulatedText }
                : msg
            )
          );
        }
      }

    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessageId = (Date.now() + 1).toString();
      const errorText =
        "I'm experiencing some technical difficulties. Please try again later or feel free to contact Manikanta directly.";

      const errorMessage: Message = {
        id: errorMessageId,
        text: errorText,
        sender: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
      setIsLoading(false);

      // Ensure we're at bottom before starting error message typing
      setTimeout(() => {
        const container = messagesContainerRef.current;
        if (container) {
          container.scrollTo({
            top: container.scrollHeight,
            behavior: "smooth",
          });
        }
      }, 100);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputMessage);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Function to render markdown-like formatting
  const renderMessageText = (text: string) => {
    // More comprehensive replacement for all dash patterns
    const processedText = text
      .replace(/^- (.+)$/gm, "• $1") // Start of line dashes
      .replace(/\n- (.+)/g, "\n• $1") // Dashes after newlines
      .replace(/(\s)- (.+)/g, "$1• $2"); // Dashes after spaces

    // Split text into lines first to handle bullet points properly
    const lines = processedText.split("\n");

    return lines.map((line, lineIndex) => {
      if (line.startsWith("• ")) {
        // Handle bullet points
        const bulletText = line.substring(2);
        return (
          <div key={lineIndex} className="flex gap-3 my-2">
            <span className="text-blue-600 dark:text-blue-400 font-bold text-sm mt-0.5 flex-shrink-0 w-3">
              •
            </span>
            <div className="flex-1 text-sm leading-relaxed">
              {renderInlineFormatting(bulletText)}
            </div>
          </div>
        );
      } else if (line.match(/^####\s(.+)/)) {
        // Handle h4 headers
        const headerText = line.replace(/^####\s/, "");
        return (
          <h4
            key={lineIndex}
            className="text-base font-bold text-gray-900 dark:text-white mt-3 mb-1 font-['Inter',_'Segoe_UI',_'SF_Pro_Display',_system-ui,_sans-serif]"
          >
            {headerText}
          </h4>
        );
      } else if (line.match(/^###\s(.+)/)) {
        // Handle h3 headers
        const headerText = line.replace(/^###\s/, "");
        return (
          <h3
            key={lineIndex}
            className="text-lg font-bold text-gray-900 dark:text-white mt-4 mb-2 font-['Inter',_'Segoe_UI',_'SF_Pro_Display',_system-ui,_sans-serif] border-b border-gray-200 dark:border-gray-600 pb-1"
          >
            {headerText}
          </h3>
        );
      } else if (line.match(/^##\s(.+)/)) {
        // Handle h2 headers
        const headerText = line.replace(/^##\s/, "");
        return (
          <h2
            key={lineIndex}
            className="text-xl font-bold text-gray-900 dark:text-white mt-4 mb-2 font-['Inter',_'Segoe_UI',_'SF_Pro_Display',_system-ui,_sans-serif]"
          >
            {headerText}
          </h2>
        );
      } else if (line.match(/^#\s(.+)/)) {
        // Handle h1 headers
        const headerText = line.replace(/^#\s/, "");
        return (
          <h1
            key={lineIndex}
            className="text-2xl font-bold text-gray-900 dark:text-white mt-4 mb-3 font-['Inter',_'Segoe_UI',_'SF_Pro_Display',_system-ui,_sans-serif]"
          >
            {headerText}
          </h1>
        );
      } else if (line.trim() === "") {
        // Handle empty lines
        return <br key={lineIndex} />;
      } else {
        // Handle regular text with inline formatting
        return (
          <div key={lineIndex} className="text-sm leading-relaxed my-1">
            {renderInlineFormatting(line)}
          </div>
        );
      }
    });
  };

  // Helper function to handle inline formatting (bold, italic, links)
  const renderInlineFormatting = (text: string) => {
    // Additional cleanup for any remaining dashes
    const cleanText = text
      .replace(/^- (.+)/, "• $1")
      .replace(/\s- (.+)/g, " • $1");

    const parts = cleanText.split(
      /(\*\*[^*]+\*\*|\*[^*]+\*|https?:\/\/[^\s)]+|\[[^\]]+\]\([^)]+\)|\([^)]*https?:\/\/[^)]+\))/g
    );

    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        // Bold text
        return (
          <strong
            key={index}
            className="font-semibold font-['Inter',_'Segoe_UI',_'SF_Pro_Display',_system-ui,_sans-serif]"
          >
            {part.slice(2, -2)}
          </strong>
        );
      } else if (part.startsWith("*") && part.endsWith("*")) {
        // Italic text
        return (
          <em
            key={index}
            className="italic font-['Inter',_'Segoe_UI',_'SF_Pro_Display',_system-ui,_sans-serif]"
          >
            {part.slice(1, -1)}
          </em>
        );
      } else if (part.match(/^https?:\/\/[^\s)]+$/)) {
        // Direct URL
        const displayUrl =
          part.length > 50 ? part.substring(0, 50) + "..." : part;
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline hover:no-underline transition-all duration-200 font-medium font-['Inter',_'Segoe_UI',_'SF_Pro_Display',_system-ui,_sans-serif]"
            title={`Visit: ${part}`}
          >
            {displayUrl}
          </a>
        );
      } else if (part.match(/^\[[^\]]+\]\([^)]+\)$/)) {
        // Markdown link format [text](url)
        const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (linkMatch) {
          const [, linkText, url] = linkMatch;
          return (
            <a
              key={index}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline hover:no-underline transition-all duration-200 font-medium font-['Inter',_'Segoe_UI',_'SF_Pro_Display',_system-ui,_sans-serif]"
              title={`Visit: ${url}`}
            >
              {linkText}
            </a>
          );
        }
      } else if (part.match(/^\([^)]*https?:\/\/[^)]+\)$/)) {
        // URL within parentheses
        const urlMatch = part.match(/\((https?:\/\/[^)]+)\)/);
        if (urlMatch) {
          const url = urlMatch[1];
          const displayUrl =
            url.length > 40 ? url.substring(0, 40) + "..." : url;
          return (
            <span
              key={index}
              className="font-['Inter',_'Segoe_UI',_'SF_Pro_Display',_system-ui,_sans-serif]"
            >
              (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline hover:no-underline transition-all duration-200 font-medium"
                title={`Visit: ${url}`}
              >
                {displayUrl}
              </a>
              )
            </span>
          );
        }
      }

      // Regular text
      return part;
    });
  };

  return (
    <>
      {/* Chat Toggle Button */}
      {!isOpen && (
        <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50">
          {/* Welcome Notification */}
          {showWelcomeNotification && !notificationShown && (
            <div
              className="absolute bottom-full right-0 mb-3 w-72 md:w-80 transform transition-all duration-300 ease-out animate-fade-in-up cursor-pointer"
              onClick={() => {
                setIsOpen(true);
                setShowWelcomeNotification(false);
                setNotificationShown(true);
              }}
            >
              <div className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-lg border border-blue-500/30 dark:border-blue-400/30 rounded-xl p-4 pulse-animate">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowWelcomeNotification(false);
                  }}
                  className="absolute top-2 right-2 p-1 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
                  aria-label="Close notification"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-md overflow-hidden">
                    <img
                      src="/img/bot.jpg"
                      alt="AI Assistant"
                      className="w-full h-full object-cover rounded-full"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      AI Assistant
                    </h4>
                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300">
                      Welcome to Manikanta's portfolio! Need help? Ask me
                      anything!
                    </p>
                  </div>
                </div>
                {/* Speech bubble tail */}
                <div className="absolute right-6 -bottom-2 w-4 h-4 transform rotate-45 bg-inherit border-b border-r border-blue-500/30 dark:border-blue-400/30"></div>
              </div>
            </div>
          )}
          <button
            onClick={() => {
              setIsOpen(true);
              setShowWelcomeNotification(false);
              setNotificationShown(true);
            }}
            className="relative group bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 hover:scale-110 w-10 h-10 md:w-12 md:h-12 rounded-full shadow-lg hover:shadow-xl border border-gray-200/80 dark:border-gray-700/80 hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-200 backdrop-blur-sm"
            aria-label="Open AI Assistant"
          >
            <img
              src="/img/bot.jpg"
              alt="AI Assistant Robot"
              className="w-full h-full object-cover rounded-full"
              loading="lazy"
            />
          </button>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          className={`fixed z-50 bg-white/70 dark:bg-gray-900/90 backdrop-blur-lg shadow-2xl border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 font-['Inter',_'Segoe_UI',_'SF_Pro_Display',_system-ui,_sans-serif] isolate overflow-hidden flex flex-col ${
            isMinimized
              ? "bottom-4 right-4 md:bottom-6 md:right-6 w-80 h-16 rounded-2xl"
              : "inset-0 md:inset-auto md:bottom-6 md:right-6 w-full h-[100dvh] md:w-[28rem] md:h-[40rem] rounded-none md:rounded-2xl"
          }`}
          style={{
            WebkitTransform: "translateZ(0)", // Force hardware acceleration
            WebkitBackdropFilter: "blur(16px)",
            backdropFilter: "blur(16px)",
          }}
          onClick={(e) => e.stopPropagation()}
          onWheel={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-3 border-b border-blue-500/20 dark:border-blue-400/20 bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 rounded-none md:rounded-t-2xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16 pointer-events-none"></div>
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-7 h-7 bg-white/15 rounded-full flex items-center justify-center overflow-hidden">
                  <img
                    src="/img/bot.jpg"
                    alt="AI Assistant"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-blue-500 animate-ping"></div>
              </div>
              <div>
                <h3 className="font-semibold text-white font-['Inter',_'Segoe_UI',_'SF_Pro_Display',_system-ui,_sans-serif] text-[15px]">
                  AI Assistant
                </h3>
                <p className="text-xs text-blue-100 font-['Inter',_'Segoe_UI',_'SF_Pro_Display',_system-ui,_sans-serif]">
                  Ready to help • Online
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  // Reset chat to initial state and trigger loading animation
                  setMessages([]);
                  localStorage.removeItem("ai-assistant-messages");
                  setInputMessage("");
                  setIsLoading(false);
                  setUserHasScrolledUp(false); // Reset scroll state
                  setInitialLoading(true);

                  // Show loading for 1 second, then display initial message
                  setTimeout(() => {
                    const initialMessageId = "1";
                    const initialText =
                      "Hi! I'm Manikanta's AI assistant. I can help you learn more about his skills, projects, and experience. What would you like to know?";

                    const initialMessage: Message = {
                      id: initialMessageId,
                      text: initialText,
                      sender: "assistant",
                      timestamp: new Date(),
                    };

                    setMessages([initialMessage]);
                    setInitialLoading(false);
                  }, 500);
                }}
                className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-white"
                aria-label="Clear chat history"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                  <path d="M3 3v5h5"></path>
                </svg>
              </button>
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-white"
                aria-label={isMinimized ? "Maximize" : "Minimize"}
              >
                {isMinimized ? (
                  <Maximize2 className="w-4 h-4" />
                ) : (
                  <Minimize2 className="w-4 h-4" />
                )}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-white"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          {!isMinimized && (
            <>
              <div
                ref={messagesContainerRef}
                className="flex-1 overflow-y-auto p-3 md:p-4 space-y-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] overscroll-contain scroll-smooth chat-container"
                style={{
                  WebkitOverflowScrolling: "touch",
                  transform: "translateZ(0)", // Force hardware acceleration
                  minHeight: 0, // Allows flex item to shrink
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start gap-3 ${
                      message.sender === "user"
                        ? "flex-row-reverse"
                        : "flex-row"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden ${
                        message.sender === "user"
                          ? "bg-gradient-to-r from-green-500 to-emerald-600"
                          : "bg-gradient-to-r from-blue-600 to-purple-600"
                      }`}
                    >
                      {message.sender === "user" ? (
                        <User className="w-4 h-4 text-white" />
                      ) : (
                        <img
                          src="/img/bot.jpg"
                          alt="AI Assistant"
                          className="w-full h-full object-cover rounded-full"
                          loading="lazy"
                        />
                      )}
                    </div>

                    <div
                      className={`flex flex-col ${
                        message.sender === "user"
                          ? "max-w-[80%] items-end"
                          : "max-w-[85%] items-start"
                      }`}
                    >
                      <div
                        className={`px-3 py-1 rounded-2xl break-words ${
                          message.sender === "user"
                            ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-br-md"
                            : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-bl-md"
                        }`}
                      >
                        <div className="text-sm leading-relaxed whitespace-pre-wrap font-['Inter',_'Segoe_UI',_'SF_Pro_Display',_system-ui,_sans-serif]">
                          {renderMessageText(message.text)}
                        </div>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 px-2 font-['Inter',_'Segoe_UI',_'SF_Pro_Display',_system-ui,_sans-serif]">
                        {formatTime(message.timestamp)}
                      </span>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0 overflow-hidden">
                      <img
                        src="/img/bot.jpg"
                        alt="AI Assistant"
                        className="w-full h-full object-cover rounded-full"
                        loading="lazy"
                      />
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-2xl rounded-bl-md">
                      <div className="flex items-center gap-2">
                        <Loader className="h-4 w-4 animate-spin text-muted-foreground" />
                        <span className="text-sm text-gray-500 dark:text-gray-400 font-['Inter',_'Segoe_UI',_'SF_Pro_Display',_system-ui,_sans-serif]">
                          Thinking...
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {initialLoading && (
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0 overflow-hidden">
                      <img
                        src="/img/bot.jpg"
                        alt="AI Assistant"
                        className="w-full h-full object-cover rounded-full"
                        loading="lazy"
                      />
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-2xl rounded-bl-md">
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                        <span className="text-sm text-gray-700 dark:text-gray-300 font-['Inter',_'Segoe_UI',_'SF_Pro_Display',_system-ui,_sans-serif]">
                          Initializing AI Assistant...
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-3 md:p-4 border-t border-gray-200/50 dark:border-gray-700/50 flex-shrink-0 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
                
                {/* Quick Questions */}
                <div className="mb-3 space-y-2">
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium ml-1">
                    Quick questions:
                  </p>
                  <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide snap-x">
                    {QUICK_QUESTIONS.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setInputMessage(question);
                          inputRef.current?.focus();
                        }}
                        className="flex-shrink-0 snap-start bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-full px-3 py-1.5 text-xs text-gray-700 dark:text-gray-300 transition-colors duration-200 whitespace-nowrap font-medium"
                      >
                       {question}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="🧠 Ask Me Anything!"
                    className="flex-1 min-w-0 px-3 md:px-4 py-2 border border-gray-300/70 dark:border-gray-600/70 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 font-['Inter',_'Segoe_UI',_'SF_Pro_Display',_system-ui,_sans-serif] text-base"
                    style={{ fontSize: "16px" }}
                    disabled={isLoading}
                  />
                  <button
                    onClick={() => sendMessage(inputMessage)}
                    disabled={!inputMessage.trim() || isLoading}
                    className="px-3 md:px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white rounded-xl transition-all duration-200 flex items-center justify-center"
                    aria-label="Send message"
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
