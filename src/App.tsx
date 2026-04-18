/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { 
  CheckCircle2, 
  Rocket, 
  Layers, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  Menu, 
  X, 
  Globe, 
  BarChart3,
  MousePointer2,
  Star,
  Target,
  TrendingUp,
  Users,
  MousePointerClick,
  Award,
  CreditCard,
  Smartphone,
  MessageSquare,
  Shield,
  Send,
  Bot,
  User,
  Loader2,
  Minimize2
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

// --- Components ---

const Navbar = ({ onShowPrivacy }: { onShowPrivacy: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Service Tiers', href: '#pricing-tiers' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-brand-dark/80 backdrop-blur-md py-4 border-b border-white/10' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#" className="text-3xl font-display font-bold tracking-tighter flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-red flex items-center justify-center">
            <Globe className="w-5 h-5 text-white" />
          </div>
          <span>JZ <span className="bg-gradient-to-r from-brand-accent via-brand-purple to-brand-red bg-clip-text text-transparent">ATELIER</span></span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-xs font-mono font-bold text-gray-400 hover:text-brand-red transition-colors uppercase tracking-widest">
              {link.name}
            </a>
          ))}
          <a href="#contact" className="bg-brand-red hover:bg-white hover:text-black text-white px-6 py-2 text-sm font-display font-bold transition-all uppercase tracking-wider">
            Get Free Demo
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-brand-gray border-b border-white/10 overflow-hidden"
          >
            <div className="flex flex-col p-8 gap-6">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsOpen(false)}
                  className="text-2xl font-display font-bold text-white hover:text-brand-purple transition-colors uppercase tracking-tighter"
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="#contact" 
                onClick={() => setIsOpen(false)}
                className="bg-brand-purple text-white p-5 font-display text-2xl uppercase tracking-widest text-center shadow-[5px_5px_0px_0px_rgba(0,0,0,0.3)]"
              >
                Get Free Demo
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Marquee = ({ text, reverse = false }: { text: string, reverse?: boolean }) => (
  <div className={`py-6 bg-brand-red overflow-hidden border-y-4 border-black relative z-10 ${reverse ? 'bg-brand-accent' : ''}`}>
    <div className={`flex whitespace-nowrap ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}>
      {[...Array(10)].map((_, i) => (
        <span key={i} className="text-4xl md:text-6xl font-display font-black text-white uppercase tracking-tighter mx-8">
          {text} <span className="text-black opacity-20">//</span>
        </span>
      ))}
    </div>
  </div>
);

const SectionHeading = ({ subtitle, title, description, centered = true }: { subtitle: string, title: string, description?: string, centered?: boolean }) => (
  <div className={`mb-16 ${centered ? 'text-center' : ''}`}>
    <motion.span 
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="text-brand-red font-mono font-bold tracking-[0.3em] uppercase text-xs mb-4 block"
    >
      // {subtitle}
    </motion.span>
    <motion.h2 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className="text-5xl md:text-8xl font-display font-bold mb-6 tracking-tighter uppercase leading-[0.85]"
    >
      {title}
    </motion.h2>
    {description && (
      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-gray-400 font-mono text-sm max-w-2xl mx-auto uppercase tracking-tight leading-relaxed"
      >
        {description}
      </motion.p>
    )}
  </div>
);

const FounderNote = () => (
  <section className="py-24 bg-brand-dark border-y border-white/5">
    <div className="max-w-4xl mx-auto px-6">
      <div className="rough-card p-12 bg-white/[0.02] border-brand-purple/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <Globe className="w-32 h-32" />
        </div>
        <span className="text-brand-purple font-mono text-xs font-bold uppercase tracking-[0.4em] mb-8 block">// A Note From The Founders</span>
        <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 uppercase tracking-tighter leading-none">
          "Most agencies build pretty websites that do <span className="text-brand-red italic">nothing</span>."
        </h2>
        <div className="space-y-6 text-gray-400 font-mono text-sm uppercase tracking-tight leading-relaxed">
          <p>
            We started JZ Atelier because we were tired of seeing local business owners get ripped off by agencies charging $5,000 for slow, bloated templates that don't convert.
          </p>
          <p>
            We don't do "pretty." We do <span className="text-white font-bold">performance.</span> We build digital weapons designed to dominate your local market and make your competition irrelevant.
          </p>
          <p>
            If you're looking for a generic site, go to Wix. If you're looking to win, you're in the right place.
          </p>
        </div>
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row gap-8 md:gap-12">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-brand-red/20 border border-brand-red/40 flex items-center justify-center">
              <span className="font-display text-2xl font-bold">ZL</span>
            </div>
            <div>
              <p className="font-display text-xl font-bold uppercase tracking-tight">Zander Lewis</p>
              <p className="text-[10px] font-mono text-brand-red uppercase tracking-widest">Founder // JZ Atelier</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-brand-purple/20 border border-brand-purple/40 flex items-center justify-center">
              <span className="font-display text-2xl font-bold">JW</span>
            </div>
            <div>
              <p className="font-display text-xl font-bold uppercase tracking-tight">Jamis Ward</p>
              <p className="text-[10px] font-mono text-brand-purple uppercase tracking-widest">Co-Owner // JZ Atelier</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const PerformanceProof = () => (
  <section className="py-24 bg-black overflow-hidden">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <SectionHeading 
            subtitle="The Speed Gap" 
            title="Speed is Revenue" 
            description="A 1-second delay in load time can cost you 7% in conversions. We don't just talk speed—we prove it."
          />
          <div className="space-y-8 mt-12">
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-mono font-bold uppercase tracking-widest mb-2">
                <span>JZ Atelier Build</span>
                <span className="text-brand-accent">99/100</span>
              </div>
              <div className="h-4 bg-white/5 border border-white/10 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: '99%' }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="h-full bg-brand-accent shadow-[0_0_20px_rgba(34,197,94,0.4)]"
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-mono font-bold uppercase tracking-widest mb-2">
                <span>Generic Agency Template</span>
                <span className="text-brand-red">42/100</span>
              </div>
              <div className="h-4 bg-white/5 border border-white/10 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: '42%' }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="h-full bg-brand-red shadow-[0_0_20px_rgba(239,68,68,0.4)]"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="rough-card p-12 bg-white/5 border-white/10 flex flex-col items-center justify-center text-center">
            <div className="text-8xl md:text-9xl font-display font-black text-brand-accent mb-4 tracking-tighter">0.8s</div>
            <p className="text-xl font-display font-bold uppercase tracking-tight mb-2 text-white">Average Load Time</p>
            <p className="text-xs font-mono text-gray-500 uppercase tracking-widest">Faster than 98% of the web</p>
          </div>
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-brand-red flex items-center justify-center -rotate-12 shadow-2xl">
            <span className="font-display text-4xl font-black text-white">FAST</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const CostOfNothing = () => (
  <section className="py-24 bg-brand-red text-white overflow-hidden">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div className="order-2 lg:order-1">
          <div className="rough-card p-12 bg-black border-white/20 shadow-[20px_20px_0px_0px_rgba(255,255,255,0.1)]">
            <h3 className="text-3xl font-display font-bold mb-8 uppercase tracking-tight border-b border-white/10 pb-4">The Math of Failure</h3>
            <div className="space-y-8">
              <div className="flex justify-between items-end">
                <span className="text-xs font-mono uppercase tracking-widest text-gray-400">Monthly Traffic</span>
                <span className="text-2xl font-display font-bold">1,000 Visitors</span>
              </div>
              <div className="flex justify-between items-end">
                <span className="text-xs font-mono uppercase tracking-widest text-gray-400">Slow Site Conv. Rate (1%)</span>
                <span className="text-2xl font-display font-bold">10 Leads</span>
              </div>
              <div className="flex justify-between items-end border-t border-white/10 pt-8">
                <span className="text-xs font-mono uppercase tracking-widest text-brand-red font-bold">JZ Atelier Conv. Rate (5%+)</span>
                <span className="text-4xl font-display font-bold text-brand-accent">50+ Leads</span>
              </div>
              <p className="text-[10px] font-mono uppercase tracking-widest text-gray-500 mt-4">
                // You are losing 40+ customers every single month by keeping your current site.
              </p>
            </div>
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <span className="text-white/60 font-mono text-xs font-bold uppercase tracking-[0.4em] mb-4 block">// The Reality Check</span>
          <h2 className="text-5xl md:text-8xl font-display font-bold mb-8 uppercase tracking-tighter leading-[0.85]">
            The Cost of <br />Doing <span className="italic">Nothing</span>
          </h2>
          <p className="text-white/80 font-mono text-sm uppercase tracking-widest mb-12 leading-relaxed">
            Every day you wait is another day your competition steals your leads. A slow, outdated website isn't just an eyesore—it's a massive leak in your revenue. We don't just fix sites; we plug the leaks.
          </p>
          <a href="#contact" className="inline-block bg-white text-brand-red px-10 py-4 font-display font-bold hover:bg-black hover:text-white transition-all uppercase tracking-widest">
            Stop The Bleeding
          </a>
        </div>
      </div>
    </div>
  </section>
);

const LocalAuthority = () => (
  <section className="py-12 bg-black border-b border-white/5">
    <div className="max-w-7xl mx-auto px-6">
      <p className="text-center text-[10px] font-mono text-gray-600 uppercase tracking-[0.5em] mb-8">Trusted by Local Industry Leaders</p>
      <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
        {['AUTO PROS', 'ELITE HVAC', 'SUMMIT CONST.', 'LUXE BEAUTY', 'GREEN EDGE'].map((name, i) => (
          <span key={i} className="font-display text-2xl md:text-4xl font-black tracking-tighter text-white whitespace-nowrap">{name}</span>
        ))}
      </div>
    </div>
  </section>
);

const FAQ = () => {
  const faqs = [
    {
      q: "Do I own the website after it's built?",
      a: "100%. Once the final payment is made, you own all the code, assets, and domain. We don't hold your business hostage."
    },
    {
      q: "What is your refund policy?",
      a: "Due to the custom nature of our digital builds and the immediate allocation of resources, we have a strict NO REFUND policy. However, our Ironclad Guarantee ensures you see a demo first before committing to the final build."
    },
    {
      q: "How long does the process take?",
      a: "For Starter packages, we aim for a 7-14 day launch. Complex Agency builds can take 4-6 weeks depending on custom logic requirements."
    },
    {
      q: "What if I don't like the initial demo?",
      a: "Our start is risk-free. If you're not happy with the direction of the initial demo, we'll either pivot or you can walk away. No hard feelings."
    },
    {
      q: "Is hosting and domain included?",
      a: "We handle the setup for you. Domain and hosting are handled via Vercel's high-performance edge network."
    }
  ];

  return (
    <section id="faq" className="py-24 bg-black border-y border-white/5">
      <div className="max-w-4xl mx-auto px-6">
        <SectionHeading subtitle="Intel" title="Common Questions" centered={false} />
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="border border-white/10 p-8 hover:border-brand-purple/30 transition-colors bg-white/[0.02]"
            >
              <h3 className="text-xl font-display font-bold uppercase tracking-tight mb-4 flex gap-4">
                <span className="text-brand-purple">Q:</span> {faq.q}
              </h3>
              <p className="text-sm font-mono text-gray-400 uppercase tracking-tight leading-relaxed">
                <span className="text-brand-red font-bold">A:</span> {faq.a}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Comparison = () => {
  const points = [
    { feature: "Initial Cost", jz: "$499+", them: "$5,000+" },
    { feature: "Monthly Fees", jz: "$30–$60/mo (Optional)", them: "$150–$300/mo" },
    { feature: "Launch Speed", jz: "5–14 Days", them: "2–3 Months" },
    { feature: "Performance", jz: "99/100 Speed", them: "Bloated Templates" },
    { feature: "Risk", jz: "Free Demo First", them: "Pay Upfront" },
  ];

  return (
    <section className="py-24 bg-black border-y border-white/5">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeading subtitle="The Gap" title="Us vs. The Competition" />
        <div className="border border-white/10 overflow-hidden">
          <div className="grid grid-cols-3 bg-white/5 border-b border-white/10">
            <div className="p-6 font-mono text-[10px] uppercase tracking-widest text-gray-500">Feature</div>
            <div className="p-6 font-display font-bold uppercase tracking-tight text-brand-red">JZ Atelier</div>
            <div className="p-6 font-mono text-[10px] uppercase tracking-widest text-gray-500">Generic Agency</div>
          </div>
          {points.map((point, i) => (
            <div key={i} className="grid grid-cols-3 border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
              <div className="p-6 font-mono text-xs uppercase tracking-tight text-gray-400 border-r border-white/5">{point.feature}</div>
              <div className="p-6 font-display font-bold uppercase tracking-tight text-white border-r border-white/5">{point.jz}</div>
              <div className="p-6 font-mono text-xs uppercase tracking-tight text-gray-600">{point.them}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Guarantee = () => (
  <section className="py-24 bg-brand-red">
    <div className="max-w-4xl mx-auto px-6 text-center">
      <div className="inline-block p-4 bg-white/10 mb-8">
        <ShieldCheck className="w-16 h-16 text-white" />
      </div>
      <h2 className="text-5xl md:text-7xl font-display font-bold mb-6 uppercase tracking-tighter text-white">The Ironclad Guarantee</h2>
      <p className="text-white/80 font-mono text-sm uppercase tracking-widest mb-12 max-w-2xl mx-auto leading-relaxed">
        If we don't build you a demo that makes you want to fire your current agency on the spot, you don't pay a cent. We take all the risk because we know we win.
      </p>
      <div className="flex justify-center">
        <a href="#contact" className="bg-white text-brand-red px-12 py-5 font-display text-2xl font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all">
          Claim Your Demo
        </a>
      </div>
    </div>
  </section>
);

const Pricing = () => (
  <section id="pricing-tiers" className="py-24 bg-black text-white border-y border-white/10">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-20">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-brand-purple font-mono text-xs font-bold uppercase tracking-[0.4em] mb-4 block"
        >
          // Investment Tiers
        </motion.span>
        <h2 className="text-5xl md:text-7xl font-display font-bold uppercase tracking-tighter">Service Tiers</h2>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Starter */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border border-white/10 p-8 flex flex-col hover:border-brand-purple/50 transition-all duration-500 bg-white/[0.02]"
        >
          <h3 className="text-xl font-display font-bold uppercase mb-2 tracking-tight">Starter</h3>
          <div className="text-4xl font-display font-bold mb-1 tracking-tighter">$499</div>
          <p className="text-[9px] font-mono text-brand-purple font-bold uppercase tracking-widest mb-6">ONE-TIME // NO REFUNDS</p>
          <ul className="space-y-4 mb-8 flex-grow font-mono text-[9px] uppercase tracking-[0.2em] text-gray-500">
            <li className="flex items-center gap-2"><div className="w-1 h-1 bg-brand-red" /> One-Page Build</li>
            <li className="flex items-center gap-2"><div className="w-1 h-1 bg-brand-red" /> 5-Day Fast Launch</li>
            <li className="flex items-center gap-2"><div className="w-1 h-1 bg-brand-red" /> Mobile Optimized</li>
            <li className="flex items-center gap-2"><div className="w-1 h-1 bg-brand-red" /> Basic SEO Setup</li>
          </ul>
          <div className="flex flex-col gap-3">
            <a href="#contact" className="border border-white/20 py-3 text-center font-display font-bold hover:bg-white hover:text-black transition-all uppercase tracking-widest text-xs">
              Select Starter
            </a>
          </div>
        </motion.div>

        {/* Pro */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="border-2 border-white p-8 flex flex-col relative scale-105 bg-white/5 z-10 shadow-[15px_15px_0px_0px_rgba(168,85,247,0.1)]"
        >
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-purple text-white px-4 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.3em] whitespace-nowrap">
            Growth Tier
          </div>
          <h3 className="text-xl font-display font-bold uppercase mb-2 tracking-tight">Professional</h3>
          <div className="text-4xl font-display font-bold mb-1 tracking-tighter">$999</div>
          <p className="text-[9px] font-mono text-brand-purple font-bold uppercase tracking-widest mb-6">+ $30/MO MAINTENANCE</p>
          <ul className="space-y-4 mb-8 flex-grow font-mono text-[9px] uppercase tracking-[0.2em] text-gray-300">
            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-brand-purple" /> Multi-Page Site</li>
            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-brand-purple" /> Custom Forms</li>
            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-brand-purple" /> SEO Indexing</li>
            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-brand-purple" /> Speed Optimization</li>
          </ul>
          <div className="flex flex-col gap-3">
            <a href="#contact" className="bg-white text-black py-3 text-center font-display font-bold hover:bg-brand-purple hover:text-white transition-all uppercase tracking-widest text-xs">
              Select Pro
            </a>
          </div>
        </motion.div>

        {/* Business */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="border border-white/10 p-8 flex flex-col hover:border-brand-purple/50 transition-all duration-500 bg-white/[0.02]"
        >
          <h3 className="text-xl font-display font-bold uppercase mb-2 tracking-tight">Business</h3>
          <div className="text-4xl font-display font-bold mb-1 tracking-tighter">$2,499</div>
          <p className="text-[9px] font-mono text-brand-purple font-bold uppercase tracking-widest mb-6">+ $60/MO MAINTENANCE</p>
          <ul className="space-y-4 mb-8 flex-grow font-mono text-[9px] uppercase tracking-[0.2em] text-gray-500">
            <li className="flex items-center gap-2"><div className="w-1 h-1 bg-brand-purple" /> Market Dominance</li>
            <li className="flex items-center gap-2"><div className="w-1 h-1 bg-brand-purple" /> Adv. Analytics</li>
            <li className="flex items-center gap-2"><div className="w-1 h-1 bg-brand-purple" /> Priority Support</li>
            <li className="flex items-center gap-2"><div className="w-1 h-1 bg-brand-purple" /> Full Ads Integration</li>
          </ul>
          <div className="flex flex-col gap-3">
            <a href="#contact" className="border border-white/20 py-3 text-center font-display font-bold hover:bg-white hover:text-black transition-all uppercase tracking-widest text-xs">
              Select Business
            </a>
          </div>
        </motion.div>

        {/* Enterprise */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="border border-white/10 p-8 flex flex-col hover:border-brand-purple/50 transition-all duration-500 bg-white/[0.02]"
        >
          <h3 className="text-xl font-display font-bold uppercase mb-2 tracking-tight">Enterprise</h3>
          <div className="text-4xl font-display font-bold mb-1 tracking-tighter">$4,999+</div>
          <p className="text-[9px] font-mono text-brand-purple font-bold uppercase tracking-widest mb-6">CUSTOM SOLUTIONS</p>
          <ul className="space-y-4 mb-8 flex-grow font-mono text-[9px] uppercase tracking-[0.2em] text-gray-500">
            <li className="flex items-center gap-2"><div className="w-1 h-1 bg-brand-purple" /> Custom Logic</li>
            <li className="flex items-center gap-2"><div className="w-1 h-1 bg-brand-red" /> Full Brand Suite</li>
            <li className="flex items-center gap-2"><div className="w-1 h-1 bg-brand-red" /> 24/7 Monitoring</li>
            <li className="flex items-center gap-2"><div className="w-1 h-1 bg-brand-red" /> Marketing Strategy</li>
          </ul>
          <div className="flex flex-col gap-3">
            <a href="#contact" className="border border-white/20 py-3 text-center font-display font-bold hover:bg-white hover:text-black transition-all uppercase tracking-widest text-xs">
              Select Enterprise
            </a>
          </div>
        </motion.div>
      </div>
      
      {/* Risk-Free CTA */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-20 p-8 border border-brand-red bg-brand-red/5 flex flex-col md:flex-row items-center justify-between gap-8"
      >
        <div className="flex items-center gap-6">
          <ShieldCheck className="w-12 h-12 text-brand-red" />
          <div className="text-left">
            <h4 className="text-2xl font-display font-bold uppercase tracking-tight">Risk-Free Start</h4>
            <p className="text-xs font-mono text-gray-400 uppercase tracking-widest">We build the demo first. You only pay if you love it.</p>
          </div>
        </div>
        <a href="#contact" className="bg-brand-red text-white px-10 py-4 font-display font-bold hover:bg-white hover:text-black transition-all uppercase tracking-widest">
          Start My Free Demo
        </a>
      </motion.div>
    </div>
  </section>
);

const SYSTEM_INSTRUCTION = `
You are the AI Customer Support Agent for JZ Atelier, a premium digital strategy and web design studio.
Your goal is to be professional, direct, and helpful, reflecting the "rough professional" and high-performance brand identity.

Key Business Information:
- Name: JZ Atelier
- Services: 
  * Custom Website Design: Starts at $499. Includes mobile optimization, SEO, and professional builds.
  * Ad Campaigns: Starts at $150. We launch targeted ads within 24-48 hours.
  * Site Maintenance: $30-$60/month for full site management and updates.
- Ad Packages:
  * Starter Ads ($150): Includes 1 ad, basic targeting. Note: There is a $0.20 fee per view, capped at 1000 views.
  * Advanced Ads ($350): Includes 3 ads, enhanced targeting.
  * Elite Package ($650): Includes 5 ads, advanced setup.
  * Premium Ads ($1450): 10 ads, targeted audience, full market dominance.
- Payments: We accept CashApp and PayPal as primary methods.
- Capacity: We only accept 5 projects per month to ensure premium quality. The banner shows current availability (usually 1-5 spots left depending on the date).
- Comparison Points:
  * Cost: We are $499+ vs Generic Agencies at $5,000+.
  * Fees: Optional $30-$60/mo maintenance (you own the code) vs $150-$300/mo elsewhere.
  * Speed: 5-14 days vs 2-3 months.
  * Risk: Free demo first vs paying upfront.
- Policies:
  * NO REFUNDS: Due to the custom nature of our digital builds and immediate resource allocation, we have a strict NO REFUND policy on both websites and ads.
  * AD GUARANTEE: We do not guarantee a specific conversion or "person rate". However, we guarantee each ad will reach a minimum of 1000 viewers. Campaigns are considered complete once the 1000-viewer threshold is met per ad.
  * IRONCLAD GUARANTEE: Clients see a demo BEFORE committing to the final build. If they don't like the demo, they don't pay for the full build.
  * OWNERSHIP: Clients own 100% of the code and assets upon final payment.
- The Math of Failure: A slow site (1% conversion) vs JZ Atelier (5%+ conversion) means a business with 1,000 visitors loses 40+ customers every month by doing nothing.
- Tier Knowledge:
  * Starter ($499): One-page site, fast 5-day launch, professional presence.
  * Professional ($999): Multi-page, SEO focus, custom contact engine.
  * Business ($2,499): Advanced optimization, market analysis, priority support.
  * Enterprise ($4,999+): Custom app logic, full branding, 24/7 monitoring.
- Philosophy: We build "Digital Weapons" that "Dominate Your Market". We focus on performance (0.8s load time) and ROI, not just "pretty" pictures.
- Founders: 
  * Zander Lewis: Owner & Lead Designer. He started JZ Atelier to stop local businesses from getting ripped off by slow, expensive agency templates.
  * Jamis Ward: Co-Owner & Strategic Partner. Partner in driving digital strategy and high-performance builds.
- FAQ Knowledge:
  * Ownership: Clients own 100% of the site, code, and domain after final payment.
  * Timeline: Starter sites take 5-14 days. Agency builds take 4-6 weeks.
  * Risk-Free: If they don't like the initial demo, we pivot or they walk away.
  * Hosting/Domain: We handle setup. Hosting is on Vercel's edge network.
- Support: For direct human support, clients can text 319-406-2965 or email zanderlewis80@gmail.com. Remind them it is TEXT ONLY for the phone line.
- Philosophy: We build websites that "Outperform Every Competitor". We focus on direct results and no fluff.

Guidelines:
- Keep responses concise and impactful.
- If a user wants a demo, direct them to the "Get Free Demo" form on the website.
- If they have technical issues, suggest texting the support line or emailing the team.
- Always maintain a premium, confident tone.
`;

interface Message {
  role: 'user' | 'model';
  text: string;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Welcome to JZ Atelier. How can I help you dominate your market today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        setMessages(prev => [...prev, { 
          role: 'model', 
          text: "AI service is currently not configured for this deployment. Please ensure GEMINI_API_KEY is set in the environment. For immediate assistance, text 319-406-2965." 
        }]);
        setIsLoading(false);
        return;
      }

      const ai = new GoogleGenAI({ apiKey });
      
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          ...history,
          { role: 'user', parts: [{ text: userMessage }] }
        ],
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        }
      });

      const aiText = response.text || "I'm sorry, I couldn't process that. Please try again, text 319-406-2965, or email our support team.";
      setMessages(prev => [...prev, { role: 'model', text: aiText }]);
    } catch (error) {
      console.error("ChatBot Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Connection error. Please check your network, text 319-406-2965, or email zanderlewis80@gmail.com for direct help." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 md:bottom-[104px] right-8 z-[110] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              height: isMinimized ? '64px' : 'min(500px, 70vh)'
            }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-[calc(100vw-32px)] md:w-[400px] bg-brand-dark border-2 border-brand-purple shadow-[10px_10px_0px_0px_rgba(168,85,247,0.2)] mb-4 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-4 bg-brand-purple flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-white" />
                <span className="font-display font-bold text-white uppercase tracking-widest">JZ AI Support</span>
              </div>
              <div className="flex items-center gap-2">
                <button 
                   onClick={() => setIsMinimized(!isMinimized)}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div 
                  ref={scrollRef}
                  className="flex-grow overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-brand-purple/20"
                >
                  {messages.map((m, i) => (
                    <div 
                      key={i} 
                      className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] p-3 font-mono text-xs uppercase tracking-tight ${
                        m.role === 'user' 
                          ? 'bg-brand-purple text-white border-l-4 border-white/20' 
                          : 'bg-white/5 text-gray-300 border-l-4 border-brand-purple'
                      }`}>
                        <div className="flex items-center gap-2 mb-1 opacity-50">
                          {m.role === 'user' ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                          <span>{m.role === 'user' ? 'CLIENT' : 'ATELIER AI'}</span>
                        </div>
                        {m.text}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-white/5 p-3 border-l-4 border-brand-purple">
                        <Loader2 className="w-4 h-4 text-brand-purple animate-spin" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Input */}
                <div className="p-4 border-t border-white/10 bg-brand-gray">
                  <form 
                    onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                    className="flex gap-2"
                  >
                    <input 
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-grow bg-white/5 border border-white/10 px-4 py-2 focus:outline-none focus:border-brand-purple font-mono text-xs text-white uppercase"
                    />
                    <button 
                      type="submit"
                      disabled={isLoading}
                      className="bg-brand-purple text-white p-2 hover:bg-white hover:text-black transition-all disabled:opacity-50"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </form>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          setIsOpen(true);
          setIsMinimized(false);
        }}
        className={`w-16 h-16 bg-brand-purple flex items-center justify-center shadow-[5px_5px_0px_0px_rgba(0,0,0,0.3)] transition-all ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <MessageSquare className="w-8 h-8 text-white" />
      </motion.button>
    </div>
  );
};

export default function App() {
  const [rating, setRating] = useState(5);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const currentMonth = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date());
  const dayOfMonth = new Date().getDate();
  // Start with 5 spots, drop based on date to create urgency
  const spotsLeft = Math.max(1, 5 - Math.floor(dayOfMonth / 6));

  return (
    <div className="min-h-screen selection:bg-brand-red/30">
      <div className="bg-brand-red py-2 text-center relative z-[60]">
        <p className="text-[10px] font-mono font-bold text-white uppercase tracking-[0.3em]">
          <span className="animate-pulse">●</span> Capacity Status: {spotsLeft} of 5 spots remaining for {currentMonth}
        </p>
      </div>
      <motion.div className="scroll-progress" style={{ scaleX }} />
      <div className="grid-overlay" />
      <Navbar onShowPrivacy={() => setShowPrivacy(true)} />
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
      <div className="fixed inset-0 pointer-events-none z-[101] opacity-[0.02] scanline" />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-30">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand-red/20 blur-[120px]" />
          <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] bg-brand-purple/10 blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[10%] w-[50%] h-[50%] bg-brand-accent/10 blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white text-black text-xs font-mono font-bold mb-8 uppercase tracking-tighter">
              <Zap className="w-4 h-4 fill-current" />
              Direct Results // No Fluff
            </span>
            <h1 className="text-5xl md:text-8xl lg:text-9xl font-display font-bold tracking-tighter mb-8 leading-[0.9] uppercase">
              Websites That <br />
              <span className="gradient-text glitch-text" data-text="Dominate Your Market">Dominate Your Market</span>
            </h1>
            <p className="text-sm md:text-xl text-gray-400 font-mono max-w-3xl mx-auto mb-12 leading-relaxed uppercase tracking-tight">
              Custom builds for local pros starting at <span className="text-brand-red font-bold">$499</span>. 
              Built to dominate your local market.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <motion.a 
                href="#contact" 
                whileHover={{ scale: 1.05, x: -5, y: -5 }}
                whileTap={{ scale: 0.95, x: 0, y: 0 }}
                className="brutalist-button w-full sm:w-auto flex items-center justify-center gap-3"
              >
                Get Free Demo <ArrowRight className="w-6 h-6" />
              </motion.a>
              <motion.a 
                href="#pricing-tiers" 
                whileHover={{ backgroundColor: "#fff", color: "#000" }}
                className="w-full sm:w-auto border-2 border-white text-white px-8 py-4 font-display text-2xl tracking-wider transition-all uppercase"
              >
                Service Tiers
              </motion.a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-20 relative"
          >
            {/* Floating elements for visual interest */}
            <div className="max-w-md mx-auto rough-card p-6 animate-pulse bg-brand-dark border-brand-purple/30">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-brand-purple/10 flex items-center justify-center border border-brand-purple/20">
                  <Rocket className="text-brand-purple" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-display font-bold uppercase">System Status: Active</p>
                  <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">JZ Atelier Engine Running</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
          >
            <span className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest">Scroll to explore</span>
            <div className="w-[2px] h-12 bg-linear-to-b from-brand-red to-transparent" />
          </motion.div>
        </div>
      </section>

      <Marquee text="Dominate Your Local Market // High Performance Builds // No Monthly Fees // Direct Results" />
      <div className="sawtooth" />

      {/* Bento Grid Features */}
      <section id="why-us" className="py-24 bg-brand-dark overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading 
            subtitle="THE ADVANTAGE" 
            title="Why We Win" 
            description="We don't just build websites. We build digital assets that work for you 24/7."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-2 rough-card p-12 bg-white/5 border-brand-accent/20 flex flex-col justify-between"
            >
              <div>
                <div className="w-16 h-16 bg-brand-accent/10 flex items-center justify-center mb-8 border border-brand-accent/20">
                  <Zap className="w-8 h-8 text-brand-accent" />
                </div>
                <h3 className="text-4xl md:text-6xl font-display font-bold mb-4 uppercase leading-none">Lightning Fast <br />Performance</h3>
                <p className="text-gray-400 font-mono text-sm uppercase tracking-tight max-w-xl leading-relaxed">
                  Our sites load in under 1 second. Fast sites rank higher on Google and convert more customers. We don't use bloated templates.
                </p>
              </div>
              <div className="mt-12 flex flex-wrap gap-4">
                <div className="px-4 py-2 bg-brand-accent/10 border border-brand-accent/20 text-[10px] font-mono font-bold uppercase tracking-widest">99/100 PageSpeed</div>
                <div className="px-4 py-2 bg-brand-accent/10 border border-brand-accent/20 text-[10px] font-mono font-bold uppercase tracking-widest">SEO Optimized</div>
                <div className="px-4 py-2 bg-brand-accent/10 border border-brand-accent/20 text-[10px] font-mono font-bold uppercase tracking-widest">Zero Bloat</div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="rough-card p-12 bg-brand-red/5 border-brand-red/20 flex flex-col items-center text-center justify-center"
            >
              <div className="w-16 h-16 bg-brand-red/10 flex items-center justify-center mb-8 border border-brand-red/20">
                <ShieldCheck className="w-8 h-8 text-brand-red" />
              </div>
              <h3 className="text-4xl font-display font-bold mb-4 uppercase leading-none">Zero Monthly Fees</h3>
              <p className="text-gray-400 font-mono text-sm uppercase tracking-tight leading-relaxed">
                Stop paying $200/mo for basic maintenance. You own your site. One-time payment, lifetime value.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="rough-card p-12 bg-white/5 border-white/10 flex flex-col items-center text-center justify-center"
            >
              <div className="w-16 h-16 bg-white/10 flex items-center justify-center mb-8 border border-white/20">
                <MousePointer2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-4xl font-display font-bold mb-4 uppercase leading-none">Conversion Driven</h3>
              <p className="text-gray-400 font-mono text-sm uppercase tracking-tight leading-relaxed">
                Every pixel is designed to make your phone ring. We focus on ROI, not just "pretty" pictures.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="md:col-span-2 rough-card p-12 bg-brand-accent/5 border-brand-accent/20 flex flex-col md:flex-row gap-12 items-center"
            >
              <div className="flex-1">
                <h3 className="text-4xl md:text-6xl font-display font-bold mb-4 uppercase leading-none">Mobile First <br />Design</h3>
                <p className="text-gray-400 font-mono text-sm uppercase tracking-tight leading-relaxed">
                  80% of your local customers are on their phones. We build for the thumb first, ensuring a seamless experience on any device.
                </p>
              </div>
              <div className="w-full md:w-64 h-48 bg-black/40 border border-white/10 flex items-center justify-center relative overflow-hidden">
                <div className="w-24 h-40 border-2 border-white/20 rounded-2xl relative">
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-white/20 rounded-full" />
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 border border-white/20 rounded-full" />
                  <div className="absolute inset-2 bg-brand-red/10 flex flex-col gap-1 p-2">
                    <div className="w-full h-2 bg-white/20" />
                    <div className="w-2/3 h-2 bg-white/20" />
                    <div className="w-full h-8 bg-brand-red/40 mt-auto" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Marquee text="Built for Speed // Built for Conversion // Built for You" reverse />
      <div className="sawtooth rotate-180" />

      <Comparison />
      <LocalAuthority />
      <PerformanceProof />
      <CostOfNothing />
      <FounderNote />

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-brand-gray/30">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading 
            subtitle="The Process" 
            title="Simple 4-Step Process" 
            description="We handle everything from design to launch, so you can focus on running your business."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-0">
            {[
              {
                step: "01",
                icon: <MousePointer2 className="w-8 h-8 text-brand-red" />,
                title: "RECON",
                desc: "We analyze your competition and find the holes in their strategy. We don't guess—we target."
              },
              {
                step: "02",
                icon: <Layers className="w-8 h-8 text-brand-red" />,
                title: "PROTOTYPE",
                desc: "We build your custom demo first. You see the weapon before we deploy it. Zero risk."
              },
              {
                step: "03",
                icon: <Rocket className="w-8 h-8 text-brand-red" />,
                title: "DEPLOYMENT",
                desc: "Once you approve, we launch. High-speed servers, SEO indexing, and instant visibility."
              },
              {
                step: "04",
                icon: <BarChart3 className="w-8 h-8 text-brand-red" />,
                title: "DOMINANCE",
                desc: "We don't stop at launch. We scale with ads and maintenance to keep you at the top."
              }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="rough-card p-10 border-white/5 hover:bg-brand-red group transition-all"
              >
                <div className="text-6xl font-display font-black text-white/5 mb-6 group-hover:text-white/20 transition-colors">
                  {item.step}
                </div>
                <div className="mb-6 group-hover:text-white transition-colors">{item.icon}</div>
                <h3 className="text-2xl font-display font-bold mb-4 group-hover:text-white">{item.title}</h3>
                <p className="text-gray-400 font-mono text-sm leading-relaxed group-hover:text-white/80">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Pricing />
      <Guarantee />

      {/* Traffic & Ads Section */}
      <section id="traffic-ads" className="py-24 bg-brand-dark relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-[30%] h-[30%] bg-brand-accent/5 blur-[100px] -z-10" />
        <div className="absolute bottom-0 left-0 w-[30%] h-[30%] bg-brand-red/5 blur-[100px] -z-10" />

        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading 
            subtitle="Traffic & Ads" 
            title="Traffic & Ads That Bring You Customers" 
            description="Get Real Traffic to Your Website — Fast. We launch targeted ads that start bringing visitors to your business within 24–48 hours."
          />

          {/* Section 2: How Our Ads Work */}
          <div className="grid md:grid-cols-3 gap-8 mb-24">
            {[
              {
                step: "01",
                title: "Strategy Setup",
                icon: <Target className="w-10 h-10 text-brand-red" />,
                points: ["Analyze business & local market", "Create ads tailored to audience"]
              },
              {
                step: "02",
                title: "Ad Launch",
                icon: <Zap className="w-10 h-10 text-brand-accent" />,
                points: ["Live on major platforms fast", "Visibility & clicks within 48h"]
              },
              {
                step: "03",
                title: "Optimization",
                icon: <TrendingUp className="w-10 h-10 text-white" />,
                points: ["Improve performance over time", "Adjust targeting for better results"]
              }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="rough-card p-8 group hover:border-brand-red transition-all"
              >
                <div className="flex justify-between items-start mb-8">
                  <div className="p-4 bg-white/5 border border-white/10 group-hover:bg-brand-red/10 group-hover:border-brand-red/20 transition-all">
                    {item.icon}
                  </div>
                  <span className="text-4xl font-display font-bold text-white/10 group-hover:text-brand-red/20 transition-all">{item.step}</span>
                </div>
                <h3 className="text-2xl font-display font-bold mb-6 uppercase tracking-tight">{item.title}</h3>
                <ul className="space-y-3">
                  {item.points.map((point, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-3 text-gray-400 font-mono text-xs uppercase tracking-tight leading-relaxed">
                      <div className="w-1.5 h-1.5 bg-brand-red mt-1 shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Section 3: Our Guarantee */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rough-card p-8 md:p-16 border-brand-red bg-brand-red/5 mb-24 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Award className="w-24 h-24 md:w-32 md:h-32" />
            </div>
            <div className="max-w-3xl relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-brand-red flex items-center justify-center">
                  <Award className="text-white w-6 h-6 md:w-7 md:h-7" />
                </div>
                <h3 className="text-3xl md:text-4xl font-display font-bold uppercase tracking-tight">Traffic Launch Guarantee</h3>
              </div>
              <p className="text-lg md:text-2xl font-display text-white uppercase tracking-tight leading-tight mb-8">
                "We guarantee your ads will begin generating targeted traffic. If your campaign does not produce traffic, we will continue optimizing and running your ads at no additional service cost until it does."
              </p>
              <div className="flex items-center gap-2 text-brand-red font-mono font-bold text-xs uppercase tracking-[0.2em]">
                // Built on Trust // No Risk // Real Results
              </div>
            </div>
          </motion.div>

          {/* Section 4 & 5: Pricing & Info */}
          <div className="grid lg:grid-cols-4 gap-6 mb-12">
            {[
              { name: "Starter Ads", price: "$150", fee: "Service Fee", features: ["Includes 1 ad", "Basic targeting", "$0.20 fee per view", "Hits 1000 viewers min."] },
              { name: "Advanced Ads", price: "$350", fee: "One-time", features: ["3 ads included", "Enhanced targeting", "Market growth", "1000 viewers per ad"], popular: true },
              { name: "Elite Package", price: "$650", fee: "One-time", features: ["5 ads included", "Advanced setup", "Strategic launch", "Professional tracking"] },
              { name: "Premium Ads", price: "$1,450", fee: "Enterprise", features: ["10 ads included", "Targeted audience", "Market dominance", "Premium priority"] }
            ].map((pkg, idx) => (
              <div key={idx} className={`rough-card p-6 flex flex-col relative ${pkg.popular ? 'border-brand-red bg-brand-red/5 scale-105 z-10' : 'border-white/10'}`}>
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-red text-white text-[10px] font-mono font-black uppercase tracking-widest px-4 py-1 whitespace-nowrap">
                    Most Popular // Best Value
                  </div>
                )}
                <h4 className="text-[10px] font-mono font-bold text-gray-500 mb-2 uppercase tracking-widest">{pkg.name}</h4>
                <div className="text-4xl font-display font-bold mb-1 tracking-tighter">{pkg.price}</div>
                <p className="text-[10px] font-mono text-brand-red font-bold uppercase tracking-widest mb-6">{pkg.fee}</p>
                <ul className="space-y-3 mb-8 flex-grow">
                  {pkg.features.map((f, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-2 text-[10px] font-mono text-gray-400 uppercase tracking-tight">
                      <CheckCircle2 className={`w-3 h-3 ${f.includes('$0.20') ? 'text-gray-600' : 'text-brand-red'}`} /> 
                      <span className={f.includes('$0.20') ? 'text-gray-500 line-through' : ''}>{f}</span>
                      {f.includes('$0.20') && <span className="text-brand-red font-bold ml-1">REQUIRED</span>}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-24">
            <div className="md:col-span-2 p-8 bg-white/5 border-l-4 border-brand-red flex flex-col md:flex-row justify-between items-center gap-8">
              <div>
                <h4 className="text-2xl font-display font-bold uppercase tracking-tight">Additional Ad Spend</h4>
                <p className="text-sm font-mono text-gray-500 uppercase tracking-widest">Ad spend is based on performance and audience reach.</p>
              </div>
              <div className="text-right">
                <div className="text-4xl font-display font-bold text-brand-red">$0.20 PER VIEWER</div>
                <p className="text-xs font-mono text-gray-400 uppercase tracking-widest">Performance-based cost (Hits 1000 views per ad)</p>
              </div>
            </div>
            <div className="rough-card p-8 bg-brand-gray/50 border-white/5 flex flex-col justify-center">
              <h4 className="text-xl font-display font-bold mb-4 uppercase tracking-tight">Why Our Ads Work</h4>
              <p className="text-xs font-mono text-gray-400 uppercase tracking-widest leading-relaxed">
                We don't just "run" ads. We target local pros in your area who are actually looking for your services. No fluff, just traffic.
              </p>
            </div>
          </div>

          {/* Section 6: Call to Action */}
          <div className="text-center">
            <h3 className="text-4xl md:text-6xl font-display font-bold mb-8 uppercase tracking-tight">Ready to Get More Customers?</h3>
            <motion.a 
              href="#contact" 
              whileHover={{ scale: 1.05, x: -5, y: -5 }}
              whileTap={{ scale: 0.95, x: 0, y: 0 }}
              className="brutalist-button inline-flex items-center gap-4 px-12 py-6 text-3xl"
            >
              Start My Ads Campaign <Rocket className="w-8 h-8" />
            </motion.a>
            <p className="mt-6 text-gray-500 font-mono text-xs uppercase tracking-[0.2em]">
              We’ll get your ads live fast and start driving traffic to your business.
            </p>
          </div>
        </div>
      </section>

      {/* Terms & Why Us */}
      <section id="why-us" className="py-24 bg-brand-gray/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeading 
                subtitle="Why Choose Us" 
                title="Built for Small Business Success" 
                centered={false}
              />
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { title: "Free Demo First", desc: "See your site before you spend a dime." },
                  { title: "Local Focus", desc: "Designed specifically for local service industries." },
                  { title: "Fast Turnaround", desc: "Get online in days, not months." },
                  { title: "Affordable", desc: "High-end design at small business prices." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="shrink-0 w-12 h-12 bg-brand-red/10 flex items-center justify-center border border-brand-red/20">
                      <CheckCircle2 className="w-6 h-6 text-brand-red" />
                    </div>
                    <div>
                      <h4 className="font-display text-xl font-bold mb-1 uppercase tracking-tight">{item.title}</h4>
                      <p className="text-xs font-mono text-gray-500 uppercase tracking-widest">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rough-card p-8 md:p-12 border-brand-red/40 bg-brand-red/5">
              <h3 className="text-3xl font-display font-bold mb-8 flex items-center gap-4 uppercase tracking-tight">
                <ShieldCheck className="text-brand-red w-8 h-8" /> Payment Terms
              </h3>
              <ul className="space-y-8">
                <li className="flex gap-6">
                  <div className="w-2 h-2 bg-brand-red mt-2 shrink-0" />
                  <p className="text-gray-300 font-mono text-sm uppercase tracking-widest leading-relaxed">Invoices are billed <span className="text-white font-bold">3 months in advance</span> to ensure continuous service.</p>
                </li>
                <li className="flex gap-6">
                  <div className="w-2 h-2 bg-brand-red mt-2 shrink-0" />
                  <p className="text-gray-300 font-mono text-sm uppercase tracking-widest leading-relaxed">Late payments result in a <span className="text-white font-bold">20% late fee</span> applied to the invoice total.</p>
                </li>
                <li className="flex gap-6">
                  <div className="w-2 h-2 bg-brand-red mt-2 shrink-0" />
                  <p className="text-gray-300 font-mono text-sm uppercase tracking-widest leading-relaxed">Work begins immediately after the service agreement is signed.</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading 
            subtitle="Testimonials" 
            title="What Our Clients Say" 
            description="Real feedback from small business owners who grew their business with JZ Atelier."
          />

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Mike Thompson",
                business: "Thompson Landscaping",
                text: "The free demo sold me instantly. I had a professional site in 4 days and started getting calls from Google within the first week.",
                rating: 5
              },
              {
                name: "Sarah Jenkins",
                business: "Jenkins Auto Detailing",
                text: "I was worried about the cost, but the $800 package paid for itself in less than a month. The mobile site looks incredible.",
                rating: 5
              },
              {
                name: "David Rodriguez",
                business: "Elite Home Repairs",
                text: "JZ Atelier made everything so simple. I'm not tech-savvy at all, but they handled everything. The ad package is definitely worth it.",
                rating: 5
              }
            ].map((review, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="rough-card p-8"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-brand-red text-brand-red" />
                  ))}
                </div>
                <p className="text-gray-300 font-mono text-sm uppercase tracking-tight mb-6 leading-relaxed">"{review.text}"</p>
                <div>
                  <p className="font-display text-xl font-bold uppercase">{review.name}</p>
                  <p className="text-xs font-mono text-brand-accent uppercase tracking-widest">{review.business}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Review Submission Form */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 max-w-3xl mx-auto rough-card p-8 md:p-12 border-brand-accent/20"
          >
            <div className="text-center mb-10">
              <h3 className="text-4xl font-display font-bold mb-2 uppercase tracking-tight">Submit Your Review</h3>
              <p className="text-gray-400 font-mono text-xs uppercase tracking-widest">We value your feedback! Share your experience with us.</p>
            </div>

            <form 
              className="space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const name = formData.get('reviewer-name');
                const business = formData.get('reviewer-business');
                const text = formData.get('review-text');
                
                const subject = encodeURIComponent(`New Review from ${name} (${business})`);
                const body = encodeURIComponent(
                  `Hello JZ Atelier,\n\n` +
                  `A new review has been submitted:\n\n` +
                  `Name: ${name}\n` +
                  `Business: ${business}\n` +
                  `Rating: ${rating} Stars\n` +
                  `Review: ${text}\n\n` +
                  `Please review this for the website.`
                );
                
                window.location.href = `mailto:zanderlewis80@gmail.com?subject=${subject}&body=${body}`;
              }}
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">Your Name</label>
                  <input 
                    name="reviewer-name"
                    type="text" 
                    required
                    placeholder="Jane Smith"
                    className="w-full bg-white/5 border-2 border-white/10 px-4 py-4 focus:outline-none focus:border-brand-red transition-colors font-mono text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-gray-500 uppercase tracking-widest">Your Business</label>
                  <input 
                    name="reviewer-business"
                    type="text" 
                    required
                    placeholder="Smith's Services"
                    className="w-full bg-white/5 border-2 border-white/10 px-4 py-4 focus:outline-none focus:border-brand-red transition-colors font-mono text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono font-bold text-gray-500 uppercase tracking-widest block">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="focus:outline-none group"
                    >
                      <Star 
                        className={`w-10 h-10 transition-all duration-200 ${
                          star <= rating 
                            ? 'fill-brand-red text-brand-red scale-110' 
                            : 'text-gray-800 group-hover:text-brand-red/50'
                        }`} 
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono font-bold text-gray-500 uppercase tracking-widest">Your Review</label>
                <textarea 
                  name="review-text"
                  required
                  rows={4}
                  placeholder="Tell us about your experience..."
                  className="w-full bg-white/5 border-2 border-white/10 px-4 py-4 focus:outline-none focus:border-brand-red transition-colors resize-none font-mono text-sm"
                />
              </div>

              <button 
                type="submit"
                className="w-full border-2 border-white text-white py-5 font-display text-2xl tracking-widest hover:bg-white hover:text-black transition-all uppercase"
              >
                Send Review
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-brand-accent/20 blur-[150px] rounded-full" />
        </div>

        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-6xl md:text-8xl font-display font-bold mb-6 uppercase tracking-tighter">Get Your Free Demo</h2>
            <p className="text-gray-400 font-mono text-sm uppercase tracking-widest">
              Fill out the form below and we'll reach out within 24 hours.
            </p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rough-card p-8 md:p-12"
          >
            <form 
              className="grid md:grid-cols-2 gap-8" 
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const name = formData.get('name');
                const business = formData.get('business');
                const businessType = formData.get('business-type');
                const phone = formData.get('phone');
                const service = formData.get('service');
                const plan = formData.get('plan');
                
                const subject = encodeURIComponent(`New Demo Request: ${business}`);
                const body = encodeURIComponent(
                  `Hello JZ Atelier,\n\n` +
                  `I'm interested in a free demo website.\n\n` +
                  `Name: ${name}\n` +
                  `Business: ${business}\n` +
                  `Business Type: ${businessType}\n` +
                  `Phone: ${phone}\n` +
                  `Service Requested: ${service}\n` +
                  `Selected Plan: ${plan}\n\n` +
                  `Please reach out to me within 24 hours.`
                );
                
                window.location.href = `mailto:zanderlewis80@gmail.com?subject=${subject}&body=${body}`;
              }}
            >
              <div className="space-y-2">
                <label className="text-xs font-mono font-bold text-gray-500 uppercase tracking-widest">Full Name</label>
                <input 
                  name="name"
                  type="text" 
                  required
                  placeholder="John Doe"
                  className="w-full bg-white/5 border-2 border-white/10 px-4 py-4 focus:outline-none focus:border-brand-red transition-colors font-mono text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-mono font-bold text-gray-500 uppercase tracking-widest">Business Name</label>
                <input 
                  name="business"
                  type="text" 
                  required
                  placeholder="Doe's Detailing"
                  className="w-full bg-white/5 border-2 border-white/10 px-4 py-4 focus:outline-none focus:border-brand-red transition-colors font-mono text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-mono font-bold text-gray-500 uppercase tracking-widest">What is your business?</label>
                <input 
                  name="business-type"
                  type="text" 
                  required
                  placeholder="Auto Detailing / Landscaping"
                  className="w-full bg-white/5 border-2 border-white/10 px-4 py-4 focus:outline-none focus:border-brand-red transition-colors font-mono text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-mono font-bold text-gray-500 uppercase tracking-widest">Phone Number</label>
                <input 
                  name="phone"
                  type="tel" 
                  required
                  placeholder="(319) 406-2965"
                  className="w-full bg-white/5 border-2 border-white/10 px-4 py-4 focus:outline-none focus:border-brand-red transition-colors font-mono text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-mono font-bold text-gray-500 uppercase tracking-widest">Service</label>
                <select 
                  name="service"
                  className="w-full bg-white/5 border-2 border-white/10 px-4 py-4 focus:outline-none focus:border-brand-red transition-colors appearance-none font-mono text-sm uppercase tracking-widest"
                >
                  <option className="bg-brand-gray">New Website</option>
                  <option className="bg-brand-gray">Website + Ads</option>
                  <option className="bg-brand-gray">Ads Only</option>
                  <option className="bg-brand-gray">Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-mono font-bold text-gray-500 uppercase tracking-widest">Select Plan</label>
                <select 
                  name="plan"
                  className="w-full bg-white/5 border-2 border-white/10 px-4 py-4 focus:outline-none focus:border-brand-red transition-colors appearance-none font-mono text-sm uppercase tracking-widest"
                >
                  <option className="bg-brand-gray">Starter ($499)</option>
                  <option className="bg-brand-gray">Professional ($999)</option>
                  <option className="bg-brand-gray">Business ($2,499)</option>
                  <option className="bg-brand-gray">Enterprise ($4,999+)</option>
                  <option className="bg-brand-gray">Not Sure Yet</option>
                </select>
              </div>
              <div className="md:col-span-2 pt-4">
                <button 
                  type="submit"
                  className="brutalist-button w-full"
                >
                  Start Now
                </button>
                <p className="text-center text-gray-600 font-mono text-[10px] mt-6 uppercase tracking-widest">
                  Clicking "Start Now" will open your email app.
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Payments Section */}
      <section id="payments" className="py-24 bg-brand-gray relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-px h-full bg-white" />
          <div className="absolute top-0 left-2/4 w-px h-full bg-white" />
          <div className="absolute top-0 left-3/4 w-px h-full bg-white" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="text-center mb-16">
            <h2 className="text-6xl md:text-8xl font-display font-bold mb-6 uppercase tracking-tighter">
              Simple <span className="text-brand-purple">Payments</span>
            </h2>
            <p className="text-gray-400 font-mono text-sm uppercase tracking-widest max-w-2xl mx-auto">
              We've made it easy for you to invest in your business growth. Choose the method that works best for you.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Payment Methods */}
            <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
              <div className="rough-card p-8 bg-white/5 border-brand-purple/30 flex flex-col justify-between group hover:border-brand-purple transition-all">
                <div>
                  <div className="w-14 h-14 bg-brand-purple/20 flex items-center justify-center mb-6">
                    <Smartphone className="w-7 h-7 text-brand-purple" />
                  </div>
                  <h4 className="text-2xl font-display font-bold uppercase tracking-tight mb-2">CashApp / PayPal</h4>
                  <p className="text-xs font-mono text-gray-500 uppercase tracking-widest leading-relaxed">
                    Direct peer-to-peer payments for fast project starts.
                  </p>
                </div>
                <div className="mt-8 pt-6 border-t border-white/10">
                  <span className="inline-block px-3 py-1 bg-brand-purple/10 text-brand-purple text-[10px] font-mono font-bold uppercase tracking-widest">
                    Preferred Method
                  </span>
                </div>
              </div>

              <div className="rough-card p-8 bg-white/5 border-brand-accent/30 flex flex-col justify-between group hover:border-brand-accent transition-all">
                <div>
                  <div className="w-14 h-14 bg-brand-accent/20 flex items-center justify-center mb-6">
                    <Smartphone className="w-7 h-7 text-brand-accent" />
                  </div>
                  <h4 className="text-2xl font-display font-bold uppercase tracking-tight mb-2">Mobile Apps</h4>
                  <p className="text-xs font-mono text-gray-500 uppercase tracking-widest leading-relaxed">
                    Venmo and other mobile payment solutions accepted.
                  </p>
                </div>
                <div className="mt-8 pt-6 border-t border-white/10">
                  <span className="inline-block px-3 py-1 bg-brand-accent/10 text-brand-accent text-[10px] font-mono font-bold uppercase tracking-widest">
                    Flexible
                  </span>
                </div>
              </div>

              <div className="md:col-span-2 p-8 bg-brand-purple/5 border border-brand-purple/20 flex flex-col md:flex-row items-center gap-8">
                <div className="w-20 h-20 bg-brand-purple/20 flex items-center justify-center shrink-0">
                  <Shield className="w-10 h-10 text-brand-purple" />
                </div>
                <div className="text-center md:text-left">
                  <h4 className="text-xl font-display font-bold uppercase tracking-tight mb-1">Buyer Protection Guaranteed</h4>
                  <p className="text-xs font-mono text-gray-500 uppercase tracking-widest leading-relaxed">
                    Every transaction is documented and protected. We value your trust as much as your business.
                  </p>
                </div>
              </div>
            </div>

            {/* Investment Summary */}
            <div className="rough-card p-8 bg-brand-dark border-brand-purple/20 flex flex-col">
              <h3 className="text-2xl font-display font-bold mb-8 uppercase tracking-tight border-b border-white/10 pb-4">
                Growth Investment
              </h3>
              <div className="space-y-6 flex-grow">
                {[
                  { label: "Starter Web", price: "$499+", color: "text-brand-red" },
                  { label: "Pro/Business", price: "$999+", color: "text-brand-purple" },
                  { label: "Ad Campaigns", price: "$150+", color: "text-brand-accent" },
                  { label: "Site Maintenance", price: "$30–$60/MO", color: "text-brand-purple" }
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">{item.label}</span>
                    <span className={`text-xl font-display font-bold ${item.color}`}>{item.price}</span>
                  </div>
                ))}
              </div>
              <div className="mt-10">
                <a href="#contact" className="w-full brutalist-button text-xl py-4 flex items-center justify-center gap-2">
                  Get Started <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQ />

      {/* Customer Support Section */}
      <section className="py-24 bg-brand-dark">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-block p-4 bg-brand-purple/10 border border-brand-purple/20 mb-8">
            <MessageSquare className="w-12 h-12 text-brand-purple" />
          </div>
          <h2 className="text-5xl md:text-7xl font-display font-bold mb-6 uppercase tracking-tighter">Direct Support</h2>
          <p className="text-gray-400 font-mono text-sm uppercase tracking-widest mb-12 max-w-2xl mx-auto">
            Need immediate help? Text our business line or email our support team directly. We filter all messages to ensure our clients get priority attention.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="rough-card p-10 border-brand-purple">
              <h3 className="text-2xl font-display font-bold mb-4 uppercase tracking-tight">Text Support</h3>
              <p className="text-3xl md:text-5xl font-display font-bold text-white mb-8 tracking-tighter">319-406-2965</p>
              
              <div className="flex justify-center">
                <a 
                  href="sms:+13194062965?body=Hello%20JZ%20Atelier,%20I%20need%20help%20with%20my%20website."
                  className="w-full bg-brand-purple hover:bg-white hover:text-black text-white px-6 py-4 font-display text-xl tracking-widest transition-all uppercase"
                >
                  Send Text
                </a>
              </div>
              <p className="mt-6 text-[10px] font-mono text-gray-600 uppercase tracking-[0.2em]">
                // TEXT ONLY // NO CALLS
              </p>
            </div>

            <div className="rough-card p-10 border-white/10 bg-white/[0.02]">
              <h3 className="text-2xl font-display font-bold mb-4 uppercase tracking-tight">Email Support</h3>
              <p className="text-xl md:text-2xl font-display font-bold text-white mb-8 tracking-tight break-all">zanderlewis80@gmail.com</p>
              
              <div className="flex justify-center">
                <a 
                  href="mailto:zanderlewis80@gmail.com?subject=Support%20Request"
                  className="w-full border-2 border-white/20 hover:bg-white hover:text-black text-white px-6 py-4 font-display text-xl tracking-widest transition-all uppercase"
                >
                  Send Email
                </a>
              </div>
              <p className="mt-6 text-[10px] font-mono text-gray-600 uppercase tracking-[0.2em]">
                // 24/7 MONITORING
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t-4 border-brand-red bg-brand-gray">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-red flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <span className="font-display text-3xl font-bold tracking-tighter uppercase">JZ <span className="bg-gradient-to-r from-brand-accent via-brand-purple to-brand-red bg-clip-text text-transparent">ATELIER</span></span>
            </div>
            
            <div className="flex gap-12 text-xs font-mono font-bold text-gray-500 uppercase tracking-widest">
              <button onClick={() => setShowPrivacy(true)} className="hover:text-brand-red transition-colors">Privacy Policy</button>
              <a href="#" className="hover:text-brand-red transition-colors">Terms of Service</a>
            </div>

            <div className="text-xs font-mono text-gray-600 uppercase tracking-widest">
              © 2026 JZ Atelier // Built for Dominance
            </div>
          </div>
        </div>
      </footer>

      {/* Privacy Policy Modal */}
      <AnimatePresence>
        {showPrivacy && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/90 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-brand-gray border-2 border-brand-purple w-full max-w-2xl max-h-[80vh] overflow-y-auto p-12 relative"
            >
              <button 
                onClick={() => setShowPrivacy(false)}
                className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"
              >
                <X className="w-8 h-8" />
              </button>
              <div className="prose prose-invert max-w-none font-mono text-xs uppercase tracking-tight leading-relaxed">
                <h2 className="text-4xl font-display font-bold text-white mb-8 uppercase tracking-tighter">Privacy Policy & Terms</h2>
                <div className="space-y-8 text-gray-400">
                  <section>
                    <h3 className="text-white font-bold mb-2 uppercase tracking-tighter text-sm">1. Data Collection</h3>
                    <p>We collect information provided via our contact forms to facilitate service demos and project communication. We do not sell your data to third parties.</p>
                  </section>
                  <section className="border-l-4 border-brand-red pl-6 bg-brand-red/5 py-4">
                    <h3 className="text-brand-red font-bold mb-2 uppercase tracking-tighter text-sm">2. NO REFUND POLICY</h3>
                    <p className="text-white leading-relaxed">Due to the custom nature of our digital products and the immediate allocation of engineering resources, JZ Atelier operates a strict <span className="font-bold">NO REFUND</span> policy. All sales for website builds and ad campaigns are final once the project agreement is signed or payment is processed. Work begins immediately upon receipt of funds.</p>
                  </section>
                  <section className="border-l-4 border-brand-accent pl-6 bg-brand-accent/5 py-4">
                    <h3 className="text-brand-accent font-bold mb-2 uppercase tracking-tighter text-sm">3. AD PERFORMANCE & GUARANTEES</h3>
                    <ul className="space-y-4 text-white">
                      <li>• <span className="font-bold">Viewer Guarantee:</span> We guarantee that each ad campaign will reach a minimum of 1,000 unique viewers per ad. A campaign is considered complete once this threshold is met.</li>
                      <li>• <span className="font-bold">No Conversion Rate Guarantee:</span> JZ Atelier does not guarantee a specific "person rate" (conversion rate, click-through rate, or revenue generation). Our responsibility is to deliver targeted traffic; the client's business model and landing page performance dictate final results.</li>
                      <li>• <span className="font-bold">Service Termination:</span> Ad services will automatically cease for a targeted campaign once the contractually agreed viewer threshold is reached.</li>
                    </ul>
                  </section>
                  <section>
                    <h3 className="text-white font-bold mb-2 uppercase tracking-tighter text-sm">4. LIMITATION OF LIABILITY</h3>
                    <p className="italic text-xs">TO THE MAXIMUM EXTENT PERMITTED BY LAW, JZ ATELIER AND ITS FOUNDERS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES RESULTING FROM THE USE OR INABILITY TO USE OUR SERVICES. THE CLIENT AGREES THAT TOTAL LIABILITY TO THE CLIENT SHALL NOT EXCEED THE TOTAL AMOUNT PAID FOR THE SERVICE IN QUESTION.</p>
                  </section>
                  <section>
                    <h3 className="text-white font-bold mb-2 uppercase tracking-tighter text-sm">5. INDEMNIFICATION</h3>
                    <p>The client agrees to defend, indemnify, and hold harmless JZ Atelier from any and all claims, damages, costs, and expenses (including attorney fees) arising from the client's use of the delivered assets or ad campaigns.</p>
                  </section>
                  <section>
                    <h3 className="text-white font-bold mb-2 uppercase tracking-tighter text-sm">6. DISPUTE RESOLUTION</h3>
                    <p>Any disputes arising from these terms shall be settled through binding arbitration. Both parties agree to waive their right to a jury trial or to participate in a class action lawsuit.</p>
                  </section>
                  <section>
                    <h3 className="text-white font-bold mb-2 uppercase tracking-tighter text-sm">7. OWNERSHIP</h3>
                    <p>Clients retain 100% ownership of their website code, domain, and assets upon final payment of the project invoice. JZ Atelier retains the right to use site images for portfolio and marketing purposes unless otherwise agreed in writing.</p>
                  </section>
                </div>
                <button 
                  onClick={() => setShowPrivacy(false)}
                  className="mt-12 w-full brutalist-button"
                >
                  I Understand
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ChatBot />
      
      {/* Sticky CTA */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 2 }}
        className="fixed bottom-8 right-8 z-[100] hidden md:block"
      >
        <a 
          href="#contact" 
          className="bg-brand-red text-white px-8 py-4 font-display text-xl font-bold uppercase tracking-widest shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all flex items-center gap-3"
        >
          Claim Your Demo <Zap className="w-5 h-5 fill-current" />
        </a>
      </motion.div>
    </div>
  );
}

