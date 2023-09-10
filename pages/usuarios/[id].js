import React, { useEffect, useState } from "react";
import MainLayout from '../../components/layouts/MainLayout';
import { useRouter } from 'next/router';

const EditarUsuarioPage = () => {
        // ----Constantes y variables de estado-----------
        const [access_token, setAccess] = useState('');
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
    }, [access_token, router]);

    return (
        <MainLayout>
            <div>
                <h1>Hola soy Editar usuario</h1>
                
            </div>
        </MainLayout>
    )
};

export default EditarUsuarioPage;