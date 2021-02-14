import lionPic from '../assets/imagenleon.png'
import animals from '../assets/tigers.jpg'

const HomePage = () => {

    return (
        <div className="container">
            <h1 className="mainTitle">R  E  W  I  L  D  I  N  G</h1>
            <h2>Be part of the change</h2>
            <div className="distanceDiv">
                <div className="containerMain" style={{backgroundImage: `url(${lionPic})`, backgroundPosition:"center", backgroundSize: "cover"}}>
                    <div className="containerCarrusel" style={{backgroundImage: `url(${animals})`, backgroundPosition:"center", backgroundSize: "cover"}}></div>
                </div>
                <div className="containerBanner"></div>
                <div className="divBlog"></div>
            </div>

        </div>
    )
}

export default HomePage

