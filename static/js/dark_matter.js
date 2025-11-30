(function() {
    'use strict';
    
    let darkMatterData = null;
    
    async function loadData() {
        try {
            const response = await fetch('/api/dark-matter-data');
            if (!response.ok) {
                throw new Error('Failed to load dark matter data');
            }
            darkMatterData = await response.json();
            
            updateStats();
        } catch (error) {
            // Silently fail - page will show default values
        }
    }
    
    function updateStats() {
        if (!darkMatterData) return;
        
        const zeroCount = darkMatterData.zero_count || 26;
        const knownZeros = darkMatterData.known_zeros || 20;
        const proximity = darkMatterData.proximity_to_identity_regions || { close: 10, medium: 6, far: 4 };
        const probability = darkMatterData.statistical_significance?.probability_exactly_26 || '~10⁻³²';
        
        const zeroCountEl = document.getElementById('zero-count');
        const knownZerosEl = document.getElementById('known-zeros');
        const totalZerosEl = document.getElementById('total-zeros');
        const controlNeuronsEl = document.getElementById('control-neurons');
        const proximityCloseEl = document.getElementById('proximity-close');
        const proximityMediumEl = document.getElementById('proximity-medium');
        const proximityFarEl = document.getElementById('proximity-far');
        const probabilityEl = document.getElementById('probability');
        const anomalyProbabilityEl = document.getElementById('anomaly-probability');
        
        if (zeroCountEl) zeroCountEl.textContent = zeroCount;
        if (knownZerosEl) knownZerosEl.textContent = knownZeros;
        if (totalZerosEl) totalZerosEl.textContent = zeroCount;
        if (controlNeuronsEl) controlNeuronsEl.textContent = zeroCount;
        if (proximityCloseEl) proximityCloseEl.textContent = proximity.close || 10;
        if (proximityMediumEl) proximityMediumEl.textContent = proximity.medium || 6;
        if (proximityFarEl) proximityFarEl.textContent = proximity.far || 4;
        if (probabilityEl) probabilityEl.textContent = probability;
        if (anomalyProbabilityEl) anomalyProbabilityEl.textContent = probability;
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadData);
    } else {
        loadData();
    }
})();

