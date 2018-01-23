<template>
  <a
    :id="aId">
    <div v-for="orderId in sheetsName">
      <qrcode :id="orderId" :value="orderId.toString()" :options="{ size: 100 }" style="display:none;"></qrcode>
    </div>
  </a>
</template>

<script>
export default {
  name: 'ui-config-excel',
  props: {
    'type': {
      type: String,
      default: 'xls'
    },
    'excelHtml': {
      type: String,
      default: ''
    },
    'excelName': {
      type: String,
      default: '导出表格.xls'
    },
    'sheetsName': { // 多少个sheet就要多少个sheetName
      type: Array,
      default: []
    },
    'getHtml': {
      type: Boolean,
      default: false
    }
  },
  computed: {
    'aId': function () {
      var now = new Date().getTime()
      return 'export-excel-' + now
    }
  },
  mounted () {
  },
  watch: {
    'getHtml': function (newVal) {
      if (newVal) {
        this.generate()
      }
    }
  },
  methods: {
    generate () {
      if (this.type === 'csv') {
        return this.exportCSV(this.data, this.name, this.fields)
      }
      return this.exportXLS(this.data, this.name, this.fields)
    },
    jsonToXLS (data, header) {
      let sheets = ''
      let printFormula = '' // 打印固定头部
      let codes = ''
      if (this.sheetsName.length > 0) {
        for (let i = 0; i < this.sheetsName.length; i++) {
          let item = this.sheetsName[i]
          let name = item
          let sheetItem = `
    <x:ExcelWorksheet>
     <x:Name>${name}</x:Name>
     <x:WorksheetSource HRef=3D"FenJianDan/sheet${name}.xml"/>
    </x:ExcelWorksheet>`
          sheets += sheetItem
          printFormula += `
  <x:ExcelName>
   <x:Name>Print_Titles</x:Name>
   <x:SheetIndex>${i + 1}</x:SheetIndex>
   <x:Formula>=3D'${name}'!$1:$7</x:Formula>
  </x:ExcelName>
  <x:ExcelName>
   <x:Name>Print_Titles</x:Name>
   <x:SheetIndex>${i + 1}</x:SheetIndex>
   <x:Formula>=3D'${name}'!$1:7</x:Formula>
  </x:ExcelName>`
          let code = document.getElementById(name).toDataURL().replace('data:image/png;base64,', '') // 头部二维码
          let codeItem = `
------BOUNDARY_0008----
Content-Location: file:///C:/0E8D990C/FenJianDan/code${name}.xml
Content-Transfer-Encoding: base64
Content-Type: image/jpeg

${code}`
          codes += codeItem
        }
      }
      let xlsTemp = `MIME-Version: 1.0
X-Document-Type: Workbook
Content-Type: multipart/related; boundary="----BOUNDARY_0008----"

------BOUNDARY_0008----
Content-Location: file:///C:/0E8D990C/FenJianDan.xml
Content-Transfer-Encoding: quoted-printable
Content-Type: text/html; charset="us-ascii"

<html xmlns:o=3D"urn:schemas-microsoft-com:office:office"
xmlns:x=3D"urn:schemas-microsoft-com:office:excel"
xmlns=3D"http://www.w3.org/TR/REC-html40">

<head>
<xml>
 <o:DocumentProperties>
  <o:Author>ijovo</o:Author>
  <o:LastAuthor>ijovo</o:LastAuthor>
  <o:Company>ijovo</o:Company>
  <o:Version>1.0</o:Version>
 </o:DocumentProperties>
</xml>
<!--[if gte mso 9]>
<xml>
 <x:ExcelWorkbook>
  <x:ExcelWorksheets>${sheets}
  </x:ExcelWorksheets>
 </x:ExcelWorkbook>
 ${printFormula}
</xml>
<![endif]-->
</head>
</html>` + this.excelHtml + `

${codes}

------BOUNDARY_0008------`
      return xlsTemp
    },
    jsonToCSV (data, header) {
      var csvData = ''
      if (header) {
        for (var key in header) {
          csvData += header[key] + ','
        }
        csvData = csvData.slice(0, csvData.length - 1)
        csvData += '\r\n'
      }
      data.map(function (item) {
        for (var k in item) {
          csvData += item[k] + ','
        }
        csvData = csvData.slice(0, csvData.length - 1)
        csvData += '\r\n'
      })
      return csvData
    },
    base64 (s) {
      return window.btoa(window.unescape(encodeURIComponent(s)))
    },
    exportXLS (data, fileName, header) {
      var XLSData = 'data:application/vnd.ms-excelbase64,' + this.base64(this.jsonToXLS(data, header))
      this.download(XLSData, fileName)
    },
    exportCSV (data, fileName, keys) {
      var CSVData = 'data:application/csvbase64,' + this.base64(this.jsonToCSV(data, keys))
      this.download(CSVData, fileName)
    },
    // 创建文件流
    base64ToBlob (base64Data) {
      var arr = base64Data.split(',')
      var mime = arr[0].match(/:(.*?)/)[1]
      var bstr = atob(arr[1])
      var n = bstr.length
      var u8arr = new Uint8ClampedArray(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new Blob([u8arr], { type: mime })
    },
    download (base64data, fileName) {
      var blob
      if (window.navigator.msSaveBlob) {
        blob = this.base64ToBlob(base64data)
        window.navigator.msSaveBlob(blob, '导出表格.xls')
        return false
      }
      var a = document.getElementById('download')
      if (window.URL.createObjectURL) {
        blob = this.base64ToBlob(base64data)
        a.href = window.URL.createObjectURL(blob)
        a.download = this.excelName
        document.getElementById('download').click()
        return
      }
      a.href = base64data
      a.download = this.excelName
      document.getElementById('download').click()
    }
  }
}
</script>
