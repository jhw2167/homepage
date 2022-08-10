
import { appendFile } from 'fs';
import { useEffect, useState } from 'react';
import * as c from '../../../../resources/constants';
import * as api from '../../../../resources/api';
import Footer from '../../../narrowcomponents/Footer';
import Header from '../../../narrowcomponents/Header';
import { useWindowSize } from '../../../subcomponents/misc/WindowDims';
import MobilePhotos from './MobilePhotos';

//Data
import photoData from './photo_data.json';

const PRE='ph';
function Photos() {
  let windowDims: c.Dims2D = useWindowSize();

  //states
  const [photoList, setPhotoList] = useState<string[]>();

  //Effects
  useEffect( ()=> {
    //Fetch photos
    //api.getRequest(api.SERVER_PHOTO_GALLERY, ) //only for production
    setPhotoList(photoData);  //only for dev
  }, [])

  if(windowDims.w < c.MOBILE_WIDTH) 
            return <MobilePhotos />;
    else {

    
  return (
    <>
    <div className="container-fluid hh-container d-flex flex-column g-0 align-items-center">
        <div className={"row g-0 " +c.addStyleClass(PRE, 'outer-row')}>
            <div className={'col g-0 text-align-center '+c.addStyleClass(PRE, 'center-col')}>
            <Header />

                {/* <div className={'row g-0 '+c.addStyleClass(PRE, 'header-row')}>
                  <h1 className="name-title"> JACK HENRY WELSH </h1>
                </div>  */}
                 {/* END HEADER ROW */}




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
}

export default Photos;