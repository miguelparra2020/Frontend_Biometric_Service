import React, {useState, useEffect} from "react";
import MainLayout from '../../../components/layouts/MainLayout';
import { useRouter } from 'next/router';

const SalidasIdPage = () => {
    //----------------Variables---------------------------------
    const [access_token, setAccess] = useState('');
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
    }, [access_token, router]);
    //----Función useEffect asyncrona para obtener la data de fichas-------
    return (
        <MainLayout>
            <div>
                <h1>Hola soy SalidasId Page</h1>
                
            </div>
        </MainLayout>
    )
};

export default SalidasIdPage;