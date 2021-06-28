import React, { Component } from 'react';
import Navigation from './components/navigation/navigation';
import Logo from './components/Logo/Logo.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
// import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';

import './App.css';

const app = new Clarifai.App({
  apiKey: 'ce0b810b4109452888b361708d318bc5'
})

// const particlesOptions = {
//   particles: {
//     number: {
//       value: 30,
//       density: {
//         enable: true,
//         value_area: 800,
//       }

//     }
//   }
// }
    

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: 'false'
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value });
  }

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL,
        this.state.input
      )
      .then(
        function (response) {
          console.log(response.outputs[0].data.region[0].region_info.bounding_box);
        },
        function(err) {
          
        }
    );
   
    
  }
  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({ isSignedIn: false });
    } else if (route === 'home') {
      this.setState({ isSignedIn: true });
    }
    
 
    this.setState({ route: route });
  }
  render() {
    return (
      <div className="App">
        {/* <Particles className='particles'
          params={particlesOptions}
           /> */}
        
                    
        <Navigation onRouteChange={this.onRouteChange}/>
        { this.state.route === 'home'
          ? 
             <div>
              <Logo />
              <Rank />
              <ImageLinkForm
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit}
              />
              <FaceRecognition imageUrl={this.state.imageUrl}/>
          </div>
          : (
             this.state.route === 'signin'
              ? <SignIn onRouteChange={this.onRouteChange} />
              : <Register onRouteChange={this.onRouteChange}/>
            )
        }
      </div>
    );
  }
}

export default App;
