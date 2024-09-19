// Configure o Firebase com suas credenciais
const firebaseConfig = {
    apiKey: "AIzaSyCS7vTqiIYfI4EkfDpvNdKSoVDW9tcDsUU",
    authDomain: "esp-solar.firebaseapp.com",
    databaseURL: "https://esp-solar-default-rtdb.firebaseio.com",
    projectId: "esp-solar",
    storageBucket: "esp-solar.appspot.com",
    messagingSenderId: "858260283726",
    appId: "1:858260283726:web:e71a76062fd84edffa3e1f",
    measurementId: "G-PZ2MRL7J07"
};
// Inicialize o Firebase
firebase.initializeApp(firebaseConfig);
// Referência para o nó do banco de dados que você deseja acessar
const database = firebase.database();

document.addEventListener('DOMContentLoaded', function() {
    // Configuração do gráfico de tensão e corrente ============================================================================================================
    var options1 = {
        series: [
            {
                name: "Tensão",
                data: []
            },
            {
                name: "Corrente",
                data: []
            },
            {
                name: "Tensão Bat",
                data: []
            },
        ],
        chart: {
            height: 350,
            type: 'line',
            dropShadow: {
                enabled: true,
                color: '#000',
                top: 18,
                left: 7,
                blur: 10,
                opacity: 0.2
            },
            zoom: {
                enabled: true
            },
            toolbar: {
                show: true
            },
        },
        colors: ['#2e86c1', '#e67e22', '#8b8f8b'],
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
            width: [3, 3, 3] // Define a largura das linhas para cada série
        },
        markers: {
            size: 4, // Tamanho dos pontos
            colors: ['#2e86c1', '#e67e22', '#8b8f8b'], // Cores dos pontos para cada série
            strokeColor: '#fff', // Cor da borda dos pontos
            strokeWidth: 2, // Largura da borda dos pontos
            hover: {
                size: 7, // Tamanho do ponto ao passar o mouse
                sizeOffset: 3 // Offset do tamanho ao passar o mouse
            }
        },
        grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
            },
        },
        yaxis: [
            {
                title: {
                    text: 'Tensão'
                },
                axisBorder: {
                    show: true,
                    color: '#2e86c1'
                },
                axisTicks: {
                    show: true,
                    color: '#2e86c1'
                },
                labels: {
                    style: {
                        colors: '#2e86c1'
                    }
                },
            },
            {
                title: {
                    text: 'Corrente'
                },
                axisBorder: {
                    show: true,
                    color: '#e67e22'
                },
                axisTicks: {
                    show: true,
                    color: '#e67e22'
                },
                labels: {
                    style: {
                        colors: '#e67e22'
                    }
                },
            },
            {
                opposite: true,
                title: {
                    text: 'Tensão Bat'
                },
                axisBorder: {
                    show: true,
                    color: '#8b8f8b'
                },
                axisTicks: {
                    show: true,
                    color: '#8b8f8b'
                },
                labels: {
                    style: {
                        colors: '#8b8f8b'
                    }
                },
            }
        ],
    };
    
    var chart1 = new ApexCharts(document.querySelector("#chart"), options1);
    chart1.render();


    
    // Configuração do gráfico de potência =====================================================================================================================
    var options2 = {
        series: [
            {
                name: "Potência",
                data: []
            }
        ],
        chart: {
            height: 350,
            type: 'bar',
            dropShadow: {
                enabled: true,
                color: '#000',
                top: 18,
                left: 7,
                blur: 10,
                opacity: 0.2
            },
            zoom: {
                enabled: true
            },
            toolbar: {
                show: true
            },
        },
        colors: ['#1abc9c'],
        dataLabels: {
            enabled: true,
        },
        stroke: {
            curve: 'smooth'
        },
        grid: {
            borderColor: '#e7e7e7',
            row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
            },
        },
        markers: {
            size: 1
        },
        xaxis: {
            type: 'categories',
            categories: [],
            title: {
                text: 'Data'
            }
        },
        yaxis: {
            labels: {
                formatter: function(value) {
                    return value.toFixed(2); // Formata os valores do eixo Y com uma casa decimal
                }
            }
        },
        legend: {
            position: 'top',
            horizontalAlign: 'center',
            floating: true,
            offsetY: 0,
            offsetX: 0
        }
    };

    var chart2 = new ApexCharts(document.querySelector("#chartPotDia"), options2);
    chart2.render();


    // Configuração do gráfico de potência =====================================================================================================================
    var options3 = {
        series: [
            {
                name: "Potência",
                data: []
            }
        ],
        chart: {
            height: 350,
            type: 'bar',
            dropShadow: {
                enabled: true,
                color: '#000',
                top: 18,
                left: 7,
                blur: 10,
                opacity: 0.2
            },
            zoom: {
                enabled: true
            },
            toolbar: {
                show: true
            },
        },
        colors: ['#1abc9c'],
        dataLabels: {
            enabled: true,
        },
        stroke: {
            curve: 'smooth'
        },
        grid: {
            borderColor: '#e7e7e7',
            row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
            },
        },
        markers: {
            size: 1
        },
        xaxis: {
            type: 'categories',
            categories: [],
            title: {
                text: 'Data'
            }
        },
        yaxis: {
            labels: {
                formatter: function(value) {
                    return value.toFixed(2); // Formata os valores do eixo Y com uma casa decimal
                }
            }
        },
        legend: {
            position: 'top',
            horizontalAlign: 'center',
            floating: true,
            offsetY: 0,
            offsetX: 0
        }
    };

    var chart3 = new ApexCharts(document.querySelector("#chartPotMes"), options3);
    chart3.render();



    const ref1 = database.ref('Tensao_Corrente');
    ref1.on("value", (snapshot) => {
        const data = snapshot.val();
        console.log(data)
        const dataArray = Object.values(data).slice(-96); // Pegando os últimos 24 valores
        const categories = dataArray.map(item => item.Data); // Obtendo as datas dos últimos 24 valores
        const tensaoSolar = dataArray.map(item => parseFloat(item.TensPlaca).toFixed(2)); // Arredonda para uma casa decimal
        const correnteSolar = dataArray.map(item => parseFloat(item.CorrPlaca).toFixed(3)); // Arredonda para uma casa decimal
        const tensaoBat = dataArray.map(item => parseFloat(item.TensBate).toFixed(2)); // Arredonda para uma casa decimal

        // Atualizando os dados dos gráficos
        chart1.updateSeries([
            { name: "Tensão Solar (V)", data: tensaoSolar },
            { name: "Corrente Solar (A)", data: correnteSolar }, 
            { name: "Tensão Bateria (V)", data: tensaoBat },   
        ]);
        chart1.updateOptions({
            xaxis: {
                categories: categories
            }
        });
    });

    const ref2 = database.ref('Consumo_Diario');
    ref2.on("value", (snapshot) => {
        const data = snapshot.val();
        console.log(data)
        const dataArray = Object.values(data).slice(-30); // Pegando os últimos 24 valores
        const categories = dataArray.map(item => item.DataDay); // Obtendo as datas dos últimos 24 valores
        const potenciadia = dataArray.map(item => parseFloat(item.ConsPlacaDia).toFixed(2)); // Arredonda para duas casas decimais
        // Atualizando os dados dos gráficos
        chart2.updateSeries([
            { name: "Potência DIA", data: potenciadia },
        ]);
        chart2.updateOptions({
            xaxis: {
                categories: categories
            }
        });
    });



    function mesNome(nomeDoMes) {
        // Array com os nomes dos meses
        const mes = [
            "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
            "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
        ];
        // Verifica se o número do mês é válido
        if (nomeDoMes < 1 || nomeDoMes > 12) {
            return "Número do mês inválido";
        }
        // Retorna o nome do mês correspondente
        return mes[nomeDoMes - 1];
    }
    console.log(mesNome(1));  // Janeiro


    const ref3 = database.ref('Consumo_Mes');
    ref3.on("value", (snapshot) => {
        const data = snapshot.val();
        console.log(data)
        const dataArray = Object.values(data).slice(-12); // Pegando os últimos 24 valores
        const categories = dataArray.map(item => mesNome(item.DataMes)); // Obtendo as datas dos últimos 24 valores
        const potenciames = dataArray.map(item => parseFloat(item.potPlacaMes).toFixed(2)); // Arredonda para duas casas decimais


        // Atualizando os dados dos gráficos
        chart3.updateSeries([
            { name: "Potência MES", data: potenciames },
        ]);
        chart3.updateOptions({
            xaxis: {
                categories: categories
            }
        });
    });

});