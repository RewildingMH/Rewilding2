import tigerPic from '../assets/tiger.png'
import Header from '../Components/Header'

const HeaderImg = () => {
    return (
        <div className="containerMain" style={{ backgroundImage: `url(${tigerPic})`, backgroundPosition: "center", backgroundSize: "cover" }}>
            <Header />
            <div>
                <h1 className="mainTitle">R  E  W  I  L  D  I  N  G</h1>
                <h2>Be part of the change</h2>
            </div>

        </div>
    )
}

export default HeaderImg