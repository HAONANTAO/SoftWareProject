import React, { useState } from "react";
import firebase from "./Firebase";

const FileUpload = ({ setUrl }) => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) {
      alert("Please choose a file first.");
      return;
    }

    const storageRef = firebase.storage().ref(`images/${file.name}`);
    const uploadTask = storageRef.put(file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        );
        setProgress(progress);
      },
      (error) => {
        console.error("Upload failed:", error);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log("File available at:", downloadURL);
          setUrl(downloadURL);
        });
      },
    );
  };

  const handleDelete = () => {
    if (!file) {
      alert("Please choose a file first.");
      return;
    }

    const storageRef = firebase.storage().ref(`images/${file.name}`);

    storageRef
      .delete()
      .then(() => {
        console.log("File successfully deleted.");
        setUrl(null);
      })
      .catch((error) => {
        console.error("Error when deleting the file:", error);
      });
  };

  return (
    <div>
      <progress value={progress} max="100" />
      <input type="file" onChange={handleChange} />
      <button onClick={handleUpload}>Upload</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default FileUpload;
