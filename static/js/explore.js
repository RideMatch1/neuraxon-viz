(function() {
    'use strict';
    
    let annaData = null;
    
    async function loadData() {
        const chartIds = ['word-frequency-chart', 'sentence-frequency-chart', 'grid-heatmap', 'word-list', 'sentence-list'];
        
        try {
            const response = await fetch('/api/anna-data');
            if (!response.ok) {
                throw new Error('Failed to load Anna data');
            }
            annaData = await response.json();
            
            chartIds.forEach(id => {
                const el = document.getElementById(id);
                if (el) {
                    el.innerHTML = '';
                }
            });
            
            renderAll();
        } catch (error) {
            chartIds.forEach(id => {
                const el = document.getElementById(id);
                if (el) {
                    el.innerHTML = '<p style="text-align: center; padding: 20px; color: #ef4444;">Failed to load data. Please refresh the page.</p>';
                }
            });
        }
    }
    
    function renderWordFrequency() {
        if (!annaData || !annaData.top_words) return;
        
        const container = document.getElementById('word-frequency-chart');
        if (!container) return;
        
        container.innerHTML = '';
        
        const words = annaData.top_words.slice(0, 20);
        const wordNames = words.map(w => typeof w === 'string' ? w : w.word || w[0]);
        const wordCounts = words.map(w => typeof w === 'number' ? w : w.count || w[1] || 1);
        
        const trace = {
            x: wordNames,
            y: wordCounts,
            type: 'bar',
            marker: {
                color: wordCounts.map(c => {
                    const max = Math.max(...wordCounts);
                    const ratio = c / max;
                    return `rgba(59, 130, 246, ${0.4 + ratio * 0.6})`;
                }),
                line: { color: '#2563eb', width: 1.5 },
                opacity: 0.9
            },
            text: wordCounts.map(c => c.toLocaleString()),
            textposition: 'outside',
            textfont: { color: '#1e293b', size: 11 },
            hovertemplate: '<b>%{x}</b><br>Frequency: %{y:,.0f}<extra></extra>',
            hoverlabel: {
                bgcolor: '#ffffff',
                bordercolor: '#3b82f6',
                font: { size: 12 }
            }
        };
        
        const layout = {
            xaxis: { 
                title: { text: 'Word', font: { size: 13, color: '#334155' } },
                tickangle: -45,
                tickfont: { size: 11, color: '#64748b' },
                gridcolor: '#e2e8f0',
                gridwidth: 1,
                fixedrange: false
            },
            yaxis: { 
                title: { text: 'Frequency', font: { size: 13, color: '#334155' } },
                tickfont: { size: 11, color: '#64748b' },
                gridcolor: '#e2e8f0',
                gridwidth: 1,
                fixedrange: false
            },
            margin: { l: 70, r: 30, t: 30, b: 100 },
            autosize: true,
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)',
            font: { family: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif', size: 12, color: '#1e293b' },
            hovermode: 'closest',
            showlegend: false
        };
        
        const config = {
            responsive: true,
            displayModeBar: true,
            modeBarButtonsToRemove: ['lasso2d', 'select2d'],
            displaylogo: false,
            toImageButtonOptions: { format: 'png', filename: 'word-frequency', height: 400, width: 800, scale: 2 },
            doubleClick: 'reset',
            autosizable: true
        };
        
        Plotly.newPlot(container, [trace], layout, config);
        
        const resizeHandler = function() {
            if (container.offsetWidth > 0) {
                Plotly.Plots.resize(container);
            }
        };
        
        let resizeTimeout;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(resizeHandler, 100);
        });
    }
    
    function renderSentenceFrequency() {
        if (!annaData || !annaData.top_sentences) return;
        
        const container = document.getElementById('sentence-frequency-chart');
        if (!container) return;
        
        container.innerHTML = '';
        
        const sentences = annaData.top_sentences.slice(0, 20);
        const sentenceTexts = sentences.map(s => typeof s === 'string' ? s : s.sentence || s[0]);
        const sentenceCounts = sentences.map(s => typeof s === 'number' ? s : s.count || s[1] || 1);
        
        const trace = {
            x: sentenceTexts,
            y: sentenceCounts,
            type: 'bar',
            marker: {
                color: sentenceCounts.map(c => {
                    const max = Math.max(...sentenceCounts);
                    const ratio = c / max;
                    return `rgba(37, 99, 235, ${0.4 + ratio * 0.6})`;
                }),
                line: { color: '#1d4ed8', width: 1.5 },
                opacity: 0.9
            },
            text: sentenceCounts.map(c => c.toLocaleString()),
            textposition: 'outside',
            textfont: { color: '#1e293b', size: 11 },
            hovertemplate: '<b>%{x}</b><br>Frequency: %{y:,.0f}<extra></extra>',
            hoverlabel: {
                bgcolor: '#ffffff',
                bordercolor: '#2563eb',
                font: { size: 12 }
            }
        };
        
        const layout = {
            xaxis: { 
                title: { text: 'Sentence', font: { size: 13, color: '#334155' } },
                tickangle: -45,
                tickfont: { size: 10, color: '#64748b' },
                gridcolor: '#e2e8f0',
                gridwidth: 1,
                fixedrange: false
            },
            yaxis: { 
                title: { text: 'Frequency', font: { size: 13, color: '#334155' } },
                tickfont: { size: 11, color: '#64748b' },
                gridcolor: '#e2e8f0',
                gridwidth: 1,
                fixedrange: false
            },
            margin: { l: 70, r: 30, t: 30, b: 140 },
            autosize: true,
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)',
            font: { family: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif', size: 12, color: '#1e293b' },
            hovermode: 'closest',
            showlegend: false
        };
        
        const config = {
            responsive: true,
            displayModeBar: true,
            modeBarButtonsToRemove: ['lasso2d', 'select2d'],
            displaylogo: false,
            toImageButtonOptions: { format: 'png', filename: 'sentence-frequency', height: 400, width: 800, scale: 2 },
            doubleClick: 'reset',
            autosizable: true
        };
        
        Plotly.newPlot(container, [trace], layout, config);
        
        const resizeHandler = function() {
            if (container.offsetWidth > 0) {
                Plotly.Plots.resize(container);
            }
        };
        
        let resizeTimeout;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(resizeHandler, 100);
        });
    }
    
    function renderGridHeatmap() {
        if (!annaData || !annaData.grid) return;
        
        const container = document.getElementById('grid-heatmap');
        if (!container) return;
        
        container.innerHTML = '';
        
        const grid = annaData.grid;
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
                const value = grid[key] || 0;
                row.push(value);
                textRow.push(value > 0 ? value.toString() : '');
                dataRow.push({ x, y, value });
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
                title: { text: 'Word Density', font: { size: 12, color: '#334155' } },
                tickfont: { size: 11, color: '#64748b' },
                thickness: 20,
                len: 0.6,
                x: 1.05
            },
            texttemplate: '%{text}',
            textfont: { color: '#ffffff', size: 12, family: 'Inter, sans-serif' },
            hovertemplate: '<b>Grid Position</b><br>X: %{customdata.x}<br>Y: %{customdata.y}<br>Density: %{z:,.0f} words<extra></extra>',
            hoverlabel: {
                bgcolor: '#ffffff',
                bordercolor: '#3b82f6',
                font: { size: 12, color: '#1e293b' }
            }
        };
        
        const layout = {
            xaxis: { 
                title: { text: 'X Coordinate', font: { size: 13, color: '#334155' } },
                dtick: 1,
                tickfont: { size: 11, color: '#64748b' },
                gridcolor: '#e2e8f0',
                gridwidth: 1,
                side: 'bottom'
            },
            yaxis: { 
                title: { text: 'Y Coordinate', font: { size: 13, color: '#334155' } },
                dtick: 1,
                autorange: 'reversed',
                tickfont: { size: 11, color: '#64748b' },
                gridcolor: '#e2e8f0',
                gridwidth: 1
            },
            margin: { l: 80, r: 100, t: 40, b: 70 },
            autosize: true,
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)',
            font: { family: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif', size: 12, color: '#1e293b' },
            hovermode: 'closest',
            annotations: [
                {
                    x: 6,
                    y: 2,
                    text: 'Column 6 Hub<br>(Position 27)',
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
                }
            ]
        };
        
        const config = {
            responsive: true,
            displayModeBar: true,
            modeBarButtonsToRemove: ['lasso2d', 'select2d'],
            displaylogo: false,
            toImageButtonOptions: { format: 'png', filename: 'grid-heatmap', height: 500, width: 900, scale: 2 },
            doubleClick: 'reset',
            autosizable: true
        };
        
        Plotly.newPlot(container, [trace], layout, config);
        
        const resizeHandler = function() {
            if (container.offsetWidth > 0) {
                Plotly.Plots.resize(container);
            }
        };
        
        let resizeTimeout;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(resizeHandler, 100);
        });
    }
    
    function renderWordList() {
        if (!annaData || !annaData.top_words) {
            const container = document.getElementById('word-list');
            if (container) container.innerHTML = '<p style="text-align: center; padding: 20px; color: #64748b;">No words available.</p>';
            return;
        }
        
        const words = annaData.top_words || [];
        const container = document.getElementById('word-list');
        if (!container) return;
        
        container.innerHTML = '';
        
        if (words.length === 0) {
            container.innerHTML = '<p style="text-align: center; padding: 20px; color: #64748b;">No words found.</p>';
            return;
        }
        
        let html = '<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 0.5rem;">';
        words.forEach((word) => {
            const wordText = typeof word === 'string' ? word : word.word || word[0];
            const wordCount = typeof word === 'number' ? 1 : word.count || word[1] || 1;
            html += `<div style="padding: 0.5rem; background: #f8fafc; border-radius: 6px; border: 1px solid #e2e8f0; transition: all 0.2s;">
                <strong style="color: #1e293b;">${escapeHtml(wordText)}</strong><br>
                <span style="font-size: 0.85em; color: #64748b;">${wordCount.toLocaleString()}x</span>
            </div>`;
        });
        html += '</div>';
        container.innerHTML = html;
    }
    
    function renderSentenceList() {
        if (!annaData || !annaData.top_sentences) {
            const container = document.getElementById('sentence-list');
            if (container) container.innerHTML = '<p style="text-align: center; padding: 20px; color: #64748b;">No sentences available.</p>';
            return;
        }
        
        const sentences = annaData.top_sentences || [];
        const container = document.getElementById('sentence-list');
        if (!container) return;
        
        container.innerHTML = '';
        
        if (sentences.length === 0) {
            container.innerHTML = '<p style="text-align: center; padding: 20px; color: #64748b;">No sentences found.</p>';
            return;
        }
        
        let html = '<div style="display: flex; flex-direction: column; gap: 0.5rem;">';
        sentences.forEach((sentence) => {
            const sentenceText = typeof sentence === 'string' ? sentence : sentence.sentence || sentence[0];
            const sentenceCount = typeof sentence === 'number' ? 1 : sentence.count || sentence[1] || 1;
            html += `<div style="padding: 0.75rem; background: #f8fafc; border-radius: 6px; border: 1px solid #e2e8f0; transition: all 0.2s;">
                <strong style="color: #1e293b;">${escapeHtml(sentenceText)}</strong> <span style="color: #64748b; font-size: 0.9em;">(${sentenceCount.toLocaleString()}x)</span>
            </div>`;
        });
        html += '</div>';
        container.innerHTML = html;
    }
    
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    function renderAll() {
        renderWordFrequency();
        renderSentenceFrequency();
        renderGridHeatmap();
        renderWordList();
        renderSentenceList();
    }
    
    function setupSearch() {
        const wordSearch = document.getElementById('word-search');
        const sentenceSearch = document.getElementById('sentence-search');
        
        if (wordSearch) {
            wordSearch.addEventListener('input', function(e) {
                const query = e.target.value.toLowerCase();
                filterWordList(query);
            });
        }
        
        if (sentenceSearch) {
            sentenceSearch.addEventListener('input', function(e) {
                const query = e.target.value.toLowerCase();
                filterSentenceList(query);
            });
        }
    }
    
    function filterWordList(query) {
        if (!annaData || !annaData.top_words) return;
        
        const words = annaData.top_words.filter(w => {
            const wordText = (typeof w === 'string' ? w : w.word || w[0]).toLowerCase();
            return wordText.includes(query.toLowerCase());
        });
        
        const container = document.getElementById('word-list');
        if (!container) return;
        
        if (words.length === 0) {
            container.innerHTML = '<p style="text-align: center; padding: 20px; color: #64748b;">No words match your search.</p>';
            return;
        }
        
        let html = '<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 0.5rem;">';
        words.forEach((word) => {
            const wordText = typeof word === 'string' ? word : word.word || word[0];
            const wordCount = typeof word === 'number' ? 1 : word.count || word[1] || 1;
            html += `<div style="padding: 0.5rem; background: #f8fafc; border-radius: 6px; border: 1px solid #e2e8f0; transition: all 0.2s;">
                <strong style="color: #1e293b;">${escapeHtml(wordText)}</strong><br>
                <span style="font-size: 0.85em; color: #64748b;">${wordCount.toLocaleString()}x</span>
            </div>`;
        });
        html += '</div>';
        container.innerHTML = html;
    }
    
    function filterSentenceList(query) {
        if (!annaData || !annaData.top_sentences) return;
        
        const sentences = annaData.top_sentences.filter(s => {
            const sentenceText = (typeof s === 'string' ? s : s.sentence || s[0]).toLowerCase();
            return sentenceText.includes(query.toLowerCase());
        });
        
        const container = document.getElementById('sentence-list');
        if (!container) return;
        
        if (sentences.length === 0) {
            container.innerHTML = '<p style="text-align: center; padding: 20px; color: #64748b;">No sentences match your search.</p>';
            return;
        }
        
        let html = '<div style="display: flex; flex-direction: column; gap: 0.5rem;">';
        sentences.forEach((sentence) => {
            const sentenceText = typeof sentence === 'string' ? sentence : sentence.sentence || sentence[0];
            const sentenceCount = typeof sentence === 'number' ? 1 : sentence.count || sentence[1] || 1;
            html += `<div style="padding: 0.75rem; background: #f8fafc; border-radius: 6px; border: 1px solid #e2e8f0; transition: all 0.2s;">
                <strong style="color: #1e293b;">${escapeHtml(sentenceText)}</strong> <span style="color: #64748b; font-size: 0.9em;">(${sentenceCount.toLocaleString()}x)</span>
            </div>`;
        });
        html += '</div>';
        container.innerHTML = html;
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            loadData();
            setupSearch();
        });
    } else {
        loadData();
        setupSearch();
    }
})();

