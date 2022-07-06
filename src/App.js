import './App.css';
import {Button, Alert, Breadcrumb, Toast} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import {useState} from 'react'
import {FileUploader} from './Components/FileUploader'
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Preview} from './Components/Preview';


function App() {

  const [files, setFiles] = useState([]);
  const onSuccess = (savedFiles) => {
    setFiles(savedFiles)
  };




  return (
    <div className="App">
      <header className="App-header">
        <Breadcrumb>
          <Breadcrumb.Item>Hello World!</Breadcrumb.Item>
          <Breadcrumb.Item>Test 2</Breadcrumb.Item>
          <Breadcrumb.Item active>Test 3</Breadcrumb.Item>
        </Breadcrumb>
        <div className="Resume">
          <FileUploader onSuccess={onSuccess}/>
          <Preview files={files}/>
          <ToastContainer/>
        </div>
      </header>
      
    </div>
  );
}

export default App;
