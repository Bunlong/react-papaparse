import React from 'react';

import Navbar from '../src/components/screens/docs/Navbar';
import Documentation from '../src/components/screens/docs/Documentation';
import CSVToJSON from '../src/components/screens/docs/CSVToJSON';
import JSONToCSV from '../src/components/screens/docs/JSONToCSV';
import Config from '../src/components/screens/docs/Config';
import Result from '../src/components/screens/docs/Result';
import Extra from '../src/components/screens/docs/Extra';
import CSVDownloader from '../src/components/screens/docs/CSVDownloader';

const Docs = () => {
  return (
    <main>
      <Navbar />
      <Documentation />
      <main>
        <CSVToJSON />
        <JSONToCSV />
        <Config />
        <Result />
        <Extra />
        <CSVDownloader />
      </main>
    </main>
  );
};

export default Docs;
