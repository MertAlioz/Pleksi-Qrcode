import Pleks from './Pleks';
import Dropzone from './dropZone';
import Edit from './editform';
import React from "react";  
import { connect } from 'react-redux';

 const Index = props => {
    return (
        <div className="container">
            <Pleks />
            <Edit />
            <Dropzone />
    
        </div>
    );
}
const mapStateToProps = state => {
    return state
  }
  export default connect(mapStateToProps)(Index);
