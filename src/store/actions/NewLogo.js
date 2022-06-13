import { NEWLOGO } from "../method";

const NewLogo = (e) =>{
    const action = {
        type:NEWLOGO,
        data:{
            Logo: e
        }
    }
    return action;
}

export default NewLogo;