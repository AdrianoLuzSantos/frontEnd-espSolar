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
    const dataPotDia = database.ref('Consumo_Diario'); 
    const dataPotMes = database.ref('Consumo_Mes'); 
    

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
        let lastSevenString8 = "";
        lastSevenData.forEach(data => {

            lastSevenString8 += /*data.Data + ': ' + */ data.Status +'\n'; // Altere de acordo com sua estrutura de dados
            if (data.Status == "REDE") {
                document.getElementById('statusSolar').style.display = 'none';
                document.getElementById('statusRede').style.display = 'block';
            } 
            else{
                document.getElementById('statusRede').style.display = 'none';
                document.getElementById('statusSolar').style.display = 'block';
            }
        });
        // Adiciona a string com os últimos 7 dados ao elemento redeamper
        redeamper.textContent = lastSevenString;
        redevolts.textContent = lastSevenString1;
        placamper.textContent = lastSevenString2;
        placavolts.textContent = lastSevenString3;
        status.textContent = lastSevenString8;
    }

    function consumoDiario(snapshot) {       
        const consDiaRede = document.getElementById('consDiaRede');
        consDiaRede.innerHTML = ''; // Limpa o conteúdo antes de adicionar novos dados
        const consDiaPlaca = document.getElementById('consDiaPlaca');
        consDiaPlaca.innerHTML = ''; // Limpa o conteúdo antes de adicionar novos dados

        const dataArr = [];
        snapshot.forEach(childSnapshot => {
            const data = childSnapshot.val();
                dataArr.push({ConsPlacaDia: data.ConsPlacaDia, ConsRedeDia: data.ConsRedeDia});
        });


        // Ordena os dados pela data mais recente
        dataArr.sort((a, b) => b.Data - a.Data);
        // Pega apenas os últimos 7 elementos
        const lastSevenData = dataArr.slice(-1); // Alteração aqui, de -1 para 7
        // Monta uma string com os últimos 7 dados

        let consumoDiario1 = "";
        lastSevenData.forEach(data => {
            consumoDiario1 += /*data.Data + ': ' + */ data.ConsRedeDia.toFixed(2) +'\n'; // Altere de acordo com sua estrutura de dados
        });
        let consumoDiario2 = "";
        lastSevenData.forEach(data => {
            consumoDiario2 += /*data.Data + ': ' + */ data.ConsPlacaDia.toFixed(2) +'\n'; // Altere de acordo com sua estrutura de dados
        });


        // Adiciona a string com os últimos 7 dados ao elemento redeamper
        consDiaRede.textContent = consumoDiario1;
        consDiaPlaca.textContent = consumoDiario2;
    }

    // Função para exibir o consumo mensal do Firebase na página HTML
    function consumoMes(snapshot) {
        const consMesRede = document.getElementById('consMesRede');
        consMesRede.innerHTML = ''; // Limpa o conteúdo antes de adicionar novos dados
        const consMesPlaca = document.getElementById('consMesPlaca');
        consMesPlaca.innerHTML = ''; // Limpa o conteúdo antes de adicionar novos dados


        const dataArr = [];
        snapshot.forEach(childSnapshot => {
            const data = childSnapshot.val();
                dataArr.push({potRedeMes: data.potRedeMes, potPlacaMes: data.potPlacaMes });
        });


        // Ordena os dados pela data mais recente
        dataArr.sort((a, b) => b.Data - a.Data);
        // Pega apenas os últimos 7 elementos
        const lastSevenData = dataArr.slice(-1); // Alteração aqui, de -1 para 7
        // Monta uma string com os últimos 7 dados

        
        let consumoMes1 = "";
        lastSevenData.forEach(data => {
            consumoMes1 += /*data.Data + ': ' + */ data.potRedeMes.toFixed(2) +'\n'; // Altere de acordo com sua estrutura de dados
        });
        let consumoMes2 = "";
        lastSevenData.forEach(data => {
            consumoMes2 += /*data.Data + ': ' + */ data.potPlacaMes.toFixed(2) +'\n'; // Altere de acordo com sua estrutura de dados
        });



        // Adiciona a string com os últimos 7 dados ao elemento redeamper
        consMesRede.textContent = consumoMes1;
        consMesPlaca.textContent = consumoMes2;
    }


        // Adicione um listener para atualizar os últimos 7 dados em tempo real
    dataTenCor.on('value', snapshot => {
        displayLastSevenData(snapshot);
    });
    dataPotDia.on('value', snapshot => {
        consumoDiario(snapshot);
    });
    dataPotMes.on('value', snapshot => {
        consumoMes(snapshot);
    });