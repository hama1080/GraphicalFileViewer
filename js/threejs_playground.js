var init = function(){
  var renderer = new THREE.WebGLRenderer();
  const kWindowWidth = 800;
  const kWindowHeight = 600;
  renderer.setSize(kWindowWidth, kWindowHeight);
  document.body.appendChild(renderer.domElement);

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(45, kWindowWidth/ kWindowHeight, 1, 1000);

  var geometry = new THREE.BoxGeometry(1,1,1);
  var material = new THREE.MeshPhongMaterial({color: 0x00ffff});
  var box = new THREE.Mesh(geometry, material);
  box.position.z = -5;
  scene.add(box);

  var light = new THREE.DirectionalLight(0xffffff);
  scene.add(light);
  light.position.set(1,1,1);

  var update = function(){
    requestAnimationFrame(update);
    box.rotation.x += 0.01;
    box.rotation.y += 0.01;
    renderer.render(scene,camera);
  }

  update();
}

window.addEventListener('DOMContentLoaded', init);
