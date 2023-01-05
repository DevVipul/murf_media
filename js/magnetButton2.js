var magnets = document.querySelectorAll(".magnetic");
var strength = 100;
var strength2 = 50;

magnets.forEach((magnet) => {
  magnet.addEventListener("mousemove", moveMagnet);
  magnet.addEventListener("mouseout", function (event) {
    gsap.to(
      [event.currentTarget, event.currentTarget.querySelector(".shapka")],
      {
        x: 0,
        y: 0,
        ease: Elastic.easeOut,
        duration: 1.5,
      }
    );
  });
});

function moveMagnet(event) {
  var magnetButton = event.currentTarget;
  var bounding = magnetButton.getBoundingClientRect();
  var shapka = magnetButton.querySelector(".shapka");

  //   console.log(magnetButton, bounding, shapka);

  gsap.to(magnetButton, {
    x:
      ((event.clientX - bounding.left) / magnetButton.offsetWidth - 0.5) *
      strength,
    y:
      ((event.clientY - bounding.top) / magnetButton.offsetHeight - 0.5) *
      strength,
    ease: Power2.easeOut,
    duration: 1,
  });

  gsap.to(shapka, {
    x:
      ((event.clientX - bounding.left) / magnetButton.offsetWidth - 0.5) *
      strength2,
    y:
      ((event.clientY - bounding.top) / magnetButton.offsetHeight - 0.5) *
      strength2,
    ease: Power2.easeOut,
    duration: 1,
  });

  //magnetButton.style.transform = 'translate(' + (((( event.clientX - bounding.left)/(magnetButton.offsetWidth))) - 0.5) * strength + 'px,'+ (((( event.clientY - bounding.top)/(magnetButton.offsetHeight))) - 0.5) * strength + 'px)';
}
