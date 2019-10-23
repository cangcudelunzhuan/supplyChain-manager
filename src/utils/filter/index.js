
/**
 * @class format 数据过滤类
 */
class format {
  /**
   * @method formatDateTime 时间戳转年月日时分秒格式
   * @param dates 时间戳
   * @return xxxx-xx-xx xx:xx:xx
   */
  formatDateTime(dates) {
    let date = new Date(dates);
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    let d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    let h = date.getHours();
    let minute = date.getMinutes();
    minute = minute < 10 ? ('0' + minute) : minute;
    let s = date.getSeconds();
    s = s < 10 ? ('0' + s) : s;
    return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + s;
  }
  /**
   * @method formatDate 年月日
   * @param dates 时间戳
   * @return xxxx-xx-xx
   */
  formatDate(dates) {
    let date = new Date(dates);
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    let d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    return y + '-' + m + '-' + d;
  }
  /**
   * @method formatPoint 小数点精度计算
   * @param f 被计算数
   * @param digit 精确到小数点后几位
   * @return xx.xxxx
   */
  formatPoint(f, digit) {
    if (f === 'NaN') return '--';
    let d = digit || 2;
    let m = Math.pow(10, d);
    let res = Math.round(f * m, 10) / m;
    // return res.toFixed(d);
    return res;
  }

  /**
   * @method formatThousands 千位符格式化
   * @param num 格式化字段
   * @return 123 456 789
   */
  formatThousands(num) {
    if (!num && num !== 0) {
      return '';
    }
    let res = num.toString().replace(/\d+/, function (n) { // 先提取整数部分
      n = `${n - 0}`.substr(0, 15); // 整数最大15位
      return n.replace(/(\d)(?=(\d{3})+$)/g, function ($1) {
        return $1 + ',';
      });
    });
    let s = res.indexOf('.'); // 计算小数点位置 取小数点后两位
    return s===-1?res:res.substr(0, s+3);
  }

  /**
   * @method formatBankNumber 4位分割
   * @param value 格式化字段
   * @return 1234 5678 9000
   */
  formatBankNumber(value) {
    if (!value){
      return '';
    }
    return `${value}`.replace(/\s/g, '').replace(/[^\d]/g, '').substr(0, 25).replace(/(\d{4})(?=\d)/g, '$1 ');
  }
}
export default new format();