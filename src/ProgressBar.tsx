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
  buttonProgressBar: {
    position: 'inherit',
    width: '100%',
  } as CSSProperties,
  progressBarFill: {
    backgroundColor: DEFAULT_PROGRESS_BAR_COLOR,
    borderRadius: 3,
    height: 10,
    transition: 'width 500ms ease-in-out',
  } as CSSProperties,
};

interface Props {
  progressBarColor: string;
  progressBar: number;
  displayProgressBarStatus: string;
  isButtonProgressBar?: boolean;
}

export default class ProgressBar extends React.Component<Props> {
  render() {
    const {
      progressBarColor,
      progressBar,
      displayProgressBarStatus,
      isButtonProgressBar,
    } = this.props;

    return (
      <div
        style={Object.assign(
          {},
          styles.progressBar,
          isButtonProgressBar && styles.buttonProgressBar,
        )}
      >
        <span
          style={Object.assign(
            {},
            styles.progressBarFill,
            { backgroundColor: progressBarColor || DEFAULT_PROGRESS_BAR_COLOR },
            {
              width: `${progressBar}%`,
              display: displayProgressBarStatus,
            },
          )}
        />
      </div>
    );
  }
}
