import { START } from "../method";

const Start = (status) => {
    const action = {
        type: START,
        data: 
            {
                cstatus: status,
            }
    }
    return action

}


export default Start;