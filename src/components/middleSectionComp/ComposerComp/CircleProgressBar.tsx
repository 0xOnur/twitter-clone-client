import classNames from 'classnames';
import React from 'react';

interface Props {
  value: number;
  limit: number;
}

const CircleProgressBar: React.FC<Props> = ({ value, limit }) => {
  const progress = (value / limit) * 100;
  const remainingLimit = limit -value;

  const styles = {
    "--value": progress,
    "--size": "30px",
    "--thickness": "2px",
  } as React.CSSProperties

  const circleClasses = classNames("radial-progress border border-1 text-primary-base", {
    "text-yellow-base": remainingLimit <= 20 && remainingLimit > 0,
    "text-primary-base": remainingLimit > 20,
    "text-red-600": remainingLimit <= 0,
  })

  return (
    <div 
      className={circleClasses} 
      style={styles}
    >
      {remainingLimit <= 20 && (
        <div className='text-sm'>
          {remainingLimit}
        </div>
      )}
    </div>
  );
};

export default CircleProgressBar;
