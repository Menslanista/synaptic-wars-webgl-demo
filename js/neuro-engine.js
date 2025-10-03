// Neuroplasticity Engine - Enhanced Version
class NeuroEngine {
    constructor() {
        this.bdnf = 0.23;
        this.synapticStrength = 1.0;
        this.achievements = [];
        this.init();
    }

    static init() {
        // Static method for backward compatibility
        if (!window.neuroEngine) {
            window.neuroEngine = new NeuroEngine();
        }
        this.updateUI();
        return window.neuroEngine;
    }

    static rewardBDNF(amount) {
        // Static method for backward compatibility
        if (!window.neuroEngine) {
            this.init();
        }
        window.neuroEngine.rewardCustom(amount);
        return window.neuroEngine;
    }

    reward(action) {
        switch(action) {
            case 'dendritic_lightning':
                this.bdnf += 0.05;
                this.synapticStrength += 0.1;
                break;
            case 'eeg_focus':
                this.bdnf += 0.01;
                break;
            case 'puzzle_solve':
                this.bdnf += 0.08;
                this.synapticStrength += 0.05;
                break;
            default:
                // Default reward for unknown actions
                this.bdnf += 0.02;
                break;
        }
        
        this.normalizeValues();
        this.checkAchievements();
        this.updateUI();
        return this;
    }

    rewardCustom(amount) {
        // Custom reward with specific amount (for backward compatibility)
        this.bdnf = Math.min(Math.max(this.bdnf + amount, 0), 1.0);
        this.synapticStrength = Math.min(Math.max(this.synapticStrength + (amount * 0.5), 0), 2.0);
        this.normalizeValues();
        this.checkAchievements();
        this.updateUI();
        return this;
    }

    normalizeValues() {
        // Ensure values stay within bounds
        this.bdnf = Math.min(Math.max(this.bdnf, 0), 1.0);
        this.synapticStrength = Math.min(Math.max(this.synapticStrength, 0), 2.0);
    }

    checkAchievements() {
        // BDNF-related achievements
        if (this.bdnf >= 0.3 && !this.achievements.includes('bdnf_beginner')) {
            this.unlockAchievement('BDNF Beginner', 'Your brain is starting to produce growth factors!', 'bdnf_beginner');
        }
        if (this.bdnf >= 0.5 && !this.achievements.includes('bdnf_master')) {
            this.unlockAchievement('BDNF Master', 'Your brain is producing optimal growth factors!', 'bdnf_master');
        }
        if (this.bdnf >= 0.8 && !this.achievements.includes('bdnf_expert')) {
            this.unlockAchievement('BDNF Expert', 'Exceptional neuroplasticity activation!', 'bdnf_expert');
        }

        // Synaptic strength achievements
        if (this.synapticStrength >= 1.2 && !this.achievements.includes('synaptic_learner')) {
            this.unlockAchievement('Synaptic Learner', 'Neural connections are getting stronger!', 'synaptic_learner');
        }
        if (this.synapticStrength >= 1.5 && !this.achievements.includes('synaptic_champion')) {
            this.unlockAchievement('Synaptic Champion', 'Neural connections are strengthening rapidly!', 'synaptic_champion');
        }
        if (this.synapticStrength >= 1.8 && !this.achievements.includes('synaptic_master')) {
            this.unlockAchievement('Synaptic Master', 'Your neural network is highly optimized!', 'synaptic_master');
        }

        // Combined achievements
        if (this.bdnf >= 0.6 && this.synapticStrength >= 1.4 && !this.achievements.includes('neuro_balanced')) {
            this.unlockAchievement('Neuro-Balanced', 'Perfect balance of growth and strength!', 'neuro_balanced');
        }
    }

    unlockAchievement(title, description, id) {
        this.achievements.push(id);
        this.showAchievement(title, description);
        console.log(`🏆 Achievement Unlocked: ${title} - ${description}`);
        
        // Optional: Save to localStorage
        this.saveProgress();
    }

    static showAchievement(title, description) {
        // Static method for backward compatibility
        if (!window.neuroEngine) {
            this.init();
        }
        window.neuroEngine.unlockAchievement(title, description, title.toLowerCase().replace(' ', '_'));
    }

    showAchievement(title, description) {
        const achievement = document.createElement('div');
        achievement.style.cssText = `
            position: fixed; 
            top: 20px; 
            right: 20px;
            background: linear-gradient(135deg, #FFD700, #FF8C00);
            color: black; 
            padding: 15px; 
            border-radius: 10px;
            z-index: 1000; 
            animation: neuroSlideIn 0.5s ease;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            border: 2px solid #FF8C00;
            max-width: 300px;
            font-family: Arial, sans-serif;
        `;
        achievement.innerHTML = `
            <strong>🏆 ${title}</strong>
            <div style="margin-top: 5px; font-size: 0.9em;">${description}</div>
            <div style="margin-top: 8px; font-size: 0.8em; color: #666;">Achievement ${this.achievements.length}/8</div>
        `;
        document.body.appendChild(achievement);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            achievement.style.animation = 'neuroSlideOut 0.5s ease';
            setTimeout(() => {
                if (achievement.parentNode) {
                    achievement.parentNode.removeChild(achievement);
                }
            }, 500);
        }, 5000);
    }

    static updateUI() {
        // Static method for backward compatibility
        if (!window.neuroEngine) {
            this.init();
        }
        window.neuroEngine.updateUI();
    }

    updateUI() {
        const bdnfEl = document.getElementById('bdnf-value');
        const strengthEl = document.getElementById('strength-value');
        if (bdnfEl) bdnfEl.textContent = this.bdnf.toFixed(2);
        if (strengthEl) strengthEl.textContent = this.synapticStrength.toFixed(2);

        const bdnfBar = document.getElementById('bdnf-bar');
        const strengthBar = document.getElementById('strength-bar');
        if (bdnfBar) bdnfBar.style.width = (this.bdnf * 100) + '%';
        if (strengthBar) strengthBar.style.width = (this.synapticStrength * 50) + '%';

        // Update achievement progress if element exists
        const achievementProgress = document.getElementById('achievement-progress');
        if (achievementProgress) {
            achievementProgress.textContent = `${this.achievements.length}/8 Achievements`;
        }
    }

    getStats() {
        return {
            bdnf: this.bdnf,
            synapticStrength: this.synapticStrength,
            achievements: this.achievements,
            achievementsCount: this.achievements.length,
            totalAchievements: 8
        };
    }

    reset() {
        this.bdnf = 0.23;
        this.synapticStrength = 1.0;
        this.achievements = [];
        this.updateUI();
        this.saveProgress();
    }

    saveProgress() {
        if (typeof Storage !== 'undefined') {
            localStorage.setItem('neuroEngineProgress', JSON.stringify({
                bdnf: this.bdnf,
                synapticStrength: this.synapticStrength,
                achievements: this.achievements,
                timestamp: new Date().getTime()
            }));
        }
    }

    loadProgress() {
        if (typeof Storage !== 'undefined') {
            const saved = localStorage.getItem('neuroEngineProgress');
            if (saved) {
                try {
                    const progress = JSON.parse(saved);
                    this.bdnf = progress.bdnf || 0.23;
                    this.synapticStrength = progress.synapticStrength || 1.0;
                    this.achievements = progress.achievements || [];
                    this.updateUI();
                    console.log('Neuro progress loaded from localStorage');
                } catch (e) {
                    console.error('Error loading neuro progress:', e);
                }
            }
        }
    }

    // New method for advanced neuroplasticity calculations
    calculateNeuroplasticityIndex() {
        // A simple formula combining BDNF and synaptic strength
        return (this.bdnf * 0.6 + this.synapticStrength * 0.4).toFixed(2);
    }

    // Method to simulate different cognitive states
    simulateCognitiveState(state) {
        switch(state) {
            case 'focused':
                this.bdnf += 0.03;
                this.synapticStrength += 0.02;
                break;
            case 'relaxed':
                this.bdnf += 0.01;
                break;
            case 'learning':
                this.bdnf += 0.04;
                this.synapticStrength += 0.03;
                break;
            case 'creative':
                this.bdnf += 0.02;
                this.synapticStrength += 0.01;
                break;
        }
        this.normalizeValues();
        this.updateUI();
        return this;
    }
}

// Add CSS for animations
const neuroStyle = document.createElement('style');
neuroStyle.textContent = `
    @keyframes neuroSlideIn {
        from { 
            transform: translateX(100%); 
            opacity: 0;
        }
        to { 
            transform: translateX(0); 
            opacity: 1;
        }
    }
    
    @keyframes neuroSlideOut {
        from { 
            transform: translateX(0); 
            opacity: 1;
        }
        to { 
            transform: translateX(100%); 
            opacity: 0;
        }
    }
    
    .neuro-progress {
        margin: 10px 0;
        padding: 10px;
        background: rgba(138, 43, 226, 0.1);
        border-radius: 8px;
        border-left: 4px solid #8A2BE2;
    }
`;
document.head.appendChild(neuroStyle);

// Initialize global instance and maintain backward compatibility
window.NeuroEngine = NeuroEngine;

// Auto-initialize on load
document.addEventListener('DOMContentLoaded', function() {
    NeuroEngine.init();
    
    // Auto-load progress if available
    setTimeout(() => {
        if (window.neuroEngine) {
            window.neuroEngine.loadProgress();
        }
    }, 1000);
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NeuroEngine;
}
