'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var TABLET_MEDIA_QUERY = '(max-width: 1023px)';
var PHONE_NUMBER_MIN_LENGTH = 16;

var html = document.querySelector('html');
var body = document.querySelector('body');
var pageHeader = document.querySelector('.page-header');
var headerToggle = document.querySelector('.page-header__toggle');
var footerInfoContainer = document.querySelector('.contacts');
var footerInfoToggles = document.querySelectorAll('.contacts h5');
var footerCopyrightContainer = document.querySelector('.footer__item-logo');
var footerLogo = footerCopyrightContainer.querySelector('.footer__logo');
var footerSocial = footerCopyrightContainer.querySelector('.footer__social');
var footerTextCopyright = document.querySelector('.js-text-copyright');
var scrollLinks = document.querySelectorAll('.js-scroll-to');
var modalDialog = document.querySelector('.modal');
var overlay = modalDialog.querySelector('.modal__overlay');
var openButton = document.querySelector('.header__button');
var closeButton = modalDialog.querySelector('.modal__close-button');
var form = modalDialog.querySelector('.modal__form');
var login = form.querySelector('#user-name1');
var phone = form.querySelector('#user-phone1');
var message = form.querySelector('#user-message1');
var phoneInputs = document.querySelectorAll('input[name=phone]');

var isStorageSupport = true;
var storage = '';

var disableScroll = function () {
  if (body) {
    html.classList.add('no-scroll');
    body.classList.add('no-scroll');
  }
};

var enableScroll = function () {
  if (body) {
    html.classList.remove('no-scroll');
    body.classList.remove('no-scroll');
  }
};

var modalEscClickHandler = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeModal();
  }
};

var openModal = function () {
  disableScroll();

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
  enableScroll();

  if (modalDialog) {
    modalDialog.classList.add('modal--hidden');
  }
  document.removeEventListener('keydown', modalEscClickHandler);
};

var easeInOutCubic = function (timeElapsed, position, distance, duration) {
  timeElapsed /= duration / 2;
  if (timeElapsed < 1) {
    return distance / 2 * timeElapsed * timeElapsed * timeElapsed + position;
  }

  timeElapsed -= 2;
  return distance / 2 * (timeElapsed * timeElapsed * timeElapsed + 2) + position;
};

var smoothScroll = function (element, duration) {
  var target = document.querySelector(element);
  var targetPosition = target.offsetTop;
  var startPosition = window.pageYOffset;
  var distance = targetPosition - startPosition;
  var startTime = null;

  var animation = function (currentTime) {
    if (startTime === null) {
      startTime = currentTime;
    }
    var timeElapsed = currentTime - startTime;
    var iteration = easeInOutCubic(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, iteration);
    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  };

  requestAnimationFrame(animation);
};

var validatePhoneNumber = function (input) {
  if (input.value.length < PHONE_NUMBER_MIN_LENGTH) {
    input.setCustomValidity('Введите номер полностью');
  } else {
    input.setCustomValidity('');
  }
};

var createPhoneInputMask = function (evt, input) {
  if (!(evt.key === 'ArrowLeft' || evt.key === 'ArrowRight' || evt.key === 'Backspace' || evt.key === 'Tab')) {
    evt.preventDefault();
  }

  var mask = '+7(111)111-11-11';

  if (/[0-9\+\ \-\(\)]/.test(evt.key)) {
    var currentString = input.value;
    var currentLength = currentString.length;

    if (/[0-9]/.test(evt.key)) {
      if (mask[currentLength] === '1') {
        input.value = currentString + evt.key;
      } else {
        for (var i = currentLength; i < mask.length; i++) {
          if (mask[i] === '1') {
            input.value = currentString + evt.key;
            break;
          }
          currentString += mask[i];
        }
      }
    }
  }
};

document.createElement('picture');

try {
  storage = localStorage.getItem('login');
} catch (err) {
  isStorageSupport = false;
}

if (scrollLinks) {
  [].forEach.call(scrollLinks, function (item) {
    item.addEventListener('click', function (evt) {
      var target = evt.target;
      var element = target.getAttribute('href');
      smoothScroll(element, 800);
    });
  });
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

if (footerInfoToggles && footerInfoContainer) {
  footerInfoContainer.addEventListener('click', function (evt) {
    [].forEach.call(footerInfoToggles, function (item) {
      item.parentElement.classList.remove('contacts__item--open');
    });

    var target = evt.target;
    target.parentElement.classList.add('contacts__item--open');
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


if (footerTextCopyright && footerCopyrightContainer && footerLogo && footerSocial) {
  var paragraph = footerTextCopyright.cloneNode(true);
  var fragment = document.createDocumentFragment();

  if (window.matchMedia(TABLET_MEDIA_QUERY).matches) {
    fragment.appendChild(footerLogo);
    fragment.appendChild(paragraph);
    fragment.appendChild(footerSocial);

    footerCopyrightContainer.appendChild(fragment);
  }
}

if (phoneInputs) {
  [].forEach.call(phoneInputs, function (phoneInput) {
    validatePhoneNumber(phoneInput);
    phoneInput.addEventListener('keyup', function () {
      validatePhoneNumber(phoneInput);
    });

    phoneInput.addEventListener('focus', function () {
      if (phoneInput.value === '+7(' || phoneInput.value === '') {
        phoneInput.value = '+7(';
      }
    });

    phoneInput.addEventListener('keydown', function (evt) {
      createPhoneInputMask(evt, phoneInput);
    });
  });
}
