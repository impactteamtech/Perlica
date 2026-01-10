import React from 'react';
import { IoClose } from 'react-icons/io5';
import PingDot from '../AboutUs/PingDot';

interface PartnerWithUsDetailsProps {
    onClose: () => void;
}

const PartnerWithUsDetails: React.FC<PartnerWithUsDetailsProps> = ({ onClose }) => {
    return (
        <div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-label="More information about partnering with Perlica"
            onClick={onClose}
        >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" />

            <div
                className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200"
                onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="relative border-b border-gray-100 px-5 sm:px-8 py-4 sm:py-5 flex items-center justify-between gap-4 bg-white/95 backdrop-blur">
                    <div className="flex items-center gap-3">
                        <PingDot />
                        <div>
                            <p className="text-xs uppercase tracking-[0.2em] text-gray-500 font-semibold">Partnerships</p>
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900 title-font">Partner With Perlica</h2>
                        </div>
                    </div>

                    <button
                        type="button"
                        aria-label="Close partner details"
                        title="Close"
                        onClick={onClose}
                        className="flex items-center justify-center w-9 h-9 rounded-full bg-black/5 hover:bg-black/10 text-gray-700 hover:text-black transition-all border border-black/10 hover:border-black/20"
                    >
                        <IoClose className="w-5 h-5" />
                    </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto px-5 sm:px-8 py-5 sm:py-7 space-y-6 sm:space-y-7">
                    <section className="space-y-3">
                        <p className="text-gray-700 text-base sm:text-lg leading-relaxed font-mono">
                            At Perlica, we believe in partnerships that create real value for travelers, brands, and local communities.
                            Whether you are a hotelier, DMC, travel agency, corporate team, or logistics partner, we work side by side
                            with you to design exceptional experiences and reliable operations across East Africa and beyond.
                        </p>
                    </section>

                    <section className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                        <div className="space-y-4 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl p-4 sm:p-5">
                            <h3 className="text-lg sm:text-xl font-semibold text-secondary mb-1">Who We Work With</h3>
                            <ul className="text-gray-700 text-sm sm:text-base space-y-2 list-disc list-inside">
                                <li>Hotels, lodges, camps, and serviced apartments</li>
                                <li>Local and international travel agencies &amp; tour operators</li>
                                <li>Corporate travel desks and incentive groups</li>
                                <li>Transport, fleet and experience providers</li>
                                <li>Import / export and tender partners</li>
                            </ul>
                        </div>

                        <div className="space-y-4 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl p-4 sm:p-5">
                            <h3 className="text-lg sm:text-xl font-semibold text-secondary mb-1">Why Partners Choose Us</h3>
                            <ul className="text-gray-700 text-sm sm:text-base space-y-2 list-disc list-inside">
                                <li>Curated itineraries and experiences tailored to your audience</li>
                                <li>On-ground operations support and responsive communication</li>
                                <li>Transparent collaboration on pricing, availability and offers</li>
                                <li>Marketing exposure through our digital and offline channels</li>
                                <li>Long-term relationships rooted in trust and shared growth</li>
                            </ul>
                        </div>
                    </section>

                    <section className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
                        <div className="rounded-2xl border border-gray-200 bg-white/80 p-4 flex flex-col gap-1">
                            <p className="text-xs font-semibold tracking-wide text-gray-500 uppercase">Regions Covered</p>
                            <p className="text-xl font-bold text-gray-900">East Africa</p>
                            <p className="text-sm text-gray-600">Kenya, Tanzania, Uganda and key regional hubs.</p>
                        </div>
                        <div className="rounded-2xl border border-gray-200 bg-white/80 p-4 flex flex-col gap-1">
                            <p className="text-xs font-semibold tracking-wide text-gray-500 uppercase">Focus</p>
                            <p className="text-xl font-bold text-gray-900">Quality First</p>
                            <p className="text-sm text-gray-600">We prioritize guest experience, safety and reliability.</p>
                        </div>
                        <div className="rounded-2xl border border-gray-200 bg-white/80 p-4 flex flex-col gap-1">
                            <p className="text-xs font-semibold tracking-wide text-gray-500 uppercase">Support</p>
                            <p className="text-xl font-bold text-gray-900">Dedicated Team</p>
                            <p className="text-sm text-gray-600">A partner success team to support joint projects.</p>
                        </div>
                    </section>

                    <section className="rounded-2xl border border-primary/20 bg-primary/5 px-4 sm:px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <div>
                            <p className="text-sm font-semibold text-secondary uppercase tracking-[0.18em] mb-1">Let&apos;s build together</p>
                            <p className="text-gray-800 text-sm sm:text-base max-w-xl">
                                Share your idea, property, or project with us and we&apos;ll get back
                                with a tailored partnership proposal aligned to your goals.
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={onClose}
                            className="mt-1 inline-flex items-center justify-center px-4 py-2 rounded-full bg-secondary text-white text-sm sm:text-base font-medium shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all"
                        >
                            Close &amp; Continue Exploring
                        </button>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default PartnerWithUsDetails;
