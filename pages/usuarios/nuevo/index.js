import React, { useEffect, useState } from "react";
import MainLayout from '../../../components/layouts/MainLayout';
import { getUsuarios, getFichas, CreateUsuario } from '../../../db/db';
import { useRouter } from 'next/router';
import '../../../styles/pages/ingresos.css';
import { Toaster, toast } from 'sonner';

const CrearUsuarioPage = () => {
    // ----Constantes y variables de estado-----------
    const [access_token, setAccess] = useState('');
    const [existeUsuario, setExisteUsuario] = useState(''); 
    const [username, setUsername] = useState(''); 
    const [first_name, setFirstName] = useState(''); 
    const [last_name, setLastName] = useState(''); 
    const [email, setEmail] = useState('');
    const [ficha, setFicha] = useState([]);  
    const [fichas, setFichas] = useState([]); 
    const [fichaSeleccionada, setFichaSeleccionada] = useState(""); 
    const [tipo_usuario, setTipoUsuario] = useState(""); 
    const [password, setPassword] = useState(''); 
    const [confirmPassword, setConfirmPassword] = useState(''); 
    const router = useRouter();
    // ----Constantes y variables de estado-----------

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedUsuario = localStorage.getItem('access_token');
            setAccess(storedUsuario);
        }
        if (access_token == 'sin-acceso'){
            router.push('/');
        }
        async function fetchUsuarios() {
            const Usuarios = await getUsuarios();
            setExisteUsuario(Usuarios);
        }
        async function fetchFichas() {
            const data = await getFichas();
            setFichas(data);
            console.log(data);
        }
        fetchFichas();
        fetchUsuarios();
    }, [access_token, router]);

    //---Función para el cambio de selección de ficha----
    const handleFichaChange = (e) => {
        setFichaSeleccionada(e.target.value);
        setFicha(e.target.value);
    };
    //---Función para el cambio de selección de ficha----

    const handleTipoUsuarioChange = (e) => {
        setTipoUsuario(e.target.value);
    };

    //Validación de formulario 
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Validar si el usuario ya existe
        const usuarioExiste = existeUsuario.some((usuario) => usuario.username === username);
        if (usuarioExiste) {
            toast.error('Error en el usuario', {
                description: 'El usuario ingresado ya existe, por favor ingrese un valor diferente.'
              });
            return;
        }
        if (password != confirmPassword) {
            toast.error('Error en la contraseña', {
                description: 'Al confirmar es diferente, por favor validar!'
              });
            return;
        }
    
        const usuarioData = {
            username,
            email,
            first_name,
            last_name,
            ficha,
            tipo_usuario,
            password
            
        };
        console.log(usuarioData);



        const createUsuario = await CreateUsuario(usuarioData);
        console.log(createUsuario);
        toast.success('Registro de usuario', {
            description: 'Exitoso!'
          });
          setTimeout(() => {
            router.push('/usuarios');
        }, 2000);
    };

    
    return(
        <MainLayout>
        <div>
            {/* <h3><Link href="/fichas">Volver</Link></h3> */}
        </div>
        <div className="titulo-ingresos">
                <h1>Bienvenid@ al área de crear usuarios</h1>  
            </div> 
        <div>
            <form onSubmit={handleSubmit} className="container">
            <div>
            Número de documento identidad = usuario:&nbsp;
            <input type="number" value={username} onChange={(e) => setUsername(e.target.value)} className="inputs-ingresos" required/>
            </div>
            <div>
            Nombres:&nbsp;
            <input type="text" value={first_name} onChange={(e) => setFirstName(e.target.value)} className="inputs-ingresos" required/>
            </div>
            <div>
            Apellidos:&nbsp;
            <input type="text" value={last_name} onChange={(e) => setLastName(e.target.value)} className="inputs-ingresos" required/>
            </div>
            <div>
            Email:&nbsp;
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="inputs-ingresos" required/>
            </div>
            <div>
            Asignar ficha:&nbsp;
            <select value={fichaSeleccionada} className="inputs-ingresos" required onChange={handleFichaChange}>
                <option value="">Selecciona una ficha</option>
                {fichas.map((ficha) => (
                    <option key={ficha.url} value={ficha.numero_ficha}>
                        {ficha.numero_ficha}
                    </option>
                ))}
            </select>
            </div>
            <div>
            Tipo de usuario:&nbsp;
            <select value={tipo_usuario} className="inputs-ingresos" required onChange={handleTipoUsuarioChange}>
                <option value="">Seleccionar Tipo de Usuario</option>
                <option value="aprendiz">Aprendiz</option>
                <option value="instructor">Instructor</option>
                <option value="administrador">Administrador</option>
                <option value="instructoradministrador">Instructor Administrador</option>
            </select>
            </div>
            <div>
            Contraseña:&nbsp;
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="inputs-ingresos" required/>
            </div>
            <div>
            Confirmar contraseña:&nbsp;
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="inputs-ingresos" required/>
            </div>
            <button type="submit">Crear usuario</button> 
        </form>
        </div>
        <Toaster/>
        </MainLayout>
    )
};


export default CrearUsuarioPage;
