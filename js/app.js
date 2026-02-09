// USUARIO SIMULADO
let usuario = {
  creditos: 300,
  saldo: 0
};

// DATOS
let productos = [];
let comisionLOCAL = 0;

// NAVEGACIÓN
function mostrar(seccion) {
  document.querySelectorAll("section").forEach(s => s.classList.add("oculto"));
  document.getElementById(seccion).classList.remove("oculto");
  actualizarDatos();
}

// PUBLICAR
function publicarProducto() {
  if (usuario.creditos < 100) {
    alert("No tenés créditos suficientes");
    return;
  }

  const nombre = document.getElementById("nombre").value;
  const precio = parseInt(document.getElementById("precio").value);

  if (!nombre || !precio) {
    alert("Completá todos los datos");
    return;
  }

  usuario.creditos -= 100;

  productos.push({
    nombre,
    precio
  });

  document.getElementById("nombre").value = "";
  document.getElementById("precio").value = "";

  mostrarProductos();
}

// MOSTRAR PRODUCTOS
function mostrarProductos() {
  const cont = document.getElementById("listaProductos");
  cont.innerHTML = "";

  productos.forEach((p, i) => {
    cont.innerHTML += `
      <div>
        <b>${p.nombre}</b><br>
        💲${p.precio}<br>
        <button onclick="comprar(${i})">Comprar</button>
      </div>
    `;
  });
}

// COMPRAR
function comprar(i) {
  const precio = productos[i].precio;
  const comision = precio * 0.05;

  comisionLOCAL += comision;
  usuario.saldo += precio - comision;

  alert("Venta realizada");

  actualizarDatos();
}

// ADMIN
function actualizarDatos() {
  document.getElementById("creditos").innerText =
    "Créditos disponibles: " + usuario.creditos;

  document.getElementById("panelAdmin").innerHTML = `
    💰 Comisión LOCAL: $${comisionLOCAL}<br>
    👤 Saldo vendedor: $${usuario.saldo}
  `;
}

// INICIO
mostrarProductos();
actualizarDatos();
