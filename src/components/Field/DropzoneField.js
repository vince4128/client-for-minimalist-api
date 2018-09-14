import React from 'react';
import DropZone from 'react-dropzone';

const renderImagePreview = imageFile => {
    return imageFile.map(({name, preview, size}) => {
        <li key="imagePreview">
            <img
                style={{display:"block", margin:"auto", paddingTop:"10%"}}
                src={preview}
                alt={name}
                height="220px"
                width="220px"
            />
        </li>,
        <li key="imageDetails">
            {name} - {size} bytes
        </li>
    });
};

export default ({
    handleOnDrop,
    input,
    imageFile,
    label,
    meta: {error, touched}
}) => (
    <div>
        <Dropzone
            accept="image/jpeg, image/png, image/gif, image/bmp"
            classname="upload-container"
            onDrop={handleOnDrop}
            onChange={file => input.onChange(file)}
        >
        {imageFile && imageFile.length > 0 ? (
            <ul>
                {renderImagePreview(imageFile)}
            </ul>
        ):(
            <div>
                <div><h1>???</h1></div>
                <div>Clik or drag img here</div>
            </div>            
        )}
        </Dropzone>
        {touched && error && <div style={{ color: "red" }}>{error}</div>}
    </div>
)