import { useState } from "react";
import { updateNickname } from "../services/usuario.service";
import "../styles/components/Profile-Card.css";

export const ProfileCard = ({user}) => {

    const [nickname, setNickname] = useState(user.nickname);
    const [mensaje, setMensaje] = useState(null);

    const handleUpdate = async () => {
        setMensaje(null);
        const respuesta = await updateNickname({ id: user.id, nickname });

        if (respuesta) {
            setMensaje("Nickname actualizado con éxito.");
            setTimeout(() => setMensaje(null), 3000);
          } else {
            setMensaje("Error al actualizar el nickname.");
            setTimeout(() => setMensaje(null), 3000);
          }
    };

    const reset = () => {
        setNickname(user.nickname);
        setMensaje(null);
    };

    return (
        <>
        <div className="profile-card">
            <div className='perfil'>
                <div className='circulo'>
                    <img
                        src={
                            user.imagenPerfil
                                ? `http://localhost:8080/${user.imagenPerfil}`
                                : Image
                            }
                            className="imagen-perfil"
                    />
                   
                </div>
                <div className='title'>
                    <p>Información Personal</p>
                </div>
            </div>
            <hr />

            <div className='info'>
                <label htmlFor="nombreUsuario">Nickname</label>
                <input
                    type='text'
                    id="nombreUsuario"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                />
            </div>

            <div className='info'>
                <label htmlFor="email">Email</label>
                <input
                    type='text'
                    id="email"
                    value={user.email}
                    readOnly
                />
            </div>

            <div className='info'>
                <label htmlFor="fecha_registro">Fecha de registro</label>
                <input
                    type='text'
                    id="fecha_registro"
                    value={user.fechaRegistro}
                    readOnly
                />
            </div>

            <div className="acciones">
                <button className="guardar" onClick={handleUpdate}>Guardar</button>
                <button className="reset" onClick={reset}>Cancelar cambios</button>
            </div>
        </div>
         {mensaje && (
            <div className="mensaje-flotante">{mensaje}</div>
          )}
          </>
    );
};