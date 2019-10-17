import React from 'react';

const NotFoundPage = props =>{
    console.log(props);
    return(
        <main>
        <h1> 404 not found </h1>
        <strong>{window.location.href}</strong> doesn't exsist ..
        </main>
    );
    
};
export default NotFoundPage;