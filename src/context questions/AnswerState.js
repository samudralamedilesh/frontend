import React, { useState, useEffect } from 'react';
import answerContext from './answerContext';
import axios from 'axios';

const AnswerState = (props) => {
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    getAnswers(props.questionId);
  }, [props.questionId]);

  const getAnswers = async (questionId) => {
    try {
      const response = await axios.get(`http://16.171.208.191:5000/api/answer/getanswers/${questionId}`);
      const fetchedAnswers = response.data.answers;
      setAnswers(fetchedAnswers);
      // console.log(response.data);
      // console.log(fetchedAnswers);
    } catch (error) {
      console.error('Error fetching answers:', error);
    }
  };

  return (
    <answerContext.Provider value={{ answers: answers, getAnswers: getAnswers }}>
      {props.children}
    </answerContext.Provider>
  );
};

export default AnswerState;
