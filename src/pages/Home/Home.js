import React, { useContext } from "react";
import Thread from "../../components/Thread/Thread";
import { UidContext } from "../../components/AppContext";
import BackgroundVideo from "../../components/BackgroundVideo/BackgroundVideo";
import "./Home.scss";

const Home = () => {
  const uid = useContext(UidContext);
  return (
    <div>
      <BackgroundVideo />
        <Thread/>
      </div>
  );
};

export default Home;
