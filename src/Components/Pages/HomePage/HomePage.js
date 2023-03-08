import { Fragment } from "react";
import wallpaper from "../../../Assets/wallpaper.webp";

const HomePage = () => {
  return (
    <Fragment>
      <img
        src={wallpaper}
        style={{ width: "100%", height: "100%", position: "fixed" }}
        alt="Wallpaper"
      />
      <h1
        style={{
          position: "relative",
          zIndex: "20",
          color: "hsl(34deg 100% 50%)"
        }}
      >
        Welcome To Expense Tracker
      </h1>
    </Fragment>
  );
};

export default HomePage;
