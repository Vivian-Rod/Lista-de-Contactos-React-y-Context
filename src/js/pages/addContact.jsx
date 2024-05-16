// En tu componente AddContact.js
import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

const AddContact = () => {
    const { actions } = useContext(Context);
    const [data, setData] = useState({
        full_name: "Viviana",
      email: "contacto.anaro@gmail.com",
      agenda_slug: "contactos de trabajo",
      address: "ismael valdes vergara 640, stgo",
      phone: "932915440",
    });

    const handleSaveContact = async () => {
        try {
            const { respuestaJson, response } = await actions.useFetch("/agendas/{slug}/contacts", data, "POST");
            if (!response.ok) {
                alert("Oops! Contact Not Saved");
                return;
            }
            alert("Contact saved \n");

            actions.updateContactList();
        } catch (error) {
            console.error("Error al guardar el contacto:", error);
            alert("Oops! Something went wrong.");
        }
    };

    return (
        <div className="container-fluid d-flex flex-column align-items-center p-5 mb-4 w-100 bg-custom">
            <div className="row pb-3 text-center">
                <h1>Agregar nuevo contacto</h1>
            </div>
            <div className="row pb-3 w-100">Nombre Completo
                <input
                    className="border mt-2 border-none"
                    placeholder="Enter Full Name"
                    name="full_name"
                    required
                    value={data.full_name}
                    onChange={(e) => setData({ ...data, full_name: e.target.value })}
                />
            </div>
            <div className="row pb-3 w-100">Dirección
                <input
                    className="border mt-2 border-none"
                    placeholder="Enter Address"
                    name="address"
                    required
                    value={data.address}
                    onChange={(e) => setData({ ...data, address: e.target.value })}
                />
            </div>
            <div className="row pb-3 w-100">Número de Teléfono
                <input
                    className="border mt-2 border-none"
                    placeholder="Enter Phone Number"
                    name="phone"
                    type="tel"
                    required
                    value={data.phone}
                    onChange={(e) => setData({ ...data, phone: e.target.value })}
                />
            </div>
            <div className="row pb-3 w-100">Email
                <input
                    className="border mt-2 border-none"
                    placeholder="Enter Email"
                    name="email"
                    type="email"
                    required
                    value={data.email}
                    onChange={(e) => setData({ ...data, email: e.target.value })}
                />
            </div>
            <div className="row w-100 pb-3">
                <button
                    className="btn btn-sm mt-3 pb-2 btn-primary"
                    type="button"
                    onClick={handleSaveContact}
                >
                    Save
                </button>
            </div>
            <div className="row w-100 text-center">
                <br />
                <Link to="/"><b>Volver a Lista de Contactos</b></Link>
                <br />
            </div>
        </div>
    );
};

export default AddContact;
