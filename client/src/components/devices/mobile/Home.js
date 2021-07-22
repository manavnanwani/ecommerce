import React from "react";
import Navigation from "../../static/Navigation";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Collapse from "@material-ui/core/Collapse";
import FilterListIcon from "@material-ui/icons/FilterList";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Slider from "@material-ui/core/Slider";
import IconButton from "@material-ui/core/IconButton";
import Footer from "../../static/Footer";

const useStyles = makeStyles((theme) => ({
  pos: {
    marginBottom: 12,
    color: "#000000",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "3vh",
  },
  cardroot: {
    marginBottom: 2,
  },
}));

function valuetext(value) {
  return `${value}°C`;
}

const Home = () => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [value, setValue] = React.useState([0, 37]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const primaryOptions = {
    type: "loop",
    height: 250,
    perPage: 1,
    perMove: 1,
    gap: "1rem",
    autoplay: true,
    pagination: false,
  };
  return (
    <>
      <Navigation />
      <br />
      <br />
      <br />
      <Splide options={primaryOptions}>
        <SplideSlide>
          <img
            width="100%"
            style={{ height: "100%" }}
            src="https://www.samuel-windsor.co.uk/images/73/choose-formal-shirt-header.jpg"
            alt="Image 1"
          />
        </SplideSlide>
        <SplideSlide>
          <img
            width="100%"
            style={{ height: "100%" }}
            src="https://www.samuel-windsor.co.uk/images/73/choose-formal-shirt-header.jpg"
            alt="Image 2"
          />
        </SplideSlide>
      </Splide>
      <IconButton
        onClick={handleExpandClick}
        aria-expanded={expanded}
        style={{ marginBottom: "2px", marginTop: "2px" }}
        component="span"
      >
        <FilterListIcon />
      </IconButton>

      <Collapse
        style={{ margin: "2px 0px 2px 0px" }}
        in={expanded}
        timeout="auto"
        unmountOnExit
      >
        <Card variant="outlined">
          <CardContent>
            <Grid style={{ display: "flex", flexDirection: "column" }}>
              <FormControl>
                <InputLabel id="demo-simple-select-label">Sort</InputLabel>
                <Select
                  style={{ color: "#00000" }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                >
                  <MenuItem value="Our Favorites">Our Favorites</MenuItem>
                  <MenuItem value="What's new">What's new</MenuItem>
                  <MenuItem value="Price High to Low">
                    Price High to Low
                  </MenuItem>
                  <MenuItem value="Price Low to High">
                    Price Low to High
                  </MenuItem>
                </Select>
              </FormControl>
              <FormControl>
                <InputLabel id="demo-simple-select-label">
                  Responsible
                </InputLabel>
                <Select
                  style={{ color: "#00000" }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                >
                  <MenuItem value="Recycled">Recycled</MenuItem>
                  <MenuItem value="Sustinable Materials">
                    Sustinable Materials
                  </MenuItem>
                </Select>
              </FormControl>
              <FormControl>
                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                <Select
                  style={{ color: "#00000" }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                >
                  <MenuItem value="Unisex">Unisex</MenuItem>
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                </Select>
              </FormControl>

              <FormControl>
                <InputLabel id="demo-simple-select-label">Brand</InputLabel>
                <Select
                  style={{ color: "#00000" }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                >
                  <MenuItem value="Addidas">Addidas</MenuItem>
                  <MenuItem value="Nike">Nike</MenuItem>
                </Select>
              </FormControl>

              <FormControl>
                <InputLabel id="demo-simple-select-label">
                  Product Type
                </InputLabel>
                <Select
                  style={{ color: "#00000" }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                >
                  <MenuItem value="Bagpacks">Bagpacks</MenuItem>
                  <MenuItem value="Bags">Bags</MenuItem>
                  <MenuItem value="Bum Bags">Bum Bags</MenuItem>
                  <MenuItem value="Face Covering">Face Covering</MenuItem>
                  <MenuItem value="Gilets">Gilets</MenuItem>
                </Select>
              </FormControl>

              <FormControl>
                <InputLabel id="demo-simple-select-label">Size</InputLabel>
                <Select
                  style={{ color: "#00000" }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                >
                  <MenuItem value="UK 4">UK 4</MenuItem>
                  <MenuItem value="UK 4.5">UK 4.5</MenuItem>
                  <MenuItem value="UK 6">UK 6</MenuItem>
                  <MenuItem value="UK 7">UK 7</MenuItem>
                  <MenuItem value="UK 7.5">UK 7.5</MenuItem>
                </Select>
              </FormControl>

              <FormControl>
                <InputLabel id="demo-simple-select-label">Colors</InputLabel>
                <Select
                  style={{ color: "#00000" }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                >
                  <MenuItem value="White">White</MenuItem>
                  <MenuItem value="Black">Black</MenuItem>
                  <MenuItem value="Brown">Brown</MenuItem>
                  <MenuItem value="Red">Red</MenuItem>
                  <MenuItem value="Green">Green</MenuItem>
                </Select>
              </FormControl>

              <FormControl>
                <InputLabel id="demo-simple-select-label">Body Fits</InputLabel>
                <Select
                  style={{ color: "#00000" }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                >
                  <MenuItem value="Main Collection">Main Collection</MenuItem>
                </Select>
              </FormControl>

              <FormControl>
                <InputLabel id="demo-simple-select-label">
                  Sale / New Season
                </InputLabel>
                <Select
                  style={{ color: "#00000" }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                >
                  <MenuItem value="New Season">New Season</MenuItem>
                  <MenuItem value="Sale">Sale</MenuItem>
                </Select>
              </FormControl>

              <FormControl style={{ marginTop: "15px", padding: "0 4px" }}>
                <div className={classes.priceroot}>
                  <Typography id="range-slider" gutterBottom>
                    Price range
                  </Typography>
                  <Slider
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    getAriaValueText={valuetext}
                  />
                </div>
              </FormControl>
            </Grid>
          </CardContent>
        </Card>
      </Collapse>

      <section style={{ margin: "4px 4px 4px 4px" }}>
        <Card className={classes.cardroot} variant="outlined">
          <CardContent>
            <center>
              <a href="/product?i=3d8a7a961ff3cd70a7d2ec06cde2bbf66eefb829558d9a2a2662cfc956dd721b">
                <img
                  style={{ width: "30vh" }}
                  src="https://images-na.ssl-images-amazon.com/images/I/613SYKy-XPL._UL1200_.jpg"
                  alt="product image"
                />
              </a>
            </center>
            <Typography className={classes.pos}>adjective</Typography>
            <Typography
              style={{ textAlign: "center" }}
              variant="body2"
              component="p"
            >
              some random text format is here for the product
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              style={{ backgroundColor: "#000000", color: "#ffffff" }}
              variant="contained"
              fullWidth
            >
              Add to Compare
            </Button>
          </CardActions>
        </Card>
        <Card className={classes.cardroot} variant="outlined">
          <CardContent>
            <center>
              <a href="/product">
                <img
                  style={{ width: "30vh" }}
                  src="https://images-na.ssl-images-amazon.com/images/I/613SYKy-XPL._UL1200_.jpg"
                  alt="product image"
                />
              </a>
            </center>
            <Typography className={classes.pos}>adjective</Typography>
            <Typography
              style={{ textAlign: "center" }}
              variant="body2"
              component="p"
            >
              some random text format is here for the product
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              style={{ backgroundColor: "#000000", color: "#ffffff" }}
              variant="contained"
              fullWidth
            >
              Add to Compare
            </Button>
          </CardActions>
        </Card>
        <Card className={classes.cardroot} variant="outlined">
          <CardContent>
            <center>
              <a href="/product">
                <img
                  style={{ width: "30vh" }}
                  src="https://images-na.ssl-images-amazon.com/images/I/613SYKy-XPL._UL1200_.jpg"
                  alt="product image"
                />
              </a>
            </center>
            <Typography className={classes.pos}>adjective</Typography>
            <Typography
              style={{ textAlign: "center" }}
              variant="body2"
              component="p"
            >
              some random text format is here for the product
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              style={{ backgroundColor: "#000000", color: "#ffffff" }}
              variant="contained"
              fullWidth
            >
              Add to Compare
            </Button>
          </CardActions>
        </Card>
        <Card className={classes.cardroot} variant="outlined">
          <CardContent>
            <center>
              <a href="/product">
                <img
                  style={{ width: "30vh" }}
                  src="https://images-na.ssl-images-amazon.com/images/I/613SYKy-XPL._UL1200_.jpg"
                  alt="product image"
                />
              </a>
            </center>
            <Typography className={classes.pos}>adjective</Typography>
            <Typography
              style={{ textAlign: "center" }}
              variant="body2"
              component="p"
            >
              some random text format is here for the product
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              style={{ backgroundColor: "#000000", color: "#ffffff" }}
              variant="contained"
              fullWidth
            >
              Add to Compare
            </Button>
          </CardActions>
        </Card>
      </section>
      <Footer />
    </>
  );
};

export default Home;
