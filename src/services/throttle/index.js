export const debounce = function(fun, waitMs, immediate) {
  let timeout;
  return function(...args) {
    const context = this;
    const later = () => {
      timeout = null;
      if (!immediate) {
        fun.apply(context, args);
      }
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, waitMs);
    if (callNow) {
      fun.apply(context, args);
    }
  };
};

export default {
  debounce
};

