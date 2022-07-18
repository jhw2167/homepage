import React from 'react';
import { Document, Page } from 'react-pdf';

import res from './resume.pdf';

function Resume() {
  return (
    <Document file={res}>
      <Page pageNumber={1} />
    </Document>
  );
}

export default Resume;