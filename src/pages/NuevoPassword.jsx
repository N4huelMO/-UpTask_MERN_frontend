import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/clienteAxios";

const NuevoPassword = () => {
  const [alerta, setAlerta] = useState({});
  const [tokenValido, setTokenValido] = useState(false);
  const [password, setPassword] = useState("");

  const params = useParams();
  const { token } = params;

  const navigate = useNavigate();

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await clienteAxios(`/usuarios/olvide-password/${token}`);
        setTokenValido(true);
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true,
        });
      }
    };

    comprobarToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setAlerta({
        msg: "El password debe tener mínimo 6 caracteres",
        error: true,
      });

      return;
    }

    try {
      const { data } = await clienteAxios.post(
        `/usuarios/olvide-password/${token}`,
        { password }
      );

      setAlerta({
        msg: data.msg,
        error: false,
      });

      setTimeout(() => {
        navigate("/");
      }, 5000);
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const { msg } = alerta;

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl">
        Reestablece tu password y No pierdas acceso a tus{" "}
        <span className="text-slate-700">Proyectos</span>
      </h1>

      {msg && <Alerta alerta={alerta} />}

      {tokenValido && (
        <form
          className="my-10 bg-white shadow rounded-lg p-10"
          onSubmit={handleSubmit}
        >
          <div className="mb-5">
            <label
              className="uppercase text-gray-600 block text-xl font-bold"
              htmlFor="password"
            >
              Nuevo password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Ingrese su nuevo password"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-100"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="Guardar nuevo password"
            className="bg-sky-700 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
          />
        </form>
      )}
    </>
  );
};

export default NuevoPassword;
