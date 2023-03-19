// Описание переменных
const input = document.getElementById('input-value')
const btn = document.getElementById('btn')
const field = document.getElementById('field')


// Описание функции поиска репозиториев
function searchRepositories() {

	const value = input.value.trim()


	// Валидация
	if (value.length < 3) {
		field.innerHTML = `<div id="temp">Вы ввели менее 3-ёх символов</div>`
		setTimeout(() => {
			document.querySelector('#temp').remove()
		}, 1500)
	return
	}


	// Получение данных и вывод блоков с данными о репозитории
	fetch(`https://api.github.com/search/repositories?q=${value}&per_page=10`)
		.then(response => response.json()).then(data => {
		if (data.total_count === 0) {
			field.innerHTML = `<div id="temp">По запросу "${input.value}" ничего не найдено</div>`
			setTimeout(() => {
				document.querySelector('#temp').remove()
			}, 1500)
			return
		}

		const repositories = data.items
		const result = repositories.map(repository =>

`
			<div class="repo__block">
			<a href="${repository.html_url}" target="_blank"><div class="repo__title" id="title">${repository.name}</div></a>
				<div class="repo__owner" id="owner">Автор: ${repository.owner.login}</div>
				<div class="repo__description" id="description">Описание: ${repository.description || 'Описание отсутствует'}</div>
			</div>
`

		).join('')
		field.innerHTML = result
		})
}


// Вызов функции по кнопке
btn.addEventListener('click', searchRepositories)

// Вызов функции по Enter
input.addEventListener('keydown', event => {
	if (event.key === 'Enter') {
		searchRepositories()
	}
})