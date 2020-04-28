import React from 'react';
import PropTypes from 'prop-types';
import { Container, Sprite, Text } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';

const anchor = new PIXI.Point(0.5, 0.5);
const ARTICLE_TEXT_STYLE = new PIXI.TextStyle({
  fill: 0x4a4a4a,
  fontSize: '2em',
});

const Article = ({
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
  // eslint-disable-next-line
  thumbnail,
}) => {
  const texture = thumbnail
    ? PIXI.Texture.from(thumbnail)
    : null;

  return (
    <Container
      x={((bias + 42) / 84) * stageWidth}
      y={stageHeight - (reliability / 64) * stageHeight}
      buttonMode
      interactive
    >
      {texture && (
        <Sprite
          anchor={anchor}
          texture={texture}
          width="64"
          height="64"
        />
      )}

      <Text
        anchor={anchor}
        text={`${bias}, ${reliability}`}
        style={ARTICLE_TEXT_STYLE}
      />
    </Container>
  );
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
  thumbnail: PropTypes.string.isRequired,
};
