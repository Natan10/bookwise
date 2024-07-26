import { Star } from '@phosphor-icons/react';

export function Stars({ rate }: { rate: number }) {
  const stars = new Array(5);

  for (let i = 0; i < 5; i++) {
    if (i <= rate - 1) {
      stars[i] = 1;
    } else {
      stars[i] = 0;
    }
  }

  return (
    <div className="flex items-center gap-[5px]">
      {stars.map((star, i) =>
        star === 1 ? (
          <Star key={i} size={14} weight={'fill'} className="text-purple-100" />
        ) : (
          <Star key={i} size={14} color="#8381D9" />
        ),
      )}
    </div>
  );
}
