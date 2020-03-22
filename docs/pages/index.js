import React from 'react'

import Welcome from '../src/components/screens/indexes/Welcome'
import Navbar from '../src/components/screens/indexes/Navbar'
import Feature from '../src/components/screens/indexes/Feature'
import Framework from '../src/components/screens/indexes/Framework'
import Download from '../src/components/screens/indexes/Download'
import CSVParsing from '../src/components/screens/indexes/CSVParsing'
import DelimiterDetection from '../src/components/screens/indexes/DelimiterDetection'
import LocalFile from '../src/components/screens/indexes/LocalFile'

const Index = () => {
  return (
    <>
      <Welcome />
      <main>
        <Navbar />
        <Feature />
        <Framework />
        <Download />
        <CSVParsing />
        <DelimiterDetection />
        <LocalFile />
      </main>
    </>
  )
}

export default Index
