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

function setBaselines(shouldBeVisible) {
  if (shouldBeVisible) {
    document.body.classList.add('show-baselines');
  } else {
    document.body.classList.remove('show-baselines');
  }
}

window.toggleBaselines = function() {
  if (localStorage.getItem('baselines') === 'show') {
    localStorage.setItem('baselines', null);
    setBaselines(false);
    return '🙈';
  } else {
    localStorage.setItem('baselines', 'show');
    setBaselines(true);
    return '👀';
  }
}

document.addEventListener('DOMContentLoaded', function() {
  if (localStorage.getItem('baselines') === 'show') {
    setBaselines(true);
  }
});
