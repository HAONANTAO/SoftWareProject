import React, { useEffect, useState } from "react";
import {
  UploadOutlined,
  LoadingOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { Button, Upload } from "antd";

import firebase from "../../utils/Firebase/Firebase";

const UploadFile = (props) => {
  const { getFileUrl } = props;
  const [uploading, setUploading] = useState(false);
  const [fileUrl, setFileUrl] = useState("");

  useEffect(() => {
    getFileUrl(fileUrl);
  }, [fileUrl]);

  return (
    <div>
      <Upload
        disabled={fileUrl !== ""}
        listType="picture"
        beforeUpload={(e) => {
          console.log("before:", e);
          const storageRef = firebase.storage().ref(`images/${e.name}`);

          const uploadTask = storageRef.put(e);

          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              );
              setUploading(progress !== 100);
            },
            (error) => {
              console.error("Upload failed:", error);
            },
            () => {
              uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                console.log("File available at", downloadURL);
                setFileUrl(downloadURL);
              });
            }
          );
          return false;
        }}
        onRemove={(e) => {
          console.log("remove: ", e);
          setFileUrl("");
        }}
        onPreview={(e) => {
          if (uploading) {
            return;
          }
          const w = window.open("_blank");
          w.location.href = fileUrl;
        }}
        customRequest={(e) => {
          console.log("request: ", e);
          return true;
        }}
      >
        <Button icon={<UploadOutlined />}>Upload</Button>
        {uploading ? (
          <LoadingOutlined
            style={{
              fontSize: 20,
              marginLeft: "2px",
              color: "blue",
            }}
            spin
          />
        ) : (
          <>
            {fileUrl !== "" ? (
              <CheckOutlined
                style={{
                  fontSize: 20,
                  marginLeft: "2px",
                  color: "green",
                }}
              />
            ) : (
              <></>
            )}
          </>
        )}
      </Upload>
    </div>
  );
};

export default UploadFile;
