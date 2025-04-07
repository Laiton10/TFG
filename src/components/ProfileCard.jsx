import "../styles/components/Profile-Card.css";

export const ProfileCard = ({user}) => {

    const userInfo = [
        { label: 'Nickname', id: 'nombreUsuario', value: user}, //pongo el prop user como value
        { label: 'Email', id: 'email', value: 'email'},
        { label: 'Fecha de registro en la aplicación', id: 'fecha_registro', value: 'fecha'},
        { label: 'Prueba', id: 'prueba', value: 'prueba'},
    ]

    return (
    <div className="profile-card">
        <div className='perfil'>
            <div className='circulo'>
                <p>{user.charAt(0)}</p>
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