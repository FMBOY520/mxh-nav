const app = new Vue({
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
    ],

    // 模块内容
    // 格式：module_content: [{ title: '', content: [{ name: '', logo: '', url: '' },] }],
    module_content: []
  },


  methods: {

    // 获取模块内容
    getModuleContent() {
      axios({
        // 请求地址可以是json文件，也可以是后端接口（后端管理端可以自己编写），例：http://localhost:8080/mxh-nav/list
        // url: 'http://localhost:8080/mxh-nav/list'
        url: './public/json/module_content.json'
      }).then(res => {
        this.module_content = res.data.data
      })
    },


    // 更新日期
    updateDate() {
      const now = new Date();
      const daysOfWeek = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
      const dayOfWeek = daysOfWeek[now.getDay()];
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const date = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');

      // 返回时间带秒
      // const currentTime = `${hours}:${minutes}:${seconds}`
      // 返回时间不带秒
      const currentTime = `${hours}:${minutes}`

      this.date_1 = currentTime
      const currentDate = `${year}年${month}月${date}日 ${dayOfWeek}`
      this.date_2 = currentDate
    },
    // 获取-励志短句
    getSentence() {
      axios({
        // 喵星汇开发接口地址：https://mxh-open.apifox.cn
        url: 'https://hmajax.itheima.net/api/ambition'
      }).then(res => {
        this.date_3 = res.data.data
      })
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
    // 自动选中输入框方法
    inpOn() {
      const inp = document.querySelector('.main-search .search_frame .ss1')
      inp.focus()
    }
  },


  created() {
    this.getSentence()

    // 获取模块内容
    this.getModuleContent()
  },
  mounted() {
    this.updateDate();
    // 每秒更新
    this.interval = setInterval(this.updateDate, 1000);
    // 进页面自动选中输入框
    this.inpOn()
  },
  beforeDestroy() {
    // 清理定时器
    clearInterval(this.interval);
  }
})