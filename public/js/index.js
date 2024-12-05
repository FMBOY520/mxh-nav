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
    search_url: 'https://www.baidu.com/s',
    search_name: 'wd',
    search_placeholder: '百度一下',
    search_value: '',
    search_list: [
      { title: '百度', url: 'https://www.baidu.com/s', placeholder: '百度一下', name: 'wd' },
      { title: 'Bing', url: 'https://cn.bing.com/search', placeholder: '微软Bing搜索', name: 'q' },
      { title: '哔哩哔哩', url: 'https://search.bilibili.com/all', placeholder: 'blbl搜索', name: 'keyword' },
      { title: 'CSDN', url: 'https://so.csdn.net/so/search', placeholder: 'CSDN', name: 'q' },
    ],

    // 模块内容
    // 格式：module_content: [{ title: '', content: [{ name: '', logo: '', url: '' },] }],
    module_content: []
  },


  methods: {
    // 更新时间方法
    updateDate() {
      this.date_1 = `${getDate().hours}:${getDate().minutes}`
      this.date_2 = `${getDate().year}年${getDate().month}月${getDate().date}日 ${getDate().dayOfWeek}`
    },

    // 获取模块内容
    getModuleContent() {
      // 请求地址可以是json文件，也可以是后端接口（后端管理端可以自己编写），例：http://localhost:8080/mxh-nav/list
      axios({ url: './public/json/module_content.json' }).then(res => { this.module_content = res.data.data })
    },

    // 搜索列表切换方法
    searchListBtn(e) {
      if (e.target.tagName === 'A') {
        const data = this.search_list.filter(item => item.title === e.target.innerText)
        const { url, placeholder, name } = data[0]
        this.search_url = url
        this.search_placeholder = placeholder
        this.search_name = name
        document.querySelector('.list-btn-on').classList.remove('list-btn-on')
        e.target.classList.add('list-btn-on')
        this.inpOn()
      }
    },
    // 判断搜索方法
    searchBtn(e) {
      const value = this.search_value.trim()
      if (value) {
        this.search_value = value
      } else {
        this.search_value = ''
        e.preventDefault()
      }
    },
  },


  created() {
    // 获取-励志短句
    // 喵星汇开发接口地址：https://mxh-open.apifox.cn
    axios({ url: 'https://hmajax.itheima.net/api/ambition' }).then(res => { this.date_3 = res.data.data })

    // 获取模块内容
    this.getModuleContent()
  },
  mounted() {
    // 更新时间
    this.updateDate()
    // 每秒更新时间
    this.interval = setInterval(this.updateDate, 1000)

    // 进页面自动选中输入框
    document.querySelector('.main-search .search_frame .ss1').focus()
  },
  beforeDestroy() {
    // 清理定时器
    clearInterval(this.interval);
  }
})


// 获取导航栏元素
const header = document.querySelector('.header-nav')
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
const backToTopBtn = document.querySelector('.back-to-top')
// 点击按钮回到顶部
backToTopBtn.onclick = function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth" // 平滑滚动
  });
};