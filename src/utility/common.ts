import  Hammer from "hammerjs";
import cornerstone from "cornerstone-core";
import cornerstoneTools from "cornerstone-tools";
import cornerstoneWADOImageLoader from "cornerstone-wado-image-loader";
import cornerstoneMath from "cornerstone-math";
import  dicomParser from 'dicom-parser'

class CornerstoneCommon{
  get cs() : any {
    return cornerstone
  }

  get tools(): any {
    return cornerstoneTools
  }

  get loader(): any {
    return cornerstoneWADOImageLoader
  }


  // 添加内置工具
  public addInsideTools(name : string , data = {}) : boolean {
    const tools = this.tools

    if (!tools[name]){
      console.error("[CornerstoneCommon] 使用了不存在的内部插件: ",name)
      return false
    }
    const toolname = name.substr(0,name.length-4)
    const tool = tools[name];
    tools.addTool(tool)
    tools.setToolActive(toolname, data)
    return true

    /*
    按键映射
    https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/buttons#value
    */
  }

  private InitTools() : void{
    const tools = this.tools
    
    tools.external.cornerstone = cornerstone;
    tools.external.Hammer = Hammer; 
    tools.external.cornerstoneMath = cornerstoneMath;
    tools.enableLogger();
    //localStorage.setItem('debug', 'cornerstoneTools:*');
  
    tools.init({
      mouseEnabled: true,
      touchEnabled: true
    })
  }

  private InitLoader() : void{
    this.loader.external.dicomParser = dicomParser
    this.loader.external.cornerstone = cornerstone;
    this.loader.external.cornerstoneMath = cornerstoneMath;
  
    this.loader.webWorkerManager.initialize({
    maxWebWorkers: 4,
    startWebWorkersOnDemand: true,
    webWorkerTaskPaths: [],
    taskConfiguration: {
        decodeTask: {
          initializeCodecsOnStartup: true,
          strict: true,
        },
      },
    });
  }
  
  private doms : Array<Document>

  constructor(){
    this.InitTools()
    this.InitLoader()

    this.doms = new Array<Document>()
  }

  public Enable(dom : Document) : void{
    this.doms.push(dom)
    this.cs.enable(dom)
  }
}


export default class Common {
  private static inited : boolean = false
  private static csData : CornerstoneCommon

  static Init() : boolean {
    if (Common.inited) 
      return false;
    else 
      Common.inited = true


    this.csData = new CornerstoneCommon
    return true;
  }

  static get cornerstone(){
    return this.csData
  }


}




