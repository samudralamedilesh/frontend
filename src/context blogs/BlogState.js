import React, { useEffect, useState } from 'react';
import blogContext from './blogContext';
import axios from 'axios';

const BlogState = (props) => {
  const [blogs, setBlogs] = useState([]);

  const getBlogs = async () => {
    try {
      const response = await axios.get('http://16.171.208.191:5000/api/blog/getblogs');
      const fetchedBlogs = response.data.output;
      setBlogs(fetchedBlogs);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };
  useEffect(() => {
    getBlogs();
  }, []);


  return (
    <blogContext.Provider value={{ blogs, getBlogs }}>
      {props.children}
    </blogContext.Provider>
  );
};

export default BlogState;
