import React, { useContext } from "react";
import { UidContext } from "../components/AppContext";
import Log from "../components/Log";
import UpdateProfil from "../components/Profil/UpdateProfil";

const Profil = () => {
  const uid = useContext(UidContext);
  return (
    <div className="container p-20">
      <div className="py-10">
        {uid ? <UpdateProfil /> : "null" }
      </div>
    </div>
  );
};

export default Profil;
