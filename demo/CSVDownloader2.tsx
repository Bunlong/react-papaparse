import React from 'react';

import { useCSVDownloader } from 'react-papaparse';

export default function CSVDownloader() {
  const { CSVDownloader, Type } = useCSVDownloader();

  return (
    <CSVDownloader
      type={Type.Link}
      filename={'filename'}
      bom={true}
      data={`Column 1,Column 2,Column 3,Column 4
1-1,1-2,1-3,1-4
#2-1,मुकेश,ខ្ញុំ,2-4
3-1,3-2,អ្នក,3-4
4,5,6,7`}
    >
      Download
    </CSVDownloader>
  );
}
