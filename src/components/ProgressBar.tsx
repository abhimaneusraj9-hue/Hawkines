interface Props {
  current: number;
  max: number;
  color?: string;
  showLabel?: boolean;
  height?: string;
  labelLeft?: string;
  labelRight?: string;
}

export function ProgressBar({ current, max, color = 'bg-teal-500', showLabel = true, height = 'h-2.5', labelLeft, labelRight }: Props) {
  const pct = Math.min((current / max) * 100, 100);
  return (
    <div className="w-full">
      {(labelLeft || labelRight) && (
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>{labelLeft}</span>
          <span>{labelRight}</span>
        </div>
      )}
      <div className={`w-full bg-gray-200 rounded-full ${height} overflow-hidden`}>
        <div
          className={`${height} ${color} rounded-full transition-all duration-700 ease-out`}
          style={{ width: `${pct}%` }}
        />
      </div>
      {showLabel && !labelRight && (
        <p className="text-xs text-gray-400 mt-1 text-right">{current} / {max}</p>
      )}
    </div>
  );
}
