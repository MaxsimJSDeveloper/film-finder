import css from "./SearchBar.module.css";

export default function SearchBar({ onSubmit }) {
  return (
    <form onSubmit={onSubmit} className={css.form}>
      <input
        type="text"
        name="movieName"
        placeholder="Enter movie name"
        autoComplete="off"
        autoFocus
        pattern="^[a-zA-Z]+$"
        required
        className={css.input}
      />
      <button type="submit" className={css.btnSearch}>
        Search
      </button>
    </form>
  );
}
