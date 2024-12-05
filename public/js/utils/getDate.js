// 获取当前时间方法
export function getDate() {
  // 获取当前时间
  const now = new Date();

  // 获取当前 年
  const year = String(now.getFullYear());
  // 获取当前 月
  const month = String(now.getMonth() + 1).padStart(2, '0');
  // 获取当前 日
  const date = String(now.getDate()).padStart(2, '0');

  // 获取当前 时
  const hours = String(now.getHours()).padStart(2, '0');
  // 获取当前 分
  const minutes = String(now.getMinutes()).padStart(2, '0');
  // 获取当前 秒
  const seconds = String(now.getSeconds()).padStart(2, '0');

  // 获取当前 星期
  const daysOfWeek = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  const dayOfWeek = daysOfWeek[now.getDay()];

  return {
    year,
    month,
    date,
    hours,
    minutes,
    seconds,
    dayOfWeek
  }
}