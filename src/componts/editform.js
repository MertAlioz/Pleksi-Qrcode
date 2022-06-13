import React from 'react';
import { Button } from "@material-ui/core";
import '../App.css';
import editCanvas from '../store/actions/editcanvas';
import newLogo from '../store/actions/NewLogo';
import editLogo from '../store/actions/LogoEdit';
import Start from '../store/actions/start';
import { connect } from "react-redux";
import Qradd from '../store/actions/Qradd';
import $ from 'jquery';
import data from './data.json';
import AlertSwal from './functions/swal';
const svg64 = require('svg64');
const edit = props => {
    const inputGetValue = (e) => {
        return document.getElementById(e).value
    }

    function teklipleks() {
        props.dispatch(editCanvas(984, 1474, 0));
    }

    function coklupleks() {
        props.dispatch(editCanvas(5903, 4133, 1));
    }

    function start() {
        if (props.Qrcodes) {
            console.log(props.Qrcodes);
            props.dispatch(Start(1));
        }
        else {
            AlertSwal.Fire("error", "Resim Bulunamadı", "Hata");
        }
    }

    function logo() {
        const Logo = document.getElementById("logo");
        const logoPath = window.URL.createObjectURL(Logo.files[0])
        props.dispatch(newLogo(logoPath));
    }

    function LogoEdit(w, h, Mw) {
        props.dispatch(editLogo(w, h, Mw));
        console.log(props.logoW, props.logoH);
    }

    async function Api() {
        data.map(Table => {
        new Promise((resolve, reject) => {
        $.ajax({
           url:"https://api.qr-code-generator.com/v1/create?access-token=pCUBsVJ4ZbaviSj2tfRrZf-YSlegbRNzw1PDazcgKV-EjoyYdnBY89znRECJ-Yes",
           type:"POST",
           data:{
            "frame_name": "no-frame",
            "qr_code_text": `https://app.digigarson.com/#/${Table.branch}/${Table.id}`,
            "frame_template": null,
            "image_format": "SVG",
            "marker_bottom_inner_color": "#BA1616",
            "marker_bottom_outer_color": "#000000",
            "marker_bottom_template": "version6",
            "marker_left_inner_color": "#BA1616",
            "marker_left_outer_color": "#000000",
            "marker_left_template": "version8",
            "marker_right_inner_color": "#BA1616",
            "marker_right_outer_color": "#000000",
            "marker_right_template": "version7",
            "qr_code_pattern": "dots",
            "qr_code_rotation": "0",
           },
            success:(response)=>{
                   resolve(response);
                   var xml = new XMLSerializer().serializeToString(response);
                   props.dispatch(Qradd(Table.title, svg64(xml), 0))
            },
            error:(response)=>{
                   reject(response);
                   console.log(response)
            }
            })
         })
        })
                     
   }
   async function qrOne() {
       AlertSwal.FireInput("","","", (res)=>{
        })   
}
    return (
        <div className="row">
            <div className="col-lg-6">
                <div className="edit-box">
                    <button className="btn btn-outline-danger  col-12 mb-1" onClick={() => teklipleks()}>Tekli çıktı al</button>
                    <button className="btn btn-outline-danger col-12 mb-1" onClick={() => coklupleks()}>Çoklu çıktı al</button>
                    <button className="btn btn-outline-danger col-12 mb-1" onClick={() => start()}>Verileri Yazdır</button>
                    <button className="btn btn-outline-danger col-12 mb-1" onClick={() => Api()}>Apiden Qrkod çek</button>
                    <button className="btn btn-outline-danger col-12 mb-1" onClick={() => qrOne()}>Tekli qr oluştur Qrkod çek</button>
                </div>
            </div>
            <div className="col-lg-6">
                <div className="edit-box">
                    <h5>Logo Düzenlemesi </h5>
                    <input className="form-control  col-12 mb-1" placeholder="Logo Yükle" id="logo" type="file" onChange={() => logo()}></input>
                    <button className="btn btn-outline-danger col-12 mb-1" onClick={() => LogoEdit(300, 180, 350)}>Kare</button>
                    <button className="btn btn-outline-danger col-12 mb-1" onClick={() => LogoEdit(500, 220, 240)}>Dikdörtgen</button>
                </div>
            </div>
   
        </div>
    )
}
const mapStateToProps = state => {
    return state
}

export default connect(mapStateToProps)(edit);
