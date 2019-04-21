import * as React from 'react';
import './CSS/ThumbnailCollage.css';



class ThumbnailCollage extends React.Component {

    render(){
        let images = this.props.images;

        return(
            <div className="galleryThumbnail">
                {images.map(function(url, index){
                    return (
                    <figure className={"gallery__item gallery__item--"+index} key={index}>
                        <img src={url} className="gallery__img" alt={"Image "+index}/>
                    </figure>
                  );
                })}
            </div>

        );
    }

}


export default ThumbnailCollage;