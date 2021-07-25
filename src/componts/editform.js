import React from 'react';
import { Button } from "@material-ui/core";
import '../App.css';
import editCanvas from '../store/actions/editcanvas';
import newLogo from '../store/actions/NewLogo';
import editLogo from '../store/actions/LogoEdit';
import Start from '../store/actions/start';
import { connect } from "react-redux";
import { render } from '@testing-library/react';
import swalFire from './functions/swal';

let type = 0;
const edit = props => {
    //   console.log(props)
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
            swalFire("error", "Resim Bulunamadı", "Hata");
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
    return (
        <div className="row">
            <div className="col-lg-6">
                <div className="edit-box">
                    <h5> İşlem Seçenekleri </h5>
                    <button className="btn btn-outline-danger  col-12 mb-3" onClick={() => teklipleks()}>Tekli çıktı al</button>
                    <button className="btn btn-outline-danger col-12 mb-3" onClick={() => coklupleks()}>Çoklu çıktı al</button>
                    <button className="btn btn-outline-danger col-12 mb-3" onClick={() => start()}>Verileri Yazdır</button>
                </div>
            </div>
            <div className="col-lg-6">
                <div className="edit-box">
                    <h5>Logo Düzenlemesi </h5>
                    <input className="form-control  col-12 mb-3" placeholder="Logo Yükle" id="logo" type="file" onChange={() => logo()}></input>
                    <button className="btn btn-outline-danger col-12 mb-3" onClick={() => LogoEdit(300, 220, 320)}>Kare</button>
                    <button className="btn btn-outline-danger col-12 mb-3" onClick={() => LogoEdit(500, 220, 240)}>Dikdörtgen</button>
                </div>
            </div>
   
        </div>
    )
}
const mapStateToProps = state => {
    return state
}

export default connect(mapStateToProps)(edit);
