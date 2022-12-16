var targets = document.querySelectorAll(".menu__item-link");

targets.forEach((target) => {
  target.addEventListener("mouseover", mOver, false);
  target.addEventListener("mouseout", mOut, false);
});

function mOver() {
  targets.forEach((target) => {
    target.classList.add("active");
  });
}

function mOut() {
  targets.forEach((target) => {
    target.classList.remove("active");
  });
}

const clamp = (val, min, max) => Math.max(min, Math.min(max, val));

const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".scrollContainer"),
  smooth: true,
  getSpeed: true,
  smoothMobile: true,
});

const contents = document.querySelectorAll(".menu__item");
var speed = 0;

locoScroll.on("scroll", (args) => {
  speed = args.speed;
  contents.forEach((content) => {
    content.style.transform = "skewY(" + clamp(speed, -8, 8) + "deg)";
  });
});

// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)

locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy(".scrollContainer", {
  scrollTop(value) {
    return arguments.length
      ? locoScroll.scrollTo(value, 0, 0)
      : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector(".scrollContainer").style.transform
    ? "transform"
    : "fixed",
});

// gsap.set("#bigHand, #smallHand", { svgOrigin: "200 200" });

let tl = gsap
  .timeline({ defaults: { ease: "none" } })
  .to("#gsap__element", { rotation: 360, duration: 3 });

ScrollTrigger.create({
  trigger: "#gsap__element",
  start: "50% 50%",
  end: "+=300",
  scroller: ".scrollContainer",
  animation: tl,
  markers: true,
  scrub: true,
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

//watch the free video on how this demo was made
// https://www.snorkl.tv/scrolltrigger-smooth-scroll/
