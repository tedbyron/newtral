import React from 'react';
import PropTypes from 'prop-types';
import { createStageClass, Text } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';

import Topic from './topic';

PIXI.settings.RESOLUTION = window.devicePixelRatio;

const DEFAULT_STAGE = createStageClass();

const Stage = class extends React.Component {
  constructor(props) {
    super(props);

    const { articles, sources } = this.props;
    const topics = [];

    // loop through articles, collect unique topics, and add articles to topics
    articles.forEach((article) => {
      const topic = topics.find((e) => e.name === article.topic);
      const source = sources.find((e) => e.source === article.source);
      if (typeof source === 'undefined') {
        /* eslint-disable-next-line */
        console.warn(`Article ${article.id} has an unknown source`);
      }

      // if the topic is not in the list, add it with the article, or else push
      // the article onto the topic's nodes
      if (typeof topic === 'undefined') {
        topics.push({
          name: article.topic,
          key: `topic${topics.length}`,
          nodes: [{ ...article, ...source }],
        });
      } else {
        topic.nodes.push({ ...article, ...source });
      }
    });

    // sort topics alphabetically
    topics.sort((a, b) => a.name.localeCompare(b.name));

    this.state = {
      width: 0,
      height: 0,
      topics,
      currentTopic: null,
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
   * when a topic is clicked, clear the topics from the stage and populate the
   * stage with the clicked topic's articles
   * @param {String} topic - the clicked topic
   */
  setCurrentTopic = (topic) => {
    this.setState({
      currentTopic: topic,
    });
  }

  /**
   * clears the current topic and returns to the topics screen
   */
  clearCurrentTopic = () => {
    this.setState({
      currentTopic: null,
    });
  }

  /**
   * recalculates the width and height of the stage based on the computed style
   * of its container and the height of the screen
   */
  onWindowResize = () => {
    const style = window.getComputedStyle(document.getElementById('container-stage'));
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
    const {
      width, height, topics, currentTopic,
    } = this.state;

    return (
      <DEFAULT_STAGE
        options={{
          width,
          height,
          transparent: true,
          autoDensity: true,
        }}
      >
        {!currentTopic && (
          <Text
            anchor={{
              x: 0.5,
              y: 0,
            }}
            position={{
              x: width / 2,
              y: 0,
            }}
            text="Topics"
            style={{
              fill: 0x4a4a4a,
              fontSize: '3em',
            }}
          />
        )}
        {!currentTopic && topics.map((topic, i) => (
          <Topic
            stageWidth={width}
            stageHeight={height}
            topicCount={topics.length}
            name={topic.name}
            index={i}
            setCurrentTopic={() => this.setCurrentTopic(topic.name)}
            key={topic.key}
          />
        ))}
        {currentTopic && (
          <Text
            text="◂ Topics"
            style={{
              fill: 0x4a4a4a,
              fontSize: '2em',
            }}
            buttonMode
            interactive
            pointerdown={this.clearCurrentTopic}
          />
        )}
        {currentTopic && (
          <Text
            anchor={{
              x: 0.5,
              y: 0,
            }}
            position={{
              x: width / 2,
              y: 0,
            }}
            text={currentTopic}
            style={{
              fill: 0x4a4a4a,
              fontSize: '3em',
            }}
          />
        )}
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
  sources: PropTypes.arrayOf(
    PropTypes.exact({
      bias: PropTypes.number.isRequired,
      source: PropTypes.string.isRequired,
      reliability: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
};
