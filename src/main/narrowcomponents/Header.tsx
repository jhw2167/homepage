//Project imports
import { ReactComponent as HomeSvg } from './svg/home.svg';

const HOME_SVG_DIMS = 40;
function Header() {
    //states
    return (
        <div className="row small-header-row">
            <div className="col-1 g-0 small-header-col" onClick={ () => {window.location.replace('/')}}>
            <HomeSvg className={'svg-home hd'} 
            fill='white' 
            height={HOME_SVG_DIMS}
            width={HOME_SVG_DIMS}
            />
            </div>
        </div>
    )
}

export default Header;