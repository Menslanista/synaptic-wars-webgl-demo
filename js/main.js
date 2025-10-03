// Main Three.js scene setup
let scene, camera, renderer, neuron;
let isEEGConnected = false;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth * 0.8, window.innerHeight * 0.6);
    renderer.setClearColor(0x1a1a2e);
    document.getElementById('game-canvas').appendChild(renderer.domElement);

    const neuronGeometry = new THREE.SphereGeometry(1, 32, 32);
    const neuronMaterial = new THREE.MeshBasicMaterial({ color: 0x8A2BE2, wireframe: true });
    neuron = new THREE.Mesh(neuronGeometry, neuronMaterial);
    scene.add(neuron);

    createTauTanglers(5);

    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0x00ff00, 1, 100);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    camera.position.z = 5;

    animate();
}

function createTauTanglers(count) {
    for (let i = 0; i < count; i++) {
        const geometry = new THREE.SphereGeometry(0.3, 16, 16);
        const material = new THREE.MeshBasicMaterial({ color: 0xff4444 });
        const tangler = new THREE.Mesh(geometry, material);
        tangler.position.x = (Math.random() - 0.5) * 8;
        tangler.position.y = (Math.random() - 0.5) * 8;
        tangler.position.z = (Math.random() - 0.5) * 8;
        scene.add(tangler);
        if (window.gameLoop) window.gameLoop.tauTanglers.push(tangler);
    }
}

function animate() {
    requestAnimationFrame(animate);
    if (neuron) {
        neuron.rotation.x += 0.01;
        neuron.rotation.y += 0.01;
    }
    if (window.gameLoop && window.gameLoop.tauTanglers) {
        window.gameLoop.tauTanglers.forEach(t => {
            t.rotation.x += 0.02;
            t.rotation.y += 0.02;
        });
    }
    renderer.render(scene, camera);
}

function activateDendriticLightning() {
    if (window.gameLoop && !window.gameLoop.isRunning) return;
    const flash = new THREE.PointLight(0x00ffff, 2, 10);
    flash.position.copy(neuron.position);
    scene.add(flash);

    if (window.gameLoop && window.gameLoop.tauTanglers.length > 0) {
        const removed = window.gameLoop.tauTanglers.pop();
        scene.remove(removed);
        window.gameLoop.score += 10;
    }

    if (window.NeuroEngine) NeuroEngine.rewardBDNF(0.05);
    setTimeout(() => scene.remove(flash), 200);
}

function simulateEEG() {
    isEEGConnected = !isEEGConnected;
    const status = document.getElementById('eeg-status');
    const button = document.getElementById('eeg-btn');

    if (isEEGConnected) {
        status.textContent = "EEG: Connected (Simulated) - Focus Detected!";
        status.style.background = "#1dd1a1";
        button.textContent = "🔗 Disconnect EEG";
        setInterval(() => {
            if (isEEGConnected && window.NeuroEngine) {
                NeuroEngine.rewardBDNF(0.01);
            }
        }, 2000);
    } else {
        status.textContent = "EEG: Not Connected";
        status.style.background = "#333";
        button.textContent = "🔗 Simulate EEG Connection";
    }
}

function startGame() {
    document.getElementById('loading-screen').style.display = 'none';
    document.getElementById('game-container').style.display = 'block';
    document.getElementById('instructions').style.display = 'none';
    init();
    if (window.NeuroEngine) window.NeuroEngine.init();
    if (window.gameLoop) window.gameLoop.start();
}

window.addEventListener('resize', () => {
    if (camera && renderer) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth * 0.8, window.innerHeight * 0.6);
    }
});

window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loading-screen').style.display = 'none';
        document.getElementById('game-container').style.display = 'block';
    }, 1000);
});
