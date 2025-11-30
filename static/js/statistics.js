(function() {
    'use strict';
    
    let statsData = null;
    
    async function loadData() {
        try {
            const response = await fetch('/api/statistics-data');
            if (!response.ok) {
                throw new Error('Failed to load statistics data');
            }
            statsData = await response.json();
            renderAll();
        } catch (error) {
            const container = document.getElementById('baseline-comparison-chart');
            if (container) {
                container.innerHTML = '<p style="color: #ef4444; padding: 2rem; text-align: center;">Failed to load statistics data. Please check your connection and try again.</p>';
            }
        }
    }
    
    function renderBaselineComparison() {
        if (!statsData) return;
        
        const container = document.getElementById('baseline-comparison-chart');
        if (!container) return;
        
        container.innerHTML = '';
        
        const baselines = statsData.validation_results.baselines;
        const mlAccuracy = statsData.validation_results.ml_position27.test_accuracy;
        
        const methods = [
            { name: 'Random', accuracy: baselines.random },
            { name: 'Matrix (mod_4)', accuracy: baselines.matrix_mod4 },
            { name: 'Weighted Seed', accuracy: baselines.weighted_seed },
            { name: 'Weighted Top 10', accuracy: baselines.weighted_top10 },
            { name: 'ML Random Forest', accuracy: mlAccuracy }
        ];
        
        const trace = {
            x: methods.map(m => m.name),
            y: methods.map(m => m.accuracy),
            type: 'bar',
            marker: {
                color: ['#94a3b8', '#94a3b8', '#94a3b8', '#94a3b8', '#3b82f6'],
                line: { color: ['#64748b', '#64748b', '#64748b', '#64748b', '#2563eb'], width: 1 }
            },
            text: methods.map(m => m.accuracy.toFixed(2) + '%'),
            textposition: 'outside',
            textfont: { size: 11, color: '#1e293b' },
            hovertemplate: '<b>%{x}</b><br>Accuracy: %{y:.2f}%<extra></extra>',
            hoverlabel: {
                bgcolor: '#ffffff',
                bordercolor: '#3b82f6',
                font: { size: 12, color: '#1e293b' }
            }
        };
        
        const layout = {
            xaxis: { 
                title: { text: 'Method', font: { size: 13, color: '#334155' } },
                tickangle: -45,
                tickfont: { size: 11, color: '#64748b' },
                gridcolor: '#e2e8f0',
                gridwidth: 1
            },
            yaxis: { 
                title: { text: 'Accuracy (%)', font: { size: 13, color: '#334155' } },
                range: [0, Math.max(...methods.map(m => m.accuracy)) * 1.2],
                tickfont: { size: 11, color: '#64748b' },
                gridcolor: '#e2e8f0',
                gridwidth: 1
            },
            margin: { l: 70, r: 30, t: 30, b: 120 },
            autosize: true,
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)',
            font: { family: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif', size: 12, color: '#1e293b' },
            hovermode: 'closest'
        };
        
        const config = {
            responsive: true,
            displayModeBar: true,
            modeBarButtonsToRemove: ['lasso2d', 'select2d'],
            displaylogo: false,
            toImageButtonOptions: { format: 'png', filename: 'baseline-comparison', height: 300, width: 700, scale: 2 },
            doubleClick: 'reset',
            autosizable: true
        };
        
        Plotly.newPlot(container, [trace], layout, config);
        
        let resizeTimeout;
        const resizeHandler = function() {
            if (container.offsetWidth > 0) {
                Plotly.Plots.resize(container);
            }
        };
        const resizeListener = function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(resizeHandler, 150);
        };
        window.addEventListener('resize', resizeListener, { passive: true });
    }
    
    function renderAll() {
        renderBaselineComparison();
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadData);
    } else {
        loadData();
    }
})();

