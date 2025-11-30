function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
        }).catch(err => {
        });
    } else {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
        } catch (err) {
        }
        document.body.removeChild(textArea);
    }
}

function renderNeuronTable(frame, selectedNodeId = null) {
    const allNodes = Object.values(frame.nodes || {});
    allNodes.sort((a, b) => {
        const aId = Number(a.neuron_id ?? a.id ?? 0);
        const bId = Number(b.neuron_id ?? b.id ?? 0);
        return aId - bId;
    });
    
    let html = `
        <div class="table-description">
            <h3>Neuron Catalog <span class="info-icon" onclick="openPopup('neuron-table-info')">ℹ</span></h3>
            <span>This table shows every identity in the current frame. Each row is one Qubic identity with its blockchain address (Real ID), private seed, hash, and state. Click on any row to highlight that identity in the 3D visualization above. Click on Real ID, Seed, or Hash values to copy them to your clipboard.</span>
        </div>
        <div class="data-table">
            <div class="data-table-wrapper">
                <table>
                    <thead>
                        <tr>
                            <th>Neuron ID</th>
                            <th>Real ID</th>
                            <th>Seed (priv)</th>
                            <th>Seed Hash</th>
                            <th>Doc ID</th>
                            <th>State</th>
                        </tr>
                    </thead>
                    <tbody>
    `;
    
    allNodes.forEach(node => {
        const nodeId = String(node.neuron_id ?? node.id ?? '');
        const isSelected = selectedNodeId && String(nodeId) === String(selectedNodeId);
        const rowClass = isSelected ? 'neuron-row active' : 'neuron-row';
        
        const realId = escapeHtml(String(node.real_id || '—'));
        const seed = escapeHtml(String(node.seed || '—'));
        const seedHash = escapeHtml(String(node.seed_hash || '—'));
        const docId = escapeHtml(String(node.doc_id || '—'));
        const state = escapeHtml(String(node.state ?? '—'));
        
        const checkButton = node.real_id ? 
            `<button onclick="window.open('https://explorer.qubic.org/network/address/${escapeHtml(node.real_id)}', '_blank', 'noopener,noreferrer')" class="btn btn-primary" style="padding: 0.25rem 0.5rem; font-size: 0.7rem;">Check</button>` : '';
        
        html += `
            <tr class="${rowClass}" data-node-id="${escapeHtml(nodeId)}">
                <td>${escapeHtml(nodeId)}</td>
                <td>
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <span class="copyable" title="Click to copy" style="flex: 1;">${realId}</span>
                        ${checkButton}
                    </div>
                </td>
                <td class="copyable" title="Click to copy">${seed}</td>
                <td class="copyable" title="Click to copy">${seedHash}</td>
                <td class="copyable" title="Click to copy">${docId}</td>
                <td>${state}</td>
            </tr>
        `;
    });
    
    html += `
                    </tbody>
                </table>
            </div>
        </div>
    `;
    
    return html;
}

function renderConnectionTable(frame) {
    const connections = (frame.connections || []).slice().sort((a, b) => {
        const aWeight = Math.abs(a.weight || 0);
        const bWeight = Math.abs(b.weight || 0);
        return bWeight - aWeight;
    });
    
    const nodesMap = frame.nodes || {};
    
    let html = `
        <div class="table-description">
            <h3>Synapse List <span class="info-icon" onclick="openPopup('connection-table-info')">ℹ</span></h3>
            <span>This table shows the connections (the orange and gray lines) between identities in the current frame. Each row is one connection between two identities. Stronger connections appear higher in the table. The "From → To" column shows which two identities are connected, and the weight shows how strong that connection is.</span>
        </div>
        <div class="data-table">
            <div class="data-table-wrapper">
                <table>
                    <thead>
                        <tr>
                            <th>From → To</th>
                            <th>|weight|</th>
                            <th>Type</th>
                            <th>w_fast</th>
                            <th>w_slow</th>
                            <th>w_meta</th>
                        </tr>
                    </thead>
                    <tbody>
    `;
    
    connections.forEach(conn => {
        const preNode = nodesMap[String(conn.pre_id)] || {};
        const postNode = nodesMap[String(conn.post_id)] || {};
        const preReal = preNode.real_id ? preNode.real_id.substring(0, 5) : '';
        const postReal = postNode.real_id ? postNode.real_id.substring(0, 5) : '';
        
        html += `
            <tr class="connection-row" data-pre-id="${conn.pre_id}" data-post-id="${conn.post_id}">
                <td>${conn.pre_id} (${preReal}…) → ${conn.post_id} (${postReal}…)</td>
                <td>${(Math.abs(conn.weight || 0)).toFixed(3)}</td>
                <td>${escapeHtml(conn.synapse_type || '—')}</td>
                <td>${(conn.w_fast || 0).toFixed(3)}</td>
                <td>${(conn.w_slow || 0).toFixed(3)}</td>
                <td>${(conn.w_meta || 0).toFixed(3)}</td>
            </tr>
        `;
    });
    
    html += `
                    </tbody>
                </table>
            </div>
        </div>
    `;
    
    return html;
}

function renderTables(frameIndex, frameData, selectedNodeId = null) {
    const frame = frameData[frameIndex];
    if (!frame) return;
    
    const container = document.getElementById('data-tables-container');
    if (!container) return;
    
    const neuronTable = renderNeuronTable(frame, selectedNodeId);
    const connectionTable = renderConnectionTable(frame);
    
    container.innerHTML = neuronTable + connectionTable;
    
    container.querySelectorAll('.copyable').forEach(cell => {
        cell.addEventListener('click', (e) => {
            e.stopPropagation();
            const text = cell.textContent.trim();
            if (text && text !== '—') {
                copyToClipboard(text);
                const originalBg = cell.style.background;
                cell.style.background = '#10b981';
                setTimeout(() => {
                    cell.style.background = originalBg;
                }, 200);
            }
        });
    });
    
    container.querySelectorAll('.neuron-row').forEach(row => {
        row.addEventListener('click', (event) => {
            if (event.target.closest('.copyable') || event.target.tagName === 'BUTTON') {
                return;
            }
            const nodeId = Number(row.dataset.nodeId);
            if (window.selectNodeById && !isNaN(nodeId)) {
                window.selectNodeById(nodeId);
            }
        });
        row.style.cursor = 'pointer';
    });
    
    container.querySelectorAll('.connection-row').forEach(row => {
        row.addEventListener('click', () => {
            const pre = Number(row.dataset.preId);
            if (window.selectNodeById && !isNaN(pre)) {
                window.selectNodeById(pre);
            }
        });
        row.style.cursor = 'pointer';
    });
}

window.renderTables = renderTables;

