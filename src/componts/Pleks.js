import React, { useEffect, useRef, useState, } from 'react';
import { connect } from "react-redux";
import canvasInfo from '../store/actions/canvasInfo';
import { changeDpiDataUrl } from 'changedpi';
import AlertSwal from './functions/swal';
import QrEdit from './Modals/qrEdit';
import $ from 'jquery';
const pleksStabilDate = {
  image: {
    height: 1474,
    width: 984,
    maxWidth: 5903,
    maxHeight: 4133,
    pageCount: 6
  },
  qrCode: {
    Height: 420,
    Width: 420,
    Top: 880,
    Left: 460,
  },
  sectionNum: {
    Top: 1410,
    Left: 880,
  },
  sectionBetween: {
    Top: 1310,
    Left: 800,
  },
  sectionName: {
    Top: 1340,
    Left: 840,
  },
  textStyle: {
    fillStyle: "black",
    font: "bold 35px Arial",
    fontWeight: "bold",
    aling: "center",
  }
}

const Canvas = props => {
  let count = 0, pageCount = 1, plekscount = 1, maxCount = 1, message = 0, Qr_count = 0, loop = false;
  //All Pleks Data «*START*»
  const [state, setstate] = useState(pleksStabilDate)
  // «*END*»
  const canvasRef = useRef(null);
  function rotateAndPaintImage(context, image, angleInRad, positionX, positionY, axisX, axisY) {
    context.translate(positionX, positionY);
    context.rotate(angleInRad);
    context.drawImage(image, -axisX, -axisY);
    context.rotate(-angleInRad);
    context.translate(-positionX, -positionY);
  }
  const Pleks = (context) => {
    var background = new Image();
    var qr_code = new Image();
    var Logo = new Image();
    background.src = props.cBackgroundimage;
    qr_code.src = props.cUrl;
    Logo.src = props.Logo;
    background.onload = () => {
      context.drawImage(background, 0, 0, state.image.width, state.image.height); // Background İmage
      context.drawImage(qr_code, state.qrCode.Left, state.qrCode.Top, state.qrCode.Width, state.qrCode.Height);// QrCode
      context.drawImage(Logo, props.logoMw, props.logoMh, props.logoW, props.logoH);// logo
      context.font = state.textStyle.font;
      context.fillStyle = state.textStyle.fillStyle;
      context.textAlign = state.textStyle.aling;
      context.fillText(props.sectionName, state.sectionName.Left, state.sectionName.Top);
    //  context.fillText("-", state.sectionBetween.Left, state.sectionBetween.Top);
     // context.fillText(props.sectionNum, state.sectionNum.Left, state.sectionNum.Top);
      context.fill();
    }
  }
  const unitedPleks = (context) => {
    const data = props.Qrcodes;
    const TO_RADIANS = Math.PI / 180;
    const maxPleks = data.lengt
    data.forEach(e => {
      var İmage = new Image();
      İmage.src = e.url;
      İmage.onload = () => {
        if (pageCount === state.image.pageCount || maxPleks == maxCount ) {
          createPleks(context, İmage, state.image.width, state.image.height, TO_RADIANS, count); //Create end İmage 
          downloadInfo("Sayfa ", plekscount); //set name before and  download image
          CounterReset();
          context.clearRect(0, 0, state.maxWidth, state.maxHeight);// Clearing canvas  
        }
        else {
          createPleks(context, İmage, state.image.width, state.image.height, TO_RADIANS, count);
          Counter();
        }
      }
    });
  }
  const createPleks = (context, image, width, height, rad, count, type) => {
    rotateAndPaintImage(context, image, 180 * rad, width * count, 592, width, height);
    context.drawImage(image, width * count, state.image.height + 592, width, height);
    context.font = "60px Arial";
    context.fillStyle = "black";
    context.textAlign = "center";
    context.fillText("|", width * count, 632);
    context.fillText("|", width * count, state.image.height+592);
    context.fillText("|", width * count, state.image.height * 2  +582);
    context.fill();
  }
  const Counter = () => {
    count++;
    maxCount++;
    pageCount++;
  }
  const CounterReset = () => {
    pageCount = 1;
    plekscount++;
    count = 0;
    maxCount++;
  }
  useEffect(() => {
    const canvas = canvasRef.current
    const interval = setInterval(() => {
      downloadLoop();
    }, 1000);
    canvas.width = props.cWidth;
    canvas.height = props.cHeight;
    let ctx = canvas.getContext("2d")
    const render = () => {
      if (props.ctype === 0) {
        Pleks(ctx);
      }
      else {
        if (props.cstatus >= 1) {
          ctx.fillStyle = "white";
          ctx.fillRect(0, 0, state.image.maxWidth, state.image.maxHeight);
          ctx.fill();
          unitedPleks(ctx);
        }
        else {
        }
      }
    }
    render()
    return () => {
    }
  });
  const downloadInfo = (name, num) => {
    const canvas = document.getElementById("canvas");
    download(canvas, name + "-" + num, props.ctype);
  }
  const download = (canvas, filename, type) => {
    var lnk = document.createElement('a'), e;
    lnk.download = filename;
    if (type === 1) {
      var dataUrl = canvas.toDataURL('image/jpeg', 0.92);
      var daurl150dpi = changeDpiDataUrl(dataUrl, 320);
      lnk.href = daurl150dpi;
    }
    else { lnk.href = canvas.toDataURL('image/png'); }
    if (document.createEvent) {
      e = document.createEvent("MouseEvents");
      e.initMouseEvent("click", true, true, window,
        0, 0, 0, 0, 0, false, false, false,
        false, 0, null);

      lnk.dispatchEvent(e);
    } else if (lnk.fireEvent) {
      lnk.fireEvent("onclick");
    }
  }
  const downloadLoop = () => {
    let row = props.Qrcodes[Qr_count];
    let status = props.cstatus;
    if (status === 0) {
      if (loop === true) {
        if (!row) {
          if (message === 0) {
            AlertSwal.Fire('success', 'Resimler Kayıt Edildi', 'İşlem Başarılı')
          }
          message = 1;
        }
        else {
          props.dispatch(canvasInfo(row.name, row.num, row.url));
          Qr_count++;
          setTimeout(() => { downloadInfo(row.name, row.num); }, 350);
        }
      }
    }
  }
  const getValue = (e) => {
    return $(`input[name=${e}]`).val();
  }
  $(document).on("click", ".e_qrEdit", function () {
    let left = getValue("qrLeft"), Top = getValue("qrTop"), Height = getValue("qrHeight"), Width = getValue("qrWidth");
    let data = {
      Height: Height,
      Width: Width,
      Top: Top,
      Left: left,
    }
    if (state.qrCode.Height == data.Height) {
      console.log("çalışmaz")
    }
    else {
      setstate({ ...state, qrCode: data });
    }
  })
  return (
    <div className="Canvas-Box text-center">
      <div id="image">
      </div>
      <canvas className="canvas" id="canvas" ref={canvasRef}>
      </canvas>
      <div className="col-12 text-center m-3">
      <button className="btn btn-outline-danger" onClick={() => loop = true}>Tekli Pleksi İndir </button>
      <button className="btn btn-outline-danger" onClick={() =>{ alert(props.Qrcodes.length); console.log(props.Qrcodes)}}>kontrol et </button>
        <button type="button" className="btn btn-outline-danger m-3" data-bs-toggle="modal" data-bs-target="#QrcodeEdit">
          Qrcode Edit
        </button>
      </div>
      <QrEdit Left={state.qrCode.Left} Top={state.qrCode.Top} Height={state.qrCode.Height} Width={state.qrCode.Width} />
    </div>
    
  )
}
const mapStateToProps = state => {
  return state
}

export default connect(mapStateToProps)(Canvas)