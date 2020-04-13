import * as React from 'react';
import { HTMLAttributes, PropsWithChildren } from 'react';
import { motion } from 'framer-motion';

const container = {
    hidden: { opacity: 1, height: 0 },
    visible: {
        opacity: 1,
        height: 'unset',
        transition: {
            delay: 0.25,
            when: "beforeChildren",
            staggerChildren: 0.5,
            type: 'spring',
            stiffness: 500,
            damping: 20
        }
    }
};

const item = {
    hidden: { x: -20, opacity: 0 },
    visible: {
        x: 0,
        opacity: 1
    }
};

interface SlideInDivProps extends PropsWithChildren<HTMLAttributes<HTMLDivElement>> {
    containerClassName?: string;
    childrenClassName?: string;
}

export const SlideInDiv: React.FC<SlideInDivProps> = (props) => {
    return (
        <motion.div
            className={props.containerClassName}
            variants={container}
            initial="hidden"
            animate="visible"
        >
            <motion.div
                className={props.childrenClassName}
                variants={item}
            >
                { props.children }
            </motion.div>
        </motion.div>
    );
};