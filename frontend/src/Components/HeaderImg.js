import tigerPic from '../assets/tiger.png'


const HeaderImg = () => {
    return (
        <div className="containerMain" style={{ backgroundImage: `url(${tigerPic})`}}>
            <div className="sloganBanner">
                <h1 className="mainTitle">R  E  W  I  L  D  I  N  G</h1>
                <h2>Be part of the change</h2>
            </div>
        </div>
    )
}

export default HeaderImg