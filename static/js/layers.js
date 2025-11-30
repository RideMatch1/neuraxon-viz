(function() {
    'use strict';
    
    let layerData = null;
    let resizeTimeout = null;
    
    async function loadData() {
        const chartId = 'layer-comparison-chart';
        const container = document.getElementById(chartId);
        
        if (!container) return;
        
        try {
            const response = await fetch('/api/layers-data');
            if (!response.ok) {
                throw new Error('Failed to load layer data');
            }
            layerData = await response.json();
            
            renderAll();
        } catch (error) {
            if (container) {
                container.innerHTML = '<p style="color: #ef4444; padding: 2rem; text-align: center;">Failed to load layer data. Please check your connection and try again.</p>';
            }
        }
    }
    
    function renderLayerComparison() {
        if (!layerData || !layerData.layers) return;
        
        const container = document.getElementById('layer-comparison-chart');
        if (!container) return;
        
        container.innerHTML = '';
        
        const layers = layerData.layers;
        const layerNames = [];
        const identities = [];
        const verified = [];
        const rates = [];
        
        Object.keys(layers).forEach(key => {
            const layer = layers[key];
            layerNames.push(layer.name);
            identities.push(layer.identities || layer.identities_tested || 0);
            verified.push(layer.onchain_verified || 0);
            rates.push(layer.onchain_rate || 0);
        });
        
        const trace1 = {
            x: layerNames,
            y: identities,
            type: 'bar',
            name: 'Total Identities',
            marker: { color: '#3b82f6' }
        };
        
        const trace2 = {
            x: layerNames,
            y: verified,
            type: 'bar',
            name: 'On-Chain Verified',
            marker: { color: '#10b981' }
        };
        
        const trace3 = {
            x: layerNames,
            y: rates,
            type: 'scatter',
            mode: 'lines+markers',
            name: 'Verification Rate (%)',
            yaxis: 'y2',
            line: { color: '#3b82f6', width: 3 },
            marker: { size: 10 }
        };
        
        const layout = {
            xaxis: { title: 'Layer' },
            yaxis: { 
                title: 'Count',
                side: 'left'
            },
            yaxis2: {
                title: 'Verification Rate (%)',
                overlaying: 'y',
                side: 'right',
                range: [0, 100]
            },
            margin: { l: 60, r: 60, t: 20, b: 50 },
            height: 500,
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)',
            font: { family: 'Inter, sans-serif', size: 12, color: '#1e293b' },
            barmode: 'group',
            legend: { x: 0.7, y: 0.95 },
            autosize: true
        };
        
        const config = {
            responsive: true,
            autosize: true,
            displayModeBar: true,
            modeBarButtonsToRemove: [],
            toImageButtonOptions: {
                format: 'png',
                filename: 'layer-comparison',
                height: 500,
                width: 800,
                scale: 2
            },
            doubleClick: 'reset'
        };
        
        Plotly.newPlot('layer-comparison-chart', [trace1, trace2, trace3], layout, config);
    }
    
    function handleResize() {
        if (resizeTimeout) {
            clearTimeout(resizeTimeout);
        }
        resizeTimeout = setTimeout(() => {
            const container = document.getElementById('layer-comparison-chart');
            if (container && layerData) {
                Plotly.Plots.resize(container);
            }
        }, 150);
    }
    
    function renderAll() {
        renderLayerComparison();
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

