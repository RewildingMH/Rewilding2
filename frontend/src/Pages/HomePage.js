import tigerPic from '../assets/tiger.png'
import animals from '../assets/tigers.jpg'

const HomePage = () => {

    return (
        <div className="container">

            <div className="distanceDiv">
                <div className="containerMain" style={{ backgroundImage: `url(${tigerPic})`, backgroundPosition: "center", backgroundSize: "cover" }}>
                    <div>
                        <h1 className="mainTitle">R  E  W  I  L  D  I  N  G</h1>
                        <h2>Be part of the change</h2>
                    </div>

                </div>
                <div className="containerBanner">
                    <h2>CONTRIBUTE ON CAUSES BY SIGNING PETITIONS, WE NEED YOU TO BE PART.</h2>
                </div>
                <div className="divBlog"></div>
            </div>

        </div>
    )
}

export default HomePage

