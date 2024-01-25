const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let cube;

const loader = new THREE.TextureLoader();

loader.load('metal003.png', texture => {
	texture.wrapS = THREE.RepeatWrapping;
	texture.wrapT = THREE.RepeatWrapping;
	texture.repeat.set(2, 2);

	const geometry = new THREE.BoxGeometry(2.4,2.4,2.4);
	const material = new THREE.MeshLambertMaterial( { map: texture } );
	cube = new THREE.Mesh(geometry, material);
	scene.add(cube);

	draw();
});

const light = new THREE.AmbientLight('rgb(255,255,255)'); // soft white light
scene.add(light);

const spotLight = new THREE.SpotLight('rgb(255,255,255)');
spotLight.position.set( 100, 1000, 1000 );
spotLight.castShadow = true;
scene.add(spotLight);

function draw() {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);

	requestAnimationFrame(draw);
}
