function debounce(fn, delay) {
  var timerId;
  return function () {
    clearTimeout(timerId);
    timerId = setTimeout(fn, delay);
  };
}
