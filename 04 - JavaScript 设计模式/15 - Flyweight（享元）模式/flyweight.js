function message(el, message) {
  const elem = document.querySelector(el);
  return elem.addEventListener('click', () => alert(message));
}