let pagos = [
  { nombre: "Alexis Facundo", monto: 123536.78, alias: "Alexis.facundola.mp", cbu: "0000003658091423016141", estado: "pendiente" },
  { nombre: "Gaston Arauco", monto: 140714.46, alias: "GASTIPEÑA", cbu: "0000010100033963787923", estado: "realizado", comprobante: "comprobante1.jpg" }
];

function mostrar(tipo) {
  const contenedor = document.getElementById("pagos");
  contenedor.innerHTML = "";
  let totalPagado = 0, totalPendiente = 0;
  pagos.filter(p => p.estado === tipo).forEach(p => {
    if (p.estado === "realizado") totalPagado += p.monto;
    if (p.estado === "pendiente") totalPendiente += p.monto;
    contenedor.innerHTML += `
      <div class="pago">
        <strong>${p.nombre}</strong><br/>
        Monto: $${p.monto.toLocaleString()}<br/>
        Alias: <span class="alias-cbu" onclick="copiar('${p.alias}')">${p.alias}</span><br/>
        CBU: <span class="alias-cbu" onclick="copiar('${p.cbu}')">${p.cbu}</span><br/>
        ${p.estado === 'realizado' ? `Comprobante: <a href='${p.comprobante}' target='_blank'>Ver</a>` : `<input type='file'/> <button>Subir comprobante</button>`}
      </div>
    `;
  });

  document.getElementById("totalPagado").textContent = totalPagado.toLocaleString();
  document.getElementById("totalPendiente").textContent = totalPendiente.toLocaleString();
}

function copiar(texto) {
  navigator.clipboard.writeText(texto).then(() => alert("Copiado: " + texto));
}

function filtrarPagos() {
  alert("Esta función está en desarrollo. Se aplicarán filtros por fecha.");
}