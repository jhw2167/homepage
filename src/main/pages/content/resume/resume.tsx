import React from 'react';
import { Document, Page } from 'react-pdf';

import resume from './resume.pdf';

export default function resume() {
  return (
    <Document file={resume}>
      <Page pageNumber={1} />
    </Document>
  );
}