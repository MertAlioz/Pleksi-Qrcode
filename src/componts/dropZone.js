import React, { useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import canvasInfo from '../store/actions/canvasInfo';
import Qradd from '../store/actions/Qradd';
import { baseStyle, activeStyle, acceptStyle, rejectStyle, thumb, thumbInner, img } from './style/main.js'
const Dropzone = props => {
  const [files, setFiles] = useState([]);
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    acceptedFiles
  } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject,
    isDragAccept
  ]);
  function nameEdit(v, url) {
    let name;
    let num;
    let fetch = v.replace("qrcode_", "").replace(".png", "").split("_");
    let namefetch = fetch[0].split("-");
    if (namefetch[1]) {
      name = namefetch[0];
      //.slice(0, 1).toUpperCase() + "" + namefetch[1].slice(0, 1).toUpperCase();
    }
    else {
      name = fetch[0];
      //.slice(0, 1).toUpperCase();
    }
    num = fetch[1];
    props.dispatch(Qradd(name, url, num))
  }
  function selectImage(e) {
    var data;
    var num;
    var name;
    var url;
    data = e.function.split("*");
    let fetch = data[0].replace("qrcode_", "").replace(".png", "").split("_");
    let namefetch = fetch[0].split("_");
    console.log(fetch.length);
    if (fetch.length > 2) {
      name = fetch[0];
      //.slice(0, 1).toUpperCase() + "" + fetch[1].slice(0, 1).toUpperCase();
      num = fetch[2];
    }
    else {
      name = fetch[0];
      //.slice(0, 1).toUpperCase();
      num = fetch[1];
    }
    url = data[1];
    console.log(props)
    props.dispatch(canvasInfo(name, num, url));
  }
  const files_info = files.map((file, idx) => (
    <div style={thumb}>
      <div style={thumbInner}>
        <img src={file.preview} style={img} data-function={file.name + "*" + file.preview} key={idx} onClick={e => selectImage(e.target.dataset)} />
      </div>
    </div>
  ));
  function test() {
    const set_qr = files.map((file, idx) => (
      nameEdit(file.name, file.preview)
    ));
  }
  console.log(props.Qrcodes);
  return (
    <section className="row p-5 ">
      <div {...getRootProps({ style })} className="col-6 d-b">
        <input  {...getInputProps()} />
        <p>Yüklenecek QrCode Resimlerini Bu Alana Sürükleyiniz</p>
      </div>
      <div className="row p-3">
        <h4>Files</h4>
        <div><Button variant="contained" onClick={test} className="button" color="primary">Kaydet</Button></div>
        <div className="thumbsContainer col-6">
        </div>
        <div> {files_info}</div>
      </div>
    </section>
  );
}
const mapStateToProps = state => {
  return state;
}
export default connect(mapStateToProps)(Dropzone);