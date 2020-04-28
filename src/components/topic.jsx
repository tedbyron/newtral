import React from 'react';
import PropTypes from 'prop-types';
import { Container, Text } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';

const anchor = new PIXI.Point(0.5, 0.5);
const TOPIC_TEXT_STYLE = new PIXI.TextStyle({
  fill: 0x4a4a4a,
  fontSize: '2em',
});

const Topic = ({
  stageWidth,
  stageHeight,
  topicCount,
  name,
  index,
  setCurrentTopic,
}) => (
  <Container
    x={(index * 120) - 120 * ((topicCount - 1) / 2) + (stageWidth / 2)}
    y={stageHeight / 2}
    buttonMode
    interactive
    pointerdown={setCurrentTopic}
  >
    {/* TODO: topic image */}

    <Text
      anchor={anchor}
      text={name}
      style={TOPIC_TEXT_STYLE}
    />
  </Container>
);

export default Topic;

Topic.propTypes = {
  stageWidth: PropTypes.number.isRequired,
  stageHeight: PropTypes.number.isRequired,
  topicCount: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  setCurrentTopic: PropTypes.func.isRequired,
};
