export const debounce = (func: any, delay: number): (...args: any) => void => {
  let debounceTimer: any;
  return (...args: any) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(this, args), delay);
  };
};

