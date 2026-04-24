'use client';

import { useState } from 'react';
import { FiArrowRight, FiCheckCircle } from 'react-icons/fi';

const collabTypes = [
  'Brand Ambassador',
  'Social Media',
  'Event Appearance',
  'Content Creation',
  'Other',
];

const budgetRanges = [
  'Under ₹1 Lakh',
  '₹1L – ₹5L',
  '₹5L – ₹10L',
  '₹10L+',
  'Prefer not to say',
];

type BrandForm = {
  brandName: string;
  contactPerson: string;
  email: string;
  collaborationType: string;
  budgetRange: string;
  message: string;
};

const inputClass =
  'w-full bg-transparent border-b border-white/12 py-3 text-white text-sm placeholder-white/20 outline-none focus:border-royal-500 transition-colors duration-200';

export default function Brands() {
  const [form, setForm] = useState<BrandForm>({
    brandName: '',
    contactPerson: '',
    email: '',
    collaborationType: '',
    budgetRange: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<BrandForm>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e: Partial<BrandForm> = {};
    if (!form.brandName.trim()) e.brandName = 'Required';
    if (!form.contactPerson.trim()) e.contactPerson = 'Required';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = 'Valid email required';
    if (!form.collaborationType) e.collaborationType = 'Required';
    if (!form.message.trim()) e.message = 'Required';
    return e;
  };

  const handleChange =
    (k: keyof BrandForm) =>
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
      await fetch('/api/brand-enquiry', {
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

  const FieldError = ({ field }: { field: keyof BrandForm }) =>
    errors[field] ? (
      <p className="text-red-400/80 text-[10px] tracking-wider mt-1">{errors[field]}</p>
    ) : null;

  return (
    <section id="brands" className="py-28 lg:py-40 bg-black">
      <div className="max-w-site mx-auto px-6 lg:px-14">
        {/* Label */}
        <p className="text-[10px] tracking-[0.45em] uppercase text-royal-800 mb-14 lg:mb-20">
          005 —— Brand Partnerships
        </p>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-28">
          {/* Left */}
          <div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white uppercase leading-[0.9] tracking-tight mb-8">
              Work With<br />
              <span className="text-royal-400">Sunit</span>
            </h2>
            <p className="text-white/45 leading-relaxed mb-10 max-w-sm text-[15px]">
              789K+ highly engaged fitness followers across India. Partner with the
              country&apos;s leading IFBB Pro for campaigns that move culture.
            </p>

            <div className="space-y-3 mb-12">
              {collabTypes.map((t) => (
                <div key={t} className="flex items-center gap-3 text-white/30 text-sm">
                  <span className="w-1 h-1 bg-royal-600 flex-shrink-0" />
                  {t}
                </div>
              ))}
            </div>

            <div className="pt-8 border-t border-white/8">
              <p className="text-[10px] tracking-[0.3em] text-white/20 uppercase mb-3">
                Current Sponsor
              </p>
              <p className="text-white font-medium tracking-[0.1em]">One Science Nutrition</p>
            </div>
          </div>

          {/* Right — form */}
          <div>
            {submitted ? (
              <div className="flex flex-col items-center justify-center min-h-[440px] text-center">
                <FiCheckCircle size={36} className="text-royal-400 mb-6" />
                <h3 className="font-display text-2xl text-white tracking-wider uppercase mb-3">
                  Enquiry Received
                </h3>
                <p className="text-white/35 text-sm max-w-xs leading-relaxed">
                  Thank you for your interest. Sunit&apos;s team will review your proposal
                  and respond within 48 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8" noValidate>
                <div className="grid sm:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-[10px] tracking-[0.3em] text-white/25 uppercase mb-2">
                      Brand Name *
                    </label>
                    <input
                      type="text"
                      value={form.brandName}
                      onChange={handleChange('brandName')}
                      placeholder="Your brand"
                      className={inputClass}
                    />
                    <FieldError field="brandName" />
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-[0.3em] text-white/25 uppercase mb-2">
                      Contact Person *
                    </label>
                    <input
                      type="text"
                      value={form.contactPerson}
                      onChange={handleChange('contactPerson')}
                      placeholder="Full name"
                      className={inputClass}
                    />
                    <FieldError field="contactPerson" />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] tracking-[0.3em] text-white/25 uppercase mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={handleChange('email')}
                    placeholder="you@brand.com"
                    className={inputClass}
                  />
                  <FieldError field="email" />
                </div>

                <div className="grid sm:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-[10px] tracking-[0.3em] text-white/25 uppercase mb-2">
                      Type of Collaboration *
                    </label>
                    <select
                      value={form.collaborationType}
                      onChange={handleChange('collaborationType')}
                      className={`${inputClass} cursor-pointer appearance-none`}
                    >
                      <option value="" disabled className="bg-black text-white/40">
                        Select…
                      </option>
                      {collabTypes.map((t) => (
                        <option key={t} value={t} className="bg-black">
                          {t}
                        </option>
                      ))}
                    </select>
                    <FieldError field="collaborationType" />
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-[0.3em] text-white/25 uppercase mb-2">
                      Budget Range
                    </label>
                    <select
                      value={form.budgetRange}
                      onChange={handleChange('budgetRange')}
                      className={`${inputClass} cursor-pointer appearance-none`}
                    >
                      <option value="" className="bg-black text-white/40">
                        Select…
                      </option>
                      {budgetRanges.map((b) => (
                        <option key={b} value={b} className="bg-black">
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] tracking-[0.3em] text-white/25 uppercase mb-2">
                    Message *
                  </label>
                  <textarea
                    value={form.message}
                    onChange={handleChange('message')}
                    rows={4}
                    placeholder="Describe the collaboration you have in mind…"
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
                      Submit Enquiry
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
