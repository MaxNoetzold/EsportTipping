type ThrottleFunction = (...args: unknown[]) => void;

function throttle(func: ThrottleFunction, delay: number) {
  let lastCall = 0;
  return function (...args: unknown[]) {
    const now = new Date().getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    return func(...args);
  };
}

export default throttle;
