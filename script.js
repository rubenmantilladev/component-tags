let tags = [];

// capturando elementos del DOM
const inputTagContainer = document.querySelector("#input-tag");

// Creando elementos para el input tag
const tagsContainer = document.createElement("div");
const inputTag = document.createElement("span");

// haciendo mi span editable
inputTag.ariaRoleDescription = "textbox";
inputTag.contentEditable = "true";
inputTag.classList.add("input");
inputTag.focus();

// insertando elementos creados al DOM
inputTagContainer.appendChild(tagsContainer);
tagsContainer.appendChild(inputTag);

// agregando clases a los elementos creados
inputTagContainer.classList.add("input-tag-container");
tagsContainer.classList.add("tag-container");

//
inputTagContainer.addEventListener("click", (e) => {
  if (
    e.target.id == "input-tag" ||
    e.target.classList.contains("tag-container")
  ) {
    inputTag.focus(); // focus on input tag
  }
});

inputTag.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && inputTag.textContent !== "") {
    e.preventDefault();
    if (!existTag(inputTag.textContent)) {
      tags.push(inputTag.textContent);
      inputTag.textContent = "";
      renderTags();
    }
  } else if (
    e.key === "Backspace" &&
    inputTag.textContent === "" &&
    tags.length > 0
  ) {
    tags.pop();
    renderTags();
  }
});

function renderTags() {
  tagsContainer.innerHTML = "";
  const html = tags.map((tag) => {
    const tagElement = document.createElement("div");
    const tagButton = document.createElement("button");

    tagElement.classList.add("tag-item");
    tagButton.textContent = "x";
    tagButton.addEventListener("click", (e) => {
      // Eliminar etiqueta
      removeTag(tag)
    });
    tagElement.appendChild(document.createTextNode(tag));
    tagElement.appendChild(tagButton);
    return tagElement;
  });

  html.forEach((element) => {
    tagsContainer.appendChild(element);
  });
  tagsContainer.appendChild(inputTag);
  inputTag.focus();
}

function existTag(value) {
  return tags.includes(value);
}

function removeTag(value) {
  tags = tags.filter((tag) => tag !== value);
  renderTags();
}
