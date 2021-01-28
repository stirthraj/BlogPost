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
    console.log(response.data);
    const blogs=response.data;
    this.setState({blogs});
  })
}

  

  render(){
  return (
    <div className="App">
      <div className="App-header"><div>BLOG CENTER</div>
      <Router>
      <div><Link to="/admin">Admin</Link></div>
      <div><Link to="/">Main Page</Link></div>
      <Switch>
        <Route path="/admin">
          <Admin/>
        </Route>
        <Route path="/">
        </Route>
      </Switch>
      </Router>
      
      </div>
      <Card id="main-page-content">
          <h1>Blog Gallery</h1>
          <div className="blogs-list">
             {this.state.blogs.map(blog=>
             <div key={blog.id} className="blogs-list-item">
                 <div>ID:{blog.id}</div><div>TITLE:{blog.title}</div>
                 <div>{blog.content}</div><div>AUTHOR:{blog.author}</div>
            </div>)}
           </div>
      </Card>
      <Card className="App-footer">Footer</Card>
    </div>
  );}
  //render function end
}
export default App;
