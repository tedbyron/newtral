import React from 'react';
import PropTypes from 'prop-types';
import { Container, Text } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';

const anchor = new PIXI.Point(0.5, 0.5);

const TEXT_STYLE = {
  fill: 0x4a4a4a,
  fontSize: '2em',
};

const Topic = (props) => {
  const {
    stageWidth, stageHeight, topicCount, name, index,
  } = props;

  return (
    <Container
      // anchor={anchor}
      x={stageWidth / topicCount + index * 100}
      y={stageHeight / 2}
      interactive
    >
      <Text
        anchor={anchor}
        text={name}
        style={TEXT_STYLE}
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
