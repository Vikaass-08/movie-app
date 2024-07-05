import loadingGif from '../../assets/images/loader.gif'
import './Loader.css'

function Loader() {
  return (
    <div className='loader'>
      <img className='loaderGif' src={loadingGif} alt="loading..." />
    </div>
  )
}

export default Loader