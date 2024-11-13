import { useState } from 'react';

const UploadWidget = ({ widget, disabled }) => {

  return (
    <button 
    id="upload_widget" 
    className="upload-button" 
    disabled={disabled}
    onClick={(e) => {
      e.preventDefault(),
        widget.open(),
      false
    }}>
      Subir Imagen
    </button>
  );
};

export default UploadWidget;