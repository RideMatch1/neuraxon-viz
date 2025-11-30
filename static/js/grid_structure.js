(function() {
    'use strict';
    
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    let gridData = null;
    
    async function loadData() {
        const chartId = 'grid-heatmap';
        const listIds = ['column6-stats', 'hotspots-list'];
        
        try {
            const response = await fetch('/api/grid-data');
            if (!response.ok) {
                throw new Error('Failed to load grid structure data');
            }
            gridData = await response.json();
            renderAll();
        } catch (error) {
            const chartContainer = document.getElementById(chartId);
            if (chartContainer) {
                chartContainer.innerHTML = '<p style="color: #ef4444; padding: 2rem; text-align: center;">Failed to load grid data. Please check your connection and try again.</p>';
            }
            listIds.forEach(id => {
                const container = document.getElementById(id);
                if (container) {
                    container.innerHTML = '<p style="color: #ef4444;">Failed to load data. Please try again.</p>';
                }
            });
        }
    }
    
    function renderGridHeatmap() {
        if (!gridData || !gridData.grid_7x7) return;
        
        const container = document.getElementById('grid-heatmap');
        if (!container) return;
        
        container.innerHTML = '';
        
        const gridSize = 7;
        const z = [];
        const text = [];
        const customdata = [];
        
        for (let y = 0; y < gridSize; y++) {
            const row = [];
            const textRow = [];
            const dataRow = [];
            for (let x = 0; x < gridSize; x++) {
                const key = `${x},${y}`;
                const cell = gridData.grid_7x7[key] || {};
                const wordCount = cell.word_count || 0;
                row.push(wordCount);
                textRow.push(wordCount > 0 ? wordCount.toString() : '');
                dataRow.push({ x, y, wordCount, uniqueWords: cell.unique_words || 0 });
            }
            z.push(row);
            text.push(textRow);
            customdata.push(dataRow);
        }
        
        const trace = {
            z: z,
            text: text,
            customdata: customdata,
            type: 'heatmap',
            colorscale: [
                [0, 'rgba(239, 246, 255, 0.3)'],
                [0.2, 'rgba(191, 219, 254, 0.5)'],
                [0.4, 'rgba(147, 197, 253, 0.7)'],
                [0.6, 'rgba(96, 165, 250, 0.8)'],
                [0.8, 'rgba(59, 130, 246, 0.9)'],
                [1, 'rgba(37, 99, 235, 1)']
            ],
            showscale: true,
            colorbar: { 
                title: { text: 'Word Count', font: { size: 12, color: '#334155' } },
                tickfont: { size: 11, color: '#64748b' },
                thickness: 20,
                len: 0.6,
                x: 1.05
            },
            texttemplate: '%{text}',
            textfont: { color: '#ffffff', size: 12, family: 'Inter, sans-serif' },
            hovertemplate: '<b>Grid Position</b><br>X: %{customdata.x}<br>Y: %{customdata.y}<br>Words: %{z:,.0f}<br>Unique: %{customdata.uniqueWords}<extra></extra>',
            hoverlabel: {
                bgcolor: '#ffffff',
                bordercolor: '#3b82f6',
                font: { size: 12, color: '#1e293b' }
            }
        };
        
        const annotations = [];
        
        const blockEnds = gridData.block_end_positions || [];
        blockEnds.forEach(pos => {
            annotations.push({
                x: pos.grid_x,
                y: pos.grid_y,
                text: `P${pos.position}`,
                showarrow: true,
                arrowhead: 2,
                arrowcolor: '#3b82f6',
                arrowwidth: 2,
                arrowsize: 1.2,
                font: { color: '#3b82f6', size: 12, family: 'Inter, sans-serif' },
                bgcolor: 'rgba(255, 255, 255, 0.95)',
                bordercolor: '#3b82f6',
                borderwidth: 1.5,
                borderpad: 6,
                xref: 'x',
                yref: 'y'
            });
        });
        
        const layout = {
            xaxis: { 
                title: { text: 'X Coordinate', font: { size: 13, color: '#334155' } },
                dtick: 1,
                tickfont: { size: 11, color: '#64748b' },
                gridcolor: '#e2e8f0',
                gridwidth: 1,
                side: 'bottom',
                fixedrange: false
            },
            yaxis: { 
                title: { text: 'Y Coordinate', font: { size: 13, color: '#334155' } },
                dtick: 1,
                autorange: 'reversed',
                tickfont: { size: 11, color: '#64748b' },
                gridcolor: '#e2e8f0',
                gridwidth: 1,
                fixedrange: false
            },
            margin: { l: 80, r: 100, t: 40, b: 70 },
            autosize: true,
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)',
            font: { family: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif', size: 12, color: '#1e293b' },
            hovermode: 'closest',
            annotations: annotations
        };
        
        const config = {
            responsive: true,
            displayModeBar: true,
            modeBarButtonsToRemove: ['lasso2d', 'select2d'],
            displaylogo: false,
            toImageButtonOptions: { format: 'png', filename: 'grid-heatmap', height: 500, width: 700, scale: 2 },
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
    
    function renderColumn6Stats() {
        if (!gridData || !gridData.column6_hub) return;
        
        const hub = gridData.column6_hub;
        const container = document.getElementById('column6-stats');
        if (!container) return;
        
        container.innerHTML = '';
        
        let html = '<ul class="style-none list-item" style="margin-bottom: 1rem;">';
        html += `<li style="margin-bottom: 0.5rem;"><strong>Word Count:</strong> ${(hub.word_count || 0).toLocaleString('en-US')}</li>`;
        html += `<li style="margin-bottom: 0.5rem;"><strong>Percentage:</strong> ${(hub.percentage || 0).toFixed(1)}% of all words</li>`;
        html += '</ul>';
        
        if (hub.top_words && hub.top_words.length > 0) {
            html += '<p style="font-size: 0.95rem; color: #64748b; margin-top: 1rem; margin-bottom: 0.5rem;"><strong>Top Words in Column 6:</strong></p>';
            html += '<ul class="style-none list-item">';
            hub.top_words.slice(0, 10).forEach(word => {
                const wordText = escapeHtml(typeof word === 'object' ? word.word : String(word));
                const wordCount = typeof word === 'object' ? (word.count || 0) : 1;
                html += `<li style="margin-bottom: 0.3rem;"><strong>${wordText}:</strong> ${wordCount.toLocaleString('en-US')}x</li>`;
            });
            html += '</ul>';
        }
        
        container.innerHTML = html;
    }
    
    function renderHotspots() {
        if (!gridData || !gridData.hotspots) return;
        
        const hotspots = gridData.hotspots || [];
        const container = document.getElementById('hotspots-list');
        if (!container) return;
        
        if (hotspots.length === 0) {
            container.innerHTML = '<p style="color: #64748b;">No hotspot data available.</p>';
            return;
        }
        
        let html = '<div class="row">';
        hotspots.forEach((spot, idx) => {
            const x = Number(spot.x) || 0;
            const y = Number(spot.y) || 0;
            const wordCount = Number(spot.word_count) || 0;
            const uniqueWords = Number(spot.unique_words) || 0;
            html += `<div class="col-lg-4 col-md-6 mb-30">
                <div class="limitation-card" style="height: 100%;">
                    <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem;">
                        <span style="font-size: 1.5rem; font-weight: bold; color: #3b82f6;">#${idx + 1}</span>
                        <span style="color: #64748b; font-size: 0.95rem;">Grid (${x}, ${y})</span>
                    </div>
                    <div style="font-size: 1.3rem; font-weight: bold; color: #3b82f6; margin-bottom: 0.5rem;">
                        ${wordCount.toLocaleString('en-US')} words
                    </div>
                    <div style="color: #64748b; font-size: 0.9rem;">
                        ${uniqueWords.toLocaleString('en-US')} unique
                    </div>
                </div>
            </div>`;
        });
        html += '</div>';
        
        container.innerHTML = html;
    }
    
    function renderAll() {
        renderGridHeatmap();
        renderColumn6Stats();
        renderHotspots();
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadData);
    } else {
        loadData();
    }
})();
