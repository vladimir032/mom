import confetti from 'canvas-confetti';

export const launchConfetti = () => {
  confetti({
    particleCount: 100,
    spread: 80,
    origin: { y: 0.6 },
  });
};
