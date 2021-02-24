<template>
<div>
   <div id="cesiumContainer" style="width:100vw;height:100vh;">

   </div>

    <div style="position:absolute;left:10px;top:10px;background-color:transparent;">
        <input id="drawPolygon" type="button" class="layui-btn layui-btn-sm layui-btn-normal" value="绘制多边形" />
        <input id="drawPolyline" type="button" class="layui-btn layui-btn-sm layui-btn-normal" value="绘制折线" />
        <input id="drawRectangle" type="button" class="layui-btn layui-btn-sm layui-btn-normal" value="绘制矩形" />
        <input id="drawCircle" type="button" class="layui-btn layui-btn-sm layui-btn-normal" value="绘制圆" />
        <input id="drawPoint" type="button" class="layui-btn layui-btn-sm layui-btn-normal" value="绘制点" />
        <input id="drawBufferLine" type="button" class="layui-btn layui-btn-sm layui-btn-normal" value="绘制缓冲区" />
    </div>
    <div style="position:absolute;left:10px;top:50px;background-color:transparent;">
        <input id="posMeasure" type="button" class="layui-btn layui-btn-sm" value="坐标查询" />
        <input id="spaceDisMeasure" type="button" class="layui-btn layui-btn-sm" value="空间距离" />
        <input id="stickDisMeasure" type="button" class="layui-btn layui-btn-sm" value="贴地距离" />
        <input id="areaMeasure" type="button" class="layui-btn layui-btn-sm" value="面积量算" />
    </div>
    <div style="position:absolute;left:10px;top:90px;background-color:transparent;">
        <input id="straightArrow" type="button" class="layui-btn layui-btn-sm layui-btn-danger" value="直线箭头" />
        <input id="attackArrow" type="button" class="layui-btn layui-btn-sm layui-btn-danger" value="攻击箭头" />
        <input id="pincerArrow" type="button" class="layui-btn layui-btn-sm layui-btn-danger" value="钳击箭头" />
    </div>
    <div style="position:absolute;left:10px;top:130px;background-color:transparent;">
        <input id="editShape" type="button" class="layui-btn layui-btn-sm layui-btn-primary" value="编辑图形" />
        <input id="deleteShape" type="button" class="layui-btn layui-btn-sm layui-btn-primary" value="删除图形" />
    </div>
</div>
</template>

<script> 
 
export default {
  name: "Home",
  data() {
    return {}
    },
    mounted(){}
  
};
</script>
<style scoped>
.el-main {
  flex-grow: 0 !important;
  flex-shrink: 1 !important;
  flex-basis: auto !important;
}
</style>
<style>
/** 隐藏滚动条 */
body::-webkit-scrollbar {
  display: none;
  /* Chrome Safari */
}
body {
  border: 0px;
  outline: none;
  margin: 0px;
  padding: 0px;
  background-image: url("../assets/img/scientic_pic.jpg");
}
</style>