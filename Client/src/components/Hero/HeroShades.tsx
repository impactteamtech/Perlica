import React from 'react';

const HeroShades: React.FC = () => {
    return (
        <div>
            <div
                aria-hidden="true"
                className=" absolute inset-0 z-10 "
                style={{
                    background:
                        "radial-gradient(120% 80% at 50% 30%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.35) 70%, rgba(0,0,0,0.55) 100%)",
                }}
            />
            <div
                aria-hidden="true"
                className=" absolute inset-0 z-10 "
                style={{
                    background:
                        "radial-gradient(120% 80% at 50% 30%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.35) 70%, rgba(0,0,0,0.55) 100%)",
                }}
            />

            {/*  */}
            <div
                aria-hidden="true"
                className="absolute -top-30 -left-32 h-[34rem] w-[34rem] rounded-full blur-3xl z-20 animate-glow-slow"
                style={{
                    background:
                        "radial-gradient(closest-side, rgba(2, 95, 2, 0.28), transparent 70%)",
                    mixBlendMode: "screen",
                }}
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-48 -left-24 h-[40rem] w-[40rem] rounded-full blur-3xl z-10 animate-glow-slow [animation-delay:.6s]"
                style={{
                    background:
                        "radial-gradient(closest-side, rgba(255, 255, 255, 1), transparent 55%)",
                    mixBlendMode: "screen",
                }}
            />

            {/*  */}
            <div
                aria-hidden="true"
                className=" absolute -top-24 right-[-12%] h-[38rem] w-[38rem] rounded-full blur-3xl z-20 animate-glow-slow [animation-delay:1.2s]"
                style={{
                    background:
                        "radial-gradient(closest-side, rgba(255, 45, 45, 0.26), transparent 70%)",
                    mixBlendMode: "screen",
                }}
            />
        </div>
    );
};

export default HeroShades;