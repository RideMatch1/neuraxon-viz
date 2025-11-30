(function() {
    'use strict';
    
    let discrepancyData = null;
    
    async function loadData() {
        try {
            const response = await fetch('/api/discrepancy-data');
            if (!response.ok) {
                throw new Error('Failed to load discrepancy data');
            }
            discrepancyData = await response.json();
            renderAll();
        } catch (error) {
            const container = document.getElementById('position-differences-chart');
            if (container) {
                container.innerHTML = '<p style="color: #ef4444; padding: 2rem; text-align: center;">Failed to load discrepancy data. Please check your connection and try again.</p>';
            }
        }
    }
    
    function renderPositionDifferences() {
        if (!discrepancyData || !discrepancyData.position_differences) return;
        
        const container = document.getElementById('position-differences-chart');
        if (!container) return;
        
        container.innerHTML = '';
        
        const positions = discrepancyData.position_differences;
        const posNumbers = positions.map(p => p.position);
        const diffCounts = positions.map(p => p.difference_count);
        const percentages = positions.map(p => p.percentage);
        
        const trace1 = {
            x: posNumbers,
            y: diffCounts,
            type: 'scatter',
            mode: 'lines+markers',
            name: 'Difference Count',
            line: { color: '#3b82f6', width: 2 },
            marker: { size: 4, color: '#3b82f6' },
            hovertemplate: '<b>Position %{x}</b><br>Differences: %{y:,.0f}<extra></extra>',
            hoverlabel: {
                bgcolor: '#ffffff',
                bordercolor: '#3b82f6',
                font: { size: 12, color: '#1e293b' }
            }
        };
        
        const trace2 = {
            x: posNumbers,
            y: percentages,
            type: 'scatter',
            mode: 'lines',
            name: 'Percentage',
            yaxis: 'y2',
            line: { color: '#2563eb', width: 2, dash: 'dash' },
            visible: false,
            hovertemplate: '<b>Position %{x}</b><br>Percentage: %{y:.2f}%<extra></extra>',
            hoverlabel: {
                bgcolor: '#ffffff',
                bordercolor: '#2563eb',
                font: { size: 12, color: '#1e293b' }
            }
        };
        
        const layout = {
            xaxis: { 
                title: { text: 'Position (0-59)', font: { size: 13, color: '#334155' } },
                tickfont: { size: 11, color: '#64748b' },
                gridcolor: '#e2e8f0',
                gridwidth: 1
            },
            yaxis: { 
                title: { text: 'Difference Count', font: { size: 13, color: '#334155' } },
                side: 'left',
                tickfont: { size: 11, color: '#64748b' },
                gridcolor: '#e2e8f0',
                gridwidth: 1
            },
            yaxis2: {
                title: { text: 'Percentage (%)', font: { size: 13, color: '#334155' } },
                overlaying: 'y',
                side: 'right',
                tickfont: { size: 11, color: '#64748b' }
            },
            margin: { l: 70, r: 70, t: 80, b: 60 },
            autosize: true,
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)',
            font: { family: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif', size: 12, color: '#1e293b' },
            hovermode: 'closest',
            legend: { 
                x: 0.7, 
                y: 0.95,
                bgcolor: 'rgba(255,255,255,0.8)',
                bordercolor: '#e2e8f0',
                borderwidth: 1
            },
            updatemenus: [{
                buttons: [
                    {
                        args: [{visible: [true, false]}],
                        label: 'Count',
                        method: 'update'
                    },
                    {
                        args: [{visible: [false, true]}],
                        label: 'Percentage',
                        method: 'update'
                    },
                    {
                        args: [{visible: [true, true]}],
                        label: 'Both',
                        method: 'update'
                    }
                ],
                direction: 'down',
                showactive: true,
                x: 0.1,
                xanchor: 'left',
                y: 1.15,
                yanchor: 'top',
                bgcolor: 'rgba(255,255,255,0.9)',
                bordercolor: '#e2e8f0',
                borderwidth: 1
            }]
        };
        
        const config = {
            responsive: true,
            displayModeBar: true,
            modeBarButtonsToRemove: ['lasso2d', 'select2d'],
            displaylogo: false,
            toImageButtonOptions: { format: 'png', filename: 'position-differences', height: 500, width: 900, scale: 2 },
            doubleClick: 'reset',
            autosizable: true
        };
        
        Plotly.newPlot(container, [trace1, trace2], layout, config);
        
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
        renderPositionDifferences();
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadData);
    } else {
        loadData();
    }
})();

