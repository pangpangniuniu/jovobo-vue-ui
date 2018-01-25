<template>
  <ul id="app" class="app">
    <li style="z-index:99;">
      <p class="title">弹框组件</p>
      <span @click="showAlert1()" class="btn-blue" style="display:block;">显示弹框</span>（2s后自动消失）
      <ui-alert
        :autoHide="alertManager1.autoHide"
        :delayTime="alertManager1.delayTime"
        :alertData="alertManager1.alertData"
      ></ui-alert>
    </li>
    <li style="z-index:99;">
      <p class="title">弹框组件</p>
      <span @click="showAlert2()" class="btn-blue" style="display:block;">显示弹框</span>
      <ui-alert
        :autoHide="alertManager2.autoHide"
        :delayTime="alertManager2.delayTime"
        :alertData="alertManager2.alertData"
      ></ui-alert>
    </li>
    <li style="z-index:98;">
      <p class="title">对话框组件</p>
      <span @click="showDialog" class="btn-blue" style="display:block;">显示对话框</span>
      <ui-dialog
        :dialogManager="dialogManager" 
        @chooseYes="chooseYes" 
        @chooseNo="chooseNo">
      </ui-dialog>
    </li>
    <li style="z-index:97;">
      <p class="title">分页组件</p>
      <ui-page
        style="width:750px;"
        :curPage="pageData.curPage"
        :totalCount="pageData.totalCount"
        :totalPage="pageData.totalPage"
        :isJump="pageData.isJump"
        @getPage="getPage">
      </ui-page>
    </li>
    <li style="z-index:96;">
      <p class="title">输入框组件</p>
      <ui-input
        placeholder="不可用"
        style="width:250px;"
        :disabled="true"
        :title="input.title"
        :value="input.value1"
        @change="changeInput">
      </ui-input>
    </li>
    <li style="z-index:96;">
      <p class="title">输入框组件</p>
      <ui-input 
        placeholder="请输入"
        style="width:250px;"
        :title="input.title"
        :value="input.value2"
        @change="changeInput">
      </ui-input>
      <p class="result">输入的值是：{{input.value}}</p>
    </li>
    <li style="z-index:95;">
      <p class="title">下拉列表组件</p>
      <ui-select
        style="width:250px;z-index:100;"
        :title="selectManager.selectData.title"
        :options="selectManager.selectData.options"
        :selected-option="selectManager.selectedOption"
        @change="changeSelect">
      </ui-select>
      <p class="result">选择的项是：<span class="values">{{selectManager.selectedOption.name}}</span></p>
    </li>
    <li style="z-index:94;">
      <p class="title">树状列表组件</p>
      <ui-tree
        style="width:250px;z-index:999;"
        :treeData="treeManager.treeData"
        @selectItem="selectItem"
        @selectFather="selectFather">
      </ui-tree>
      <p class="result">选择树是：<span class="values">{{treeManager.clickedTree.name}}</span>，TA的父级树是：<span class="values">{{treeManager.clickedTreeFather.name}}</span></p>
    </li>
    <li style="z-index:93;">
      <p class="title">树状列表选择组件</p>
      <ui-tree-select
        style="width:400px;"
        :title="treeSelectManager.title"
        :treeData="treeSelectManager.treeData"
        :selected-option="selectManager.selectedTree"
        @change="selectTreeData"
        @selectFather="selectTreeFather">
      </ui-tree-select>
      <p class="result">选择树是：<span class="values">{{treeSelectManager.selectedTree.name}}</span>，TA的父级树是：<span class="values">{{treeSelectManager.selectTreeFather.name}}</span></p>
    </li>
    <li style="z-index:92;">
      <p class="title">表格组件</p>
      <ui-table
        style="min-height:200px;"
        class="table"
        :update="tableData.update"
        :checkType="tableData.checkType"
        :needBorder="tableData.needBorder"
        :tableHead="tableData.headList"
        :tableData="tableData.dataList"
        :extraStyle="tableData.extraStyle"
        @refresh="refreshTable"
        @dblclick="dblclick"
        @operate="operate"
        @getThisOpera="getThisOpera"
        @checkedIndexArr="checkedIndexArr">
        <span
          slot="ipt_1">
          <input type="text" value="修改">
        </span>
      </ui-table>
      <p class="result">勾选的是<span class="values">{{tableData.checkedIndexArr.join(',')}}</span></p>
    </li>
  </ul>
</template>
<script>
  export default {
    name: 'app',
    data () {
      return {
        alertManager1: {
          autoHide: true, // 自动关闭
          delayTime: 2000, // 2000ms后自动关闭
          alertData: {
            show: false, // 是否显示
            type: 'success', // 弹框的类型，包括success(成功，title为黑色)和fail(失败，title为红色)
            title: '测试的对话框，2s后自动消失' // 弹框的标题
          }
        },
        alertManager2: {
          autoHide: false, // 自动关闭
          alertData: {
            show: false, // 是否显示
            type: 'success', // 弹框的类型，包括success(成功，title为黑色)和fail(失败，title为红色)
            title: '测试的对话框，不会自动消失' // 弹框的标题
          }
        },
        dialogManager: {
          show: false, // 是否显示
          title: '测试的对话框' // 对话框的标题
        },
        pageData: {
          curPage: 1,
          totalCount: 99,
          totalPage: 10,
          isJump: true
        },
        input: {
          title: '输入框',
          value1: '',
          value2: '初始值'
        },
        selectManager: {
          selectData: {
            title: '下拉框',
            options: [
              {value: 1, name: '第一个值'},
              {value: 2, name: '第二个值'},
              {value: 3, name: '第三个值'},
              {value: 4, name: '第四个值'},
              {value: 5, name: '第五个值'},
              {value: 6, name: '第六个值'},
            ]
          },
          selectedOption: {
            value: 3, name: '第三个值'
          }
        },
        treeManager: {
          treeData: {
            name: '测试平台',
            id: '测试平台', 
            isFolder: true,
            showChild: false,
            isTop: true,
            check: false,
            child: [{
              name: '测试三部',
              id: '测试三部',
              check: false,
              isFolder: false
            }, {
              name: '测试四部',
              id: '测试四部',
              check: false,
              isFolder: false
            }, {
              name: '测试五部',
              id: '测试五部',
              check: false,
              isFolder: false
            }, {
              name:'测试二部',
              id:'测试二部',
              check: false,
              isFolder: false
            }, {
              name:'测试一部',
              id:'测试一部',
              check: false,
              showChild: false,
              isFolder: true,
              child: [{
                name: '测试测试1',
                id: '测试测试1',
                check: false,
                showChild: false,
                isFolder: true,
                child: [{
                  name: '测试测试2',
                  id: '测试测试2',
                  check: false,
                  showChild: false,
                  isFolder: true,
                  child:[{
                    name: '测试2-1',
                    id: '测试2-1',
                    check: false,
                    isFolder: false
                  }]
                }]
              }, {
                name: '测试测试1的',
                id: '测试测试1的',
                check: false,
                isFolder: false
              }]
            }]
          },
          clickedTree: {},
          clickedTreeFather: {}
        },
        treeSelectManager: {
          title: '树状下拉列表',
          treeData: {
            name: '测试平台',
            id: '测试平台', 
            isFolder: true,
            showChild: false,
            isTop: true,
            check: false,
            child: [{
              name: '测试三部',
              id: '测试三部',
              check: false,
              isFolder: false
            }, {
              name: '测试四部',
              id: '测试四部',
              check: false,
              isFolder: false
            }, {
              name: '测试五部',
              id: '测试五部',
              check: false,
              isFolder: false
            }, {
              name:'测试二部',
              id:'测试二部',
              check: false,
              isFolder: false
            }, {
              name:'测试一部',
              id:'测试一部',
              check: false,
              showChild: false,
              isFolder: true,
              child: [{
                name: '测试测试1',
                id: '测试测试1',
                check: false,
                showChild: false,
                isFolder: true,
                child: [{
                  name: '测试测试2',
                  id: '测试测试2',
                  check: false,
                  showChild: false,
                  isFolder: true,
                  child:[{
                    name: '测试2-1',
                    id: '测试2-1',
                    check: false,
                    isFolder: false
                  }]
                }]
              }, {
                name: '测试测试1的',
                id: '测试测试1的',
                check: false,
                isFolder: false
              }]
            }]
          },
          selectedTree: {
            name: '',
            id: ''
          },
          selectTreeFather: {
            name: '',
            id: ''
          }
        },
        tableData: {
          update: {
            value: false
          },
          needBorder: false,
          checkType: {
            checkSingle: true,
            checkAll: true
          },
          // 原始数据
          originData: [
            {
              list: [
                 {content: '111'
              }, {content: '111'
              }, {content: '111'
              }, {content: '111'
              }, {isTagA: true, content: [
                                   {name: '删除', color: 'red'
                                }, {name: '删除', color: 'red'}
                              ]
                            }
              ],
              check: false
            }, {
              list: [
                 {content: '222'
              }, {content: '222'
              }, {content: '222'
              }, {content: '222'
              }, {isTagIpt: true
              }],
              check: false
            }, {
              list: [
                {content: '333'}, {content: '333'}, {content: '333'}, {content: '333'}, {content: '333'}
              ],
              check: false
            }, {
              list: [
                {content: '444'}, {content: '444'}, {content: '444'}, {content: '444'}, {content: '444'}
              ],
              check: false
            }
          ],
          dataList: [], // 要传给子组件的表格字段值
          // 普通订单状态的字段
          headList: [
            {name: '字段1', field: 'head1', width: '15%'
            }, {name: '字段2', field: 'head2', width: '15%'
            }, {name: '字段3', field: 'head3', width: '15%'
            }, {name: '字段4', field: 'head4', width: '15%'
            }, {name: '字段5', field: 'head5', width: '15%'
            }
          ],
          checkedIndexArr: [],
          extraStyle: {
            head: 'height:50px;',
            body: {
              self: 'max-height:200px;',
              tr: {
                self: 'height:100px;',
                td: {
                  self: 'height:100px;',
                  a: '',
                  img: '',
                  span: ''
                }
              }
            }
          }
        }
      }
    },
    mounted () {
      this.tableData.dataList = JSON.parse(JSON.stringify(this.tableData.originData))
      console.log(this.tableData.dataList)
      // let that = this
      // setTimeout(function () {
      //   that.tableData.update.value = false
      // }, 2000)
    },
    methods: {
      showAlert1 () {
        this.alertManager1.alertData.show = true
      },
      showAlert2 () {
        this.alertManager2.alertData.show = true
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
        this.selectManager.selectedOption = data
      },
      selectItem (data) {
        console.log('selectItem', data)
        this.treeManager.clickedTree = data
      },
      selectFather (data) {
        console.log('selectFather', data)
        this.treeManager.clickedTreeFather = data
      },
      selectTreeData (data) {
        this.treeSelectManager.selectedTree = data
      },
      selectTreeFather (data) {
        this.treeSelectManager.selectTreeFather = data
      },
      operate (data) {
        alert(JSON.stringify(data))
      },
      checkedIndex (data) {
        alert(data)
      },
      dblclick (data) {
        alert('双击了第' + JSON.stringify(data) + '行')
      },
      getThisOpera (data) {
        console.log('getThisOpera', data)
      },
      checkedIndexArr (data) {
        this.tableData.checkedIndexArr = data
        console.log('checkedIndexArr', data)
      },
      refreshTable () {
        this.tableData.update.value = true // 告诉子组件需要更新数组
        this.tableData.checkedIndexArr = []
        this.tableData.dataList = []
        let that = this
        setTimeout(function () {
          that.tableData.dataList = JSON.parse(JSON.stringify(that.tableData.originData))
          that.tableData.update.value = false
        }, 1000)
      }
    }
  }
</script>
<style lang="less" scoped>
  ul.app{
    width:70%;
    margin-left: 20%;
    height: 100%;
    background-color: #c9dff3;
    font-size: 13px!important;
    li{
      width:100%;
      padding-left: 10%;
      border-bottom:1px solid #fff;
      padding-bottom: 30px;
      .title{
        font-size: 15px!important;
        height:40px;
        line-height: 40px;
        font-weight:800;
        margin-left: -3%;
      }
      .title:after{
        content: '........';
      }
      .result{
        height:30px;
        line-height:30px;
        .values{
          text-decoration: underline;
        }
      }
      .table{
        width:80%;
        height:auto;
      }
    }
    li:nth-child(2n){
    }
  }
</style>
