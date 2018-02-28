import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

  class MyComponent extends React.Component { 
      render() { 
          <div>Hello {this.props.name}</div>
      }
  }

  // ========================================
  
  ReactDOM.render(
    <MyStatelessFunctionalComponent name="Andrew" />,
    document.getElementById('root')
  );