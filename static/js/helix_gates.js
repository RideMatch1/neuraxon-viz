(function() {
    'use strict';
    
    let helixData = null;
    let resizeTimeout = null;
    
    async function loadData() {
        const chartId = 'rotation-chart';
        const container = document.getElementById(chartId);
        
        if (!container) return;
        
        try {
            const response = await fetch('/api/helix-data');
            if (!response.ok) {
                throw new Error('Failed to load helix gates data');
            }
            helixData = await response.json();
            
            updateStats();
            renderAll();
        } catch (error) {
            if (container) {
                container.innerHTML = '<p style="color: #ef4444; padding: 2rem; text-align: center;">Failed to load helix gates data. Please check your connection and try again.</p>';
            }
        }
    }
    
    function updateStats() {
        if (!helixData) return;
        
        const totalPatterns = helixData.total_patterns || helixData.total_rotation_patterns || 0;
        const rotationPatterns = helixData.total_rotation_patterns || totalPatterns || 0;
        const helixGroups = helixData.identity_helix_groups || 0;
        const topRotation = helixData.top_rotation_values && helixData.top_rotation_values.length > 0
            ? `${helixData.top_rotation_values[0].rotation} (${helixData.top_rotation_values[0].count} occurrences)`
            : '-';
        
        const totalPatternsEl = document.getElementById('total-patterns');
        const rotationPatternsEl = document.getElementById('rotation-patterns');
        const helixGroupsEl = document.getElementById('helix-groups');
        const topRotationEl = document.getElementById('top-rotation');
        
        if (totalPatternsEl) totalPatternsEl.textContent = totalPatterns.toLocaleString('en-US');
        if (rotationPatternsEl) rotationPatternsEl.textContent = rotationPatterns.toLocaleString('en-US');
        if (helixGroupsEl) helixGroupsEl.textContent = helixGroups.toLocaleString('en-US');
        if (topRotationEl) topRotationEl.textContent = topRotation;
    }
    
    function renderRotationChart() {
        if (!helixData || !helixData.top_rotation_values) return;
        
        const container = document.getElementById('rotation-chart');
        if (!container) return;
        
        container.innerHTML = '';
        
        const rotations = helixData.top_rotation_values.slice(0, 10);
        const rotationLabels = rotations.map(r => `Rot ${r.rotation}`);
        const counts = rotations.map(r => r.count);
        const maxCount = Math.max(...counts);
        
        const trace = {
            x: rotationLabels,
            y: counts,
            type: 'bar',
            marker: { 
                color: counts.map(c => {
                    const ratio = c / maxCount;
                    return `rgba(59, 130, 246, ${0.4 + ratio * 0.6})`;
                }),
                line: { color: '#2563eb', width: 1.5 },
                opacity: 0.9
            },
            text: counts.map(c => c.toString()),
            textposition: 'outside',
            textfont: { size: 12, color: '#1e293b' },
            hovertemplate: '<b>%{x}</b><br>Occurrences: %{y}<extra></extra>'
        };
        
        const layout = {
            xaxis: { 
                title: 'Rotation Value',
                tickangle: -45,
                showgrid: true,
                gridcolor: '#e2e8f0',
                gridwidth: 1
            },
            yaxis: { 
                title: 'Occurrences',
                showgrid: true,
                gridcolor: '#e2e8f0',
                gridwidth: 1
            },
            margin: { l: 60, r: 40, t: 20, b: 80 },
            height: 400,
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)',
            font: { family: 'Inter, sans-serif', size: 12, color: '#1e293b' },
            autosize: true
        };
        
        const config = {
            responsive: true,
            autosize: true,
            displayModeBar: true,
            modeBarButtonsToRemove: [],
            toImageButtonOptions: {
                format: 'png',
                filename: 'helix-rotations',
                height: 400,
                width: 800,
                scale: 2
            },
            doubleClick: 'reset'
        };
        
        Plotly.newPlot('rotation-chart', [trace], layout, config);
    }
    
    function handleResize() {
        if (resizeTimeout) {
            clearTimeout(resizeTimeout);
        }
        resizeTimeout = setTimeout(() => {
            const container = document.getElementById('rotation-chart');
            if (container && helixData) {
                Plotly.Plots.resize(container);
            }
        }, 150);
    }
    
    function renderAll() {
        renderRotationChart();
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            loadData();
            window.addEventListener('resize', handleResize, { passive: true });
        });
    } else {
        loadData();
        window.addEventListener('resize', handleResize, { passive: true });
    }
})();

