import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { Carousel, CarouselItem } from 'react-bootstrap';

class Home extends Component {
  render() {
    return (
      <div>
        <Helmet title="Home" />
        <Carousel>
          <CarouselItem>
            <img
              src={require('./ASP-NET-Banners-01.png')}
              alt="ASP.NET"
              className="img-responsive"
            />
            <div className="carousel-caption">
              <p>
                Learn how to build ASP.NET apps that can run anywhere.
                <a className="btn btn-default btn-default" href="http://go.microsoft.com/fwlink/?LinkID=525028&clcid=0x409">
                  Learn More
                </a>
              </p>
            </div>
          </CarouselItem>
          <CarouselItem>
            <img
              src={require('./Banner-02-VS.png')}
              alt="Visual Studio"
              className="img-responsive"
            />
            <div className="carousel-caption">
              <p>
                There are powerful new features in Visual Studio for building modern web apps.
                <a className="btn btn-default btn-default" href="http://go.microsoft.com/fwlink/?LinkID=525030&clcid=0x409">
                  Learn More
                </a>
              </p>
            </div>
          </CarouselItem>
          <CarouselItem>
            <img
              src={require('./ASP-NET-Banners-02.png')}
              alt="Package Management"
              className="img-responsive"
            />
            <div className="carousel-caption">
              <p>
                Bring in libraries from NuGet, Bower, and npm, and automate
                tasks using Grunt or Gulp.
                <a className="btn btn-default btn-default" href="http://go.microsoft.com/fwlink/?LinkID=525029&clcid=0x409">
                  Learn More
                </a>
              </p>
            </div>
          </CarouselItem>
          <CarouselItem>
            <img
              src={require('./Banner-01-Azure.png')}
              alt="Microsoft Azure"
              className="img-responsive"
            />
            <div className="carousel-caption">
              <p>
                Learn how Microsoft's Azure cloud platform allows you to build,
                deploy, and scale web apps.
                <a className="btn btn-default btn-default" href="http://go.microsoft.com/fwlink/?LinkID=525027&clcid=0x409">
                  Learn More
                </a>
              </p>
            </div>
          </CarouselItem>
        </Carousel>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps() {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
