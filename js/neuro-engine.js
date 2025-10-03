// Neuroplasticity Engine
class NeuroEngine {
    static init() {
        this.bdnf = 0.23;
        this.synapticStrength = 1.0;
        this.updateUI();
    }

    static rewardBDNF(amount) {
        this.bdnf = Math.min(Math.max(this.bdnf + amount, 0), 1.0);
        this.synapticStrength = Math.min(Math.max(this.synapticStrength + (amount * 0.5), 0), 2.0);
        this.updateUI();
        this.checkAchievements();
    }

    static updateUI() {
        const bdnfEl = document.getElementById('bdnf-value');
        const strengthEl = document.getElementById('strength-value');
        if (bdnfEl) bdnfEl.textContent = this.bdnf.toFixed(2);
        if (strengthEl) strengthEl.textContent = this.synapticStrength.toFixed(2);
        const bdnfBar = document.getElementById('bdnf-bar');
        const strengthBar = document.getElementById('strength-bar');
        if (bdnfBar) bdnfBar.style.width = (this.bdnf * 100) + '%';
        if (strengthBar) strengthBar.style.width = (this.synapticStrength * 50) + '%';
    }

    static checkAchievements() {
        if (this.bdnf >= 0.5) {
            this.showAchievement("BDNF Master", "Your brain is producing optimal growth factors!");
        }
        if (this.synapticStrength >= 1.5) {
            this.showAchievement("Synaptic Champion", "Neural connections are strengthening rapidly!");
        }
    }

    static showAchievement(title, description) {
        const achievement = document.createElement('div');
        achievement.style.cssText = `
            position: fixed; top: 20px; right: 20px;
            background: linear-gradient(135deg, #FFD700, #FF8C00);
            color: black; padding: 15px; border-radius: 10px;
            z-index: 1000; animation: slideIn 0.5s ease;
        `;
        achievement.innerHTML = `<strong>🏆 ${title}</strong><br>${description}`;
        document.body.appendChild(achievement);

        setTimeout(() => {
            achievement.remove();
        }, 5000);
    }
}

// Add CSS for animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); }
        to { transform: translateX(0); }
    }
`;
document.head.appendChild(style);
window.NeuroEngine = NeuroEngine;
