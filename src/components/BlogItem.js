import React, { useContext} from 'react';
import blogContext from '../context blogs/blogContext'

const BlogItem = () => {
  const context = useContext(blogContext);
  
  const { blogs } = context;
  return(
    <>
    <div className="container">
    <div className="accordion" id="accordionExample">
      {blogs.map((qs) => (
        <div className="accordion-item" key={qs._id}>
          <h2 className="accordion-header">
            <button
              className="accordion-button custom-button"
              type="button"disabled
              data-bs-toggle="collapse"
              data-bs-target={`#collapse${qs._id}`}
              aria-expanded="false"
              aria-controls={`collapse${qs._id}`}
            >
              <strong>{qs.username}</strong> : {qs.blog} ({qs.date.slice(0,10)})<span className="my-1 mx-1" style={{fontWeight:'250'}}></span>
            </button>
          </h2>
          <div
            id={`collapse${qs._id}`}
            className="accordion-collapse collapse"
            aria-labelledby={`heading${qs._id}`}
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
            </div>
          </div>
        </div>
      ))}
    </div>
    </div>
    </>
  );
};

export default BlogItem;