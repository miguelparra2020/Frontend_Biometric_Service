// ----Importaciones y librerías---------
import React,{useState, useEffect} from "react";
import MainLayout from '../../../components/layouts/MainLayout';
import {CreateSalida, getUsuarios} from '../../../db/db';
import { useRouter } from 'next/router';
import '../../../styles/pages/ingresos.css'
// ----Importaciones y librerías---------


const SalidasPage = () => {
    // --------Constantes y variables de estado--------------------
    const [access_token, setAccess] = useState('');
    const [username, setUsername ] = useState([]);
    const [fecha_salida, setFechaSalida] = useState([]);
    const [hora_salida, setHoraSalida ] = useState([]);
    const [zona, setZona ] = useState([]);
    const [existeUsuario, setExisteUsuario] = useState(''); 
    const router = useRouter();
    // --------Constantes y variables de estado--------------------

    //----Función useEffect -----------
    useEffect(() => {
        //----Función para detectar al usuario si puede acceder---------
      if (typeof window !== 'undefined') {
        const storedUsuario = localStorage.getItem('access_token');
        setAccess(storedUsuario);
        }
      if (access_token == 'sin-acceso'){
          router.push('/');
      }
    //----Función para detectar al usuario si puede acceder---------
        // --- función asincrona para la obtención de usuarios---------
        async function fetchUsuarios() {
            const Usuarios = await getUsuarios();
            setExisteUsuario(Usuarios);
        }
        // --- función asincrona para la obtención de usuarios---------

        // ---activación de funciones----------
        fetchUsuarios();
        // ---activación de funciones----------
    }, [access_token, router]);
    //----Función useEffect -----------

    // --función envío de formulario-----
    const handleSubmit = async (e) => {
        e.preventDefault();

        // ----creación de objeto para el envío de datos----
        const salidaData = {
            username,
            fecha_salida,
            hora_salida,
            zona
        }
        // ----creación de objeto para el envío de datos----

        // ---Validación que el usuario exista----------
        const usuarioExiste = existeUsuario.some((usuario) => usuario.username === username);
        if (!usuarioExiste) {
            alert('El usuario ingresado no existe, por favor ingrese un valor diferente.');
            return;
        }
        // ---Validación que el usuario exista----------

        // -----envío de la data por post------
        const enviarData =  CreateSalida(salidaData);
        alert('Registro de salida exitoso');
        router.push(`/home`);
        // -----envío de la data por post------

    };
    // --función envío de formulario-----

    
    
    

    return (
        <MainLayout>
            {/* titulo del área */}
            <div className="titulo-ingresos">
                <h1>Bienvenid@ al área de salidas</h1>  
                <h3>Crea una salida de manera manual</h3>
            </div>      
            {/* titulo del área */}

            {/* formulario de creación de ingreso */}
            <div>
                <form onSubmit={handleSubmit} className="container">
                    <div>
                    Número de documento identidad = usuario: &nbsp;
                    <input type="number" value={username} onChange={(e) => setUsername(e.target.value)} className="inputs-ingresos" required/>
                    </div>
                    <div>
                    Fecha de salida: &nbsp;
                    <input type="date" value={fecha_salida} onChange={(e) => setFechaSalida(e.target.value)} className="inputs-ingresos" required/>
                    </div>
                    <div>
                    Hora de salida :&nbsp;
                    <input type="time" value={hora_salida} onChange={(e) => setHoraSalida(e.target.value)} className="inputs-ingresos" required/>
                    </div>
                    <div>
                    Zona de la que sale el usuario: &nbsp;
                    <input type="text" value={zona} onChange={(e) => setZona(e.target.value)} className="inputs-ingresos" required/>
                    </div>
                    <button type="submit">Crear salida</button> 
                </form>
            </div>
            {/* formulario de creación de ingreso */}
        </MainLayout>
    )
};

export default SalidasPage;