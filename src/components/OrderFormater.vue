<template>
  <div>
    <el-badge :value="addressSize"><h2>{{ face }}</h2></el-badge>
    <el-main>
      <el-row type="flex" justify="center">
        <el-col :span="12" style="text-align: left">
          <el-collapse value="active" accordion>
            <el-collapse-item name="active">
              <template slot="title">
                <i class="header-icon el-icon-info"></i>&nbsp;&nbsp;&nbsp;&nbsp;输入解析地址，可以是多条，每条末尾以回车分开，eg:~~
              </template>
              <li>骆星,17770143005,江西省赣州市上犹县文兴路玉龙湾2202,十斤 发顺风</li>
              <li>江西省赣州市上犹县文兴路玉龙湾2202 17770143005骆星 10斤 我要邮政！！</li>
              <li>东莞市虎门镇南部湾24栋，范鲲鹏 15989627627  10斤，发顺丰！！！</li>
              <li>等任意格式……</li>
              <span style="font-weight: bolder">Tips:地址识别时，需要保证地址独占一行，点击Try it!生成Excel文件</span>
            </el-collapse-item>
          </el-collapse>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="12">
            <el-input placeholder="请输入解析地址" v-model="inputText" type="textarea" :autosize="{ minRows: 5}"></el-input>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col>
          <el-button icon="el-icon-star-on" @click="doParse" type="success">Try it!</el-button>
          <el-button icon="el-icon-delete" type="danger" @click="clear">清空地址</el-button>
        </el-col>
      </el-row>
    </el-main>
  </div>
</template>
<script>
  import areaInfo from '../../static/js/area-info';
  import {parseArea} from '../../static/js/order-formater';
  import {parse} from '../../static/js/order-formater';

  export default {
    name: 'AddressParse',
    data () {
      return {
        face: '输入的地址数量：ヾ(*´▽‘*)ﾉ',
        faceArray:["辛苦啦ヾ(*´▽‘*)ﾉ","加油奥ヾ(･ω･`｡)","还差一点ヾ(｡｀Д´｡)","马上就好了o(〃'▽'〃)o","好多单啊o(*≧▽≦)ツ","啊啊啊ε(*´･∀･｀)зﾞ","Daisiki(๑´ㅂ`๑)"],
        inputText:'',
        addressArray:[]
      }
    },
    computed: {
      addressSize:function () {
        var size = this.inputText.split("\n").length;
        if(this.inputText===""){
          return size-1;
        }else{
          this.face = this.faceArray[(size)%this.faceArray.length];
        }
        return size;
      }
    },
    mounted: function () {
      parseArea(areaInfo);
    },

    methods: {
      doParse: function () {
        this.addressArray = [];
        console.log(this.inputText);
        const addressList = this.inputText.split("\n");
        addressList.forEach(address=>{
          this.addressArray.push(parse(address));
        });
        console.log(this.addressArray);
        this.export2Excel(this.addressArray);
        this.$notify({
          title: '已保存',
          message: '所识别的文件已经保存在本地，可点击查看',
          type: 'success'
        });
      },
      clear: function () {
        this.inputText = '';
        this.addressArray = [];
        this.$notify({
          title: '已删除',
          message: '将不会保存之前输入的地址',
          type: 'warning'
        });
      },
      export2Excel(addressData) {
        require.ensure([], () => {
          const { export_json_to_excel } = require('../../static/js/Export2Excel');
          const tHeader = ['订单重量(kg)','收件人姓名','收件人手机','收货地址','快递','负责人'];
          const filterVal = ['num', 'name', 'mobile','addr','package','principal'];
          const data = this.formatJson(filterVal, addressData);
          export_json_to_excel(tHeader, data, '地址信息');
        })
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      }
    }
  }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }
  .el-row {
    margin-bottom: 20px;
    &:last-child {
     margin-bottom: 0;
   }
  }
</style>
