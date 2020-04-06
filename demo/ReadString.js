import React, { Component } from 'react'
import { readString } from 'react-papaparse'

export default class ReadString extends Component {
  handleClick = () => {
    const str = `Column 1,Column 2,Column 3,Column 4
1-1,1-2,1-3,1-4
2-1,2-2,2-3,2-4
3-1,3-2,3-3,3-4
4,5,6,7`

    const results = readString(str)

    console.log('--------------------------------------------------')
    console.log(results)
    console.log('--------------------------------------------------')
  }

  render() {
    return (
      <button onClick={this.handleClick}>readString</button>
    )
  }
}
