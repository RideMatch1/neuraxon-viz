let cachedBaseSizes = null;
let isRendering = false;
let renderQueue = null;
let savedCamera = null;
window.savedCamera = null;

function getNodeColor(node) {
    const state = node.state;
    const neuronType = node.neuron_type || 'hidden';
    
    if (state === 1) return '#ef4444';
    if (state === -1) return '#3b82f6';
    
    if (neuronType === 'input') return '#f97316';
    if (neuronType === 'output') return '#14b8a6';
    if (neuronType === 'hidden') return '#3b82f6';
    
    return '#999';
}

function getNodeSize(node) {
    const neuronType = node.neuron_type || 'hidden';
    const base = neuronType === 'input' ? 9 : (neuronType === 'output' ? 8 : 6);
    return base;
}

function buildHoverText(node) {
    const parts = [`Neuron ID: ${node.id || node.neuron_id || ''}`];
    if (node.real_id) parts.push(`Real ID: ${node.real_id.substring(0, 20)}...`);
    if (node.state !== undefined) parts.push(`State: ${node.state}`);
    if (node.neuron_type) parts.push(`Type: ${node.neuron_type}`);
    if (node.seed) parts.push(`Seed: ${node.seed.substring(0, 20)}...`);
    return parts.join('<br>');
}

function renderNodes(frame) {
    const nodeList = frame.display_nodes && frame.display_nodes.length > 0 
        ? frame.display_nodes 
        : Object.values(frame.nodes || {});
    
    if (nodeList.length === 0) return null;
    
    const x = nodeList.map(n => n.x || 0);
    const y = nodeList.map(n => n.y || 0);
    const z = nodeList.map(n => n.z || 0);
    const nodeIds = nodeList.map(n => {
        const id = n.id || n.neuron_id;
        if (id === undefined || id === null || id === '') {
            return '0';
        }
        return String(id);
    });
    const colors = nodeList.map(getNodeColor);
    const sizes = nodeList.map(getNodeSize);
    const hoverTexts = nodeList.map(buildHoverText);
    
    if (!cachedBaseSizes || cachedBaseSizes.length !== sizes.length) {
        cachedBaseSizes = sizes.slice();
        window.cachedBaseSizes = cachedBaseSizes;
    }
    
    return {
        x, y, z, nodeIds, colors, sizes, hoverTexts, nodeList
    };
}

function renderEdgesOptimized(frame) {
    const connections = frame.connections || [];
    if (connections.length === 0) return [];
    
    const nodesMap = {};
    const nodeList = frame.display_nodes && frame.display_nodes.length > 0 
        ? frame.display_nodes 
        : Object.values(frame.nodes || {});
    
    nodeList.forEach(node => {
        const id = node.id || node.neuron_id;
        if (id !== undefined) {
            nodesMap[String(id)] = node;
            nodesMap[id] = node;
        }
    });
    
    const validConnections = connections
        .filter(conn => {
            const preId = conn.pre_id;
            const postId = conn.post_id;
            const preNode = nodesMap[String(preId)] || nodesMap[preId];
            const postNode = nodesMap[String(postId)] || nodesMap[postId];
            return preNode && postNode && 
                   preNode.x !== undefined && preNode.y !== undefined && preNode.z !== undefined &&
                   postNode.x !== undefined && postNode.y !== undefined && postNode.z !== undefined;
        })
        .sort((a, b) => Math.abs(b.weight || 0) - Math.abs(a.weight || 0));
    
    if (validConnections.length === 0) return [];
    
    const strongEdges = { x: [], y: [], z: [] };
    const mediumEdges = { x: [], y: [], z: [] };
    const weakEdges = { x: [], y: [], z: [] };
    
    validConnections.forEach(conn => {
        const preId = conn.pre_id;
        const postId = conn.post_id;
        const preNode = nodesMap[String(preId)] || nodesMap[preId];
        const postNode = nodesMap[String(postId)] || nodesMap[postId];
        
        if (!preNode || !postNode) return;
        
        const weight = Math.abs(conn.weight || 0);
        let target;
        
        if (weight > 0.5) {
            target = strongEdges;
        } else if (weight > 0.2) {
            target = mediumEdges;
        } else if (weight > 0.05) {
            target = weakEdges;
        } else {
            return;
        }
        
        target.x.push(preNode.x || 0, postNode.x || 0, null);
        target.y.push(preNode.y || 0, postNode.y || 0, null);
        target.z.push(preNode.z || 0, postNode.z || 0, null);
    });
    
    const traces = [];
    
    if (weakEdges.x.length > 0) {
        traces.push({
            x: weakEdges.x,
            y: weakEdges.y,
            z: weakEdges.z,
            mode: 'lines',
            type: 'scatter3d',
            line: { width: 1.0, color: 'rgba(100, 100, 100, 0.6)' },
            hoverinfo: 'none',
            showlegend: false,
            opacity: 0.6
        });
    }
    
    if (mediumEdges.x.length > 0) {
        traces.push({
            x: mediumEdges.x,
            y: mediumEdges.y,
            z: mediumEdges.z,
            mode: 'lines',
            type: 'scatter3d',
            line: { width: 2.0, color: 'rgba(255, 111, 0, 0.8)' },
            hoverinfo: 'none',
            showlegend: false,
            opacity: 0.8
        });
    }
    
    if (strongEdges.x.length > 0) {
        traces.push({
            x: strongEdges.x,
            y: strongEdges.y,
            z: strongEdges.z,
            mode: 'lines',
            type: 'scatter3d',
            line: { width: 3.0, color: '#ff6f00' },
            hoverinfo: 'none',
            showlegend: false,
            opacity: 1.0
        });
    }
    
    return traces;
}

function renderFrame3D(frameIndex, frameData) {
    if (isRendering) {
        renderQueue = frameIndex;
        return;
    }
    
    isRendering = true;
    
    const frame = frameData[frameIndex];
    if (!frame) {
        isRendering = false;
        return;
    }
    
    requestAnimationFrame(() => {
        try {
            const nodeData = renderNodes(frame);
            if (!nodeData) {
                isRendering = false;
                return;
            }
            
            const edgeTraces = renderEdgesOptimized(frame);
            
            const traces = [
                ...edgeTraces,
                {
                    x: nodeData.x,
                    y: nodeData.y,
                    z: nodeData.z,
                    mode: 'markers',
                    type: 'scatter3d',
                    text: nodeData.hoverTexts,
                    hoverinfo: 'text',
                    customdata: nodeData.nodeIds.map(id => String(id)),
                    marker: {
                        size: nodeData.sizes,
                        color: nodeData.colors,
                        opacity: 0.92,
                        line: { width: 1, color: '#202020' }
                    },
                    name: 'Nodes'
                }
            ];
            
            const plotEl = document.getElementById('neuraxon-plot');
            if (!plotEl) {
                isRendering = false;
                return;
            }
            
            if (typeof Plotly === 'undefined') {
                isRendering = false;
                plotEl.innerHTML = '<div style="padding: 20px; text-align: center; color: red;">Error: Plotly library not loaded. Please refresh the page.</div>';
                return;
            }
            
            let currentCamera = savedCamera || window.savedCamera;
            
            if (!currentCamera && plotEl.layout && plotEl.layout.scene && plotEl.layout.scene.camera) {
                currentCamera = plotEl.layout.scene.camera;
            }
            
            if (!currentCamera && plotEl._fullLayout && plotEl._fullLayout.scene && plotEl._fullLayout.scene.camera) {
                currentCamera = plotEl._fullLayout.scene.camera;
            }
            
            const layout = {
                title: 'Neuraxon 3D Network',
                scene: {
                    xaxis: { title: 'X' },
                    yaxis: { title: 'Y' },
                    zaxis: { title: 'Z' },
                    camera: currentCamera || {
                        eye: { x: 1.5, y: 1.5, z: 1.5 }
                    }
                },
                margin: { l: 0, r: 0, t: 30, b: 0 },
                height: 800
            };
            
            const config = {
                responsive: true,
                displayModeBar: true,
                displaylogo: false,
                scrollZoom: true
            };
            
            const plotFunction = (plotEl.data && plotEl.data.length > 0) 
                ? Plotly.react 
                : Plotly.newPlot;
            
            if (currentCamera) {
                layout.scene.camera = currentCamera;
            }
            
            plotFunction('neuraxon-plot', traces, layout, config)
                .then(() => {
                    isRendering = false;
                    
                    const updatedPlotEl = document.getElementById('neuraxon-plot');
                    if (updatedPlotEl) {
                        const hasPlotlyContent = updatedPlotEl.querySelector('.plotly') || updatedPlotEl.querySelector('canvas') || updatedPlotEl.classList.contains('js-plotly-plot');
                        
                        if (!hasPlotlyContent && updatedPlotEl.innerHTML.trim() === '') {
                            setTimeout(() => {
                                const recheckEl = document.getElementById('neuraxon-plot');
                                if (recheckEl && (!recheckEl.querySelector('.plotly') && recheckEl.innerHTML.trim() === '')) {
                                    renderFrame3D(frameIndex, frameData);
                                }
                            }, 500);
                        }
                        
                        if (currentCamera && updatedPlotEl._fullLayout && updatedPlotEl._fullLayout.scene) {
                            Plotly.relayout('neuraxon-plot', {
                                'scene.camera': currentCamera
                            }).then(() => {
                                if (updatedPlotEl._fullLayout && updatedPlotEl._fullLayout.scene && updatedPlotEl._fullLayout.scene.camera) {
                                    savedCamera = updatedPlotEl._fullLayout.scene.camera;
                                    window.savedCamera = savedCamera;
                                }
                            });
                        } else {
                            if (updatedPlotEl.layout && updatedPlotEl.layout.scene && updatedPlotEl.layout.scene.camera) {
                                savedCamera = updatedPlotEl.layout.scene.camera;
                                window.savedCamera = savedCamera;
                            } else if (updatedPlotEl._fullLayout && updatedPlotEl._fullLayout.scene && updatedPlotEl._fullLayout.scene.camera) {
                                savedCamera = updatedPlotEl._fullLayout.scene.camera;
                                window.savedCamera = savedCamera;
                            }
                        }
                        
                        if (updatedPlotEl && updatedPlotEl.on && typeof updatedPlotEl.on === 'function') {
                            updatedPlotEl.on('plotly_relayout', (eventData) => {
                                if (eventData && eventData['scene.camera']) {
                                    savedCamera = eventData['scene.camera'];
                                    window.savedCamera = savedCamera;
                                } else if (updatedPlotEl._fullLayout && updatedPlotEl._fullLayout.scene && updatedPlotEl._fullLayout.scene.camera) {
                                    savedCamera = updatedPlotEl._fullLayout.scene.camera;
                                    window.savedCamera = savedCamera;
                                }
                            });
                        }
                        
                        
                        if (window.attachPlotInteractions) {
                            setTimeout(() => {
                                try {
                                    window.attachPlotInteractions();
                                } catch (err) {
                                    console.error('Error attaching plot interactions:', err);
                                }
                            }, 500);
                        }
                    }
                    
                    if (renderQueue !== null) {
                        const next = renderQueue;
                        renderQueue = null;
                        renderFrame3D(next, frameData);
                    }
                })
                .catch((error) => {
                    console.error('Plotly rendering error:', error);
                    isRendering = false;
                    const errorDiv = document.getElementById('neuraxon-plot');
                    if (errorDiv) {
                        errorDiv.innerHTML = '<div style="padding: 20px; text-align: center; color: red;">Error rendering visualization: ' + (error.message || String(error)) + '</div>';
                    }
                });
        } catch (error) {
            console.error('Error rendering frame:', error);
            isRendering = false;
        }
    });
}

window.renderFrame3D = renderFrame3D;
window.getNodeColor = getNodeColor;
window.cachedBaseSizes = cachedBaseSizes;
