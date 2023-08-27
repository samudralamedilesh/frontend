import React ,{useState, useContext, useEffect} from 'react';
import { Link} from 'react-router-dom';
import Navbar from './Navbar.js';
import axios from "axios"
import blogContext from '../context blogs/blogContext';
import BlogItem from './BlogItem';
import blog from '../pexels-karolina-grabowska-8106679 (2).jpg'

const WriteBlog= () =>{
    const context = useContext(blogContext)
    const {blogs, getBlogs} = context;

    useEffect(()=>{
        getBlogs();
    },[getBlogs]);

    // console.log("Blogs",blogs)

    const [formData,setFormData] = useState({blog:'',username:''});
    const getUser = async()=>{
        try{
        const config = {
            headers:{
                "auth-token":localStorage.getItem('token')
            },
        };

        const res = await axios.get('http://16.171.208.191:5000/api/auth/getuser',config)
        return res.data.username;

        }catch(error){
            console.error('Error getting user:', error);
        }

    };
    

    const onSubmit = async(e)=>{
        e.preventDefault();

        const user = await getUser();

        const data ={
            blog: formData.blog,
            username: user,
        };

        try{
        const config = {
            headers:{
                "Content-Type":"application/json",
            },
        };
        await axios.post('http://16.171.208.191:5000/api/blog/uploadblog',data,config);
        alert("Blog Submitted");
    }catch(error){
        console.log('Error submitting blog:',error);
    }
    };
    
    const onChange = async(e)=>{
        
        setFormData({...formData,[e.target.name]:e.target.value});
    };
    const [textColor, setTextColor] = useState('white');

  useEffect(() => {
    const interval = setInterval(() => {
      setTextColor(prevColor => prevColor === 'white' ? '#000000' : 'white');
    }, 2000);
    return () => clearInterval(interval);
  }, []);

    
return(
    <>
    
    <Navbar/>
    {localStorage.getItem('token')?
    <div className="blog_page">
    <h2 className="Questions_text">Blogs</h2>
    <BlogItem blog={formData}/>
    <div className="chat_box">
        <input className="ask_input" type="text" placeholder="Type your Blog..." name = 'blog' onChange={onChange}/>
        <button className="ask_button" type="button" onClick={onSubmit}>Submit
        </button>
    </div>
    </div>
    :<div className="blog_page_nouser">
        <div className="asktext">
        <p className="text_inside_bp" style={{ color: textColor }}>Know stories<br/> and<br/>Get Inspired</p>
        </div>
        {/* <img className="ask_img" src={blog}/>  */}
        
      </div>} 
    
    </>
); 
}

export default WriteBlog;