import React, { PureComponent, PropTypes } from 'react';
import classnames from 'classnames/bind';
import styles from './CarouselItem.pcss';

const cx = classnames.bind(styles);

export default class CarouselItem extends PureComponent {

  static propTypes = {
    img: PropTypes.any,
  };

  render() {
    return (
      <div
        className={cx('carousel-item')}
        style={{
          backgroundImage: `url(${this.props.img})`,
        }}
      />
    );
  }
}
