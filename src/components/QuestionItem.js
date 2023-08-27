

import React ,{ useContext, useState }from 'react';
// import questionContext from '../context questions/questionContext';
import answerContext from '../context questions/answerContext';
import AnswerState from '../context questions/AnswerState';
import axios from 'axios';

const QuestionItem = ({ questions }) => {
  const [formData, setFormData] = useState({ username: '', questionId: '', answer: '' });

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
      username: user,
      answer: formData.answer,
      questionId: formData.questionId,
    };
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      await axios.post('http://16.171.208.191:5000/api/answer/uploadanswer', data, config);
      alert('Answer Submitted');
    } catch (error) {
      console.error('Error submitting answer:', error);
    }
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (!questions || questions.length === 0) {
    return <p>No questions found!</p>;
  }

  return (
    <div className="container">
      <div className="accordion" id="accordionExample">
        {questions.map((qs) => (
          <div className="accordion-item" key={qs._id}>
            <h2 className="accordion-header">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse${qs._id}`}
                  aria-expanded="false"
                  aria-controls={`collapse${qs._id}`}
                  style={{ marginRight: 'auto' }}
                >
                  <p style={{ fontWeight: '700' }}>{qs.username}({qs.role})</p> <p> : {qs.question} ({qs.date.slice(0, 10)})</p>
                </button>
                <div>
                  <button
                    className="btn btn-primary"
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => setFormData({ ...formData, questionId: qs._id })}
                  >
                    Answer
                  </button>
                </div>
              </div>
            </h2>
            <div
              id={`collapse${qs._id}`}
              className="accordion-collapse collapse"
              aria-labelledby={`heading${qs._id}`}
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <AnswerState questionId={qs._id}>
                  <AnswerList />
                </AnswerState>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modaltitle" id="exampleModalLabel">Write Answer</h5>
              <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <textarea
                className="form-control"
                name="answer"
                value={formData.answer}
                onChange={onChange}
                placeholder="Type your answer..."
              />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={onSubmit}>Submit Answer</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AnswerList = () => {
  const context2 = useContext(answerContext);
  const { answers } = context2;

  if (!answers || answers.length === 0) {
    return <p>No Responses found!</p>;
  }

  return (
    <ul>
      <h3>Responses</h3>
      {answers.map((answer) => (
        <>
          <div key={answer._id}><strong>{answer.username}</strong> ({answer.role}) : {answer.answer} ({answer.date.slice(0,10)})</div>
          <div>-------------------------------------------------------------------------------------------------------------------------------------------
          </div>
        </>
      ))}
    </ul>
  );
};

export default QuestionItem;






