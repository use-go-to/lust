document.addEventListener('DOMContentLoaded', () => {
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    const initialPrices = document.querySelectorAll('.initial-price');
    const prices = document.querySelectorAll('.price span[id^="price"]');
    let preorders = 0;
    const totalPreorders = 100;
    const milestones = [20, 40, 60, 80, 100];
    const initialPrice = 35;
    const priceReduction = 8.572 / 100;

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
    }

    function updatePrices() {
        let reduction = Math.floor(preorders / 20) * priceReduction;
        let newPrice = initialPrice * (1 - reduction);

        if (reduction > 0) {
            initialPrices.forEach(priceElement => {
                priceElement.classList.add('hidden');
            });
            prices.forEach(priceElement => {
                priceElement.textContent = `${newPrice.toFixed(2)}€`;
            });
        } else {
            initialPrices.forEach(priceElement => {
                priceElement.classList.remove('hidden');
            });
            prices.forEach(priceElement => {
                priceElement.textContent = ``;
            });
        }
    }
});
