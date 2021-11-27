import React, { CSSProperties } from 'react';

const DEFAULT_PROGRESS_BAR_COLOR = '#659cef';

const styles = {
  progressBar: {
    borderRadius: 3,
    boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, .2)',
    bottom: 14,
    position: 'absolute',
    width: '80%',
  } as CSSProperties,
  button: {
    position: 'inherit',
    width: '100%',
  } as CSSProperties,
  fill: {
    backgroundColor: DEFAULT_PROGRESS_BAR_COLOR,
    borderRadius: 3,
    height: 10,
    transition: 'width 500ms ease-in-out',
  } as CSSProperties,
};

interface Props {
  style: any;
  percentage: number;
  display: string;
  isButton?: boolean;
}

export default class ProgressBar extends React.Component<Props> {
  render() {
    const {
      style,
      percentage,
      display,
      isButton,
    } = this.props;

    return (
      <div
        style={Object.assign(
          {},
          styles.progressBar,
          isButton && styles.button,
        )}
      >
        <span
          style={Object.assign({}, styles.fill, style, {
            width: `${percentage}%`,
            display,
          })}
        />
      </div>
    );
  }
}
