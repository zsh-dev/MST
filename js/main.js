document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector("header");
  const burger = document.querySelector(".burger");
  const headerWrap = document.querySelector(".header__wrap");
  const menu = document.querySelector(".menu-site");
  const btnOpenPopup = document.querySelectorAll(".btn-form_popup");
  const popup = document.querySelector(".form-popup");
  const btnClosePopup = document.querySelector(".form-popup-close");
  const currentUrl = window.location.href;
  const menuLinks = document.querySelectorAll(".menu-site ul li a");
  const faqItems = document.querySelectorAll('.faq');

  // МОБИЛЬНОЕ МЕНЮ
  function toggleMenu() {
    header.classList.toggle("open");
    headerWrap.classList.toggle("open");
    burger.classList.toggle("active");
    if (headerWrap.classList.contains("open")) {
      document.body.classList.add("lock");
      const height = headerWrap.scrollHeight;
      headerWrap.style.maxHeight = height + "px";
    } else {
      document.body.classList.remove("lock");
      headerWrap.style.maxHeight = null;
    }
  }

  burger.addEventListener("click", function () {
    if (window.innerWidth < 992) {
      toggleMenu();
    }
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth >= 992) {
      header.classList.remove("open");
      headerWrap.classList.remove("open");
      burger.classList.remove("active");
      document.body.classList.remove("lock");
      headerWrap.style.maxHeight = null;
    }
  });

// ПРОГРЕСС БАР
  const progressBar = document.querySelector('.progress-bar');
  if (progressBar) {
    const progress = progressBar.getAttribute('data-progress');
    progressBar.style.setProperty('--progress', progress + '%');
    progressBar.querySelector('span').textContent = progress + '%';
  }


// МАСКА ТЕЛЕФОНА
  function maskPhone(selector, masked = '+7 (___) ___-__-__') {
    const elems = document.querySelectorAll(selector);

    function mask(event) {
      const keyCode = event.keyCode;
      const template = masked,
        def = template.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, "");
      console.log(template);
      let i = 0,
        newValue = template.replace(/[_\d]/g, function (a) {
          return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
        });
      i = newValue.indexOf("_");
      if (i !== -1) {
        newValue = newValue.slice(0, i);
      }
      let reg = template.substr(0, this.value.length).replace(/_+/g,
        function (a) {
          return "\\d{1," + a.length + "}";
        }).replace(/[+()]/g, "\\$&");
      reg = new RegExp("^" + reg + "$");
      if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
        this.value = newValue;
      }
      if (event.type === "blur" && this.value.length < 5) {
        this.value = "";
      }

    }

    for (const elem of elems) {
      elem.addEventListener("input", mask);
      elem.addEventListener("focus", mask);
      elem.addEventListener("blur", mask);
    }

  }
  maskPhone('.phone-input', '+7 (___) ___-__-__');






  // Функция для открытия попапа
  function openPopup() {
    popup.classList.add("active");
    document.body.classList.add("lock");

  }

  // Функция для закрытия попапа
  function closePopup() {
    popup.classList.remove("active");

    if (!headerWrap.classList.contains("open")) {
      document.body.classList.remove("lock");
    }
  }

  // Обработчик события для кнопок открытия попапа
  btnOpenPopup.forEach(function (btn) {
    btn.addEventListener("click", openPopup);
  });

  // Обработчик события для кнопки закрытия попапа
  btnClosePopup.addEventListener("click", closePopup);

  // Обработчик события для закрытия попапа при клике на оверлей
  popup.addEventListener("click", function (event) {
    if (event.target === popup) {
      closePopup();
    }
  });


  new WOW({
    mobile: false
  }).init();

  

  // ОПРЕДЕЛЕНИЕ АКТИВНОЙ СТРАНИЦЫ
  menuLinks.forEach(function (link) {
    // Если текущий URL страницы заканчивается URL ссылки
    if (currentUrl.endsWith(link.href)) {
      // Добавляем класс "active" к активной ссылке
      link.classList.add("active");
    }
  });

  

  // Перебираем все элементы .faq
  faqItems.forEach(function (item, index) {
    var paragraph = item.querySelector('p');
    if (index !== 0) {
      // Если это не первый элемент, скрываем его
      paragraph.style.maxHeight = "0";
    }

    // Добавляем обработчик события клика на заголовок
    item.querySelector('.faq__title').addEventListener('click', function () {
      // Переключаем класс .open

      item.classList.toggle('open');
      if (item.classList.contains('open')) {
        // Если открыто, устанавливаем max-height равным высоте контента
        paragraph.style.maxHeight = paragraph.scrollHeight + "px";
      } else {
        // Если закрыто, устанавливаем max-height обратно в 0
        paragraph.style.maxHeight = "0";
      }
    });
  });

  // ЛИПКАЯ ШАПКА
  window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    const stickyPoint = header.offsetTop;

    if (window.pageYOffset > stickyPoint) {
      header.classList.add('sticky');
    } else {
      header.classList.remove('sticky');
    }
  });

// ТАБЫ
  const tabBtns = document.querySelectorAll('.tabs-btn'),
    tabContent = document.querySelectorAll('.tabs-block');
  if (tabBtns) {
    tabBtns.forEach((btn) => {

      btn.addEventListener('click', () => {
        let btnId = btn.getAttribute('data-tab'),
          tab = document.querySelector(btnId);

        if (!btn.classList.contains('active')) {
          tabBtns.forEach((btn) => {
            btn.classList.remove('active');
          })
          tabContent.forEach((tab) => {
            tab.classList.remove('active');
          })

          btn.classList.add('active')
          tab.classList.add('active')
        }


      })
    })


  }
});