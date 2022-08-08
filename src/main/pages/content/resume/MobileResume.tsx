import { url } from 'inspector';
import React from 'react';
import Footer from '../../../narrowcomponents/Footer';
import Header from '../../../narrowcomponents/Header';

const PRE=' mob-res';
function MobileResume() {
  return (
    <>
    <div className="container-fluid mobile h-100 d-flex flex-column">
        <div className="d-flex flex-column vh-100">
          <Header />

          <div className={"row g-0 body h-100" + PRE}>
              <div className="col d-flex flex-column">
                <div className="row">
                  Mobile Support for PDF viewing is spotty. Please
                  download if you have difficulties viewing.
                </div>
                <div className={"row download-wrapper" + PRE}>
                  <a href="/pages/resume/resume.pdf" className={"download "+PRE}>Download</a>
                </div>
                <div className={"row resume-wrapper" + PRE}>
                  <img src="/pages/resume/resume.png" alt="Resume png" className="resume-img" />
                </div>
              </div>
          </div>
        <Footer/>
        </div>
      </div> {/* end container fluid */}
    </>
  );
}

export default MobileResume;