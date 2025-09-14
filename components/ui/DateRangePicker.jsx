// DateRangePicker.jsx
import React from 'react';

export default function DateRangePicker({ value, onChange, presets }) {
  return (
    <div className="flex gap-2 items-center">
      <input
        type="date"
        value={value.start ?? ''}
        onChange={e => onChange({ ...value, start: e.target.value })}
        className="input input-bordered text-black"
        aria-label="Start date"
      />
      <span className='text-black'>-</span>
      <input
        type="date"
        value={value.end ?? ''}
        onChange={e => onChange({ ...value, end: e.target.value })}
        className="input input-bordered text-black"
        aria-label="End date"
      />
      {presets && presets.length > 0 && (
        <div className="flex gap-1 ml-2">
          {presets.map((preset) => (
            <button
              key={preset.label}
              type="button"
              className="btn btn-xs text-black bg-amber-300"
              onClick={() => onChange(preset.range)}
            >
              {preset.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
