import twitter from '../assets/twitter.png'
import facebook from '../assets/facebook.png'
import instagram from '../assets/instagram.png'
import youtube from '../assets/youtube.png'
import logo from '../assets/reLogo.png'
import { Link } from 'react-router-dom'


const Footer = () => {
    return (
        <div className="footerDiv">
            <div className="logoRew"><img src={logo}></img></div>
            <div className="listNav">
                <Link to="/">HOME</Link>
                <Link to="/blog">BLOG</Link>
                <Link to="/petitions">PETITIONS</Link>
                <Link to="/community">COMMUNITY</Link>
            </div>
            <div>
                <p>FIND US:</p>
            </div>
            <div className="social">
                <img src={facebook}></img>
                <img src={instagram}></img>
                <img src={twitter}></img>
                <img src={youtube}></img>
            </div>
            <p>REWILDING INTERNATIONAL 2021</p>
        </div>
    )
}

export default Footer