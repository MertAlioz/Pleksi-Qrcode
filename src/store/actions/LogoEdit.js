import { LOGOEDIT } from "../method";

const editLogo = (w, h, Mw) => {
    let action = {
        type: LOGOEDIT,
        data: {
            logoH: h,
            logoW: w,
            logoMw: Mw,
        },

    };
    return action;
}

export default editLogo;