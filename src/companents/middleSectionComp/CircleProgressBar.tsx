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

  return (
    <div 
      className={`radial-progress border border-1 text-primary-base 
        ${remainingLimit <= 20 && remainingLimit > 0 ? (`text-yellow-base`) : remainingLimit > 20 ? (`text-primary-base`) : ('text-red-600')} }`
      } 
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
