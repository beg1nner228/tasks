const list = document.querySelector("#bookmarkList")
const input = document.querySelector("#bookmarkInput")
let bookmarksList = JSON.parse(localStorage.getItem("bookmarksArray")) || []

markup(bookmarksList)

input.addEventListener("change", onInputAdd)

function onInputAdd(e) {
  e.preventDefault()
  const value = input.value.trim()
  if (!value) return
  bookmarksList.push(value)
  localStorage.setItem("bookmarksArray", JSON.stringify(bookmarksList))
  markup(bookmarksList)
  input.value = ""
}

function markup(arr) {
  if (arr.length === 0) {
    list.innerHTML = ""
    return
  }
  const markupList = arr.map(item => `
    <li>
      <a href="${item}" target="_blank">${item}</a>
      <button class="delete" data-link="${item}">X</button>
    </li>
  `).join("");
  list.innerHTML = markupList; 
}

list.addEventListener("click", (e) => {
  if (!e.target.classList.contains("delete")) return
  const value = e.target.dataset.link
  bookmarksList = bookmarksList.filter(item => item !== value)
  localStorage.setItem("bookmarksArray", JSON.stringify(bookmarksList))
  markup(bookmarksList)
})
