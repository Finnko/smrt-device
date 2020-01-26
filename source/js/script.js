'use strict';

var pageHeader = document.querySelector('.page-header');
var headerToggle = document.querySelector('.page-header__toggle');
var footerInfoToggles = document.querySelectorAll('.contacts__title');

var footerInfoClickHandler = function (evt) {
  var target = evt.target.parentElement;

  if (target.classList.contains('contacts__item--open')) {
    target.classList.remove('contacts__item--open');
  } else {
    target.classList.add('contacts__item--open');
  }
};

if (pageHeader) {
  pageHeader.classList.remove('page-header--nojs');
}

if (headerToggle) {
  headerToggle.addEventListener('click', function () {
    if (pageHeader.classList.contains('page-header--closed')) {
      pageHeader.classList.remove('page-header--closed');
      pageHeader.classList.add('page-header--opened');
    } else {
      pageHeader.classList.add('page-header--closed');
      pageHeader.classList.remove('page-header--opened');
    }
  });
}

if (footerInfoToggles) {
  footerInfoToggles.forEach(function (item) {
    item.addEventListener('click', footerInfoClickHandler);
  });
}
