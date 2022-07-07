import {useState} from 'react';
import axios from 'axios';
import {toast} from 'react-toastify';
import {Button} from 'react-bootstrap';

import './style.css';

export const FileUploader = ({onSuccess}) => {
    const [file, setFile] = useState(null);

    const onInputChange = (e) => {
        console.log(e.target.value)
        setFile(e.target.files[0])
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const data = new FormData();

        data.append('file', file)

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
                <input type="file"
                        onChange={onInputChange}
                        accept=".doc,.docx,.pdf"
                        className = "form-control"/>
            </div>
            <Button type="submit">Upload Resume</Button>
        </form>

    )
};