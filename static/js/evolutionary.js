(function() {
    'use strict';
    
    let evolutionaryData = null;
    
    async function loadData() {
        try {
            const response = await fetch('/api/evolutionary-data');
            if (!response.ok) {
                throw new Error('Failed to load evolutionary data');
            }
            evolutionaryData = await response.json();
            
            updateStats();
        } catch (error) {
            // Silently fail - page will show default values
        }
    }
    
    function updateStats() {
        if (!evolutionaryData) return;
        
        // Pattern frequency
        const patterns = evolutionaryData.repeating_patterns || [];
        const patternMap = {};
        patterns.forEach(p => {
            patternMap[p.pattern] = p.count;
        });
        
        const patternAaEl = document.getElementById('pattern-aa');
        const patternCcEl = document.getElementById('pattern-cc');
        const patternXxEl = document.getElementById('pattern-xx');
        const patternMmEl = document.getElementById('pattern-mm');
        const patternZzEl = document.getElementById('pattern-zz');
        
        if (patternAaEl) patternAaEl.textContent = (patternMap['aa'] || 13090).toLocaleString('en-US');
        if (patternCcEl) patternCcEl.textContent = (patternMap['cc'] || 10245).toLocaleString('en-US');
        if (patternXxEl) patternXxEl.textContent = (patternMap['xx'] || 10073).toLocaleString('en-US');
        if (patternMmEl) patternMmEl.textContent = (patternMap['mm'] || 9522).toLocaleString('en-US');
        if (patternZzEl) patternZzEl.textContent = (patternMap['zz'] || 9353).toLocaleString('en-US');
        
        // Selection pressure
        const entropy = evolutionaryData.selection_pressure?.entropy || 4.67;
        const totalPatterns = evolutionaryData.fitness_traces?.total_repeating_patterns || 199855;
        
        const entropyEl = document.getElementById('entropy');
        const totalPatternsEl = document.getElementById('total-patterns');
        
        if (entropyEl) entropyEl.textContent = entropy.toFixed(2);
        if (totalPatternsEl) totalPatternsEl.textContent = totalPatterns.toLocaleString('en-US');
        
        // Character distribution
        const chars = evolutionaryData.character_distribution || {};
        
        const charAEl = document.getElementById('char-a');
        const charMEl = document.getElementById('char-m');
        const charQEl = document.getElementById('char-q');
        const charCEl = document.getElementById('char-c');
        const charEEl = document.getElementById('char-e');
        
        if (charAEl) charAEl.textContent = (chars.a || 69991).toLocaleString('en-US');
        if (charMEl) charMEl.textContent = (chars.m || 66483).toLocaleString('en-US');
        if (charQEl) charQEl.textContent = (chars.q || 62757).toLocaleString('en-US');
        if (charCEl) charCEl.textContent = (chars.c || 61822).toLocaleString('en-US');
        if (charEEl) charEEl.textContent = (chars.e || 61009).toLocaleString('en-US');
        
        // Convergence
        const convergence = evolutionaryData.convergence || {};
        const totalClusters = convergence.total_clusters || 23383;
        const maxCluster = convergence.max_cluster_size || 3;
        const convergenceRatio = convergence.convergence_ratio || 0.0001;
        
        const totalClustersEl = document.getElementById('total-clusters');
        const maxClusterEl = document.getElementById('max-cluster');
        const convergenceRatioEl = document.getElementById('convergence-ratio');
        
        if (totalClustersEl) totalClustersEl.textContent = totalClusters.toLocaleString('en-US');
        if (maxClusterEl) maxClusterEl.textContent = maxCluster;
        if (convergenceRatioEl) convergenceRatioEl.textContent = convergenceRatio.toFixed(4);
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadData);
    } else {
        loadData();
    }
})();

