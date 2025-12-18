import React from 'react';
import './styles/style.css';
import EmptyComponent from './empty-component.tsx';
const Home = () => {
    return (
        <>
                <div className="center-wrapper">
                    <h1 className="center-text">Welcome</h1>
                        <div>
                            <EmptyComponent />
                        </div>
                </div>
        </>
    )
};

export default Home;