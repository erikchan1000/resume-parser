import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {useState} from 'react'
import {FileUploader} from './Components/FileUploader'
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  const [files, setFiles] = useState([]);
  const onSuccess = (savedFiles) => {
    setFiles(savedFiles)
  };




  return (
    <div className="App">
      <header className="App-header">
        <div className="Resume">
          <FileUploader onSuccess={onSuccess}/>
          <ToastContainer/>
        </div>
      </header>
      
    </div>
  );
}

export default App;
