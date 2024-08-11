import React from 'react';

const Framework = () => {
  return (
    <section>
      <div className="grid-container narrow-grid">
        <div className="grid-100">
          <h3>Frameworks</h3>
          <p>
            react-papaparse strongly support{' '}
            <a href="https://nextjs.org" target="blank">
              Next.js
            </a>{' '}
            and other React frameworks. react-papaparse is the fastest React CSV
            parser for the browser (only works in the browser), so you need to
            set the component with no SSR (server-side render){' '}
            <b>
              in case you use <code>readRemoteFile</code> function
            </b>
            .
          </p>
          <div>
            <ul>
              <li>
                <a
                  href="https://nextjs.org/docs/advanced-features/dynamic-import#with-no-ssr"
                  target="blank"
                >
                  Next.js — component with no SSR
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Framework;
