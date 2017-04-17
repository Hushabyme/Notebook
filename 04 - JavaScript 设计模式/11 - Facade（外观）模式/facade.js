function on(el, event, callback) {
  if(el.addEventListener) {
    on = document.querySelector(el).addEventListener(event, callback);
  } else if(el.attachEvent) {
    on = document.querySelector(el).attachEvent('on' + event, callback);
  } else {
    on = document.querySelector(el)['on' + event] = callback;
  }
}

function remove(el, event, callback) {
  if(el.addEventListener) {
    remove = document.querySelector(el).removeEventListener(event, callback);
  } else if(el.attachEvent) {
    remove = document.querySelector(el).detachEvent('on' + event, callback);
  } else {
    remove = document.querySelector(el)['on' + event] = null;
  }
}