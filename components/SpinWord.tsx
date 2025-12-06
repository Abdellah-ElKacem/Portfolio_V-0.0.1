import React from "react";
import { motion } from "motion/react";

type SpinWordProps = {
    text?: string;
    duration?: number;
    className?: string;
    children?: React.ReactNode;
};

const SpinWord: React.FC<SpinWordProps> = ({
    text,
    children,
    duration = 2,
    className = "",
}) => {
    return (
        <motion.span
            className={`inline-flex items-center justify-center origin-center will-change-transform ${className}`}
            style={{ transformOrigin: "50% 50%", lineHeight: 1 }}
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{
                repeat: Infinity,
                repeatType: "loop",
                ease: "linear",
                duration,
            }}
        >
            {text}
            {children}
        </motion.span>
    );
};

export default SpinWord;
