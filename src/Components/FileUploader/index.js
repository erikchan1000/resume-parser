import {useState} from 'react';
import axios from 'axios';
import { toast} from 'react-toastify';
import {Button} from 'react-bootstrap';

import './style.css';

export const FileUploader = ({onSuccess}) => {
    const [files, setFiles] = useState([]);

    const onInputChange = (e) => {
        setFiles(e.target.files)
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const data = new FormData();

        for(let i = 0; i < files.length; i++) {
            data.append('file', files[i]);
        }

        axios.post('//localhost:8000/upload', data)
            .then((response) => {
                toast.success('Upload Success');
                onSuccess(response.data)
            })
            .catch((e) => {
                toast.error('Upload Error')
            })
    };

    return (
        <form method="post" action="#" id="#" onSubmit={onSubmit}>
            <div className="files">
                <label>Upload Your File </label>
                <input type="file"
                        onChange={onInputChange}
                        accept=".doc,.docx,.pdf"
                        className = "test form-control"/>
            </div>

            <Button>Upload Resume</Button>
        </form>
    )
};