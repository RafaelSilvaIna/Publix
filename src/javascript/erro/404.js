let scene, camera, renderer, stars, astronaut;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('scene-container').appendChild(renderer.domElement);

    // Adiciona estrelas
    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({color: 0xFFFFFF, size: 0.1});

    const starsVertices = [];
    for (let i = 0; i < 10000; i++) {
        const x = (Math.random() - 0.5) * 2000;
        const y = (Math.random() - 0.5) * 2000;
        const z = -Math.random() * 2000;
        starsVertices.push(x, y, z);
    }

    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
    stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    // Adiciona astronauta
    const loader = new THREE.GLTFLoader();
    loader.load('https://threejs.org/examples/models/gltf/Astronaut.glb', (gltf) => {
        astronaut = gltf.scene;
        astronaut.scale.set(0.5, 0.5, 0.5);
        astronaut.position.set(0, 0, -5);
        scene.add(astronaut);
    });

    camera.position.z = 5;

    animate();
}

function animate() {
    requestAnimationFrame(animate);

    stars.rotation.y += 0.0002;
    stars.rotation.x += 0.0001;

    if (astronaut) {
        astronaut.rotation.y += 0.005;
    }

    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);

init();

