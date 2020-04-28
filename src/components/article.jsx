import React from 'react';
import PropTypes from 'prop-types';
import { Container, Sprite, Text } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';

const anchorTop = new PIXI.Point(0.5, 0);
const anchorMid = new PIXI.Point(0.5, 0.5);
const anchorBot = new PIXI.Point(0.5, 1);

const Article = class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      thumbnail: null,
      pointerOver: false,
    };
  }

  /**
   * when the component mounts, retrieve the article thumbnail
   */
  componentDidMount() {
    // const { thumbnail } = this.props;
    // if (thumbnail) {
    //   this.setThumbnail(thumbnail);
    // }
  }

  /**
   * asynchronously try to retrieve and set the thumbnail from a url
   *
   * @param {String} url - the url of the image to be retrieved
   */
  // setThumbnail = async (url) => {
  //   const response = await fetch(url, {
  //     // mode: 'no-cors',
  //     credentials: 'omit',
  //     referrerPolicy: 'no-referrer',
  //   });

  //   if (response.ok) {
  //     response.blob()
  //       .then((blob) => this.setState({
  //         thumbnail: URL.createObjectURL(blob),
  //       }));
  //   }
  // }

  displayInfo = () => {
    this.setState({
      pointerOver: true,
    });
  }

  closeInfo = () => {
    this.setState({
      pointerOver: false,
    });
  }

  openLink = () => {
    const { link } = this.props;
    window.open(link);
  }

  render() {
    const {
      stageWidth,
      stageHeight,
      // eslint-disable-next-line
      author,
      bias,
      // eslint-disable-next-line
      date,
      // eslint-disable-next-line
      headline,
      // eslint-disable-next-line
      link,
      reliability,
      // eslint-disable-next-line
      source,
    } = this.props;
    const { thumbnail, pointerOver } = this.state;

    return (
      <Container
        x={((bias + 42) / 84) * stageWidth}
        y={stageHeight - (reliability / 64) * stageHeight}
        sortableChildren
        buttonMode
        interactive
        pointerover={this.displayInfo}
        pointerout={this.closeInfo}
        pointertap={this.openLink}
      >
        {/* TODO: thumbnail image */}
        {thumbnail && (
          <Sprite
            anchor={anchorMid}
            texture={thumbnail}
            width="64"
            height="64"
          />
        )}

        <Text
          anchor={anchorMid}
          text={`${bias}, ${reliability}`}
          style={{
            fill: reliability > 20 ? 0x4a4a4a : 0xff3860,
            fontSize: '2em',
          }}
        />

        {pointerOver && (
          <Container
            x={0}
            y={-16}
          >
            <Sprite
              anchor={reliability < 32 ? anchorBot : anchorTop}
              width={200}
              height={220}
              texture={PIXI.Texture.WHITE}
              tint={0xfafafa}
            />
            <Text
              anchor={anchorTop}
              y={reliability < 32 ? -210 : 10}
              text={
                `"${headline}"\n\n`
                + `Source: ${source}\n\n`
                + `Bias: ${bias}\n\n`
                + `Reliability: ${reliability}`
              }
              style={{
                // breakWords: true,
                fill: 0x4a4a4a,
                fontSize: '1.5em',
                wordWrap: true,
                wordWrapWidth: 200,
              }}
            />
          </Container>
        )}
      </Container>
    );
  }
};

export default Article;

Article.propTypes = {
  stageWidth: PropTypes.number.isRequired,
  stageHeight: PropTypes.number.isRequired,
  author: PropTypes.string.isRequired,
  bias: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  headline: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  reliability: PropTypes.number.isRequired,
  source: PropTypes.string.isRequired,
  // thumbnail: PropTypes.string.isRequired,
};
