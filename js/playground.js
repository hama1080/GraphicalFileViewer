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
  var files = evt.dataTransfer.files;

  for(var i =0, f; f = files[i]; i++)
  {
    console.log(f);
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
