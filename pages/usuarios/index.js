import React, { useEffect, useState } from "react";
import MainLayout from '../../components/layouts/MainLayout';
import { getUsuarios } from '../../db/db';
import Link from "next/link";
import '../../styles/pages/usuarios.css';
import { useRouter } from 'next/router';

const UsuariosPage = () => {
    // ----Constantes y variables de estado-----------
    const [access_token, setAccess] = useState('');
    const [usuarios, setUsuarios] = useState([]);
    const router = useRouter();
    // ----Constantes y variables de estado-----------

     // ----Función useEffects --------------------
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedUsuario = localStorage.getItem('access_token');
            setAccess(storedUsuario);
        }
        if (access_token == 'sin-acceso'){
            router.push('/');
        }

        async function fetchUsuarios() {
            try {
                const data = await getUsuarios();
                setUsuarios(data);
                console.log(data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchUsuarios();
    }, [access_token, router]);

    return (
        <MainLayout>
            <div className="contenedor_titulo_fichas">
                <h1>Bienvenid@ al área de usuarios</h1>
            </div>
            <div className="div-links">
                <Link href="/usuarios/nuevo" className="links">
                <button className="edit_link_ficha">Crear nuevo usuario</button>
                </Link> 
            </div>
            <div className="contenedor_fichas">
                {usuarios.map((item) => (
                    <div key={item.id} className="div_card_fichas">
                        {item.id} &nbsp;
                        {item.username} &nbsp;
                        {item.first_name} &nbsp;
                        {item.last_name} &nbsp;
                        {item.email} &nbsp;
                        {item.ficha} &nbsp;
                        {item.tipo_usuario} &nbsp;

                    </div>
                ))}
            </div>
        </MainLayout>
    )
};

export default UsuariosPage;
