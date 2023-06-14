// vue源码中的一个函数
/**
 * 从x 到 y, 数据是否发生了变化
 */
export function hasChanged(x, y) {
  if (x === y) {
    return x === 0 && 1 / x !== 1 / y;
    // 排除 +0 -0
  } else {
    return x === x || y === y;
    // 排除NaN NaN
  }
}
