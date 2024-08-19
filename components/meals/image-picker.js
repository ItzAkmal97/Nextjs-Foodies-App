'use client';

import { useRef, useState } from 'react';
import classes from './image-picker.module.css'
import Image from 'next/image';
export default function ImagePicker({label, name}) {
    const [pickedImage, setPickedImage] = useState(null)
    const imageRef = useRef(null)
    function handleImagePicker(){
        imageRef.current.click();
    }

    function handleImageChange(e){
       const file = e.target.files[0];

       if(!file){
        setPickedImage(null);
        return;
       }

       const fileReader = new FileReader();
       fileReader.onload = () => {
           setPickedImage(fileReader.result);
       }
       fileReader.readAsDataURL(file);
    }
  return (
    <div className={classes.picker}>
        <label htmlFor={name}>{label}</label>
        <div className={classes.controls}>
            <div className={classes.preview}>
              {!pickedImage ? <span>Please pick an image.</  span> : <Image src={pickedImage} alt='Preview' fill/>}
                </div>
            <input className={classes.input} type="file" id={name} name={name} accept="image/png, image/jpeg" ref={imageRef} onChange={handleImageChange} required/>
            <button className={classes.button} type='button' onClick={handleImagePicker}>Upload an Image</button>
        </div>
    </div>
  )
}
