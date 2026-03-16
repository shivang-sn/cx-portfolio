document.addEventListener("DOMContentLoaded", function () {
  const cursor = document.querySelector(".cursor");

  // Run only if cursor exists
  if (cursor) {
    let mouseX = 0,
      mouseY = 0;
    let posX = 0,
      posY = 0;
    let isVisible = false;

    const cursorSize = cursor.offsetWidth / 2; // half of width for perfect centering

    // Track mouse
    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX - cursorSize;
      mouseY = e.clientY - cursorSize;

      if (!isVisible) {
        cursor.style.opacity = 1;
        isVisible = true;
      }
    });

    // Smooth animation loop
    function followCursor() {
      posX += (mouseX - posX) * 0.2;
      posY += (mouseY - posY) * 0.2;
      cursor.style.transform = `translate(${posX}px, ${posY}px)`;
      requestAnimationFrame(followCursor);
    }
    followCursor();

    // Hide when mouse leaves window
    document.addEventListener("mouseleave", () => {
      cursor.style.opacity = 0;
      isVisible = false;
    });
  }

  const text = document.querySelector(".hero__section-circle-text");
  text.innerHTML = text.innerText
    .split("")
    .map(
      (char, i) =>
        `<span style="transform:rotate(${i * 10.3}deg)">${char}</span>`,
    )
    .join("");

  const dots_cavas = document.querySelector("#particles-js");
  if (dots_cavas) {
    particlesJS("particles-js", {
      particles: {
        number: { value: 40, density: { enable: true, value_area: 800 } },
        color: { value: "#ffffff" },
        shape: {
          type: "circle",
          stroke: { width: 0, color: "#000000" },
          polygon: { nb_sides: 5 },
          image: { src: "img/github.svg", width: 100, height: 100 },
        },
        opacity: {
          value: 0.5,
          random: false,
          anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false },
        },
        size: {
          value: 2,
          random: true,
          anim: { enable: false, speed: 40, size_min: 0.1, sync: false },
        },
        line_linked: {
          enable: false,
          distance: 150,
          color: "#ffffff",
          opacity: 0.40246529723245905,
          width: 0.15782952832645453,
        },
        move: {
          enable: true,
          speed: 6,
          direction: "none",
          random: false,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: { enable: false, rotateX: 600, rotateY: 1200 },
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: false, mode: "repulse" },
          onclick: { enable: true, mode: "push" },
          resize: true,
        },
        modes: {
          grab: { distance: 400, line_linked: { opacity: 1 } },
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 8,
            speed: 3,
          },
          repulse: { distance: 200, duration: 0.4 },
          push: { particles_nb: 4 },
          remove: { particles_nb: 2 },
        },
      },
      retina_detect: true,
    });
    var count_particles, stats, update;
    stats = new Stats();
    stats.setMode(0);
    stats.domElement.style.position = "absolute";
    stats.domElement.style.left = "0px";
    stats.domElement.style.top = "0px";
    document.body.appendChild(stats.domElement);
    count_particles = document.querySelector(".js-count-particles");
    update = function () {
      stats.begin();
      stats.end();
      if (
        window.pJSDom[0].pJS.particles &&
        window.pJSDom[0].pJS.particles.array
      ) {
        count_particles.innerText = window.pJSDom[0].pJS.particles.array.length;
      }
      requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }
});

// === GSAP HERO TEXT ANIMATION ===
document.addEventListener("DOMContentLoaded", function () {
  if (typeof gsap !== "undefined") {
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Main H1 Animation
    gsap.to(".hero__section-headline", {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".hero__section",
        start: "top 70%",
      },
    });

    // Highlight Word Animation
    gsap.to(".hero__section-headline-highlight", {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 1.4,
      delay: 0.4,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".hero__section",
        start: "top 70%",
      },
    });

    // Description Paragraph Animation
    gsap.to(".hero__section-description", {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 1.4,
      delay: 0.7,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".hero__section",
        start: "top 65%",
      },
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const cards = gsap.utils.toArray(".results__process-card");

  const positions = [
    { right: "0%", scale: 1, opacity: 1, blur: 0, z: 3 },
    { right: "25%", scale: 0.9, opacity: 0.7, blur: 2, z: 2 },
    { right: "50%", scale: 0.8, opacity: 0.4, blur: 4, z: 1 },
  ];

  let activeIndex = 0;
  let timer;

  function render() {
    cards.forEach((card, i) => {
      const posIndex = (i - activeIndex + cards.length) % cards.length;
      const p = positions[posIndex];

      gsap.to(card, {
        right: p.right,
        scale: p.scale,
        opacity: p.opacity,
        zIndex: p.z,
        filter: `blur(${p.blur}px)`,
        duration: 0.9,
        ease: "power3.out",
      });
    });
  }

  function shuffleLeftToRight() {
    // LEFT → RIGHT movement
    activeIndex = (activeIndex + 1) % cards.length;
    render();
  }

  function startAuto() {
    timer = setInterval(shuffleLeftToRight, 4000);
  }

  function restartShuffle() {
    clearInterval(timer);
    shuffleLeftToRight();
    startAuto();
  }

  /* INIT */
  render();
  startAuto();

  /* CLICK */
  cards.forEach((card) => {
    card.addEventListener("click", restartShuffle);
  });

  document.querySelectorAll(".blog__card").forEach((wrapper) => {
    const pill = wrapper.querySelector(".blog__cursor-pill");

    wrapper.addEventListener("mousemove", (e) => {
      const rect = wrapper.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      pill.style.left = x + "px";
      pill.style.top = y + "px";
      pill.style.opacity = "1";
    });

    wrapper.addEventListener("mouseleave", () => {
      pill.style.opacity = "0";
    });
  });
});


document.querySelectorAll('.faq__question').forEach(q => {
  q.addEventListener('click', () => {

    const item = q.closest('.faq__item');

    // close all
    document.querySelectorAll('.faq__item').forEach(el=>{
      if(el !== item){
        el.classList.remove('faq__item--active');
      }
    });

    // toggle clicked
    item.classList.toggle('faq__item--active');

  });
});

$('.vertical-slider').slick({
  vertical:true,
  verticalSwiping:true,
  slidesToShow:1,
  slidesToScroll:1,
  infinite:false,
  autoplay:true,
  autoplaySpeed:1000,
  speed:2000,
  arrows:false,
  dots:true
});

$(document).ready(function () {

  // NORMAL LEFT → RIGHT
  $('.js-offers-slider').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 0,
    speed: 4000,
    cssEase: 'linear',
    arrows: false,
    dots: false,
    pauseOnHover: false,
    variableWidth: true,

    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } }
    ]
  });

  $('.latest-projects__slider').slick({
  slidesToShow:3,
  slidesToScroll:1,
  infinite:true,
  autoplay:true,
  autoplaySpeed:0,
  speed:6000,
  cssEase:'linear',
  arrows:false,
  dots:false,
  pauseOnHover:true,
  responsive:[
    {breakpoint:1024,settings:{slidesToShow:2}},
    {breakpoint:600,settings:{slidesToShow:1}}
  ]
});

/* mouse follow button */
$('.latest-projects__item-wrapper').on('mousemove',function(e){
  const btn=$(this).find('.latest-projects__btn');
  const offset=$(this).offset();

  btn.css({
    left:e.pageX-offset.left,
    top:e.pageY-offset.top
  });
});

  $('.logos-slider').slick({
  slidesToShow:6,
  slidesToScroll:1,
  infinite:true,
  autoplay:true,
  autoplaySpeed:0,
  speed:6000,
  cssEase:'linear',
  arrows:false,
  dots:false,
  pauseOnHover:true,
  responsive:[
    {breakpoint:1024,settings:{slidesToShow:2}},
    {breakpoint:600,settings:{slidesToShow:1}}
  ]
});
  $('.testimonial-slider-row').slick({
  slidesToShow:3,
  slidesToScroll:1,
  infinite:true,
  autoplay:true,
  autoplaySpeed:0,
  speed:6000,
  cssEase:'linear',
  arrows:false,
  dots:false,
  pauseOnHover:true,
  responsive:[
    {breakpoint:1024,settings:{slidesToShow:2}},
    {breakpoint:600,settings:{slidesToShow:1}}
  ]
});

 $('.growth__slider').slick({
  slidesToShow:1,
  slidesToScroll:1,
  infinite:true,
  autoplay:false,
  autoplaySpeed:1000,
  speed:2000,
  arrows:true,
  dots:false,
  pauseOnHover:true
});
});

document.addEventListener("DOMContentLoaded", function () {

  const counter = document.querySelector(".trusted__number");
  const target = +counter.getAttribute("data-target");
  let started = false;

  function startCounter() {
    let count = 0;
    const duration = 2000; 
    const increment = target / (duration / 16);

    function updateCounter() {
      count += increment;
      if (count < target) {
        counter.textContent = Math.floor(count).toLocaleString();
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target.toLocaleString();
      }
    }

    updateCounter();
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !started) {
        started = true;
        startCounter();
      }
    });
  }, { threshold: 0.5 });

  observer.observe(counter);

});


const tabs = document.querySelectorAll(".pricing__tab");
const indicator = document.querySelector(".pricing__tab-indicator");

function moveIndicator(tab){
  const parent = tab.parentElement;

  const tabRect = tab.getBoundingClientRect();
  const parentRect = parent.getBoundingClientRect();

  const left = tabRect.left - parentRect.left;

  indicator.style.width = tabRect.width + "px";
  indicator.style.transform = `translateX(${left}px)`;
}

// initial position
moveIndicator(document.querySelector(".pricing__tab--active"));

tabs.forEach(tab => {

  tab.addEventListener("click", () => {

    tabs.forEach(t => t.classList.remove("pricing__tab--active"));
    tab.classList.add("pricing__tab--active");

    moveIndicator(tab);

    let target = tab.dataset.tab;

    document.querySelectorAll(".pricing__content")
      .forEach(content => {

        content.classList.remove("pricing__content--active");

        if(content.dataset.content === target){
          content.classList.add("pricing__content--active");
        }

      });

  });

});

// select all titles

gsap.registerPlugin(ScrollTrigger);

document.querySelectorAll('.top-title-row-left-part').forEach((section)=>{

  const title = section.querySelector('.typ-effect');
  const heading = section.querySelector('h2');

  // split words
  let words = title.innerText.split(" ");

  title.innerHTML = words.map(word => 
    `<span class="word">${word}</span>`
  ).join(" ");

  const wordsEl = title.querySelectorAll(".word");

  const tl = gsap.timeline({
    scrollTrigger:{
      trigger:section,
      start:"top 85%",
      toggleActions:"play none none none"
    }
  });

  // Heading animation (opacity + blur only)
  tl.from(heading,{
    opacity:0,
    filter:"blur(10px)",
    duration:0.4,
    ease:"power2.out"
  })

  // Word animation after heading
  .fromTo(wordsEl,
  {
    opacity:0,
    y:30,
    filter:"blur(10px)"
  },
  {
    opacity:1,
    y:0,
    filter:"blur(0px)",
    duration:0.4,
    stagger:0.08,
    ease:"power3.out"
  },"+=0.2");

});


gsap.registerPlugin(ScrollTrigger);

let tl = gsap.timeline({
  scrollTrigger:{
    trigger: ".pro-cards-sec",
    start: "top 70%",
    end: "center center",
    scrub: 2   // momentum / inertia
  }
});

/* TEXT */
tl.fromTo(".professionals-card-top",
{
  y: 120,
},
{
  y: 0,
  ease: "power2.out"
},0);


/* IMAGE */
tl.fromTo(".professionals-card-bottom",
{
  y: 160
},
{
  y: -130,
  ease: "power2.out"
},0);