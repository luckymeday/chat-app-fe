import React from 'react';
import Sidebar from './Sidebar';
import Content from './Content';


const Main = ({ user }) => {
    return (
        <div className="main">
            <Sidebar user={user}/>
            <Content user={user} />
        </div>
    )
}


export default Main;