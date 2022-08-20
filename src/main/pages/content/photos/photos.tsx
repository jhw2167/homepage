

import { useEffect, useState } from 'react';


//Project Imports
import * as c from '../../../../resources/constants';
import * as api from '../../../../resources/api';
import Footer from '../../../narrowcomponents/Footer';
import Header from '../../../narrowcomponents/Header';
import { useWindowSize } from '../../../subcomponents/misc/WindowDims';
import MobilePhotos from './MobilePhotos';

//Data
import photoJson from './photo_data.json';
import Gallery from 'react-photo-masonry';
import arrayShuffle from 'array-shuffle';


interface GalleryPhoto {
  src: string;
  srcSet?: string | string[] | undefined;
  sizes?: string | string[] | undefined;
  width: number;
  height: number;
  alt?: string | undefined;
  key?: string | undefined;
}

const PH_OPTIONS = ['sm', 'md', 'lg', 'tall', 'wide'];
const PH_SIZE = (sz: string) => {
  switch(sz) {
    case 'sm':
      return [1, 1];
    case 'md':
      return [1, 1];
    case 'lg':
       return [2, 2];
    case 'tall':
        return [5, 4];
    case 'wide':
        return [4, 5];
  }
  //default
  return [2, 2];
}

const GALLERY_DIRECTION = "row";

const PRE='ph';
function Photos() {
  let windowDims: c.Dims2D = useWindowSize();

  //states
  const [photoData, setPhotoData] = useState<c.PhotoData[]>(photoJson);
  const [galleryPhotos, setGalleryPhotos] = useState<GalleryPhoto[]>([]);

  //Effects
  useEffect( ()=> {
    //Fetch photos
    //api.getRequest(api.SERVER_PHOTO_GALLERY, ) //only for production
    setGalleryPhotos(arrayShuffle(photoData).map( (v: c.PhotoData) => {
      const [w, h] = v.resolution.split("x");
      return {height:Number(h), width: Number(w), src: api.LOCAL_PHOTO_GALLERY+"/"+v.filename};
    }))

  }, [])

  if(windowDims.w < 0) 
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

                <div className="ph body row">
                 <Gallery photos={galleryPhotos}
                 direction={GALLERY_DIRECTION}
                 ></Gallery>
                </div>


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