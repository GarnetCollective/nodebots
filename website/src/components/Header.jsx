import React from 'react';

import {Jumbotron} from 'reactstrap'

export class Header extends React.Component{
  render() {
    return(
      <Jumbotron >
        <img src={require('../public/images/brand.png')} />
      </Jumbotron>
  )
  } 
}