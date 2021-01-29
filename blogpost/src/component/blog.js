import React from 'react';
import axios from 'axios';

 class Blog extends React.Component{
   constructor(props){
       super(props);
       this.author=this.props.author;
    
   }
   state={blogs:[],title:'',content:''}

  componentDidMount() {
    //   let author=document.getElementById('profile').textContent;
    axios.get(`https://cors-anywhere.herokuapp.com/https://600e587a3bb1d100179dee45.mockapi.io/blogs`,{ crossdomain: true })
      .then(res => {
        // console.log(res.data);
        this.setState({blogs:res.data});
      })
  }
  onDelete=event=>{
      event.preventDefault();
      const id=event.target.id.value;
      axios.delete('https://cors-anywhere.herokuapp.com/https://600e587a3bb1d100179dee45.mockapi.io/blogs/'+id)
      .then(res=>{
        //   console.log(res.data);
          alert("Post Deleted");
      })
  }
  onChangeHandler=event=>{
      const nam=event.target.name;
      const val=event.target.value;
      this.setState({[nam]:val});
  }
  onSubmitPostHandler=event=>{
      event.preventDefault();
      let title=this.state.title;
      let content=this.state.content;
      let id=document.getElementById('id').textContent;
        axios.put('https://cors-anywhere.herokuapp.com/https://600e587a3bb1d100179dee45.mockapi.io/blogs/'+id,{title,content})
      .then(res=>{
        //   console.log(res.data);
          alert("blog updated");
          window.location.assign('http://localhost:3000/');
      })
  }

  
  updateBlog(id){
      alert(id);      
      document.getElementById('update').style.display="";
      document.getElementById('id').innerHTML=id;
  }

   render(){
       return(
           <div className="blogs-list">
               <p style={{display:"none"}} id="id"></p>
               <form id="update" style={{display:"none"}} onSubmit={this.onSubmitPostHandler}>
                    Title:<input type="text" name="title" onChange={this.onChangeHandler}/><br></br>
                    Content:<input type="text" name="content" onChange={this.onChangeHandler}/>
                    <button type="submit">Post</button>
                </form>
             {this.state.blogs.map(blog=>
             <div key={blog.id} className="blogs-list-item">
                 <div>ID:{blog.id}</div><div>TITLE:{blog.title}</div>
                 <div>{blog.content}</div><div>AUTHOR:{blog.author}</div>
                 <form onSubmit={this.onDelete}>
                     <input type="hidden" name="id" value={blog.id} readOnly/>
                 <button type="submit">Delete</button></form>
                 <button onClick={()=>this.updateBlog(blog.id)}>Update</button>
            </div>)}
           </div>
       );
   }
}
export default Blog;