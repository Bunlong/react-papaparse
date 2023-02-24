import React, { useState, useEffect } from 'react';

const DEFAULT_PROGRESS_BAR_COLOR = '#659cef';

const styles: Record<string, React.CSSProperties> = {
  progressBar: {
    borderRadius: 3,
    boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, .2)',
    bottom: 14,
    width: '100%',
    // position: 'absolute',
  },
  button: {
    position: 'inherit',
    width: '100%',
  },
  fill: {
    backgroundColor: DEFAULT_PROGRESS_BAR_COLOR,
    borderRadius: 3,
    height: 10,
    transition: 'width 500ms ease-in-out',
  },
};

interface Props {
  style?: React.CSSProperties;
  className?: string;
  percentage: number;
  display: string;
  isButton?: boolean;
}

export default function ProgressBar(props: Props) {
  const { style, className, display } = props;
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    setPercentage(props.percentage);
  }, [props.percentage]);

  return (
    <span
      style={Object.assign({}, styles.progressBar, styles.fill, style, {
        width: `${percentage}%`,
        display,
      })}
      className={className}
    />
  );
}
