import React from "react";
import Logo from "./Logo";
import { Mail, Phone, MapPin, Award } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollToSegment = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const topOffset = 85;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <footer className="bg-[#1A1A1A] text-[#F8F5F0] pt-20 pb-12 border-t border-[#A61E22]/20 font-sans">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Main Grid structure */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[#A61E22]/10">
          
          {/* Column 1: Core Brand Identity (5 columns wide) */}
          <div className="md:col-span-5 space-y-6">
            <Logo showText={true} size="md" className="brightness-0 invert filter brightness-[1.1] focus-visible:outline-none" />
            <p className="text-[#F8F5F0]/70 text-xs leading-relaxed max-w-sm">
              Jay Durga International Trade operates as Kathmandu’s trusted importer and nationwide distributor of leading clinical skincare, dynamic color cosmetics, and professional beauty essentials.
            </p>
            <div className="flex items-center gap-2.5 bg-[#A61E22]/10 border border-[#A61E22]/30 px-4 py-2 w-fit">
              <Award className="w-4 h-4 text-[#A61E22] shrink-0" />
              <span className="text-[10px] tracking-widest font-extrabold uppercase text-[#A61E22]">
                Licensed Importer • Nepal Govt. Approved
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links (3 columns wide) */}
          <div className="md:col-span-3 space-y-5 text-left">
            <h4 className="font-serif text-sm tracking-widest text-[#A61E22] uppercase font-bold">
              Quick Navigation
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Home Base", href: "#home" },
                { label: "Corporate About", href: "#about" },
                { label: "Global Brands", href: "#brands" },
                { label: "Product Categories", href: "#categories" },
                { label: "Quality Assurance", href: "#why-choose-us" },
                { label: "Contact Importer", href: "#contact" }
              ].map((link) => (
                <li key={link.label}>
                  <a
                     href={link.href}
                     onClick={(e) => handleScrollToSegment(e, link.href)}
                     className="text-xs text-[#F8F5F0]/75 hover:text-[#A61E22] transition-colors leading-[1.8] inline-block font-sans hover:translate-x-1 duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Complete Contact info (4 columns wide) */}
          <div className="md:col-span-4 space-y-5 text-left text-xs">
            <h4 className="font-serif text-sm tracking-widest text-[#A61E22] uppercase font-bold">
              Principal Registry Office
            </h4>
            
            <ul className="space-y-4 text-[#F8F5F0]/80">
              {/* Contact Person */}
              <li className="space-y-0.5">
                <span className="block text-[9px] tracking-widest uppercase text-[#F8F5F0]/40 font-bold">
                  Managing Representative
                </span>
                <span className="text-sm font-semibold font-serif text-white">
                  Narayan Kumar Agrawal
                </span>
              </li>

              {/* Physical Location */}
              <li className="flex gap-2.5 items-start">
                <MapPin className="w-4 h-4 text-[#A61E22] shrink-0 mt-0.5" />
                <span>Makhan, Kathmandu, Nepal</span>
              </li>

              {/* Contact Numbers */}
              <li className="flex gap-2.5 items-start">
                <Phone className="w-4 h-4 text-[#A61E22] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <a href="tel:+9779851048223" className="block text-white hover:text-[#A61E22] font-semibold">
                    +977 9851048223 (Mobile)
                  </a>
                  <span className="block text-[11px] text-[#F8F5F0]/60">
                    Landlines: 01-5321836 / 01-5324305
                  </span>
                </div>
              </li>

              {/* Email Address */}
              <li className="flex gap-2.5 items-start">
                <Mail className="w-4 h-4 text-[#A61E22] shrink-0 mt-0.5" />
                <a href="mailto:agrawalnarayan@hotmail.com" className="hover:text-[#A61E22] transition-colors break-all">
                  agrawalnarayan@hotmail.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Closing copyright notice without any prohibited social links */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-[#F8F5F0]/50">
          <p className="font-sans">
            &copy; {currentYear} Jay Durga International Trade. All Rights Reserved.
          </p>
          <p className="font-sans tracking-wide">
            Designed to Premium Standards • Kathmandu, Nepal
          </p>
        </div>

      </div>
    </footer>
  );
}
