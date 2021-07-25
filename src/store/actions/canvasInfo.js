import { QR_EDIT} from "../method";

const canvasInfo = (name,num,url) =>{
   let action = {
       type:QR_EDIT,
       data:{
        sectionName:name,
        sectionNum: num,
        cUrl: url
       },
       status: true,
   };
   return action;
}

export default canvasInfo;