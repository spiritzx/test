/*
 * @Descripttion: 小明喝牛奶，一瓶牛奶5元 ，两个空瓶子加1元可以换一瓶,喝N瓶最少花多少钱
 * @Author: tom-z(spirit108@foxmail.com)
 * @Date: 2020-09-18 09:13:02
 * @LastEditors: tom-z(spirit108@foxmail.com)
 * @LastEditTime: 2020-09-18 10:25:02
 */
/*
  * n<Number>: 总瓶数
 */
function getMilkCostFn(t) {
  let total = t;
  if (total < 2) {
    return t * 5;
  }
  let OriginalNum = parseInt(t / 2) + 1;
  let saleNum = 0;

  function getSaleNum(n) {
    let _saleNum = parseInt(n / 2);
    saleNum += _saleNum;
    if (_saleNum >= 2) {
      getSaleNum(_saleNum)
    } else {
      let remain = total - OriginalNum - saleNum;
      if (remain < 0) {
        saleNum = saleNum + remain;
      } else {
        OriginalNum = OriginalNum + remain;
      }
      return;
    }
  }
  getSaleNum(OriginalNum);
  console.log("原价数量:" + OriginalNum)
  console.log("低价数量:" + saleNum)
  return OriginalNum * 5 + saleNum * 1;
}

console.log(getMilkCostFn(10))