import React from 'react';
import { motion } from 'framer-motion';

const Section = ({ title, children, id }: { title: string, children: React.ReactNode, id?: string }) => (
    <section id={id} className="py-20 border-b border-white/5 last:border-0">
        <div className="max-w-4xl mx-auto px-6">
            <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-sm font-bold uppercase tracking-widest text-blue-400 mb-8"
            >
                {title}
            </motion.h3>
            <div className="text-xl md:text-2xl font-light leading-relaxed text-stone-200">
                {children}
            </div>
        </div>
    </section>
);

const About = () => {
    return (
        <div className="bg-stone-900 text-stone-100">
            <Section title="The Vision" id="vision">
                <p className="mb-6">
                    I am building a digital-first news magazine focused on credible journalism, ground reports, education, youth issues, and society.
                </p>
                <p className="text-stone-400">
                    This is not a breaking-news or sensational portal.
                </p>
            </Section>

            <Section title="Our Focus">
                <div className="grid md:grid-cols-2 gap-8">
                    {[
                        "Trustworthy reporting",
                        "Explainers",
                        "Opinion with responsibility",
                        "Citizen/Public Journalism (verified)"
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center space-x-4 p-4 border border-white/10 rounded-lg hover:bg-white/5 transition-colors"
                        >
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                            <span>{item}</span>
                        </motion.div>
                    ))}
                </div>
            </Section>

            <Section title="Target Audience" id="audience">
                <ul className="space-y-4 text-lg text-stone-300">
                    <li className="flex items-start"><span className="mr-3 mt-1.5 text-blue-500">→</span> Students & youth (18–30)</li>
                    <li className="flex items-start"><span className="mr-3 mt-1.5 text-blue-500">→</span> Academics & informed readers</li>
                    <li className="flex items-start"><span className="mr-3 mt-1.5 text-blue-500">→</span> People interested in social, educational, and national issues</li>
                    <li className="flex items-start"><span className="mr-3 mt-1.5 text-blue-500">→</span> Aspiring journalists and contributors</li>
                </ul>
            </Section>

            <Section title="Our Tone">
                <p className="text-2xl italic font-serif text-stone-400">
                    "Serious, ethical, calm, and informative"
                </p>
            </Section>
        </div>
    );
};

export default About;
