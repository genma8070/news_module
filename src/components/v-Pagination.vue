<script>
  export default {
    data () {
      return {
        currentPage: 1, // 現在のページ
        perPage: 10, // 1ページの最大表示数
	items: [] // jsonで入ってくることを想定
      }
    },
    mounted() {
    　　// 初期表示
     axios.get(url)
      .then(res => this.items = res.data)
      .catch(err => err.response)
    },
    methods: {
    //現在のページを決める
      clickCallback(pageNum) {
       this.currentPage = Number(pageNum)
      }
    },
    computed: {
     //必要なデータだけ表示
     getList() {
      const current = this.currentPage * this.perPage
      const start = current - this.perPage
      return this.items.slice(start, current)
     },
     //総ページ数を決める
     getPageCount() {
      return Math.ceil(this.items.length / this.perPage)
     }
    }