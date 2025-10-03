/* GameLoop: mechanics for Phase 1 */
class GameLoop {
    constructor() {
        this.isRunning = false;
        this.score = 0;
        this.tauTanglers = [];
        this.gameTime = 0;
    }

    start() {
        this.isRunning = true;
        this.gameTime = 0;
        this.score = 0;
        this.tauTanglers = [];
        this.spawnTauTanglers(6);
        this.updateGameStats();
        this.loop();
    }

    spawnTauTanglers(count) {
        for (let i = 0; i < count; i++) this.createTauTangler();
    }

    createTauTangler() {
        const geometry = new THREE.SphereGeometry(0.25 + Math.random() * 0.15, 12, 12);
        const material = new THREE.MeshBasicMaterial({ color: 0xff4444 });
        const tangler = new THREE.Mesh(geometry, material);
        const radius = 3 + Math.random() * 4;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        tangler.position.x = radius * Math.sin(phi) * Math.cos(theta);
        tangler.position.y = radius * Math.sin(phi) * Math.sin(theta);
        tangler.position.z = radius * Math.cos(phi);
        tangler.userData = { speed: 0.01 + Math.random() * 0.02, pulsePhase: Math.random() * Math.PI * 2 };
        scene.add(tangler);
        this.tauTanglers.push(tangler);
    }

    loop() {
        if (!this.isRunning) return;
        this.gameTime += 0.016;
        this.updateTauTanglers();
        this.updateGameStats();
        if (this.gameTime % 10 < 0.016 && this.tauTanglers.length < 12) this.createTauTangler();
        requestAnimationFrame(() => this.loop());
    }

    updateTauTanglers() {
        this.tauTanglers.forEach((tangler, index) => {
            if (!tangler.userData) return;
            const scale = 0.8 + Math.sin(this.gameTime * 3 + tangler.userData.pulsePhase) * 0.2;
            tangler.scale.setScalar(scale);
            const directionToNeuron = new THREE.Vector3().subVectors(neuron.position, tangler.position).normalize();
            tangler.position.addScaledVector(directionToNeuron, tangler.userData.speed);
            tangler.rotation.x += 0.03;
            tangler.rotation.y += 0.02;
            if (tangler.position.distanceTo(neuron.position) < 1.5) {
                this.tauTanglerReachedNeuron(tangler, index);
            }
        });
    }

    tauTanglerReachedNeuron(tangler, index) {
        const oldColor = renderer.getClearColor();
        renderer.setClearColor(0xff0000, 0.3);
        setTimeout(() => renderer.setClearColor(oldColor), 100);
        NeuroEngine.rewardBDNF(-0.02);
        scene.remove(tangler);
        this.tauTanglers.splice(index, 1);
        this.createTauTangler();
    }

    removeTauTangler(tangler) {
        const index = this.tauTanglers.indexOf(tangler);
        if (index > -1) {
            scene.remove(tangler);
            this.tauTanglers.splice(index, 1);
            this.score += 10;
            NeuroEngine.rewardBDNF(0.03);
        }
    }

    updateGameStats() {
        const scoreEl = document.getElementById('score');
        const timeEl = document.getElementById('game-time');
        const remainingEl = document.getElementById('tanglers-remaining');
        if (scoreEl) scoreEl.textContent = this.score;
        if (timeEl) timeEl.textContent = Math.floor(this.gameTime);
        if (remainingEl) remainingEl.textContent = this.tauTanglers.length;
    }
}
const gameLoop = new GameLoop();
window.gameLoop = gameLoop;
