document.addEventListener("DOMContentLoaded", function() {
  const cursor = document.querySelector('.cursor');
  
  // Run only if cursor exists
  if (cursor) {
    let mouseX = 0, mouseY = 0;
    let posX = 0, posY = 0;
    let isVisible = false;

    const cursorSize = cursor.offsetWidth / 2; // half of width for perfect centering

    // Track mouse
    document.addEventListener('mousemove', (e) => {
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
    document.addEventListener('mouseleave', () => {
      cursor.style.opacity = 0;
      isVisible = false;
    });
  }

  

const text = document.querySelector(".hero__section-circle-text");
text.innerHTML = text.innerText
	.split("")
	.map(
		(char, i) => `<span style="transform:rotate(${i * 10.3}deg)">${char}</span>`
	)
	.join("");

  const dots_cavas = document.querySelector('#particles-js');
  if(dots_cavas){
    particlesJS("particles-js", {"particles":{"number":{"value":40,"density":{"enable":true,"value_area":800}},"color":{"value":"#ffffff"},"shape":{"type":"circle","stroke":{"width":0,"color":"#000000"},"polygon":{"nb_sides":5},"image":{"src":"img/github.svg","width":100,"height":100}},"opacity":{"value":0.5,"random":false,"anim":{"enable":false,"speed":1,"opacity_min":0.1,"sync":false}},"size":{"value":2,"random":true,"anim":{"enable":false,"speed":40,"size_min":0.1,"sync":false}},"line_linked":{"enable":false,"distance":150,"color":"#ffffff","opacity":0.40246529723245905,"width":0.15782952832645453},"move":{"enable":true,"speed":6,"direction":"none","random":false,"straight":false,"out_mode":"out","bounce":false,"attract":{"enable":false,"rotateX":600,"rotateY":1200}}},"interactivity":{"detect_on":"canvas","events":{"onhover":{"enable":false,"mode":"repulse"},"onclick":{"enable":true,"mode":"push"},"resize":true},"modes":{"grab":{"distance":400,"line_linked":{"opacity":1}},"bubble":{"distance":400,"size":40,"duration":2,"opacity":8,"speed":3},"repulse":{"distance":200,"duration":0.4},"push":{"particles_nb":4},"remove":{"particles_nb":2}}},"retina_detect":true});var count_particles, stats, update; stats = new Stats; stats.setMode(0); stats.domElement.style.position = 'absolute'; stats.domElement.style.left = '0px'; stats.domElement.style.top = '0px'; document.body.appendChild(stats.domElement); count_particles = document.querySelector('.js-count-particles'); update = function() { stats.begin(); stats.end(); if (window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) { count_particles.innerText = window.pJSDom[0].pJS.particles.array.length; } requestAnimationFrame(update); }; requestAnimationFrame(update);;
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
      }
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
      }
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
      }
    });
  }
});


document.addEventListener("DOMContentLoaded", function () {

  const cards = gsap.utils.toArray(".results__process-card");

  const positions = [
    { right: "0%",  scale: 1,    opacity: 1,   blur: 0, z: 3 },
    { right: "25%", scale: 0.9, opacity: 0.7, blur: 2, z: 2 },
    { right: "50%", scale: 0.8,  opacity: 0.4, blur: 4, z: 1 }
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
        ease: "power3.out"
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
  cards.forEach(card => {
    card.addEventListener("click", restartShuffle);
  });

});