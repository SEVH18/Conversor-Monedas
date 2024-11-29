const selectorDeMonedas = document.getElementById("monedas")
const monedaDolar = document.getElementById("usd")
const monedaEuro = document.getElementById("eur")

async function FechasValoresDolar() {
    const get = await fetch(
        "https://mindicador.cl/api/dolar");
    const dolares = await get.json();
    return dolares    
}
    
function configuracionGraficaDolares(dolares) {
    const tipoDeGrafica = "line"
    const fechas = dolares.serie.map((fecha) => {
        return fecha.fecha
    })
    const titulo = "Historico Dolar-Chile"
    const colorDeLinea = "red"
    const valores = dolares.serie.map((valor) => {
       return valor.valor
    })
    const config = {
        type: tipoDeGrafica,
        data: {
            labels: fechas,
            datasets: [
                {
                    label: titulo,
                    backgroundColor: colorDeLinea,
                    data: valores
                }
            ]
        }
    }
    return config 
}

async function renderGraficaDolar() {
    const dolares = await FechasValoresDolar();
    const config = configuracionGraficaDolares(dolares);
    const graficaDOM = document.getElementById("myChart");
    new Chart(graficaDOM, config)
    graficaDOM.innerHTML=""
    
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
  const graficaDOM = document.getElementById("euros");
    new Chart(graficaDOM, config);
    graficaDOM.innerHTML= ""
}

selectorDeMonedas.onchange = function escogerGrafico() {
    if (selectorDeMonedas.value == monedaDolar) {
        renderGraficaDolar()
    } else if( selectorDeMonedas.value == monedaEuro) {
        renderGraficaEuros()
    }
}