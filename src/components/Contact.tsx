'use client';

import { useState } from 'react';
import { FiInstagram, FiMail, FiMapPin, FiArrowRight, FiCheckCircle } from 'react-icons/fi';

const enquiryTypes = [
  'Online Coaching',
  'Brand Partnership',
  'Event Appearance',
  'Media Enquiry',
  'General',
];

type ContactForm = {
  name: string;
  email: string;
  enquiry: string;
  message: string;
};

const inputClass =
  'w-full bg-transparent border-b border-white/12 py-3 text-white text-sm placeholder-white/20 outline-none focus:border-royal-500 transition-colors duration-200';

export default function Contact() {
  const [form, setForm] = useState<ContactForm>({
    name: '',
    email: '',
    enquiry: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<ContactForm>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e: Partial<ContactForm> = {};
    if (!form.name.trim()) e.name = 'Required';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = 'Valid email required';
    if (!form.enquiry) e.enquiry = 'Required';
    if (!form.message.trim()) e.message = 'Required';
    return e;
  };

  const handleChange =
    (k: keyof ContactForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setForm((f) => ({ ...f, [k]: e.target.value }));
      setErrors((err) => ({ ...err, [k]: undefined }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setSubmitted(true);
    } catch {
      // silently handled
    } finally {
      setLoading(false);
    }
  };

  const FieldError = ({ field }: { field: keyof ContactForm }) =>
    errors[field] ? (
      <p className="text-red-400/80 text-[10px] tracking-wider mt-1">{errors[field]}</p>
    ) : null;

  return (
    <section id="contact" className="py-28 lg:py-40 bg-[#04080f]">
      <div className="max-w-site mx-auto px-6 lg:px-14">
        {/* Label */}
        <p className="text-[10px] tracking-[0.45em] uppercase text-royal-800 mb-14 lg:mb-20">
          006 —— Contact
        </p>

        <div className="grid lg:grid-cols-5 gap-16 lg:gap-24">
          {/* Left — info */}
          <div className="lg:col-span-2">
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white uppercase leading-[0.9] tracking-tight mb-12">
              Get In<br />
              <span className="text-royal-400">Touch</span>
            </h2>

            <div className="space-y-8">
              <a
                href="https://www.instagram.com/sunitjadhavofficial"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 group"
              >
                <FiInstagram size={15} className="text-white/20 mt-0.5 group-hover:text-royal-400 transition-colors" />
                <div>
                  <p className="text-[10px] tracking-[0.25em] text-white/20 uppercase mb-1">Instagram</p>
                  <p className="text-sm text-white/45 group-hover:text-white transition-colors">
                    @sunitjadhavofficial
                  </p>
                </div>
              </a>

              <div className="flex items-start gap-4">
                <FiMail size={15} className="text-white/20 mt-0.5" />
                <div>
                  <p className="text-[10px] tracking-[0.25em] text-white/20 uppercase mb-1">Email</p>
                  <p className="text-sm text-white/45">contact@sunitjadhav.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <FiMapPin size={15} className="text-white/20 mt-0.5" />
                <div>
                  <p className="text-[10px] tracking-[0.25em] text-white/20 uppercase mb-1">Location</p>
                  <p className="text-sm text-white/45">Mumbai, India</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="flex flex-col items-center justify-center min-h-[380px] text-center">
                <FiCheckCircle size={36} className="text-royal-400 mb-6" />
                <h3 className="font-display text-2xl text-white tracking-wider uppercase mb-3">
                  Message Sent
                </h3>
                <p className="text-white/30 text-sm max-w-xs leading-relaxed">
                  We&apos;ll get back to you within 48 hours. Keep training.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8" noValidate>
                <div className="grid sm:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-[10px] tracking-[0.3em] text-white/25 uppercase mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={handleChange('name')}
                      placeholder="Your name"
                      className={inputClass}
                    />
                    <FieldError field="name" />
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-[0.3em] text-white/25 uppercase mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={handleChange('email')}
                      placeholder="you@email.com"
                      className={inputClass}
                    />
                    <FieldError field="email" />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] tracking-[0.3em] text-white/25 uppercase mb-2">
                    Enquiry Type *
                  </label>
                  <select
                    value={form.enquiry}
                    onChange={handleChange('enquiry')}
                    className={`${inputClass} cursor-pointer appearance-none`}
                  >
                    <option value="" disabled className="bg-black text-white/40">
                      Select…
                    </option>
                    {enquiryTypes.map((t) => (
                      <option key={t} value={t} className="bg-black">
                        {t}
                      </option>
                    ))}
                  </select>
                  <FieldError field="enquiry" />
                </div>

                <div>
                  <label className="block text-[10px] tracking-[0.3em] text-white/25 uppercase mb-2">
                    Message *
                  </label>
                  <textarea
                    value={form.message}
                    onChange={handleChange('message')}
                    rows={5}
                    placeholder="How can we help?"
                    className={`${inputClass} resize-none`}
                  />
                  <FieldError field="message" />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-3 px-9 py-4 bg-royal-700 hover:bg-royal-600 text-white text-[11px] font-semibold tracking-[0.22em] uppercase disabled:opacity-40 transition-colors group w-full"
                >
                  {loading ? (
                    'Sending…'
                  ) : (
                    <>
                      Send Message
                      <FiArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
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
}
