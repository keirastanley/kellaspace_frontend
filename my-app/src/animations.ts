export const animations = {
  getFade: (initial = 0, animate = 1, exit = 0) => ({
    initial: {
      opacity: initial,
    },
    animate: {
      opacity: animate,
    },
    exit: {
      opacity: exit,
    },
  }),
  getChangeSize: (initial = 0.5, animate = 1, exit = 0) => ({
    initial: {
      scale: initial,
    },
    animate: {
      scale: animate,
    },
    exit: {
      scale: exit,
    },
  }),
};

export const transitions = {
  getEaseInOut: (duration = 0.1) => ({
    transition: {
      ease: "easeInOut" as const,
      duration,
    },
  }),
};
