import React, { Component } from 'react'
import dynamic from 'next/dynamic'

const DynamicComponentWithNoSSR = dynamic(
  () => import('../src/components/screens/Demo'),
  { ssr: true }
)

export default class Demo extends Component {
  
  render() {
    return (
      <>
        <DynamicComponentWithNoSSR />
      </>
    )
  }
}
