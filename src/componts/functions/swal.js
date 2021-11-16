import Swal from 'sweetalert2';
const swalFire = (icon, html, title) => {
    Swal.fire({
      title: title,
      text: html,
      icon: icon,
      confirmButtonText: 'Tamam'
    });
}
export default swalFire;