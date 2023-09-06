import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export const NotFound = (props) => {
   useEffect(() => {
    props.setHeader("404 Page Not Found");
  }, [props]);
  return (
    <div style={{ textAlign: 'center', margin: '3em' }}>
      <h1>This page is not found!</h1>
       <Link to="/welcome">
         <Button>Go Home</Button>
      </Link>
    </div>
  );
};