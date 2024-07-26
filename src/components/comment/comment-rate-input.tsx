import { Star } from '@phosphor-icons/react';

const MAX_RATE = 5;

export function CommentRateInput({
  iconSize = 28,
  maxRate = MAX_RATE,
  rate,
  setRate,
}: {
  iconSize?: number;
  maxRate?: number;
  rate: number;
  setRate: (rate: number) => void;
}) {
  return (
    <div className="flex items-center gap-1">
      {new Array(maxRate).fill(0).map((_, index) => {
        if (rate >= index + 1) {
          return (
            <button
              className={`outline-none`}
              key={index}
              onClick={() => setRate(index === 0 ? 0 : index + 1)}
            >
              <Star weight="fill" size={iconSize} className="text-purple-100" />
            </button>
          );
        }
        return (
          <button className="outline-none" key={index} onClick={() => setRate(index + 1)}>
            <Star size={iconSize} className="text-purple-100" />
          </button>
        );
      })}
    </div>
  );
}
