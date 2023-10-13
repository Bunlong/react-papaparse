import React, { CSSProperties, useState, useEffect } from 'react';

const DEFAULT_PROGRESS_BAR_COLOR = '#659cef';

const styles = {
  progressBar: {
    borderRadius: 3,
    boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, .2)',
    bottom: 14,
    width: '100%',
    // position: 'absolute',
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

interface IProgressBarProps {
  style?: any;
  className?: string;
  percentage: number;
  display: string;
  isButton?: boolean;
}

export default function ProgressBar({ style, className, percentage, display, isButton }: IProgressBarProps): React.ReactElement {
  const [displayPercentage, setDisplayPercentage] = useState<number>(0);

  useEffect(() => {
    setDisplayPercentage(percentage);
  }, [percentage]);

  return (
    <span
      style={Object.assign({}, styles.progressBar, styles.fill, style, {
        width: `${displayPercentage}%`,
        display,
      })}
      className={className}
    />
  );
}

