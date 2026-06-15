import { useState, useMemo } from "react";
import { BRANDS } from "../data";
import { Brand } from "../types";
import { Search, Sparkles, SlidersHorizontal, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function BrandShowcase() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrandDetail, setSelectedBrandDetail] = useState<Brand | null>(null);

  const categories = ["All", "Skincare", "Cosmetics", "Personal Care"];

  // Filter brands based on selected tab + search query
  const filteredBrands = useMemo(() => {
    return BRANDS.filter((brand) => {
      const matchCategory =
        selectedCategory === "All" ||
        brand.category === selectedCategory ||
        (selectedCategory === "Personal Care" && brand.category === "Personal Care");
      const matchSearch =
        brand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        brand.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
        brand.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="brands" className="bg-[#F8F5F0] py-24 border-b border-[#A61E22]/10 relative overflow-hidden">
      {/* Decorative Golden Ambient Gradients */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#D4AF37]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#A61E22]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-6 max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2">
            <div className="h-[1px] w-8 bg-[#A61E22]" />
            <span className="text-[11px] font-sans font-extrabold tracking-[0.25em] text-[#A61E22] uppercase">
              Brand Registry & Directory
            </span>
            <div className="h-[1px] w-8 bg-[#A61E22]" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#1A1A1A] leading-tight font-normal">
            Global Brands, Curated <span className="font-serif-italic">Directly</span> for Nepal
          </h2>
          <p className="text-[#1A1A1A]/75 text-sm md:text-base font-sans font-light max-w-2xl mx-auto">
            We are the registered importers and distributors for 19+ of the world's most sought-after healthcare, cosmetic, and beauty conglomerates — direct from laboratories in South Korea, USA, France, and Switzerland.
          </p>
        </div>

        {/* Filters and Search Bar Container */}
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between bg-white p-5 border border-[#A61E22]/10 shadow-sm mb-12">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            <SlidersHorizontal className="w-4 h-4 text-[#A61E22] shrink-0 mr-1 hidden sm:block" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-[11px] font-semibold tracking-wider uppercase rounded-none transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#A61E22] text-white"
                    : "bg-[#F8F5F0] text-[#1A1A1A]/75 hover:bg-[#A61E22]/10 hover:text-[#A61E22]"
                }`}
              >
                {cat === "All" ? "All Brands" : `${cat}`}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search by name, country, key ingredient..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#F8F5F0] border border-[#A61E22]/10 px-4 py-2.5 pl-10 text-xs focus:outline-none focus:border-[#A61E22]/60 font-sans tracking-wide"
            />
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-[#1A1A1A]/40" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-3 text-[10px] uppercase font-bold text-[#A61E22] hover:underline"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Brands Grid with layout animations */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredBrands.map((brand) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                key={brand.id}
                onClick={() => setSelectedBrandDetail(brand)}
                className="group relative bg-white border border-[#A61E22]/10 p-8 transition-all duration-300 hover:shadow-xl hover:shadow-black/[0.03] hover:border-[#A61E22]/55 flex flex-col justify-between min-h-[280px] cursor-pointer"
              >
                {/* Highlight/Special Border Accents */}
                {brand.highlight && (
                  <div className="absolute top-0 right-0 bg-[#A61E22] text-white text-[8px] font-bold tracking-widest px-3 py-1 uppercase select-none">
                    Most Popular
                  </div>
                )}
                
                {/* Top Row with Monogram Medallion */}
                <div className="space-y-5">
                  <div className="flex justify-between items-start">
                    {/* Circle Monogram Emblem */}
                    <div className="w-12 h-12 rounded-full bg-[#F8F5F0] border border-[#A61E22]/15 flex items-center justify-center p-1 font-serif text-sm font-bold tracking-wider text-[#A61E22] group-hover:bg-[#A61E22]/5 group-hover:border-[#A61E22] transition-colors shadow-sm">
                      {brand.monogram}
                    </div>

                    {/* Country of Origin Label */}
                    <span className="text-[9px] tracking-widest text-[#1A1A1A]/40 uppercase font-sans font-bold bg-[#F8F5F0] hover:bg-[#A61E22]/5 hover:text-[#A61E22] px-2 py-1 transition-all">
                      {brand.origin}
                    </span>
                  </div>

                  {/* Brand Title */}
                  <div className="space-y-1">
                    <h3 className="text-xl font-serif text-[#1A1A1A] group-hover:text-[#A61E22] transition-colors leading-snug">
                      {brand.name}
                    </h3>
                    <p className="text-[10px] text-[#A61E22]/80 uppercase tracking-widest font-sans font-bold">
                      {brand.category}
                    </p>
                  </div>

                  {/* Brand Slogan */}
                  <p className="text-[#1A1A1A]/70 text-xs font-sans font-light leading-relaxed line-clamp-3">
                    {brand.description}
                  </p>
                </div>

                {/* Bottom Row Interactivity Trigger */}
                <div className="pt-6 mt-6 border-t border-black/5 flex items-center justify-between">
                  <span className="text-[10px] uppercase font-sans tracking-[0.2em] text-[#1A1A1A]/40 group-hover:text-[#A61E22] group-hover:tracking-[0.25em] transition-all font-bold">
                    View Portfolio Details
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-[#1A1A1A]/30 group-hover:text-[#A61E22] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Fallback state when search returns nothing */}
          {filteredBrands.length === 0 && (
            <div className="col-span-full bg-white border border-[#A61E22]/10 p-12 text-center space-y-4">
              <p className="text-lg font-serif text-[#1A1A1A]">No matches found</p>
              <p className="text-xs text-[#1A1A1A]/60 max-w-md mx-auto">
                No active beauty credentials fit matching details. Try adjusting your category filters or search terms.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="text-xs uppercase font-bold text-[#A61E22] tracking-widest border-b border-[#A61E22] pb-1 hover:text-[#8B0000]"
              >
                Reset Search Filters
              </button>
            </div>
          )}
        </motion.div>

        {/* Interactive Popup Modal for Brand Details */}
        <AnimatePresence>
          {selectedBrandDetail && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-[#F8F5F0] border border-[#A61E22]/20 max-w-lg w-full p-8 shadow-2xl relative"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Closing cross */}
                <button
                  onClick={() => setSelectedBrandDetail(null)}
                  className="absolute top-4 right-4 p-2 text-charcoal hover:text-[#A61E22] font-semibold text-xs transition-colors font-sans uppercase tracking-widest"
                >
                  [ Close ]
                </button>

                {/* Modal Brand Monogram Medallion */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-white border border-[#A61E22]/20 flex items-center justify-center font-serif text-lg font-bold text-[#A61E22]">
                    {selectedBrandDetail.monogram}
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif text-charcoal">{selectedBrandDetail.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] uppercase tracking-widest text-[#A61E22] font-bold">
                        {selectedBrandDetail.category}
                      </span>
                      <span className="text-gray-400 text-xs">•</span>
                      <span className="text-[10px] uppercase tracking-widest text-[#1A1A1A]/50 font-bold">
                        Origin: {selectedBrandDetail.origin}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-[11px] font-sans font-bold tracking-widest uppercase text-[#1A1A1A]/40 mb-2">
                      Brand Description
                    </h4>
                    <p className="text-xs text-[#1A1A1A]/80 leading-relaxed font-sans">
                      {selectedBrandDetail.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-[11px] font-sans font-bold tracking-widest uppercase text-[#1A1A1A]/40 mb-3">
                      Nepal Market Distribution Status
                    </h4>
                    <ul className="space-y-2.5">
                      <li className="flex items-start gap-2.5 text-xs text-[#1A1A1A]/85 font-sans">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>Direct import with secure clearance credentials.</span>
                      </li>
                      <li className="flex items-start gap-2.5 text-xs text-[#1A1A1A]/85 font-sans">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>Available in partner major supermarkets and pharmacies in Nepal.</span>
                      </li>
                      <li className="flex items-start gap-2.5 text-xs text-[#1A1A1A]/85 font-sans">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>Ethically managed cold chain storage.</span>
                      </li>
                    </ul>
                  </div>

                  {/* Call to action contact importer directly with selected brand */}
                  <div className="bg-[#A61E22]/5 p-4 border border-[#A61E22]/20 text-center">
                    <p className="text-[11px] font-medium text-[#A61E22] uppercase tracking-[0.15em] mb-2">
                      Interested in sourcing {selectedBrandDetail.name}?
                    </p>
                    <a
                      href="#contact"
                      onClick={() => {
                        setSelectedBrandDetail(null);
                        const contactEl = document.getElementById("contact");
                        if (contactEl) {
                          window.scrollTo({ top: contactEl.offsetTop - 80, behavior: "smooth" });
                        }
                      }}
                      className="inline-block bg-[#A61E22] text-white text-[10px] font-bold uppercase tracking-widest py-2.5 px-6 hover:bg-[#8B0000] transition-colors"
                    >
                      Inquire Wholesale Rates
                    </a>
                  </div>
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
