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
        <nav className={styles.nav}>
        <Link href="/" className={styles.link__header}>
          <div className={styles.logo}>
          <Image  src="/img/logoblanco.png" alt="Logo Símbolo SENA Biometric Service Negro" width={468} height={209} className={styles.logo} />
          </div>
        </Link>
        </nav>
      </header>
    </div>
  );
};

export default NavbarLogin;