import { Button, Col, Container, Row } from "react-bootstrap";
import "./App.css";
import { useState } from "react";
import axios from "axios";
import ClipboardJS from "clipboard";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [url, seturl] = useState("");
  const [isvalidurl, setisvalidurl] = useState(true)
  const [responseData, setresponseData] = useState([]);
  const [loading, setloading] = useState(false)

  const Notification = () => toast("Copied to clipboard!", {
    position: "bottom-left",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce
    });


    const validateUrl = (Url) => {
      const Regex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/
      return Regex.test(Url);
    };

  const apiKey = "GdqQrAz90KzIy3LSZwtmFudeUSatzXBm6L5uvS4CU19vr";
  // const apiUrl = `https://www.shrtlnk.dev/api/v2/shorten?url=${encodeURIComponent(url)}&api_key=${apiKey}`;
  const HandleClick = async () => {
    try {
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

  const HandleChange = (e) =>{

  seturl(e.target.value);
  setisvalidurl(validateUrl(e.target.value));
  }

  const clipboard = new ClipboardJS(".cpybtn");
  clipboard.on("success", function (e) {
    console.log(e);
  });
  clipboard.on("error", function (e) {
    console.error(e);
  });
  return (
    <>
      <Container>
        <ToastContainer
          
        />
        <Row>
          <Col>
            <h1 className="text-center">URL Shortener</h1>
            <h5 className="text-center" style={{ opacity: 0.7 }}>
              You can generate the shorten url by pasting ur long URLs
            </h5>
          </Col>

          <div className="d-flex justify-content-center">
            <input onKeyDown={(e) => {
        if (e.key === "Enter")
            HandleClick();
        }}
              className="urlinput"
              style={{borderBottomColor: isvalidurl ? 'ActiveBorder' : 'red'}}
              type="text"
              name="url"
              placeholder="Enter URL"
              value={url}
              onChange={HandleChange}
            />
            <Button onClick={HandleClick} className="btn">
              Shorten URL
            </Button>
          </div>

          {responseData.data?.shrtlnk && (
            <div className="d-flex flex-column justify-content-center ">
              <h5 className="text-center mt-5" style={{ opacity: 0.7 }}>
                Your Shourten URl is :{" "}
                <a id="data" href={responseData.data?.shrtlnk}>
                  {" "}
                  {responseData.data?.shrtlnk}{" "}
                </a>
              </h5>
              <Button
                data-clipboard-target="#data"
                className=" cpybtn align-self-center "
                onClick={Notification}
              >
                Copy To ClipBoard
              </Button>
            </div>
          )}
        </Row>
      </Container>
    </>
  );
}

export default App;
