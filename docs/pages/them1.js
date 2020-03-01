import React, { Component } from 'react'

import { CSVReader } from 'react-papaparse'

const buttonRef = React.createRef()

export default class Them1 extends Component {

  constructor(props) {
    super(props)
  }

  onDrop = (data) => {
    console.log('======================')
    console.log(data)
    console.log('======================')
  }

  onError = (error) => {

  }

  openDialog = (e) => {
    // Note that the ref is set async, so it might be null at some point 
    if (buttonRef.current) {
      buttonRef.current.open(e)
    }
  }
  
  render() {
    return (
      <>
        <main>
          <div className="grid-container">
            <div className="grid-66">
              <CSVReader
                onDrop={this.onDrop}
                noClick={true}
                noDrag={true}
                ref={buttonRef}
                config={{}}
              >
                {({file}) => (
                  <>
                    <aside style={{display: 'flex', flexDirection: 'row', marginBottom: 10}}>
                      <button
                        type="button"
                        onClick={this.openDialog}
                        style={{
                          width: '30%',
                          borderRadius: 0,
                          marginLeft: 0,
                          marginRight: 0,
                        }}
                      >
                        Browe file
                      </button>
                      <div style={{
                          width: '70%',
                          height: 45,
                          borderWidth: 1,
                          borderStyle: 'solid',
                          borderColor: '#ccc',
                          marginTop: 5,
                          marginBottom: 5,
                          paddingLeft: 13,
                          paddingTop: 3,
                          lineHeight: 2.2,
                        }}
                      >
                        {file.name}
                      </div>
                    </aside>
                  </>
                )}
              </CSVReader>
            </div>
          </div>
        </main>
      </>
    )
  }
}
