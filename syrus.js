const countdown = () => {
  const countDate = new Date("March 10, 2023 00:00:00").getTime();
  const now = new Date();
  const gap = countDate - now;

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const textDay = Math.floor(gap / day);
  const textHour = Math.floor((gap % day) / hour);
  const textMinute = Math.floor((gap % hour) / minute);
  const textSecond = Math.floor((gap % minute) / second);

  document.querySelector("#days").innerText = textDay;
  document.querySelector("#hours").innerText = textHour;
  document.querySelector("#minutes").innerText = textMinute;
  document.querySelector("#seconds").innerText = textSecond;
};

setInterval(countdown, 1000);

const slider = document.querySelector(".items");
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener("mousedown", (e) => {
  isDown = true;
  slider.classList.add("active");
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});
slider.addEventListener("mouseleave", () => {
  isDown = false;
  slider.classList.remove("active");
});
slider.addEventListener("mouseup", () => {
  isDown = false;
  slider.classList.remove("active");
});
slider.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 3; //scroll-fast
  slider.scrollLeft = scrollLeft - walk;
});

document.addEventListener("alpine:init", () => {
  Alpine.store("accordion", {
    tab: 0,
  });

  Alpine.data("accordion", (idx) => ({
    init() {
      this.idx = idx;
    },
    idx: -1,
    handleClick() {
      this.$store.accordion.tab =
        this.$store.accordion.tab === this.idx ? 0 : this.idx;
    },
    handleRotate() {
      return this.$store.accordion.tab === this.idx ? "rotate-180" : "";
    },
    handleToggle() {
      return this.$store.accordion.tab === this.idx
        ? `max-height: ${this.$refs.tab.scrollHeight}px`
        : "";
    },
  }));
});
