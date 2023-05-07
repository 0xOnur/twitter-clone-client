import classNames from 'classnames';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
}

const Toast = ({ message, type }: ToastProps) => {
    const toastClasses = classNames(
      'fixed',
      'font-bold',
      'z-50',
      'bottom-4',
      'left-1/2',
      'transform',
      '-translate-x-1/2',
      'bg-white',
      'p-4',
      'rounded-lg',
      'shadow-lg',
      'max-w-md',
      'transition',
      'duration-300',
      'border-l-4',
      {
        'border-green-400 text-green-800': type === 'success',
        'border-red-400 text-red-800': type === 'error',
        'border-blue-400 text-blue-800': type === 'info',
      }
    );
  
    return <div className={toastClasses}>{message}</div>;
  };
  

export default Toast;
