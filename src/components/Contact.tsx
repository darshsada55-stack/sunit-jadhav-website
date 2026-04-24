'use client';

import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import {
  FiInstagram,
  FiMail,
  FiMapPin,
  FiArrowRight,
  FiCheckCircle,
} from 'react-icons/fi';

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

export default function Contact() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
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

  const inputClass =
    'w-full bg-transparent border-b border-white/12 py-3 text-white text-sm placeholder-white/18 outline-none focus:border-gold transition-colors duration-200';

  const FieldError = ({ field }: { field: keyof ContactForm }) =>
    errors[field] ? (
      <p className="text-red-400/80 text-[10px] tracking-wider mt-1">{errors[field]}</p>
    ) : null;

  return (
    <section id="contact" className="py-32 lg:py-44 bg-[#050505]">
      <div ref={ref} className="max-w-site mx-auto px-6 lg:px-12">
        {/* Label */}
        <div
          className={`flex items-center gap-4 mb-16 lg:mb-24 transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <span className="font-mono text-[10px] tracking-[0.45em] text-white/20 uppercase">006 ——</span>
          <span className="font-mono text-[10px] tracking-[0.45em] text-white/20 uppercase">Contact</span>
        </div>

        <div className="grid lg:grid-cols-5 gap-16 lg:gap-24">
          {/* Left — info */}
          <div
            className={`lg:col-span-2 transition-all duration-700 delay-100 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <h2 className="font-display text-5xl lg:text-6xl text-white leading-[0.92] tracking-tight uppercase mb-12">
              Get In<br />
              <span className="text-gold">Touch</span>
            </h2>

            <div className="space-y-8">
              <a
                href="https://www.instagram.com/sunitjadhavofficial"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 group"
              >
                <FiInstagram
                  size={15}
                  className="text-white/20 mt-0.5 group-hover:text-gold transition-colors"
                />
                <div>
                  <p className="text-[10px] tracking-[0.25em] text-white/18 uppercase mb-1">Instagram</p>
                  <p className="text-sm text-white/45 group-hover:text-white transition-colors">
                    @sunitjadhavofficial
                  </p>
                </div>
              </a>

              <div className="flex items-start gap-4">
                <FiMail size={15} className="text-white/20 mt-0.5" />
                <div>
                  <p className="text-[10px] tracking-[0.25em] text-white/18 uppercase mb-1">Email</p>
                  <p className="text-sm text-white/45">contact@sunitjadhav.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <FiMapPin size={15} className="text-white/20 mt-0.5" />
                <div>
                  <p className="text-[10px] tracking-[0.25em] text-white/18 uppercase mb-1">Location</p>
                  <p className="text-sm text-white/45">Mumbai, India</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div
            className={`lg:col-span-3 transition-all duration-700 delay-200 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center min-h-[380px] text-center">
                <FiCheckCircle size={36} className="text-gold mb-6" />
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
                  className="w-full flex items-center justify-center gap-3 py-4 bg-white text-black text-[11px] font-semibold tracking-[0.25em] uppercase hover:bg-gold disabled:opacity-40 transition-colors duration-300 group"
                >
                  {loading ? (
                    'Sending…'
                  ) : (
                    <>
                      Send Message
                      <FiArrowRight
                        size={13}
                        className="group-hover:translate-x-1 transition-transform duration-200"
                      />
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
