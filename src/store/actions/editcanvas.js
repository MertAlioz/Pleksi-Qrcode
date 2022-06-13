import { UPDATE_CANVAS } from "../method";

const editCanvas = (w, h, t) => {
    let action = {
        type: UPDATE_CANVAS,
        data: {
            cHeight: h,
            cWidth: w,
            ctype: t,
        },

    };
    return action;
}

export default editCanvas;