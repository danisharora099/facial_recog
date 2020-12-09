import axios from "axios";
import React, { useRef } from "react";
import S3 from "../s3/s3";
import Navbar from './Navbar'

export default function Upload() {
  const fileInput = useRef();

  const handleSubmit = async e => {
    e.preventDefault();
    const s3 = new S3();
    const file = fileInput.current.files[0];
    const filename = file.name;
    const s3Response = await s3.uploadFile(file, filename);
    const videoUrl = s3Response.location;
    console.log(videoUrl);
    try {
      const studentDetails = await axios.post("http://localhost:4000", {
        videoUrl
      });
    } catch (error) {
      alert(error);
    }
  };

  return (
      <div className="container mt-2">
        <h1>Upload</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input type="file" ref={fileInput} />
        </div>
        <button>Add</button>
      </form>    
    </div>  

  );
}