import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footers';
import './components/styles/Header.css';

const App: React.FC = () => {

  return (
    <>
      <Header />
        <Outlet />
      <Footer />
    </>
  );
};

export default App;