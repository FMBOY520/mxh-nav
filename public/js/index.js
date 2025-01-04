import '../../node_modules/vue@2.6.10/vue.min.js'
import '../../node_modules/axios@1.6.5/axios.min.js'

// 获取当前时间
import { getDate } from './utils/getDate.js'

new Vue({
  el: '#app',
  data: {
    // 日期
    date_1: '00:00:00',
    date_2: '0000年00月00日 星期日',
    date_3: '-',

    // 搜索
    search: {
      url: 'https://www.baidu.com/s',
      name: 'wd',
      placeholder: '百度一下',
      value: '',
      list: [
        { title: '百度', url: 'https://www.baidu.com/s', placeholder: '百度一下', name: 'wd' },
        { title: 'Bing', url: 'https://cn.bing.com/search', placeholder: '微软Bing搜索', name: 'q' },
        { title: '哔哩哔哩', url: 'https://search.bilibili.com/all', placeholder: 'blbl搜索', name: 'keyword' },
        { title: 'CSDN', url: 'https://so.csdn.net/so/search', placeholder: 'CSDN', name: 'q' },
      ],
    },

    // 模块内容
    // 格式：module_content: [{ title: '', content: [{ name: '', logo: '', url: '' },] }],
    module_content: [],

    footer: {
      // 内容
      content: '欢迎来到喵星汇，一个用于收藏个人常用网站的导航，此网站用于分享一些开发类、娱乐类、音乐类和影视类等网站，也会分享一些开源项目。此项目的开源地址：<a href="https://gitee.com/FMBOY/mxh-nav" target="_blank" style="color: #c6c9cf;">点我</a>',
      // 链接
      link: [
        { title: 'QQ群', img: './public/icon/QQ.svg', url: 'https://qm.qq.com/cgi-bin/qm/qr?k=EcLOPfOlyracU7D30tuxcZT5va5oMsq5&jump_from=webapi&authKey=ir7Xc3FeaPDeuBO1X7o2UEuOz7dERRQWd548kM3JYFALR7HCob5ELEH9imuWBKJ3' },
        { title: '邮箱', img: './public/icon/Email.svg', url: 'mailto:fmboy520@qq.com' },
      ],
      // 二维码
      QR: [
        { title: '公众号', url: './public/img/QR/FMBOY-GongZhongHao.jpg' },
        { title: '微信赞赏', url: './public/img/QR/FMBOY-ZanShangMa.jpg' },
      ],
    },

    // 网站版权
    copyright: 'Copyright © 2024-2025 <a href="/">喵星汇</a>',
    // 网站版本
    version: '1.1.0'
  },

  created() {
    // 更新时间，每秒更新时间
    this.updateDate()
    this.interval = setInterval(this.updateDate, 1000)
    // 获取-励志短句  喵星汇开发接口地址：https://mxh-open.apifox.cn
    axios({ url: 'https://hmajax.itheima.net/api/ambition' }).then(res => { this.date_3 = res.data.data })
    // 获取模块内容
    this.getModuleContent()
  },
  mounted() {
    // 导航栏悬浮功能
    this.navFixed()
    // 进页面自动选中输入框
    this.inpOn()
    // 给搜索列表添加默认高亮（默认第一个高亮）
    document.querySelector('.main-search .search_nav').childNodes[0].classList.add('list-btn-on')
  },
  beforeDestroy() {
    // 清理定时器
    clearInterval(this.interval);
  },

  methods: {
    // 更新时间方法
    updateDate() {
      this.date_1 = `${getDate().hours}:${getDate().minutes}`
      this.date_2 = `${getDate().year}年${getDate().month}月${getDate().date}日 ${getDate().dayOfWeek}`
    },

    // 判断搜索方法
    searchBtn(e) {
      if (this.search.value.trim()) {
        this.search.value = this.search.value.trim()
      } else {
        alert('输入内容不能为空')
        this.search.value = ''
        e.preventDefault()
      }
    },
    // 搜索列表切换方法
    searchListBtn(e) {
      if (e.target.tagName === 'A') {
        const data = this.search.list.filter(item => item.title === e.target.innerText)
        const { url, placeholder, name } = data[0]
        this.search.url = url
        this.search.placeholder = placeholder
        this.search.name = name
        this.inpOn()
        document.querySelector('.list-btn-on').classList.remove('list-btn-on')
        e.target.classList.add('list-btn-on')
      }
    },
    // 自动选中输入框方法
    inpOn() { document.querySelector('.main-search .search_frame .ss1').focus() },

    // 获取模块内容
    getModuleContent() {
      // 请求地址可以是json文件，也可以是后端接口（后端管理端可以自己编写），例：http://localhost:8080/mxh-nav/list
      axios.get('../../json/mxh-nav.json').then(res => {
        this.module_content = res.data.data
      })
    },

    // 导航栏悬浮功能
    navFixed() {
      // 获取导航栏元素
      const header = this.$refs.HeaderNav
      // 监听滚动事件
      window.onscroll = function () {
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
      // 获取回到顶部按钮元素
      const backToTopBtn = this.$refs.BackToTop
      // 点击按钮回到顶部
      backToTopBtn.onclick = function () {
        window.scrollTo({
          top: 0,
          behavior: "smooth" // 平滑滚动
        });
      }
    }
  }
})