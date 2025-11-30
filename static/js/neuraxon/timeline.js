let timelineInterval = null;
let frameUpdateTimeout = null;

function setupTimeline(frames) {
    const plotContainer = document.getElementById('neuraxon-plot');
    if (!plotContainer) return;
    
    const timelineContainer = document.createElement('div');
    timelineContainer.id = 'frame-timeline';
    timelineContainer.className = 'guide-section timeline-controls';
    timelineContainer.innerHTML = `
        <div class="timeline-header">
            <h3>Frame Timeline <span class="info-icon" onclick="openPopup('frame-slider-info')">ℹ</span></h3>
            <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
                <div class="timeline-search-group">
                    <input type="number" id="neuron-search-input" placeholder="e.g. 504" style="padding: 0.5rem; border: 1px solid #e2e8f0; border-radius: 6px; font-size: 0.95rem;">
                    <button class="btn btn-primary" id="neuron-search-btn">Locate neuron</button>
                </div>
                <div class="timeline-buttons">
                    <button class="btn btn-outline" id="timeline-play">Play</button>
                    <button class="btn btn-outline" id="timeline-pause">Pause</button>
                </div>
            </div>
        </div>
        <div id="neuron-search-feedback" class="timeline-search-feedback"></div>
        <p style="margin-top: 0.5rem; margin-bottom: 0;">Navigate through all frames using the slider below. Each frame contains 512 identities. Drag the slider or click the numbers to jump to any frame. Use the search box to find a specific identity by its ID number.</p>
        <div class="timeline-slider">
            <div class="timeline-label">Frame: <span id="frame-slider-label">1</span></div>
            <input type="range" id="frame-slider" min="0" max="${frames.length - 1}" step="1" value="0" style="width: 100%;">
            <div class="timeline-ticks" id="frame-slider-ticks"></div>
        </div>
    `;
    
    plotContainer.parentNode.insertBefore(timelineContainer, plotContainer.nextSibling);
    
    const slider = document.getElementById('frame-slider');
    const label = document.getElementById('frame-slider-label');
    const playBtn = document.getElementById('timeline-play');
    const pauseBtn = document.getElementById('timeline-pause');
    const searchBtn = document.getElementById('neuron-search-btn');
    const searchInput = document.getElementById('neuron-search-input');
    const feedback = document.getElementById('neuron-search-feedback');
    
    if (slider) {
        let isDragging = false;
        slider.addEventListener('mousedown', () => { isDragging = true; });
        slider.addEventListener('mouseup', () => { isDragging = false; });
        
        slider.addEventListener('input', (e) => {
            if (frameUpdateTimeout) {
                clearTimeout(frameUpdateTimeout);
            }
            
            frameUpdateTimeout = setTimeout(() => {
                stopTimelinePlayback();
                goToFrame(Number(e.target.value), false);
            }, isDragging ? 0 : 100);
        });
    }
    
    if (playBtn) {
        playBtn.addEventListener('click', startTimelinePlayback);
    }
    
    if (pauseBtn) {
        pauseBtn.addEventListener('click', stopTimelinePlayback);
    }
    
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', handleNeuronSearch);
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                handleNeuronSearch(e);
            }
        });
    }
    
    const ticks = document.getElementById('frame-slider-ticks');
    if (ticks) {
        const maxVisible = Math.min(frames.length, 20);
        const step = Math.max(1, Math.floor(frames.length / maxVisible));
        
        for (let i = 0; i < frames.length; i += step) {
            const span = document.createElement('span');
            span.textContent = i + 1;
            span.dataset.index = i;
            span.addEventListener('click', () => {
                stopTimelinePlayback();
                goToFrame(i, false);
            });
            ticks.appendChild(span);
        }
        
        if (frames.length - 1 > (Math.floor((frames.length - 1) / step) * step)) {
            const lastSpan = document.createElement('span');
            lastSpan.textContent = frames.length;
            lastSpan.dataset.index = frames.length - 1;
            lastSpan.addEventListener('click', () => {
                stopTimelinePlayback();
                goToFrame(frames.length - 1, false);
            });
            ticks.appendChild(lastSpan);
        }
    }
}

function goToFrame(index, animatePlot = true) {
    if (!window.FRAME_DATA || !window.FRAME_DATA.length) return;
    
    const clamped = Math.max(0, Math.min(index, window.FRAME_DATA.length - 1));
    window.currentFrameIndex = clamped;
    
    const slider = document.getElementById('frame-slider');
    const label = document.getElementById('frame-slider-label');
    
    if (slider) slider.value = clamped;
    if (label) label.textContent = clamped + 1;
    
    if (window.clearHighlight) {
        window.clearHighlight();
    }
    
    const plotEl = document.getElementById('neuraxon-plot');
    if (plotEl && plotEl._fullLayout && plotEl._fullLayout.scene && plotEl._fullLayout.scene.camera) {
        if (window.savedCamera === undefined) {
            window.savedCamera = {};
        }
        window.savedCamera = plotEl._fullLayout.scene.camera;
    }
    
    const frame = window.FRAME_DATA[clamped];
    if (frame && window.renderFrame3D) {
        window.renderFrame3D(clamped, window.FRAME_DATA);
    }
    
    if (window.renderTables) {
        window.renderTables(clamped, window.FRAME_DATA);
    }
}

function startTimelinePlayback() {
    if (!window.FRAME_DATA || !window.FRAME_DATA.length) return;
    stopTimelinePlayback();
    
    timelineInterval = setInterval(() => {
        const currentIdx = window.currentFrameIndex || 0;
        let next = currentIdx + 1;
        if (next >= window.FRAME_DATA.length) {
            next = 0;
        }
        goToFrame(next, false);
    }, 3000);
}

function stopTimelinePlayback() {
    if (timelineInterval) {
        clearInterval(timelineInterval);
        timelineInterval = null;
    }
}

function handleNeuronSearch(event) {
    if (event) event.preventDefault();
    
    const searchInput = document.getElementById('neuron-search-input');
    const feedback = document.getElementById('neuron-search-feedback');
    
    if (!searchInput || !feedback) return;
    
    const raw = searchInput.value.trim();
    if (!raw) {
        feedback.textContent = 'Enter a neuron ID to search.';
        feedback.className = 'timeline-search-feedback error';
        return;
    }
    
    if (!/^[0-9]+$/.test(raw)) {
        feedback.textContent = 'Neuron IDs must be whole numbers.';
        feedback.className = 'timeline-search-feedback error';
        return;
    }
    
    const neuronId = Number(raw);
    if (!Number.isFinite(neuronId) || neuronId < 0 || neuronId > 999999) {
        feedback.textContent = 'Neuron ID must be between 0 and 999,999.';
        feedback.className = 'timeline-search-feedback error';
        return;
    }
    
    let foundFrame = null;
    for (let i = 0; i < window.FRAME_DATA.length; i++) {
        const frame = window.FRAME_DATA[i];
        const nodes = frame.nodes || {};
        if (nodes[String(neuronId)] || nodes[neuronId]) {
            foundFrame = i;
            break;
        }
    }
    
    if (foundFrame === null) {
        feedback.textContent = `Neuron ${neuronId} not found in any frame.`;
        feedback.className = 'timeline-search-feedback error';
        return;
    }
    
    feedback.textContent = `Jumping to neuron #${neuronId} (frame ${foundFrame + 1}/${window.FRAME_DATA.length})…`;
    feedback.className = 'timeline-search-feedback success';
    
    stopTimelinePlayback();
    goToFrame(foundFrame, false);
    
    setTimeout(() => {
        if (window.selectNodeById) {
            window.selectNodeById(neuronId);
        }
        if (window.scrollToNeuronInTable) {
            setTimeout(() => {
                window.scrollToNeuronInTable(neuronId);
            }, 500);
        }
    }, 500);
}

window.setupTimeline = setupTimeline;
window.goToFrame = goToFrame;
window.startTimelinePlayback = startTimelinePlayback;
window.stopTimelinePlayback = stopTimelinePlayback;
