import { QRADD } from "../method";

const Qradd = (name, url, num) => {
    const action = {
        type: QRADD,
        data: 
            {
                name: name,
                num: num,
                url: url,
            }
    }
    return action

}


export default Qradd;