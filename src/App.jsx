import { Button, Col, Container, Row } from "react-bootstrap";
import "./App.css";
import { useState } from "react";
import axios from "axios";

function App() {
  const [url, seturl] = useState("");
  const [responseData, setresponseData] = useState([]);

  const apiKey = "GdqQrAz90KzIy3LSZwtmFudeUSatzXBm6L5uvS4CU19vr";
  // const apiUrl = `https://www.shrtlnk.dev/api/v2/shorten?url=${encodeURIComponent(url)}&api_key=${apiKey}`;
  const HandleClick =  async () => {
    try {
      await axios
        .post(`https://shrtlnk.dev/api/v2/link`, { url: url }, {
          headers : {
            'api-key' : apiKey,
            "Accept ": "application/json ",
            
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          setresponseData(...responseData, res);
        })
        .catch((err) => console.error(err));

        seturl("");
    } catch (err) {
      console.log(err);
    }
  };
  
  return (
    <>
      <Container>
        <Row>
          <Col>
            <h1 className="text-center">URL Shortener</h1>
            <h5 className="text-center" style={{ opacity: 0.7 }}>
              You can generate the shorten url by pasting ur long URLs
            </h5>
          </Col>

          <div className="d-flex justify-content-center">
            <input
              className="urlinput"
              type="text"
              name="url"
              placeholder="Enter URL"
              value={url}
              onChange={(e) => seturl(e.target.value)}
            />
            <Button onClick={HandleClick} className="btn">
              Shorten URL
            </Button>
          </div>

         { responseData.data?.shrtlnk && (
           <h5 className="text-center mt-5" style={{ opacity: 0.7 }}>
           Your Shourten URl is : <a href={responseData.data?.shrtlnk}> {responseData.data?.shrtlnk} </a>
         </h5>)
         }
        </Row>
      </Container>
    </>
  );
}

export default App;
