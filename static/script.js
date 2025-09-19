const API_URL = "http://127.0.0.1:5000/creditos";

document.addEventListener("DOMContentLoaded", () => {
    cargarCreditos();

    const form = document.getElementById("creditoForm");
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const id = document.getElementById("creditoId").value;
        const credito = {
            cliente: document.getElementById("cliente").value,
            monto: parseFloat(document.getElementById("monto").value),
            tasa_interes: parseFloat(document.getElementById("tasa_interes").value),
            plazo: parseInt(document.getElementById("plazo").value),
            fecha_otorgamiento: document.getElementById("fecha_otorgamiento").value
        };

        if (id) {
            // Editar
            await fetch(`${API_URL}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(credito)
            });
        } else {
            // Crear
            await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(credito)
            });
        }

        form.reset();
        document.getElementById("creditoId").value = "";
        cargarCreditos();
    });
});

// Cargar créditos en tabla
async function cargarCreditos() {
    const res = await fetch(API_URL);
    const data = await res.json();
    const tbody = document.querySelector("#tablaCreditos tbody");
    tbody.innerHTML = "";

    data.forEach(c => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${c.id}</td>
            <td>${c.cliente}</td>
            <td>${c.monto}</td>
            <td>${c.tasa_interes}</td>
            <td>${c.plazo}</td>
            <td>${c.fecha_otorgamiento}</td>
            <td>
                <button onclick="editarCredito(${c.id}, '${c.cliente}', ${c.monto}, ${c.tasa_interes}, ${c.plazo}, '${c.fecha_otorgamiento}')">Editar</button>
                <button onclick="eliminarCredito(${c.id})">Eliminar</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function editarCredito(id, cliente, monto, tasa, plazo, fecha) {
    document.getElementById("creditoId").value = id;
    document.getElementById("cliente").value = cliente;
    document.getElementById("monto").value = monto;
    document.getElementById("tasa_interes").value = tasa;
    document.getElementById("plazo").value = plazo;
    document.getElementById("fecha_otorgamiento").value = fecha;
}

async function eliminarCredito(id) {
    if (confirm("¿Seguro que quieres eliminar este crédito?")) {
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        cargarCreditos();
    }
}
//-=-------------Gráficas----------------------------------

//Boton selector de agrupación
const selector = document.getElementById("tipoGrafico");
selector.addEventListener("change", cargarCreditos); // recarga gráfico al cambiar



let chart; // variable global para el gráfico

async function cargarCreditos() {
    const res = await fetch(API_URL);
    const data = await res.json();
    const tbody = document.querySelector("#tablaCreditos tbody");
    tbody.innerHTML = "";

    //const clientes = [];
   // const montos = [];
    data.forEach(c => {
        // llenar tabla
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${c.id}</td>
            <td>${c.cliente}</td>
            <td>${c.monto}</td>
            <td>${c.tasa_interes}</td>
            <td>${c.plazo}</td>
            <td>${c.fecha_otorgamiento}</td>
            <td>
                <button onclick="editarCredito(${c.id}, '${c.cliente}', ${c.monto}, ${c.tasa_interes}, ${c.plazo}, '${c.fecha_otorgamiento}')">Editar</button>
                <button onclick="eliminarCredito(${c.id})">Eliminar</button>
            </td>
        `;
        tbody.appendChild(row);
    }); 

    const tipo = selector.value;
    if (tipo === "cliente") {
        const clientes = data.map(c => c.cliente);
        const montos = data.map(c => c.monto);
        generarGraficoClientes(clientes, montos);
    } else if (tipo === "fecha") {
        generarGraficoFechas(data);
    }
    else if (tipo === "monto"){
        generarGraficoMonto(data);
    }

    
}

function generarGraficoClientes(clientes, montos) {
    const ctx = document.getElementById("creditoChart").getContext("2d");

    // si ya existe el gráfico, destruirlo para actualizarlo
    if (chart) chart.destroy();

    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: clientes,
            datasets: [{
                label: 'Monto de Crédito',
                data: montos,
                backgroundColor: 'rgba(58, 162, 235, 0.6)',
                borderColor: 'rgba(106, 183, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}

function generarGraficoFechas(data) {
    const ctx = document.getElementById("creditoChart").getContext("2d");
    if (chart) chart.destroy();

    // Contar créditos por fecha
    const conteo = {};
    data.forEach(c => {
        conteo[c.fecha_otorgamiento] = (conteo[c.fecha_otorgamiento] || 0) + 1;
    });

    // Ordenar fechas de más antigua a más reciente
    const fechas = Object.keys(conteo).sort();
    const numeros = fechas.map(f => conteo[f]);

    chart = new Chart(ctx, {
        type: 'line', // línea para ver tendencia, puedes cambiar a 'bar' si quieres
        data: {
            labels: fechas,
            datasets: [{
                label: 'Número de Créditos',
                data: numeros,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                fill: true
            }]
        },
        options: { scales: { y: { beginAtZero: true, stepSize: 1 } } }
    });
}

function generarGraficoMonto(data) {
    const ctx = document.getElementById("creditoChart").getContext("2d");
    if (chart) chart.destroy(); // destruir gráfico previo

    if (data.length === 0) return; // evitar errores si no hay datos

    // Encontrar monto máximo
    const maxMonto = Math.max(...data.map(c => c.monto));
    const minMonto = Math.min(...data.map(c => c.monto));

    // Calcular ancho de cada rango (6 rangos)
    const rango = (maxMonto - minMonto) / 6;

    // Inicializar contadores
    const conteo = [0, 0, 0, 0, 0, 0];
    const etiquetas = [];

    for (let i = 0; i < 6; i++) {
        const inicio = minMonto + i * rango;
        const fin = inicio + rango;
        etiquetas.push(`${inicio.toFixed(2)} - ${fin.toFixed(2)}`);
    }

    // Contar créditos por rango
    data.forEach(c => {
        let index = Math.floor((c.monto - minMonto) / rango);
        if (index === 6) index = 5; // el máximo va en el último rango
        conteo[index]++;
    });

    // Crear gráfico
    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: etiquetas,
            datasets: [{
                label: 'Cantidad de Créditos',
                data: conteo,
                backgroundColor: 'rgba(255, 206, 86, 0.6)',
                borderColor: 'rgba(255, 206, 86, 1)',
                borderWidth: 1
            }]
        },
        options: { 
            scales: { y: { beginAtZero: true, stepSize: 1 } }
        }
    });
}


