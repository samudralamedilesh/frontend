

import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import questionContext from '../context questions/questionContext';
import Navbar from './Navbar';
import axios from 'axios';
import QuestionItem from './QuestionItem';
import blog from '../onimage-removebg-preview (2).png';

const Ask = () => {
  const context = useContext(questionContext);
  const { questions, getQuestions } = context;

  useEffect(() => {
    getUserRole();
    getQuestions();
  }, [getQuestions]);

  const [formData, setFormData] = useState({ question: '', username: '' });
  const [userRole, setUserRole] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const getUserRole = async () => {
    try {
      const config = {
        headers: {
          'auth-token': localStorage.getItem('token'),
        },
      };

      const res = await axios.get('http://16.171.208.191:5000/api/auth/getuser', config);
      setUserRole(res.data.role);
    } catch (error) {
      console.error('Error getting user role:', error);
    }
  };

  const getUser = async () => {
    try {
      const config = {
        headers: {
          'auth-token': localStorage.getItem('token'),
        },
      };

      const res = await axios.get('http://16.171.208.191:5000/api/auth/getuser', config);
      return res.data.username;
    } catch (error) {
      console.error('Error getting user:', error);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const user = await getUser();

    const data = {
      question: formData.question,
      username: user,
    };

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      await axios.post('http://16.171.208.191:5000/api/question/uploadquestion', data, config);
      alert('Question Submitted');
    } catch (error) {
      console.error('Error submitting question:', error);
    }
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSearchChange = (e) => {
    setSearchQuery(e.target.value);
    
  };

  const filteredQuestions = questions.filter((question) =>
    question.question.toLowerCase().includes(searchQuery.toLowerCase())
    
  );
  

  return (
    <>
      <Navbar />
      {localStorage.getItem('token') ? (
        <div className="ask_page">
          <h2 className="Questions_text">Questions</h2>
          <div className="search_bar">
            <input
              className="search_input"
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={onSearchChange}
            />
          </div>
          <QuestionItem questions={filteredQuestions} />
          {userRole !== 'Tutor' && (
            <div className="chat_box">
              <input
                className="ask_input"
                type="text"
                placeholder="Type your question..."
                name="question"
                onChange={onChange}
              />
              <button className="ask_button" type="button" onClick={onSubmit}>
                Submit
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="ask_page_nouser">
          <div className="asktext">
            <p className="text_inside_p">Which<br /> "Course"<br />to<br />Choose ?</p>
          </div>
          <img className="blog_img"src={blog} />
          <div className="asktext2">
            <p className="text_inside_p "><Link className="onpage_login" to='/login'>LOGIN</Link><br /> to<br />clear<br />Queries</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Ask;
