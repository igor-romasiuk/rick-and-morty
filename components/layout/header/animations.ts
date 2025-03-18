export const menuVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
  exit: (i: number) => ({
    opacity: 0,
    x: 20,
    transition: {
      delay: i * 0.05,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

export const containerVariants = {
  hidden: { x: "100%" },
  visible: { 
    x: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 25,
      when: "beforeChildren",
      staggerChildren: 0.15,
      duration: 0.8,
      delayChildren: 0.1,
    }
  },
  exit: { 
    x: "100%",
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 25,
      when: "afterChildren",
      staggerChildren: 0.08,
      staggerDirection: -1,
      duration: 0.8,
      delay: 0.2,
    }
  }
}

export const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.5 }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.5, delay: 0.2 }
  }
} 