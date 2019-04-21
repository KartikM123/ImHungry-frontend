import * as React from 'react';
import './CSS/Collage3.css';



class Collage3 extends React.Component {

    render(){
        let images = this.props.images;

        return(
            <div className="gallery">
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


export default Collage3;