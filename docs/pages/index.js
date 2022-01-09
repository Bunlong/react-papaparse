import React, { useEffect } from 'react';
import Prism from 'prismjs';

import Welcome from '../src/components/screens/indexes/Welcome';
import Navbar from '../src/components/screens/indexes/Navbar';
import Feature from '../src/components/screens/indexes/Feature';
import Framework from '../src/components/screens/indexes/Framework';
import Love from '../src/components/screens/indexes/Love';
import CSVParsing from '../src/components/screens/indexes/CSVParsing';
import Delimiter from '../src/components/screens/indexes/Delimiter';
import LocalFile from '../src/components/screens/indexes/LocalFile';
import RemoteFile from '../src/components/screens/indexes/RemoteFile';
import Stream from '../src/components/screens/indexes/Stream';
import Worker from '../src/components/screens/indexes/Worker';
import Header from '../src/components/screens/indexes/Header';
import TypeConversion from '../src/components/screens/indexes/TypeConversion';
import Comment from '../src/components/screens/indexes/Comment';
import Error from '../src/components/screens/indexes/Error';
import Unparse from '../src/components/screens/indexes/Unparse';
import CSVDownloader from '../src/components/screens/indexes/CSVDownloader';
import Download from '../src/components/screens/indexes/Download';

const Index = () => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <>
      <Welcome />
      <main>
        <Navbar />
        <Feature />
        <Framework />
        <Love />
        <CSVParsing />
        <Delimiter />
        <LocalFile />
        <RemoteFile />
        <Stream />
        <Worker />
        <Header />
        <TypeConversion />
        <Comment />
        <Error />
        <Unparse />
        <CSVDownloader />
        <Download />
      </main>
    </>
  );
};

export default Index;
