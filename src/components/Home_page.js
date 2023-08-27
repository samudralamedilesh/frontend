import React from 'react'
import {useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import "../App.css";
import axios from 'axios';
import Navbar from './Navbar.js';


const Home_page = () =>{
    const[countq, setcountq] = useState('');
    const[counta, setcounta] = useState('');
    const[countb, setcountb] = useState('');
    const[countu, setcountu] = useState('');
    
    const getCount =async(req,res)=>{
        try{
            // const config = {
            //     headers: {
            //       'Content-Type': 'application/json',
            //     },
            //   };
        
            const res = await axios.get("http://16.171.208.191:5000/api/count/questioncount");
            // console.log(res.data.count);
            setcountq(res.data.count);
        }
        catch (error) {
            console.error('Error submitting question:', error);
          }
    }
    const getCounta =async(req,res)=>{
        try{
            // const config = {
            //     headers: {
            //       'Content-Type': 'application/json',
            //     },
            //   };
        
            const res = await axios.get("http://16.171.208.191:5000/api/count/answerscount");
            // console.log(res.data.counta);
            setcounta(res.data.counta);
        }
        catch (error) {
            console.error('Error submitting question:', error);
          }
    }
    const getCountb =async(req,res)=>{
        try{
            // const config = {
            //     headers: {
            //       'Content-Type': 'application/json',
            //     },
            //   };
        
            const res = await axios.get("http://16.171.208.191:5000/api/count/blogscount");
            // console.log(res.data.countb);
            setcountb(res.data.countb);
        }
        catch (error) {
            console.error('Error submitting question:', error);
          }
    }

    const getCountu =async(req,res)=>{
        try{
            // const config = {
            //     headers: {
            //       'Content-Type': 'application/json',
            //     },
            //   };
        
            const res = await axios.get("http://16.171.208.191:5000/api/count/userscount");
            // console.log(res.data.countu);
            setcountu(res.data.countu);
        }
        catch (error) {
            console.error('Error submitting question:', error);
          }
    }
    useEffect(()=>{
        getCount();
        getCounta();
        getCountb();
        getCountu();
    },[getCount,getCounta,getCountb, getCountu]);
return(
    <>
        <div className="Home_screen">
        <Navbar/>
        <div className="firstpage">
            <div className="text_front">
            <div className="translucent-box">
                  <p>"Discover, Explore, and Share Your World: Your Blogging Journey Starts Here!"</p>
                  <p>Your story may inspire millions towards their dreams!!</p>
              </div>
              <div className="Ask_a_question">
                {localStorage.getItem("token")?<Link to="/writeblog"><button className="chat-button" ><span>GET STARTED </span></button></Link>:<Link to="/login"><button className="chat-button" ><span>GET STARTED </span></button></Link>}
                
              </div>
              <div className="reports">
                <h3>No.of Users Registered: {countu}</h3>
                {/* <h3>No.of Questions asked: {countq}</h3> */}
                {/* <h3>No.of Responses recorded: {counta}</h3> */}
                <h3>No.of Blogs recorded: {countb}</h3>
              </div>
            </div>
        </div>
        
        </div>
    </>
)
}
export default Home_page