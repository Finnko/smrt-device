'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var pageHeader = document.querySelector('.page-header');
var headerToggle = document.querySelector('.page-header__toggle');
var footerInfoToggles = document.querySelectorAll('.contacts__title');
var modalDialog = document.querySelector('.modal');
var overlay = modalDialog.querySelector('.modal__overlay');
var openButton = document.querySelector('.header__button');
var closeButton = modalDialog.querySelector('.modal__close-button');
var form = modalDialog.querySelector('.modal__form');
var login = form.querySelector('#user-name1');
var phone = form.querySelector('#user-phone1');
var message = form.querySelector('#user-message1');

var isStorageSupport = true;
var storage = '';

var footerInfoClickHandler = function (evt) {
  var target = evt.target.parentElement;

  if (target.classList.contains('contacts__item--open')) {
    target.classList.remove('contacts__item--open');
  } else {
    target.classList.add('contacts__item--open');
  }
};

var modalEscClickHandler = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeModal();
  }
};

var openModal = function () {
  if (modalDialog) {
    modalDialog.classList.remove('modal--hidden');
  }

  if (storage) {
    login.value = storage;
    phone.focus();
  } else {
    login.focus();
  }

  login.focus();

  document.addEventListener('keydown', modalEscClickHandler);
};

var closeModal = function () {
  if (modalDialog) {
    modalDialog.classList.add('modal--hidden');
  }
  document.removeEventListener('keydown', modalEscClickHandler);
};

try {
  storage = localStorage.getItem('login');
} catch (err) {
  isStorageSupport = false;
}

if (form) {
  form.addEventListener('submit', function (evt) {
    if (!login.value || !phone.value || !message.value) {
      evt.preventDefault();
    } else {
      if (isStorageSupport) {
        localStorage.setItem('login', login.value);
        localStorage.setItem('phone', phone.value);
        localStorage.setItem('message', message.value);
      }
    }
  });
}

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

if (openButton) {
  openButton.addEventListener('click', function () {
    openModal();
  });
}

if (openButton) {
  openButton.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      openModal();
    }
  });
}

if (overlay) {
  overlay.addEventListener('click', function () {
    closeModal();
  });
}

if (closeButton) {
  closeButton.addEventListener('click', function () {
    closeModal();
  });
}

if (closeButton) {
  closeButton.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closeModal();
    }
  });
}


