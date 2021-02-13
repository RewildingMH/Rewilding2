const Header = (props) => {
<<<<<<< HEAD
    const despliegue = () => {
        document.querySelector("#menu_hamburguesa").classList.toggle("active");
        document.querySelector("#mainListDiv").classList.toggle("show_list");
    };
    // //Arreglar
    //  window.onscroll = ()=> {
    //      window.scrollY > 100?
    //          document.querySelector('.nav').classList.add('affix'):
    //          document.querySelector('.nav').classList.remove('affix')
    //    };
    const [show, setShow] = useState(true);
    if (props.loggedUser === null) {
        var links = (
            <>
                <NavLink to="/login" className="nav-link">
                    <IconContext.Provider value={{ size: "1.25em" }}>
                        <div className="d-flex align-items-center">
                            <BiUserCircle />
                            <div>Login</div>
                        </div>
                    </IconContext.Provider>
                </NavLink>
            </>
        );
    } else {
        var links = (
            <>
                <Link className="nav-link d-flex align-items-center">
                    <img
                        src={props.loggedUser.profilePicture}
                        className="rounded-circle  mr-3"
                        style={{ height: "40px", width: "40px" }}
                    />
                    <div className="container">
                        <div
                            type="button"
                            className="dropdown-toggle d-block"
                            onClick={() => {
                                setShow(!show);
                            }}
                        >
                            {props.loggedUser.name}
                        </div>
                    </div>
                </Link>
                {!show && (
                    <ul className="d-flex flex-column dropdown-header rounded">
                        <li className="item-drop h3 p-2">Profile</li>
                        <li className="item-drop h3 p-2">Mytineraries</li>
                        <li
                            className="item-drop h3 p-2"
                            type="button"
                            onClick={() => props.logoutUser()}
                        >
                            LogOut
=======
  const despliegue = () => {
    document.querySelector("#menu_hamburguesa").classList.toggle("active");
    document.querySelector("#mainListDiv").classList.toggle("show_list");
  };
  const [show, setShow] = useState(true);
  if (props.loggedUser === null) {
    var links = (
      <>
        <NavLink to="/login" className="nav-link">
          <IconContext.Provider value={{ size: "1.25em" }}>
            <div className="d-flex align-items-center">
              <BiUserCircle />
              <div>Login</div>
            </div>
          </IconContext.Provider>
        </NavLink>
      </>
    );
  } else {
    var links = (
      <>
        <Link className="nav-link d-flex align-items-center">
          <img
            src={props.loggedUser.profilePicture}
            className="rounded-circle  mr-3"
            style={{ height: "40px", width: "40px" }}
          />
          <div className="container">
            <div
              type="button"
              className="dropdown-toggle d-block"
              onClick={() => {
                setShow(!show);
              }}
            >
              {props.loggedUser.name}
            </div>
          </div>
        </Link>
        {!show && (
          <ul className="d-flex flex-column dropdown-header rounded">
            <li className="item-drop h3 p-2">Profile</li>
            <li className="item-drop h3 p-2">Mytineraries</li>
            <li
              className="item-drop h3 p-2"
              type="button"
              onClick={() => props.logoutUser()}
            >
              LogOut
>>>>>>> main
            </li>
                    </ul>
                )}
            </>
        );
    }
    return (
        <>
            <nav className="nav">
                <div className="container-fluid">
                    <div className="logo">
                        <NavLink to="/" className="navbar-brand">
                            <img alt="logo" src="/assets/Mytinerary-logo.png" />
                        </NavLink>
                    </div>
                    <div id="mainListDiv" className="main_list">
                        <ul className="navlinks">
                            <li>
                                <NavLink to="/" className="nav-link">
                                    <IconContext.Provider value={{ size: "1.25em" }}>
                                        <div className="d-flex align-items-center">
                                            <BiHome />
                                            <div>Home</div>
                                        </div>
                                    </IconContext.Provider>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/cities" className="nav-link">
                                    <IconContext.Provider value={{ size: "1.25em" }}>
                                        <div className="d-flex align-items-center">
                                            <BiWorld />
                                            <div>Cities</div>
                                        </div>
                                    </IconContext.Provider>
                                </NavLink>
                            </li>
                            <li>{links}</li>
                        </ul>
                    </div>
                    <span
                        className="navTrigger"
                        id="menu_hamburguesa"
                        onClick={despliegue}
                    >
                        <i></i>
                        <i></i>
                        <i></i>
                    </span>
                </div>
            </nav>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        loggedUser: state.authReducer.loggedUser,
    };
};

const mapDispatchToProps = {
    logoutUser: authActions.logoutUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
