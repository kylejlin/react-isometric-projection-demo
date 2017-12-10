import React, { Component } from 'react';
import { IsometricProjection, meshLib } from 'react-isometric-projection';
import MeshSrcs from './MeshSrcs';
import fromCapsCaseToTitle from './fromCapsCaseToTitle';
import * as Babel from 'babel-standalone';
import './App.css';

const OPTIONS = {
  presets: ['es2015'],
  plugins: ["transform-object-rest-spread", "transform-react-jsx"]
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      meshSrc: MeshSrcs.RED_CUBE,
      mesh: this.runSrc(MeshSrcs.RED_CUBE),
      errorMessage: '',

      scrollX: 0,
      scrollY: 0,
      isMouseDown: false
    };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">IsometricProjection Demo</h1>
        </header>

        <p>Click on one of the meshes below to see it rendered.</p>

        <ul>
          {
            Object.keys(MeshSrcs).map((name, i) => (
              <li key={i} onClick={() => this.selectMesh(name)}>{fromCapsCaseToTitle(name)}</li>
            ))
          }
        </ul>

        <p>If you would like, you may edit the source below and click the "Run" button to make modifications.</p>

        <textarea value={this.state.meshSrc} onChange={e => this.setState({ meshSrc: e.target.value })}></textarea>
        <p className="App-err-msg">{this.state.errorMessage}</p>
        <button onClick={() => this.runSrc(this.state.meshSrc)}>Run</button>

        <svg
          width="400"
          height="400"
          viewBox="0 0 100 100"

          onMouseDown={e => this.beginScroll(e.clientX, e.clientY)}
          onMouseMove={e => this.state.isMouseDown && this.scroll(e.clientX, e.clientY)}
          onMouseUp={() => this.endScroll()}

          onTouchStart={({ changedTouches: [touch] }) => this.beginScroll(touch.clientX, touch.clientY)}
          onTouchMove={({ changedTouches: [touch] }) => this.scroll(touch.clientX, touch.clientY)}
          onTouchEnd={() => this.endScroll()}
        >
          <rect x="0" y="0" width="100" height="100" fill="black" />
          {
            this.state.mesh &&
            <IsometricProjection x={50 + this.state.scrollX/4} y={50 + this.state.scrollY/4} size={50} mesh={this.state.mesh} />
          }
        </svg>
      </div>
    );
  }

  beginScroll(x, y) {
    this.setState(state => ({
      initialX: x - state.scrollX,
      initialY: y - state.scrollY,
      isMouseDown: true
    }));
  }

  endScroll() {
    this.setState({
      isMouseDown: false
    });
  }

  runSrc(src) {
    src = `(function({ jsxToObj, Group, Polygon, Rect, Pyramid}) {
      /** @jsx jsxToObj **/
      return (${src});
    })`;

    try {
      const { code } = Babel.transform(src, OPTIONS);

      const mesh = eval(code)(meshLib);

      this.setState({ mesh, errorMessage: '' });

      return mesh;
    } catch (e) {
      this.setState({ errorMessage: '' + e });
    }
  }

  scroll(x, y) {
    this.setState(state => ({
      scrollX: x - state.initialX,
      scrollY: y - state.initialY
    }));
  }

  selectMesh(name) {
    const meshSrc = MeshSrcs[name];

    this.setState({
      meshSrc
    });

    this.runSrc(meshSrc);
  }
}

export default App;
