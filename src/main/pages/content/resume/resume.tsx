import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';

import res from './resume.pdf';

function Resume() {
  return (
    <Document file={res}>
      <Page pageNumber={1} />
    </Document>
  );
}

export default Resume;