// 获取回到顶部按钮元素
const backToTopBtn = document.querySelector('.back-to-top')

// 点击按钮回到顶部
backToTopBtn.onclick = function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth" // 平滑滚动
  });
};