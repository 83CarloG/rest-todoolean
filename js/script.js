/*
# rest-boolean
L'esercizio di oggi è quello di creare, come fatto in aula, una todo list sulla quale sarà possibile svolgere le operazioni di CRUD, usando qusta Api: http://157.230.17.132:3011/todos
*/

$(document).ready(function	() {
	createTodoList();
	readTodoList();
	updateTodoList();
	deleteTodoList();
});

function createTodoList() {
	$('.btn-add').on('click', function	() {
		var val = $('#add-item').val()
		if (val !== '') {
			$.ajax({
				url: 'http://157.230.17.132:3011/todos/',
				type: 'POST',
				data: {
					'text': val
				},
				success: function (data) {
					var elmCreated = [];
					elmCreated.push(data)
					render(elmCreated);
				}
			})
		}
	});
}

function readTodoList () {
	$.ajax({
		url: 'http://157.230.17.132:3011/todos',
		type: 'GET',
		success: function (data) {
			render(data);
		}
	})
}
function updateTodoList	()	{
	$('.list').on('click', '.update', function () {
		var elm = $(this).parent();
		var id = elm.attr('id');
		var item = elm.children('input').val()
		$.ajax({
			url: 'http://157.230.17.132:3011/todos/' + id,
			type: 'PUT',
			data: {
				text: item
			},
			success: function (data) {
				var elmCreated = [];
				elmCreated.push(data);
				render(data);
			}
		})
	});
}
function deleteTodoList ()	{
	$('.list').on('click', '.delete', function () {
		console.log('ok')
		var elm = $(this).parent();
		var id = elm.attr('id');
		$.ajax({
			url: 'http://157.230.17.132:3011/todos/' + id,
			type: 'DELETE',
			success: function (data) {
				elm.remove();
			}
		})
	});
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
		$('#add-item').val('');
	};
}
