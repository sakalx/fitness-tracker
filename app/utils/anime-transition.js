const transition = (callBackFn, {
                      from = 0,
                      to = 1,
                      duration = 1,
                      back = false,
                    } = {}) => {

  duration = duration * 1000;
  const calibration = back ? 2 : 1;

  const slicesAnimation = duration / (100 / calibration);
  const intervalTime = duration / slicesAnimation;
  const intervalValue = (to - from) / (duration / 100);
  const stopAnimation = duration + intervalTime * calibration;

  let reverseAnimation = false;
  let timerId = false;

  const normalize = num => Number(num.toFixed(2));

  const reverse = () => {
    if (reverseAnimation) {
      from -= intervalValue;
    } else {
      from += intervalValue;
      reverseAnimation = (normalize(from) === to);
    }
  };

  (function animation() {
    timerId = setTimeout(() => {
      animation();
      back ? reverse() : from += intervalValue;
      callBackFn(normalize(from));
    }, intervalTime);
  })();

  setTimeout(() => clearInterval(timerId), stopAnimation);
};

export default transition;