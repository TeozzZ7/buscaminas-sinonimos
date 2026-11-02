function calcularMejora(ejercicio, elecciones) {
  let obtenido = 0;
  let maximo = 0;
  for (const casilla of ejercicio.casillas) {
    maximo += Math.max(...casilla.opciones.map(o => o.valor));
    const elegida = elecciones[casilla.id];
    if (elegida) {
      obtenido += casilla.opciones.find(o => o.texto === elegida).valor;
    }
  }
  return Math.round((obtenido / maximo) * 100);
}