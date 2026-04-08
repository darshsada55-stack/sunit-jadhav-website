'use client';

import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { FiInstagram, FiMail, FiMapPin, FiSend, FiCheckCircle } from 'react-icons/fi';

const enquiryTypes = [
  'Online Coaching',
  'Brand Partnership',
  'Event Appearance',
  'Media Enquiry',
  'General',
];

export default function Contact() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    enquiry: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<typeof form>>({});

  const validate = () => {
    const newErrors: Partial<typeof form> = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Enter a valid email';
    }
    if (!form.enquiry) newErrors.enquiry = 'Please select an enquiry type';
    if (!form.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof form]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setLoading(true);
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  const inputClass = (field: keyof typeof form) =>
    `w-full bg-black border rounded px-4 py-3 text-white placeholder-gray-600 text-sm outline-none transition-all duration-200 focus:ring-1 ${
      errors[field]
        ? 'border-red-600/60 focus:border-red-500 focus:ring-red-500/30'
        : 'border-royalblue-900/40 focus:border-royalblue-500 focus:ring-royalblue-500/30 hover:border-royalblue-800/60'
    }`;

  return (
    <section id="contact" className="relative py-24 lg:py-32 bg-black overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-royalblue-950/20 rounded-full blur-[120px]" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-royalblue-400 text-xs font-semibold tracking-[0.3em] uppercase mb-3">
            — Let&apos;s Connect
          </p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-700 text-white leading-tight">
            GET IN
            <br />
            <span className="text-gold-gradient">TOUCH</span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-lg mx-auto text-sm">
            Whether it&apos;s coaching, brand collaborations, or just to say hello —
            Sunit or his team will get back to you within 48 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-start">
          {/* Left: Contact info */}
          <div
            className={`lg:col-span-2 space-y-8 transition-all duration-700 delay-100 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div>
              <h3 className="font-display text-xl font-600 text-white tracking-wider mb-6">
                CONTACT INFO
              </h3>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded border border-royalblue-800/50 bg-royalblue-950/20 flex items-center justify-center">
                    <FiInstagram size={16} className="text-royalblue-400" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs tracking-wider uppercase mb-1">Instagram</p>
                    <a
                      href="https://www.instagram.com/sunitjadhavofficial"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-gold-400 transition-colors font-medium"
                    >
                      @sunitjadhavofficial
                    </a>
                    <p className="text-gray-600 text-xs mt-0.5">789K followers</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded border border-royalblue-800/50 bg-royalblue-950/20 flex items-center justify-center">
                    <FiMail size={16} className="text-royalblue-400" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs tracking-wider uppercase mb-1">Email</p>
                    <p className="text-white font-medium">contact@sunitjadhav.com</p>
                    <p className="text-gray-600 text-xs mt-0.5">Response within 48 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded border border-royalblue-800/50 bg-royalblue-950/20 flex items-center justify-center">
                    <FiMapPin size={16} className="text-royalblue-400" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs tracking-wider uppercase mb-1">Based In</p>
                    <p className="text-white font-medium">Mumbai, Maharashtra</p>
                    <p className="text-gray-600 text-xs mt-0.5">India</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Enquiry guide */}
            <div className="p-5 rounded-xl border border-royalblue-900/30 bg-royalblue-950/10">
              <p className="text-white font-semibold text-sm tracking-wider mb-3">
                QUICK GUIDE
              </p>
              <ul className="space-y-2 text-sm text-gray-500">
                <li className="flex items-center gap-2">
                  <span className="text-royalblue-500">→</span>
                  Coaching: mention your goals &amp; current level
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-royalblue-500">→</span>
                  Brand deals: include brand name &amp; brief
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-royalblue-500">→</span>
                  Events: include date, location &amp; details
                </li>
              </ul>
            </div>

            {/* Social follow */}
            <div>
              <p className="text-gray-600 text-xs tracking-wider uppercase mb-3">Follow</p>
              <a
                href="https://www.instagram.com/sunitjadhavofficial"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-5 py-2.5 border border-royalblue-800/50 rounded text-royalblue-300 hover:text-gold-400 hover:border-gold-500/40 transition-all duration-300 text-sm font-medium tracking-wider"
              >
                <FiInstagram size={16} />
                Follow on Instagram
              </a>
            </div>
          </div>

          {/* Right: Form */}
          <div
            className={`lg:col-span-3 transition-all duration-700 delay-200 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-16 text-center rounded-2xl border border-royalblue-900/30 bg-royalblue-950/10">
                <FiCheckCircle size={52} className="text-gold-400 mb-4" />
                <h3 className="font-display text-2xl font-700 text-white tracking-wider mb-2">
                  MESSAGE SENT!
                </h3>
                <p className="text-gray-400 max-w-sm text-sm leading-relaxed">
                  Thank you for reaching out. Sunit&apos;s team will get back to you within 48 hours.
                  Keep grinding!
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: '', email: '', phone: '', enquiry: '', message: '' });
                  }}
                  className="mt-6 text-royalblue-400 hover:text-white text-sm tracking-wider transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-royalblue-900/30 bg-royalblue-950/5 p-6 sm:p-8 space-y-5"
                noValidate
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-gray-500 text-xs tracking-wider uppercase mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="contact-name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className={inputClass('name')}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-gray-500 text-xs tracking-wider uppercase mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className={inputClass('email')}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-gray-500 text-xs tracking-wider uppercase mb-1.5">
                      Phone (Optional)
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 XXXXXXXXXX"
                      className={inputClass('phone')}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-500 text-xs tracking-wider uppercase mb-1.5">
                      Enquiry Type *
                    </label>
                    <select
                      name="enquiry"
                      id="contact-subject"
                      value={form.enquiry}
                      onChange={handleChange}
                      className={`${inputClass('enquiry')} appearance-none cursor-pointer`}
                    >
                      <option value="" disabled>
                        Select type...
                      </option>
                      {enquiryTypes.map((type) => (
                        <option key={type} value={type} className="bg-black">
                          {type}
                        </option>
                      ))}
                    </select>
                    {errors.enquiry && (
                      <p className="text-red-500 text-xs mt-1">{errors.enquiry}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-gray-500 text-xs tracking-wider uppercase mb-1.5">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Tell Sunit about your goals, your enquiry, or what you have in mind..."
                    className={`${inputClass('message')} resize-none`}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-xs mt-1">{errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 bg-royalblue-800 hover:bg-royalblue-700 disabled:opacity-60 disabled:cursor-not-allowed border border-royalblue-600 hover:border-royalblue-400 text-white font-semibold tracking-wider text-sm rounded transition-all duration-300 hover:shadow-blue-glow group"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <FiSend size={15} />
                      Send Message
                      <FiSend
                        size={13}
                        className="group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-200"
                      />
                    </>
                  )}
                </button>

                <p className="text-center text-gray-700 text-xs">
                  By submitting this form, you agree to be contacted regarding your enquiry.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
