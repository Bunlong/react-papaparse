import React from 'react';

const Comment = () => {
  return (
    <section id="comments">
      <div className="grid-container narrow-grid">
        <div className="grid-100">
          <h4>Comments</h4>
          <h5>"I forgot to mention: my CSV files have comments in them."</h5>
          <p>
            Okay, first off: that's really weird. But fortunately, you can skip
            those lines... just specify the comment string.
          </p>
          <pre>
            <code className="language-javascript">
              {`// Mostly found in academia, some CSV files
// may have commented lines in them
readString(csvString, {
  worker: true,
  complete: (results) => {
    console.log(results)
  },
  comments: '#'
})`}
            </code>
          </pre>
        </div>
      </div>
    </section>
  );
};

export default Comment;
