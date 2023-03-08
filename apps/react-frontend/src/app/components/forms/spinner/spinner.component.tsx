import { FC } from 'react';
import './spinner.style.scss';

const Spinner: FC = () => { 
    return (
        <div className='spinner-cotainer'>
            <div className='lds-ellipsis'><div></div><div></div><div></div><div></div></div>
        </div>
    );
}

export { Spinner };