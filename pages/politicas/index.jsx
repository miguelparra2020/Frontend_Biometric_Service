
import  LoginLayout from '../../components/layouts/LoginLayout';

import styles from '@/styles/pages/politicas.module.css';

const Politicas = () => {
    return (
      <LoginLayout>
      <div>
        {/* className={styles.} */}
        <main className={styles.main}>
          <h1>Politicas y privacidad</h1>
          <p >
          Apreciado usuario, el sitio web institucional de la Agencia Pública de Empleo SENA - tiene como función principal dar a conocer y divulgar la información sobre convocatorias, eventos de empleo, casos exitosos, gestión nacional y territorial y servir de enlace para el acceso de los usuarios buscadores de empleo al sistema de intermediación laboral donde pueden registrar su hoja de vida, iniciar sesión, restablecer contraseña o postulase a vacantes, mientras que las empresas, pueden registrarse y publicar las vacantes de empleo a ofertar a través de la plataforma web de la Agencia Pública de Empleo

          Por medio de su sitio ape.sena.edu.co o agenciapublicadeempleo.sena.edu.co  La Agencia Pública de Empleo SENA publica los temas y actividades que tienen que ver con su misión, su visión, objetivos y las funciones que corresponden a su objeto social, al igual que los productos, servicios, programas y en general, información relacionada con la gestión que adelanta.  
          </p>
        </main>
      </div>
      </LoginLayout>
    );
  };
  
  export default Politicas;