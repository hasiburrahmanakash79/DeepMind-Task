import { Outlet } from 'react-router';
import Navbar from '../Shared/Navbar/Navbar';

const Main = () => {
    return (
        <div className=''>
            <Navbar/>
            <div className='container mx-auto'>
                <Outlet/>
            </div>
        </div>
    );
};

export default Main;