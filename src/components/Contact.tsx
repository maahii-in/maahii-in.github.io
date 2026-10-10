"use client";
import { useState, type ChangeEvent, type FormEvent } from "react";
import {
  Mail,
  MapPin,
  CheckCircle,
  XCircle,
  RefreshCw,
  Linkedin,
  Github,
} from "lucide-react";
import confetti from "canvas-confetti";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Confetti effect for successful form submission
  const handleSuccessConfetti = async () => {
    await confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.6 },
      colors: [
        "#3b82f6",
        "#8b5cf6",
        "#10b981",
        "#f59e0b",
        "#ef4444",
        "#06b6d4",
      ],
      scalar: 1.2,
      gravity: 0.8,
      drift: 0.1,
    });

    // Second burst with different settings
    setTimeout(async () => {
      await confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#6366f1", "#d946ef", "#22d3ee"],
        scalar: 0.8,
        shapes: ["circle", "square"],
      });
    }, 400);
  };
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (isSubmitted) return;
    setFormData({ ...formData, [e.target.id]: e.target.value });
    // Clear any previous errors when user starts typing
    if (submitError) {
      setSubmitError(null);
    }
  };
  const resetForm = () => {
    setFormData({ name: "", email: "", message: "" });
    setIsSubmitted(false);
    setSubmitError(null);
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitted) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // No backend: open the visitor's email app with the message pre-filled.
      const subject = encodeURIComponent(`Portfolio message from ${formData.name}`);
      const body = encodeURIComponent(
        `${formData.message}

From: ${formData.name} (${formData.email})`
      );
      window.location.href = `mailto:mahieshwar.budati@gmail.com?subject=${subject}&body=${body}`;
      setIsSubmitted(true);
      handleSuccessConfetti();
    } catch (err) {
      console.error("🔥 Network or server error:", err);
      setSubmitError(
        "Network error. Please check your connection and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <section id="contact" className="py-20 px-4 overflow-hidden relative">
      {" "}
      <div className="container mx-auto">
        {" "}
        <div className="text-center mb-12 relative">
          {/* Decorative background elements */}
          <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
            <div className="w-32 h-32 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl opacity-30"></div>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4 relative inline-block group">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent btn-shine relative">
              Get in touch
              {/* Glowing effect on hover */}
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-300 blur-sm"></span>
            </span>

            {/* Enhanced underline with animation */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
              <div className="w-8 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 mt-0.5 mx-auto opacity-60"></div>
            </div>

            {/* Side accent dots */}
            <div className="hidden md:block absolute left-0 top-1/2 transform -translate-x-6 -translate-y-1/2">
              <div className="w-2 h-2 bg-blue-500 rounded-full opacity-60"></div>
            </div>
            <div className="hidden md:block absolute right-0 top-1/2 transform translate-x-6 -translate-y-1/2">
              <div className="w-2 h-2 bg-purple-500 rounded-full opacity-60"></div>
            </div>
          </h2>

          {/* Subtle tagline */}
          <p className="text-gray-500 dark:text-gray-400 text-sm font-light tracking-wider uppercase opacity-70">
            Let's Connect
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto items-start w-full">
          {/* Left Column - Contact Information */}
          <div className="space-y-4 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900/50 dark:to-gray-800/30 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                Let's Connect
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Feel free to reach out through any of these channels
              </p>
            </div>

            {/* Clickable Email */}
            <a
              href="mailto:mahieshwar.budati@gmail.com"
              className="flex items-center space-x-3 group cursor-pointer bg-white dark:bg-gray-800/50 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 rounded-xl p-4 transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 shadow-sm hover:shadow-lg hover:shadow-blue-500/10 transform hover:-translate-y-0.5"
              aria-label="Send Email"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="relative">
                <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-all duration-300" />
                <div className="absolute inset-0 bg-blue-600 dark:bg-blue-400 rounded-full opacity-0 group-hover:opacity-20 blur-lg transition-all duration-300"></div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-base text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  Email
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors truncate">
                  mahieshwar.budati@gmail.com
                </p>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-1 group-hover:translate-x-0">
                <svg
                  className="w-4 h-4 text-blue-600 dark:text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </div>
            </a>

            {/* Clickable LinkedIn */}
            <a
              href="https://www.linkedin.com/in/mahi-budati1209"
              className="flex items-center space-x-3 group cursor-pointer bg-white dark:bg-gray-800/50 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 rounded-xl p-4 transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 shadow-sm hover:shadow-lg hover:shadow-blue-500/10 transform hover:-translate-y-0.5"
              aria-label="View LinkedIn Profile"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="relative">
                <Linkedin className="w-6 h-6 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-all duration-300" />
                <div className="absolute inset-0 bg-blue-600 dark:bg-blue-400 rounded-full opacity-0 group-hover:opacity-20 blur-lg transition-all duration-300"></div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-base text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  LinkedIn
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                  Connect with me professionally
                </p>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-1 group-hover:translate-x-0">
                <svg
                  className="w-4 h-4 text-blue-600 dark:text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </div>
            </a>

            {/* Clickable GitHub */}
            <a
              href="https://github.com/mahieshwar-budati"
              className="flex items-center space-x-3 group cursor-pointer bg-white dark:bg-gray-800/50 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 rounded-xl p-4 transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 shadow-sm hover:shadow-lg hover:shadow-blue-500/10 transform hover:-translate-y-0.5"
              aria-label="View GitHub Profile"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="relative">
                <Github className="w-6 h-6 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-all duration-300" />
                <div className="absolute inset-0 bg-blue-600 dark:bg-blue-400 rounded-full opacity-0 group-hover:opacity-20 blur-lg transition-all duration-300"></div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-base text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  GitHub
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                  Check out my code repositories
                </p>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-1 group-hover:translate-x-0">
                <svg
                  className="w-4 h-4 text-blue-600 dark:text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </div>
            </a>

            {/* Clickable Location */}
            <a
              href="https://maps.app.goo.gl/U86rQLwSzh7zWhVM9"
              className="flex items-center space-x-3 group cursor-pointer bg-white dark:bg-gray-800/50 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 rounded-xl p-4 transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 shadow-sm hover:shadow-lg hover:shadow-blue-500/10 transform hover:-translate-y-0.5"
              aria-label="View Location on Google Maps"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="relative">
                <MapPin className="w-6 h-6 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-all duration-300" />
                <div className="absolute inset-0 bg-blue-600 dark:bg-blue-400 rounded-full opacity-0 group-hover:opacity-20 blur-lg transition-all duration-300"></div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-base text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  Location
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                  Chirala, Andhra Pradesh, India
                </p>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-1 group-hover:translate-x-0">
                <svg
                  className="w-4 h-4 text-blue-600 dark:text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </div>
            </a>
          </div>

          {/* Right Column - Contact Form */}
          <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800/30 dark:to-gray-900/50 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                Send a Message
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Have a project in mind? Let's discuss it
              </p>
            </div>

            {isSubmitted ? (
              <div className="bg-gradient-to-b from-green-50 to-white dark:from-green-900/20 dark:to-gray-800/50 rounded-xl p-8 border border-green-200 dark:border-green-700 shadow-lg">
                <div className="text-center space-y-6">
                  {/* Success Animation */}
                  <div className="flex justify-center">
                    <div className="relative">
                      <CheckCircle className="w-16 h-16 text-green-500 animate-bounce" />
                      <div className="absolute inset-0 w-16 h-16 bg-green-400 rounded-full opacity-20 animate-ping"></div>
                    </div>
                  </div>

                  {/* Success Message */}
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-green-700 dark:text-green-400 animate-fade-in">
                      Almost there! 🎉
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 text-lg">
                      Your email app should open with the message ready. Press Send there to deliver it to me.
                    </p>
                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                      <CheckCircle className="w-4 h-4" />
                      <span>Email draft prepared</span>
                    </div>
                  </div>

                  {/* Send Another Message Button */}
                  <div className="pt-4">
                    <button
                      onClick={resetForm}
                      className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                    >
                      <RefreshCw className="w-4 h-4" />
                      <span>Send Another Message</span>
                    </button>
                  </div>

                  {/* Subtle decoration */}
                  <div className="flex justify-center space-x-1 pt-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-75"></div>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-150"></div>
                  </div>
                </div>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={handleSubmit}>
                {/* Error Message Display */}
                {submitError && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-xl p-4 animate-fade-in">
                    <div className="flex items-center space-x-2">
                      <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                      <p className="text-red-700 dark:text-red-400 text-sm font-medium">
                        {submitError}
                      </p>
                    </div>
                  </div>
                )}{" "}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200"
                  >
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={isSubmitting || isSubmitted}
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed hover:border-blue-300 dark:hover:border-blue-400 shadow-sm focus:shadow-md"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200"
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isSubmitting || isSubmitted}
                    required
                    className="w-full px-3 py-2.5 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed hover:border-blue-300 dark:hover:border-blue-400 shadow-sm focus:shadow-md"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    disabled={isSubmitting || isSubmitted}
                    required
                    className="w-full px-3 py-2.5 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed hover:border-blue-300 dark:hover:border-blue-400 shadow-sm focus:shadow-md resize-vertical"
                    placeholder="Tell me about your project or just say hello..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:from-blue-500 dark:to-purple-500 dark:hover:from-blue-600 dark:hover:to-purple-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed transform hover:scale-105 hover:shadow-lg shadow-md relative overflow-hidden"
                >
                  <div className="flex items-center justify-center space-x-2">
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Mail className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </div>

                  {/* Animated background on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                </button>
              </form>
            )}
          </div>
        </div>
        {/* Google Maps Section */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="text-center mb-8"></div>{" "}
          <iframe
            src="https://maps.google.com/maps?q=Chirala,+Andhra+Pradesh,+India&z=13&output=embed"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="grayscale hover:grayscale-0 transition-all duration-300 rounded-lg"
            title="Location Map - Chirala, Andhra Pradesh"
          ></iframe>
        </div>
      </div>
    </section>
  );
}