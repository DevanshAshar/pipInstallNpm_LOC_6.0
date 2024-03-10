import React, { useEffect, useRef, useState } from 'react';
import './styles3.css';
import { Typography } from '@mui/material';
import Webcam from 'react-webcam';
import axios from 'axios';

const Upload = () => {
    const [images, setImages] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);
    const webcamRef = useRef(null);
    const [showWebcam, setShowWebcam] = useState(false);
    const [fullscreen, setFullscreen] = useState(false);
    const roomId = localStorage.getItem("roomId")
    // const [files, setFiles] = useState([]);
    const token = localStorage.getItem("token")

    function selectFiles() {
        fileInputRef.current.click();
    }

    function onFilesSelect(event) {
        const files = event.target.files;

        if (files.length === 0) {
            return;
        }

        for (let i = 0; i < files.length; i++) {
            if (files[i].type.split('/')[0].toLowerCase() !== 'image') {
                continue;
            }
            if (!images.some((e) => e.name === files[1].name)) {
                setImages((prevImages) => [...prevImages, files[i]])
            }
        }
    }

    function deleteImage(index) {
        setImages((prevImages) =>
            prevImages.filter((_, i) => i !== index)
        )
    }

    function onDragOver(event) {
        event.preventDefault();
        setIsDragging(true);
        event.dataTransfer.dropEffect = "copy";
    }

    function onDragLeave(event) {
        event.preventDefault();
        setIsDragging(false);
    }

    function onDrop(event) {
        event.preventDefault();
        setIsDragging(false);
        const files = event.dataTransfer.files;
        for (let i = 0; i < files.length; i++) {
            if (files[i].type.split('/')[0].toLowerCase() !== 'image') {
                continue;
            }
            if (!images.some((e) => e.name === files[1].name)) {
                setImages((prevImages) => [...prevImages, files[i]])
            }
        }
    }

    const uploadImages = async() => {
        console.log("images", images)
        const formData = new FormData();
        for (let i = 0; i < images.length; i++) {
            formData.append('image', images[i]);
        }
        formData.append('roomId', roomId); // Append room number

        try {
        const response = await axios.post('http://localhost:5000/inspect/addInspect', formData, {
            headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': token
            },
        });
        if(response.status == 200){
            console.log('Response:', response.data);
        }
        // alert('Files uploaded successfully');
        } catch (error) {
        console.error('Error uploading files:', error);
        alert('Error uploading files');
        }
    }

    function takePicture() {
        const imageSrc = webcamRef.current.getScreenshot();
        // Do something with the captured image, like uploading to server or displaying
        console.log(imageSrc);
    }

    function toggleWebcam() {
        setShowWebcam((prev) => !prev);
        setFullscreen(false); // When toggling the webcam, reset fullscreen mode
    }


    return (
        <div>
            <div style={{ width: '500px', height: '800px' }}>
                <div className='card'>
                    <div className='top'>
                        <Typography variant='h4' style={{ color: 'white', marginTop: '20px', background: 'linear-gradient(-50deg, #37BFD1, #C1F3F5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Upload Images of Before Cleaning</Typography>
                    </div>
                    <div className='drag-area' onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}>
                        {
                            isDragging ? (
                                <span className='select'>
                                    Drop image here
                                </span>
                            ) : (
                                <>
                                    Drag and Drop image here or {"  "}
                                    <span className='select' role="button" onClick={selectFiles}>
                                        Browse
                                    </span>
                                </>
                            )
                        }
                        <input type="file" name='file' className='file' multiple ref={fileInputRef} onChange={onFilesSelect} />
                    </div>
                    <div className='container'>
                        {images.map((image, index) => (
                            <div className='image' key={index}>
                                <span className='delete' onClick={() => deleteImage(index)}>&times;</span>
                                <img src={image.url} alt={image.name} />
                            </div>
                        ))}
                    </div>
                    <button type='button' onClick={uploadImages}>
                        Upload
                    </button>
                    {showWebcam && (
                        <div>
                            <Webcam
                                audio={false}
                                ref={webcamRef}
                                screenshotFormat="image/jpeg"
                                className="webcam"
                            />
                            <button onClick={takePicture}>Take Picture</button>
                        </div>
                    )}
                    <button type='button' onClick={toggleWebcam} style={{marginTop: 30}}>
                        {showWebcam ? 'Hide Webcam' : 'Show Webcam'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Upload;


/*
import React, { useEffect, useRef, useState } from 'react';
import './styles3.css';
import { Typography } from '@mui/material';
import Webcam from 'react-webcam';
import axios from 'axios';

const Upload = () => {
    const [images, setImages] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);
    const webcamRef = useRef(null);
    const [showWebcam, setShowWebcam] = useState(false);
    const [fullscreen, setFullscreen] = useState(false);
    const roomId = localStorage.getItem("roomId")
    // const [files, setFiles] = useState([]);
    const token = localStorage.getItem("token")

    function selectFiles() {
        fileInputRef.current.click();
    }

    function onFilesSelect(event) {
        const files = event.target.files;

        if (files.length === 0) {
            return;
        }

        for (let i = 0; i < files.length; i++) {
            if (files[i].type.split('/')[0].toLowerCase() !== 'image') {
                continue;
            }
            if (!images.some((e) => e.name === files[1].name)) {
                setImages((prevImages) => [...prevImages, { name: files[i].name, url: URL.createObjectURL(files[i]) }])
            }
        }
    }

    function deleteImage(index) {
        setImages((prevImages) =>
            prevImages.filter((_, i) => i !== index)
        )
    }

    function onDragOver(event) {
        event.preventDefault();
        setIsDragging(true);
        event.dataTransfer.dropEffect = "copy";
    }

    function onDragLeave(event) {
        event.preventDefault();
        setIsDragging(false);
    }

    function onDrop(event) {
        event.preventDefault();
        setIsDragging(false);
        const files = event.dataTransfer.files;
        for (let i = 0; i < files.length; i++) {
            if (files[i].type.split('/')[0].toLowerCase() !== 'image') {
                continue;
            }
            if (!images.some((e) => e.name === files[1].name)) {
                setImages((prevImages) => [...prevImages, { name: files[i].name, url: URL.createObjectURL(files[i]) }])
            }
        }
    }

    const uploadImages = async() => {
        console.log("images", images)
        const formData = new FormData();
        for (let i = 0; i < images.length; i++) {
            formData.append('image', images[i]);
        }
        formData.append('roomId', roomId); // Append room number

        try {
        const response = await axios.post('http://localhost:5000/inspect/addInspect', formData, {
            headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': token
            },
        });
        if(response.status == 200){
            console.log('Response:', response.data);
        }
        // alert('Files uploaded successfully');
        } catch (error) {
        console.error('Error uploading files:', error);
        alert('Error uploading files');
        }
    }

    function takePicture() {
        const imageSrc = webcamRef.current.getScreenshot();
        // Do something with the captured image, like uploading to server or displaying
        console.log(imageSrc);
    }

    function toggleWebcam() {
        setShowWebcam((prev) => !prev);
        setFullscreen(false); // When toggling the webcam, reset fullscreen mode
    }


    return (
        <div>
            <div style={{ width: '500px', height: '800px' }}>
                <div className='card'>
                    <div className='top'>
                        <Typography variant='h4' style={{ color: 'white', marginTop: '20px', background: 'linear-gradient(-50deg, #37BFD1, #C1F3F5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Upload Images of Before Cleaning</Typography>
                    </div>
                    <div className='drag-area' onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}>
                        {
                            isDragging ? (
                                <span className='select'>
                                    Drop image here
                                </span>
                            ) : (
                                <>
                                    Drag and Drop image here or {"  "}
                                    <span className='select' role="button" onClick={selectFiles}>
                                        Browse
                                    </span>
                                </>
                            )
                        }
                        <input type="file" name='file' className='file' multiple ref={fileInputRef} onChange={onFilesSelect} />
                    </div>
                    <div className='container'>
                        {images.map((image, index) => (
                            <div className='image' key={index}>
                                <span className='delete' onClick={() => deleteImage(index)}>&times;</span>
                                <img src={image.url} alt={image.name} />
                            </div>
                        ))}
                    </div>
                    <button type='button' onClick={uploadImages}>
                        Upload
                    </button>
                    {showWebcam && (
                        <div>
                            <Webcam
                                audio={false}
                                ref={webcamRef}
                                screenshotFormat="image/jpeg"
                                className="webcam"
                            />
                            <button onClick={takePicture}>Take Picture</button>
                        </div>
                    )}
                    <button type='button' onClick={toggleWebcam} style={{marginTop: 30}}>
                        {showWebcam ? 'Hide Webcam' : 'Show Webcam'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Upload;

*/