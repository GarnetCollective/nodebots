import React from "react";

import { CardImg, Row, Col, Container } from "reactstrap";

import axios from "axios";

export class Gallery extends React.Component {
  state = { gallery: [] };
  componentDidMount = async () => {
    try {
      const url = "http://be7f8eb3.ngrok.io";
      const { data } = await axios.get(`${url}/images`);
      if (data.success) {
        this.setState({ gallery: data.images });
      } else {
        console.log("something went wrong");
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  renderGallery = gallery =>
    gallery.map(img => {
      <CardImg top width="100%" src={img} />;
    });

  // return(
  //   <Container>
  //     <Row>
  //       <Col>
  //         <CardImg
  //           top
  //           width="100%"
  //           src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"
  //         />
  //       </Col>
  //       <Col>
  //         <CardImg
  //           top
  //           width="100%"
  //           src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"
  //         />
  //       </Col>
  //       <Col>
  //         <CardImg
  //           top
  //           width="100%"
  //           src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"
  //         />
  //       </Col>
  //     </Row>
  //   </Container>
  // )

  render() {
    const { gallery } = this.state;
    return gallery.length >= 0 ? (
      <Container>
        {gallery.map(img => {
          return (
            <div>
              <CardImg
                top
                width="31.2%"
                src={`http://be7f8eb3.ngrok.io/images/${img}`}
              />
              <CardImg
                top
                width="100%"
                src={`http://be7f8eb3.ngrok.io/images/${img}`}
              />
              <CardImg
                top
                width="100%"
                src={`http://be7f8eb3.ngrok.io/images/${img}`}
              />
            </div>
          );
        })}
      </Container>
    ) : (
      <p>Loading gallery...</p>
    );
  }
}
