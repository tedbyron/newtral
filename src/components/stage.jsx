import React from 'react';
import PropTypes from 'prop-types';
import { createStageClass } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';

import Topic from './topic';

PIXI.settings.RESOLUTION = window.devicePixelRatio;

const DEFAULT_STAGE = createStageClass();

const Stage = class extends React.Component {
  constructor(props) {
    super(props);

    const { articles } = this.props;
    const topics = [];

    // loop through articles, collect unique topics, and add articles to topics
    articles.forEach((article) => {
      const topic = topics.find((e) => e.name === article.topic);

      // if the topic is not in the list, add it with the article, or else push
      // the article onto the array of articles
      if (typeof topic === 'undefined') {
        topics.push({
          name: article.topic,
          key: `topic${topics.length}`,
          nodes: [article],
        });
      } else {
        topic.nodes.push(article);
      }
    });

    // sort topics alphabetically
    topics.sort((a, b) => a.name.localeCompare(b.name));

    this.state = {
      width: 0,
      height: 0,
      topics,
    };
  }

  componentDidMount() {
    // add the window resize event listener to the window
    window.addEventListener('resize', this.onWindowResize);

    // fire the window resize function once to set the initial width and height
    // of the stage
    this.onWindowResize();
  }

  componentWillUnmount() {
    // remove the window resize event listener from the window
    window.removeEventListener('resize', this.onWindowResize);
  }

  /**
   * recalculates the width and height of the stage based on the computed style
   * of its container and the height of the screen
   */
  onWindowResize = () => {
    const style = window.getComputedStyle(document.getElementById('section-stage'));
    const paddingX = parseInt(style.getPropertyValue('padding-left'), 10) + parseInt(style.getPropertyValue('padding-right'), 10);
    const paddingY = parseInt(style.getPropertyValue('padding-top'), 10) + parseInt(style.getPropertyValue('padding-bottom'), 10);
    const headerHeight = document.getElementById('header').offsetHeight;
    const footerHeight = document.getElementById('footer').offsetHeight;

    this.setState({
      width: parseInt(style.getPropertyValue('width'), 10) - paddingX,
      height: document.body.clientHeight - headerHeight - footerHeight - paddingY,
    });
  }

  render() {
    const { width, height, topics } = this.state;

    return (
      <DEFAULT_STAGE
        options={{
          width,
          height,
          transparent: true,
          autoDensity: true,
        }}
      >
        {topics.map((topic, i) => (
          <Topic
            stageWidth={width}
            stageHeight={height}
            topicCount={topics.length}
            name={topic.name}
            index={i}
            key={topic.key}
          />
        ))}
      </DEFAULT_STAGE>
    );
  }
};

export default Stage;

Stage.propTypes = {
  articles: PropTypes.arrayOf(
    PropTypes.exact({
      author: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      headline: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      source: PropTypes.string.isRequired,
      thumbnail: PropTypes.string.isRequired,
      topic: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  // sources: PropTypes.arrayOf(
  //   PropTypes.exact({
  //     bias: PropTypes.string.isRequired,
  //     source: PropTypes.string.isRequired,
  //     reliability: PropTypes.string.isRequired,
  //   }).isRequired,
  // ).isRequired,
};
