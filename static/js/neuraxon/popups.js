const popupContents = {
    'what-you-see': {
        title: 'Neuraxon 3D Network: Scientific Methodology',
        content: `
            <h4>Network Topology and Graph Structure</h4>
            <p>This visualization implements a <strong>3D force-directed graph layout</strong> representing the Neuraxon neural network architecture. The network consists of Qubic identities extracted from the Anna Matrix (a 128×128 numeric grid derived from the <a href="https://x.com/anna_aigarth" target="_blank">@anna_aigarth</a> response stream).</p>
            
            <h4>Mathematical Foundation</h4>
            <p>The graph <em>G = (V, E)</em> where:</p>
            <ul>
                <li><strong>V (vertices/neurons):</strong> Set of Qubic identities, each represented as a node with coordinates <em>(x, y, z)</em> computed via spherical coordinate distribution. For frames with ≤1000 nodes, NetworkX spring layout may be used as a fallback, but the default implementation uses spherical coordinates directly. See <a href="https://github.com/RideMatch1/qubic-anna-lab-public/blob/main/web/utils/neuraxon_processor.py" target="_blank">neuraxon_processor.py</a> for implementation details.</li>
                <li><strong>E (edges/synapses):</strong> Weighted connections between neurons, where edge weights <em>w ∈ ℝ</em> represent synaptic strength derived from the Neuraxon model's fast/slow/meta components. Only the top connections within each frame are displayed for performance reasons.</li>
                <li><strong>Layout algorithm:</strong> Spherical coordinate distribution using uniform angular spacing with random perturbations. For frames with ≤1000 nodes, NetworkX spring layout may be used as a fallback, but the default implementation uses spherical coordinates directly. Implementation in <a href="https://github.com/RideMatch1/qubic-anna-lab-public/blob/main/web/utils/neuraxon_processor.py" target="_blank">neuraxon_processor.py</a></li>
            </ul>
            
            <h4>Neural Network Architecture</h4>
            <p>The Neuraxon model partitions neurons into three layers:</p>
            <ul>
                <li><strong>Input layer (0-511):</strong> 512 input neurons receiving external signals</li>
                <li><strong>Hidden layer (512-895):</strong> 384 hidden neurons performing intermediate computations</li>
                <li><strong>Output layer (896-1023):</strong> 128 output neurons producing final predictions</li>
            </ul>
            <p>Each neuron's state <em>s ∈ {-1, 0, +1}</em> is computed via trinary encoding of the Real ID (60-character Qubic blockchain address). The state extraction algorithm processes the Real ID to determine whether the neuron is excitatory (+1), inhibitory (-1), or neutral (0). The exact computation method is documented in the network construction scripts.</p>
            
            <h4>Edge Weight Computation</h4>
            <p>Connection weights are calculated from three components derived from the Neuraxon neural network model:</p>
            <ul>
                <li><strong>w_fast:</strong> Fast synaptic plasticity component representing rapid ionotropic channels (e.g., AMPA-like receptors). Timescale: milliseconds. This component responds quickly to presynaptic activity.</li>
                <li><strong>w_slow:</strong> Slow synaptic plasticity component representing slower ionotropic channels (e.g., NMDA-like receptors). Timescale: seconds to minutes. This component contributes to long-term potentiation and depression.</li>
                <li><strong>w_meta:</strong> Metabotropic component representing modulatory effects with very slow timescales. This component influences postsynaptic neuron properties rather than direct signal transmission.</li>
            </ul>
            <p>The total weight <em>|w| = |w_fast + w_slow + w_meta|</em> determines edge visibility and thickness in the visualization. Strong connections (|w| > 0.5) are rendered as thick orange lines, medium connections (0.2 < |w| ≤ 0.5) as semi-transparent orange, and weak connections (0.05 < |w| ≤ 0.2) as thin gray lines. Connections with |w| ≤ 0.05 are not displayed.</p>
            <p><strong>Note:</strong> These weight components are computed by the Neuraxon model during network construction. The model implementation and weight update rules are documented in the Neuraxon framework. See <a href="https://github.com/RideMatch1/qubic-anna-lab-public/tree/main/scripts/analysis" target="_blank">scripts/analysis/</a> for the network construction code.</p>
            
            <h4>Frame-Based Rendering</h4>
            <p>The dataset is partitioned into frames (512 identities per frame) to optimize browser performance and WebGL rendering. Each frame represents a subset of the network, not a temporal snapshot. Frames are created by chunking the complete identity list into groups of 512. This partitioning is purely for visualization performance and does not reflect temporal or sequential relationships between identities.</p>
            
            <h4>Validation and Reproducibility</h4>
            <p>All extraction algorithms, network construction methods, and visualization parameters are documented in our <a href="https://github.com/RideMatch1/qubic-anna-lab-public" target="_blank">public repository</a>. The complete data pipeline, from Anna Matrix parsing to 3D layout computation, can be independently verified by:</p>
            <ol>
                <li>Reviewing the extraction scripts in <a href="https://github.com/RideMatch1/qubic-anna-lab-public/tree/main/scripts/analysis" target="_blank"><code>scripts/analysis/</code></a></li>
                <li>Examining the network data structure in <a href="https://github.com/RideMatch1/qubic-anna-lab-public/tree/main/outputs/derived" target="_blank"><code>outputs/derived/</code></a></li>
                <li>Running the visualization code in <a href="https://github.com/RideMatch1/qubic-anna-lab-public/blob/main/web/utils/neuraxon_processor.py" target="_blank"><code>web/utils/neuraxon_processor.py</code></a></li>
                <li>Validating on-chain identities via <a href="https://explorer.qubic.org" target="_blank">Qubic Explorer</a> using the provided Real IDs</li>
            </ol>
            <p><strong>Repository:</strong> <a href="https://github.com/RideMatch1/qubic-anna-lab-public" target="_blank">github.com/RideMatch1/qubic-anna-lab-public</a></p>
            
            <h4>Interactive Camera System</h4>
            <p>The visualization uses Plotly.js's WebGL renderer with a 3D camera system. Camera state (eye position, center, up vector) is preserved across frame transitions using <code>plotly_relayout</code> event handlers, ensuring continuous exploration without view reset.</p>
            
            <h4>References</h4>
            <ul>
                <li>NetworkX Documentation: <a href="https://networkx.org/documentation/stable/reference/generated/networkx.spring_layout.html" target="_blank">Spring Layout Algorithm</a></li>
                <li>Plotly.js 3D Scatter: <a href="https://plotly.com/javascript/3d-scatter-plots/" target="_blank">3D Scatter Plot API</a></li>
                <li>Qubic Protocol Specification: <a href="https://qubic.org" target="_blank">Qubic.org</a></li>
                <li>Source Code Repository: <a href="https://github.com/RideMatch1/qubic-anna-lab-public" target="_blank">GitHub Repository</a></li>
            </ul>
        `
    },
    'what-is-this': {
        title: 'What is this visualization?',
        content: `
            <h4>Simple explanation</h4>
            <p>This 3D visualization shows Qubic identities that were discovered hidden in the Anna Matrix. Think of it like finding a secret message in a puzzle - we extracted these identities from patterns in AI chatbot responses.</p>
            
            <h4>What is the Anna Matrix?</h4>
            <p>The Anna Matrix is a 128×128 grid of numbers created from all the public responses from <a href="https://x.com/anna_aigarth" target="_blank">@anna_aigarth</a> on X (Twitter). By following specific patterns through this grid, we found Qubic identities.</p>
            
            <h4>How were they found?</h4>
            <p>Here's the process in simple terms:</p>
            <ol>
                <li><strong>Step 1:</strong> We collected all the chatbot's public replies and arranged them into a grid (the Anna Matrix).</li>
                <li><strong>Step 2:</strong> We followed specific paths through this grid (like walking along diagonal lines or in spiral patterns) to extract 55-character "seeds".</li>
                <li><strong>Step 3:</strong> Each seed was converted into a 60-character Qubic identity using the standard Qubic protocol.</li>
                <li><strong>Step 4:</strong> We checked each identity on the Qubic blockchain. Most were valid - they exist on-chain with zero balance and correct checksums. Validation results are documented in our <a href="https://github.com/RideMatch1/qubic-anna-lab-public/tree/main/outputs/reports" target="_blank">public repository</a>.</li>
            </ol>
            
            <h4>Why is this important?</h4>
            <p>These identities weren't randomly generated - they were systematically extracted from a specific pattern. This suggests the Anna Matrix contains encoded information that follows a deliberate structure.</p>
        `
    },
    'what-are-neurons': {
        title: 'Understanding the Colored Dots',
        content: `
            <h4>What are these dots?</h4>
            <p>Each colored dot (we call them "neurons") represents one Qubic identity that was found in the Anna Matrix. The term "neuron" comes from the Neuraxon model we use to organize these identities, similar to how neurons work in a brain network.</p>
            
            <h4>What do the colors mean?</h4>
            <p>The colors tell you two things about each identity:</p>
            
            <h4>By Type (the identity's position):</h4>
            <ul>
                <li><strong style="color: #f97316;">Orange dots</strong> = Input neurons (the first 512 identities, numbered 0-511). These are like the "input layer" of the network.</li>
                <li><strong style="color: #3b82f6;">Blue dots</strong> = Hidden neurons (identities numbered 512-895). These are in the "middle layer" of the network.</li>
                <li><strong style="color: #14b8a6;">Teal dots</strong> = Output neurons (identities numbered 896-1023). These are the "output layer" of the network.</li>
            </ul>
            
            <h4>By State (special properties):</h4>
            <p>Some identities have special states that override their type color:</p>
            <ul>
                <li><strong style="color: #ef4444;">Red dots</strong> = State +1 (excitatory). These have a positive trinary state.</li>
                <li><strong style="color: #3b82f6;">Blue dots</strong> = State -1 (inhibitory). These have a negative trinary state.</li>
                <li>If an identity has state 0, it shows its type color (orange, blue, or teal) instead.</li>
            </ul>
            
            <h4>What is "State"?</h4>
            <p>The state is a value (-1, 0, or +1) that we calculate from the Real ID (the actual Qubic blockchain address). It's like a property of that identity that tells us something about its characteristics. We extract this using a specific mathematical process.</p>
        `
    },
    'neuron-table-info': {
        title: 'Neuron Table: Data Schema and Validation',
        content: `
            <h4>Table Schema</h4>
            <p>This table displays the complete metadata for each neuron (Qubic identity) in the current frame. All data is extracted from the Anna Matrix and validated on-chain.</p>
            
            <h4>Column Definitions</h4>
            <ul>
                <li><strong>Neuron ID:</strong> Internal graph index (0-1023) representing the neuron's position in the Neuraxon network architecture. Defined in <a href="https://github.com/RideMatch1/qubic-anna-lab-public/blob/main/web/utils/neuraxon_processor.py" target="_blank">neuraxon_processor.py</a></li>
                <li><strong>Real ID:</strong> The 60-character Qubic blockchain address (Base-26 encoded). Validated via <a href="https://explorer.qubic.org" target="_blank">Qubic Explorer</a> API. Extraction method documented in <a href="https://github.com/RideMatch1/qubic-anna-lab-public/tree/main/scripts/analysis" target="_blank">scripts/analysis/</a></li>
                <li><strong>Seed (priv):</strong> The 55-character seed string extracted from the Anna Matrix using diagonal and vortex traversal patterns. See <a href="https://github.com/RideMatch1/qubic-anna-lab-public/tree/main/scripts/analysis" target="_blank">extraction algorithms</a></li>
                <li><strong>Seed Hash:</strong> SHA256 cryptographic hash of the seed. Used for integrity verification. Hash computation in <a href="https://github.com/RideMatch1/qubic-anna-lab-public/tree/main/web/utils" target="_blank">web/utils/</a></li>
                <li><strong>Doc ID:</strong> Matrix coordinate tag (e.g., "A1", "B2") indicating the extraction location in the 128×128 Anna Matrix. Coordinate system defined in <a href="https://github.com/RideMatch1/qubic-anna-lab-public/tree/main/outputs/derived" target="_blank">outputs/derived/</a></li>
                <li><strong>State:</strong> Trinary value <em>s ∈ {-1, 0, +1}</em> derived from the Real ID using trinary encoding. State computation algorithm in <a href="https://github.com/RideMatch1/qubic-anna-lab-public/blob/main/web/utils/neuraxon_processor.py" target="_blank">neuraxon_processor.py</a></li>
            </ul>
            
            <h4>Data Validation</h4>
            <p>All identities are validated on-chain via the Qubic Explorer API. Validation results and statistics are available in <a href="https://github.com/RideMatch1/qubic-anna-lab-public/tree/main/outputs/reports" target="_blank">outputs/reports/</a></p>
            
            <h4>Repository Links</h4>
            <ul>
                <li><a href="https://github.com/RideMatch1/qubic-anna-lab-public" target="_blank">Main Repository</a></li>
                <li><a href="https://github.com/RideMatch1/qubic-anna-lab-public/tree/main/scripts/analysis" target="_blank">Extraction Scripts</a></li>
                <li><a href="https://github.com/RideMatch1/qubic-anna-lab-public/tree/main/web/utils" target="_blank">Visualization Code</a></li>
            </ul>
        `
    },
    'connection-table-info': {
        title: 'Synapse Table: Weighted Graph Edges',
        content: `
            <h4>Graph Edge Representation</h4>
            <p>This table displays the weighted edges <em>E</em> of the Neuraxon graph <em>G = (V, E)</em>. Each row represents a synaptic connection between two neurons with associated weight components.</p>
            
            <h4>Column Definitions</h4>
            <ul>
                <li><strong>From → To:</strong> Directed edge <em>(v_i, v_j)</em> where <em>v_i</em> is the presynaptic neuron (source) and <em>v_j</em> is the postsynaptic neuron (destination). Neuron IDs correspond to indices in the Neuraxon architecture. Edge computation in <a href="https://github.com/RideMatch1/qubic-anna-lab-public/blob/main/web/utils/neuraxon_processor.py" target="_blank">neuraxon_processor.py</a></li>
                <li><strong>|weight|:</strong> Absolute synaptic weight <em>|w| = |w_fast + w_slow + w_meta|</em> where <em>w ∈ ℝ</em>. Higher values indicate stronger connections and are rendered as thicker edges in the visualization. Weight calculation documented in <a href="https://github.com/RideMatch1/qubic-anna-lab-public/tree/main/scripts/analysis" target="_blank">scripts/analysis/</a></li>
                <li><strong>Type:</strong> Synapse classification string indicating the connection type based on the Neuraxon model's synaptic plasticity rules (e.g., "IONOTROPIC_FAST", "IONOTROPIC_SLOW", "METABOTROPIC", "SILENT"). The type is determined by the relative magnitudes of w_fast, w_slow, w_meta and synapse properties. Classification algorithm documented in the Neuraxon model implementation.</li>
                <li><strong>w_fast:</strong> Fast synaptic plasticity component representing rapid ionotropic channels (AMPA-like). Timescale: milliseconds. This value is computed by the Neuraxon model during network construction. See <a href="https://github.com/RideMatch1/qubic-anna-lab-public/tree/main/scripts/analysis" target="_blank">analysis scripts</a> for network construction code.</li>
                <li><strong>w_slow:</strong> Slow synaptic plasticity component representing slower ionotropic channels (NMDA-like). Timescale: seconds to minutes. This value is computed by the Neuraxon model. See <a href="https://github.com/RideMatch1/qubic-anna-lab-public/tree/main/outputs/derived" target="_blank">derived data</a> for the network JSON structure.</li>
                <li><strong>w_meta:</strong> Metabotropic component representing modulatory effects with very slow timescales. This value is computed by the Neuraxon model and influences postsynaptic neuron properties. See <a href="https://github.com/RideMatch1/qubic-anna-lab-public/tree/main/scripts/analysis" target="_blank">analysis scripts</a> for computation details.</li>
            </ul>
            
            <h4>Network Topology</h4>
            <p>Edges are sorted by absolute weight in descending order. Strong connections (high <em>|w|</em>) indicate neurons with significant functional relationships in the Neuraxon network. The visualization renders edges with opacity and thickness proportional to weight magnitude.</p>
            
            <h4>Repository Links</h4>
            <ul>
                <li><a href="https://github.com/RideMatch1/qubic-anna-lab-public" target="_blank">Main Repository</a></li>
                <li><a href="https://github.com/RideMatch1/qubic-anna-lab-public/blob/main/web/utils/neuraxon_processor.py" target="_blank">Edge Processing Code</a></li>
                <li><a href="https://github.com/RideMatch1/qubic-anna-lab-public/tree/main/outputs/derived" target="_blank">Network Data</a></li>
            </ul>
        `
    },
    'frame-slider-info': {
        title: 'Frame Timeline: Data Partitioning for Visualization',
        content: `
            <h4>Frame-Based Rendering Architecture</h4>
            <p>The dataset is partitioned into frames, each containing up to 512 neurons. This partitioning strategy optimizes browser performance by limiting DOM complexity and WebGL rendering load per frame. The exact number of frames depends on the total number of identities. <strong>Important:</strong> This partitioning is for visualization performance only and does not represent temporal or sequential relationships between identities.</p>
            
            <h4>Mathematical Partitioning</h4>
            <p>Given total neurons <em>N</em> and frame size <em>F = 512</em>, the number of frames is <em>⌈N/F⌉</em>. Frame <em>i</em> contains neurons with indices <em>[i·F, min((i+1)·F, N))</em>. The last frame may contain fewer than 512 neurons if <em>N</em> is not divisible by 512.</p>
            
            <h4>Implementation Details</h4>
            <ul>
                <li><strong>Frame Extraction:</strong> Implemented in <a href="https://github.com/RideMatch1/qubic-anna-lab-public/blob/main/web/utils/neuraxon_processor.py" target="_blank">neuraxon_processor.py</a> using <code>extract_frames()</code> function</li>
                <li><strong>Timeline Control:</strong> JavaScript implementation in <a href="https://github.com/RideMatch1/qubic-anna-lab-public/blob/main/web/static/js/neuraxon/timeline.js" target="_blank">timeline.js</a></li>
                <li><strong>Frame Data Structure:</strong> Each frame contains <code>nodes</code>, <code>connections</code>, and <code>display_nodes</code> arrays. Schema documented in <a href="https://github.com/RideMatch1/qubic-anna-lab-public/tree/main/outputs/derived" target="_blank">outputs/derived/</a></li>
            </ul>
            
            <h4>Interactive Controls</h4>
            <ul>
                <li><strong>Slider:</strong> Continuous frame navigation via HTML5 range input with debounced updates</li>
                <li><strong>Frame Ticks:</strong> Discrete frame selection via clickable numeric labels</li>
                <li><strong>Playback:</strong> Automated frame progression using <code>setInterval()</code> with 3-second intervals</li>
                <li><strong>Neuron Search:</strong> Binary search algorithm to locate neuron ID across frames. Implementation in <a href="https://github.com/RideMatch1/qubic-anna-lab-public/blob/main/web/static/js/neuraxon/timeline.js" target="_blank">timeline.js</a></li>
            </ul>
            
            <h4>Performance Optimization</h4>
            <p>Frame-based rendering reduces initial load time and memory usage. Each frame is loaded on-demand via the <code>/api/neuraxon-data</code> endpoint, which implements frame extraction with caching. See <a href="https://github.com/RideMatch1/qubic-anna-lab-public/blob/main/web/app.py" target="_blank">app.py</a> for API implementation.</p>
            
            <h4>Repository Links</h4>
            <ul>
                <li><a href="https://github.com/RideMatch1/qubic-anna-lab-public" target="_blank">Main Repository</a></li>
                <li><a href="https://github.com/RideMatch1/qubic-anna-lab-public/blob/main/web/utils/neuraxon_processor.py" target="_blank">Frame Processing</a></li>
                <li><a href="https://github.com/RideMatch1/qubic-anna-lab-public/blob/main/web/static/js/neuraxon/timeline.js" target="_blank">Timeline Implementation</a></li>
            </ul>
        `
    },
    'experiments-info': {
        title: 'Interactive challenges',
        content: `
            <p>Turn the visualization into a hands-on lab:</p>
            <ol>
                <li><strong>Checksum hunter</strong>: Select any neuron, copy its seed, edit a single character, and paste the mutated string into the explorer.</li>
                <li><strong>Explorer reality check</strong>: Copy a seed, import it into the official Qubic wallet, and inspect the same identity in the explorer.</li>
                <li><strong>Cluster scout</strong>: Use the connection table to identify clusters of identities with strong connections.</li>
            </ol>
        `
    },
    'why-special': {
        title: 'Evidence snapshot',
        content: `
            <h4>Key facts</h4>
            <ul>
                <li>Identities from the Anna Matrix were validated on-chain via the Qubic Explorer. Validation results and statistics are documented in <a href="https://github.com/RideMatch1/qubic-anna-lab-public/tree/main/outputs/reports" target="_blank">outputs/reports/</a></li>
                <li>Random control matrices produced zero explorer-valid identities under identical extraction rules.</li>
                <li>Dataset, scripts, and reports are versioned in the <a href="https://github.com/RideMatch1/qubic-anna-lab-public" target="_blank">public repository</a> so the results can be replayed offline.</li>
            </ul>
        `
    }
};

function openPopup(popupId) {
    const popup = popupContents[popupId];
    if (!popup) {
        return;
    }
    
    const overlay = document.getElementById('popup-overlay');
    const titleEl = document.getElementById('popup-title');
    const bodyEl = document.getElementById('popup-body');
    
    if (!overlay || !titleEl || !bodyEl) {
        return;
    }
    
    titleEl.textContent = popup.title;
    bodyEl.innerHTML = popup.content;
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closePopup() {
    const overlay = document.getElementById('popup-overlay');
    if (overlay) {
        overlay.classList.remove('active');
    }
    document.body.style.overflow = '';
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closePopup();
    }
});

window.openPopup = openPopup;
window.closePopup = closePopup;
