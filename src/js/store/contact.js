export const contactStore = {
  listaContactos: [
    {
      full_name: "Viviana",
      email: "contacto.anaro@gmail.com",
      agenda_slug: "contactos de trabajo",
      address: "ismael valdes vergara 640, stgo",
      phone: "932915440",
    },
  ],
};

export function contactActions(getStore, getActions, setStore) {
  return {
    funcionCarga: async () => {
      let store = getStore();
      let actions = getActions();
      let { respuestaJson, response } = await actions.useFetch(
        "/agendas/{slug}/contacts",
        null
      );
      setStore({ ...store, listaContactos: respuestaJson });
    },

    addContact: async (obj) => {
      try {
        let store = getStore();
        let actions = getActions();
        let { respuestaJson, response } = await actions.useFetch("/agendas/{slug}/contacts", obj, "POST");
        if (response.ok) {
          actions.funcionCarga();
          return { respuestaJson, response };
        }
        return null;
      } catch (error) {
        console.error("Error al agregar el contacto:", error);
        return null;
      }
    },

    updateContactList: async () => {
      try {
        let store = getStore();
        let actions = getActions();
        let { respuestaJson, response } = await actions.useFetch("/agendas/{slug}/contacts", null);
        if (response.ok) {
          setStore({ ...store, listaContactos: respuestaJson });
          return { respuestaJson, response };
        }
        return null;
      } catch (error) {
        console.error("Error al actualizar la lista de contactos:", error);
        return null;
      }
    },

    deleteContact: (id) => {
      let actions = getActions();
      actions.deleteFetch(id);
    },

    editContact: (indice, nombre, email, telefono, direccion) => {
      let store = getStore();
      let arrTemp = store.listaContactos.slice();

      arrTemp[indice]["full_name"] = nombre;
      arrTemp[indice]["email"] = email;
      arrTemp[indice]["phone"] = telefono;
      arrTemp[indice]["address"] = direccion;

      setStore({ ...store, listaContactos: arrTemp });
    },

    getFetch: async (endpoint) => {
      let url = "https://playground.4geeks.com/todo/users" + endpoint;
      let response = await fetch(url);

      let respuestaJson = await response.json();
      return { respuestaJson, response };
    },

    putFetch: async (endpoint, body) => {
      let actions = getActions();
      let url = "https://playground.4geeks.com/todo/users" + endpoint;
      let response = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: body ? JSON.stringify(body) : null,
      });

      if (response.ok) {
        let respuestaJson = await response.json();
        actions.funcionCarga();
        return { respuestaJson, response };
      }

      return null;
    },

    deleteFetch: async (endpoint) => {
      let actions = getActions();
      let url = "https://playground.4geeks.com/todo/users/" + endpoint;
      let response = await fetch(url, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        let respuestaJson = await response.json();
        actions.funcionCarga();
        return { respuestaJson, response };
      }

      return null;
    },

    peticionEjemplo: async () => {
      let suma = 4;

      let respuesta = await fetch("https://playground.4geeks.com/todo/users");

      if (respuesta.ok) {
        let respuestaJSON = await respuesta.json(); 
      }
     
    },
    fetchPost: async () => {

      let respuesta = await fetch(
        "https://playground.4geeks.com/todo/users",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            full_name: "Viviana",
            email: "contacto.anaro@gmail.com",
            agenda_slug: "contactos de trabajo",
            address: "ismael valdes vergara 640, stgo",
            phone: "932915440",
          }),
        }
      );


      let respuestaJSON = await respuesta.json();
    },
  };
}
