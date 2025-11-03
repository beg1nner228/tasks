const list = document.querySelector("#bookmarkList")
const input = document.querySelector("#bookmarkInput")
const bookmarksList = [];
const deleteButtons = document.querySelectorAll(".delete")

input.addEventListener("change", onInputAdd)

function onInputAdd(e) {
  e.preventDefault();
  const value = input.value;

  bookmarksList.push(value);
  markup(bookmarksList)
}


function markup(arr) {
  const markupList = [...arr].map( item =>     `
  <li>
    <a href="${item}" target="_blank">${item}</a>
    <button class="delete">X</button>
  </li>
  `).join(" ")
  list.innerHTML = markupList;
  console.log(markupList)
}

deleteButtons.forEach( button => button.addEventListener("click", onClickDeleteItem))

function onClickDeleteItem(e) {
  console.log("tset");
}
