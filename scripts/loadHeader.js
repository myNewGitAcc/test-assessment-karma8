'use strict';

/**
 * @param str {string}
 * @param substr {string}
 */
const stringHasSubstring = (str, substr) =>
  str.toLowerCase().includes(substr.toLowerCase());

document.addEventListener('DOMContentLoaded', function () {
  fetch('header.html')
    .then((res) => res.text())
    .then((data) => {
      document.querySelector('body').insertAdjacentHTML('afterbegin', data);
      const navList = document.querySelector('.navItemsList');
      Array.from(navList.children).forEach((li) => {
        if (stringHasSubstring(window.location.pathname, li.innerText)) {
          li.classList.add('active');
        }
      });
    })
    .catch((err) => {
      console.error('Error loading header:', err);
    });
});
