import React from "react";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import CompareIcon from "@material-ui/icons/Compare";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { firestore } from "../../Firebase/index";
import { googleProvider, facebookProvider, auth } from "../../Firebase/index";
import Avatar from "@material-ui/core/Avatar";
import { NavDropdown, Nav, Navbar, Container } from "react-bootstrap";

const Navigation = () => {
  const [open, setOpen] = React.useState(false);
  const [totalItems, setTotalItems] = React.useState(0);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [user, setUser] = React.useState({});
  const [userlogin, setUserLogin] = React.useState();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [openSignUp, setOpenSignUp] = React.useState(false);
  const handleClickOpenSignUp = () => {
    setOpenSignUp(true);
  };
  const handleCloseSignUp = () => {
    setOpenSignUp(false);
  };

  const registerOpen = (option) => {
    if (option === "Register") {
      handleClose();
      handleClickOpenSignUp();
    } else {
      handleCloseSignUp();
      handleClickOpen();
    }
  };

  const signIn = () => {
    auth
      .signInWithPopup(googleProvider)
      .then((user) => {
        sessionStorage.setItem("userId", user.uid);
        sessionStorage.setItem("userEmail", user.email);
        sessionStorage.setItem("login", true);
        setUserLogin(true);
        handleClose();
        var user2 = auth.currentUser;
        if (user2) {
          cartItemFetch(user2.uid);
        }
      })
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        setUser(user);
        sessionStorage.setItem("userId", user.uid);
        sessionStorage.setItem("userEmail", user.email);
        sessionStorage.setItem("login", true);
        setUserLogin(true);
        cartItemFetch(user.uid);
      } else {
        setUser({});
        sessionStorage.setItem("login", false);
        sessionStorage.setItem("userId", false);
        sessionStorage.setItem("userEmail", false);
        setUserLogin(false);
      }
    });
  }, []);

  React.useEffect(() => {
    if (sessionStorage.getItem("login")) {
      var uid = sessionStorage.getItem("userId");
      firestore
        .collection("cart")
        .doc(uid)
        .onSnapshot(function (doc) {
          if (typeof doc.data() == "undefined") {
            setTotalItems(0);
          } else {
            setTotalItems(doc.data().items);
          }
        });
    }
  }, []);

  const cartItemFetch = (uid) => {
    firestore
      .collection("cart")
      .doc(uid)
      .onSnapshot(function (doc) {
        if (typeof doc.data() == "undefined") {
          setTotalItems(0);
        } else {
          setTotalItems(doc.data().items);
        }
      });
  };

  const logOut = () => {
    auth
      .signOut()
      .then(function () {
        setUser({});
        sessionStorage.setItem("login", false);
        sessionStorage.setItem("userId", false);
        sessionStorage.setItem("userEmail", false);
        setTotalItems(0);
        setUserLogin(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Login</DialogTitle>
        <DialogContent>
          <DialogContentText style={{ color: "#000000" }}>
            Please Logged In to this website, your email and password are end to
            end encrypted and secure.
          </DialogContentText>
          <TextField
            style={{ marginTop: "4px" }}
            id="outlined-basic"
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
          />
          <br />
          <TextField
            style={{ marginTop: "8px", marginBottom: "10px" }}
            id="outlined-basic"
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
          />

          <Button
            style={{ marginTop: "14px", marginBottom: "10px" }}
            size="large"
            startIcon={<ExitToAppIcon />}
            style={{ backgroundColor: "#000000", color: "#ffffff" }}
            variant="outlined"
            fullWidth
          >
            Login
          </Button>
          <center style={{ marginTop: "10px" }}>OR</center>
          <Button
            onClick={signIn}
            style={{
              backgroundColor: "#ffffff",
              color: "#000000",
              size: "10px",
              height: "50px",
              marginTop: "10px",
            }}
            variant="contained"
            fullWidth
          >
            <img
              alt="DocsUp"
              src="https://img.icons8.com/color/28/000000/google-logo.png"
            />
            Continue with Google
          </Button>
          <Button
            style={{
              backgroundColor: "#ffffff",
              color: "#000000",
              size: "10px",
              height: "50px",
              marginTop: "10px",
            }}
            variant="contained"
            fullWidth
          >
            <img
              alt="DocsUp"
              src="https://img.icons8.com/color/28/000000/facebook-new.png"
            />
            Continue with Facebook
          </Button>

          <center style={{ marginTop: "20px", marginBottom: "10px" }}>
            <a onClick={() => registerOpen("Register")} href="#!">
              Don't have an Account Sign Up
            </a>
          </center>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openSignUp}
        onClose={handleCloseSignUp}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Sign Up</DialogTitle>
        <DialogContent>
          <DialogContentText style={{ color: "#000000" }}>
            Please Register into this website, your email and password are end
            to end encrypted and secure.
          </DialogContentText>
          <TextField
            style={{ marginTop: "4px" }}
            id="outlined-basic"
            label="Full Name"
            type="text"
            variant="outlined"
            fullWidth
          />
          <br />
          <TextField
            style={{ marginTop: "8px", marginBottom: "10px" }}
            id="outlined-basic"
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
          />
          <TextField
            style={{ marginTop: "8px", marginBottom: "10px" }}
            id="outlined-basic"
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
          />
          <TextField
            style={{ marginTop: "8px", marginBottom: "10px" }}
            id="outlined-basic"
            label="Confirm Password"
            type="password"
            variant="outlined"
            fullWidth
          />

          <Button
            style={{ marginTop: "14px", marginBottom: "10px" }}
            size="large"
            startIcon={<ExitToAppIcon />}
            style={{ backgroundColor: "#000000", color: "#ffffff" }}
            variant="outlined"
            fullWidth
          >
            Sign Up
          </Button>

          <center style={{ marginTop: "20px", marginBottom: "10px" }}>
            <a onClick={() => registerOpen("Login")} href="#!">
              Already have an account
            </a>
          </center>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSignUp} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <div className="main-wrapper">
        <nav className="navbar">
          <div className="brand-and-icon">
            <center>
              <a href="/" className="navbar-brand">
                WEBSITE
              </a>
            </center>
            <button type="button" className="navbar-toggler">
              <i className="fas fa-bars"></i>
            </button>
          </div>
          <div className="navbar-collapse">
            <ul className="navbar-nav">
              <li>
                <a href="/">home</a>
              </li>

              <li>
                <a href="#" className="menu-link">
                  Hair Origin
                  <span className="drop-icon">
                    <i className="fas fa-chevron-down"></i>
                  </span>
                </a>

                <div className="sub-menu">
                  <div className="sub-menu-item">
                    <ul>
                      <li>
                        <a href="/?q=brazilian">Brazilian Hair</a>
                      </li>
                      <li>
                        <a href="/?q=cambodian">Cambodian Hair</a>
                      </li>
                      <li>
                        <a href="/?q=european">European Hair</a>
                      </li>
                      <li>
                        <a href="/?q=indian">Indian Hair</a>
                      </li>
                      <li>
                        <a href="/?q=malaysian">Malaysian Hair</a>
                      </li>
                    </ul>
                  </div>
                  <div className="sub-menu-item">
                    <ul>
                      <li>
                        <a href="/?q=mongolian">Mongolian Hair </a>
                      </li>
                      <li>
                        <a href="/?q=peruvian">Peruvian Hair</a>
                      </li>
                      <li>
                        <a href="/?q=vietnamese">Vietnamese Hair</a>
                      </li>
                      <li>
                        <a href="/?q=synthetic">Synthetic Hair</a>
                      </li>
                    </ul>
                  </div>
                  {/* <div className = "sub-menu-item">
                    <h2>all essential devices and tools for home</h2>
                    <button type = "button" className = "btn">shop here</button>
                  </div> */}
                  {/* <div className = "sub-menu-item">
                    <img style={{ width: '100%' }} src = "https://cdn.sophiegee.com/wp-content/uploads/women-hair-black-girl-beautiful-face-602628.jpg" alt = "product image" />
                  </div> */}
                </div>
              </li>

              <li>
                <a href="#" className="menu-link">
                  Hair Texture
                  <span className="drop-icon">
                    <i className="fas fa-chevron-down"></i>
                  </span>
                </a>
                <div className="sub-menu">
                  <div className="sub-menu-item">
                    <ul>
                      <li>
                        <a href="/?q=bodywave">Body Wave</a>
                      </li>
                      <li>
                        <a href="/?q=deepwave">Deep Wave</a>
                      </li>
                      <li>
                        <a href="/?q=loosedeepwave">Loose Deep Wave</a>
                      </li>
                      <li>
                        <a href="/?q=loosewave">Loose Wave</a>
                      </li>
                      <li>
                        <a href="/?q=naturalwave">Natural Wave</a>
                      </li>
                    </ul>
                  </div>
                  <div className="sub-menu-item">
                    <ul>
                      <li>
                        <a href="/?q=kinkycurly">Kinky Curly</a>
                      </li>
                      <li>
                        <a href="/?q=jerrycurly">Jerry Curl</a>
                      </li>
                      <li>
                        <a href="/?q=deepcurly">Deep Curly</a>
                      </li>
                      <li>
                        <a href="/?q=kinkystright">Kinky Straight</a>
                      </li>
                      <li>
                        <a href="/?q=afrohair">Afro Hair</a>
                      </li>
                    </ul>
                  </div>
                  {/* <div className = "sub-menu-item">
                    <h2>stylish and modern fashion clothing</h2>
                    <button type = "button" className = "btn">shop here</button>
                  </div> */}
                  {/* <div className = "sub-menu-item">
                    <img style={{ width: '100%' }} src = "https://cf.ltkcdn.net/hair/images/orig/200972-2017x1486-wavyhair.jpg" alt = "product image" />
                  </div> */}
                </div>
              </li>

              <li>
                <a href="#" className="menu-link">
                  Closures
                  <span className="drop-icon">
                    <i className="fas fa-chevron-down"></i>
                  </span>
                </a>
                <div className="sub-menu">
                  <div className="sub-menu-item">
                    <ul>
                      <li>
                        <a href="/?q=44closures">4 x 4 Closures</a>
                      </li>
                      <li>
                        <a href="/?q=55closures">5 x 5 Closures</a>
                      </li>
                    </ul>
                  </div>
                  <div className="sub-menu-item">
                    <ul>
                      <li>
                        <a href="/?q=66closures">6 x 6 Closures</a>
                      </li>
                      <li>
                        <a href="/?q=77closures">7 x 7 Closures</a>
                      </li>
                    </ul>
                  </div>
                  {/* <div className = "sub-menu-item">
                    <h2>the latest product is here</h2>
                    <button type = "button" className = "btn">shop here</button>
                  </div> */}
                  {/* <div className = "sub-menu-item">
                    <img style={{ width: '78%' }} src = "https://images-na.ssl-images-amazon.com/images/I/41kIt5Z4RgL.jpg" alt = "product image" />
                  </div> */}
                </div>
              </li>

              <li>
                <a href="#" className="menu-link">
                  Frontals
                  <span className="drop-icon">
                    <i className="fas fa-chevron-down"></i>
                  </span>
                </a>
                <div className="sub-menu">
                  <div className="sub-menu-item"></div>
                  <div className="sub-menu-item">
                    <ul>
                      <li>
                        <a href="/?q=134frontals">13 x 4 Frontals</a>
                      </li>
                      <li>
                        <a href="/?q=136frontals">13 x 6 Frontals</a>
                      </li>
                      <li>
                        <a href="/?q=360frontals">360 Frontals</a>
                      </li>
                    </ul>
                  </div>
                  {/* <div className = "sub-menu-item">
                    <h2>gear up for sports & adventures</h2>
                    <button type = "button" className = "btn">shop here</button>
                  </div> */}
                  {/* <div className = "sub-menu-item">
                    <img style={{ width: '100%' }} src = "https://images-na.ssl-images-amazon.com/images/I/413Se6pD7GL._SY355_.jpg" alt = "product image" />
                  </div> */}
                </div>
              </li>

              <li>
                <a href="#" className="menu-link">
                  Bundles
                  <span className="drop-icon">
                    <i className="fas fa-chevron-down"></i>
                  </span>
                </a>
                <div className="sub-menu">
                  <div className="sub-menu-item">
                    <h4> </h4>
                    <ul></ul>
                  </div>
                  <div
                    style={{ paddingLeft: "20vh" }}
                    className="sub-menu-item"
                  >
                    <h4> </h4>
                    <ul>
                      <li>
                        <a href="/?q=singlebundle">Single Bundle</a>
                      </li>
                      <li>
                        <a href="/?q=2bundle">2 Bundles</a>
                      </li>
                      <li>
                        <a href="/?q=3bundle">3 Bundles</a>
                      </li>
                      <li>
                        <a href="/?q=4bundle">4 Bundles</a>
                      </li>
                    </ul>
                  </div>
                  {/* <div className = "sub-menu-item">
                    <h2>gear up for sports & adventures</h2>
                    <button type = "button" className = "btn">shop here</button>
                  </div> */}
                  {/* <div className = "sub-menu-item">
                    <img style={{ width: '100%' }} src = "https://bidunart.com/wp-content/uploads/2019/12/Portrait064a.jpg" alt = "product image" />
                  </div> */}
                </div>
              </li>

              <li>
                <a href="#" className="menu-link">
                  Bundles with Closure
                  <span className="drop-icon">
                    <i className="fas fa-chevron-down"></i>
                  </span>
                </a>
                <div className="sub-menu">
                  <div className="sub-menu-item">
                    <ul></ul>
                  </div>
                  <div className="sub-menu-item">
                    <ul>
                      <li>
                        <a href="/?q=3bw44c">3 Bundles with 4 x 4 closure</a>
                      </li>
                      <li>
                        <a href="/?q=3bw55c">3 Bundles with 5 x 5 closure</a>
                      </li>
                      <li>
                        <a href="/?q=3bw66c">3 Bundles with 6 x 6 closure</a>
                      </li>
                      <li>
                        <a href="/?q=3bw134c">3 Bundles with 13 x 4 frontal</a>
                      </li>
                      <li>
                        <a href="/?q=3bw136c">3 Bundles with 13 x 6 frontal</a>
                      </li>
                    </ul>
                  </div>
                  <div className="sub-menu-item">
                    <ul>
                      <li>
                        <a href="/?q=4bw44c">4 Bundles with 4 x 4 closure</a>
                      </li>
                      <li>
                        <a href="/?q=4bw55c">4 Bundles with 5 x 5 closure</a>
                      </li>
                      <li>
                        <a href="/?q=4bw66c">4 Bundles with 6 x 6 closure</a>
                      </li>
                      <li>
                        <a href="/?q=4bw134c">4 Bundles with 13 x 4 frontal</a>
                      </li>
                      <li>
                        <a href="/?q=4bw136c">4 Bundles with 13 x 6 frontal</a>
                      </li>
                    </ul>
                  </div>
                  {/* <div className = "sub-menu-item">
                    <h2>gear up for sports & adventures</h2>
                    <button type = "button" className = "btn">shop here</button>
                  </div> */}
                  {/* <div className = "sub-menu-item">
                    <img style={{ width: '100%' }} src = "https://i.ytimg.com/vi/uJNTsiuRK_s/maxresdefault.jpg" alt = "product image" />
                  </div> */}
                </div>
              </li>

              <li>
                <a href="#" className="menu-link">
                  Wigs
                  <span className="drop-icon">
                    <i className="fas fa-chevron-down"></i>
                  </span>
                </a>
                <div className="sub-menu">
                  <div className="sub-menu-item"></div>
                  <div className="sub-menu-item"></div>
                  <div className="sub-menu-item">
                    <h4>Closure Wigs</h4>
                    <ul>
                      <li>
                        <a href="/?q=44cw">4 x 4 Closure Wigs</a>
                      </li>
                      <li>
                        <a href="/?q=55cw">5 x 5 Closure Wigs</a>
                      </li>
                      <li>
                        <a href="/?q=66cw">6 x 6 Closure Wigs</a>
                      </li>
                    </ul>
                  </div>
                  <div className="sub-menu-item">
                    <h4>Frontal Wigs</h4>
                    <ul>
                      <li>
                        <a href="/?q=lacefrontwigs">Lace Front Wigs</a>
                      </li>
                      <li>
                        <a href="/?q=fulllacewigs">Full Lace Wigs</a>
                      </li>
                      <li>
                        <a href="/?q=360">360</a>
                      </li>
                    </ul>
                    <hr style={{ width: "50%" }} />
                    <h4>
                      <a href="/?q=upartwigs">U Part Wigs</a>
                    </h4>
                    <ul>
                      <li>
                        <a href="/?q=upartwigs">U Part Wigs</a>
                      </li>
                    </ul>
                  </div>
                  {/* <div className = "sub-menu-item">
                    <h2>gear up for sports & adventures</h2>
                    <button type = "button" className = "btn">shop here</button>
                  </div> */}
                  {/* <div className = "sub-menu-item">
                    <img style={{ width: '75%' }} src = "https://rukminim1.flixcart.com/image/352/352/k4zx9jk0/hair-wig/s/d/w/71msrnvj-xl-sl1000-vedica-original-imafm8yrryrmrdt6.jpeg" alt = "product image" />
                  </div> */}
                </div>
              </li>

              <li>
                <a href="#" className="menu-link">
                  More Extensions
                  <span className="drop-icon">
                    <i className="fas fa-chevron-down"></i>
                  </span>
                </a>
                <div className="sub-menu">
                  <div className="sub-menu-item">
                    <ul>
                      <li>
                        <a href="#"> </a>
                      </li>
                      <li>
                        <a href="#"> </a>
                      </li>
                      <li>
                        <a href="#"> </a>
                      </li>
                      <li>
                        <a href="#"> </a>
                      </li>
                      <li>
                        <a href="#"> </a>
                      </li>
                    </ul>
                  </div>
                  <div className="sub-menu-item">
                    <ul>
                      <li>
                        <a href="#"> </a>
                      </li>
                      <li>
                        <a href="#"> </a>
                      </li>
                      <li>
                        <a href="#"> </a>
                      </li>
                      <li>
                        <a href="#"> </a>
                      </li>
                      <li>
                        <a href="#"> </a>
                      </li>
                    </ul>
                  </div>
                  <div className="sub-menu-item">
                    <ul>
                      <li>
                        <a href="#"> </a>
                      </li>
                      <li>
                        <a href="#"> </a>
                      </li>
                      <li>
                        <a href="#"> </a>
                      </li>
                      <li>
                        <a href="#"> </a>
                      </li>
                      <li>
                        <a href="#"> </a>
                      </li>
                    </ul>
                  </div>
                  <div className="sub-menu-item">
                    <ul>
                      <li>
                        <a href="/?q=clipins">Clip Ins</a>
                      </li>
                      <li>
                        <a href="/?q=ponytails">Ponytails</a>
                      </li>
                      <li>
                        <a href="/?q=microlinks">Microlinks</a>
                      </li>
                      <li>
                        <a href="/?q=nanorings">Nano rings</a>
                      </li>
                    </ul>
                  </div>
                  {/* <div className = "sub-menu-item">
                    <h2>gear up for sports & adventures</h2>
                    <button type = "button" className = "btn">shop here</button>
                  </div> */}
                  {/* <div className = "sub-menu-item">
                    <img style={{ width: '100%' }} src = "https://edenhairextensions.com.au/wp-content/uploads/1n5a0954re.jpg" alt = "product image" />
                  </div> */}
                </div>
              </li>

              {userlogin ? (
                <>
                  <li>
                    <Badge badgeContent={totalItems} color="secondary">
                      <IconButton href="/compare" aria-label="delete">
                        <CompareIcon />
                      </IconButton>
                    </Badge>
                  </li>
                  <li>
                    <IconButton
                      onClick={() => (window.location.href = "/wishlist")}
                      aria-label="delete"
                    >
                      <FavoriteIcon style={{ color: "#000" }} />
                    </IconButton>
                  </li>
                  <li>
                    <Avatar
                      style={{ cursor: "pointer" }}
                      onClick={() => (window.location.href = "/profile")}
                      alt={user.name}
                      src={user.photoURL}
                    />
                  </li>
                </>
              ) : (
                <li>
                  <IconButton onClick={handleClickOpen} aria-label="delete">
                    <ExitToAppIcon style={{ color: "#000" }} />
                  </IconButton>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </div>
    </React.Fragment>
  );
};

export default Navigation;
