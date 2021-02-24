<template>
  <el-container class="page-table-ctn">
    <el-table v-bind="$attrs" v-on="$listeners" :data="filterData" ref="pageTable">
      <slot></slot>
      <el-table-column width="40" fixed="right" v-if="dynamicColumnSetting">
        <template slot="header">
          <el-button
            size="small"
            type="text"
            icon="el-icon-setting"
            style="padding:0;"
            @click="dynColSettingDialogVisible = true"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-footer class="footer" v-if="paging">
      <!-- <div class="size-info">
        <span v-if="totalSize > 1">显示第 {{start}} 页到第 {{end}} 条的数据，</span>
        共{{ totalSize }} 条
      </div> -->
      <el-pagination
        v-bind="$attrs"
        v-show="totalSize>0"
        v-on="$listeners"
        :pager-count="5"
        :layout="layout"
        :page-sizes="pageSizes"
        :page-size="currPageSize"
        :current-page="currPage"
        :total="totalSize"
        style="float:right"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      ></el-pagination>
    </el-footer>

    <el-dialog
      title="展示列设置"
      class="dyn-col-ctn"
      :visible.sync="dynColSettingDialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      v-dialogDrag
    >
      <el-checkbox-group v-model="visibleIndexs" :min="1">
        <el-checkbox
          v-for="colInfo in columnInfos"
          :label="colInfo.index"
          :key="colInfo.index"
          :disabled="colInfo.disabled"
        >{{ colInfo.label }}</el-checkbox>
      </el-checkbox-group>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dynColSettingCancel">关 闭</el-button>
        <el-button type="primary" @click="dynColSettingConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>

<script>
export default {
  name: "page-table",
  props: {
    data: {
      type: Array,
      require: true,
      default: () => []
    },
    currentPage: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    pageSizes: {
      type: Array,
      default: () => [10, 20, 30, 50]
    },
    layout: {
      type: String,
      default: "total, sizes, prev, pager, next, jumper"
    },
    // 是否分页，默认为true，即分页。（不分页时将每页条数设置最大。）
    paging: {
      type: Boolean,
      default: true
    },

    dynamicColumnSetting: {
      // 是否开启动态列设置
      type: Boolean,
      default: false
    },
    alwaysShowColumnIndexs: {
      // 总是展示的列下标（不允许隐藏）。列下标值是从 0 开始
      type: Array,
      default: _ => []
    },
    hidenColumnIndexs: {
      // 初始隐藏的列下标。列下标值是从 0 开始
      type: Array,
      default: _ => []
    }
  },
  data() {
    return {
      allData: this.data, // 全量表格数据(前端分页)
      filterData: [], // 表格展示数据
      start: 1,
      end: 1,
      totalSize: this.data.length,
      currPageSize: this.paging ? this.pageSize : Number.MAX_SAFE_INTEGER,
      currPage: this.currentPage,

      dynColSettingDialogVisible: false, // '展示列设置'弹窗开关
      columnInfos: [], // 所有列信息
      visibleIndexs: [], // 可见列的下标集合
      hidenIndexs: this.hidenColumnIndexs // 不可见列(隐藏列)的下标集合
    };
  },
  methods: {
    handleSizeChange(value) {
      this.currPage = 1;
      this.currPageSize = value;
      this.handleChange();
    },
    handleCurrentChange(value) {
      this.currPage = value;
      this.handleChange();
    },
    handleChange(reset) {
      // reset：是否重置页码
      if (reset) {
        this.currPage = 1;
      }
      this.renderTable();
      if (this.dynamicColumnSetting) {
        this.dynColSettingConfirm();
      }
    },
    renderTable() {
      if (this.totalSize > this.currPageSize) {
        // 总行数大于一页
        let startIndex = (this.currPage - 1) * this.currPageSize,
          endIndex = this.currPage * this.currPageSize;
        this.start = startIndex + 1;
        this.end = this.totalSize < endIndex ? this.totalSize : endIndex;
        this.filterData = this.allData.slice(startIndex, endIndex); //[start,end)
      } else if (this.totalSize > 0) {
        // 总行数小于等于一页
        this.currPage = 1;
        this.start = 1;
        this.end = this.totalSize;
        this.filterData = this.allData;
      } else {
        // 无数据
        this.currPage = 1;
        this.start = 0;
        this.end = 0;
        this.filterData = [];
      }
    },
    setData(value) {
      this.allData = value;
      this.totalSize = value.length;
      this.renderTable();
    },

    dynColSettingCancel() {
      let self = this;
      this.dynColSettingDialogVisible = false;
      // 重置可见列下标集合
      var tempVisibleIndexs = [];
      this.columnInfos.forEach(columnInfo => {
        if (self.hidenIndexs.indexOf(columnInfo.index) === -1) {
          tempVisibleIndexs.push(columnInfo.index);
        }
      });
      this.visibleIndexs = tempVisibleIndexs;
    },
    dynColSettingConfirm() {
      let self = this;
      var tmpHideIndexs = [],
        tmpShowIndexs = [];

      self.columnInfos.forEach(columnInfo => {
        if (self.visibleIndexs.indexOf(columnInfo.index) === -1) {
          tmpHideIndexs.push(columnInfo.index);
        }
      });

      tmpShowIndexs = self.hidenIndexs.filter(
        index => tmpHideIndexs.indexOf(index) === -1
      );

      this.showColumns(tmpShowIndexs);
      self.hidenIndexs = tmpHideIndexs;
      this.hideColumns(self.hidenIndexs);

      this.dynColSettingDialogVisible = false;
    },
    showColumns(indexs) {
      this.oprColumns(indexs, "");
    },
    hideColumns(indexs) {
      this.oprColumns(indexs, "none");
    },
    oprColumns(indexs, display) {
      if (!indexs || indexs.length === 0) {
        return;
      }
      let self = this;
      let classSelector = indexs
        .map(
          index =>
            `.${
              self.$refs.pageTable.$slots.default[index].componentInstance
                .columnId
            }:not(.is-hidden)`
        )
        .join(",");
      // 关键代码！！！
      self.$nextTick(_ => {
        self.$el.querySelectorAll(classSelector).forEach(item => {
          item.style.display = display;
        });
      });
      // this.$el.querySelectorAll(classSelector).forEach(item => {item.style.display = display;})
    },

    //<el-table>自带的方法 start
    setCurrentRow(row) {
      this.$refs.pageTable.setCurrentRow(row);
    }
    //...
    //<el-table>自带的方法 end
  },
  watch: {
    data() {
      this.setData(this.data ? this.data : []);
    }
  },
  mounted() {
    let self = this;

    if (self.$refs.pageTable.$slots.default && self.dynamicColumnSetting) {
      self.$refs.pageTable.$slots.default.forEach((columnIns, index) => {
        let props = columnIns.componentOptions.propsData;
        if (props.fixed === "right" && !props.label) {
          // 设置列，不记录
          return;
        }
        // 保存所有列信息
        self.columnInfos.push({
          label: props.type === "selection" ? "复选框" : props.label,
          index: index,
          disabled: props.type === "selection" ? true : false // 默认checkbox不可隐藏
        });
        // 记录初始展示的列
        if (self.hidenIndexs.indexOf(index) === -1) {
          self.visibleIndexs.push(index);
        }
      });
      // 总是显示的列，不可隐藏
      self.alwaysShowColumnIndexs.forEach(
        index => (self.columnInfos[index].disabled = true)
      );
      // 处理初始隐藏列
      self.hideColumns(self.hidenIndexs);
    }
  }
};
</script>

<style lang="scss" scoped>
.page-table-ctn {
  > .el-table {
    width: auto;
    margin: 14px;
    border: 1px solid #ebeef5;
    border-bottom: unset;
  }
  > .footer {
    height: 40px !important;
    .size-info {
      display: inline;
      font-size: 12px;
      color: #666666;
      text-align: right;
    }
  }
}
</style>
