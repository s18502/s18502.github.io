jQuery.fn.swapWith = function(to) {
    return this.each(function() {
        var copy_to = $(to).clone(true);
        var copy_from = $(this).clone(true);
        $(to).replaceWith(copy_from);
        $(this).replaceWith(copy_to);
    });
};

const Options = {
	ChangeColor: 1,
	AddDiv: 2,
	DeleteDiv: 3,
	MoveDiv: 4,
	ColorDivBorder: 5,
	AddRoundedDiv: 6
}

function deregisterOnClick() {
	$("#right div").off();
}

function handleColorDiv() {
	deregisterOnClick();
	$("#right div").click(function(e) {
		let color = $("#color").val();
		$(e.target).css('background-color', color);
	});
}

function handleAddDiv() {
	deregisterOnClick();
	$("#right div").click(function(e){
		$(e.target).append("<div />");
	});
}

function handleDelDiv() {
	deregisterOnClick();
	$("#right div").click(function(e){
		$(e.target).remove();
	});
}

function handleColorBorder() {
	deregisterOnClick();
	$("#right div").click(function(e) {
		let color = $("#color").val();
		$(e.target).css('border-color', color);
	});
}

function handleAddRoundedDiv() {
	deregisterOnClick();
	$("#right div").click(function(e){
		$(e.target).append('<div style="border-radius:5px;" />');
	});
}

function handleMoveDiv() {
	deregisterOnClick();
	let subject = null;

	$("#right div").click(function(e) {
		if(subject) {
			$(e.target).swapWith($(subject));
			subject = undefined;
		} else {
			subject = e.target;
		}
	});
}

$("#wlacz").click(function() {
	let selectedVal = parseInt($("#opcja").val());
	let selectedColor = $("#color").val();
	switch(selectedVal) {
		case Options.ChangeColor:
			handleColorDiv();
			break;
		case Options.AddDiv:
			handleAddDiv();
			break;
		case Options.DeleteDiv:
			handleDelDiv();
			break;
		case Options.MoveDiv:
			handleMoveDiv();
			break;
		case Options.ColorDivBorder:
			handleColorBorder();
			break;
		case Options.AddRoundedDiv:
			handleAddRoundedDiv();
			break;
		default:
			throw ("No such option " + selectedVal)
	}

	console.log(selectedColor, selectedVal);
});