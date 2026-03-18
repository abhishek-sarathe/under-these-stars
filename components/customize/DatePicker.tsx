"use client";

import { useMemo, useState, useEffect } from "react";

type Props = {
  value: string; // "YYYY-MM-DD" or ""
  onChange: (val: string) => void;
};

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

const selectStyle: React.CSSProperties = {
  flex: 1,
  padding: "13px 14px",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "10px",
  color: "white",
  fontSize: "15px",
  outline: "none",
  cursor: "pointer",
  appearance: "none",
  WebkitAppearance: "none",
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%238AAFD4' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 12px center",
  paddingRight: "32px",
  boxSizing: "border-box",
  transition: "border-color 0.2s",
  minHeight: "48px",
};

export default function DatePicker({ value, onChange }: Props) {
  // Own internal state — each dropdown holds its value independently
  const [day,   setDay]   = useState<number | "">("");
  const [month, setMonth] = useState<number | "">("");
  const [year,  setYear]  = useState<number | "">("");

  // Sync from external value on mount / when value changes from outside
  useEffect(() => {
    if (value && value.includes("-")) {
      const parts = value.split("-");
      if (parts.length === 3) {
        setYear(Number(parts[0]));
        setMonth(Number(parts[1]));
        setDay(Number(parts[2]));
      }
    }
  }, [value]);

  // Days in selected month/year
  const daysInMonth = useMemo(() => {
    if (!year || !month) return 31;
    return new Date(Number(year), Number(month), 0).getDate();
  }, [year, month]);

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1899 },
    (_, i) => currentYear - i
  );

  // Called after any dropdown change — fires onChange only when all three set
  const handleChange = (
    newDay: number | "",
    newMonth: number | "",
    newYear: number | ""
  ) => {
    if (!newDay || !newMonth || !newYear) return;
    // Clamp day to valid range for the month
    const maxDay = new Date(Number(newYear), Number(newMonth), 0).getDate();
    const safeDay = Math.min(Number(newDay), maxDay);
    onChange(
      `${newYear}-${String(newMonth).padStart(2, "0")}-${String(safeDay).padStart(2, "0")}`
    );
  };

  const focus = (e: React.FocusEvent<HTMLSelectElement>) => {
    e.target.style.borderColor = "rgba(200,169,110,0.6)";
  };
  const blur = (e: React.FocusEvent<HTMLSelectElement>) => {
    e.target.style.borderColor = "rgba(255,255,255,0.1)";
  };

  return (
    <div style={{ display: "flex", gap: "10px" }}>

      {/* Day */}
      <select
        style={{ ...selectStyle, flex: "0 0 90px" }}
        value={day}
        onChange={e => {
          const v = e.target.value === "" ? "" : Number(e.target.value);
          setDay(v as number | "");
          handleChange(v as number | "", month, year);
        }}
        onFocus={focus}
        onBlur={blur}
      >
        <option value="" disabled style={{ background: "#1B2D4F" }}>Day</option>
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(d => (
          <option key={d} value={d} style={{ background: "#1B2D4F" }}>{d}</option>
        ))}
      </select>

      {/* Month */}
      <select
        style={selectStyle}
        value={month}
        onChange={e => {
          const v = e.target.value === "" ? "" : Number(e.target.value);
          setMonth(v as number | "");
          handleChange(day, v as number | "", year);
        }}
        onFocus={focus}
        onBlur={blur}
      >
        <option value="" disabled style={{ background: "#1B2D4F" }}>Month</option>
        {MONTHS.map((m, i) => (
          <option key={m} value={i + 1} style={{ background: "#1B2D4F" }}>{m}</option>
        ))}
      </select>

      {/* Year */}
      <select
        style={{ ...selectStyle, flex: "0 0 100px" }}
        value={year}
        onChange={e => {
          const v = e.target.value === "" ? "" : Number(e.target.value);
          setYear(v as number | "");
          handleChange(day, month, v as number | "");
        }}
        onFocus={focus}
        onBlur={blur}
      >
        <option value="" disabled style={{ background: "#1B2D4F" }}>Year</option>
        {years.map(y => (
          <option key={y} value={y} style={{ background: "#1B2D4F" }}>{y}</option>
        ))}
      </select>

    </div>
  );
}
