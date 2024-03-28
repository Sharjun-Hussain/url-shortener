import { Button, Col, Container, Row } from "react-bootstrap";
import "./App.css";
import { useState } from "react";

function App() {
  const [url, seturl] = useState("");

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
            <Button className="btn">Shorten URL</Button>
          </div>

          <h5 className="text-center mt-5" style={{ opacity: 0.7 }}>
           Your Shourten URl is : 
          </h5>
        </Row>
      </Container>
    </>
  );
}

export default App;
