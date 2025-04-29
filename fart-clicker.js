document.addEventListener('DOMContentLoaded', () => {
    const fartButton = document.getElementById('fart-button');
    const fartAnimation = document.getElementById('fart-animation');
    const fartSound = document.getElementById('fart-sound');
    const fartCurrencyDisplay = document.getElementById('fart-currency');
    const fcPerSecondDisplay = document.getElementById('fc-per-second');
    const upgradesContainer = document.getElementById('upgrades');
    const achievementsContainer = document.getElementById('achievements-container');

    let fartCurrency = parseInt(localStorage.getItem('fartCurrency')) || 0;
    let fcPerClick = 1;
    let fcPerSecond = 0;
    let showAchievementPopups = localStorage.getItem('showAchievementPopups') !== 'false';

    // Upgrades
    const upgrades = [
        { name: 'Extra Butt', baseCost: 15, cost: 15, fcPerSecond: 0.1, owned: 0 },
        { name: 'Fart Factory', baseCost: 100, cost: 100, fcPerSecond: 1, owned: 0 },
        { name: 'Gas Farm', baseCost: 1100, cost: 1100, fcPerSecond: 8, owned: 0 },
        { name: 'Wind Mine', baseCost: 12000, cost: 12000, fcPerSecond: 47, owned: 0 },
    ];

    // Load saved upgrades
    const savedUpgrades = JSON.parse(localStorage.getItem('upgrades')) || {};
    upgrades.forEach(upgrade => {
        if (savedUpgrades[upgrade.name]) {
            upgrade.owned = savedUpgrades[upgrade.name].owned;
            upgrade.cost = savedUpgrades[upgrade.name].cost;
            fcPerSecond += upgrade.fcPerSecond * upgrade.owned;
        }
    });

    // Achievements
    const achievements = [
        { name: 'Fart Novice', threshold: 1, unlocked: false },
        { name: 'Toot Pro', threshold: 1000, unlocked: false },
        { name: 'Gas Master', threshold: 1000000, unlocked: false },
    ];

    // Load saved achievements
    const savedAchievements = JSON.parse(localStorage.getItem('achievements')) || {};
    achievements.forEach(achievement => {
        if (savedAchievements[achievement.name]) {
            achievement.unlocked = savedAchievements[achievement.name].unlocked;
        }
    });

    // Update displays
    function updateDisplays() {
        fartCurrencyDisplay.textContent = Math.floor(fartCurrency).toLocaleString();
        fcPerSecondDisplay.textContent = fcPerSecond.toFixed(1);
        localStorage.setItem('fartCurrency', fartCurrency);
    }

    // Render upgrades
    function renderUpgrades() {
        upgradesContainer.innerHTML = '';
        upgrades.forEach(upgrade => {
            const upgradeDiv = document.createElement('div');
            upgradeDiv.classList.add('upgrade-item', 'flex', 'justify-between', 'items-center');
            upgradeDiv.innerHTML = `
                <div>
                    <span class="font-bold">${upgrade.name}</span> (${upgrade.owned})<br>
                    ${upgrade.fcPerSecond} FC/s - Cost: ${Math.floor(upgrade.cost).toLocaleString()} FC
                </div>
                <button class="bg-gray-700 text-white px-2 py-1 rounded hover:bg-gray-600">
                    Buy
                </button>
            `;
            const buyButton = upgradeDiv.querySelector('button');
            buyButton.disabled = fartCurrency < upgrade.cost;
            buyButton.addEventListener('click', () => {
                if (fartCurrency >= upgrade.cost) {
                    fartCurrency -= upgrade.cost;
                    upgrade.owned += 1;
                    fcPerSecond += upgrade.fcPerSecond;
                    upgrade.cost = upgrade.baseCost * Math.pow(1.1, upgrade.owned);
                    const saved = JSON.parse(localStorage.getItem('upgrades')) || {};
                    saved[upgrade.name] = { owned: upgrade.owned, cost: upgrade.cost };
                    localStorage.setItem('upgrades', JSON.stringify(saved));
                    renderUpgrades();
                    updateDisplays();
                }
            });
            upgradesContainer.appendChild(upgradeDiv);
        });
    }

    // Check and show achievements
    function checkAchievements() {
        achievements.forEach(achievement => {
            if (!achievement.unlocked && fartCurrency >= achievement.threshold) {
                achievement.unlocked = true;
                const saved = JSON.parse(localStorage.getItem('achievements')) || {};
                saved[achievement.name] = { unlocked: true };
                localStorage.setItem('achievements', JSON.stringify(saved));
                if (showAchievementPopups) {
                    const popup = document.createElement('div');
                    popup.classList.add('achievement-popup');
                    popup.innerHTML = `
                        <div class="font-bold">Achievement Unlocked</div>
                        <div>${achievement.name}</div>
                        <label class="mt-2 flex items-center text-sm">
                            <input type="checkbox" class="mr-1"> Don't show this again
                        </label>
                    `;
                    const checkbox = popup.querySelector('input');
                    checkbox.addEventListener('change', () => {
                        showAchievementPopups = !checkbox.checked;
                        localStorage.setItem('showAchievementPopups', showAchievementPopups);
                    });
                    const closeButton = document.createElement('button');
                    closeButton.textContent = '✕';
                    closeButton.classList.add('absolute', 'top-1', 'right-1', 'text-gray-400', 'hover:text-white');
                    closeButton.addEventListener('click', () => popup.remove());
                    popup.appendChild(closeButton);
                    achievementsContainer.appendChild(popup);
                    setTimeout(() => popup.remove(), 5000);
                }
            }
        });
    }

    // Fart button click
    fartButton.addEventListener('click', () => {
        fartCurrency += fcPerClick;
        // Play fart sound
        fartSound.currentTime = 0;
        fartSound.play().catch(err => console.log('Audio play failed:', err));
        // Show fart animation
        fartAnimation.classList.remove('hidden');
        fartAnimation.classList.remove('fart-puff'); // Reset animation
        void fartAnimation.offsetWidth; // Trigger reflow to restart animation
        fartAnimation.classList.add('fart-puff');
        checkAchievements();
        updateDisplays();
    });

    // Auto-generate FC
    setInterval(() => {
        fartCurrency += fcPerSecond;
        checkAchievements();
        updateDisplays();
        renderUpgrades();
    }, 1000);

    // Initial render
    renderUpgrades();
    updateDisplays();
});