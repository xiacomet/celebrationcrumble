AOS.init({
  duration: 1000,
  offset: 0,
  easing: 'ease',
});

var swiper = new Swiper('.mySwiper ', {
  loop: true,
  centeredSlides: true,
  slideToClickedSlide: true,
  slidesPerView: 'auto',
  effect: "coverflow",
  spaceBetween: 0,
  coverflowEffect: {
    rotate: 0,
    stretch: 30,
    depth: 300,
    //modifier: 1,
    slideShadows: false,
  },
  navigation: {//화살표 버튼
    nextEl: '.mySwiper .swiper-button-next',
    prevEl: '.mySwiper .swiper-button-prev',
  },
});


// 컨페티
let lastConfetti = 0;
document.addEventListener('mousemove', function (e) {
  const now = Date.now();
  if (now - lastConfetti < 100) return;
  lastConfetti = now;
  confetti({
    particleCount: 3,
    spread: 5,
    startVelocity: 7,
    gravity: 0.3 + Math.random() * 0.2,
    scalar: 0.8 + Math.random() * 0.2,
    colors: ['#A6DAF4', '#FFB6B9', '#fff8c5'],
    shapes: ['square'],
    origin: {
      x: e.clientX / window.innerWidth,
      y: e.clientY / window.innerHeight
    }
  });
});

// 스크롤고정
$(function () {
  $(document).ready(function () {

    var scrollOffset = $('#nav').offset();

    $(window).scroll(function () {
      if ($(document).scrollTop() > scrollOffset.top) {
        $('#nav').addClass('scroll-fixed');
      }
      else {
        $('#nav').removeClass('scroll-fixed');
      }
    });
  });
});

// 부드럽게 넘어가기
window.addEventListener('scroll', function () {
  var nav = document.querySelector('.scroll-fixed');
  if (window.scrollY > 60) {   // 원하는 시점에!
    nav.classList.add('active');
  } else {
    nav.classList.remove('active');
  }
});

// 누르면 콘페티 팡
document.querySelectorAll('.confetti-btn').forEach(function (btn) {
  btn.addEventListener('click', function (e) {
    e.preventDefault();
    const rect = btn.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    confetti({
      particleCount: 40,
      spread: 40,
      origin: { x: x, y: y },
      colors: ['#4FC3F7', '#FF92AE', '#FFE066'],
    });
  });
});

// 스크롤효과
gsap.registerPlugin(ScrollTrigger);

const sectionConfigs = [
  { selector: '.sc_img1', gradFrom: { x: 180, opacity: 0 }, gradTo: { x: 0, opacity: 1 }, textFrom: { x: 110, opacity: 0 }, textTo: { x: 0, opacity: 1 } },
  { selector: '.sc_img2', gradFrom: { x: -180, opacity: 0 }, gradTo: { x: 0, opacity: 1 }, textFrom: { x: -110, opacity: 0 }, textTo: { x: 0, opacity: 1 } },
  { selector: '.sc_img3', gradFrom: { x: 180, opacity: 0 }, gradTo: { x: 0, opacity: 1 }, textFrom: { x: 110, opacity: 0 }, textTo: { x: 0, opacity: 1 } }
];

sectionConfigs.forEach(cfg => {

  gsap.fromTo(
    cfg.selector,
    { scale: 1.08, opacity: 0.7 },
    {
      scale: 1.0,
      opacity: 1,
      duration: 1.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: cfg.selector,
        start: "top 50%",
        end: "bottom 20%",
        scrub: 1,        // 스크롤 연동!
        markers: false,
      }
    }
  );

  // 그라데이션, 텍스트는 기존처럼
  gsap.fromTo(
    `${cfg.selector} .gradation-overlay`,
    cfg.gradFrom,
    {
      ...cfg.gradTo,
      duration: 0.5,
      delay: 0.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: cfg.selector,
        start: "top 50%",
        end: "bottom 20%",
        markers: false,
        scrub: 1
      }
    }
  );
  gsap.fromTo(
    `${cfg.selector} .sc_text`,
    cfg.textFrom,
    {
      ...cfg.textTo,
      duration: 1.1,
      delay: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: cfg.selector,
        start: "top 50%",
        end: "bottom 20%",
        markers: false,
        scrub: 1
      }
    }
  );
});

//클릭하면 영상 변경되는
 const videoElement = document.getElementById('phoneVideo');
  const buttons = document.querySelectorAll('.cakebutton_img');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const videoSrc = button.dataset.video;
      videoElement.src = videoSrc;
      videoElement.load();
      videoElement.play();
    });
  });

//  질문
		$(function () {
			$(".q_a li").click(function () {
				$(this).children("div").slideToggle()
				$(this).siblings().children("div").slideUp();
				$(this).toggleClass("on").siblings().removeClass("on")
			});
		});

    // a태그 top이동 금지
    document.querySelectorAll('.q_a li a').forEach(item => {
  item.addEventListener('click', function (e) {
    e.preventDefault(); // ✅ 기본 동작 막기 (스크롤 방지)
    // 나머지 열기/닫기 로직...
  });
});