import React from 'react';
import axios from 'axios';
import Blog from './blog';

class Admin extends React.Component{
    constructor(props){
        super(props);
        this.state={name:'',
                    title:'',
                    content:''};
    }
    onChangeHandler=event=>{
        const nam=event.target.name;
        const val=event.target.value;
        this.setState({[nam]:val});
    }
    
    onSubmitHandler=event=>{
        event.preventDefault();
        const author=this.state.name;

        axios.post('https://cors-anywhere.herokuapp.com/https://600e587a3bb1d100179dee45.mockapi.io/username',{author})
        .then(response=>{
            // console.log(response.data);
            alert("Account Created");
        });
    }
    onSubmitLoginHandler=event=>{
        event.preventDefault();
        const author=this.state.name;

        axios.get('https://cors-anywhere.herokuapp.com/https://600e587a3bb1d100179dee45.mockapi.io/username')
        .then(res=>{
            // console.log(res.data);
            let i=0;
            for(i;i<res.data.length;i++)
            {
                if(res.data[i].author===author){
                    document.getElementById('profile').innerHTML="Login as: "+author;
                    document.getElementById('blog_add_1').style.display="block";
                break;}
                else if((res.data.length-1)===i){alert('Invalid Credentials');}
            }
        })
    }

        onSubmitPostHandler=event=>{
        event.preventDefault();
        const author=this.state.name;
        const title=this.state.title;
        const content=this.state.content;
        const img="https://picsum.photos/id";

        axios.post('https://cors-anywhere.herokuapp.com/https://600e587a3bb1d100179dee45.mockapi.io/blogs',{author,title,content,img})
        .then(res=>{
            // console.log(res.data);
            alert('blog added');
        })
    }
    render(){
        return(<div className="blogs">
            <div className="form">Register
                <form onSubmit={this.onSubmitHandler}>
                    Name:<input type="text" name="name" onChange={this.onChangeHandler}/>
                    <button type="submit">Register</button>
                </form>
            </div>

            <div id="profile" className="form">Login
                <form onSubmit={this.onSubmitLoginHandler}>
                    Name:<input type="text" name="name" onChange={this.onChangeHandler}/>
                    <button type="submit">Login</button>
                </form>
            </div>

            <div style={{display:"none"}} id="blog_add_1" className="form">Now, Write Your Blog here
                <form onSubmit={this.onSubmitPostHandler}>
                    {/* <input type="text" name="name"  onChange={this.onChangeHandler}/> */}
                    Title:<input type="text" name="title" onChange={this.onChangeHandler}/><br></br>
                    Content:<input type="text" name="content" onChange={this.onChangeHandler}/>
                    <button type="submit">Post</button>
                </form>
            </div>

            <Blog author={this.state.name}/>
            

        </div>)
    }

}
export default Admin;