import React from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import useWindowDimensions from "../useWindowDimensions";
const Footer = () => {
  const { width } = useWindowDimensions();
  return (
    <>
      {width > 1100 ? (
        <footer className="site-footer">
          <Container>
            <Grid container spacing={3}>
              <Grid item xs={3}>
                <h6>About</h6>
                <p className="text-justify">
                  Company Name.com Lorem Ipsum is simply dummy text of the
                  printing and typesetting industry. Lorem Ipsum has been the
                  industry's standard dummy text ever since the 1500s, when an
                  unknown printer took a galley of type and scrambled it to make
                  a type specimen book. It has survived not only five centuries,
                  but also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s.
                </p>
              </Grid>
              <Grid item xs={3}></Grid>
              <Grid item xs={3}></Grid>
              <Grid item xs={3}>
                <h6>Quick Links</h6>
                <ul className="footer-links">
                  <li>
                    <a
                      style={{ textDecoration: "none" }}
                      href="http://scanfcode.com/about/"
                    >
                      About Us
                    </a>
                  </li>
                  <li>
                    <a
                      style={{ textDecoration: "none" }}
                      href="http://scanfcode.com/contact/"
                    >
                      Contact Us
                    </a>
                  </li>
                  <li>
                    <a
                      style={{ textDecoration: "none" }}
                      href="http://scanfcode.com/contribute-at-scanfcode/"
                    >
                      Contribute
                    </a>
                  </li>
                  <li>
                    <a
                      style={{ textDecoration: "none" }}
                      href="http://scanfcode.com/privacy-policy/"
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a
                      style={{ textDecoration: "none" }}
                      href="http://scanfcode.com/sitemap/"
                    >
                      Sitemap
                    </a>
                  </li>
                </ul>
              </Grid>
            </Grid>
            <hr />
          </Container>
          <Container style={{ marginTop: "2px" }}>
            <div className="row">
              <div className="col-md-8 col-sm-6 col-xs-12">
                <p className="copyright-text">
                  Copyright &copy; 2021 All Rights Reserved by
                  <a href="#" style={{ textDecoration: "none" }}>
                    {" "}
                    Comapny Name
                  </a>
                </p>
              </div>

              <div className="col-md-4 col-sm-6 col-xs-12">
                <ul className="social-icons">
                  <li>
                    <a className="facebook" href="#">
                      <i className="fa fa-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a className="twitter" href="#">
                      <i className="fa fa-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a className="linkedin" href="#">
                      <i className="fa fa-linkedin"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </Container>
        </footer>
      ) : (
        <footer className="site-footer">
          <Container>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <h6>About</h6>
                <p className="text-justify">
                  Company Name.com Lorem Ipsum is simply dummy text of the
                  printing and typesetting industry. Lorem Ipsum has been the
                  industry's standard dummy text ever since the 1500s, when an
                  unknown printer took a galley of type and scrambled it to make
                  a type specimen book. It has survived not only five centuries,
                  but also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s.
                </p>
              </Grid>
              <Grid item xs={12}>
                <h6>Quick Links</h6>
                <ul className="footer-links">
                  <li>
                    <a
                      style={{ textDecoration: "none" }}
                      href="http://scanfcode.com/about/"
                    >
                      About Us
                    </a>
                  </li>
                  <li>
                    <a
                      style={{ textDecoration: "none" }}
                      href="http://scanfcode.com/contact/"
                    >
                      Contact Us
                    </a>
                  </li>
                  <li>
                    <a
                      style={{ textDecoration: "none" }}
                      href="http://scanfcode.com/contribute-at-scanfcode/"
                    >
                      Contribute
                    </a>
                  </li>
                  <li>
                    <a
                      style={{ textDecoration: "none" }}
                      href="http://scanfcode.com/privacy-policy/"
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a
                      style={{ textDecoration: "none" }}
                      href="http://scanfcode.com/sitemap/"
                    >
                      Sitemap
                    </a>
                  </li>
                </ul>
              </Grid>
            </Grid>
            <hr style={{ marginTop: "8px" }} />
          </Container>
          <Container style={{ marginTop: "8px" }}>
            <div className="row">
              <div className="col-md-8 col-sm-6 col-xs-12">
                <p className="copyright-text">
                  Copyright &copy; 2021 All Rights Reserved by
                  <a href="#" style={{ textDecoration: "none" }}>
                    {" "}
                    Comapny Name
                  </a>
                </p>
              </div>

              <div className="col-md-4 col-sm-6 col-xs-12">
                <ul className="social-icons">
                  <li>
                    <a className="facebook" href="#">
                      <i className="fa fa-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a className="twitter" href="#">
                      <i className="fa fa-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a className="linkedin" href="#">
                      <i className="fa fa-linkedin"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </Container>
        </footer>
      )}
    </>
  );
};

export default Footer;
