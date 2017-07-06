var camera;
var container;
var renderer;

var init = function(){
  renderer = new THREE.WebGLRenderer();
  const kWindowWidth = 800;
  const kWindowHeight = 600;
  renderer.setSize(kWindowWidth, kWindowHeight);
  container = document.getElementById("container");
  container.appendChild(renderer.domElement);

  var scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(45, kWindowWidth/ kWindowHeight, 1, 1000);

  var geometry = new THREE.BoxGeometry(1,1,1);
  var material = new THREE.MeshPhongMaterial({color: 0x00ffff});
  var box = new THREE.Mesh(geometry, material);
  box.position.z = -5;
  scene.add(box);

  var sphere_geometry = new THREE.SphereGeometry(0.1,32,32);
  var sphere = new THREE.Mesh(sphere_geometry, material);
  sphere.position.z = -5;
  scene.add(sphere);

  var light = new THREE.DirectionalLight(0xffffff);
  scene.add(light);
  light.position.set(1,1,1);
  onWindowResize();

  var cnt = 0;
  var update = function(){
    requestAnimationFrame(update);
    box.rotation.x += 0.01;
    box.rotation.y += 0.01;

    sphere.position.x = 1.0 * Math.cos(cnt / 180 * Math.PI);
    sphere.position.y = 1.0 * Math.sin(cnt / 180 * Math.PI);

    light.position.x = 1.0 * Math.cos(cnt*2 / 180 * Math.PI);
    light.position.y = 1.0 * Math.sin(cnt*2 / 180 * Math.PI);

    cnt++;
    renderer.render(scene,camera);
  }

  update();
}

// full screen: reference: http://www.inazumatv.com/contents/archives/8484
var MIN_WIDTH = 1280, MIN_HEIGHT = 640;
filterWindowSize = function (size){
    var w = size.width, h = size.height;
    return {
        width: w <  MIN_WIDTH ? MIN_WIDTH : w,
        height: h < MIN_HEIGHT ? MIN_HEIGHT: h
    };
};

getWindowSize = function () {
    return {
        width: window.innerWidth,
        height: window.innerHeight
    };
};

onWindowResize = function()
{
  var size = filterWindowSize(getWindowSize());
  console.log(size);

  container.style.cssText = "width: " + size.width +"px; height: " + size.height + "px;";
  renderer.setSize(size.width, size.height);

  camera.aspect = size.width / size.height;
  camera.updateProjectionMatrix();
}

window.addEventListener('DOMContentLoaded', init);
window.addEventListener('resize', onWindowResize);
