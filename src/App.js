import './App.css';
import News from './components/News';
import NavBar from './components/NavBar';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'


import React, { Component } from 'react'

export default class App extends Component {
  // pageSize=[10]
  //  c = 'yash'
  APIKey=process.env.REACT_APP_NEWS_API
  state={
    progress:0
  }
 setProgress=(progress)=> {
  this.setState({progress:progress})
 }
  render() {
    return (
      <Router>
      <div>
        {/* hello my first class based Component{this.c} */}
        <NavBar/>
        <LoadingBar
        color='#f11946'
        progress={this.state.progress}
        // onLoaderFinished={() => setProgress(0)}
      />
        <Routes>
        <Route exact path="/home" element={<News setProgress={this.setProgress} APIKey={this.APIKey} key='General' pageSize={10} country='in' category='General'/>}></Route>
        <Route exact path="/" element={<News setProgress={this.setProgress} APIKey={this.APIKey} key='General' pageSize={10} country='in' category='General'/>}></Route>
        <Route exact path="/Business" element={<News setProgress={this.setProgress} APIKey={this.APIKey} key='business' pageSize={10} country='in' category='Business'/>}></Route>
        <Route exact path="/Sports"  element={<News setProgress={this.setProgress}  APIKey={this.APIKey} key='sports' pageSize={10} country='in' category='Sports'/>}></Route>
        <Route exact path="/Technology"  element={<News setProgress={this.setProgress} APIKey={this.APIKey} key='technology' pageSize={10} country='in' category='Technology'/>}></Route>
        <Route exact path="/Entertainment"  element={<News setProgress={this.setProgress} APIKey={this.APIKey} key='Entertainment' pageSize={10} country='in' category='Entertainment'/>}></Route>
        <Route exact path="/Health"  element={<News setProgress={this.setProgress} APIKey={this.APIKey} key='Health' pageSize={10} country='in' category='Health'/>}></Route>
        <Route exact path="/Science"  element={<News setProgress={this.setProgress} APIKey={this.state.APIKey} key='Science' pageSize={10} country='in' category='Science'/>}></Route>
        </Routes>
      </div>
      </Router>
    )
  }
}


