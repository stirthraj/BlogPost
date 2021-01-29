import './App.css';
import {Card} from 'antd';
import React from 'react';
import axios from 'axios';
import {BrowserRouter as Router,Route,Link,Switch} from 'react-router-dom';
import Admin from './component/admin';



class App extends React.Component {
  
  state={
    blogs:[]
  }

 componentDidMount(){
  axios.get('https://600e587a3bb1d100179dee45.mockapi.io/blogs')
  .then(response=>{
    // console.log(response.data);
    const blogs=response.data;
    this.setState({blogs});
  })
}

  

  render(){
  return (
    <div className="App">
      <div style={{backgroundColor: "#a1bcdf"}}>
      <Router>
      <div className="nav">
      <div>BLOG CENTER</div>
      <div><Link to="/admin">Admin</Link></div>
      <div><Link to="/">Main Page</Link></div>
      </div>
      <div className="nav-content">
      <Switch>
        <Route path="/admin">
          <Admin/>
        </Route>
        <Route path="/">
        </Route>
      </Switch>
      </div>
      </Router>
      </div>
      <Card id="main-page-content">
          <h1>Blog Gallery</h1>
          <div className="blogs-list">
             {this.state.blogs.map(blog=>
             <div key={blog.id} className="blogs-list-item">
                 <div>{blog.id}.{blog.title}</div>
                 <div className="overlay">
                   <img src={blog.img+"/"+blog.id+"/200"} alt="img"/>
                   <div className="overlay-text">{blog.content}</div>
                   </div>
                 <div>Author:{blog.author}</div>
            </div>)}
           </div>
      </Card>
      <Card className="App-footer"><h1>BLOG CENTER</h1><h2>Write Your Story</h2><h3>Share Your Thought with other</h3></Card>
    </div>
  );}
  //render function end
}
export default App;
