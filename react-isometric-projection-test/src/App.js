import React, { Component } from 'react';
import { IsometricProjection, meshLib } from 'react-isometric-projection';
import MeshSources from './MeshSources';
import toTitleCaseFromCapsCase from './toTitleCaseFromCapsCase';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      selectedMeshName: 'RED_CUBE',
      mesh: this.parse(MeshSources.RED_CUBE),
      meshSrc: MeshSources.RED_CUBE,
      errMsg: '',
      mouseDown: false,
      scrollX: 0,
      scrollY: 0
    };
    
    window.addEventListener('touchmove', e => {
      const targetStr = '' + e.target;
      if (targetStr.indexOf('SVG') > -1) {
        e.preventDefault();
      }
    }, { passive: false });
    
    this.parse = this.parse.bind(this);
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">IsometricProjection Demo</h1>
        </header>
        <p className="App-intro">
          Click on one of the examples below. If you would like, you can edit the source in the textarea below and click Run.
        </p>
        <ul>
          {
            Object.keys(MeshSources).map((k, i) => (
              <li
                key={i}
                style={{
                  textDecoration: k === this.state.selectedMeshName ? 'underline' : 'none'
                }}
                onClick={() => this.setState({ selectedMeshName: k, meshSrc: MeshSources[k], mesh: this.parse(MeshSources[k]) })}
              >
              {toTitleCaseFromCapsCase(k)}
              </li>
            ))
          }
        </ul>
        <p>Source:</p>
        <textarea
          className="App-editor"
          value={this.state.meshSrc}
          onChange={e => this.setState({ meshSrc: e.target.value })}
        ></textarea>
        <p className="App-err-msg">{this.state.errMsg}</p>
        <button onClick={() => {
          try {
            this.setState({ mesh: this.parse(this.state.meshSrc) });
          } catch (e) {
            this.setState({ errMsg: '' + e })
          }
        }}
        >Run</button>
        <p>Click and drag on the SVG to scroll.</p>
        <svg
          width="400"
          height="400"
          viewBox="0 0 100 100"
          onMouseDown={e => {
            e = Object.assign({}, e);
            this.setState(state => ({ mouseDown: true, initialPosition: { x: e.clientX - state.scrollX, y: e.clientY - state.scrollY } }))
          }}
          onMouseUp={() => this.setState({ mouseDown: false, initialPosition: null })}
          onMouseMove={e => {
            e = Object.assign({}, e);
            
            if (this.state.mouseDown) {
              this.setState(({ initialPosition }) => ({
                scrollX: e.clientX - initialPosition.x,
                scrollY: e.clientY - initialPosition.y
              }));
            }
          }}
          onTouchStart={e => {
            e = Object.assign({}, e);
            this.setState({ mouseDown: true, initialPosition: { x: e.changedTouches[0].clientX - state.scrollX, y: e.changedTouches[0].clientY - state.scrollY } })
          }}
          onTouchMove={e => {
            e = Object.assign({}, e);
            if (this.state.mouseDown) {
              this.setState(({ initialPosition }) => ({
                scrollX: e.changedTouches[0].clientX - initialPosition.x,
                scrollY: e.changedTouches[0].clientY - initialPosition.y
              }));
            }
          }}
          onTouchEnd={() => this.setState({ mouseDown: false, initialPosition: null })}
        >
          <rect x="0" y="0" width="100" height="100" fill="black" />
          <IsometricProjection x={50 + this.state.scrollX/4} y={50 + this.state.scrollY/4} width={50} mesh={this.state.mesh} />
        </svg>
      </div>
    );
  }
  
  parse(src) {
    // I know, I know, I'm breaking all the rules of Javascript here.
    try {
      // eslint-disable-next-line
      const mesh = eval('(function(meshLib){return ' + src + ';})')(meshLib);
      this.setState({ errMsg: '' });
      return mesh;
    } catch (e) {
      this.setState({ errMsg: '' + e });
      return this.state ? this.state.mesh : [];
    }
  }
}

export default App;
