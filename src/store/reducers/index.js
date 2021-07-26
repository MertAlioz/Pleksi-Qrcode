import { UPDATE_CANVAS, QR_EDIT, QRADD, START, LOGOEDIT, NEWLOGO } from '../method';

const initialState = {
    cBackgroundimage: "./images/taslak.png",
    cWidth: 984,
    cHeight: 1474,
    ctype: 0,
    cstatus: 0,
    cUrl: "",
    sectionName: "NB",
    sectionNum: "175",
    Logo: "",
    logoW: 300,
    logoH: 220,
    logoMw: 320,
    logoMh: 60,
    Qrcodes: [],
    
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_CANVAS:
            return {
                ...state,
                cHeight: action.data.cHeight,
                cWidth: action.data.cWidth,
                ctype: action.data.ctype
            }
        case QR_EDIT:
            return {
                ...state,
                sectionName: action.data.sectionName,
                sectionNum: action.data.sectionNum,
                cUrl: action.data.cUrl
            }
        case LOGOEDIT:
            return {
                ...state, 
                logoH: action.data.logoH,
                logoW: action.data.logoW,
                logoMw: action.data.logoMw
            }
        case QRADD:
            return { ...state, Qrcodes: [...state.Qrcodes, action.data] }
        case START:
            return { ...state, cstatus: action.data.cstatus }
        case NEWLOGO:
            return { ...state, Logo: action.data.Logo }

        default:
            return state
    }
}
export default reducer;

