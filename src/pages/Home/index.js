import React from "react";
import Navbar from "../../components/Layout/Navbar";
import Canvas from "../../components/Canvas";
import Pallet from "../../components/Pallet";

import { MainContentContainer } from "./styles";

function Home() {
  return (
    <>
      <Navbar />
      <MainContentContainer>
        <Canvas />
        <Pallet />
      </MainContentContainer>
    </>
  );
}

export default Home;
