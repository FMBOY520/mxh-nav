// 获取导航栏元素
const header = document.querySelector('.header-nav')

// 监听滚动事件
window.onscroll = function () {
  // console.log(window.scrollY);
  // 滚动超过100px时，添加浮动效果
  if (window.scrollY > 40) {
    header.classList.add('fixed');
  } else {
    header.classList.remove('fixed');
  }

  // 滚动超过 200px 时显示按钮
  if (window.scrollY > 200) {
    backToTopBtn.style.display = "flex";
  } else {
    backToTopBtn.style.display = "none";
  }
}