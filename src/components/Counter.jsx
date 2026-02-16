import { clamp } from '@/utils/utils';
import { clsx } from 'clsx';
import Button from './Button';

export default function Counter({ variant = 'lg', value, min = 0, max = 99, onCountChange }) {
  const isLarge = variant === 'lg';
  const isMax = value >= max;
  const isMin = value <= min;

  const handleDecrease = () => {
    onCountChange(prevCount => clamp(prevCount - 1, min, max));
  };

  const handleIncrease = () => {
    onCountChange(prevCount => clamp(prevCount + 1, min, max));
  };

  return (
    <div
      className={clsx('d-flex justify-content-between align-items-center gap-1 gap-lg-2 w-50 w-md-auto flex-grow-1')}
    >
      <Button
        type="button"
        variant="outline-neutral"
        shape="circle"
        size={isLarge ? 'lg' : 'sm'}
        className={clsx(
          'd-flex justify-content-center align-items-center flex-shrink-0 flex-grow-0',
          isLarge ? 'p-4 btn-circle-lg' : 'p-2 btn-circle-sm',
        )}
        onClick={handleDecrease}
        disabled={isMin}
      >
        <span className="material-symbols-rounded align-bottom"> remove </span>
      </Button>
      <span
        className={clsx(
          'noto-serif-tc fw-bold lh-sm text-center',
          isLarge ? 'fs-6 product-counter' : 'fs-lg-7 add-on-counter',
        )}
      >
        {value}
      </span>
      <Button
        type="button"
        variant="outline-neutral"
        shape="circle"
        size={isLarge ? 'lg' : 'sm'}
        className={clsx(
          'd-flex justify-content-center align-items-center flex-shrink-0 flex-grow-0',
          isLarge ? 'p-4 btn-circle-lg' : 'p-2 btn-circle-sm',
        )}
        onClick={handleIncrease}
        disabled={isMax}
      >
        <span className="material-symbols-rounded align-bottom"> add_2 </span>
      </Button>
    </div>
  );
}
