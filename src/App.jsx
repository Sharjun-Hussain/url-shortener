import { Button, Col, Container, Row } from "react-bootstrap";
import "./App.css";
import { useState } from "react";
import axios from "axios";
import ClipboardJS from "clipboard";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "./assets/logo.png";
// import Twitter from "./assets/Icons/Twitter.svg";
// import Linkedin from "./assets/Icons/Linkedin.svg";
// import Mail from "./assets/Icons/Mail.svg";
// import Github from "./assets/Icons/Github.svg";

function App() {
  const [url, seturl] = useState("");
  const [isvalidurl, setisvalidurl] = useState(true);
  const [responseData, setresponseData] = useState([]);
  const [loading, setloading] = useState(false);
  const [pageloading, setpageloading] = useState(false);
  if (responseData.data?.shrtlnk) {
    
  }
  const Notification = () =>
    toast("Copied to clipboard!", {
      position: "bottom-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });

  const validateUrl = (Url) => {
    const Regex =
      /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;
    return Regex.test(Url);
  };

  const apiKey = "GdqQrAz90KzIy3LSZwtmFudeUSatzXBm6L5uvS4CU19vr";
  // const apiUrl = `https://www.shrtlnk.dev/api/v2/shorten?url=${encodeURIComponent(url)}&api_key=${apiKey}`;
  const HandleClick = async () => {
    try {
      setloading((prev) => !prev);
      await axios
        .post(
          `https://shrtlnk.dev/api/v2/link`,
          { url: url },
          {
            headers: {
              "api-key": apiKey,
              "Accept ": "application/json ",

              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          setresponseData(...responseData, res);
        })
        .catch((err) => console.error(err));
    } catch (err) {
      console.log(err);
    }
  };

  const HandleChange = (e) => {
    seturl(e.target.value);
    setisvalidurl(validateUrl(e.target.value));
  };

  const HandleNext = () => {
    setpageloading((prev) => !prev);
    window.location.href = "/";
  };
  const clipboard = new ClipboardJS(".cpybtn");
  clipboard.on("success", function (e) {
    console.log(e);
  });
  clipboard.on("error", function (e) {
    console.error(e);
  });
  return (
    <>
      <Container fluid>
        <ToastContainer />
        <Row>
          <Col md={12} xs={12} className="d-flex justify-content-center mt-4">
            <img
              src={logo}
              className="mb-5 logo "
              width="200"
              alt="Logo Images"
            />
          </Col>
        </Row>

        <Row>
          <Col>
            <h1 className="text-center ubuntu-bold">URL Shortener</h1>
            <h1 className="text-center ubuntu-light" style={{ opacity: 0.7 }}>
              Paste the URL to be shortened
            </h1>
          </Col>
        </Row>
        {responseData.data?.shrtlnk ? (
          <Row>
            <Col className="text-center">
              <input
                onKeyDown={(e) => {
                  if (e.key === "Enter") Notification();
                }}
                id="data"
                type="text"
                className="urlinput"
                placeholder="Enter the URL to paste into "
                name="url"
                value={responseData.data?.shrtlnk}
              />{" "}
              <Button
                onClick={Notification}
                data-clipboard-target="#data"
                className=" cpybtn align-self-center "
              >
                Copy Shorten URL
              </Button>
            </Col>
          </Row>
        ) : (
          <Row>
            <Col className="text-center">
              <input
                onKeyDown={(e) => {
                  if (e.key === "Enter") HandleClick();
                }}
                type="text"
                className="urlinput"
                placeholder="Enter the URL to paste into "
                name="url"
                value={url}
                onChange={HandleChange}
              />{" "}
              <Button onClick={HandleClick} disabled={loading} className="mb-3">
                {loading ? "Loading..." : "Shorten URL"}
              </Button>
            </Col>
          </Row>
        )}

        <Row>
          <Col className="d-flex flex-column justify-content-center align-items-center">
            <Button disabled={pageloading} onClick={HandleNext} className=" w-75  ">
              {pageloading ? "Loading..." : "Shorten Another URL"}
            </Button>
          </Col>
        </Row>
      </Container>
      <Container fluid className="p-0 m-0">
        <Row className="footer ">
          {/* <Col md={12} className="d-flex justify-content-center">
             <div className="SocialIconsWrapper d-flex justify-content-center gap-3 ">
              <a href="https://twitter.com/sharjun_hussain/">
                <div className="Social">
                  <img src={Twitter} width={30} />
                </div>
              </a>
              <a href="https://www.linkedin.com/in/sharjun-hussain/">
                <div className="Social">
                  <img src={Linkedin} width={22} />
                </div>
              </a>
              <a href="https://github.com/Sharjun-Hussain/">
                <div className="Social">
                  <img src={Github} width={25} />
                </div>
              </a>
              <a href="mailto:sharjunhussain@outlook.com">
                {" "}
                <div className="Social">
                  <img src={Mail} width={30} />
                </div>
              </a>
            </div> 
          </Col> */}
          <h6 className="ubuntu-regular ">Developed By : Sharjun Hussain </h6>
        </Row>
      </Container>
    </>
  );
}

export default App;
