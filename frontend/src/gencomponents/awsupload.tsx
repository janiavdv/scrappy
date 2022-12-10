import React, { Dispatch, SetStateAction, useState } from 'react';
import { uploadFile } from 'react-s3'
// https://stackoverflow.com/questions/69686231/react-s3-error-referenceerror-buffer-is-not-defined
window.Buffer = window.Buffer || require("buffer").Buffer;

// https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/s3-example-photo-album.html
// https://javascript.plainenglish.io/how-to-upload-files-to-aws-s3-in-react-591e533d615e

const S3_BUCKET = 'scrappyuploads';
const REGION = 'us-east-1';
const ACCESS_KEY = 'AKIAVSEGDI5QPF7BRARY';
const SECRET_ACCESS_KEY = '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';

const config = {
    bucketName: S3_BUCKET,
    region: REGION,
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
}

interface uploadProps {
    setValue: Dispatch<SetStateAction<string>>,
    setAllowed: Dispatch<SetStateAction<boolean>>
}

export default function UploadImageToS3WithReactS3({ setValue, setAllowed }: uploadProps) {

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileInput = (e: any) => {
        setSelectedFile(e.target.files[0]);
    }

    const handleUpload = async (file: any) => {
        uploadFile(file, config)
            .then((data: any) => {
                setAllowed(true);
                setValue(data.location);
            })
            .catch((err: any) => console.error(err))
    }

    return (
        <div>
            <div>React S3 File Upload</div>
            <input type="file" onChange={handleFileInput} />
            <button onClick={() => handleUpload(selectedFile)}> Upload to S3</button>
        </div>
    )
}