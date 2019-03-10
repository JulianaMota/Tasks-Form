window.addEventListener("DOMContentLoaded", init);
const form = document.querySelector("form");

function init() {
  get();
}

function get() {
  fetch("https://anime-8835.restdb.io/rest/tasks", {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5c7ef096cac6621685acbbb6",
      "cache-control": "no-cache"
    }
  })
    .then(e => e.json())
    .then(e => {
      console.log(e);
      e.forEach(displayTasks);
    });
}

function displayTasks(task) {
  console.log("task");
  let id = task._id;
  //console.log(id);

  const copy = document.querySelector("template").content.cloneNode(true);

  copy.querySelector("[data-field=task]").textContent = task.Task;
  copy.querySelector("article").dataset.id = task._id;
  copy.querySelector("[data-field=date] span").textContent = task.Date;
  copy.querySelector("[data-field=time] span").textContent = task.Hour;
  copy.querySelector("[data-field=remove]").addEventListener("click", e => {
    e.target.parentElement.remove();
    removeTask(id);
  });

  document.querySelector("section").appendChild(copy);
}

form.addEventListener("submit", e => {
  form.elements.submit.disabled = true;
  console.log(e);
  e.preventDefault();
  const obj = {
    Task: form.elements.task.value,
    Date: form.elements.date.value,
    Hour: form.elements.hour.value
  };
  console.log(obj);
  post(obj);
});

function post(obj) {
  fetch("https://anime-8835.restdb.io/rest/tasks", {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5c7ef096cac6621685acbbb6",
      "cache-control": "no-cache"
    },
    body: JSON.stringify(obj)
  })
    .then(res => res.json())
    .then(data => displayTasks(data));
}

function removeTask(id) {
  console.log("article #" + id);

  fetch("https://anime-8835.restdb.io/rest/tasks/" + id, {
    method: "delete",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5c7ef096cac6621685acbbb6",
      "cache-control": "no-cache"
    }
  })
    .then(res => res.json())
    .then(data => console.log(data));
}

form.elements.task.addEventListener("blur", e => {
  if (form.elements.task.checkValidity()) {
  } else {
    alert("Write at leat 4 letters and no space on the begining");
  }
});

form.elements.date.addEventListener("blur", e => {
  if (form.elements.date.checkValidity()) {
  } else {
    alert("You can only add tasks from 2019 until 2020");
  }
});
