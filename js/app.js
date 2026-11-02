let ejercicio;
const elecciones = {};

async function iniciar() {
  const respuesta = await fetch('data/textos.json');
  const datos = await respuesta.json();
  ejercicio = datos.textos[0];
  document.getElementById('titulo').textContent = ejercicio.titulo;
  pintarTexto();
  document.getElementById('btn-resultado').addEventListener('click', mostrarResultado);
}

function pintarTexto() {
  const contenedor = document.getElementById('texto');
  const partes = ejercicio.texto.split(/\{(\d+)\}/);
  // partes alterna: texto, id, texto, id...
  partes.forEach((parte, i) => {
    if (i % 2 === 0) {
      contenedor.append(parte);
    } else {
      const casilla = ejercicio.casillas.find(c => c.id === Number(parte));
      contenedor.append(crearCasilla(casilla));
    }
  });
}

function crearCasilla(casilla) {
  const envoltorio = document.createElement('span');
  envoltorio.className = 'casilla';

  const boton = document.createElement('button');
  boton.textContent = casilla.original;

  const lista = document.createElement('select');
  lista.hidden = true;
  const vacia = new Option('Elige una opción', '');
  lista.add(vacia);
  casilla.opciones.forEach(o => lista.add(new Option(o.texto, o.texto)));

  boton.addEventListener('click', () => {
    boton.hidden = true;
    lista.hidden = false;
    lista.focus();
  });

  lista.addEventListener('change', () => {
    if (lista.value) {
      elecciones[casilla.id] = lista.value;
      boton.textContent = lista.value;
      boton.classList.add('resuelta');
    }
    lista.hidden = true;
    boton.hidden = false;
  });

  envoltorio.append(boton, lista);
  return envoltorio;
}

function mostrarResultado() {
  const faltan = ejercicio.casillas.length - Object.keys(elecciones).length;
  const salida = document.getElementById('resultado');
  if (faltan > 0) {
    salida.textContent = `Te faltan ${faltan} palabra(s) por revisar.`;
    return;
  }
  salida.textContent = `Tu texto mejoró un ${calcularMejora(ejercicio, elecciones)}%.`;
}

iniciar();