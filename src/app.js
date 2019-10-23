// 全局控制console.log 是否输出
// const logDebug = process.env.NODE_ENV === 'production' ? false : true;
const logDebug = process.env.BUILD_TYPE || 'dev';
console.log = (function (oriLogFunc) {
  return function () {
    if (logDebug!=='prod') {
      oriLogFunc.apply(this, arguments);
    }
  };
})(console.log);

export const dva = {
  config: {
    onError(err) {
      err.preventDefault();
      console.error(err.message);
    },
  },
};

