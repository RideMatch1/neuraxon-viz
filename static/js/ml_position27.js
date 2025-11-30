(function() {
    'use strict';
    
    let mlData = null;
    
    async function loadData() {
        const chartIds = ['model-comparison-chart', 'feature-importance-chart'];
        
        chartIds.forEach(id => {
            if (document.getElementById(id)) {
                window.LoadingUtils.showSkeleton(id, 'chart');
            }
        });
        
        try {
            const response = await fetch('/api/ml-data');
            if (!response.ok) {
                throw new Error('Failed to load ML Position 27 data');
            }
            mlData = await response.json();
            
            chartIds.forEach(id => window.LoadingUtils.hide(id));
            renderAll();
        } catch (error) {
            chartIds.forEach(id => {
                if (document.getElementById(id)) {
                    window.LoadingUtils.showError(id, 'Please check your connection and try again.', 'loadData()');
                }
            });
        }
    }
    
    function renderModelComparison() {
        if (!mlData) return;
        
        const container = document.getElementById('model-comparison-chart');
        if (!container) return;
        
        container.innerHTML = '';
        
        const metrics = mlData.performance_metrics || {};
        const baseline = metrics.baseline_accuracy || 32.72;
        const mlAccuracy = metrics.test_accuracy || 42.69;
        
        const models = [
            { name: 'Baseline (Weighted Seed)', accuracy: baseline },
            { name: 'Random Forest (ML)', accuracy: mlAccuracy }
        ];
        
        const trace = {
            x: models.map(m => m.name),
            y: models.map(m => m.accuracy),
            type: 'bar',
            marker: {
                color: models.map(m => {
                    const ratio = m.accuracy / 50;
                    return `rgba(59, 130, 246, ${0.4 + ratio * 0.6})`;
                }),
                line: { color: ['#64748b', '#2563eb'], width: 1.5 },
                opacity: 0.9
            },
            text: models.map(m => m.accuracy.toFixed(2) + '%'),
            textposition: 'outside',
            textfont: { color: '#1e293b', size: 11 },
            hovertemplate: '<b>%{x}</b><br>Accuracy: %{y:.2f}%<extra></extra>',
            hoverlabel: {
                bgcolor: '#ffffff',
                bordercolor: '#3b82f6',
                font: { size: 12 }
            }
        };
        
        const layout = {
            xaxis: { 
                title: { text: 'Model', font: { size: 13, color: '#334155' } },
                tickangle: -15,
                tickfont: { size: 11, color: '#64748b' },
                gridcolor: '#e2e8f0',
                gridwidth: 1,
                fixedrange: false
            },
            yaxis: { 
                title: { text: 'Accuracy (%)', font: { size: 13, color: '#334155' } },
                range: [0, 50],
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
            toImageButtonOptions: { format: 'png', filename: 'model-comparison', height: 400, width: 800, scale: 2 },
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
        const resizeListener = function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(resizeHandler, 100);
        };
        window.addEventListener('resize', resizeListener);
    }
    
    function renderFeatureImportance() {
        const container = document.getElementById('feature-importance-chart');
        if (!container) return;
        
        container.innerHTML = '';
        
        let features, importance;
        
        if (!mlData || !mlData.feature_importance || mlData.feature_importance.length === 0) {
            const defaultFeatures = [
                { feature: 'Feature 78', importance: 0.0149 },
                { feature: 'Feature 63', importance: 0.0134 },
                { feature: 'Feature 62', importance: 0.0122 },
                { feature: 'Feature 75', importance: 0.0110 },
                { feature: 'Feature 106', importance: 0.0108 },
                { feature: 'Feature 111', importance: 0.0106 },
                { feature: 'Feature 90', importance: 0.0104 },
                { feature: 'Feature 100', importance: 0.0103 },
                { feature: 'Feature 91', importance: 0.0102 },
                { feature: 'Feature 88', importance: 0.0101 }
            ];
            features = defaultFeatures.map(f => f.feature);
            importance = defaultFeatures.map(f => f.importance);
        } else {
            const featureList = mlData.feature_importance.slice(0, 20);
            features = featureList.map(f => typeof f === 'object' ? (f.feature || f.name || `Feature ${f.index || ''}`) : `Feature ${f}`);
            importance = featureList.map(f => typeof f === 'object' ? (f.importance || f.value || 0) : 0);
        }
        
        const maxImportance = Math.max(...importance);
        
        const trace = {
            x: importance,
            y: features,
            type: 'bar',
            orientation: 'h',
            marker: {
                color: importance.map(imp => {
                    const ratio = imp / maxImportance;
                    return `rgba(59, 130, 246, ${0.4 + ratio * 0.6})`;
                }),
                line: { color: '#2563eb', width: 1.5 },
                opacity: 0.9
            },
            text: importance.map(imp => imp.toFixed(4)),
            textposition: 'outside',
            textfont: { color: '#1e293b', size: 10 },
            hovertemplate: '<b>%{y}</b><br>Importance: %{x:.4f}<extra></extra>',
            hoverlabel: {
                bgcolor: '#ffffff',
                bordercolor: '#3b82f6',
                font: { size: 12 }
            }
        };
        
        const layout = {
            xaxis: { 
                title: { text: 'Importance', font: { size: 13, color: '#334155' } },
                tickfont: { size: 11, color: '#64748b' },
                gridcolor: '#e2e8f0',
                gridwidth: 1,
                fixedrange: false
            },
            yaxis: { 
                title: { text: 'Feature', font: { size: 13, color: '#334155' } },
                tickfont: { size: 10, color: '#64748b' },
                gridcolor: '#e2e8f0',
                gridwidth: 1,
                autorange: 'reversed',
                fixedrange: false
            },
            margin: { l: 120, r: 50, t: 30, b: 50 },
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
            toImageButtonOptions: { format: 'png', filename: 'feature-importance', height: 500, width: 900, scale: 2 },
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
        const resizeListener = function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(resizeHandler, 100);
        };
        window.addEventListener('resize', resizeListener);
    }
    
    function renderAll() {
        renderModelComparison();
        renderFeatureImportance();
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadData);
    } else {
        loadData();
    }
})();

