/*
# rest-boolean
L'esercizio di oggi è quello di creare, come fatto in aula, una todo list sulla quale sarà possibile svolgere le operazioni di CRUD, usando qusta Api: http://157.230.17.132:3011/todos
*/

$(document).ready(function	() {
	readTodoList()
});

function readTodoList () {
	$.ajax({
		url: 'http://157.230.17.132:3011/todos',
		type: 'GET',
		success: function (data) {
			console.log(data.id)
			render(data);
		}
	})
}
function render (data) {
	var source = $('#rest-template').html();
	var template = Handlebars.compile(source);
	for (var i = 0; i < data.length; i++) {
		var context = {
			id: data[i].id,
			text: data[i].text
		}
		var html = template(context);
		$('.list').append(html);
	};
}
