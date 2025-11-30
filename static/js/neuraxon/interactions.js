let highlightTimeout = null;
let isHighlighting = false;

function selectNodeById(neuronId) {
    if (neuronId === undefined || neuronId === null) return;
    
    const currentIdx = window.currentFrameIndex || 0;
    const frame = window.FRAME_DATA[currentIdx] || window.FRAME_DATA[0];
    if (!frame) return;
    
    const nodesMap = frame.nodes || {};
    const key = String(neuronId);
    const node = nodesMap[key] || nodesMap[neuronId];
    
    if (node) {
        if (window.renderTables) {
            window.renderTables(currentIdx, window.FRAME_DATA, neuronId);
        }
        
        highlightNodeInPlot(neuronId);
        
        setTimeout(() => {
            const container = document.getElementById('data-tables-container');
            if (container) {
                container.scrollIntoView({ behavior: 'smooth', block: 'start' });
                
                setTimeout(() => {
                    scrollToNeuronInTable(neuronId);
                }, 300);
            }
        }, 100);
    }
}

function scrollToNeuronInTable(neuronId) {
    const container = document.getElementById('data-tables-container');
    if (!container) return;
    
    const row = container.querySelector(`tr[data-node-id="${neuronId}"]`);
    if (row) {
        const tableWrapper = row.closest('.data-table-wrapper');
        if (tableWrapper) {
            const rowTop = row.offsetTop;
            const wrapperTop = tableWrapper.scrollTop;
            const wrapperHeight = tableWrapper.clientHeight;
            const rowHeight = row.offsetHeight;
            
            if (rowTop < wrapperTop || rowTop + rowHeight > wrapperTop + wrapperHeight) {
                tableWrapper.scrollTo({
                    top: rowTop - 50,
                    behavior: 'smooth'
                });
            }
        }
        
        row.classList.add('active');
        row.style.background = '#dbeafe';
        setTimeout(() => {
            row.style.background = '';
        }, 2000);
    }
}

function highlightNodeInPlot(neuronId) {
    if (isHighlighting) return;
    
    if (highlightTimeout) {
        clearTimeout(highlightTimeout);
    }
    
    highlightTimeout = setTimeout(() => {
        isHighlighting = true;
        
        const plotEl = document.getElementById('neuraxon-plot');
        if (!plotEl || !plotEl.data) {
            isHighlighting = false;
            return;
        }
        
        let nodeTraceIndex = null;
        for (let i = 0; i < plotEl.data.length; i++) {
            if (plotEl.data[i].mode === 'markers') {
                nodeTraceIndex = i;
                break;
            }
        }
        
        if (nodeTraceIndex === null) {
            isHighlighting = false;
            return;
        }
        
        const trace = plotEl.data[nodeTraceIndex];
        const customdata = trace.customdata || [];
        const nodeIndex = customdata.findIndex(id => Number(id) === Number(neuronId));
        
        if (nodeIndex >= 0 && window.cachedBaseSizes && window.cachedBaseSizes.length > nodeIndex) {
            const baseSizes = window.cachedBaseSizes;
            const baseSize = baseSizes[nodeIndex] || 6;
            const newSizes = baseSizes.map((size, idx) => {
                return idx === nodeIndex ? baseSize * 3.0 : size;
            });
            
            Plotly.restyle(plotEl, {'marker.size': [newSizes]}, [nodeTraceIndex]).then(() => {
                isHighlighting = false;
            }).catch((err) => {
                console.error('Highlight error:', err);
                isHighlighting = false;
            });
        } else {
            isHighlighting = false;
        }
    }, 50);
}

function clearHighlight() {
    const plotEl = document.getElementById('neuraxon-plot');
    if (!plotEl || !plotEl.data || !window.cachedBaseSizes) return;
    
    let nodeTraceIndex = null;
    for (let i = 0; i < plotEl.data.length; i++) {
        if (plotEl.data[i].mode === 'markers') {
            nodeTraceIndex = i;
            break;
        }
    }
    
    if (nodeTraceIndex !== null) {
        Plotly.restyle(plotEl, {'marker.size': [window.cachedBaseSizes]}, [nodeTraceIndex]);
    }
}

function attachPlotInteractions() {
    const plotEl = document.getElementById('neuraxon-plot');
    if (!plotEl) {
        return;
    }
    
    if (typeof Plotly === 'undefined') {
        return;
    }
    
    function handleClick(eventData) {
        if (!eventData || !eventData.points || eventData.points.length === 0) {
            clearHighlight();
            return;
        }
        
        const point = eventData.points[0];
        let neuronId = null;
        
        if (point.pointNumber !== undefined && point.pointNumber !== null) {
            const currentPlotEl = document.getElementById('neuraxon-plot');
            if (currentPlotEl && currentPlotEl.data) {
                const nodeTrace = currentPlotEl.data.find(t => t.mode === 'markers');
                if (nodeTrace && nodeTrace.customdata && Array.isArray(nodeTrace.customdata)) {
                    neuronId = nodeTrace.customdata[point.pointNumber];
                }
            }
        }
        
        if (!neuronId && point.customdata !== undefined && point.customdata !== null) {
            if (Array.isArray(point.customdata)) {
                neuronId = point.customdata[point.pointNumber] || point.customdata[0];
            } else {
                neuronId = point.customdata;
            }
        }
        
        if (neuronId !== undefined && neuronId !== null && neuronId !== '' && neuronId !== '0') {
            selectNodeById(String(neuronId));
        }
    }
    
    function tryAttachEvents() {
        const el = document.getElementById('neuraxon-plot');
        if (!el) {
            return false;
        }
        
        if (el.on && typeof el.on === 'function') {
            el.on('plotly_click', handleClick);
            return true;
        }
        
        return false;
    }
    
    if (!tryAttachEvents()) {
        let retryCount = 0;
        const maxRetries = 15;
        const retryInterval = setInterval(() => {
            retryCount++;
            if (tryAttachEvents()) {
                clearInterval(retryInterval);
            } else if (retryCount >= maxRetries) {
                clearInterval(retryInterval);
                const plotDiv = document.getElementById('neuraxon-plot');
                if (plotDiv) {
                    plotDiv.addEventListener('click', (e) => {
                        setTimeout(() => {
                            const plotEl = document.getElementById('neuraxon-plot');
                            if (plotEl && plotEl.data) {
                                const nodeTrace = plotEl.data.find(t => t.mode === 'markers');
                                if (nodeTrace && nodeTrace.customdata && Array.isArray(nodeTrace.customdata)) {
                                    const rect = plotEl.getBoundingClientRect();
                                    const x = e.clientX - rect.left;
                                    const y = e.clientY - rect.top;
                                    const pointNumber = Plotly.Fx ? Plotly.Fx.getClosestPoint(plotEl, {x: x, y: y}) : null;
                                    if (pointNumber !== undefined && pointNumber !== null && nodeTrace.customdata[pointNumber]) {
                                        const neuronId = nodeTrace.customdata[pointNumber];
                                        selectNodeById(String(neuronId));
                                    }
                                }
                            }
                        }, 100);
                    });
                }
            }
        }, 200);
    }
}

window.selectNodeById = selectNodeById;
window.attachPlotInteractions = attachPlotInteractions;
window.clearHighlight = clearHighlight;
window.scrollToNeuronInTable = scrollToNeuronInTable;
