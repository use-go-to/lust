document.addEventListener('DOMContentLoaded', () => {
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    const initialPrices = document.querySelectorAll('.initial-price');
    const prices = document.querySelectorAll('.price span[id^="price"]');
    let preorders = 0;
    const totalPreorders = 100;
    const milestones = [20, 40, 60, 80, 100];
    const initialPrice = 35;
    const pricesAtMilestones = [32, 29, 26, 23, 20];

    document.querySelectorAll('.buy-button').forEach(button => {
        button.addEventListener('click', () => {
            preorders++;
            updateProgressBar();
            updatePrices();
        });
    });

    function updateProgressBar() {
        const progressPercentage = (preorders / totalPreorders) * 100;
        progressBar.style.width = progressPercentage + '%';
        progressText.textContent = `${preorders}/${totalPreorders} précommandes`;

        // Update milestone markers
        milestones.forEach((milestone, index) => {
            const marker = document.getElementById(`milestone-${index}`);
            if (preorders >= milestone) {
                marker.classList.add('reached');
            } else {
                marker.classList.remove('reached');
            }
        });
    }

    function updatePrices() {
        let reductionIndex = Math.floor(preorders / 20);
        let newPrice = initialPrice;

        if (reductionIndex > 0 && reductionIndex <= pricesAtMilestones.length) {
            newPrice = pricesAtMilestones[Math.min(reductionIndex - 1, pricesAtMilestones.length - 1)];
        }

        // Only show the initial price crossed out and in grey after reaching the first milestone
        initialPrices.forEach(priceElement => {
            if (reductionIndex > 0) {
                priceElement.classList.add('barré');
                priceElement.classList.remove('hidden');
                priceElement.textContent = `${initialPrice}€`;
            } else {
                priceElement.classList.remove('barré');
                priceElement.classList.add('hidden');
                priceElement.textContent = `${initialPrice}`;
            }
        });

        // Ensure price stays at 20€ after 100 preorders
        if (reductionIndex >= 5) {
            newPrice = 20;
        }

        prices.forEach(priceElement => {
            priceElement.textContent = `${newPrice}€`;
        });
    }
});
