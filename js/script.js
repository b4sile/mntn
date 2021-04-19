const burger = document.querySelector('.burger');
const menu = document.querySelector('.header__nav');
const scrollsBtns = document.querySelectorAll('.scrolls__btn');
const sections = document.querySelectorAll('.section');
const mainScroll = document.querySelector('.main__scroll');
const scrollLine = document.querySelector('.scrolls__line');
scrollLine.style.height = `${100 / scrollsBtns.length}%`;
scrollLine.style.top = `-${100 / scrollsBtns.length}%`;

const getPosition = (element) => {
  let yPosition = 0;
  while (element) {
    yPosition += element.offsetTop - element.scrollTop + element.clientTop;
    element = element.offsetParent;
  }
  return yPosition;
};

const distanceToSections = Array.from(sections).map(getPosition);
let prevDistance = null;

const onClickButtonScroll = (btn, ind) => {
  btn.addEventListener('click', () => {
    scrollsBtns.forEach((btn) => btn.classList.remove('scrolls__btn--active'));
    btn.classList.add('scrolls__btn--active');
    sections[ind].scrollIntoView({ behavior: 'smooth' });
  });
};

const onScrollWindow = () => {
  for (let i = 1, length = distanceToSections.length; i < length; i++) {
    if (
      distanceToSections[i - 1] <= pageYOffset &&
      pageYOffset < distanceToSections[i] &&
      distanceToSections[i - 1] !== prevDistance
    ) {
      prevDistance = distanceToSections[i - 1];
      scrollsBtns.forEach((btn) =>
        btn.classList.remove('scrolls__btn--active')
      );
      scrollsBtns[i - 1].classList.add('scrolls__btn--active');
      scrollLine.style.top = `${(100 / scrollsBtns.length) * (i - 1)}%`;
      scrollLine.style.height = `${100 / scrollsBtns.length}%`;
    } else if (
      distanceToSections[length - 1] <= pageYOffset &&
      distanceToSections[length - 1] !== prevDistance
    ) {
      prevDistance = distanceToSections[length - 1];
      scrollsBtns.forEach((btn) =>
        btn.classList.remove('scrolls__btn--active')
      );
      scrollsBtns[length - 1].classList.add('scrolls__btn--active');
      scrollLine.style.top = `${(100 / scrollsBtns.length) * (length - 1)}%`;
      scrollLine.style.height = `${100 / scrollsBtns.length}%`;
    }
  }
};

window.addEventListener('scroll', onScrollWindow);

onClickButtonScroll(mainScroll, 1);

scrollsBtns.forEach((btn, ind) => {
  onClickButtonScroll(btn, ind);
});

burger.addEventListener('click', () => {
  menu.classList.toggle('header__nav--active');
  burger.classList.toggle('burger--active');
  document.body.classList.toggle('lock');
});
