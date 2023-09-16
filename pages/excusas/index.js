import React from "react";
import MainLayout from '../../components/layouts/MainLayout';
import { getExcusas } from '../../db/db';
import { useState, useEffect } from "react";
import Link from "next/link";
import '../../styles/pages/fichas.css';
import '../../styles/pages/excusas.css';
import Image from 'next/image';
import { useRouter } from 'next/router';

function ExcusasPage(){
//----------------Variables---------------------------------
    const [access_token, setAccess] = useState('');
    const [tipo_usuario, setTipoUsuario] = useState('');
    const [excusas, setExcusas] = useState([]);
    const router = useRouter();
//----------------Variables---------------------------------

//----Función useEffect asyncrona para obtener la data de fichas-------
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

//-----Función asincrona para obtener las excusas----------------
        async function fecthExcusas () {
            try {
                const data = await getExcusas();
                console.log(data);     
                setExcusas(data);  
                setTipoUsuario(localStorage.getItem('tipo_usuario')) ;         
            } catch (error) {
                console.log(error);                
            }
        }
       
//-----Función asincrona para obtener las excusas----------------

//-----Inicializar funciones-------------------------
    fecthExcusas();
//-----Inicializar funciones-------------------------
    }, [access_token,router]);
//----Función useEffect asyncrona para obtener la data de fichas-------


//---área visual de la página---------
    return (
        <MainLayout>
            {/* titulo */}
            <div className="contenedor_titulo_fichas">
                <h1>Bienvenid@ al área de excusas</h1>   
            </div>
            {/* titulo */}
            { 
                tipo_usuario == 'aprendiz' ? (<div>Soy aprendiz</div>) : (<></>)
            }
            <div className="contenedor_excusas">
            { 
                tipo_usuario !== 'aprendiz' ? (<div>
                    {excusas.map((item) => (
                            <div key={item.id} className="card_excusa">
                                <div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </div>
                                Id excusa: {item.id}

                                {item.username}                                
                            </div>
                        ))}
                </div>) : (<></>)
            }
            </div>

        </MainLayout>
    )
};
//---área visual de la página---------
export default ExcusasPage;
