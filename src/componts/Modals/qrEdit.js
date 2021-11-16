import React from 'react';

const QrEdit = props => {
  return (
    <div className="modal fade" id="QrcodeEdit" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-sm">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-6">
                <div className="form-group">
                  <label > Qrcode Left</label>
                  <input
                    className="form-control"
                    placeholder={props.Left}
                    name="qrLeft"
                  />
                </div>
                <div className="form-group">
                  <label > Qrcode Top</label>
                  <input
                    className="form-control"
                    placeholder={props.Top}
                    name="qrTop"
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label > Qrcode Height</label>
                  <input
                    className="form-control"
                    placeholder={props.Height}
                    name="qrHeight"
                  />
                </div>
                <div className="form-group">
                  <label > Qrcode Width</label>
                  <input
                    className="form-control"
                    placeholder={props.Width}
                    name="qrWidth"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-outline-danger" data-bs-dismiss="modal">Kapat</button>

            <button type="button" className="btn btn-outline-success e_qrEdit">Kaydet</button>
          </div>
        </div>
      </div>
    </div>
  )
};

export default QrEdit;