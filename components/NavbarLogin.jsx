// components/NavbarLogin.js
import React from 'react';
import Link from 'next/link';
// Nota: Siempre importar etiquetas raras
import Image from 'next/image';
import styles from '@/styles/components/Navbarlogin.module.css';

const NavbarLogin = () => {
  return (
    <div>
      {/* className={styles.} */}
      <header className={styles.header}>
        <Link href="/" className={styles.link__header}>
          <div className={styles.logo}>
            <Image className={styles.img} src="/img/logo_blanco.png" alt="Logo Símbolo SENA y Biometric Service Blanco" width={469} height={209}/>
          </div>
        </Link>
      </header>
    </div>
  );
};

export default NavbarLogin;