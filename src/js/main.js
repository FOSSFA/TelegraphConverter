const Telegraphlink = document.getElementById("Telegraphlink");
const progress = document.getElementsByTagName("progress");
const rsltMD = document.getElementById("rsltMD");
const rslt = document.getElementById("rslt");
const prvw = document.getElementsByClassName("prvw");
var turndownService = new TurndownService()

// Telegraph formatter function (api docs sugestion)
function nodeToDom(node) {
  if (typeof node === 'string' || node instanceof String) {
    return document.createTextNode(node);
  }
  if (node.tag) {
    var domNode = document.createElement(node.tag);
    if (node.attrs) {
      for (var name in node.attrs) {
        var value = node.attrs[name];
        if (name == "src") {
          domNode.setAttribute(name, "https://telegra.ph" + value);
        } else {
          domNode.setAttribute(name, value);
        }
      }
    }
  } else {
    var domNode = document.createDocumentFragment();
  }
  if (node.children) {
    for (var i = 0; i < node.children.length; i++) {
      var child = node.children[i];
      domNode.appendChild(nodeToDom(child));
    }
  }
  return domNode;
}

$("#Submitter").click(function(){ 
  $.getJSON('https://api.telegra.ph/getPage/' + Telegraphlink.value + '?return_content=true', function (data) {
    data["result"].content.forEach(cont => {
      prvw[0].innerHTML = prvw[0].innerHTML + nodeToDom(cont).outerHTML;
    });
  })
  document.getElementById("Linkform").style.display = "none";
  prvw[0].style.cssText = "position: relative;z-index: -1;animation: scroll 5s ease-in-out;animation-play-state: running;"
  progress[0].removeAttribute("value");
  setTimeout(() => {
    const markdown = turndownService.turndown(prvw[0].innerHTML)
    rsltMD.innerHTML = markdown;
    rslt.innerHTML = prvw[0].innerHTML;
    progress[0].setAttribute("value", "100");
    prvw[0].style.cssText = "display: none;"
    document.getElementsByClassName("result")[0].classList.replace("hidden", "grid")
  }, 5000);
});  