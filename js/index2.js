// gsap.registerPlugin(ScrollTrigger);

new fullpage("#fullpage", {
  //options here
  autoScrolling: true,
  scrollHorizontally: true,
  navigation: false,
  navigationPosition: "left",
  scrollingSpeed: 1300,
  easingcss3: "cubic-bezier(.70,0,.30,1)",
  anchors: ["first", "second", "third", "fourth", "fifth", "sixth"],
  credits: { enabled: false },

  onLeave: function (index, nextIndex, direction) {
    document.querySelector("#video").play();
  },
});

// let direction = 1; // 1 = forward, -1 = backward scroll

// const roll1 = roll(".rollingText", { duration: 15 }),
//   scroll = ScrollTrigger.create({
//     onUpdate(self) {
//       if (self.direction !== direction) {
//         direction *= -1;
//         gsap.to(roll1, { timeScale: direction, overwrite: true });
//       }
//     },
//   });

// // helper function that clones the targets, places them next to the original, then animates the xPercent in a loop to make it appear to roll across the screen in a seamless loop.
// function roll(targets, vars, reverse) {
//   vars = vars || {};
//   vars.ease || (vars.ease = "none");
//   const tl = gsap.timeline({
//       repeat: -1,
//       onReverseComplete() {
//         this.totalTime(this.rawTime() + this.duration() * 10); // otherwise when the playhead gets back to the beginning, it'd stop. So push the playhead forward 10 iterations (it could be any number)
//       },
//     }),
//     elements = gsap.utils.toArray(targets),
//     clones = elements.map((el) => {
//       let clone = el.cloneNode(true);
//       el.parentNode.appendChild(clone);
//       return clone;
//     }),
//     positionClones = () =>
//       elements.forEach((el, i) =>
//         gsap.set(clones[i], {
//           position: "absolute",
//           overwrite: false,
//           top: el.offsetTop,
//           left: el.offsetLeft + (reverse ? -el.offsetWidth : el.offsetWidth),
//         })
//       );
//   positionClones();
//   elements.forEach((el, i) =>
//     tl.to([el, clones[i]], { xPercent: reverse ? 100 : -100, ...vars }, 0)
//   );
//   window.addEventListener("resize", () => {
//     let time = tl.totalTime(); // record the current time
//     tl.totalTime(0); // rewind and clear out the timeline
//     positionClones(); // reposition
//     tl.totalTime(time); // jump back to the proper time
//   });
//   return tl;
// }

// Variables
const el = document.querySelector(".section__4 .title");
const container = document.querySelector(".section__4 .container");

// Variables ~ Widths
let elWidth = el.offsetWidth;
let windowWidth = window.innerWidth;

// Variables ~ Mouse
let mouseX = 0;
let prevMouseX = 0;

// Target: value we want to animate to
let skewTarget = 0;
let translateTarget = 0;

// WithEasing: value we use to animate
let skewWithEasing = 0;
let translateWithEasing = 0;

// EasingFactor: determines how quick the animation/interpolation goes
let skewEasingFactor = 0.1;
let translateEasingFactor = 0.05;

// Events
container.addEventListener("mousemove", handleMouseMove);
container.addEventListener("resize", handleWindowResize);

// Functions
function handleMouseMove(e) {
  mouseX = e.pageX;
}

function handleWindowResize(e) {
  elWidth = el.offsetWidth;
  windowWidth = window.innerWidth;
}

function lerp(start, end, factor) {
  return (1 - factor) * start + factor * end;
}

function animateMe() {
  // Get difference between current and previous mouse position
  skewTarget = mouseX - prevMouseX;
  prevMouseX = mouseX;

  // Calc how much we need to translate our el
  translateTarget = ((elWidth - windowWidth) / windowWidth) * mouseX * -1;

  // Ease between start and target values (skew)
  skewWithEasing = lerp(skewWithEasing, skewTarget, skewEasingFactor);

  // Limit our skew to a range of 75 degrees so it doesn't "over-skew"
  skewWithEasing = Math.min(Math.max(parseInt(skewWithEasing), -75), 75);

  // Ease between start and target values (translate)
  translateWithEasing = lerp(
    translateWithEasing,
    translateTarget,
    translateEasingFactor
  );

  el.style.transform = `translateX(${translateWithEasing}px)`;

  //   el.style.transform = `
  //   translateX(${translateWithEasing}px)
  //   skewX(${skewWithEasing}deg)
  // `;

  // RAF
  window.requestAnimationFrame(animateMe);
}

window.requestAnimationFrame(animateMe);
