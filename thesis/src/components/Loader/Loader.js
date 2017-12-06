import React, { Component, } from 'react';
import ReactDOM from 'react-dom';
import {TweenMax, Elastic} from 'gsap';
import '../../greensock/plugins/ScrambleTextPlugin.js';
import '../../App.css';
import './Loader.css';

class PanelSquare extends Component {
  constructor(){
    super();
    this.landed = false;
  }
  scrambler = (target, text) => {
    if (this.landed) return TweenMax.to(ReactDOM.findDOMNode(target), 1.5, {scrambleText:{text:text, chars:"10", revealDelay:0.2, speed:0.3}});
  }
  componentDidMount(){
    this.landed = true;
    setTimeout(() => this.scrambler(this.scrambled, 'There appears to be a connection problem...'), 10000);
    setTimeout(() => this.scrambler(this.scrambled2, 'Please try again in a few minutes.'), 11000);    
  }
  componentWillUnmount(){
    this.landed = false;
  }
  render() {
    return (
      <div className="Wrap">
        <div style={{
          position:'absolute',
          width:'100vw',
          height:'100vh',
          display:'flex',
          alignItems:'center',
          justifyContent:'center'
        }}><h5 style={{marginBottom:'20vh'}} ref={e => {this.scrambled = e;}}></h5></div>
        <div className="Spinner"></div>
        <div style={{
          position:'absolute',
          width:'100vw',
          height:'100vh',
          display:'flex',
          alignItems:'center',
          justifyContent:'center'
        }}><h5 style={{marginBottom:'-20vh'}} ref={e => {this.scrambled2 = e;}}></h5></div>

      </div>
    )
  }
}

export default PanelSquare;
