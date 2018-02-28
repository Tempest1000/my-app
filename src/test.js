import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const MyStatelessFunctionalComponent = ({name}) => {
    return (
      <div>Hello {name}</div>
    );
  }
  
  // ========================================
  
  ReactDOM.render(
    <MyStatelessFunctionalComponent name="Andrew" />,
    document.getElementById('root')
  );