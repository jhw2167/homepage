import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import * as c from '../../../../resources/constants';
import Footer from '../../../narrowcomponents/Footer';
import Header from '../../../narrowcomponents/Header';

import res from './resume.pdf';

const PRE='res';
function Resume() {
  return (

    <>
    <div className="container-fluid hh-container d-flex flex-column g-0 align-items-center">
        <div className={"row g-0 " +c.addStyleClass(PRE, 'outer-row')}>
            <div className={'col g-0 text-align-center '+c.addStyleClass(PRE, 'center-col')}>
            <Header />

                <div className={'row g-0 '+c.addStyleClass(PRE, 'header-row')}>
                  <h1 className="name-title"> JACK HENRY WELSH </h1>
                </div> 
                 {/* END HEADER ROW */}



                <div className={'row g-0 '+c.addStyleClass(PRE, 'body-row')}>
                  <div className="resume-wrapper justify-content-center">
                  <Document file={res}>
                    <Page className={"child-m-auto res-child-border"} pageNumber={1} />
                  </Document>
                  </div>
                </div>
                 {/* END BODY ROW */}

                <div className={'row g-0 text-align-center '+c.addStyleClass(PRE, 'footer-row')}>
                    <Footer />
                </div>
                 {/* END FOOTER ROW */}


            </div> {/* END CENTER WRAPPER COL */}
            
        </div> {/*END OUTER ROW */}
    </div> 
    </>
  );
}

export default Resume;