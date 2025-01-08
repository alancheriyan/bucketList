import './App.css';
import { TestPage } from './TestPage';
import { MainPage } from './MainPage';

import {ConfigProvider} from "antd"

function App() {



  return (
    <ConfigProvider
    theme={{
      token: {
        // Seed Token
        colorPrimary: '#65aa6b',
        borderRadius: 2,


      },
    }}
  >
    <div className="App">
     <MainPage/>
    </div>

    </ConfigProvider>
  );
}

export default App;
