'use strict';

document.addEventListener('DOMContentLoaded', function () {
  fetch('metatags.html')
    .then((res) => res.text())
    .then((data) => {
      document.querySelector('head').insertAdjacentHTML('beforeend', data);
    })
    .catch((err) => {
      console.error('Error loading header:', err);
    });
});
