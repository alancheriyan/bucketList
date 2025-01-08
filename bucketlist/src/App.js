import './App.css';
import { TestPage } from './TestPage';
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
     <TestPage/>
    </div>

    </ConfigProvider>
  );
}

export default App;
