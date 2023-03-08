import { FC, useEffect, useState } from "react";
import './simple-alert.style.scss';

interface IAlertProps {
    alertClass?: string,
    onClose?: () => void,
    visible?: boolean,
    children: JSX.Element,
}

const SimpleAlert: FC<IAlertProps> = ({
    alertClass,
    onClose,
    visible,
    children,
}) => {
    const [visibleState, setVisibility] = useState(true);
    
    useEffect(() => {
        if (visible !== undefined) {
            setVisibility(visible);
        }

    }, [visible]);

    const closeAlert = () => {
        setVisibility(false);

        if (onClose) onClose();
    }

    if (!visibleState) {
        return (
            <></>
        );
    }

    return (
        <div className={`alert-container ${alertClass}`} >
            {children}
            <button className="alert-close-button" onClick={closeAlert}></button>
        </div>
    )
}

export { SimpleAlert };