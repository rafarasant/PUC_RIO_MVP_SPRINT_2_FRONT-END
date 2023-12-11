/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getList = async () => {
  let url = 'http://127.0.0.1:5000/pacientes';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.pacientes.forEach(item => insertList(item.name,
                                                item.age,
                                                item.sex,
                                                item.cp,
                                                item.trestbps,
                                                item.chol,
                                                item.fbs,
                                                item.restecg,
                                                item.thalach,
                                                item.exang,
                                                item.oldpeak,
                                                item.slope,
                                                item.ca,
                                                item.thal,
                                                item.outcome,                                                         
                                              ))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}


/*
  --------------------------------------------------------------------------------------
  Função para colocar um item na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
const postItem = async (inputPaciente, inputIdade, inputSexo, 
                        inputDorPeito, inputPressao, inputColesterol, 
                        inputGlicemia, inputEletro, inputFrequencia, 
                        inputAngina, inputDepressao, inputInclinacao, 
                        inputVasos, inputTalassemia) => {

                         
  const meuform =  new FormData();
  meuform.append('name', inputPaciente);
  meuform.append('age', inputIdade);
  meuform.append('sex', inputSexo);
  meuform.append('cp', inputDorPeito);
  meuform.append('trestbps', inputPressao);
  meuform.append('chol', inputColesterol);
  meuform.append('fbs', inputGlicemia);
  meuform.append('restecg', inputEletro);
  meuform.append('thalach', inputFrequencia);
  meuform.append('exang', inputAngina);
  meuform.append('oldpeak', inputDepressao);
  meuform.append('slope', inputInclinacao);
  meuform.append('ca', inputVasos);
  meuform.append('thal', inputTalassemia);
  
  let url = 'http://127.0.0.1:5000/paciente';
  fetch(url, {
    method: 'post',
    body: meuform
  })
    .then((response) => response.json())
    .then((data) => {
      alert(data.message);
  })
    .catch((error) => {
      console.error('Error:', error);
    });

}


/*
  --------------------------------------------------------------------------------------
  Função para criar um botão close para cada item da lista
  --------------------------------------------------------------------------------------
*/
const insertDeleteButton = (parent) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  parent.appendChild(span);
}

/*
  --------------------------------------------------------------------------------------
  Função para remover um item da lista de acordo com o click no botão close
  --------------------------------------------------------------------------------------
*/
const removeElement = () => {
  let close = document.getElementsByClassName("close");
  // var table = document.getElementById('myTable');
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const nomeItem = div.getElementsByTagName('td')[0].innerHTML
      if (confirm("Você tem certeza?")) {
        div.remove()
        deleteItem(nomeItem)
        alert("Removido!")
      }
    }
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para deletar um item da lista do servidor via requisição DELETE
  --------------------------------------------------------------------------------------
*/
const deleteItem = (item) => {
  console.log(item)
  let url = 'http://127.0.0.1:5000/paciente?name='+item;
  fetch(url, {
    method: 'delete'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para adicionar um novo item
  --------------------------------------------------------------------------------------
*/
  const newItem = () => {
    let inputPaciente = document.getElementById("newInput").value;
    let inputIdade = document.getElementById("newIdade").value;
    let inputSexo = document.getElementById("newSexo").value;
    let inputDorPeito = document.getElementById("newDorPeito").value;
    let inputPressao = document.getElementById("newPressao").value;
    let inputColesterol = document.getElementById("newColesterol").value;
    let inputGlicemia = document.getElementById("newGlicemia").value;
    let inputEletro = document.getElementById("newEletro").value;
    let inputFrequencia = document.getElementById("newFrequencia").value;
    let inputAngina = document.getElementById("newAngina").value;
    let inputDepressao = document.getElementById("newDepressao").value;
    let inputInclinacao = document.getElementById("newInclinacao").value;
    let inputVasos = document.getElementById("newVasos").value;
    let inputTalassemia = document.getElementById("newTalassemia").value;


  // Verifique se o nome do produto já existe antes de adicionar

  const checkUrl = `http://127.0.0.1:5000/pacientes?nome=${inputPaciente}`;
  fetch(checkUrl, {
    method: 'get'
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.pacientes && data.pacientes.some(item => item.name === inputPaciente)) {
        alert("O paciente já está cadastrado.\nCadastre o paciente com um nome diferente ou atualize o existente.");
      } else if (inputPaciente === '' || inputIdade === '' || inputSexo === '' || inputDorPeito === '' || inputPressao === '' || inputColesterol === '' || inputGlicemia === '' || inputEletro === '' || 
                  inputFrequencia === '' || inputAngina === '' || inputDepressao === '' || inputInclinacao === '' || inputVasos === '' || inputTalassemia === '') {
        alert("Todos os campos devem ser preenchidos para a realização do diagnóstico.");
      } else if (isNaN(inputPressao) || isNaN(inputColesterol) || isNaN(inputFrequencia) || isNaN(inputDepressao)) {
        alert("Esse(s) campo(s) precisam ser números.");
      } else {
        insertList(inputPaciente, inputIdade, inputSexo, inputDorPeito, inputPressao, inputColesterol, inputGlicemia, inputEletro, inputFrequencia, inputAngina, inputDepressao, inputInclinacao, inputVasos, inputTalassemia);
        postItem(inputPaciente, inputIdade, inputSexo, inputDorPeito, inputPressao, inputColesterol, inputGlicemia, inputEletro, inputFrequencia, inputAngina, inputDepressao, inputInclinacao, inputVasos, inputTalassemia);
        alert("Item adicionado!");
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });

}


/*
  --------------------------------------------------------------------------------------
  Função para inserir items na lista apresentada
  --------------------------------------------------------------------------------------
*/
const insertList = (nomePaciente, idade, sexo, dorPeito, pressao, colesterol, glicemia, eletro, frequencia, angina, depressao, inclinacao, vasos, talassemia, outcome) => {
  var item = [nomePaciente, idade, sexo, dorPeito, pressao, colesterol, glicemia, eletro, frequencia, angina, depressao, inclinacao, vasos, talassemia, outcome];
  var table = document.getElementById('myTable');
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cell = row.insertCell(i);
    cell.textContent = item[i];
  }

  var deleteCell = row.insertCell(-1);
  insertDeleteButton(deleteCell);


  document.getElementById("newInput").value = "";
  document.getElementById("newIdade").value = "";
  document.getElementById("newSexo").value = "";
  document.getElementById("newDorPeito").value = "";
  document.getElementById("newPressao").value = "";
  document.getElementById("newColesterol").value = "";
  document.getElementById("newGlicemia").value = "";
  document.getElementById("newEletro").value = "";
  document.getElementById("newFrequencia").value = "";
  document.getElementById("newAngina").value = "";
  document.getElementById("newDepressao").value = "";
  document.getElementById("newInclinacao").value = "";
  document.getElementById("newVasos").value = "";
  document.getElementById("newTalassemia").value = "";

  removeElement();
}