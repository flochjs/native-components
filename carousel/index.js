const CLASSNAME = {
  carousel: 'carousel',
  infiniteCarousel: 'carousel--infinite',
  item: 'carousel__item',
  activeItem: 'carousel__item--active',
  indicator: 'carousel__indicator',
  activeIndicator: 'carousel__indicator--active',
  arrow: 'carousel__arrow',
  disabledArrow: 'carousel__arrow--disabled',
  onLeftItem: 'carousel__item--left',
  onRightItem: 'carousel__item--right',
};

const DATA = {
  infinite: 'data-infinite',
  interval: 'data-interval',
};

const useState = (state = null) => [
  () => state,
  (value) => void (state = value),
];
 
const useCarousel = (length, defaultIndex = 0) => {
  const [ getActive, setActive ] = useState(defaultIndex);

  const getInfos = (index) => ({
    isFirst: index === 0,
    isLast: index === length - 1,
    index,
  })

  const getActiveInfos = () => getInfos(getActive());

  const getPrev = () => {
    const { isFirst, index } = getActiveInfos();
    return isFirst ? length - 1 : index - 1;
  }

  const getNext = () => {
    const { isLast, index } = getActiveInfos();
    return isLast ? 0 : index + 1;
  }

  return {
    getActive,
    setActive,
    getActiveInfos,
    getInfos,
    getNext,
    getPrev,
  };
};

const useInterval = (handler, delay) => {
  let id;

  const set = () => void (id = setInterval(handler, delay));

  const reset = () => {
    if (id) {
      clearInterval(id);
      set();
    }
  };

  const clear = () => {
    if (id)
      clearInterval(id);
  }

  return [
    set,
    reset,
    clear,
  ];
};

const toggleIndicators = (indicators, prevIndicatorIndex, nextIndicatorIndex) => {
  indicators[prevIndicatorIndex].classList.remove(CLASSNAME.activeIndicator);
  indicators[nextIndicatorIndex].classList.add(CLASSNAME.activeIndicator);
}

const activeItem = (item) => {
  item.classList.add(CLASSNAME.activeItem);
  item.setAttribute('aria-hidden', false);
};

const toggleItems = (items, prevItemIndex, nextItemIndex) => {
  items[prevItemIndex].classList.remove(CLASSNAME.activeItem);
  items[prevItemIndex].setAttribute('aria-hidden', true);
  activeItem(items[nextItemIndex]);
}

const disableArrow = (arrow) => {
  arrow.setAttribute('disabled', true);
  arrow.classList.add(CLASSNAME.disabledArrow);
};

const enableArrow = (arrow) => {
  arrow.removeAttribute('disabled');
  arrow.classList.remove(CLASSNAME.disabledArrow);
};

const handleArrowToggling = (wasFirst, wasLast, willBeFirst, willBeLast, leftArrow, rightArrow) => {
  if (wasFirst)
    enableArrow(leftArrow);
  else if (wasLast)
    enableArrow(rightArrow);

  if (willBeFirst)
    disableArrow(leftArrow);
  else if (willBeLast)
    disableArrow(rightArrow);
};

const moveItemsLeft = (l, r, items) => {
  for (let i = l ; i < r ; ++i) {
    items[i].classList.add(CLASSNAME.onLeftItem);
    items[i].classList.remove(CLASSNAME.onRightItem);
  }
};

const moveItemsRight = (l, r, items) => {
  for (let i = r ; i > l ; --i) {
    items[i].classList.add(CLASSNAME.onRightItem);
    items[i].classList.remove(CLASSNAME.onLeftItem);
  }
};

const toggle = (setActive, activeIndex, newActiveIndex, indexInfos, isInfinite, items, indicators, leftArrow, rightArrow) => {
  if (!isInfinite)
    handleArrowToggling(...indexInfos, leftArrow, rightArrow);
  toggleIndicators(indicators, activeIndex, newActiveIndex);
  toggleItems(items, activeIndex, newActiveIndex);
  setActive(newActiveIndex);
};

const goTo = (isInfinite, getActive, setActive, getActiveInfos, getInfos, items, indicators, leftArrow, rightArrow, getTo) => () => {
  const activeIndex = getActive();
  const newActiveIndex = getTo();

  if (activeIndex === newActiveIndex) return;

  const { isFirst: wasFirst, isLast: wasLast } = getActiveInfos();
  const { isFirst: willBeFirst, isLast: willBeLast} = getInfos(newActiveIndex);

  toggle(setActive, activeIndex, newActiveIndex, [wasFirst, wasLast, willBeFirst, willBeLast], isInfinite, items, indicators, leftArrow, rightArrow);

  if (activeIndex < newActiveIndex)
    moveItemsLeft(activeIndex, newActiveIndex, items);
  else
    moveItemsRight(newActiveIndex, activeIndex, items);
};

const handleCycling = (getActive, items, makeCycle) => () => {
  const activeIndex = getActive();
  if (!items[activeIndex].matches(':hover'))
    makeCycle();
};

const handleCarouselControls = (isInfinite, interval, resetInterval, makeCycle) => () => {
  if (isInfinite && interval)
    resetInterval();
  makeCycle();
};

const carousels = document.getElementsByClassName(CLASSNAME.carousel);

for (const carousel of carousels) {
  const isInfinite = !!JSON.parse(carousel.getAttribute(DATA.infinite));
  const interval = parseInt(carousel.getAttribute(DATA.interval), 10);

  const items = carousel.getElementsByClassName(CLASSNAME.item);
  const [ leftArrow, rightArrow ] = carousel.getElementsByClassName(CLASSNAME.arrow);
  const indicators = carousel.getElementsByClassName(CLASSNAME.indicator);

  const defaultIndex = 0; 

  const {
    getActive,
    setActive,
    getActiveInfos,
    getInfos,
    getNext,
    getPrev,
  } = useCarousel(items.length, defaultIndex);

  activeItem(items[defaultIndex]);
  indicators[defaultIndex].classList.add(CLASSNAME.activeIndicator);
  if (!isInfinite)
    disableArrow(leftArrow);

  const goToParams = [isInfinite, getActive, setActive, getActiveInfos, getInfos, items, indicators, leftArrow, rightArrow];

  const [ _setInterval, resetInterval ] = useInterval(handleCycling(getActive, items, goTo(...goToParams, getNext)), interval);

  leftArrow.addEventListener('click', handleCarouselControls(isInfinite, interval, resetInterval, goTo(...goToParams, getPrev)))
  rightArrow.addEventListener('click', handleCarouselControls(isInfinite, interval, resetInterval, goTo(...goToParams, getNext)))
  for (let i = 0 ; i < indicators.length ; ++i)
    indicators[i].addEventListener('click', handleCarouselControls(isInfinite, interval, resetInterval, goTo(...goToParams, () => i)));


  if (isInfinite && interval)
    _setInterval();
}
