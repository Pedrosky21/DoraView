import Navbar from "../components/Navbar";
import Botones from "./components/botones";

export default async function Admin() {
  return (
    <>
      <div>
        <Navbar></Navbar>
        <div className="text-black p-10">
          <h2 className="text-4xl text-fern-green font-caprasimo">Hola!</h2>
          <h3 className="text-xl text-black">Qué vas a hacer hoy?</h3>
          <Botones></Botones>
        </div>
      </div>
    </>
  );
}
