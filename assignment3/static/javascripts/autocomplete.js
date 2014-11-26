$(function() {
			function highlightText(text, $node) {
				var searchText = $.trim(text).toLowerCase(), currentNode = $node.get(0).firstChild, matchIndex, newTextNode, newSpanNode;
				while ((matchIndex = currentNode.data.toLowerCase().indexOf(searchText)) >= 0) {
					newTextNode = currentNode.splitText(matchIndex);
					currentNode = newTextNode.splitText(searchText.length);
					newSpanNode = document.createElement("span");
					newSpanNode.className = "highlight";
					currentNode.parentNode.insertBefore(newSpanNode, currentNode);
					newSpanNode.appendChild(newTextNode);
				}
			}
			$("#autocomplete").autocomplete({
				source: countries
			}).data("ui-autocomplete")._renderItem = function(ul, item) {
				var $a = $("<a></a>").text(item.label);
				highlightText(this.term, $a);
				return $("<li></li>").append($a).appendTo(ul);
			};
		});

$(document).ready(function(){
$("#autocomplete").keyup(function(event){
    if(event.keyCode == 13){
        $("#submitter").click();
    }
});
});

function processClk(){
	
var urlVal = $("#autocomplete").val();
window.location.assign("/" + urlVal);

}