import React from 'react';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import Main from './Components/Main'
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-multi-carousel/lib/styles.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Main>

      </Main>
      </BrowserRouter>
    </div>
  );
}

export default App;
