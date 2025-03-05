async function carregarMercados() {
    const response = await fetch("/api/mercados");
    const result = await response.json();

    const mercadoSelect = document.getElementById("mercado");
    mercadoSelect.innerHTML = "<option value=''>Selecione</option>";

    result.mercados.forEach(function(mercado) {
        const option = document.createElement("option");
        option.value = mercado;
        option.textContent = mercado;
        mercadoSelect.appendChild(option);
    });
}

carregarMercados();

document.getElementById("filtroForm").addEventListener("submit", async function(event) {
event.preventDefault(); 

const mercado = document.getElementById("mercado").value;
const ano = document.getElementById("ano").value;
const mes = document.getElementById("mes").value;

if (!mercado || !ano || !mes) {
alert("Por favor, selecione um mercado, ano e mês.");
return;
}

const response = await fetch(`/api/voo_data?mercado=${mercado}&ano=${ano}&mes=${mes}`);
const result = await response.json();

if (result.dates) {
atualizarGraficoRpkAsk(result.dates, result.rpk, result.ask);
atualizarGraficoLoadFactor(result.dates, result.load_factor);

} else {
alert("Nenhum dado encontrado.");
}
});

function atualizarGraficoRpkAsk(labels, rpkData, askData) {
const ctxRpkAsk = document.getElementById("graficoCanvas").getContext("2d");

if (window.graficoRpkAsk) window.graficoRpkAsk.destroy(); 

window.graficoRpkAsk = new Chart(ctxRpkAsk, {
type: "bar",
data: {
    labels: labels,
    datasets: [
        {
            label: "RPK",
            data: rpkData,
            backgroundColor: "#009909",
            borderWidth: 1,
            fill: true,
            barThickness: 34

        },
        {
            label: "ASK",
            data: askData,
            backgroundColor: "#ff6200",
            borderWidth: 1,
            fill: true,
            barThickness: 34

        },
    ]
},
options: {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
        y: {
            beginAtZero: true,
            ticks: {
                callback: function(value) {
                    return value;
                }
            }
        }
    }
}
});
document.getElementById("graficoCanvas").style.visibility = "visible";
document.getElementById("graficoCanvas").style.marginTop = "50px";
document.querySelector(".container").style.height = "visible";
document.querySelector(".container").style.overflowY = "visible";
document.querySelector(".container").style.height = "86rem";



}

function atualizarGraficoLoadFactor(labels, loadFactorData) {
const ctxLoadFactor = document.getElementById("graficoCanvasLoadFactor").getContext("2d");

if (window.graficoLoadFactor) window.graficoLoadFactor.destroy(); 

window.graficoLoadFactor = new Chart(ctxLoadFactor, {
type: "bar",
data: {
    labels: labels,
    datasets: [
        {
            label: "Load Factor (%)",
            data: loadFactorData,
            backgroundColor: "#4bc0c0",
            borderColor: "#4bc0c0",
            fill: false,
            barThickness: 34
        }
    ]
},
options: {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
        y: {
            beginAtZero: true,
            ticks: {
                callback: function(value) {
                    return value + "%";
                }
            }
        }
    }
}
});
document.getElementById("graficoCanvasLoadFactor").style.visibility = "visible";
document.getElementById("graficoCanvasLoadFactor").style.marginTop = "40px";
document.querySelector(".container").style.height = "visible";
document.querySelector(".container").style.overflowY = "visible";
document.querySelector(".container").style.height = "86rem";

}
