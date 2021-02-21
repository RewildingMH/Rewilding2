import twitter from '../assets/twitter.png'
import facebook from '../assets/facebook.png'
import instagram from '../assets/instagram.png'
import youtube from '../assets/youtube.png'
import logo from '../assets/reLogo.png'
import { Link } from 'react-router-dom'


const Footer = () => {
    return (
        <div >
            <div className="footerDiv">
                <div className="findUs">
                <ul>
                    <li><Link to="/">HOME</Link></li>
                    <li><Link to="/blog">BLOG</Link></li>
                    <li><Link to="/petitions">PETITIONS</Link></li>
                    <li><Link to="/community">COMMUNITY</Link></li>
                </ul>
                </div>
                
                <div className="logoRew"><img src={logo} style={{width:"4vw"}}></img></div>
                <div className="findUs">
                    <div><span>FIND US:</span></div>
                    <div className="social">
                        <img src={facebook}></img>
                        <img src={twitter}></img>
                        <img src={instagram}></img>
                        <img src={youtube}></img>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Footer