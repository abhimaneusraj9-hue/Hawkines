interface StarRatingProps {
  stars: number;
}

export function StarRating({ stars }: StarRatingProps) {
  return (
    <div className="flex justify-center gap-0.5 mt-1">
      {[1, 2, 3].map(i => (
        <span
          key={i}
          className="text-sm"
          style={{ color: i <= stars ? '#facc15' : '#e5e7eb', textShadow: i <= stars ? '0 1px 3px rgba(250,204,21,0.5)' : 'none' }}
        >
          ★
        </span>
      ))}
    </div>
  );
}
