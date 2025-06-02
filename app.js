
const form = document.getElementById('pagoForm');
const entrada = document.getElementById('entradaPagos');
const pagosList = document.getElementById('pagosList');
const totalEl = document.getElementById('total');
const pendientesEl = document.getElementById('pendientes');
const realizadosEl = document.getElementById('realizados');

let pagos = [];

form.addEventListener('submit', e => {
  e.preventDefault();
  const texto = entrada.value.trim();
  const bloques = texto.split(/-{5,}|\n{2,}/);
  bloques.forEach(bloque => {
    const montoMatch = bloque.match(/\$\s?([\d.,]+)/);
    const monto = montoMatch ? parseFloat(montoMatch[1].replaceAll('.', '').replace(',', '.')) : 0;
    pagos.push({ texto: bloque.trim(), monto, realizado: false });
  });
  entrada.value = '';
  render();
});

function render() {
  pagosList.innerHTML = '';
  let total = 0;
  let pagados = 0;
  pagos.forEach((pago, index) => {
    total += pago.monto;
    if (pago.realizado) pagados += pago.monto;

    const li = document.createElement('li');
    li.className = 'pago' + (pago.realizado ? ' realizado' : '');
    li.innerHTML = \`
      <pre>\${pago.texto}</pre>
      <strong>\$ \${pago.monto.toLocaleString()}</strong><br/>
      <button onclick="marcarRealizado(\${index})">Marcar como \${pago.realizado ? 'pendiente' : 'realizado'}</button>
    \`;
    pagosList.appendChild(li);
  });

  totalEl.textContent = "$ " + total.toLocaleString();
  pendientesEl.textContent = "$ " + (total - pagados).toLocaleString();
  realizadosEl.textContent = "$ " + pagados.toLocaleString();
}

function marcarRealizado(i) {
  pagos[i].realizado = !pagos[i].realizado;
  render();
}
