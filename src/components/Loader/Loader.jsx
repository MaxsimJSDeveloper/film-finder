import PropagateLoader from "react-spinners/PropagateLoader";
import css from "./Loader.module.css";

const Loader = ({ loading }) => {
  return (
    <div className={css.loader}>
      <PropagateLoader
        color="#b96c09"
        cssOverride={null}
        loading={loading}
        size={25}
        speedMultiplier={0.7}
      />
    </div>
  );
};

export default Loader;
