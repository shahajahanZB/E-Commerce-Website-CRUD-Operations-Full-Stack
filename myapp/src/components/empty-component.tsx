import {useState} from 'react';
// import Products from './products';
import {useNavigate} from 'react-router-dom';
const EmptyComponent = () => {
    const navigate = useNavigate();
    const [buttonclicked, setButtonClicked] = useState(false);
const handleClick = () =>{
    setButtonClicked(true);
    console.log("Button clicked");
    setTimeout(()=>{
    navigate('/products-page');
}, 1000);
}
    return (
        <>
        <div className="empty-component">
            <p>This is an empty component for later use.</p>
            <button onClick={handleClick} className="btn btn-primary">Clickme</button>
        </div>
        <div>
            {buttonclicked && <p>Navigating to Products Page...</p>}
        </div>
        </>
    );
}
export default EmptyComponent;