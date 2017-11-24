<template>
  <ul id="app" class="app">
    <li>
      <p class="title">弹框组件</p>
      <span @click="showAlert" style="display:block;">显示弹框</span>
      <ui-alert
        v-if="alertManager.show" 
        :type="alertManager.type"
        :title="alertManager.title"
      ></ui-alert>
    </li>
    <li>
      <p class="title">对话框组件</p>
      <span @click="showDialog" style="display:block;">显示对话框</span>
      <ui-dialog
        v-if="dialogManager.show" 
        :title="dialogManager.title" 
        @chooseYes="chooseYes" 
        @chooseNo="chooseNo">
      </ui-dialog>
    </li>
    <li>
      <p class="title">分页组件</p>
      <ui-page
        style="width:600px;"
        :curPage="pageData.curPage"
        :totalCount="pageData.totalCount"
        :totalPage="pageData.totalPage"
        @getPage="getPage">
      </ui-page>
    </li>
    <li>
      <p class="title">输入框组件</p>
      <ui-input 
        placeholder="请输入……"
        style="width:250px;"
        :title="input.title"
        :value="input.value"
        @change="changeInput">
      </ui-input>
      <p>输入的值是：{{input.value}}</p>
    </li>
    <li>
      <p class="title">下拉列表组件</p>
      <ui-select
        style="width:250px;"
        :title="select.title"
        :options="select.options"
        :selected-option="select.selectedOption"
        @change="changeSelect">
      </ui-select>
      <p>选择的项是：{{select.selectedOption.name}}</p>
    </li>
    <li>
      <p class="title">树状列表组件</p>
      <ui-tree-select
        style="width:273px;"
        :treeData="treeData"
        :selected-option="selectedOption"
        @change="selectTreeData">
      </ui-tree-select>
      <p>选择的项是：{{selectedOption.value}}</p>
    </li>
    <li>
      <p class="title">表格组件</p>
      <ui-table
        class="com-table"
        :update="tableData.update"
        :needCheck="tableData.needCheck"
        :needBorder="tableData.needBorder"
        :tableHead="tableData.headList"
        :tableData="tableData.dataList"
        @getIndex="getIndex"
        @operate="operate"
        @checkedIndex="checkedIndex">
      </ui-table>
    </li>
  </ul>
</template>
<script>
  export default {
    name: 'app',
    data () {
      return {
        alertManager: {
          show: false, // 是否显示
          type: 'success', // 弹框的类型，包括success(成功，title为黑色)和fail(失败，title为红色)
          title: '测试的对话框，2s后自动消失' // 弹框的标题
        },
        dialogManager: {
          show: false, // 是否显示
          title: '测试的对话框' // 对话框的标题
        },
        pageData: {
          curPage: 1,
          totalCount: 99,
          totalPage: 10
        },
        input: {
          title: '输入框',
          value: '初始值是……'
        },
        select: {
          title: '下拉框',
          options: [
            {value: 1, name: '第一个值'},
            {value: 2, name: '第二个值'},
            {value: 3, name: '第三个值'},
            {value: 4, name: '第四个值'},
            {value: 5, name: '第五个值'},
            {value: 6, name: '第六个值'},
          ],
          selectedOption: {
            value: 1, name: '第一个值'
          }
        },
        treeData: {
          name: '测试平台',
          isFolder: true,
          showChild: false,
          isTop: true,
          check: false,
          child: [{
            name: '测试三部',
            check: false,
            isFolder: false
          }, {
            name: '测试四部',
            check: false,
            isFolder: false
          }, {
            name: '测试五部',
            check: false,
            isFolder: false
          }, {
            name:'测试二部',
            check: false,
            isFolder: false
          }, {
            name:'测试一部',
            check: false,
            showChild: false,
            isFolder: true,
            child: [{
              name: '测试测试1',
              check: false,
              showChild: false,
              isFolder: true,
              child: [{
                name: '测试测试2',
                check: false,
                showChild: false,
                isFolder: true,
                child:[{
                  name: '测试2-1',
                  check: false,
                  isFolder: false
                }]
              }]
            }, {
              name: '测试测试1的',
              check: false,
              isFolder: false
            }]
          }]
        },
        selectedOption: {
          value: '测试三部'
        },
        tableData: {
          update: false,
          needBorder: false,
          needCheck: false,
          // 要传给子组件的表格字段值
          dataList: [],
          // 普通订单状态的字段
          headList: [
            {name: '字段1', field: 'head1', width: '20%'
            }, {name: '字段2', field: 'head2', width: '20%'
            }, {name: '字段3', field: 'head3', width: '20%'
            }, {name: '字段4', field: 'head4', width: '20%'
            }, {name: '字段5', field: 'head5', width: '20%'
            }
          ]
        },
      }
    },
    methods: {
      showAlert () {
        this.alertManager.show = true
        let that = this
        setTimeout(function () {
          that.alertManager.show = false
        }, 2000)
      },
      showDialog () {
        this.dialogManager.show = true
      },
      chooseYes () {
        this.dialogManager.show = false
      },
      chooseNo () {
        this.dialogManager.show = false
      },
      getPage (data) {
        this.pageData.curPage = data
      },
      changeInput (data) {
        this.input.value = data
      },
      changeSelect (data) {
        this.select.selectedOption = data
      },
      selectTreeData (data) {
        this.selectedOption = {
          value: data.name
        }
      },
      operate (data) {
        alert(data)
      },
      checkedIndex (data) {
        alert(data)
      },
      getIndex (data) {
        alert(data)
      }
    }
  }
</script>
<style lang="less" scoped>
  ul.app{
    width:60%;
    margin-left: 20%;
    height: 100%;
    background-color: #c9dff3;
    font-size: 13px!important;
    li{
      width:80%;
      margin-left: 10%;
      border-bottom:5px solid #fff;
      padding-bottom: 30px;
      .title{
        font-size: 15px!important;
        height:40px;
        line-height: 40px;
      }
    }
  }
</style>
