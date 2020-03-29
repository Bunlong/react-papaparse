import React from 'react'

import Welcome from '../src/components/screens/indexes/Welcome'
import Navbar from '../src/components/screens/indexes/Navbar'
import Feature from '../src/components/screens/indexes/Feature'
import Framework from '../src/components/screens/indexes/Framework'
import Love from '../src/components/screens/indexes/Love'
import CSVParsing from '../src/components/screens/indexes/CSVParsing'
import Delimiter from '../src/components/screens/indexes/Delimiter'
import LocalFile from '../src/components/screens/indexes/LocalFile'
import RemoteFile from '../src/components/screens/indexes/RemoteFile'
import Stream from '../src/components/screens/indexes/Stream'
import Worker from '../src/components/screens/indexes/Worker'
import Header from '../src/components/screens/indexes/Header'
import TypeConversion from '../src/components/screens/indexes/TypeConversion'
import Comment from '../src/components/screens/indexes/Comment'
import Error from '../src/components/screens/indexes/Error'
import Unparse from '../src/components/screens/indexes/Unparse'
import Download from '../src/components/screens/indexes/Download'

const Index = () => {
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
        <Download />
      </main>
    </>
  )
}

export default Index
