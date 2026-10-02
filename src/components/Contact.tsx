import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../data/content';
import { Send, Mail, MapPin, Github, Linkedin, CheckCircle, AlertCircle, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiryType: 'Research Collaboration',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Name is required.';
    if (!formData.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!formData.message.trim()) errs.message = 'Message content cannot be empty.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate async network submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    }, 1000);
  };

  return (
    <section id="contact" className="relative py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 hairline-b">
          <div>
            <span className="font-mono text-xs text-cyan-accent tracking-widest uppercase font-bold">
              06 // LET'S CONNECT
            </span>
            <h2 className="font-display text-4xl sm:text-6xl font-bold text-space-text mt-2 tracking-tight leading-none">
              Get in Touch
            </h2>
          </div>
          <p className="font-mono text-xs text-space-muted mt-4 md:mt-0">
            [ OPEN FOR WORK & COLLABORATION ]
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Links & Info */}
          <div className="lg:col-span-5 space-y-8">
            <p className="text-space-text text-lg leading-relaxed font-normal">
              Whether you have a project in mind, want to discuss opportunities, or just want to say hi, feel free to reach out directly.
            </p>

            {/* Info Cards */}
            <div className="space-y-4 font-mono text-xs">
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center space-x-4 p-4 rounded-2xl glass-panel border-cyan-accent/20 hover:border-cyan-accent text-space-text hover:text-cyan-accent transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-cyan-accent/10 flex items-center justify-center text-cyan-accent group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-space-muted text-[11px] block">EMAIL</span>
                  <span className="font-semibold text-sm">{personalInfo.email}</span>
                </div>
              </a>

              <div className="flex items-center space-x-4 p-4 rounded-2xl glass-panel border-white/10 text-space-text">
                <div className="w-10 h-10 rounded-xl bg-lime-accent/10 flex items-center justify-center text-lime-accent">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-space-muted text-[11px] block">LOCATION</span>
                  <span className="font-semibold text-sm">{personalInfo.location}</span>
                </div>
              </div>
            </div>

            {/* Social Network Links */}
            <div className="pt-4 border-t border-space-border">
              <span className="font-mono text-xs text-space-muted block mb-4 uppercase tracking-widest font-semibold">
                NETWORK PROFILES
              </span>
              <div className="flex space-x-4">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-5 py-2.5 rounded-full glass-panel border-cyan-accent/30 text-space-text hover:text-cyan-accent hover:border-cyan-accent transition-all font-mono text-xs font-semibold"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-5 py-2.5 rounded-full glass-panel border-cyan-accent/30 text-space-text hover:text-cyan-accent hover:border-cyan-accent transition-all font-mono text-xs font-semibold"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Validated Contact Form */}
          <div className="lg:col-span-7 glass-panel rounded-3xl p-8 sm:p-10 border-cyan-accent/30 relative overflow-hidden">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-lime-accent/20 border-2 border-lime-accent text-lime-accent flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="font-display text-3xl font-bold text-space-text">
                  Message Received!
                </h3>
                <p className="font-mono text-xs text-space-muted max-w-md mx-auto">
                  Thank you, {formData.name}. I've received your message and will respond to <span className="text-cyan-accent font-semibold">{formData.email}</span> shortly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', inquiryType: 'Research Collaboration', message: '' });
                  }}
                  className="mt-6 px-6 py-2.5 rounded-full bg-cyan-accent/10 border border-cyan-accent text-cyan-accent font-mono text-xs hover:bg-cyan-accent hover:text-space-950 transition-all font-semibold"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div>
                    <label className="block font-mono text-xs text-space-muted mb-2 font-medium">
                      YOUR FULL NAME <span className="text-cyan-accent">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                      className={`w-full px-4 py-3 rounded-xl bg-space-900 border font-mono text-xs text-space-text focus:outline-none transition-colors ${
                        errors.name ? 'border-red-500 focus:border-red-500' : 'border-space-border focus:border-cyan-accent'
                      }`}
                    />
                    {errors.name && (
                      <span className="font-mono text-[11px] text-red-400 mt-1 flex items-center space-x-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.name}</span>
                      </span>
                    )}
                  </div>

                  {/* Email Input */}
                  <div>
                    <label className="block font-mono text-xs text-space-muted mb-2 font-medium">
                      EMAIL ADDRESS <span className="text-cyan-accent">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.com"
                      className={`w-full px-4 py-3 rounded-xl bg-space-900 border font-mono text-xs text-space-text focus:outline-none transition-colors ${
                        errors.email ? 'border-red-500 focus:border-red-500' : 'border-space-border focus:border-cyan-accent'
                      }`}
                    />
                    {errors.email && (
                      <span className="font-mono text-[11px] text-red-400 mt-1 flex items-center space-x-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.email}</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Inquiry Type Dropdown */}
                <div>
                  <label className="block font-mono text-xs text-space-muted mb-2 font-medium">
                    INQUIRY CATEGORY
                  </label>
                  <select
                    value={formData.inquiryType}
                    onChange={e => setFormData({ ...formData, inquiryType: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-space-900 border border-space-border focus:border-cyan-accent font-mono text-xs text-space-text focus:outline-none"
                  >
                    <option value="Project Collaboration">Project Collaboration</option>
                    <option value="Full-Time / Contract Role">Full-Time / Contract Role</option>
                    <option value="Freelance Work">Freelance Work</option>
                    <option value="General Inquiry">General Inquiry</option>
                  </select>
                </div>

                {/* Message Input */}
                <div>
                  <label className="block font-mono text-xs text-space-muted mb-2 font-medium">
                    MESSAGE <span className="text-cyan-accent">*</span>
                  </label>
                  <textarea
                    rows={5}
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    placeholder="State your project goals, collaboration scope, or inquiry..."
                    className={`w-full px-4 py-3 rounded-xl bg-space-900 border font-mono text-xs text-space-text focus:outline-none transition-colors ${
                      errors.message ? 'border-red-500 focus:border-red-500' : 'border-space-border focus:border-cyan-accent'
                    }`}
                  />
                  {errors.message && (
                    <span className="font-mono text-[11px] text-red-400 mt-1 flex items-center space-x-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.message}</span>
                    </span>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-cyan-accent text-space-950 font-mono font-bold text-xs uppercase tracking-widest hover:bg-lime-accent transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg shadow-cyan-accent/20 disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>SENDING MESSAGE...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
