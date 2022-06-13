import Swal from 'sweetalert2';
import $ from "jquery";
const AlertSwal = {
  Fire: (icon, html, title) => {
    Swal.fire({
    title: title,
      text: html,
    icon: icon,
      confirmButtonText: 'Tamam'
  });
  },
  FireInput: async (icon, url, title, successfuntion) => {
    let Logoelement = `<div class="container" style="diplay: flex !important; justfiy-content: center;"> <div class="row">`;
    let logoOptions = `<select id="swal-input2" class="swal2-input">`;
    let currentSelectedLogo = "";
    await $.ajax({
      url: "https://api.qr-code-generator.com/v1/logos?access-token=epS3uuPbXFw-MG90WamFhCM4AVoZSfp3Sl9J2jXXq5j70xUzTZr0DSX1N7hKL5HZ&_lang=en&type_id=1",
      type: "GET",
      success:(response)=>{
          response.items.map(_ => {
            Logoelement += `<div class="col-3"><img src="${_.logo_url}" width="100" height="100" alt="${_.id}" title="${_.id}" /> </div>`
            logoOptions += `<option value="${_.logo_path}"> ${_.id}</option>`
          })
          Swal.fire({
            title: "Karekod Oluşturulacak Linki Giriniz",
            html: Logoelement+"</div>"+logoOptions+
        '</select><input id="swal-input1" class="swal2-input" placeholder="Link">' +
        '</div>',
            showCancelButton: true,
            confirmButtonText: 'Look up',
            showLoaderOnConfirm: true,
            preConfirm:async () => {
              let xml = ``;
              let url = document.getElementById('swal-input1').value;
              currentSelectedLogo = document.getElementById('swal-input2').value;
             await $.ajax({
                url:"https://api.qr-code-generator.com/v1/create?access-token=pCUBsVJ4ZbaviSj2tfRrZf-YSlegbRNzw1PDazcgKV-EjoyYdnBY89znRECJ-Yes",
                type:"POST",
                data:{
                 "frame_name": "no-frame",
                 "qr_code_text": url,
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
                 "qr_code_logo": currentSelectedLogo
                },
                 success:(response)=>{
                  const svg64 = require('svg64');
                        xml = new XMLSerializer().serializeToString(response);
                        xml = svg64(xml)
                      },
                 })
                 return xml
            },
            allowOutsideClick: () => !Swal.isLoading()
          }).then((result) => {
            if (result.isConfirmed) {
               Swal.fire({
                title: `${result.value.login}'s avatar`,
                html:  `<div style="height:500">
                <a href="${result.value}" download="w3logo.png">
                    <img src="${result.value}" download="OneQrCode" width="1000px" height="1000px"/>
                </a> </div>`
              });
      
            }
          })



        },
       })

  },    
    }
export default AlertSwal;

