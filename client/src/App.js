import {useRef, useState, useEffect} from 'react'; 
import './App.css';
import {uploadFile} from './services/api';

function App() {
  const [file, setFile] = useState('');
  const [result, setResult] = useState('');

  const fileInputRef = useRef();

  const logo = "https://www.shutterstock.com/image-vector/vector-file-share-logo-software-260nw-2088794710.jpg";
  useEffect(()=>{
    const getImage = async () => {
      if(file){
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        let response = await uploadFile(data);
        setResult(response.path);
      }
    }
    getImage();
  }, [file])

  const onUploadClick = () => {
    fileInputRef.current.click();
  }


  return (
    <div className='container'>
      <img src={logo} alt='banner'/>
      <div className='wrapper'>
        <h1>Project Sharing App!</h1>
        <p>Upload and share the download link.</p>

        <button onClick={() => onUploadClick()}>Upload</button>
        <input 
          type="file"
          ref={fileInputRef}
          style={{display: 'inline-block'}}
          onChange={(e) => setFile(e.target.files[0])}
        />

        <a href={result} target="_blank">{result}</a>
      </div>
    </div>
  );
}

export default App;
