var req = new XMLHttpRequest();

var url = 'http://localhost:3000/hello.json';


req.open('GET', url, true);
req.addEventListener('load', handleLoad);
req.addEventListener('error', handleError);
req.send();
function handleLoad(data) {
  if (req.status >= 200 && req.status <= 400) {
    console.log(req.responseText);
    var messages = JSON.parse(req.responseText);
    messages.forEach(function(message) {
      var comm = document.createElement('div');
      var newChild = comm.textContent = message.message;

    document.body.insertBefore(comm, document.body.firstChild);

    });
  }
}
function handleError(err) {
  document.body.appendChild(document.createTextNode('uh-oh, something went wrong ' + e));
}
