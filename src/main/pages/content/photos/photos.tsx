

import { useCallback, useEffect, useState } from 'react';


//Project Imports
import * as c from '../../../../resources/constants';
import * as api from '../../../../resources/api';
import Footer from '../../../narrowcomponents/Footer';
import Header from '../../../narrowcomponents/Header';
import { useWindowSize } from '../../../subcomponents/misc/WindowDims';
import MobilePhotos from './MobilePhotos';

//Data
import photoJson from './photo_data.json';
import Gallery, { RenderImageProps } from 'react-photo-masonry';
import arrayShuffle from 'array-shuffle';
import { stringify } from 'querystring';
import { JsxElement } from 'typescript';

//Interfaces
interface GalleryPhoto {
  src: string;
  srcSet?: string | string[] | undefined;
  sizes?: string | string[] | undefined;
  width: number;
  height: number;
  alt?: string | undefined;
  key?: string | undefined;
}



//JSX

const imageRenderer = ( v: RenderImageProps): JSX.Element => (
    <div key={v. index} className={PRE+"photo-wrapper"}
    style={{ left: v.left, top: v.top, margin: v.margin}}
    >
      <img src={v.photo.src} alt="" className={PRE+"photo"} 
      style={hwFromSizes(undefined, [v.photo.height, v.photo.width])}
      />
    </div>
  );

  //Functions
  const hwFromSizes = (sizes: string | undefined | string[], vect: number[]) => {
    if(!sizes)
      return {heigth: vect[0], width: vect[1]};
    let w1 = Number(sizes);
    let h1 = (w1/vect[1])*vect[0];
    return {heigth: h1, width: w1};
  }
    
  const preImageRender = (p: GalleryPhoto): RenderImageProps => {
    return {index: 0,
      photo: p,
      margin: "0",
      onClick: null,
      onMouseEnter: null,
      onMouseLeave: null,
      direction: 'column'
    };
  };

  const toTheaterPhoto = (selected: string, data: c.PhotoData[], hydrateFunc: (v: GalleryPhoto) => RenderImageProps ): JSX.Element => {
    return imageRenderer( hydrateFunc(  toGalleryPhoto( data.filter((v) => {return v.filename==selected})[0] ) ) )
  }

  const toGalleryPhoto = (p: c.PhotoData) => {
    const [h, w] = c.normVect(p.resolution.split("x").map((v) => Number(v)), NORM_SIZE);
      //console.log("h: %s, w: %s", h, w);
      return {height:h, width: w, sizes:String(w), src: api.LOCAL_PHOTO_GALLERY+"/"+p.filename};
  }

//Constants
const GALLERY_DIRECTION = "row";
const PRE='ph ';
const PHOTO_MARGIN=6;
const NORM_SIZE = [300, 300]
function Photos() {
  let windowDims: c.Dims2D = useWindowSize();

  //states
  const [photoData, setPhotoData] = useState<c.PhotoData[]>(photoJson);
  const [galleryPhotos, setGalleryPhotos] = useState<GalleryPhoto[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<string>("");

  //Effects
  useEffect( ()=> {
    //Fetch photos
    //api.getRequest(api.SERVER_PHOTO_GALLERY, ) //only for production
    setGalleryPhotos(arrayShuffle(photoData).map( (v: c.PhotoData) => {
      return toGalleryPhoto(v);
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

                <div className={PRE+"body row"}>

                <div className={PRE+"theater-photo"}>
                    { (selectedPhoto) ? toTheaterPhoto(selectedPhoto, photoJson, preImageRender) : null }
                 </div>

                 <Gallery photos={galleryPhotos}
                 direction={GALLERY_DIRECTION}
                 margin={PHOTO_MARGIN}
                 renderImage={imageRenderer}
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