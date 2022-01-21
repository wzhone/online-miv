<template>
  <div class="home">
    <input type="file" id="selectFile" @change="selectFile"/>

    <div id="dicom" oncontextmenu="return false" ref="dicom">
      <!-- <canvas class="cornerstone-canvas"></canvas> -->
      <el-button type="primary">Primary</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";


import Common from '../../utility/common'

@Options({
  data() {
    return {
      file : ""
    }
  },

  mounted() {
    Common.Init()

    const cs = Common.cornerstone
    cs.Enable(this.$refs.dicom)

    // 添加内置的工具
    cs.addInsideTools("WwwcTool",{ mouseButtonMask: 1 }) // WW/WC
    cs.addInsideTools("PanTool",{ mouseButtonMask: 4 })  // 移动
    cs.addInsideTools("ZoomTool",{ mouseButtonMask: 2 }) // 缩放


  },

  methods: {
    selectFile(e: any) {
      const cs = Common.cornerstone
      const file : any = e.target.files[0];
      const id = cs.loader.wadouri.fileManager.add(file);

      // loadAndViewImage(imageId);
      cs.cs.loadImage(id).then((img : any)=>{
        console.log(img);
        const element = this.$refs.dicom
        console.log(element)
        const viewport = cs.cs.getDefaultViewportForImage(element, img);
        cs.cs.displayImage(element, img, viewport);

      },(err : any) => {
        console.log(err)
      })
    },
  },

  components: {},
})
export default class Home extends Vue {


}
</script>

<style scoped lang="stylus">
  #dicom
    width: 512px
    height:512px
  

</style>
