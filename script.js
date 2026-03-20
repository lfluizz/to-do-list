//Variaveis

const buttonTask = document.getElementById('addTask');
const inputTask = document.getElementById('inputTask');
const alerta = document.querySelector('.alerta')
const list = document.getElementById('list');



//Eventos

buttonTask.addEventListener('click', adicionarTarefa);

//Adicionar a tarefa pelo enter
inputTask.addEventListener('keydown', (e) => {
    if(e.key === 'Enter') {
        adicionarTarefa();
    }
})

//Remover o alerta de erro ao digitar no input
inputTask.addEventListener('input', () => {
    inputTask.classList.remove('erro');
    alerta.classList.remove('erro');
})


list.addEventListener('click', e => {
    const elemento = e.target

    //Para excluir a tarefa
    if (elemento.classList.contains('removeTask')){
        const li = elemento.closest('li');
        li.remove();

        atualizarLocalStorage() // atualizar local storage
    }

    //Para marcar como concluída
    if (elemento.classList.contains('completeTask') ) {

       const li = elemento.closest('li');
       li.classList.toggle('completed');

       if (li.classList.contains('completed')) {
            list.appendChild(li); // Move para o final da lista
       } else {
            list.prepend(li); // Move para o começo ao desmarcar 
       }

       atualizarLocalStorage();
    }

})


//Funções

function adicionarTarefa() {
    const tarefa = inputTask.value;
    
    if (tarefa.trim() === '') {
        inputTask.classList.add('erro');
        alerta.classList.add('erro');
        inputTask.value = '';
        return
    }

    const tarefaLi = document.createElement('li');
    tarefaLi.innerHTML = `<span class="task-text"> ${tarefa}</span>   <div class="icons">
                    <i class="fa-regular fa-circle-check completeTask btn-icon"></i>
                    <i class="fa-regular fa-trash-can removeTask btn-icon"></i>
                    </div>`;

    list.appendChild(tarefaLi);
    inputTask.value = '';

    atualizarLocalStorage();
}

function atualizarLocalStorage() {
    const tarefas = [];

    document.querySelectorAll('#list li').forEach(li =>{
        tarefas.push({
            texto: li.querySelector('.task-text').textContent.trim(),
            concluída: li.classList.contains('completed')
        });
    });

    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function carregarTarefa() {
    const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

    tarefas.forEach(tarefa =>{
        const tarefaLi = document.createElement('li');
        
        if(tarefa.concluída) {
            tarefaLi.classList.add('completed');
        }

        tarefaLi.innerHTML = `<span class="task-text"> ${tarefa.texto}</span>   <div class="icons">
                    <i class="fa-regular fa-circle-check completeTask btn-icon"></i>
                    <i class="fa-regular fa-trash-can removeTask btn-icon"></i>
                    </div>`;


        list.appendChild(tarefaLi);
    });
}

carregarTarefa();