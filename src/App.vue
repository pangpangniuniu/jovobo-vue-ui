<template>
  <div id="app">
  	<com-alert
      v-if="alertManager.show" 
      :type="alertManager.type"
      :title="alertManager.title"
    ></com-alert>
  </div>
</template>
<script>
export default {
  name: 'app',
  data () {
    return {
		  alertManager: {
	      show: true, // 是否显示
	      type: 'success', // 弹框的类型，包括success(成功，title为黑色)和fail(失败，title为红色)
	      title: '' // 弹框的标题
	    }
    }
  }
}
</script>

<style scoped>
</style>
