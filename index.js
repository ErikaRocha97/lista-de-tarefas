// Começar pegando os elementos que a gente vai precisar:

const form = document.querySelector("#todo-form");
const taskTitleInput = document.querySelector("#task-title-input");
const todoListUl = document.querySelector("#todo-list");

// Array de tarefas (objetos)

// [{title: Tarefa 1, done: true} , ...]
let tasks = [];

// ! Adicionar tarefa no HTML
function renderTaskOnHTML(taskTitle, done = false) {
  // criar tag li no javascrit: <li></li>
  const li = document.createElement("li");
  // li.textContent = taskTitle;

  // criar um input: <input type="checkbox" />
  const input = document.createElement("input");
  input.setAttribute("type", "checkbox");
  input.addEventListener("change", (event) => {
    // pegar o elemento pai
    const liToToggle = event.target.parentElement;

    const spanToToggle = liToToggle.querySelector("span");

    const done = event.target.checked;
    // console.log(event.target.checked);
    if (done) {
      spanToToggle.style.textDecoration = "line-through";
    } else {
      spanToToggle.style.textDecoration = "none";
    }

    // console.log(tasks);

    // percorrer todas as tarefas. Alterar o done.
    tasks = tasks.map((t) => {
      if (t.title === spanToToggle.textContent) {
        return {
          title: t.title,
          done: !t.done,
        };
      }

      return t;
    });

    // console.log(tasks);
    // ! Salvar no localstorage
    localStorage.setItem("tasks", JSON.stringify(tasks));
  });

  input.checked = done;

  const span = document.createElement("span");
  span.textContent = taskTitle;

  if (done) {
    span.style.textDecoration = "line-through";
  }

  const button = document.createElement("button");
  button.textContent = "Remover";

  // Adicionar evento "escutador" no botão
  button.addEventListener("click", (event) => {
    const liToRemove = event.target.parentElement;

    // Pegar o título da tarefa que estou removendo para remover do Array.
    const titleToRemove = liToRemove.querySelector("span").textContent;

    // Percorrer cada tarefa. Se o título for diferente do que eu quero remover, manter no Array final. Se não, excluir.
    tasks = tasks.filter((t) => t.title !== titleToRemove);

    // Remover do HTML o "elemento pai" do botão que disparou o evento:
    // console.log(event.target.parentElement);
    todoListUl.removeChild(liToRemove);

    // console.log(tasks);

    // ! Salvar no localstorage
    localStorage.setItem("tasks", JSON.stringify(tasks));
  });

  // Inserir no HTML

  li.appendChild(input);
  li.appendChild(span);
  li.appendChild(button);

  todoListUl.appendChild(li);
}

// Pegar tarefas do localstorage ao carregar a página
window.onload = () => {
  const tasksOnLocalStorage = localStorage.getItem("tasks");
  if (!tasksOnLocalStorage) return;

  // converte String em objeto. Conteúdo do locastorage colocado no array.
  tasks = JSON.parse(tasksOnLocalStorage);

  tasks.forEach((t) => {
    renderTaskOnHTML(t.title, t.done);
  });
};

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

  // ! Salvar no localstorage
  localStorage.setItem("tasks", JSON.stringify(tasks));

  // Adicionando a nova tarefa no HTML chamando a função:
  renderTaskOnHTML(taskTitle);

  taskTitleInput.value = "";
});
