import React from "react";
import "../styles/GenreFilter.css";

export default function GenreFilter({ genres, active, onChange }) {
  return (
    <div className="genre-filter">
      <button
        className={active === null ? "active" : ""}
        onClick={() => onChange(null)}
      >
        Todos
      </button>

      {genres.map((g) => (
        <button
          key={g}
          className={active === g ? "active" : ""}
          onClick={() => onChange(g)}
        >
          {g}
        </button>
      ))}
    </div>
  );
}
