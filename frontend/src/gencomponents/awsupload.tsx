import { Dispatch, SetStateAction, useState } from "react";
import { uploadFile } from "react-s3";
import { ACCESS_KEY, SECRET_ACCESS_KEY } from "../private/credentials";
// https://stackoverflow.com/questions/69686231/react-s3-error-referenceerror-buffer-is-not-defined
window.Buffer = window.Buffer || require("buffer").Buffer;

// https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/s3-example-photo-album.html
// https://javascript.plainenglish.io/how-to-upload-files-to-aws-s3-in-react-591e533d615e

const S3_BUCKET = "scrappyuploads";
const REGION = "us-east-1";
const PRIVATE_KEY = ACCESS_KEY;
const SECRET_KEY = SECRET_ACCESS_KEY;

const TEXT_aws_upload = "This is the window pop-up to upload your entry's photo. \
Click the upload button to select your photo."
const TEXT_button = "Upload your photo by clicking here."

const config = {
  bucketName: S3_BUCKET,
  region: REGION,
  accessKeyId: PRIVATE_KEY,
  secretAccessKey: SECRET_KEY,
};

interface uploadProps {
  setValue: Dispatch<SetStateAction<string>>;
  setAllowed: Dispatch<SetStateAction<boolean>>;
}

export default function UploadImageToS3WithReactS3({
  setValue,
  setAllowed,
}: uploadProps) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setStatus] = useState("Upload");

  const handleFileInput = (e: any) => {
    setAllowed(false);
    setSelectedFile(e.target.files[0]);
    setStatus("Upload");
  };

  const handleUpload = async (file: any) => {
    uploadFile(file, config)
      .then((data: any) => {
        setAllowed(true);
        setValue(data.location);
      })
      .catch((err: any) => console.error(err));
  };

  return (
    <div id="aws-upload" aria-label={TEXT_aws_upload}>
      <h3>Upload a photo! (Required.)</h3>
      <input type="file" onChange={handleFileInput} />
      <button
        aria-roledescription={TEXT_button}
        onClick={() => {
          setStatus("Uploading...");
          handleUpload(selectedFile).then(() => setStatus("Uploaded."));
        }}
      >
        {" "}
        {uploadStatus}{" "}
      </button>
    </div>
  );
}
