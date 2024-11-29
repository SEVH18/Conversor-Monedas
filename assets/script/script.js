const inputPesosChilenos = document.getElementById("inputPesosChilenos");
const resultadoConversionMonedas = document.getElementById(
  "resultadoConversionMonedas"
);
const btonConvertirMonedas = document.getElementById("botonConvertirMonedas");
const optionMonedaUsd = document.getElementById("valueUsd");
const optionMonedaEur = document.getElementById("valueEur");
const selectorMonedas = document.getElementById("selectorMonedas");
const etiquetaGraficoEuros = document.getElementById("graficoEuro")
const etiquetaGraficoDolar = document.getElementById("graficoDolar")
/////////////////////////////////////////////////////////////////////////////////////
btonConvertirMonedas.addEventListener("click", async function getInfoMonedas() {
  try {
    const data = await fetch("https://mindicador.cl/api/");
    const monedas = await data.json();
    const valorMonedaUsd = monedas.dolar.valor;
    const valorMonedaEur = monedas.euro.valor;
    optionMonedaUsd.value = valorMonedaUsd;
    optionMonedaEur.value = valorMonedaEur;
    const valorPesosChilenosUsuario = inputPesosChilenos.value;
    const resultadoConversion =
      valorPesosChilenosUsuario / selectorMonedas.value;
    resultadoConversionMonedas.innerHTML = `Resultado es: $${resultadoConversion.toFixed(
      2
    )} en tu moneda seleccionada`;
   
      if (selectorMonedas.value == valorMonedaUsd) {
        etiquetaGraficoDolar.innerHTML += `<canvas>${renderGraficaDolar()}</canvas>`;
        
      } else if (selectorMonedas.value == valorMonedaEur) {
        
        etiquetaGraficoEuros.innerHTML += `${renderGraficaEuros()}`
      }
  } catch {
    resultadoConversionMonedas.innerHTML =
      "Lo sentimos, la conexión falló, intenta más tarde";
  }
    
});
//////////////////////////////////////////////Graficos///////////////////////////////////
async function FechasValoresDolar() {
  const get = await fetch("https://mindicador.cl/api/dolar");
  const dolares = await get.json();
  return dolares;
}

function configuracionGraficaDolares(dolares) {
  const tipoDeGrafica = "line";
  const fechas = dolares.serie.map((fecha) => {
    return fecha.fecha;
  });
  const titulo = "Historico Dolar-Chile";
  const colorDeLinea = "red";
  const valores = dolares.serie.map((valor) => {
    return valor.valor;
  });
  const config = {
    type: tipoDeGrafica,
    data: {
      labels: fechas,
      datasets: [
        {
          label: titulo,
          backgroundColor: colorDeLinea,
          data: valores,
        },
      ],
    },
  };
  return config;
}

async function renderGraficaDolar() {
  const dolares = await FechasValoresDolar();
  const config = configuracionGraficaDolares(dolares);
  new Chart(etiquetaGraficoDolar, config);
}
////////////////////////////////EUROS
async function FechasValoresEuro() {
  const get = await fetch("https://mindicador.cl/api/euro");
  const euros = await get.json();
  return euros;
}

function configuracionGraficaEuros(euros) {
  const tipoDeGrafica = "line";
  const fechas = euros.serie.map((fecha) => {
    return fecha.fecha;
  });
  const titulo = "Historico Euro-Chile";
  const colorDeLinea = "red";
  const valores = euros.serie.map((valor) => {
    return valor.valor;
  });
  const config = {
    type: tipoDeGrafica,
    data: {
      labels: fechas,
      datasets: [
        {
          label: titulo,
          backgroundColor: colorDeLinea,
          data: valores,
        },
      ],
    },
  };
  return config;
}

async function renderGraficaEuros() {
  const euros = await FechasValoresEuro();
  const config = configuracionGraficaEuros(euros);
  new Chart(etiquetaGraficoEuros, config);
}
//////////////////////////////////////////////////////////////////////////7
