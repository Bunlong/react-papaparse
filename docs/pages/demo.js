import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Prism from 'prismjs';

const DynamicComponentWithNoSSR = dynamic(
  () => import('../src/components/screens/Demo'),
  { ssr: false },
);

const Demo = () => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <>
      <DynamicComponentWithNoSSR />
    </>
  );
};

export default Demo;
