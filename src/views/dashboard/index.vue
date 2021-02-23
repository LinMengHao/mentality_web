<template xmlns:https="http://www.w3.org/1999/xhtml">
  <div class="dashboard-container" style="background-image: url('https://dormitory-lmh.oss-cn-beijing.aliyuncs.com/2020/11/30/f818d7d8e3ee4ea2911415c5280425a5file.png')">
    <div class="dashboard-text">欢迎: {{ name }}使用</div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: '益起行心理教育',
    computed: {
      ...mapGetters([
        'name'
      ])
    }
  }
</script>

<style lang="scss" scoped>
  .dashboard {
    &-container {
      margin: 30px;
    }
    &-text {
      font-size: 30px;
      line-height: 46px;
    }
  }
</style>
