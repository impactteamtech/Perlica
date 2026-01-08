import type { Option } from '../../lib/types'
import { IoIosArrowDown, IoMdOpen, IoMdDocument } from "react-icons/io";
import { useState } from 'react';

const OptionCard = ({ option, index, title }: { option: Option, index: number, title: string }) => {
    const isUrl = option.description.startsWith('http://') || option.description.startsWith('https://');
    const [openCard, setOpenCard] = useState<boolean>(false);
    const isFaq = title === "FAQ";

    // Common Number Badge Component for consistency
    const NumberBadge = () => (
        <div className="relative shrink-0">
            <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-gradient-to-br from-secondary to-secondary/60 p-[2px] shadow-md group-hover:shadow-secondary/30 transition-shadow duration-300">
                <div className="h-full w-full rounded-full bg-white flex items-center justify-center text-secondary font-bold text-lg">
                    {index + 1}
                </div>
            </div>
        </div>
    );

    if (isFaq) {
        return (
            <div className="group relative w-full isolate">
                 {/* Glow Effect */}

                <div className="relative w-full rounded-2xl bg-white/50 backdrop-blur-xl border border-black/20 shadow-sm transition-all duration-300 hover:shadow-md overflow-hidden">
                    <button
                        title="Toggle FAQ Answer"
                        type="button"
                        onClick={() => setOpenCard((prev) => !prev)}
                        aria-expanded={openCard}
                        className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left"
                    >
                        <div className="flex items-center gap-4">
                            <NumberBadge />
                            <h3 className="text-lg font-bold text-slate-800 leading-tight group-hover:text-secondary transition-colors duration-300">
                                {option.optionName}
                            </h3>
                        </div>

                        <div className={`
                            h-8 w-8 rounded-full flex items-center justify-center bg-white border border-slate-200 text-slate-400
                            transition-all duration-300 shadow-sm
                            ${openCard ? 'rotate-180 bg-secondary text-white border-secondary' : 'group-hover:border-secondary group-hover:text-secondary'}
                        `}>
                            <IoIosArrowDown size={18} />
                        </div>
                    </button>

                    <div
                        className={`grid transition-[grid-template-rows] duration-300 ease-out ${openCard ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                    >
                        <div className="overflow-hidden">
                            <div className="px-5 sm:px-6 pb-6 pt-0">
                                <div className="h-px w-full bg-slate-100 mb-4" /> {/* Divider */}
                                <p className="text-slate-600 leading-relaxed text-[15px]">
                                    {option.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Standard Card (Non-FAQ)
    return (
        <div className="group relative h-full w-full isolate">
            {/* Background Glow */}

            <div className="relative flex flex-col h-full rounded-2xl bg-white/50 backdrop-blur-xl border border-black/20
                            transition-all duration-300 ease-out 
                            hover:-translate-y-1 
                            p-6 sm:p-8">
                
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                    <NumberBadge />
                    <h3 className="text-xl font-bold text-slate-800 leading-tight group-hover:text-secondary transition-colors duration-300">
                        {option.optionName}
                    </h3>
                </div>

                {/* Content Area */}
                <div className="flex-grow flex flex-col">
                    {isUrl ? (
                        <div className="mt-auto">
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 ml-1">
                                Useful Resource
                            </p>
                            <a
                                href={option.description}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group/link block w-full"
                            >
                                <div className="flex items-center gap-3 p-4 rounded-xl bg-white border border-slate-200 shadow-sm 
                                                transition-all duration-300 
                                                group-hover/link:border-secondary/40 group-hover/link:shadow-md group-hover/link:bg-secondary/5">
                                    <div className="p-2 rounded-lg bg-secondary/10 text-secondary">
                                        <IoMdOpen className="text-xl" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-slate-700 truncate group-hover/link:text-secondary transition-colors">
                                            {option.description.replace(/(^\w+:|^)\/\//, '')}
                                        </p>
                                        <p className="text-xs text-slate-400">Click to visit</p>
                                    </div>
                                </div>
                            </a>
                        </div>
                    ) : (
                        <div className="relative h-full">
                            {/* Decorative background icon for text cards */}
                            <IoMdDocument className="absolute -bottom-4 -right-4 text-9xl text-slate-900/5 rotate-12 pointer-events-none" />
                            
                            <p className="text-slate-600 leading-relaxed text-[15px] relative z-10">
                                {option.description}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default OptionCard