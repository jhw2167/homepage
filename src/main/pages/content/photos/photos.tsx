

import { useCallback, useEffect, useState } from 'react';


//Project Imports
import * as c from '../../../../resources/constants';
import * as api from '../../../../resources/api';
import Footer from '../../../narrowcomponents/Footer';
import Header from '../../../narrowcomponents/Header';
import { useWindowSize } from '../../../subcomponents/misc/WindowDims';
import MobilePhotos from './MobilePhotos';
import Gallery, { PhotoProps, RenderImageProps } from 'react-photo-masonry';
import arrayShuffle from 'array-shuffle';
import ArrowWrap from '../../../components/ArrowWrap';
import useComponentVisible from '../../../subcomponents/misc/UseComponentVisible';

//Data
import photoJson from './photo_data.json';


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
    <div key={v.index} className={PRE+"photo-wrapper"}
    style={{ left: v.left, top: v.top, margin: v.margin}}
    onClick={(e) => (v.onClick) ? v.onClick(e, {index: v.index, ...v.photo}) : null}
    >
      <img src={v.photo.src} alt="" className={PRE+"photo"} 
      style={{height: v.photo.height, width: v.photo.width}}
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
    
  const preImageRender = (p: PhotoProps): RenderImageProps => {
    return {index: 0,
      photo: p,
      margin: "0",
      onClick: null,
      onMouseEnter: null,
      onMouseLeave: null,
      direction: 'column'
    };
  };

  const toTheaterPhoto = (p: PhotoProps, hydrateFunc: (v: PhotoProps) => RenderImageProps ): JSX.Element => {
    return imageRenderer( hydrateFunc( p ) )
  }

  const toGalleryPhoto = (p: c.PhotoData, onClick?: Function) => {
    const [h, w] = c.normVect(p.resolution.split("x").map((v) => Number(v)), NORM_SIZE);
      //console.log("h: %s, w: %s", h, w);
      return {height:h, width: w,
        sizes:String(w),
        src: api.PHOTO_GALLERY+"/"+p.filename
      };
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
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoProps>();

  const [galleryIdx, setGalleryIdx] = useState<number>(0);
  const [increment, incrementPhoto] = useState<number>(0);

  const { ref, isComponentVisible, setIsComponentVisible
  } = useComponentVisible(false);

  //Effects
  useEffect( ()=> {
    //Fetch photos
    //api.getRequest(api.SERVER_PHOTO_GALLERY, ) //only for production
    setGalleryPhotos(arrayShuffle(photoData).map( (v: c.PhotoData) => {
      return toGalleryPhoto(v, (p: GalleryPhoto) => setSelectedPhoto(p));
    }))


  }, [])

  useEffect( () => {
    if(!isComponentVisible)
      setSelectedPhoto(undefined);
  }, [isComponentVisible])


  useEffect( () => {
    console.log("inc: " + increment);
    if(increment==0)
      return;

    let i = galleryIdx + increment;
    if(i>-1 && i<galleryPhotos.length) {
      setGalleryIdx(i);
      setSelectedPhoto(galleryPhotos[i])
    }

    incrementPhoto(0);
  }, [increment])

  const shadowedBox = document.getElementById('shadowed-box');
  useEffect( () => {
      if(!shadowedBox) return;

      let innerStyle = 'z-index: -1';
      if(selectedPhoto) {
        setIsComponentVisible(true);
        innerStyle = 'z-index: 10';
        setGalleryIdx(galleryPhotos.findIndex((v) => {return v.src==selectedPhoto.src}))
      } else {
        setIsComponentVisible(false);
      }
      shadowedBox.setAttribute('style', innerStyle );
  }, [selectedPhoto])

  if(windowDims.w < 0) 
            return <MobilePhotos />;
    else {

  return (
    <>
    <div className="container-fluid hh-container d-flex flex-column g-0 align-items-center">
    <div id={'shadowed-box'} style={{zIndex:"-1"}} className={PRE}> </div>
        <div className={"row g-0 " +c.addStyleClass(PRE, 'outer-row')}>
            <div className={'col g-0 text-align-center '+c.addStyleClass(PRE, 'center-col')}>
            <Header />

                <div className={PRE+"body row"}>
                { (selectedPhoto) ? 
                <div className={PRE+"container-fluid theater d-flex flex-column g-0 align-items-center"}
                >
                  <div 
                  className={PRE+"theater wrapper row align-middle"}>
                  <ArrowWrap styleClass={PRE} arrowType={'char'} arrowUpdate={incrementPhoto}>
                  <div className={PRE+"theater col"}>
                    <img ref={ref} src={selectedPhoto.src} className={PRE+"photo"}/>
                  </div>
                  </ArrowWrap>
                  </div>
               </div> : null
                }
                
                <div style={{pointerEvents: (isComponentVisible) ? "none"  : "all"}}>
                 <Gallery photos={galleryPhotos}
                 direction={GALLERY_DIRECTION}
                 margin={PHOTO_MARGIN}
                 renderImage={imageRenderer}
                 onClick={ (e, p) => { setSelectedPhoto(p.photo) }}
                 ></Gallery>
                 </div>
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