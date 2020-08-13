//We add debouncig functionality to a code, to reduce stress on our api call
//By reducing the number of network calls//without debouncing with each key event was invoked and a call was made to the api
//adding debouncing functionality
const debounce = (func, delay = 1000) => {
  let timeOutId;
  return (...args) => {
    if (timeOutId) {
      clearTimeout(timeOutId);
    }
    timeOutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};
