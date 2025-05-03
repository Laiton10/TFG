import "../styles/components/Profile-Card.css";

export const ProfileCard = ({user}) => {

    const userInfo = [
        { label: 'Nickname', id: 'nombreUsuario', value: user.nickname}, //pongo el prop user como value
        { label: 'Email', id: 'email', value: user.email},
        { label: 'Fecha de registro en la aplicación', id: 'fecha_registro', value: user.fechaRegistro},
        { label: 'Prueba', id: 'prueba', value: 'prueba'},
    ]

    return (
    <div className="profile-card">
        <div className='perfil'>
            <div className='circulo'>
                <p>{user.nickname.charAt(0).toUpperCase()}</p>
            </div>
            <div className='title'>
                <p>Información Personal</p>
            </div>
        </div>
        <hr/>
        {userInfo.map((info) =>(
            <div className='info' key={info.id}>
            <label htmlFor={info.id}>{info.label}</label>
            <input
                type='text'
                id={info.id}
                value={info.value}
                readOnly
            />
            </div>
        ))}
        
    </div>
    );
}