// import Link from 'next/link'
// import Layout from '../components/Layout'

// const IndexPage = () => (
//   <Layout title="Home | Next.js + TypeScript Example">
//     <h1>Hello Next.js 👋</h1>
//     <p>
//       <Link href="/about">
//         <a>About</a>
//       </Link>
//     </p>
//   </Layout>
// )

// export default IndexPage

// import React from 'react'

// import Welcome from '../src/components/screens/indexes/Welcome'
// import Navbar from '../src/components/screens/indexes/Navbar'
// import Feature from '../src/components/screens/indexes/Feature'
// import Framework from '../src/components/screens/indexes/Framework'
// import Love from '../src/components/screens/indexes/Love'
// import CSVParsing from '../src/components/screens/indexes/CSVParsing'
// import Delimiter from '../src/components/screens/indexes/Delimiter'
// import LocalFile from '../src/components/screens/indexes/LocalFile'
// import RemoteFile from '../src/components/screens/indexes/RemoteFile'
// import Stream from '../src/components/screens/indexes/Stream'
// import Worker from '../src/components/screens/indexes/Worker'
// import Header from '../src/components/screens/indexes/Header'
// import TypeConversion from '../src/components/screens/indexes/TypeConversion'
// import Comment from '../src/components/screens/indexes/Comment'
// import Error from '../src/components/screens/indexes/Error'
// import Unparse from '../src/components/screens/indexes/Unparse'
// import Download from '../src/components/screens/indexes/Download'

// const Index = () => {
//   return (
//     <>
//       <Welcome />
//       <main>
//         <Navbar />
//         <Feature />
//         <Framework />
//         <Love />
//         <CSVParsing />
//         <Delimiter />
//         <LocalFile />
//         <RemoteFile />
//         <Stream />
//         <Worker />
//         <Header />
//         <TypeConversion />
//         <Comment />
//         <Error />
//         <Unparse />
//         <Download />
//       </main>
//     </>
//   )
// }

// export default Index

// ======================================================

// ======================================================

// import React from 'react'
// import { readString } from 'react-papaparse'

// export default class CSVReader extends React.Component {
//   handleClick = () => {
//     const str = `Column 1,Column 2,Column 3,Column 4
// 1-1,1-2,1-3,1-4
// 2-1,2-2,2-3,2-4
// 3-1,3-2,3-3,3-4
// 4,5,6,7`

//     const results = readString(str)

//     console.log('---------------------------')
//     console.log(results)
//     console.log('---------------------------')
//   }

//   render() {
//     return (
//       <button onClick={this.handleClick}>readString</button>
//     )
//   }
// }

// ======================================================

// import React from 'react'
// import { jsonToCSV } from 'react-papaparse'

// export default class CSVReader extends React.Component {
//   handleClick = () => {
//     const jsonData = `[
//   {
//     "Column 1": "1-1",
//     "Column 2": "1-2",
//     "Column 3": "1-3",
//     "Column 4": "1-4"
//   },
//   {
//     "Column 1": "2-1",
//     "Column 2": "2-2",
//     "Column 3": "2-3",
//     "Column 4": "2-4"
//   },
//   {
//     "Column 1": "3-1",
//     "Column 2": "3-2",
//     "Column 3": "3-3",
//     "Column 4": "3-4"
//   },
//   {
//     "Column 1": 4,
//     "Column 2": 5,
//     "Column 3": 6,
//     "Column 4": 7
//   }
// ]`

//     const results = jsonToCSV(jsonData)

//     console.log('---------------------------')
//     console.log(results)
//     console.log('---------------------------')
//   }

//   render() {
//     return (
//       <button onClick={this.handleClick}>jsonToCSV</button>
//     )
//   }
// }

// ======================================================

// import React from 'react'
// import { readRemoteFile } from 'react-papaparse'

// export default class Index extends React.Component {
//   handleClick = () => {
//     readRemoteFile('https://react-papaparse.js.org/static/csv/normal.csv', {
//       complete: (results) => {
//         console.log('Results:', results)
//       }
//     })
//   }

//   render() {
//     return (
//       <button onClick={this.handleClick}>readRemoteFile</button>
//     )
//   }
// }

// ======================================================

// import React from 'react'
// import { CSVReader } from 'react-papaparse'

// const buttonRef: any = React.createRef<HTMLDivElement>()

// export default class Index extends React.Component {
//   handleOpenDialog = (e) => {
//     // Note that the ref is set async, so it might be null at some point 
//     if (buttonRef.current) {
//       buttonRef.current.open(e)
//     }
//   }
  
//   handleOnFileLoad = (data) => {
//     console.log('---------------------------')
//     console.log(data)
//     console.log('---------------------------')
//   }

//   handleOnDrop = (data) => {
//     console.log('---------------------------')
//     console.log(data)
//     console.log('---------------------------')
//   }

//   handleOnError = (err, file, inputElem, reason) => {
//     console.log(err)
//   }

//   handleOnRemoveFile = (data) => {
//     console.log('---------------------------')
//     console.log(data)
//     console.log('---------------------------')
//   }

//   handleRemoveFile = (e) => {
//     // Note that the ref is set async, so it might be null at some point
//     if (buttonRef.current) {
//       buttonRef.current.removeFile(e)
//     }
//   }

//   render() {
//     return (
//       <CSVReader
//         ref={buttonRef}
//         onFileLoad={this.handleOnDrop}
//         onError={this.handleOnError}
//         noClick
//         noDrag
//         onRemoveFile={this.handleOnRemoveFile}
//       >
//         {({ file }) => (
//           <aside
//             style={{
//               display: 'flex',
//               flexDirection: 'row',
//               marginBottom: 10
//             }}
//           >
//             <button
//               type='button'
//               onClick={this.handleOpenDialog}
//               style={{
//                 borderRadius: 0,
//                 marginLeft: 0,
//                 marginRight: 0,
//                 width: '40%',
//                 paddingLeft: 0,
//                 paddingRight: 0
//               }}
//             >
//               Browe file
//             </button>
//             <div
//               style={{
//                 borderWidth: 1,
//                 borderStyle: 'solid',
//                 borderColor: '#ccc',
//                 height: 45,
//                 lineHeight: 2.5,
//                 marginTop: 5,
//                 marginBottom: 5,
//                 paddingLeft: 13,
//                 paddingTop: 3,
//                 width: '60%'
//               }}
//             >
//               {file && file.name}
//             </div>
//             <button
//               style={{
//                 borderRadius: 0,
//                 marginLeft: 0,
//                 marginRight: 0,
//                 paddingLeft: 20,
//                 paddingRight: 20
//               }}
//               onClick={this.handleRemoveFile}
//             >
//               Remove
//             </button>
//           </aside>
//         )}
//       </CSVReader>
//     )
//   }
// }

// ======================================================

// import React from 'react'
// import { CSVReader } from 'react-papaparse'

// export default class Index extends React.Component {
//   handleOnDrop = (data: any) => {
//     console.log('---------------------------')
//     console.log(data)
//     console.log('---------------------------')
//   }

//   handleOnError = (err, file, inputElem, reason) => {
//     console.log(err)
//   }

//   handleOnRemoveFile = (data: any) => {
//     console.log('---------------------------')
//     console.log(data)
//     console.log('---------------------------')
//   }

//   render() {
//     return (
//       <>
//         <CSVReader
//           onDrop={this.handleOnDrop}
//           onError={this.handleOnError}
//           addRemoveButton
//           onRemoveFile={this.handleOnRemoveFile}
//         >
//           <span>Drop CSV file here or click to upload.</span>
//         </CSVReader>
//       </>
//     )
//   }
// }

// ======================================================

// import React from 'react'
// import { CSVReader } from 'react-papaparse'

// export default class Index extends React.Component {
//   handleOnDrop = (data: any) => {
//     console.log('---------------------------')
//     console.log(data)
//     console.log('---------------------------')
//   }

//   handleOnError = (err, file, inputElem, reason) => {
//     console.log(err)
//   }

//   handleOnRemoveFile = (data: any) => {
//     console.log('---------------------------')
//     console.log(data)
//     console.log('---------------------------')
//   }

//   render() {
//     return (
//       <>
//         <CSVReader
//           onDrop={this.handleOnDrop}
//           onError={this.handleOnError}
//           noClick
//           addRemoveButton
//           onRemoveFile={this.handleOnRemoveFile}
//         >
//           <span>Drop CSV file here to upload.</span>
//         </CSVReader>
//       </>
//     )
//   }
// }

// ======================================================

import React from 'react'
import { CSVReader } from 'react-papaparse'


// export function Index {
//   handleOnDrop = (data: any) => {
//     console.log('---------------------------')
//     console.log(data)
//     console.log('---------------------------')
//   }

//   handleOnError = (
//     err: any,
//     // file,
//     // inputElem,
//     // reason
//   ) => {
//     console.log(err)
//   }

//   handleOnRemoveFile = (data: any) => {
//     console.log('---------------------------')
//     console.log(data)
//     console.log('---------------------------')
//   }

//   render() {
//     return (
//       <>
//         <CSVReader
//           onDrop={this.handleOnDrop}
//           onError={this.handleOnError}
//           // noDrag
//           addRemoveButton
//           onRemoveFile={this.handleOnRemoveFile}
//           style={{
//             dropArea: {
//               borderColor: 'pink',
//               borderRadius: 20,
//             },
//             dropAreaActive: {
//               borderColor: 'red',
//             },
//             dropFile: {
//               width: 100,
//               height: 120,
//               background: '#ccc',
//             },
//             fileSizeInfo: {
//               color: '#fff',
//               backgroundColor: '#000',
//               borderRadius: 3,
//               lineHeight: 1,
//               marginBottom: '0.5em',
//               padding: '0 0.4em',
//             },
//             fileNameInfo: {
//               color: '#fff',
//               backgroundColor: '#eee',
//               borderRadius: 3,
//               fontSize: 14,
//               lineHeight: 1,
//               padding: '0 0.4em',
//             },
//             removeButton: {
//               color: 'blue',
//             },
//             progressBar: {
//               backgroundColor: 'pink',
//             },
//           }}
//         >
//           <span>Click to upload.</span>
//         </CSVReader>
//       </>
//     )
//   }
// }

// ======================================================


const Index = () => {
  const handleOnDrop = (data: any) => {
    console.log('---------------------------')
    console.log(data)
    console.log('---------------------------')
  }

  const handleOnError = (
    err: any,
    // file,
    // inputElem,
    // reason
  ) => {
    console.log(err)
  }

  const handleOnRemoveFile = (data: any) => {
    console.log('---------------------------')
    console.log(data)
    console.log('---------------------------')
  }

  return (
    <>
      <CSVReader
        onDrop={handleOnDrop}
        onError={handleOnError}
        // noDrag
        addRemoveButton
        onRemoveFile={handleOnRemoveFile}
        style={{
          dropArea: {
            borderColor: 'pink',
            borderRadius: 20,
          },
          dropAreaActive: {
            borderColor: 'red',
          },
          dropFile: {
            width: 100,
            height: 120,
            background: '#ccc',
          },
          fileSizeInfo: {
            color: '#fff',
            backgroundColor: '#000',
            borderRadius: 3,
            lineHeight: 1,
            marginBottom: '0.5em',
            padding: '0 0.4em',
          },
          fileNameInfo: {
            color: '#fff',
            backgroundColor: '#eee',
            borderRadius: 3,
            fontSize: 14,
            lineHeight: 1,
            padding: '0 0.4em',
          },
          removeButton: {
            color: 'blue',
          },
          progressBar: {
            backgroundColor: 'pink',
          },
        }}
      >
        <span>Click to upload.</span>
      </CSVReader>
    </>
  )
}

export default Index