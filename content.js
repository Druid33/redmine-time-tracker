
// alert('content.js loaded');
//*[@id="content"]/h2
//#content > h2
////*[@id="content"]/h2

function getElementByXpath(path) {
  return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

taskTitle = getElementByXpath('//*[@id="content"]/h2');

if (taskTitle && taskTitle.innerHTML.match(/ #/g)) {
	console.log('task');
} else {
	console.log('neico ine');
}