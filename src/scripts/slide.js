function toggleSidebar() {
  var mainEl = document.querySelector('.main-container');
  var navEl = document.querySelector('nav');
  var navWidth = Math.ceil(parseFloat(window.getComputedStyle(navEl).width));

  if (mainEl.scrollLeft < navWidth / 2) {
    mainEl.scrollLeft = navWidth;
  } else {
    mainEl.scrollLeft = 0;
  }
}
