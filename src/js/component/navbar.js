import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-black text-left">
      <div className="container navbar-container"> {/* Clase de CSS adicional */}
        <Link to="/">
          <span className="navbar-brand mb-0 h1">
            Lista de Contactos Usando React & Context
          </span>
        </Link>
      </div>
    </nav>
  );
};