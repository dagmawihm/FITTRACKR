import Pages from './pages/Pages';
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <div>
        <Pages />
      </div>
    </BrowserRouter>

  );
}

export default App;
