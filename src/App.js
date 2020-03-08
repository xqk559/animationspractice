import React, { Component } from "react";
import Transition from 'react-transition-group/Transition';
import "./App.css";
import Modal from "./components/Modal/Modal";
import Backdrop from "./components/Backdrop/Backdrop";
import List from "./components/List/List";
import CSSTransition from 'react-transition-group/CSSTransition';
import * as d3 from 'd3';
import BarChart from './barchart';

const animationTiming = {
  enter: 400,
  exit: 1000,
};

class App extends Component {
  state = {
    modalIsOpen: false
  }

  showModal = () => {
    this.setState({modalIsOpen: true});
  }

  closeModal = () => {
    this.setState({modalIsOpen: false});
  }

  render() {
    return (
      <div className="App">
        <BarChart />
        <h1>React Animations</h1>
        <button className="Button" onClick={()=> this.setState(prevState => ({showBlock: !prevState.showBlock}))}>Toggle</button>
        <br />
        <br />
        <Transition in={this.state.showBlock} 
                    timeout={animationTiming}
                    mountOnEnter
                    unmountOnExit
                    onEnter={()=>console.log('onEnter')}
                    onEntering={()=>console.log('onEntering')}
                    onEntered={()=>console.log('onEntered')}
                    onExit={()=>console.log('onExit')}
                    onExiting={()=>console.log('onExiting')}
                    onExited={()=>console.log('onExited')}>
            {state => (<div style={{
                            backgroundColor: 'red',
                            width: 100,
                            height: 100,
                            margin: 'auto',
                            transition: 'opacity 1s ease-out',
                            opacity: state === 'exiting' ? 0 : 1}}/>)
            }
        </Transition>
        <CSSTransition 
          classNames={{
            enter: '',
            enterActive: 'ModalOpen',
            exit: '',
            exitActive: 'ModalClosed',
            appear: '',
            appearActive: '', 
          }}
          in={this.state.modalIsOpen} 
          timeout={animationTiming}
          mountOnEnter
          unmountOnExit>
            {state => (
              <Modal show={state} closed={this.closeModal}/>
            )}
        </CSSTransition>
        {this.state.modalIsOpen ? <Backdrop show/> : null}
        <button className="Button" onClick={this.showModal}>Open Modal</button>
        <h3>Animating Lists</h3>
        <List />
      </div>
    );
  }
}

export default App;
