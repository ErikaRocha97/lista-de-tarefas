// Começar pegando os elementos que a gente vai precisar:

const form = document.querySelector("#todo-form");
const taskTitleInput = document.querySelector("#task-title-input");
const todoListUl = document.querySelector("#todo-list");

// Array de tarefas (objetos)

// [{title: Tarefa 1, done: true} , ...]
let tasks = [];

// Lidar com o evento de submissão do formulário
// Adicionar tarefa

form.addEventListener("submit", (event) => {
  // comportamento padrão quando um formulário é submetido: recarregar a página
  // evitar o comportamento padrão de recarregar a página ao submeter o formulário:
  event.preventDefault();

  // pegar o título da tarefa:
  const taskTitle = taskTitleInput.value;
  if (taskTitle.lengh < 3) {
    alert("Sua tarefa precisa de, pelo menos, 3 caracteres.");
    return; // serve para sair da função
  }

  // Adicionar tarefa no array
  tasks.push({
    title: taskTitle,
    done: false,
  });

  // criar tag li no javascrit: <li></li>
  const li = document.createElement("li");
  // li.textContent = taskTitle;

  // criar um input: <input type="checkbox" />
  const input = document.createElement("input");
  input.setAttribute("type", "checkbox");

  const span = document.createElement("span");
  span.textContent = taskTitle;

  const button = document.createElement("button");
  button.textContent = "Remover";

  // Adicionar evento "escutador" no botão
  button.addEventListener("click", (event) => {
    const liToRemove = event.target.parentElement;

    // Pegar o título da tarefa que estou removendo para remover do Array.
    const titleToRemove = liToRemove.querySelector("span").textContent;

    // Percorrer cada tarefa. Se o título for diferente do que eu quero remover, manter no Array final. Se não, excluir.
    tasks.filter((t) => t.title !== titleToRemove);

    // Remover do HTML o "elemento pai" do botão que disparou o evento:
    // console.log(event.target.parentElement);
    todoListUl.removeChild(liToRemove);
    // Remover do array de tarefas:
  });

  // Inserir no HTML

  li.appendChild(input);
  li.appendChild(span);
  li.appendChild(button);

  todoListUl.appendChild(li);

  taskTitleInput.value = "";
});
