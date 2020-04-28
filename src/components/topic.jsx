import React from 'react';
import PropTypes from 'prop-types';
import { Container, Text } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';

const anchor = new PIXI.Point(0.5, 0.5);

const TOPIC_TEXT_STYLE = new PIXI.TextStyle({
  fill: 0x4a4a4a,
  // TODO: BlinkMacSystemFont
  fontFamily: '-apple-system, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif',
  fontSize: '2em',
});

const Topic = (props) => {
  const {
    // eslint-disable-next-line
    stageWidth, stageHeight, topicCount, name, index,
  } = props;

  return (
    <Container
      x={(index * 120) - 120 * ((topicCount - 1) / 2) + (stageWidth / 2)}
      y={stageHeight / 2}
      interactive
    >
      {/* TODO: topic image */}

      <Text
        anchor={anchor}
        text={name}
        style={TOPIC_TEXT_STYLE}
      />
    </Container>
  );
};

export default Topic;

Topic.propTypes = {
  stageWidth: PropTypes.number.isRequired,
  stageHeight: PropTypes.number.isRequired,
  topicCount: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};
