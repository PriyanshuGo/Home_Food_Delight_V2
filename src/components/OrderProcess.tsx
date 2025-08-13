"use client";
import { ArrowRight } from 'lucide-react';
import { processSteps } from '@/utils/constants';
import { motion, Variants, Transition } from 'framer-motion';

const fadeUpSpring = (delay = 0): Variants => ({
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            delay,
            duration: 0.6,
            type: "spring",
            stiffness: 80,
            damping: 15
        },
    },
});

const iconPop = (delay = 0): Variants => ({
    hidden: { opacity: 0, scale: 0.5, rotate: -10 },
    visible: {
        opacity: 1,
        scale: 1,
        rotate: 0,
        transition: {
            delay,
            type: "spring",
            stiffness: 120,
            damping: 8
        }
    }
});


function OrderProcess() {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">

                {/* Title */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
                    className="text-center mb-12"
                >
                    <motion.h2
                        variants={fadeUpSpring(0)}
                        className="text-3xl md:text-4xl font-bold text-brown mb-4"
                    >
                        How It Works
                    </motion.h2>
                    <motion.p
                        variants={fadeUpSpring(0.1)}
                        className="text-lg text-muted-foreground max-w-2xl mx-auto"
                    >
                        Simple 3-step process to get fresh, homemade meals delivered to your doorstep
                    </motion.p>
                </motion.div>

                {/* Steps */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={{ visible: { transition: { staggerChildren: 0.25 } } }}
                    className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto relative"
                >
                    {processSteps.map((step, index) => {
                        const Icon = step.icon;
                        return (
                            <motion.div
                                key={step.step}
                                variants={fadeUpSpring(index * 0.2)}
                                whileHover={{ y: -6, scale: 1.03 }}
                                transition={{ type: "spring", stiffness: 150, damping: 10 }}
                                className="text-center space-y-4 relative"
                            >
                                <motion.div
                                    variants={iconPop(index * 0.2)}
                                    className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center mx-auto shadow-warm`}
                                >
                                    <Icon className="h-8 w-8 text-white" />
                                </motion.div>

                                <div className="space-y-2">
                                    <h3 className="text-xl font-semibold text-brown">{step.title}</h3>
                                    <p className="text-muted-foreground">{step.description}</p>
                                </div>

                                {/* Animated connecting arrow */}
                                {index < processSteps.length - 1 && (
                                    <motion.div
                                        initial={{ width: 0, opacity: 0 }}
                                        animate={{ width: "3rem", opacity: 1 }}
                                        transition={{
                                            delay: 0.4 + index * 0.25, // appears after step finishes animating
                                            duration: 0.4,
                                            ease: "easeOut"
                                        }}
                                        className="hidden md:flex items-center justify-center absolute top-[2.5rem] left-[calc(100%+0.25rem)] overflow-hidden"
                                    >
                                        <ArrowRight className="h-6 w-6 text-saffron shrink-0" />
                                    </motion.div>
                                )}
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}

export default OrderProcess;
