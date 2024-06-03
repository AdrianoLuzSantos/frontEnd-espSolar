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
    const dataTenCor = database.ref('Tensao_Corrente');
    

    // Função para exibir os últimos 7 dados do Firebase na página HTML
    function displayLastSevenData(snapshot) {
        const redeamper = document.getElementById('redeamper');
        redeamper.innerHTML = ''; // Limpa o conteúdo antes de adicionar novos dados
        const redevolts = document.getElementById('redevolts');
        redevolts.innerHTML = ''; // Limpa o conteúdo antes de adicionar novos dados
        const placamper = document.getElementById('placamper');
        placamper.innerHTML = ''; // Limpa o conteúdo antes de adicionar novos dados
        const placavolts = document.getElementById('placavolts');
        placavolts.innerHTML = ''; // Limpa o conteúdo antes de adicionar novos dados

        const dataArr = [];
        snapshot.forEach(childSnapshot => {
            const data = childSnapshot.val();
                dataArr.push({ Data: data.Data, CorreRede: data.CorreRede, TensRede: data.TensRede, 
                    CorrPlaca: data.CorrPlaca, TensPlaca: data.TensPlaca, Status: data.Status });
        });


        // Ordena os dados pela data mais recente
        dataArr.sort((a, b) => b.Data - a.Data);
        // Pega apenas os últimos 7 elementos
        const lastSevenData = dataArr.slice(-1); // Alteração aqui, de -1 para 7
        // Monta uma string com os últimos 7 dados

        let lastSevenString = "";
        lastSevenData.forEach(data => {
            lastSevenString += /*data.Data + ': ' + */ data.CorreRede.toFixed(2) +'\n'; // Altere de acordo com sua estrutura de dados
        });
        let lastSevenString1 = "";
        lastSevenData.forEach(data => {
            lastSevenString1 += /*data.Data + ': ' + */ data.TensRede.toFixed(2) +'\n'; // Altere de acordo com sua estrutura de dados
        });
        let lastSevenString2 = "";
        lastSevenData.forEach(data => {
            lastSevenString2 += /*data.Data + ': ' + */ data.CorrPlaca.toFixed(2) +'\n'; // Altere de acordo com sua estrutura de dados
        });
        let lastSevenString3 = "";
        lastSevenData.forEach(data => {
            lastSevenString3 += /*data.Data + ': ' + */ data.TensPlaca.toFixed(2) +'\n'; // Altere de acordo com sua estrutura de dados
        });
        
        // Adiciona a string com os últimos 7 dados ao elemento redeamper
        redeamper.textContent = lastSevenString;
        redevolts.textContent = lastSevenString1;
        placamper.textContent = lastSevenString2;
        placavolts.textContent = lastSevenString3;
    }


    // Adicione um listener para atualizar os últimos 7 dados em tempo real
    dataTenCor.on('value', snapshot => {
        displayLastSevenData(snapshot);
    });



    /// Crie uma instância do gráfico de linha
    const chart = anychart.line();

    // Defina o título do gráfico
    chart.title('Tensão e Corrente ao longo do tempo');

    // Adicione os rótulos dos eixos
    chart.xAxis().title('Data');
    chart.yAxis().title('Valor');

    // Defina os dados iniciais do gráfico
    const initialData = [];
    chart.line(initialData);

    // Adicione uma legenda
    chart.legend().enabled(true);

    // Personalize o estilo da linha do gráfico para TensPlaca
    chart.line(1).stroke('#2196F3');

    // Personalize o estilo da linha do gráfico para CorrPlaca
    chart.line(1).stroke('#FF9800');

    // Adicione o gráfico ao elemento HTML com id "chartContainer"
    chart.container('chartContainer');

    // Renderize o gráfico
    chart.draw();

    // Função para atualizar o gráfico com os dados do Firebase
    function updateChart(snapshot) {
        const tensDataArr = [];
        const corrDataArr = [];
        const snapshotArray = []; // Array temporário para armazenar os dados do snapshot

        snapshot.forEach(childSnapshot => {
            const data = childSnapshot.val();
            if (data && typeof data === 'object' && 'Data' in data && 'TensPlaca' in data && 'CorrPlaca' in data) {
                snapshotArray.push({x: data.Data, tens: data.TensPlaca.toFixed(2), corr: data.CorrPlaca.toFixed(2)});
            } else {
                console.error("Dados inválidos:", data);
            }
        });

        // Ordena os dados pela data em ordem decrescente
        snapshotArray.sort((a, b) => b.x - a.x);

        // Pega os cinco últimos dados do snapshotArray
        const latestData = snapshotArray.slice(-24);

        // Adiciona os cinco últimos dados ao arrays tensDataArr e corrDataArr
        latestData.forEach(data => {
            tensDataArr.push({x: data.x, value: data.tens});
            corrDataArr.push({x: data.x, value: data.corr});
        });

        // Atualiza os dados no gráfico
        chart.line(0).data(tensDataArr);
        chart.line(1).data(corrDataArr);
    }

    // Adicione um listener para atualizar o gráfico em tempo real
    dataRef.on('value', snapshot => {
        updateChart(snapshot);
    }); 