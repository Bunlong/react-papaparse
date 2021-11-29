import React, { CSSProperties, useState, useEffect } from 'react';

const DEFAULT_PROGRESS_BAR_COLOR = '#659cef';

const styles = {
  progressBar: {
    borderRadius: 3,
    boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, .2)',
    bottom: 14,
    // position: 'absolute',
    width: '100%',
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
  style?: any;
  className?: string;
  percentage: number;
  display: string;
  isButton?: boolean;
}

export default function ProgressBar(props: Props) {
  const { style, className, display, isButton } = props;
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    setPercentage(props.percentage);
  }, [props.percentage]);

  return (
    <div
      style={Object.assign({}, isButton ? styles.button : {})}
      className={className}
    >
      <span
        style={Object.assign({}, styles.progressBar, styles.fill, style, {
          width: `${percentage}%`,
          display,
        })}
      />
    </div>
  );
}
