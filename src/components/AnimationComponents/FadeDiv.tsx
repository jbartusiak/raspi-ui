import React, { HTMLAttributes, PropsWithChildren } from 'react';
import { motion } from 'framer-motion';

const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
};

interface FadeDivProps extends PropsWithChildren<HTMLAttributes<HTMLDivElement>> {
    containerClassName?: string;
    shouldDisplay: boolean;
}

export const FadeDiv: React.FC<FadeDivProps> = (props) => {
    return (
        <motion.div
            className={props.containerClassName}
            variants={container}
            initial="hidden"
            transition={{ duration: 0.25 }}
            animate={props.shouldDisplay ? 'visible' : 'hidden'}
        >
            {props.children}
        </motion.div>
    );
};