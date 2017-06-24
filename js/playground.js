// Check for the various File API support.
if (window.File && window.FileReader && window.FileList && window.Blob) {
  // Great success! All the File APIs are supported.
} else {
  alert('The File APIs are not fully supported in this browser.');
}

function handleFileSelect1(evt)
{
  var files = evt.target.files;

  for(var i =0, f; f = files[i]; i++)
  {
    console.log(f);
  }
}

function handleFileSelect2(evt)
{
  evt.stopPropagation();
  evt.preventDefault();
  var dataTransfer = evt.dataTransfer;

  if(dataTransfer && dataTransfer.items)
  {
    var items = dataTransfer.items;
    if(items.length > 1){
      console.log("please select one folder.")
      return;
    }
    var item = items[0], entry;

    if(item.getAsEntry){    // HTML5
      entry = item.getAsEntry();
    }else if(item.webkitGetAsEntry){    //webkit
      entry = item.webkitGetAsEntry();
    }
    ParseEntry(entry);
  }else{
    console.log("no item");
  }

}

//When run on local server, this function doesn't perform.
function ParseEntry(entry)
{
  if(entry.isFile){
    console.log(entry);
    console.log(entry.name);
    return;
  }else if (entry.isDirectory) {
    var reader = entry.createReader();
    reader.readEntries(
      //success
      function(results){
        for(var i = 0; i != results.length; i++){
          ParseEntry(results[i]);
        }
      },
      //error
      function(error){
        console.log(error);
        console.log("reading error");
      }
    );
    return;
  }
}
function handleDragOver(evt)
{
  evt.stopPropagation();
  evt.preventDefault();
  evt.dataTransfer.dropEffect = 'copy';
}

//select file
document.getElementById('files').addEventListener('change', handleFileSelect1, false);

//drag and drop
var drop_zone = document.getElementById('drop_zone');
drop_zone.addEventListener('dragover', handleDragOver, false);
drop_zone.addEventListener('drop', handleFileSelect2, false);
