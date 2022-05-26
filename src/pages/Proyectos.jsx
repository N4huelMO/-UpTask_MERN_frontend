import PreviewProyecto from "../components/PreviewProyecto";
import useProyectos from "../hooks/useProyectos";
import { useEffect } from "react";
import Alerta from "../components/Alerta";

const Proyectos = () => {
  const { proyectos, alerta } = useProyectos();

  const { msg } = alerta;

  return (
    <>
      <h1 className="text-4xl font-bold">Proyectos</h1>

      {msg && <Alerta alerta={alerta} />}

      <div className="bg-white shadow mt-10 rounded-lg">
        {proyectos.length ? (
          proyectos.map((proyecto) => (
            <PreviewProyecto key={proyecto._id} proyecto={proyecto} />
          ))
        ) : (
          <p className="text-center text-gray-600 uppercase p-3">
            Aún no existen proyectos
          </p>
        )}
      </div>
    </>
  );
};

export default Proyectos;
