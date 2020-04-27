import React from 'react';
import { createStageClass } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';

PIXI.settings.RESOLUTION = window.devicePixelRatio;

const PIXIStage = createStageClass();

const Stage = class extends React.Component {
  constructor(props) {
    super(props);

    const style = window.getComputedStyle(document.getElementById('section-stage'));
    const paddingX = parseInt(style.getPropertyValue('padding-left'), 10) + parseInt(style.getPropertyValue('padding-right'), 10);
    const paddingY = parseInt(style.getPropertyValue('padding-top'), 10) + parseInt(style.getPropertyValue('padding-bottom'), 10);

    this.state = {
      width: parseInt(style.getPropertyValue('width'), 10) - paddingX,
      height: parseInt(style.getPropertyValue('height'), 10) - paddingY,
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.onWindowResize);
  }

  onWindowResize = () => {
    const style = window.getComputedStyle(document.getElementById('section-stage'));
    const paddingX = parseInt(style.getPropertyValue('padding-left'), 10) + parseInt(style.getPropertyValue('padding-right'), 10);
    const paddingY = parseInt(style.getPropertyValue('padding-top'), 10) + parseInt(style.getPropertyValue('padding-bottom'), 10);

    this.setState({
      width: parseInt(style.getPropertyValue('width'), 10) - paddingX,
      height: parseInt(style.getPropertyValue('height'), 10) - paddingY,
    });
  }

  render() {
    const { width, height } = this.state;

    return (
      <PIXIStage
        options={{
          width,
          height,
          transparent: true,
          autoDensity: true,
        }}
      />
    );
  }
};

export default Stage;
