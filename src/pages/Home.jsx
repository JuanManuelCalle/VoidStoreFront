import { useContext } from "react";
import {Navbar, Product } from "../components";
import Main from "../components/Main/main";
import Footer from "../components/footer/Footer";
import { UserContext } from "../context/UserContext";

function Home() {
  const {user} = useContext(UserContext)
  console.log(user);
  return (
    <>
      <Navbar />
      <Main />
      <Product />
      <Footer />
    </>
  )
}

export default Home