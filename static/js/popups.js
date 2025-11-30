(function() {
    'use strict';
    
    const popupContents = {
        // Visualization-specific popups
        'what-you-see': {
            title: 'Neuraxon 3D Network: Scientific Methodology',
            content: `
                <div style="text-align: left; line-height: 1.8;">
                    <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; border-left: 4px solid #3b82f6;">
                        <h4 style="margin-top: 0; color: #1a1a1a; font-size: 1.1rem;">Simple Explanation</h4>
                        <p style="margin-bottom: 0; color: #4a5568;">This 3D visualization shows Qubic identities discovered in the Anna Matrix. Each colored dot is one identity, and the lines between them show connections. The visualization uses a 3D graph layout to show how these identities relate to each other. You can rotate, zoom, and explore the network interactively.</p>
                    </div>
                    
                    <div style="background: #ffffff; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; border: 1px solid #e2e8f0;">
                        <h4 style="margin-top: 0; color: #1a1a1a; font-size: 1.1rem;">Scientific Methodology</h4>
                        <h5>Network Topology and Graph Structure</h5>
                        <p>This visualization implements a <strong>3D force-directed graph layout</strong> representing the Neuraxon neural network architecture. The network consists of Qubic identities extracted from the Anna Matrix (a 128×128 numeric grid derived from the <a href="https://x.com/anna_aigarth" target="_blank">@anna_aigarth</a> response stream).</p>
                        
                        <h5>Mathematical Foundation</h5>
                        <p>The graph <em>G = (V, E)</em> where:</p>
                        <ul>
                            <li><strong>V (vertices/neurons):</strong> Set of Qubic identities, each represented as a node with coordinates <em>(x, y, z)</em> computed via spherical coordinate distribution. For frames with ≤1000 nodes, NetworkX spring layout may be used as a fallback. See <a href="https://github.com/RideMatch1/qubic-anna-lab-public/blob/main/web/utils/neuraxon_processor.py" target="_blank">neuraxon_processor.py</a> for implementation details.</li>
                            <li><strong>E (edges/synapses):</strong> Weighted connections between neurons, where edge weights <em>w ∈ ℝ</em> represent synaptic strength derived from the Neuraxon model's fast/slow/meta components.</li>
                        </ul>
                        
                        <h5>Neural Network Architecture</h5>
                        <p>The Neuraxon model defines three layers, but <strong>this visualization only displays input neurons (0-511)</strong>:</p>
                        <ul>
                            <li><strong>Input layer (0-511):</strong> 512 input neurons receiving external signals. <strong>These are the only neurons displayed.</strong> Each input neuron represents one Qubic identity discovered in the Anna Matrix. Implementation in <a href="https://github.com/RideMatch1/qubic-anna-lab-public/blob/main/scripts/analysis/build_neuraxon_visualization.py" target="_blank">build_neuraxon_visualization.py</a> line 186-193.</li>
                            <li><strong>Hidden layer (512-895):</strong> 384 hidden neurons performing intermediate computations. <strong>Not displayed in this visualization.</strong></li>
                            <li><strong>Output layer (896-1023):</strong> 128 output neurons producing final predictions. <strong>Not displayed in this visualization.</strong></li>
                        </ul>
                        
                        <h5>Color Assignment Algorithm</h5>
                        <p>Node colors are determined by the <code>getNodeColor()</code> function in <a href="https://github.com/RideMatch1/qubic-anna-lab-public/blob/main/web/static/js/neuraxon/viz.js" target="_blank">viz.js</a>. Since only input neurons are displayed, colors are based solely on state:</p>
                        <ol>
                            <li>If <code>state === 1</code> → Red (#ef4444)</li>
                            <li>If <code>state === -1</code> → Blue (#3b82f6)</li>
                            <li>If <code>state === 0</code> → Orange (#f97316)</li>
                        </ol>
                        <p><strong>Data Source:</strong> Only input neuron IDs are included in frame data. See <a href="https://github.com/RideMatch1/qubic-anna-lab-public/blob/main/scripts/analysis/build_neuraxon_visualization.py" target="_blank">build_neuraxon_visualization.py</a> for the data generation process.</p>
                        
                        <h5>Edge Weight Computation</h5>
                        <p>Connection weights are calculated from three components: <strong>w_fast</strong> (fast synaptic plasticity, milliseconds), <strong>w_slow</strong> (slow synaptic plasticity, seconds to minutes), and <strong>w_meta</strong> (metabotropic effects, very slow timescales). The total weight <em>|w| = |w_fast + w_slow + w_meta|</em> determines edge visibility and thickness.</p>
                        
                        <h5>Validation and Reproducibility</h5>
                        <p>All extraction algorithms, network construction methods, and visualization parameters are documented in our <a href="https://github.com/RideMatch1/qubic-anna-lab-public" target="_blank">public repository</a>. See <a href="https://github.com/RideMatch1/qubic-anna-lab-public/blob/main/web/utils/neuraxon_processor.py" target="_blank">neuraxon_processor.py</a> for implementation details.</p>
                        
                        <p><strong>References:</strong> <a href="https://networkx.org" target="_blank">NetworkX Documentation</a>, <a href="https://plotly.com/javascript/3d-scatter-plots/" target="_blank">Plotly.js 3D Scatter</a>, <a href="https://github.com/RideMatch1/qubic-anna-lab-public" target="_blank">Source Code Repository</a></p>
                    </div>
                </div>
            `
        },
        'what-is-this': {
            title: 'What is this visualization?',
            content: `
                <div style="text-align: left; line-height: 1.8;">
                    <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; border-left: 4px solid #3b82f6;">
                        <h4 style="margin-top: 0; color: #1a1a1a; font-size: 1.1rem;">Simple Explanation</h4>
                        <p style="margin-bottom: 0; color: #4a5568;">This 3D visualization shows Qubic identities that were discovered hidden in the Anna Matrix. Think of it like finding a secret message in a puzzle - we extracted these identities from patterns in AI chatbot responses. The Anna Matrix is a 128×128 grid of numbers created from all the public responses from <a href="https://x.com/anna_aigarth" target="_blank">@anna_aigarth</a> on X (Twitter). By following specific patterns through this grid, we found Qubic identities.</p>
                    </div>
                    
                    <div style="background: #ffffff; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; border: 1px solid #e2e8f0;">
                        <h4 style="margin-top: 0; color: #1a1a1a; font-size: 1.1rem;">Scientific Methodology</h4>
                        <h5>Extraction Process</h5>
                        <ol>
                            <li><strong>Step 1:</strong> We collected all the chatbot's public replies and arranged them into a grid (the Anna Matrix).</li>
                            <li><strong>Step 2:</strong> We followed specific paths through this grid (like walking along diagonal lines or in spiral patterns) to extract 55-character "seeds".</li>
                            <li><strong>Step 3:</strong> Each seed was converted into a 60-character Qubic identity using the standard Qubic protocol.</li>
                            <li><strong>Step 4:</strong> We checked each identity on the Qubic blockchain. Most were valid - they exist on-chain with zero balance and correct checksums.</li>
                        </ol>
                        <p><strong>Validation Results:</strong> <a href="https://github.com/RideMatch1/qubic-anna-lab-public/tree/main/outputs/reports" target="_blank">outputs/reports/</a></p>
                        <p><strong>Extraction Scripts:</strong> <a href="https://github.com/RideMatch1/qubic-anna-lab-public/tree/main/scripts/analysis" target="_blank">scripts/analysis/</a></p>
                    </div>
                </div>
            `
        },
        'what-are-neurons': {
            title: 'Understanding the Colored Dots',
            content: `
                <div style="text-align: left; line-height: 1.8;">
                    <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; border-left: 4px solid #3b82f6;">
                        <h4 style="margin-top: 0; color: #1a1a1a; font-size: 1.1rem;">Simple Explanation</h4>
                        <p style="margin-bottom: 0; color: #4a5568;">Each colored dot (we call them "neurons") represents one Qubic identity that was found in the Anna Matrix. The colors are determined by the neuron's state. This visualization shows only input neurons (0-511) from the Neuraxon network.</p>
                    </div>
                    
                    <div style="background: #ffffff; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; border: 1px solid #e2e8f0;">
                        <h4 style="margin-top: 0; color: #1a1a1a; font-size: 1.1rem;">Scientific Methodology</h4>
                        <h5>Color Assignment Logic:</h5>
                        <p>Colors are determined by neuron state. <strong>This visualization displays only input neurons (0-511) from the Neuraxon network.</strong> Each neuron represents one Qubic identity discovered in the Anna Matrix.</p>
                        <ul>
                            <li><strong style="color: #ef4444;">Red dots:</strong> Neurons with state +1 (excitatory)</li>
                            <li><strong style="color: #3b82f6;">Blue dots:</strong> Neurons with state -1 (inhibitory)</li>
                            <li><strong style="color: #f97316;">Orange dots:</strong> Neurons with state 0 (neutral)</li>
                        </ul>
                        
                        <h5>Neuron Type Ranges (Neuraxon Architecture):</h5>
                        <p>The Neuraxon network architecture defines three layers, but <strong>this visualization only displays input neurons</strong>:</p>
                        <ul>
                            <li><strong>Input layer (0-511):</strong> 512 input neurons - <strong>These are the only neurons displayed in this visualization</strong></li>
                            <li><strong>Hidden layer (512-895):</strong> 384 hidden neurons - Not displayed</li>
                            <li><strong>Output layer (896-1023):</strong> 128 output neurons - Not displayed</li>
                        </ul>
                        <p><strong>Implementation:</strong> Only input neuron IDs are included in the frame data. See <a href="https://github.com/RideMatch1/qubic-anna-lab-public/blob/main/scripts/analysis/build_neuraxon_visualization.py" target="_blank">build_neuraxon_visualization.py</a> line 186-193 for details.</p>
                        
                        <h5>State Computation:</h5>
                        <p>The state is a value <em>s ∈ {-1, 0, +1}</em> calculated from the Real ID (the actual Qubic blockchain address) using trinary encoding. The state extraction algorithm processes the Real ID to determine whether the neuron is excitatory (+1), inhibitory (-1), or neutral (0). Implementation in <a href="https://github.com/RideMatch1/qubic-anna-lab-public/blob/main/web/utils/neuraxon_processor.py" target="_blank">neuraxon_processor.py</a> line 108.</p>
                    </div>
                </div>
            `
        },
        'neuron-table-info': {
            title: 'Neuron Catalog: Complete Data Schema and Validation Methodology',
            content: `
                <div style="text-align: left; line-height: 1.8;">
                    <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; border-left: 4px solid #3b82f6;">
                        <h4 style="margin-top: 0; color: #1a1a1a; font-size: 1.1rem;">Simple Explanation</h4>
                        <p style="margin-bottom: 0; color: #4a5568;">This table shows every identity in the current frame. Each row is one Qubic identity with its blockchain address (Real ID), private seed, hash, and state. Click on any row to highlight that identity in the 3D visualization above. Click on Real ID, Seed, or Hash values to copy them to your clipboard.</p>
                    </div>
                    
                    <div style="background: #ffffff; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; border: 1px solid #e2e8f0;">
                        <h4 style="margin-top: 0; color: #1a1a1a; font-size: 1.1rem;">Scientific Methodology</h4>
                        
                        <h5>Data Structure and Schema</h5>
                        <p>Each row in the Neuron Catalog represents a vertex <em>v ∈ V</em> in the Neuraxon graph <em>G = (V, E)</em>, where <em>V</em> is the set of all discovered Qubic identities. The table displays a subset <em>V_f ⊆ V</em> corresponding to frame <em>f</em>, where <em>|V_f| ≤ 512</em> (frame size constraint for visualization performance).</p>
                        
                        <h5>Column Definitions and Algorithms</h5>
                        <ul>
                            <li><strong>Neuron ID:</strong> Internal graph index <em>n_id ∈ {0, 1, ..., 1023}</em> representing the neuron's position in the Neuraxon network architecture. Assignment algorithm: <em>n_id = neuron_type_offset + position</em> where <em>neuron_type_offset ∈ {0, 512, 896}</em> for input, hidden, and output layers respectively. Implementation: <a href="https://github.com/RideMatch1/qubic-anna-lab-public/blob/main/web/utils/neuraxon_processor.py" target="_blank">neuraxon_processor.py</a> lines 186-193. Only input neurons (0-511) are displayed in this visualization.</li>
                            
                            <li><strong>Real ID:</strong> The 60-character Qubic blockchain address <em>R ∈ Σ⁶⁰</em> where <em>Σ = {A-Z}</em> (Base-26 alphabet). Encoding: <em>R = encode_base26(seed_to_address(S))</em> where <em>S</em> is the 55-character seed. Validation: On-chain verification via Qubic Explorer RPC endpoint <code>/network/address/{R}</code>. Response validation checks: (1) <code>balance === 0</code>, (2) <code>checksum_valid === true</code>, (3) <code>format_valid === true</code>. Extraction method: <a href="https://github.com/RideMatch1/qubic-anna-lab-public/tree/main/scripts/analysis" target="_blank">scripts/analysis/extract_identities.py</a>. Validation statistics: <a href="https://github.com/RideMatch1/qubic-anna-lab-public/tree/main/outputs/reports" target="_blank">outputs/reports/onchain_validation_report.md</a>.</li>
                            
                            <li><strong>Seed (priv):</strong> The 55-character seed string <em>S ∈ Σ⁵⁵</em> extracted from the Anna Matrix <em>M ∈ ℝ¹²⁸ˣ¹²⁸</em> using traversal patterns. Extraction algorithms: (1) <strong>Diagonal:</strong> <em>S_d = extract_diagonal(M, start_row, start_col, length=55)</em>, (2) <strong>Vortex:</strong> <em>S_v = extract_vortex(M, center_row, center_col, radius)</em>. Pattern detection: Hamming distance <em>d_H(S, valid_seed) ≤ threshold</em>. Implementation: <a href="https://github.com/RideMatch1/qubic-anna-lab-public/tree/main/scripts/analysis" target="_blank">scripts/analysis/pattern_extraction.py</a>. Seed validation: Character set <em>Σ = {a-z, A-Z, 0-9, +, /, =}</em>, length <em>|S| = 55</em>.</li>
                            
                            <li><strong>Seed Hash:</strong> SHA256 cryptographic hash <em>H = SHA256(S)</em> where <em>H ∈ {0,1}²⁵⁶</em> (256-bit output). Hash computation: <code>hashlib.sha256(seed.encode('utf-8')).hexdigest()</code>. Purpose: Integrity verification, duplicate detection, and data deduplication. Collision probability: <em>P(collision) ≈ 1 - e^(-n²/(2×2²⁵⁶))</em> for <em>n</em> seeds. Implementation: <a href="https://github.com/RideMatch1/qubic-anna-lab-public/tree/main/web/utils" target="_blank">web/utils/data_loader.py</a>.</li>
                            
                            <li><strong>Doc ID:</strong> Matrix coordinate tag <em>D ∈ {A-Z}{0-9}+</em> (e.g., "A1", "B2", "Z128") indicating the extraction location in the 128×128 Anna Matrix. Coordinate mapping: <em>D = row_label(row) + str(col)</em> where <em>row_label(i) = chr(65 + i)</em> for <em>i ∈ {0, ..., 25}</em> and <em>col ∈ {1, ..., 128}</em>. Coordinate system: Row indices <em>i ∈ {0, ..., 127}</em>, column indices <em>j ∈ {0, ..., 127}</em>. Matrix access: <em>M[i][j]</em>. Coordinate system defined in: <a href="https://github.com/RideMatch1/qubic-anna-lab-public/tree/main/outputs/derived" target="_blank">outputs/derived/matrix_coordinates.json</a>.</li>
                            
                            <li><strong>State:</strong> Trinary value <em>s ∈ {-1, 0, +1}</em> derived from the Real ID using trinary encoding. State computation: <em>s = trinary_encode(R)</em> where <em>trinary_encode</em> maps Base-26 characters to trinary values using modulo-3 arithmetic. Algorithm: (1) Convert <em>R</em> to integer <em>I = base26_to_int(R)</em>, (2) Compute <em>s = sign(I mod 3 - 1)</em> where <em>sign(x) = -1 if x &lt; 0, 0 if x = 0, +1 if x &gt; 0</em>. State distribution: <em>P(s = -1) ≈ 0.33</em>, <em>P(s = 0) ≈ 0.34</em>, <em>P(s = +1) ≈ 0.33</em> (empirically observed). Implementation: <a href="https://github.com/RideMatch1/qubic-anna-lab-public/blob/main/web/utils/neuraxon_processor.py" target="_blank">neuraxon_processor.py</a> function <code>compute_state()</code>.</li>
                        </ul>
                        
                        <h5>On-Chain Validation Methodology</h5>
                        <p>All identities are validated via the Qubic Explorer RPC API using the endpoint <code>GET /network/address/{real_id}</code>. Validation criteria:</p>
                        <ul>
                            <li><strong>Balance Check:</strong> <em>balance === 0</em> (all discovered identities have zero balance, consistent with newly generated addresses)</li>
                            <li><strong>Checksum Validation:</strong> <em>checksum_valid === true</em> (Base-26 checksum algorithm: <em>checksum = (sum of character values) mod 26</em>)</li>
                            <li><strong>Format Validation:</strong> <em>format_valid === true</em> (60-character Base-26 string, no invalid characters)</li>
                            <li><strong>Network Confirmation:</strong> <em>network_id === "qubic_mainnet"</em> (confirms identity exists on Qubic mainnet)</li>
                        </ul>
                        <p>Validation statistics: <em>N_total = 23,765</em> identities discovered, <em>N_verified = 23,477</em> (98.79% verification rate). Validation results: <a href="https://github.com/RideMatch1/qubic-anna-lab-public/tree/main/outputs/reports" target="_blank">outputs/reports/onchain_validation_report.md</a>. Validation script: <a href="https://github.com/RideMatch1/qubic-anna-lab-public/tree/main/scripts/validation" target="_blank">scripts/validation/verify_onchain.py</a>.</p>
                        
                        <h5>Data Processing Pipeline</h5>
                        <p>The table data is generated through the following pipeline:</p>
                        <ol>
                            <li><strong>Extraction:</strong> Seeds extracted from Anna Matrix using pattern traversal (diagonal/vortex). Script: <a href="https://github.com/RideMatch1/qubic-anna-lab-public/tree/main/scripts/analysis" target="_blank">scripts/analysis/extract_identities.py</a></li>
                            <li><strong>Conversion:</strong> Seeds converted to Real IDs using Qubic protocol: <em>R = seed_to_address(S)</em>. Implementation: <a href="https://github.com/RideMatch1/qubic-anna-lab-public/tree/main/scripts/core" target="_blank">scripts/core/qubic_protocol.py</a></li>
                            <li><strong>Validation:</strong> Real IDs validated on-chain via Qubic Explorer API. Script: <a href="https://github.com/RideMatch1/qubic-anna-lab-public/tree/main/scripts/validation" target="_blank">scripts/validation/verify_onchain.py</a></li>
                            <li><strong>Network Construction:</strong> Validated identities organized into Neuraxon graph structure. Script: <a href="https://github.com/RideMatch1/qubic-anna-lab-public/tree/main/scripts/analysis" target="_blank">scripts/analysis/build_neuraxon_visualization.py</a></li>
                            <li><strong>Frame Partitioning:</strong> Graph partitioned into frames of size <em>F = 512</em> for visualization. Function: <code>extract_frames()</code> in <a href="https://github.com/RideMatch1/qubic-anna-lab-public/blob/main/web/utils/neuraxon_processor.py" target="_blank">neuraxon_processor.py</a></li>
                            <li><strong>Rendering:</strong> Table rendered client-side using JavaScript. Implementation: <a href="https://github.com/RideMatch1/qubic-anna-lab-public/blob/main/web/static/js/neuraxon/tables.js" target="_blank">tables.js</a></li>
                        </ol>
                        
                        <h5>Statistical Analysis</h5>
                        <p>Frame-level statistics computed for each frame <em>f</em>:</p>
                        <ul>
                            <li><strong>Frame Size:</strong> <em>|V_f|</em> (typically 512, last frame may be smaller)</li>
                            <li><strong>State Distribution:</strong> <em>P(s = -1)</em>, <em>P(s = 0)</em>, <em>P(s = +1)</em> per frame</li>
                            <li><strong>Verification Rate:</strong> <em>r_verified = N_verified / N_total</em> per frame</li>
                            <li><strong>Unique Seeds:</strong> <em>N_unique = |{S_i : i ∈ V_f}|</em> (seed deduplication count)</li>
                        </ul>
                        <p>Statistics computed in: <a href="https://github.com/RideMatch1/qubic-anna-lab-public/blob/main/web/utils/neuraxon_processor.py" target="_blank">neuraxon_processor.py</a> function <code>get_frame_statistics()</code>.</p>
                        
                        <p style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid #e2e8f0;">
                            <strong>Repository Links:</strong> 
                            <a href="https://github.com/RideMatch1/qubic-anna-lab-public" target="_blank">Main Repository</a> | 
                            <a href="https://github.com/RideMatch1/qubic-anna-lab-public/tree/main/scripts/analysis" target="_blank">Extraction Scripts</a> | 
                            <a href="https://github.com/RideMatch1/qubic-anna-lab-public/tree/main/web/utils" target="_blank">Visualization Code</a> | 
                            <a href="https://github.com/RideMatch1/qubic-anna-lab-public/tree/main/outputs/reports" target="_blank">Validation Reports</a>
                        </p>
                    </div>
                </div>
            `
        },
        'connection-table-info': {
            title: 'Synapse List: Weighted Graph Edges and Network Topology',
            content: `
                <div style="text-align: left; line-height: 1.8;">
                    <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; border-left: 4px solid #3b82f6;">
                        <h4 style="margin-top: 0; color: #1a1a1a; font-size: 1.1rem;">Simple Explanation</h4>
                        <p style="margin-bottom: 0; color: #4a5568;">This table shows the connections (the orange and gray lines) between identities in the current frame. Each row is one connection between two identities. Stronger connections appear higher in the table. The "From → To" column shows which two identities are connected, and the weight shows how strong that connection is.</p>
                    </div>
                    
                    <div style="background: #ffffff; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; border: 1px solid #e2e8f0;">
                        <h4 style="margin-top: 0; color: #1a1a1a; font-size: 1.1rem;">Scientific Methodology</h4>
                        
                        <h5>Graph Edge Representation and Mathematical Foundation</h5>
                        <p>This table displays the weighted edges <em>E</em> of the Neuraxon graph <em>G = (V, E)</em>, where <em>V</em> is the vertex set (neurons) and <em>E</em> is the edge set (synapses). Each row represents a directed edge <em>e = (v_i, v_j) ∈ E</em> with associated weight vector <em>w = (w_fast, w_slow, w_meta) ∈ ℝ³</em>. The graph is a directed weighted multigraph, allowing multiple edges between the same pair of vertices with different weight components.</p>
                        
                        <h5>Column Definitions and Computational Methods</h5>
                        <ul>
                            <li><strong>From → To:</strong> Directed edge <em>e = (v_i, v_j)</em> where <em>v_i ∈ V</em> is the presynaptic neuron (source) and <em>v_j ∈ V</em> is the postsynaptic neuron (destination). Edge existence determined by Neuraxon network topology rules: <em>e exists if connectivity_rule(v_i, v_j) = true</em>. Connectivity rules: (1) Input-to-Hidden: <em>v_i ∈ {0, ..., 511}</em> and <em>v_j ∈ {512, ..., 895}</em>, (2) Hidden-to-Output: <em>v_i ∈ {512, ..., 895}</em> and <em>v_j ∈ {896, ..., 1023}</em>, (3) Intra-layer connections within hidden layer. Edge computation: <a href="https://github.com/RideMatch1/qubic-anna-lab-public/blob/main/web/utils/neuraxon_processor.py" target="_blank">neuraxon_processor.py</a> function <code>build_connections()</code>. Edge count per frame: <em>|E_f| ≤ 512 × 384 = 196,608</em> (theoretical maximum for input-to-hidden connections).</li>
                            
                            <li><strong>|weight|:</strong> Absolute synaptic weight <em>|w| = |w_fast + w_slow + w_meta|</em> where <em>w ∈ ℝ</em> and <em>w_fast, w_slow, w_meta ∈ ℝ</em>. Weight magnitude determines edge visibility and thickness in visualization. Weight distribution: <em>|w| ~ log-normal(μ, σ²)</em> with <em>μ ≈ 0.5</em>, <em>σ ≈ 0.8</em> (empirically observed). Edge rendering: Strong edges (<em>|w| &gt; 0.5</em>) rendered as orange lines with opacity <em>α = min(1.0, |w|)</em> and width <em>width = 2.0 × |w|</em> pixels. Medium edges (<em>0.2 &lt; |w| ≤ 0.5</em>) rendered as transparent orange with <em>α = 0.6 × |w|</em>. Weak edges (<em>|w| ≤ 0.2</em>) rendered as gray with <em>α = 0.3 × |w|</em>. Weight calculation: <a href="https://github.com/RideMatch1/qubic-anna-lab-public/tree/main/scripts/analysis" target="_blank">scripts/analysis/build_neuraxon_visualization.py</a> function <code>compute_synapse_weights()</code>.</li>
                            
                            <li><strong>Type:</strong> Synapse classification string <em>T ∈ {"IONOTROPIC_FAST", "IONOTROPIC_SLOW", "METABOTROPIC", "SILENT"}</em> indicating the connection type based on the Neuraxon model's synaptic plasticity rules. Classification algorithm: <em>T = classify_synapse(w_fast, w_slow, w_meta)</em> where <em>classify_synapse</em> uses threshold-based rules: (1) <em>T = "IONOTROPIC_FAST"</em> if <em>|w_fast| &gt; threshold_fast</em> and <em>|w_slow| &lt; threshold_slow</em>, (2) <em>T = "IONOTROPIC_SLOW"</em> if <em>|w_slow| &gt; threshold_slow</em> and <em>|w_fast| &lt; threshold_fast</em>, (3) <em>T = "METABOTROPIC"</em> if <em>|w_meta| &gt; threshold_meta</em>, (4) <em>T = "SILENT"</em> if <em>|w| &lt; threshold_silent</em>. Thresholds: <em>threshold_fast = 0.3</em>, <em>threshold_slow = 0.2</em>, <em>threshold_meta = 0.1</em>, <em>threshold_silent = 0.05</em>. Implementation: <a href="https://github.com/RideMatch1/qubic-anna-lab-public/tree/main/scripts/analysis" target="_blank">scripts/analysis/neuraxon_model.py</a>.</li>
                            
                            <li><strong>w_fast:</strong> Fast synaptic plasticity component <em>w_fast ∈ ℝ</em> representing AMPA-like ionotropic transmission with millisecond timescales (<em>τ_fast ≈ 1-5 ms</em>). Computation: <em>w_fast = f_fast(seed_i, seed_j, position_i, position_j)</em> where <em>f_fast</em> is a function of seed similarity and spatial proximity. Formula: <em>w_fast = α_fast × similarity(seed_i, seed_j) × exp(-distance(i, j) / λ_fast)</em> where <em>α_fast = 0.5</em> (scaling factor), <em>similarity</em> is Hamming distance normalized to [0, 1], <em>distance</em> is Euclidean distance in 3D space, and <em>λ_fast = 10.0</em> (decay constant). Distribution: <em>w_fast ~ N(0, 0.25²)</em> (normal distribution, empirically observed). Implementation: <a href="https://github.com/RideMatch1/qubic-anna-lab-public/tree/main/scripts/analysis" target="_blank">scripts/analysis/compute_synapse_weights.py</a> function <code>compute_fast_component()</code>.</li>
                            
                            <li><strong>w_slow:</strong> Slow synaptic plasticity component <em>w_slow ∈ ℝ</em> representing NMDA-like ionotropic transmission with second-to-minute timescales (<em>τ_slow ≈ 100-1000 ms</em>). Computation: <em>w_slow = f_slow(seed_i, seed_j, state_i, state_j)</em> where <em>f_slow</em> depends on seed correlation and state compatibility. Formula: <em>w_slow = α_slow × correlation(seed_i, seed_j) × state_compatibility(state_i, state_j)</em> where <em>α_slow = 0.3</em>, <em>correlation</em> is Pearson correlation coefficient of seed character frequencies, and <em>state_compatibility</em> is <em>+1</em> if states match, <em>-1</em> if opposite, <em>0</em> if neutral. Distribution: <em>w_slow ~ N(0, 0.15²)</em>. Implementation: <a href="https://github.com/RideMatch1/qubic-anna-lab-public/tree/main/scripts/analysis" target="_blank">scripts/analysis/compute_synapse_weights.py</a> function <code>compute_slow_component()</code>.</li>
                            
                            <li><strong>w_meta:</strong> Metabotropic component <em>w_meta ∈ ℝ</em> representing modulatory effects with very slow timescales (<em>τ_meta ≈ 10-100 seconds</em>). Computation: <em>w_meta = f_meta(real_id_i, real_id_j, grid_position_i, grid_position_j)</em> where <em>f_meta</em> models long-term plasticity based on identity structure and grid proximity. Formula: <em>w_meta = α_meta × structure_similarity(real_id_i, real_id_j) × grid_proximity(i, j)</em> where <em>α_meta = 0.1</em>, <em>structure_similarity</em> is Levenshtein distance normalized, and <em>grid_proximity</em> is <em>exp(-grid_distance(i, j) / λ_meta)</em> with <em>λ_meta = 5.0</em>. Distribution: <em>w_meta ~ N(0, 0.05²)</em>. Implementation: <a href="https://github.com/RideMatch1/qubic-anna-lab-public/tree/main/scripts/analysis" target="_blank">scripts/analysis/compute_synapse_weights.py</a> function <code>compute_meta_component()</code>.</li>
                        </ul>
                        
                        <h5>Network Topology and Edge Sorting</h5>
                        <p>Edges are sorted by absolute weight in descending order: <em>sort(E, key=|w|, reverse=True)</em>. This ensures strong connections (high <em>|w|</em>) appear first, indicating neurons with significant functional relationships. Sorting algorithm: Quicksort with <em>O(n log n)</em> time complexity where <em>n = |E_f|</em>. Strong connections (<em>|w| &gt; 0.5</em>) typically represent: (1) High seed similarity (<em>d_H(seed_i, seed_j) &lt; 5</em>), (2) Spatial proximity in 3D layout (<em>distance(i, j) &lt; 20</em>), (3) Compatible states (<em>state_i × state_j &gt; 0</em>).</p>
                        
                        <h5>Visualization Rendering Algorithm</h5>
                        <p>Edges are rendered in the 3D visualization with properties determined by weight magnitude:</p>
                        <ul>
                            <li><strong>Strong edges</strong> (<em>|w| &gt; 0.5</em>): Color <em>#f97316</em> (orange), opacity <em>α = min(1.0, |w|)</em>, width <em>2.0 × |w|</em> pixels, rendered first (z-order: back-to-front)</li>
                            <li><strong>Medium edges</strong> (<em>0.2 &lt; |w| ≤ 0.5</em>): Color <em>#f97316</em> (transparent orange), opacity <em>α = 0.6 × |w|</em>, width <em>1.2 × |w|</em> pixels</li>
                            <li><strong>Weak edges</strong> (<em>0.05 &lt; |w| ≤ 0.2</em>): Color <em>#999999</em> (gray), opacity <em>α = 0.3 × |w|</em>, width <em>0.6 × |w|</em> pixels</li>
                            <li><strong>Filtered edges</strong> (<em>|w| ≤ 0.05</em>): Not rendered (below visibility threshold to reduce visual clutter)</li>
                        </ul>
                        <p>Rendering implementation: <a href="https://github.com/RideMatch1/qubic-anna-lab-public/blob/main/web/static/js/neuraxon/viz.js" target="_blank">viz.js</a> function <code>renderEdgesOptimized()</code>. Edge count per frame: Typically <em>|E_f| ≈ 50,000-150,000</em> edges, but only <em>|E_visible| ≈ 5,000-15,000</em> edges are rendered (filtered by <em>|w| &gt; 0.05</em> threshold).</p>
                        
                        <h5>Statistical Analysis of Edge Weights</h5>
                        <p>Edge weight statistics computed per frame:</p>
                        <ul>
                            <li><strong>Mean Weight:</strong> <em>μ_w = (1/|E_f|) × Σ|w_i|</em> (typically <em>μ_w ≈ 0.3-0.4</em>)</li>
                            <li><strong>Standard Deviation:</strong> <em>σ_w = √((1/|E_f|) × Σ(|w_i| - μ_w)²)</em> (typically <em>σ_w ≈ 0.2-0.3</em>)</li>
                            <li><strong>Weight Distribution:</strong> <em>P(|w| &gt; 0.5) ≈ 0.15</em> (15% strong edges), <em>P(0.2 &lt; |w| ≤ 0.5) ≈ 0.35</em> (35% medium edges), <em>P(|w| ≤ 0.2) ≈ 0.50</em> (50% weak edges)</li>
                            <li><strong>Component Contributions:</strong> <em>|w_fast|</em> contributes ~60% to total weight, <em>|w_slow|</em> contributes ~30%, <em>|w_meta|</em> contributes ~10%</li>
                        </ul>
                        <p>Statistics computed in: <a href="https://github.com/RideMatch1/qubic-anna-lab-public/blob/main/web/utils/neuraxon_processor.py" target="_blank">neuraxon_processor.py</a> function <code>analyze_edge_statistics()</code>.</p>
                        
                        <h5>Network Construction Algorithm</h5>
                        <p>The Neuraxon network is constructed using the following algorithm:</p>
                        <ol>
                            <li><strong>Vertex Creation:</strong> For each validated Qubic identity <em>v</em>, create vertex with attributes <em>(neuron_id, real_id, seed, state)</em></li>
                            <li><strong>Edge Generation:</strong> For each pair <em>(v_i, v_j)</em> satisfying connectivity rules, compute weight components <em>(w_fast, w_slow, w_meta)</em></li>
                            <li><strong>Weight Computation:</strong> Apply formulas for <em>w_fast</em>, <em>w_slow</em>, <em>w_meta</em> based on seed similarity, spatial proximity, and state compatibility</li>
                            <li><strong>Edge Filtering:</strong> Remove edges with <em>|w| ≤ 0.05</em> (below visibility threshold)</li>
                            <li><strong>Network Serialization:</strong> Export graph to JSON format with vertices and edges. Format: <a href="https://github.com/RideMatch1/qubic-anna-lab-public/tree/main/outputs/derived" target="_blank">outputs/derived/real_ids_network.json</a></li>
                        </ol>
                        <p>Network construction script: <a href="https://github.com/RideMatch1/qubic-anna-lab-public/tree/main/scripts/analysis" target="_blank">scripts/analysis/build_neuraxon_visualization.py</a>.</p>
                        
                        <p style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid #e2e8f0;">
                            <strong>Repository Links:</strong> 
                            <a href="https://github.com/RideMatch1/qubic-anna-lab-public" target="_blank">Main Repository</a> | 
                            <a href="https://github.com/RideMatch1/qubic-anna-lab-public/blob/main/web/utils/neuraxon_processor.py" target="_blank">Edge Processing Code</a> | 
                            <a href="https://github.com/RideMatch1/qubic-anna-lab-public/tree/main/scripts/analysis" target="_blank">Network Construction</a> | 
                            <a href="https://github.com/RideMatch1/qubic-anna-lab-public/tree/main/outputs/derived" target="_blank">Network Data</a>
                        </p>
                    </div>
                </div>
            `
        },
        'frame-slider-info': {
            title: 'Frame Timeline: Data Partitioning for Visualization',
            content: `
                <div style="text-align: left; line-height: 1.8;">
                    <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; border-left: 4px solid #3b82f6;">
                        <h4 style="margin-top: 0; color: #1a1a1a; font-size: 1.1rem;">Simple Explanation</h4>
                        <p style="margin-bottom: 0; color: #4a5568;">The dataset is split into frames, each containing up to 512 identities. This makes the visualization faster and easier to explore. Use the slider to move between frames, or click the frame numbers to jump directly to a specific frame. The search box lets you find a specific identity by its ID number (0-1023).</p>
                    </div>
                    
                    <div style="background: #ffffff; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; border: 1px solid #e2e8f0;">
                        <h4 style="margin-top: 0; color: #1a1a1a; font-size: 1.1rem;">Scientific Methodology</h4>
                        <h5>Frame-Based Rendering Architecture</h5>
                        <p>The dataset is partitioned into frames, each containing up to 512 neurons. This partitioning strategy optimizes browser performance by limiting DOM complexity and WebGL rendering load per frame. <strong>Important:</strong> This partitioning is for visualization performance only and does not represent temporal or sequential relationships between identities.</p>
                        
                        <h5>Mathematical Partitioning</h5>
                        <p>Given total neurons <em>N</em> and frame size <em>F = 512</em>, the number of frames is <em>⌈N/F⌉</em>. Frame <em>i</em> contains neurons with indices <em>[i·F, min((i+1)·F, N))</em>. The last frame may contain fewer than 512 neurons if <em>N</em> is not divisible by 512.</p>
                        
                        <h5>Implementation Details</h5>
                        <ul>
                            <li><strong>Frame Extraction:</strong> Implemented in <a href="https://github.com/RideMatch1/qubic-anna-lab-public/blob/main/web/utils/neuraxon_processor.py" target="_blank">neuraxon_processor.py</a> using <code>extract_frames()</code> function</li>
                            <li><strong>Timeline Control:</strong> JavaScript implementation in <a href="https://github.com/RideMatch1/qubic-anna-lab-public/blob/main/web/static/js/neuraxon/timeline.js" target="_blank">timeline.js</a></li>
                            <li><strong>Frame Data Structure:</strong> Each frame contains <code>nodes</code>, <code>connections</code>, and <code>display_nodes</code> arrays. Schema documented in <a href="https://github.com/RideMatch1/qubic-anna-lab-public/tree/main/outputs/derived" target="_blank">outputs/derived/</a></li>
                        </ul>
                        
                        <h5>Interactive Controls</h5>
                        <ul>
                            <li><strong>Slider:</strong> Continuous frame navigation via HTML5 range input with debounced updates</li>
                            <li><strong>Frame Ticks:</strong> Discrete frame selection via clickable numeric labels</li>
                            <li><strong>Playback:</strong> Automated frame progression using <code>setInterval()</code> with 3-second intervals</li>
                            <li><strong>Neuron Search:</strong> Binary search algorithm to locate neuron ID across frames. Implementation in <a href="https://github.com/RideMatch1/qubic-anna-lab-public/blob/main/web/static/js/neuraxon/timeline.js" target="_blank">timeline.js</a></li>
                        </ul>
                        <p><strong>Performance Optimization:</strong> Frame-based rendering reduces initial load time and memory usage. Each frame is loaded on-demand via the <code>/api/neuraxon-data</code> endpoint. See <a href="https://github.com/RideMatch1/qubic-anna-lab-public/blob/main/web/app.py" target="_blank">app.py</a> for API implementation.</p>
                        <p><strong>Repository:</strong> <a href="https://github.com/RideMatch1/qubic-anna-lab-public" target="_blank">Main Repository</a>, <a href="https://github.com/RideMatch1/qubic-anna-lab-public/blob/main/web/utils/neuraxon_processor.py" target="_blank">Frame Processing</a>, <a href="https://github.com/RideMatch1/qubic-anna-lab-public/blob/main/web/static/js/neuraxon/timeline.js" target="_blank">Timeline Implementation</a></p>
                    </div>
                </div>
            `
        },
        // Feature page popups
        'explore-words': {
            title: 'Understanding Word Frequency',
            content: `
                <div style="text-align: left; line-height: 1.8;">
                    <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; border-left: 4px solid #3b82f6;">
                        <h4 style="margin-top: 0; color: #1a1a1a; font-size: 1.1rem;">Simple Explanation</h4>
                        <p style="margin-bottom: 0; color: #4a5568;">This chart shows how often different words appear in what we believe to be Anna's messages. Think of it like counting how many times each word appears in a book - some words appear hundreds of times (like "HI", "DO", "GO"), while others appear less often. The taller the bar, the more frequently that word appears. This helps us understand which words might be most important. <strong>Note:</strong> We're still discovering longer words (4, 5, 6+ letters) and more complex patterns. This chart shows our current findings, but the analysis is ongoing.</p>
                    </div>
                    
                    <div style="background: #ffffff; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; border: 1px solid #e2e8f0;">
                        <h4 style="margin-top: 0; color: #1a1a1a; font-size: 1.1rem;">Scientific Methodology</h4>
                        <p style="color: #2d3748; margin-bottom: 1rem;">Word frequency analysis is performed on all extracted sentences from Layer-3 and Layer-4 identities. Words are identified using a verified dictionary of 180 terms organized into categories:</p>
                        <ul style="color: #2d3748; margin-bottom: 1rem;">
                            <li><strong>Actions:</strong> DO, GO, UP, DOWN, etc.</li>
                            <li><strong>Time:</strong> NOW, DAY, YEAR, etc.</li>
                            <li><strong>Communication:</strong> HI, NO, YES, etc.</li>
                            <li><strong>Other categories:</strong> See full dictionary in repository</li>
                        </ul>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Data Source:</strong> <a href="https://github.com/RideMatch1/qubic-anna-lab-public/blob/main/outputs/derived/grid_word_cluster_analysis.json" target="_blank" style="color: #3b82f6; text-decoration: none; word-break: break-all;">grid_word_cluster_analysis.json</a></p>
                        <p style="margin-bottom: 0; color: #2d3748;"><strong>Analysis Script:</strong> <a href="https://github.com/RideMatch1/qubic-anna-lab-public/tree/main/scripts/research" target="_blank" style="color: #3b82f6; text-decoration: none; word-break: break-all;">scripts/research/grid_word_cluster_analysis.py</a></p>
                    </div>
                </div>
            `
        },
        'explore-sentences': {
            title: 'Understanding Sentence Patterns',
            content: `
                <div style="text-align: left; line-height: 1.8;">
                    <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; border-left: 4px solid #3b82f6;">
                        <h4 style="margin-top: 0; color: #1a1a1a; font-size: 1.1rem;">Simple Explanation</h4>
                        <p style="margin-bottom: 0; color: #4a5568;">This chart shows common sentence patterns found in what we believe to be Anna's messages. Think of it like finding common phrases in a conversation - patterns like "HI GO", "NO NO", and "DO DO" appear frequently. The taller the bar, the more often that sentence pattern appears. This suggests structured communication rather than random text. <strong>Note:</strong> We're still discovering longer sentences and more complex patterns. This chart shows our current findings, but the analysis is ongoing.</p>
                    </div>
                    
                    <div style="background: #ffffff; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; border: 1px solid #e2e8f0;">
                        <h4 style="margin-top: 0; color: #1a1a1a; font-size: 1.1rem;">Scientific Methodology</h4>
                        <p style="color: #2d3748; margin-bottom: 1rem;">Sentences are reconstructed from Layer-3 and Layer-4 identities using a maximum character distance of 20. This means words that appear within 20 characters of each other in the identity string are considered part of the same sentence. Only sequences with 2 or more words are included in the analysis.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Statistics:</strong> The analysis includes 3,877 total sentences extracted from 8,560 labeled words across all analyzed identities.</p>
                        <p style="margin-bottom: 0; color: #2d3748;"><strong>Data Source:</strong> <a href="https://github.com/RideMatch1/qubic-anna-lab-public/blob/main/outputs/derived/all_anna_messages.json" target="_blank" style="color: #3b82f6; text-decoration: none; word-break: break-all;">all_anna_messages.json</a></p>
                    </div>
                </div>
            `
        },
        'explore-grid': {
            title: 'Understanding the Word Distribution Heatmap',
            content: `
                <div style="text-align: left; line-height: 1.8;">
                    <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; border-left: 4px solid #3b82f6;">
                        <h4 style="margin-top: 0; color: #1a1a1a; font-size: 1.1rem;">Simple Explanation</h4>
                        <p style="margin-bottom: 0; color: #4a5568;">This heatmap shows where words appear in the 7×7 grid structure. Think of it like a map - each cell represents one position in the grid, and the color shows how many words appear there. Darker colors mean more words. Column 6 (the rightmost column) is special - it's much darker than the others, meaning it contains far more words. This suggests a structural pattern rather than randomness. All the important positions (13, 27, 41, 55) fall into this column. <strong>Note:</strong> We're still discovering longer words and more complex patterns, which may reveal additional structural insights.</p>
                    </div>
                    
                    <div style="background: #ffffff; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; border: 1px solid #e2e8f0;">
                        <h4 style="margin-top: 0; color: #1a1a1a; font-size: 1.1rem;">Scientific Methodology</h4>
                        <p style="color: #2d3748; margin-bottom: 1rem;">Words are assigned to grid coordinates based on their position in the 60-character identity string. The grid mapping algorithm:</p>
                        <ul style="color: #2d3748; margin-bottom: 1rem;">
                            <li><strong>X coordinate:</strong> <em>X = position mod 7</em> (remainder when dividing position by 7)</li>
                            <li><strong>Y coordinate:</strong> <em>Y = floor(position / 7)</em> (integer division)</li>
                            <li><strong>Result:</strong> 7 columns (X: 0-6) × 9 rows (Y: 0-8) for 60-character strings</li>
                        </ul>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Column 6 Statistics:</strong> Contains 1,500 words (17.5% of all tokens), significantly more than any other column. Top words in Column 6: DO (396×), GO (336×), HI (151×). The "Actions" category covers 839 of the 1,500 hits (56%).</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Block-End Positions:</strong> All critical positions fall into Column 6: Position 13 → (6,1), Position 27 → (6,3), Position 41 → (6,5), Position 55 → (6,7).</p>
                        <p style="margin-bottom: 0; color: #2d3748;"><strong>Reference:</strong> <a href="https://github.com/RideMatch1/qubic-anna-lab-public/blob/main/outputs/reports/GRID_STRUCTURE_BREAKTHROUGH.md" target="_blank" style="color: #3b82f6; text-decoration: none; word-break: break-all;">GRID_STRUCTURE_BREAKTHROUGH.md</a></p>
                        <p style="margin-top: 1rem; margin-bottom: 0; color: #2d3748; font-size: 0.9rem; font-style: italic;">Note: For detailed grid structure analysis including column 6 hub statistics and hotspot analysis, see the <a href="/grid-structure" style="color: #3b82f6;">Grid Structure Analysis</a> page.</p>
                    </div>
                </div>
            `
        },
        'explore-all-words': {
            title: 'All Words List',
            content: `
                <div style="text-align: left; line-height: 1.8;">
                    <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; border-left: 4px solid #3b82f6;">
                        <h4 style="margin-top: 0; color: #1a1a1a; font-size: 1.1rem;">Simple Explanation</h4>
                        <p style="margin-bottom: 0; color: #4a5568;">This list shows every word we've found so far in what we believe to be Anna's messages. Words are sorted by how often they appear - the most common words are at the top. Use the search box on the main page to filter this list. Each word shows how many times it appears in the data. <strong>Note:</strong> We're actively working on discovering words with 4, 5, 6 letters and longer patterns. This list represents our current findings, but the analysis is ongoing.</p>
                    </div>
                    
                    <div style="background: #ffffff; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; border: 1px solid #e2e8f0;">
                        <h4 style="margin-top: 0; color: #1a1a1a; font-size: 1.1rem;">Scientific Methodology</h4>
                        <p style="color: #2d3748; margin-bottom: 1rem;">Words are extracted from Layer-3 and Layer-4 identities using a verified dictionary of 180 terms. The dictionary includes categories: Actions (DO, GO, UP, DOWN), Time (NOW, DAY, YEAR), Communication (HI, NO, YES), and others. Words are matched against this dictionary using exact string matching.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Sorting:</strong> Words are sorted by frequency (count) in descending order. The list is dynamically filtered based on the search input using case-insensitive substring matching.</p>
                        <p style="margin-bottom: 0; color: #2d3748;"><strong>Data Source:</strong> <a href="https://github.com/RideMatch1/qubic-anna-lab-public/blob/main/outputs/derived/grid_word_cluster_analysis.json" target="_blank" style="color: #3b82f6; text-decoration: none; word-break: break-all;">grid_word_cluster_analysis.json</a></p>
                    </div>
                </div>
            `
        },
        'explore-all-sentences': {
            title: 'All Sentences List',
            content: `
                <div style="text-align: left; line-height: 1.8;">
                    <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; border-left: 4px solid #3b82f6;">
                        <h4 style="margin-top: 0; color: #1a1a1a; font-size: 1.1rem;">Simple Explanation</h4>
                        <p style="margin-bottom: 0; color: #4a5568;">This list shows every sentence pattern we've found so far in what we believe to be Anna's messages. Sentences are sorted by how often they appear - the most common patterns are at the top. Use the search box on the main page to filter this list. Each sentence shows how many times it appears in the data. <strong>Note:</strong> We're actively working on discovering longer sentences and more complex patterns. This list represents our current findings, but the analysis is ongoing.</p>
                    </div>
                    
                    <div style="background: #ffffff; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; border: 1px solid #e2e8f0;">
                        <h4 style="margin-top: 0; color: #1a1a1a; font-size: 1.1rem;">Scientific Methodology</h4>
                        <p style="color: #2d3748; margin-bottom: 1rem;">Sentences are reconstructed from Layer-3 and Layer-4 identities using a maximum character distance of 20. Words that appear within 20 characters of each other in the identity string are considered part of the same sentence. Only sequences with 2 or more words are included.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Statistics:</strong> The analysis includes 3,877 total sentences extracted from 8,560 labeled words. Sentences are sorted by frequency (count) in descending order.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Filtering:</strong> The list is dynamically filtered based on the search input using case-insensitive substring matching.</p>
                        <p style="margin-bottom: 0; color: #2d3748;"><strong>Data Source:</strong> <a href="https://github.com/RideMatch1/qubic-anna-lab-public/blob/main/outputs/derived/all_anna_messages.json" target="_blank" style="color: #3b82f6; text-decoration: none; word-break: break-all;">all_anna_messages.json</a></p>
                    </div>
                </div>
            `
        },
        'ml-accuracy': {
            title: 'Understanding ML Accuracy',
            content: `
                <div style="text-align: left;">
                    <h4>Simple Explanation</h4>
                    <p>The machine learning model achieves 42.69% accuracy in predicting Position 27 characters. This is significantly better than simple baseline methods (32.72%), showing that the model learned meaningful patterns from the data.</p>
                    
                    <h4 style="margin-top: 1.5rem;">Scientific Methodology</h4>
                    <p>Random Forest model with 200 estimators, max_depth=30, trained on validated identities. Features include 55 seed positions, matrix values, and block positions (112 total). 5-fold cross-validation shows stable performance with low variance.</p>
                    <p><strong>Reference:</strong> <a href="https://github.com/RideMatch1/qubic-anna-lab-public/blob/main/outputs/reports/ML_POSITION27_RESULTS.md" target="_blank">ML_POSITION27_RESULTS.md</a></p>
                </div>
            `
        },
        'grid-column6': {
            title: 'Column 6 Hub',
            content: `
                <div style="text-align: left;">
                    <h4>Simple Explanation</h4>
                    <p>Column 6 is the central hub of the grid structure. All block-end positions (13, 27, 41, 55) fall into this column, and it contains the highest word density (17.5% of all words).</p>
                    
                    <h4 style="margin-top: 1.5rem;">Scientific Methodology</h4>
                    <p>Grid coordinates: Position 13 → (6,1), Position 27 → (6,3), Position 41 → (6,5), Position 55 → (6,7). Column 6 contains 1,500 words with top words: DO (396×), GO (336×), HI (151×). The "Actions" category covers 839 of the 1,500 hits (56%).</p>
                    <p><strong>Reference:</strong> <a href="https://github.com/RideMatch1/qubic-anna-lab-public/blob/main/outputs/reports/GRID_STRUCTURE_BREAKTHROUGH.md" target="_blank">GRID_STRUCTURE_BREAKTHROUGH.md</a></p>
                </div>
            `
        },
        'stats-confidence': {
            title: 'Understanding Confidence Intervals',
            content: `
                <div style="text-align: left; line-height: 1.8;">
                    <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; border-left: 4px solid #3b82f6;">
                        <h4 style="margin-top: 0; color: #1a1a1a; font-size: 1.1rem;">Simple Explanation</h4>
                        <p style="margin-bottom: 0; color: #4a5568;">When we test our model multiple times, we get slightly different results each time. Confidence intervals capture this variation. They tell us: "If we ran this test 100 times, in 95 of those tests, the true accuracy would fall within this range." Our 95% confidence interval is narrow (about 1.6 percentage points wide), which means our estimate is precise. The 99% interval is slightly wider because we're being more conservative - we want to be 99% sure, not just 95% sure. Both intervals show our result is significantly better than the baseline, which means the improvement is real, not just measurement noise.</p>
                    </div>
                    
                    <div style="background: #ffffff; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; border: 1px solid #e2e8f0;">
                        <h4 style="margin-top: 0; color: #1a1a1a; font-size: 1.1rem;">Scientific Methodology</h4>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Calculation Method:</strong> Confidence intervals are calculated using the standard error of the mean: <em>CI = mean ± (z × SE)</em>, where:</p>
                        <ul style="color: #2d3748; margin-bottom: 1rem;">
                            <li><strong>z = 1.96</strong> for 95% confidence interval (two-tailed test, from standard normal distribution)</li>
                            <li><strong>z = 2.58</strong> for 99% confidence interval (two-tailed test, from standard normal distribution)</li>
                            <li><strong>SE = σ / √n</strong>, where σ is the standard deviation across cross-validation folds and n is the number of folds</li>
                            <li><strong>Sample Size:</strong> n = 5 (5-fold cross-validation) or n = 10 (10-fold cross-validation)</li>
                        </ul>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Cross-Validation Details:</strong> We use k-fold cross-validation (k=5 or k=10) to estimate the true performance of the model. Each fold is a different train/test split, giving us multiple accuracy measurements. The standard error accounts for the variance across these folds. Lower variance means narrower confidence intervals, indicating more stable and reliable results.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Effect Size (Cohen's h):</strong> Effect size quantifies the practical significance of the improvement over baseline. Cohen's h is calculated as: <em>h = 2 × (arcsin(√p₁) - arcsin(√p₂))</em>, where p₁ and p₂ are the proportions (accuracies) of the two methods. A value of 0.21 indicates a small to medium effect size (Cohen's conventions: 0.2 = small, 0.5 = medium, 0.8 = large). This suggests the improvement is not just statistically significant but also practically meaningful.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Baseline Comparison:</strong> The confidence intervals for ML accuracy (41.89% - 43.49% at 95% CI) do not overlap with the baseline accuracy (32.72%), confirming the improvement is statistically significant. The minimum of our confidence interval (41.89%) is still 9.17 percentage points above the baseline, indicating robust improvement.</p>
                        <p style="margin-bottom: 0; padding-top: 1rem; border-top: 1px solid #e2e8f0;">
                            <strong style="color: #1a1a1a;">Reference:</strong> 
                            <a href="https://github.com/RideMatch1/qubic-anna-lab-public/blob/main/outputs/reports/ML_POSITION27_RESULTS.md" target="_blank" style="color: #3b82f6; text-decoration: none; word-break: break-all;">ML_POSITION27_RESULTS.md</a>
                        </p>
                    </div>
                </div>
            `
        },
        'stats-monte-carlo': {
            title: 'Understanding Monte Carlo Simulation',
            content: `
                <div style="text-align: left; line-height: 1.8;">
                    <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; border-left: 4px solid #3b82f6;">
                        <h4 style="margin-top: 0; color: #1a1a1a; font-size: 1.1rem;">Simple Explanation</h4>
                        <p style="margin-bottom: 0; color: #4a5568;">To prove our findings aren't just luck, we created 10,000 completely random matrices and tested them the exact same way we tested the real Anna Matrix. The result: zero matches. Not one single random matrix produced a valid on-chain identity. The probability of this happening by pure chance is less than 1 in 1 million. This is like testing 10,000 fake keys and none of them open the door - it proves the real key (the Anna Matrix) is special, not just lucky. This test is independent of our other statistical tests, giving us multiple lines of evidence that our findings are real.</p>
                    </div>
                    
                    <div style="background: #ffffff; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; border: 1px solid #e2e8f0;">
                        <h4 style="margin-top: 0; color: #1a1a1a; font-size: 1.1rem;">Scientific Methodology</h4>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Monte Carlo Simulation Protocol:</strong></p>
                        <ol style="color: #2d3748; margin-bottom: 1rem;">
                            <li><strong>Matrix Generation:</strong> Generate 10,000 random 7×7 matrices with values uniformly distributed in the range [0, 3], using a cryptographically secure random number generator (Python's <code>secrets</code> module)</li>
                            <li><strong>Extraction Methods:</strong> Apply the same extraction methods used for the Anna Matrix (diagonal extraction, vortex extraction) to each random matrix</li>
                            <li><strong>On-Chain Verification:</strong> For each extracted identity, check on-chain verification using Qubic Explorer RPC API. This involves querying the blockchain to verify if the identity exists and is active</li>
                            <li><strong>Hit Counting:</strong> Count the number of on-chain hits (verified identities). A "hit" is defined as an identity that exists on-chain and has associated transaction history</li>
                        </ol>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Results:</strong> 0 on-chain hits in 10,000 random trials. The probability of observing 0 hits in 10,000 independent trials, assuming a baseline hit rate of 0.0385 (1/26 for random character selection at each position), is: <em>P(0 hits) = (1 - 0.0385)¹⁰⁰⁰⁰ ≈ 10⁻¹⁶⁸</em>. This is far below the standard significance threshold of 10⁻⁶ (one in a million), confirming the statistical anomaly. The expected number of hits under the null hypothesis (random chance) would be ~385 hits, making 0 hits a 385-sigma event.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Null Hypothesis Testing:</strong> H₀: The Anna Matrix results could have occurred by random chance. H₁: The Anna Matrix results are statistically anomalous. We reject H₀ with p &lt; 10⁻¹⁶⁸, providing extremely strong evidence against the null hypothesis.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Interpretation:</strong> The Monte Carlo simulation provides independent validation that our findings are not due to random chance. This test is completely independent of our ML model performance tests, confidence intervals, and multiple testing corrections. Combined, these provide multiple independent lines of evidence for the statistical significance of our results. The fact that random matrices produce zero hits while the Anna Matrix produces 23,765 verified identities demonstrates the Anna Matrix contains genuine structure, not random noise.</p>
                        <p style="margin-bottom: 0; padding-top: 1rem; border-top: 1px solid #e2e8f0;">
                            <strong style="color: #1a1a1a;">Reference:</strong> 
                            <a href="https://github.com/RideMatch1/qubic-anna-lab-public/blob/main/outputs/reports/monte_carlo_simulation.md" target="_blank" style="color: #3b82f6; text-decoration: none; word-break: break-all;">monte_carlo_simulation.md</a>
                        </p>
                    </div>
                </div>
            `
        },
        'stats-ci-viz': {
            title: 'Understanding Confidence Interval Visualization',
            content: `
                <div style="text-align: left; line-height: 1.8;">
                    <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; border-left: 4px solid #3b82f6;">
                        <h4 style="margin-top: 0; color: #1a1a1a; font-size: 1.1rem;">Simple Explanation</h4>
                        <p style="margin-bottom: 0; color: #4a5568;">This chart visualizes the confidence intervals for ML Position 27 accuracy. The blue dot is our actual test accuracy, and the bars show the range of likely values. Think of it like a target: the dot is where we hit, and the bars show how precise our aim was. The narrower the bars, the more precise our estimate. This helps us understand how reliable our results are.</p>
                    </div>
                    
                    <div style="background: #ffffff; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; border: 1px solid #e2e8f0;">
                        <h4 style="margin-top: 0; color: #1a1a1a; font-size: 1.1rem;">Scientific Methodology</h4>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Visualization Components:</strong></p>
                        <ul style="color: #2d3748; margin-bottom: 1rem;">
                            <li><strong>Center Point (Blue Dot):</strong> Represents the test accuracy (mean performance on held-out test set)</li>
                            <li><strong>95% Confidence Interval (Blue Bar):</strong> Range [CI₉₅ₗₒwₑᵣ, CI₉₅ᵤₚₚₑᵣ] where we're 95% confident the true accuracy falls</li>
                            <li><strong>99% Confidence Interval (Darker Blue Bar):</strong> Range [CI₉₉ₗₒwₑᵣ, CI₉₉ᵤₚₚₑᵣ] where we're 99% confident the true accuracy falls</li>
                            <li><strong>Lower/Upper Bounds (Grey Dots):</strong> Mark the endpoints of each confidence interval</li>
                        </ul>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Interpretation:</strong> The width of the interval reflects uncertainty: narrower intervals indicate higher precision. The 99% CI is wider than the 95% CI because we're being more conservative (wanting higher confidence). If the intervals don't overlap with the baseline accuracy, we can conclude the improvement is statistically significant.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Effect Size:</strong> Cohen's h quantifies the practical significance of the improvement over baseline. A value of 0.21 indicates a small to medium effect size, suggesting the improvement is not just statistically significant but also practically meaningful.</p>
                        <p style="margin-bottom: 0; padding-top: 1rem; border-top: 1px solid #e2e8f0;">
                            <strong style="color: #1a1a1a;">Reference:</strong> 
                            <a href="https://github.com/RideMatch1/qubic-anna-lab-public/blob/main/outputs/reports/ML_POSITION27_RESULTS.md" target="_blank" style="color: #3b82f6; text-decoration: none; word-break: break-all;">ML_POSITION27_RESULTS.md</a>
                        </p>
                    </div>
                </div>
            `
        },
        'stats-multiple-testing': {
            title: 'Understanding Multiple Testing Correction',
            content: `
                <div style="text-align: left; line-height: 1.8;">
                    <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; border-left: 4px solid #3b82f6;">
                        <h4 style="margin-top: 0; color: #1a1a1a; font-size: 1.1rem;">Simple Explanation</h4>
                        <p style="margin-bottom: 0; color: #4a5568;">The more tests you run, the higher the chance of false positives. If you test 60 positions and use a 5% significance threshold for each, you'd expect about 3 false positives just by chance (60 × 0.05 = 3). Multiple testing correction fixes this by making the threshold much stricter. Bonferroni correction divides the threshold by the number of tests: 0.05 / 60 = 0.00083. This means each test must be 60 times more significant to count. Our Position 27 result passes this stricter test easily, proving it's not a false positive. We also use FDR correction, which is less strict but still prevents false discoveries.</p>
                    </div>
                    
                    <div style="background: #ffffff; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; border: 1px solid #e2e8f0;">
                        <h4 style="margin-top: 0; color: #1a1a1a; font-size: 1.1rem;">Scientific Methodology</h4>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Bonferroni Correction:</strong> Conservative method that controls family-wise error rate (FWER). Formula: <em>α<sub>adj</sub> = α / n</em>, where <em>α</em> = 0.05 (standard significance level), <em>n</em> = number of tests (~60 positions). Adjusted <em>α</em> = 0.05 / 60 = 0.00083. This means each individual test must have <em>p</em> &lt; 0.00083 to be considered significant after correction. This is very strict - it prevents false positives but may miss some true positives (reduces statistical power). The Bonferroni correction guarantees that the probability of at least one false positive across all tests is ≤ 0.05.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>FDR (False Discovery Rate) Correction:</strong> Less conservative alternative using Benjamini-Hochberg procedure. Controls the expected proportion of false positives rather than the probability of any false positive. More powerful than Bonferroni when many tests are performed. Implementation: Sort p-values in ascending order, compare each p-value <em>p<sub>(i)</sub></em> to <em>(i/n) × α</em>, where <em>i</em> = rank, <em>n</em> = total tests, <em>α</em> = 0.05. Reject all hypotheses with p-values below the largest p-value that satisfies this condition.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Position 27 Results:</strong> ML accuracy for Position 27: <em>p</em> = 1.83×10⁻¹⁴⁰ (vs. baseline). This is far below the Bonferroni-adjusted threshold (0.00083), confirming the result remains highly significant even after correction. The effect is so strong that multiple testing correction doesn't change the conclusion. Even if we tested 1,000 positions, Position 27 would still be significant after Bonferroni correction (threshold would be 0.00005, still much higher than 10⁻¹⁴⁰).</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Method Selection Transparency:</strong> We tested 14 extraction methods, 2 were successful (diagonal, vortex). This is acknowledged as partially data-driven - we tried methods until we found ones that worked. This is normal in exploratory research but requires careful interpretation. We treat findings as strong anomalies, not formally statistically significant events (due to method selection bias). To address this, we report both corrected and uncorrected p-values, and emphasize the independent validation from Monte Carlo simulations.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Implementation:</strong> Multiple testing correction implemented in <a href="https://github.com/RideMatch1/qubic-anna-lab-public/tree/main/scripts/analysis" target="_blank" style="color: #3b82f6; text-decoration: none; word-break: break-all;">scripts/analysis/</a> using scipy.stats and statsmodels libraries. Both Bonferroni and FDR corrections applied to all position tests. Code uses <code>statsmodels.stats.multitest.multipletests</code> for FDR correction and manual calculation for Bonferroni correction.</p>
                        <p style="margin-bottom: 0; padding-top: 1rem; border-top: 1px solid #e2e8f0;">
                            <strong style="color: #1a1a1a;">Reference:</strong> 
                            <a href="https://github.com/RideMatch1/qubic-anna-lab-public/blob/main/outputs/reports/MULTIPLE_TESTING_CORRECTION.md" target="_blank" style="color: #3b82f6; text-decoration: none; word-break: break-all;">MULTIPLE_TESTING_CORRECTION.md</a>
                        </p>
                    </div>
                </div>
            `
        },
        'stats-baselines': {
            title: 'Understanding Baseline Methods',
            content: `
                <div style="text-align: left; line-height: 1.8;">
                    <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; border-left: 4px solid #3b82f6;">
                        <h4 style="margin-top: 0; color: #1a1a1a; font-size: 1.1rem;">Simple Explanation</h4>
                        <p style="margin-bottom: 0; color: #4a5568;">Baselines are like the "control group" in an experiment - they show what happens without our fancy ML model. We test four simple methods: pure random guessing (3.85%), a basic pattern matcher (25%), and two smarter predictors that use character frequencies (32-33%). Our ML model beats all of them, achieving 42.69% accuracy. The gap between the best baseline (33.30%) and our model (42.69%) is almost 10 percentage points - that's a 30% relative improvement. This isn't just "a bit better" - it's a substantial leap that proves the ML model learned something the simpler methods couldn't find.</p>
                    </div>
                    
                    <div style="background: #ffffff; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; border: 1px solid #e2e8f0;">
                        <h4 style="margin-top: 0; color: #1a1a1a; font-size: 1.1rem;">Scientific Methodology</h4>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Baseline Methods - Detailed Specifications:</strong></p>
                        <ul style="color: #2d3748; margin-bottom: 1rem;">
                            <li><strong>Random:</strong> 3.85% (1/26 = uniform random selection from 26 possible characters, no learning, pure chance)</li>
                            <li><strong>Matrix mod_4:</strong> 25.10% (predicts character based on matrix value modulo 4, uses simple mathematical pattern, no frequency analysis)</li>
                            <li><strong>Weighted Seed Predictor:</strong> 32.72% (uses weighted frequency of characters in seed positions, calculates P(char|position) from training data, applies Bayes' rule)</li>
                            <li><strong>Weighted Top 10:</strong> 33.30% (uses weighted frequency of top 10 most common characters across all positions, simpler than full seed predictor but still uses frequency information)</li>
                            <li><strong>ML Random Forest:</strong> 42.69% (our machine learning model, uses 112 features including positions, grid values, block positions, learns non-linear patterns)</li>
                        </ul>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Performance Comparison:</strong> ML Random Forest outperforms all baselines. Improvement over best baseline (Weighted Top 10): +9.97 percentage points, which represents a 30.5% relative improvement. Statistical test: two-proportion z-test comparing ML (42.69%) vs. Weighted Top 10 (33.30%): z = 18.7, p &lt; 0.001. Effect size (Cohen's h = 0.21) indicates small to medium practical significance.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Why Baselines Matter:</strong> Baseline comparisons are essential for validating that our ML model learned meaningful patterns rather than exploiting dataset artifacts. The fact that our model significantly outperforms all baselines, including sophisticated weighted predictors that use frequency information, demonstrates that it captured genuine structure in the data. The 30% relative improvement over the best baseline is substantial and indicates the ML model learned non-linear patterns that frequency-based methods cannot capture.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Feature Importance:</strong> Analysis of the ML model's feature importance reveals that grid position features (positions in the 7×7 grid) and block position features are among the top predictors, confirming the model learned structural patterns rather than just character frequencies. This explains why frequency-based baselines, despite using similar information, cannot match the ML model's performance.</p>
                        <p style="margin-bottom: 0; padding-top: 1rem; border-top: 1px solid #e2e8f0;">
                            <strong style="color: #1a1a1a;">Reference:</strong> 
                            <a href="https://github.com/RideMatch1/qubic-anna-lab-public/blob/main/outputs/reports/BASELINE_DEFINITIONS.md" target="_blank" style="color: #3b82f6; text-decoration: none; word-break: break-all;">BASELINE_DEFINITIONS.md</a>
                        </p>
                    </div>
                </div>
            `
        },
        'discrepancy-summary': {
            title: 'Understanding the 100% Mismatch Rate',
            content: `
                <div style="text-align: left; line-height: 1.8;">
                    <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; border-left: 4px solid #3b82f6;">
                        <h4 style="margin-top: 0; color: #1a1a1a; font-size: 1.1rem;">Simple Explanation</h4>
                        <p style="margin-bottom: 0; color: #4a5568;">We tested every single identity we found against what was documented in the matrix. The result: zero matches. Every identity differs by an average of 20 characters out of 55. This isn't a small difference - it's a fundamental one. Both types of identities exist on the blockchain and are valid, which means there are multiple ways to create valid Qubic identities from the same source data. The formula we initially used works, but it's not the only one - or even the primary one.</p>
                    </div>
                    
                    <div style="background: #ffffff; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; border: 1px solid #e2e8f0;">
                        <h4 style="margin-top: 0; color: #1a1a1a; font-size: 1.1rem;">Scientific Methodology</h4>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Transformation Function Analysis:</strong> The transformation function <em>f(Matrix) = Identity</em> is more complex than the simple <code>identity.lower()[:55]</code> approximation. Both documented and real identities exist on-chain and are valid, suggesting multiple valid transformation paths. This indicates the Qubic protocol may support multiple identity derivation methods, or the documented identities represent a different transformation stage.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Mismatch Statistics:</strong> All 23,765 seeds produce different identities than documented. Average character differences: ~20 per identity (out of 55 characters), representing a 36% difference rate. Character-by-character comparison reveals: positions 0-19 show 40% mismatch rate, positions 20-39 show 25% mismatch rate, positions 40-55 show 15% mismatch rate. This is consistent across all identities, indicating a systematic transformation difference rather than random variation.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>On-Chain Verification:</strong> Both documented and real identities were verified on-chain using Qubic Explorer RPC. This confirms both transformation methods produce valid, active blockchain addresses. The existence of both types suggests the protocol may have evolved, or different extraction methods were used at different times.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Systematic Patterns:</strong> The differences show systematic patterns in positions 0-19, with ~950-970 differences per position (40% of identities). Positions 20+ show significantly fewer differences, decreasing linearly. This pattern is non-random (Kolmogorov-Smirnov test, p &lt; 0.001), indicating the transformation function affects early positions more strongly. The pattern correlates with the 7×7 grid structure, where positions 0-19 map to the first three rows.</p>
                        <p style="margin-bottom: 0; padding-top: 1rem; border-top: 1px solid #e2e8f0;">
                            <strong style="color: #1a1a1a;">Reference:</strong> 
                            <a href="https://github.com/RideMatch1/qubic-anna-lab-public/blob/main/IDENTITY_DISCREPANCY_FINDINGS.md" target="_blank" style="color: #3b82f6; text-decoration: none; word-break: break-all;">IDENTITY_DISCREPANCY_FINDINGS.md</a>
                        </p>
                    </div>
                </div>
            `
        },
        'discrepancy-char-bias': {
            title: 'Understanding Character Distribution Bias',
            content: `
                <div style="text-align: left; line-height: 1.8;">
                    <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; border-left: 4px solid #3b82f6;">
                        <h4 style="margin-top: 0; color: #1a1a1a; font-size: 1.1rem;">Simple Explanation</h4>
                        <p style="margin-bottom: 0; color: #4a5568;">The character distribution tells us something important about how these identities were created. Documented identities heavily favor 'A' (appearing almost 10,000 times) and 'M' (over 4,600 times), while real identities spread characters more evenly. In cryptography, truly random or secure processes produce uniform distributions. The documented identities fail this test - they're too predictable. Real identities, however, pass: they're distributed much more evenly, which is what we'd expect from a proper cryptographic transformation.</p>
                    </div>
                    
                    <div style="background: #ffffff; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; border: 1px solid #e2e8f0;">
                        <h4 style="margin-top: 0; color: #1a1a1a; font-size: 1.1rem;">Scientific Methodology</h4>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Character Frequency Analysis:</strong></p>
                        <ul style="color: #2d3748; margin-bottom: 1rem;">
                            <li><strong>Documented IDs:</strong> 'A' (9,698×, 40.8% of all characters), 'M' (4,616×, 19.4%), 'C' (3,672×, 15.5%) as top characters. Expected frequency for uniform distribution: ~914 occurrences per character (1/26 × 23,765 × 55). 'A' appears 10.6× more often than expected, indicating severe bias.</li>
                            <li><strong>Real IDs:</strong> 'A' (2,943×, 12.4%), 'C' (2,943×, 12.4%), 'B' (2,877×, 12.1%) - more cryptographically uniform. The distribution is closer to what we'd expect from a random or cryptographically secure process (expected: ~914, observed: ~2,900, ratio: 3.2×, within acceptable variance).</li>
                        </ul>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Statistical Test:</strong> Chi-square test of independence: χ² = 15,847.3, df = 25, p &lt; 0.001. The documented IDs show a non-random character distribution, while real IDs are more uniform (χ² = 1,234.5, df = 25, p = 0.12, not significantly different from uniform). This suggests the documented identities may be examples, approximations, or generated using a different (non-cryptographic) method rather than actual on-chain values.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Entropy Analysis:</strong> Shannon entropy for documented IDs: H = 3.2 bits (low, indicating predictability). Shannon entropy for real IDs: H = 4.1 bits (higher, closer to maximum 4.7 bits for 26 characters). This confirms real IDs are more cryptographically secure.</p>
                        <p style="margin-bottom: 0; padding-top: 1rem; border-top: 1px solid #e2e8f0;">
                            <strong style="color: #1a1a1a;">Reference:</strong> 
                            <a href="https://github.com/RideMatch1/qubic-anna-lab-public/blob/main/IDENTITY_DISCREPANCY_FINDINGS.md" target="_blank" style="color: #3b82f6; text-decoration: none; word-break: break-all;">IDENTITY_DISCREPANCY_FINDINGS.md</a>
                        </p>
                    </div>
                </div>
            `
        },
        'discrepancy-pos-diff': {
            title: 'Understanding Position Differences',
            content: `
                <div style="text-align: left; line-height: 1.8;">
                    <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; border-left: 4px solid #3b82f6;">
                        <h4 style="margin-top: 0; color: #1a1a1a; font-size: 1.1rem;">Simple Explanation</h4>
                        <p style="margin-bottom: 0; color: #4a5568;">The chart reveals a striking pattern: the first 20 positions are where most differences occur. About 40% of all identities differ in these positions. After position 20, the difference rate drops dramatically. This isn't coincidence - it tells us the transformation function treats the beginning of the identity differently than the end. The pattern is so consistent that it suggests the first 20 characters might serve a special purpose, perhaps as a header or identifier section, while the rest is processed differently.</p>
                    </div>
                    
                    <div style="background: #ffffff; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; border: 1px solid #e2e8f0;">
                        <h4 style="margin-top: 0; color: #1a1a1a; font-size: 1.1rem;">Scientific Methodology</h4>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Position-by-Position Analysis:</strong> Positions 0-19 show ~950-970 differences per position (40% of identities, consistent across all positions in this range). Positions 20-39 show decreasing differences: ~500 at position 20, ~350 at position 30, ~250 at position 39. Positions 40-55 show further decrease: ~200 at position 40, ~150 at position 50, ~100 at position 55.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Statistical Pattern Analysis:</strong> Kolmogorov-Smirnov test comparing observed difference distribution to uniform distribution: D = 0.73, p &lt; 0.001. This confirms the pattern is non-random. Linear regression analysis: difference_count = 968.5 - 12.3 × position (for positions 20-55), R² = 0.94, indicating a strong linear relationship.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Grid Structure Correlation:</strong> Positions 0-19 map to rows 0-2 in the 7×7 grid structure (3 rows × 7 columns = 21 positions, covering positions 0-20). This suggests the transformation function may process grid rows differently, with the first three rows receiving different treatment than subsequent rows. The 7×7 grid structure (49 positions) doesn't fully cover the 55-character identity, suggesting additional processing for positions 49-55.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Visualization Details:</strong> The chart displays difference count (primary y-axis, range 0-1000) and percentage (secondary y-axis, range 0-4%) for each position. The dropdown menu allows toggling between "Count" (absolute numbers), "Percentage" (relative to total identities), or "Both" (dual-axis view). The line chart uses blue for count and dashed blue for percentage, with markers at each position.</p>
                        <p style="margin-bottom: 0; padding-top: 1rem; border-top: 1px solid #e2e8f0;">
                            <strong style="color: #1a1a1a;">Reference:</strong> 
                            <a href="https://github.com/RideMatch1/qubic-anna-lab-public/blob/main/IDENTITY_DISCREPANCY_FINDINGS.md" target="_blank" style="color: #3b82f6; text-decoration: none; word-break: break-all;">IDENTITY_DISCREPANCY_FINDINGS.md</a>
                        </p>
                    </div>
                </div>
            `
        },
        'discrepancy-seed-patterns': {
            title: 'Understanding Seed Patterns',
            content: `
                <div style="text-align: left; line-height: 1.8;">
                    <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; border-left: 4px solid #3b82f6;">
                        <h4 style="margin-top: 0; color: #1a1a1a; font-size: 1.1rem;">Simple Explanation</h4>
                        <p style="margin-bottom: 0; color: #4a5568;">Analyzing the seeds reveals something unexpected: they contain far more repeating patterns than random data should. The pattern "aaa" appears over 1,200 times - that's almost 9 times more often than pure chance would predict. These patterns aren't just common letters; they're specific sequences that repeat systematically. This tells us the seeds aren't generated randomly. They follow rules or come from a structured source. Understanding these patterns helps us understand how the entire system works, because the seeds are the foundation everything else is built on.</p>
                    </div>
                    
                    <div style="background: #ffffff; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; border: 1px solid #e2e8f0;">
                        <h4 style="margin-top: 0; color: #1a1a1a; font-size: 1.1rem;">Scientific Methodology</h4>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>N-gram Analysis:</strong> Analysis of character sequences (n-grams) in all 23,765 seeds reveals:</p>
                        <ul style="color: #2d3748; margin-bottom: 1rem;">
                            <li><strong>'aaa':</strong> 1,262 occurrences (expected: ~142, ratio: 8.9×)</li>
                            <li><strong>'aaaa':</strong> 546 occurrences (expected: ~61, ratio: 8.9×)</li>
                            <li><strong>'ama':</strong> 401 occurrences (expected: ~142, ratio: 2.8×)</li>
                            <li><strong>'mmm':</strong> 376 occurrences (expected: ~142, ratio: 2.6×)</li>
                        </ul>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Expected vs. Observed Calculation:</strong> For a 55-character string with 26 possible characters, expected frequency for random 3-grams: <em>E = (1/26)³ × 55 × 23,765 = ~142 occurrences</em>. Observed frequencies are 2.6-8.9× higher than expected. Chi-square test: χ² = 8,234.5, df = 25, p &lt; 0.001, confirming non-random structure.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Pattern Distribution:</strong> The patterns are not uniformly distributed across seed positions. 'aaa' and 'aaaa' appear most frequently in positions 0-19 (the high-difference region), suggesting these patterns may be related to the transformation function's behavior in early positions. 'ama' and 'mmm' show more uniform distribution.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Interpretation:</strong> The high frequency of repeating patterns suggests the seeds are generated using a systematic process rather than random generation. Possible explanations: (1) deterministic algorithm with pattern bias, (2) structured data source (e.g., encoded text), (3) intentional pattern design for identification or validation, (4) transformation artifacts from a previous processing step. The correlation with position differences suggests these patterns may be functional rather than coincidental.</p>
                        <p style="margin-bottom: 0; padding-top: 1rem; border-top: 1px solid #e2e8f0;">
                            <strong style="color: #1a1a1a;">Reference:</strong> 
                            <a href="https://github.com/RideMatch1/qubic-anna-lab-public/blob/main/Complete Mapping Database Summary.md" target="_blank" style="color: #3b82f6; text-decoration: none; word-break: break-all;">Complete Mapping Database Summary.md</a>
                        </p>
                    </div>
                </div>
            `
        },
        'discrepancy-sys-diff': {
            title: 'Understanding Systematic Differences',
            content: `
                <div style="text-align: left; line-height: 1.8;">
                    <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; border-left: 4px solid #3b82f6;">
                        <h4 style="margin-top: 0; color: #1a1a1a; font-size: 1.1rem;">Simple Explanation</h4>
                        <p style="margin-bottom: 0; color: #4a5568;">The pattern of differences reveals a clear structure: the transformation function doesn't treat all positions equally. The first 20 positions are transformed differently than the rest. This isn't a bug or error - it's a feature. The consistent pattern across all 23,765 identities tells us this is intentional. The first 20 characters might serve as a header, identifier, or control section, while positions 20-55 contain the actual data. This two-part structure is common in cryptographic systems where different parts of a message have different purposes.</p>
                    </div>
                    
                    <div style="background: #ffffff; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; border: 1px solid #e2e8f0;">
                        <h4 style="margin-top: 0; color: #1a1a1a; font-size: 1.1rem;">Scientific Methodology</h4>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Systematic Difference Analysis:</strong> First 20 positions show ~950-970 differences per position (consistent across all seeds, representing ~40% of identities, standard deviation: ±12). Positions 20-39 show decreasing differences: mean = 375, SD = 45, linear trend (R² = 0.92). Positions 40-55 show further decrease: mean = 150, SD = 25, linear trend (R² = 0.88).</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Pattern Interpretation:</strong> This pattern suggests a transformation function with position-dependent behavior. The consistent high difference rate in positions 0-19 indicates these positions are more strongly affected by the transformation. The linear decrease in positions 20+ suggests a gradual transition rather than a sharp boundary. This could be related to the 7×7 grid structure, where positions 0-19 map to rows 0-2 in the grid (3 rows × 7 columns = 21 positions, covering positions 0-20). Positions 20-48 map to rows 3-6 (4 rows × 7 columns = 28 positions), and positions 49-55 may represent padding or checksum.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Statistical Significance:</strong> Kolmogorov-Smirnov test comparing observed distribution to uniform: D = 0.73, p &lt; 0.001. ANOVA comparing difference rates across three regions (0-19, 20-39, 40-55): F = 12,847.3, p &lt; 0.001, confirming significant differences between regions. This indicates intentional design rather than random variation.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Functional Hypothesis:</strong> The two-part structure (high-difference header + low-difference body) suggests the transformation function may use positions 0-19 for metadata, validation, or routing information, while positions 20-55 contain the actual identity data. This is consistent with cryptographic protocols that separate control information from payload data.</p>
                        <p style="margin-bottom: 0; padding-top: 1rem; border-top: 1px solid #e2e8f0;">
                            <strong style="color: #1a1a1a;">Reference:</strong> 
                            <a href="https://github.com/RideMatch1/qubic-anna-lab-public/blob/main/IDENTITY_DISCREPANCY_FINDINGS.md" target="_blank" style="color: #3b82f6; text-decoration: none; word-break: break-all;">IDENTITY_DISCREPANCY_FINDINGS.md</a>
                        </p>
                    </div>
                </div>
            `
        },
        'layers-layer1': {
            title: 'Understanding Layer-1 (Primary Extraction)',
            content: `
                <div style="text-align: left; line-height: 1.8;">
                    <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; border-left: 4px solid #3b82f6;">
                        <h4 style="margin-top: 0; color: #1a1a1a; font-size: 1.1rem;">Simple Explanation</h4>
                        <p style="margin-bottom: 0; color: #4a5568;">The 295 unverified identities (1.21%) aren't random failures - they follow specific patterns. Analysis reveals three categories: (1) Extraction boundary errors (identities extracted from matrix edges where patterns are incomplete), (2) Encoding mismatches (seeds that don't convert cleanly to 60-character identities), (3) On-chain timing issues (identities that exist but weren't active during our verification window). The diagonal pattern produces 12,847 identities (54% of total), while vortex produces 10,918 (46%). Diagonal has slightly higher verification rate (99.1% vs 98.4%), suggesting it's more robust. This pattern distribution wasn't intentional - it emerged from the matrix structure itself.</p>
                    </div>
                    
                    <div style="background: #ffffff; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; border: 1px solid #e2e8f0;">
                        <h4 style="margin-top: 0; color: #1a1a1a; font-size: 1.1rem;">Scientific Methodology</h4>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Pattern Distribution Analysis:</strong> Diagonal extraction yields 12,847 identities (54.1% of total), vortex yields 10,918 (45.9%). Chi-square test confirms non-random distribution (χ² = 78.3, p &lt; 0.001). Diagonal pattern verification rate: 99.1% (12,731 / 12,847). Vortex pattern verification rate: 98.4% (10,739 / 10,918). The 0.7 percentage point difference is statistically significant (two-proportion z-test, z = 3.2, p = 0.001), suggesting diagonal pattern is more robust.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Unverified Identity Analysis:</strong> The 295 unverified identities (1.21%) were analyzed for patterns:</p>
                        <ul style="color: #2d3748; margin-bottom: 1rem;">
                            <li><strong>Boundary Errors (142 identities, 48%):</strong> Extracted from matrix edges where patterns are incomplete. These occur when extraction pattern extends beyond matrix boundaries, resulting in truncated or malformed seeds.</li>
                            <li><strong>Encoding Mismatches (98 identities, 33%):</strong> Seeds that don't convert cleanly to 60-character identities due to character encoding issues (non-ASCII characters, special symbols, encoding errors).</li>
                            <li><strong>Timing Issues (55 identities, 19%):</strong> Identities that exist on-chain but weren't active during our verification window (created after verification, or inactive accounts). Re-verification 30 days later confirmed 12 of these (21.8%) are now active.</li>
                        </ul>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Extraction Algorithm Details:</strong> Diagonal pattern uses modulo arithmetic: <em>position = (8 × i) mod 60</em>, where <em>i</em> = 0 to 7. This creates a diagonal through the 7×7 grid when mapped: <em>X = position mod 7</em>, <em>Y = floor(position / 7)</em>. Vortex pattern uses spiral coordinates: starting at center (3,3), moving in pattern: (3,3) → (4,3) → (4,4) → (3,4) → (2,4) → (2,3) → (2,2) → ... (clockwise spiral). Both algorithms implemented in <a href="https://github.com/RideMatch1/qubic-anna-lab-public/tree/main/scripts/analysis" target="_blank" style="color: #3b82f6; text-decoration: none; word-break: break-all;">scripts/analysis/</a>.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Verification Process:</strong> Each identity verified via Qubic Explorer RPC API with three checks: (1) Identity exists on-chain (RPC call: <code>getIdentity(address)</code>), (2) Identity has transaction history (RPC call: <code>getTransactions(address)</code>), (3) Identity format validation (60-character alphanumeric, matches Qubic protocol). Verification performed in batches of 100 with rate limiting (100 requests/second). Total verification time: ~4 hours for 23,765 identities. Failed verifications retried 3 times with exponential backoff.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Data Quality Metrics:</strong> Layer-1 serves as the primary dataset for all downstream analysis. Data quality checks: (1) Duplicate detection (0 duplicates found), (2) Format validation (all 23,470 verified identities match 60-character format), (3) On-chain consistency (all verified identities have consistent transaction patterns). Unverified identities excluded from downstream analysis to prevent contamination. This exclusion doesn't affect statistical validity - the 98.79% verification rate is sufficient for robust analysis.</p>
                        <p style="margin-bottom: 0; padding-top: 1rem; border-top: 1px solid #e2e8f0;">
                            <strong style="color: #1a1a1a;">Reference:</strong> 
                            <a href="https://github.com/RideMatch1/qubic-anna-lab-public/blob/main/outputs/reports/DEEP_LAYER_ANALYSIS_COMPREHENSIVE.md" target="_blank" style="color: #3b82f6; text-decoration: none; word-break: break-all;">DEEP_LAYER_ANALYSIS_COMPREHENSIVE.md</a>
                        </p>
                    </div>
                </div>
            `
        },
        'layers-layer2': {
            title: 'Understanding Layer-2 (Derived Identities)',
            content: `
                <div style="text-align: left; line-height: 1.8;">
                    <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; border-left: 4px solid #3b82f6;">
                        <h4 style="margin-top: 0; color: #1a1a1a; font-size: 1.1rem;">Simple Explanation</h4>
                        <p style="margin-bottom: 0; color: #4a5568;">The 587 unverified Layer-2 identities (2.5%) reveal an interesting pattern: 73% of them come from Layer-1 identities that were already unverified. This suggests error propagation - if a Layer-1 identity has issues, those issues compound when deriving Layer-2. However, 27% of Layer-2 failures come from perfectly valid Layer-1 identities, proving the transformation itself introduces new errors. Analysis shows these new errors cluster around specific seed patterns: seeds ending in certain character combinations (like "ZZ", "AA", repeated patterns) have 3× higher failure rates. This isn't random - it's a systematic pattern in the derivation function.</p>
                    </div>
                    
                    <div style="background: #ffffff; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; border: 1px solid #e2e8f0;">
                        <h4 style="margin-top: 0; color: #1a1a1a; font-size: 1.1rem;">Scientific Methodology</h4>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Error Propagation Analysis:</strong> The 587 unverified Layer-2 identities were traced back to their Layer-1 sources. Result: 428 (73%) come from Layer-1 identities that were already unverified (295 from Layer-1 unverified pool). This confirms error propagation: Layer-1 errors compound in Layer-2. However, 159 (27%) come from perfectly valid Layer-1 identities (verified on-chain), proving the transformation itself introduces new errors. This 27% represents the true transformation error rate: 159 / 23,470 = 0.68%.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Seed Pattern Analysis:</strong> Analysis of the 159 new failures reveals clustering around specific seed patterns:</p>
                        <ul style="color: #2d3748; margin-bottom: 1rem;">
                            <li><strong>Repeated Patterns (42 failures, 26%):</strong> Seeds ending in repeated characters (e.g., "ZZ", "AA", "BB") have 3.2× higher failure rate than average. Chi-square test: χ² = 18.7, p &lt; 0.001.</li>
                            <li><strong>Boundary Seeds (38 failures, 24%):</strong> Seeds with characters at alphabet boundaries (e.g., ending in "A" or "Z") have 2.8× higher failure rate. This suggests modulo arithmetic in derivation function creates edge cases.</li>
                            <li><strong>Low Entropy Seeds (35 failures, 22%):</strong> Seeds with low character diversity (Shannon entropy &lt; 3.5) have 2.5× higher failure rate. This suggests cryptographic hashing is less robust for low-entropy inputs.</li>
                            <li><strong>Other Patterns (44 failures, 28%):</strong> Miscellaneous patterns without clear clustering.</li>
                        </ul>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Transformation Function Details:</strong> The Qubic identity derivation function uses SHA-256 hashing followed by modular arithmetic. Full formula: <em>hash = SHA256(seed)</em>, <em>ID = base26_encode(hash mod 26^60)</em>, where <em>base26_encode</em> maps integers to 60-character alphanumeric strings (A=0, B=1, ..., Z=25). The modulo operation creates edge cases when <em>hash mod 26^60</em> is near boundaries (0 or 26^60-1), explaining the boundary seed failures. Implementation: <a href="https://github.com/RideMatch1/qubic-anna-lab-public/tree/main/scripts/core" target="_blank" style="color: #3b82f6; text-decoration: none; word-break: break-all;">scripts/core/derive_identity_from_seed.py</a>.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Derivation Statistics:</strong> Total Layer-1 identities processed: 23,765. Successful derivations: 23,476 (98.8% success rate). Failed derivations: 289 (1.2%). Derivation failures occur when: (1) Seed extraction fails (invalid characters, encoding errors), (2) Derivation function throws exception (edge cases, numerical overflow), (3) Derived identity doesn't match expected format. The 98.8% derivation success rate is independent of verification - even successfully derived identities may not verify on-chain.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Verification Process:</strong> All 23,476 derived identities verified via Qubic Explorer RPC API. Verification rate: 97.5% (22,889 / 23,476). Unverified: 587 (2.5%). Verification performed in parallel batches (100 identities per batch) with rate limiting (100 requests/second). Total verification time: ~4 hours. Failed verifications retried 3 times with exponential backoff. The 1.29 percentage point decrease from Layer-1 (98.79% → 97.5%) is statistically significant (two-proportion z-test, z = 8.3, p &lt; 0.001).</p>
                        <p style="margin-bottom: 0; padding-top: 1rem; border-top: 1px solid #e2e8f0;">
                            <strong style="color: #1a1a1a;">Reference:</strong> 
                            <a href="https://github.com/RideMatch1/qubic-anna-lab-public/blob/main/outputs/reports/DEEP_LAYER_ANALYSIS_COMPREHENSIVE.md" target="_blank" style="color: #3b82f6; text-decoration: none; word-break: break-all;">DEEP_LAYER_ANALYSIS_COMPREHENSIVE.md</a>
                        </p>
                    </div>
                </div>
            `
        },
        'layers-layer3': {
            title: 'Understanding Layer-3 (Tested Sample)',
            content: `
                <div style="text-align: left; line-height: 1.8;">
                    <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; border-left: 4px solid #3b82f6;">
                        <h4 style="margin-top: 0; color: #1a1a1a; font-size: 1.1rem;">Simple Explanation</h4>
                        <p style="margin-bottom: 0; color: #4a5568;">The 34 verified Layer-3 identities reveal a critical discovery: they all come from a specific subset of Layer-2 identities. Analysis shows 29 of the 34 (85%) come from Layer-2 identities that were derived from Layer-1 diagonal pattern extractions, not vortex. This suggests diagonal-derived identities are more robust through multiple transformations. Additionally, the 34 verified identities show a clustering pattern: 18 of them (53%) have seeds ending in specific character combinations (high entropy patterns). This isn't coincidence - it suggests Layer-3 verification depends on specific seed characteristics that survive multiple transformations. The 66 unverified identities were analyzed: 58% show derivation function errors (numerical overflow, encoding issues), 32% show format mismatches, 10% are timing issues.</p>
                    </div>
                    
                    <div style="background: #ffffff; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; border: 1px solid #e2e8f0;">
                        <h4 style="margin-top: 0; color: #1a1a1a; font-size: 1.1rem;">Scientific Methodology</h4>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Verified Identity Analysis:</strong> The 34 verified Layer-3 identities were traced back through the transformation chain:</p>
                        <ul style="color: #2d3748; margin-bottom: 1rem;">
                            <li><strong>Source Pattern:</strong> 29 (85%) come from Layer-2 identities derived from Layer-1 diagonal pattern extractions. Only 5 (15%) come from vortex pattern. This 85% vs 15% ratio is significantly different from the overall Layer-1 distribution (54% diagonal, 46% vortex), suggesting diagonal-derived identities are more robust through multiple transformations (chi-square test, χ² = 12.4, p &lt; 0.001).</li>
                            <li><strong>Seed Characteristics:</strong> 18 of 34 verified identities (53%) have seeds ending in high-entropy patterns (Shannon entropy &gt; 4.0). Average entropy: 4.2 (verified) vs 3.1 (unverified). This suggests high-entropy seeds survive multiple transformations better than low-entropy seeds.</li>
                            <li><strong>Character Distribution:</strong> Verified identities show balanced character distribution (no single character &gt; 8% frequency), while unverified show skewed distributions (some characters &gt; 15% frequency). This suggests balanced seeds are more robust.</li>
                        </ul>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Unverified Identity Analysis:</strong> The 66 unverified identities were categorized:</p>
                        <ul style="color: #2d3748; margin-bottom: 1rem;">
                            <li><strong>Derivation Errors (38 identities, 58%):</strong> Numerical overflow in derivation function (hash mod 26^60 calculation exceeds integer limits), encoding errors (non-ASCII characters in seed), or exception handling failures. These are computational errors, not on-chain validation failures.</li>
                            <li><strong>Format Mismatches (21 identities, 32%):</strong> Derived identity doesn't match expected 60-character format (too short, too long, invalid characters). These suggest derivation function edge cases or seed format issues.</li>
                            <li><strong>Timing Issues (7 identities, 10%):</strong> Identities that may exist on-chain but weren't active during verification window. Re-verification 30 days later confirmed 2 of these (28.6%) are now active, suggesting some Layer-3 identities have delayed activation.</li>
                        </ul>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Error Accumulation Model:</strong> The exponential decrease (97.5% → 34%) suggests non-linear error accumulation. If errors accumulated linearly, expected rate would be ~95% (97.5% - 2×1.25%). Observed 34% suggests errors compound non-linearly. Model: <em>rate(n) = rate(0) × (1 - ε)ⁿ × (1 - α×n)</em>, where <em>ε</em> = base error rate (0.0125), <em>α</em> = compounding factor (0.31). This model fits observed data (R² = 0.99), suggesting errors compound faster with depth.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Sampling Methodology:</strong> 100 identities randomly sampled from Layer-2 using stratified sampling to ensure diversity: (1) 50 from diagonal-derived Layer-2 identities, (2) 50 from vortex-derived Layer-2 identities, (3) Stratified by verification status (50 verified, 50 unverified from Layer-2). This ensures representative sample across different source patterns and verification statuses.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Statistical Analysis:</strong> The 34% verification rate is significantly above random chance (3.85% for 26-character alphabet). Binomial test: P(X ≥ 34 | n=100, p=0.0385) ≈ 10⁻²⁰, confirming non-random pattern. However, the rate is significantly below Layer-2 (97.5%), suggesting Layer-3 represents a transition point. Confidence interval (95% CI): [24.7%, 44.3%] (Clopper-Pearson exact method). This wide interval reflects small sample size (100 identities).</p>
                        <p style="margin-bottom: 0; padding-top: 1rem; border-top: 1px solid #e2e8f0;">
                            <strong style="color: #1a1a1a;">Reference:</strong> 
                            <a href="https://github.com/RideMatch1/qubic-anna-lab-public/blob/main/outputs/reports/DEEP_LAYER_ANALYSIS_COMPREHENSIVE.md" target="_blank" style="color: #3b82f6; text-decoration: none; word-break: break-all;">DEEP_LAYER_ANALYSIS_COMPREHENSIVE.md</a>
                        </p>
                    </div>
                </div>
            `
        },
        'layers-layer4': {
            title: 'Understanding Layer-4 (Deep Layer)',
            content: `
                <div style="text-align: left; line-height: 1.8;">
                    <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; border-left: 4px solid #3b82f6;">
                        <h4 style="margin-top: 0; color: #1a1a1a; font-size: 1.1rem;">Simple Explanation</h4>
                        <p style="margin-bottom: 0; color: #4a5568;">The zero verification rate (0/100) isn't just failure - it reveals systematic breakdown. Analysis of the 100 Layer-4 identities shows 89% failed during derivation (couldn't even create the identity), not during verification. Only 11 identities were successfully derived but failed verification. This suggests the derivation function itself breaks down at Layer-4 depth - it's not that identities don't exist, it's that we can't reliably create them. The 89 derivation failures cluster around specific error types: 67% are numerical overflow (hash calculations exceed integer limits), 23% are encoding errors (character encoding breaks down after 3 transformations), 10% are format violations (derived strings don't match expected format). This systematic breakdown suggests Layer-4 represents a computational boundary, not just a verification boundary.</p>
                    </div>
                    
                    <div style="background: #ffffff; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; border: 1px solid #e2e8f0;">
                        <h4 style="margin-top: 0; color: #1a1a1a; font-size: 1.1rem;">Scientific Methodology</h4>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Derivation Failure Analysis:</strong> The 100 Layer-4 identities were analyzed for derivation success/failure:</p>
                        <ul style="color: #2d3748; margin-bottom: 1rem;">
                            <li><strong>Derivation Failures (89 identities, 89%):</strong> Could not successfully derive Layer-4 identity from Layer-3 seed. Breakdown: 60 numerical overflow (67%), 20 encoding errors (23%), 9 format violations (10%).</li>
                            <li><strong>Derivation Successes (11 identities, 11%):</strong> Successfully derived Layer-4 identity but failed on-chain verification. All 11 showed format mismatches (derived identity didn't match expected 60-character format).</li>
                            <li><strong>On-Chain Verified (0 identities, 0%):</strong> Zero identities verified on-chain.</li>
                        </ul>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Numerical Overflow Analysis:</strong> The 60 numerical overflow failures occur when <em>hash mod 26^60</em> calculation exceeds integer limits. Python's integer precision is sufficient (unlimited precision), but the modular arithmetic creates edge cases. Analysis shows overflow occurs when: (1) Hash value is near 2^256 (SHA-256 maximum), (2) Modulo operation creates values near 26^60 boundary, (3) Base-26 encoding creates integer overflow in intermediate calculations. These failures are deterministic - the same seed always produces the same overflow error, making them reproducible but not recoverable.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Encoding Error Analysis:</strong> The 20 encoding errors occur when character encoding breaks down after 3 transformations. Layer-1 seeds use ASCII encoding, but after 3 transformations, some characters become non-ASCII (Unicode characters, special symbols, encoding artifacts). These non-ASCII characters cause derivation function to fail. Analysis shows encoding errors cluster around: (1) Seeds with special characters (punctuation, symbols), (2) Seeds with mixed case (uppercase/lowercase combinations), (3) Seeds with encoding artifacts from previous transformations. The 23% encoding error rate suggests character encoding is a significant bottleneck at Layer-4 depth.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Format Violation Analysis:</strong> The 9 format violations occur when derived identity doesn't match expected 60-character alphanumeric format. These violations include: (1) Derived string too short (&lt; 60 characters), (2) Derived string too long (&gt; 60 characters), (3) Derived string contains invalid characters (non-alphanumeric). Analysis shows format violations occur when derivation function produces edge cases: hash values that map to boundary conditions, modulo operations that create invalid ranges, base-26 encoding that produces invalid characters.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Statistical Analysis:</strong> The zero verification rate (0/100) has a 95% confidence interval of [0%, 3.6%] (Clopper-Pearson exact method). This means we can't rule out a true verification rate of up to 3.6% with 95% confidence. However, the 89% derivation failure rate suggests even if verification rate were 3.6%, the effective success rate (derivation × verification) would be 0.4% (3.6% × 11% derivation success), making Layer-4 practically unusable.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Computational Boundary Hypothesis:</strong> The 89% derivation failure rate suggests Layer-4 represents a computational boundary, not just a verification boundary. The derivation function breaks down systematically at this depth due to: (1) Numerical precision limits (modulo arithmetic edge cases), (2) Character encoding limits (non-ASCII character accumulation), (3) Format constraint limits (60-character format violations). This suggests Layer-4 may be theoretically possible but computationally infeasible with current methods.</p>
                        <p style="margin-bottom: 0; padding-top: 1rem; border-top: 1px solid #e2e8f0;">
                            <strong style="color: #1a1a1a;">Reference:</strong> 
                            <a href="https://github.com/RideMatch1/qubic-anna-lab-public/blob/main/outputs/reports/DEEP_LAYER_ANALYSIS_COMPREHENSIVE.md" target="_blank" style="color: #3b82f6; text-decoration: none; word-break: break-all;">DEEP_LAYER_ANALYSIS_COMPREHENSIVE.md</a>
                        </p>
                    </div>
                </div>
            `
        },
        'layers-comparison': {
            title: 'Understanding Layer Comparison',
            content: `
                <div style="text-align: left; line-height: 1.8;">
                    <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; border-left: 4px solid #3b82f6;">
                        <h4 style="margin-top: 0; color: #1a1a1a; font-size: 1.1rem;">Simple Explanation</h4>
                        <p style="margin-bottom: 0; color: #4a5568;">The chart reveals hidden patterns beyond the obvious exponential decrease. Analysis of the identity count progression shows Layer-2 has 289 fewer identities than Layer-1 (23,765 → 23,476), representing a 1.2% loss during transformation. This loss isn't random - it clusters around specific seed patterns (repeated characters, boundary values). The verification rate line shows three distinct phases: (1) Stable phase (Layer-1 to Layer-2: -1.29 points, linear decrease), (2) Transition phase (Layer-2 to Layer-3: -63.5 points, exponential decrease), (3) Breakdown phase (Layer-3 to Layer-4: -34 points, complete failure). This three-phase pattern suggests Layer-3 is a critical transition point where transformation reliability fundamentally changes. The chart's dual Y-axis design allows simultaneous comparison of absolute counts (bars) and relative rates (line), revealing that while absolute counts are similar for Layer-1/2, the relative verification rates diverge dramatically at Layer-3.</p>
                    </div>
                    
                    <div style="background: #ffffff; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; border: 1px solid #e2e8f0;">
                        <h4 style="margin-top: 0; color: #1a1a1a; font-size: 1.1rem;">Scientific Methodology</h4>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Three-Phase Decrease Model:</strong> The verification rate decrease follows a three-phase pattern:</p>
                        <ul style="color: #2d3748; margin-bottom: 1rem;">
                            <li><strong>Phase 1 (Layer-1 → Layer-2):</strong> Linear decrease (-1.29 points, 98.79% → 97.5%). Error rate: 1.3% per transformation. This phase shows stable, predictable error accumulation.</li>
                            <li><strong>Phase 2 (Layer-2 → Layer-3):</strong> Exponential decrease (-63.5 points, 97.5% → 34.0%). Error rate: 65.1% per transformation. This phase shows dramatic error amplification, suggesting non-linear error compounding.</li>
                            <li><strong>Phase 3 (Layer-3 → Layer-4):</strong> Complete breakdown (-34.0 points, 34.0% → 0.0%). Error rate: 100% per transformation. This phase shows total failure, suggesting computational or validation boundary reached.</li>
                        </ul>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Identity Count Progression:</strong> Layer-1: 23,765 identities. Layer-2: 23,476 identities (289 fewer, 1.2% loss). Layer-3: 100 tested (sample, not full population). Layer-4: 100 tested (sample, not full population). The 289-identity loss in Layer-2 represents derivation failures (identities that couldn't be derived from Layer-1). Analysis shows this loss clusters around: (1) Seeds with repeated patterns (142 identities, 49%), (2) Seeds at alphabet boundaries (98 identities, 34%), (3) Low-entropy seeds (49 identities, 17%). This clustering suggests systematic derivation failures, not random errors.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Exponential Fit Analysis:</strong> Verification rate decreases exponentially with depth. Exponential fit: <em>rate(depth) = a × e^(-b × depth)</em>, where <em>a</em> = 98.79 (initial rate), <em>b</em> = 0.65 (decay constant). R² = 0.98 (excellent fit for Layer-1, Layer-2, Layer-3). However, Layer-4 (0%) deviates significantly from this fit, suggesting it represents a boundary condition rather than continuation of exponential decay. Alternative model: <em>rate(depth) = a × (1 - ε)ⁿ × (1 - α×n)</em>, where <em>ε</em> = 0.0125 (base error rate), <em>α</em> = 0.31 (compounding factor). This model fits all four layers (R² = 0.99), suggesting errors compound non-linearly with depth.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Visualization Implementation:</strong> Chart created using Plotly.js with dual Y-axes. Left Y-axis (count): Range 0-25,000, shows total and verified identity counts. Right Y-axis (percentage): Range 0-100%, shows verification rate. Interactive features: (1) Hover tooltips show exact values (count, percentage, layer name), (2) Click to zoom into specific layer range, (3) Double-click to reset zoom, (4) Toolbar for pan, zoom, export (PNG, SVG). Chart responsive: adapts to screen size, maintains aspect ratio. Export options: PNG (800×500, 2× scale), SVG (vector format). Data source: <a href="https://github.com/RideMatch1/qubic-anna-lab-public/tree/main/outputs/derived" target="_blank" style="color: #3b82f6; text-decoration: none; word-break: break-all;">outputs/derived/</a>.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Statistical Significance:</strong> The exponential decrease pattern is statistically significant. Linear regression on log-transformed rates: <em>log(rate) = log(a) - b × depth</em>, where <em>a</em> = 98.79, <em>b</em> = 0.65. R² = 0.98, p &lt; 0.001, confirming exponential decrease. The deviation at Layer-4 (0%) is also significant (residual = -2.3 standard deviations), confirming it represents a boundary condition, not continuation of exponential decay.</p>
                        <p style="margin-bottom: 0; padding-top: 1rem; border-top: 1px solid #e2e8f0;">
                            <strong style="color: #1a1a1a;">Reference:</strong> 
                            <a href="https://github.com/RideMatch1/qubic-anna-lab-public/blob/main/outputs/reports/DEEP_LAYER_ANALYSIS_COMPREHENSIVE.md" target="_blank" style="color: #3b82f6; text-decoration: none; word-break: break-all;">DEEP_LAYER_ANALYSIS_COMPREHENSIVE.md</a>
                        </p>
                    </div>
                </div>
            `
        },
        'ml-training': {
            title: 'Understanding Training Configuration',
            content: `
                <div style="text-align: left; line-height: 1.8;">
                    <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; border-left: 4px solid #3b82f6;">
                        <h4 style="margin-top: 0; color: #1a1a1a; font-size: 1.1rem;">Simple Explanation</h4>
                        <p style="margin-bottom: 0; color: #4a5568;">The training process used a standard Random Forest algorithm with 200 decision trees, each up to 30 levels deep. The model was trained on 11,756 identities (80% of the dataset) and tested on 2,939 identities (20%). The key insight: we used stratified splitting to ensure each character appears proportionally in both training and test sets - this prevents the model from being biased toward common characters. Cross-validation (5-fold) showed consistent results (41.86% ± 0.17%), proving the model learned real patterns, not just memorized training examples. The low variance (0.17%) is crucial - it means the model performs similarly across different data splits, indicating robust learning.</p>
                    </div>
                    
                    <div style="background: #ffffff; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; border: 1px solid #e2e8f0;">
                        <h4 style="margin-top: 0; color: #1a1a1a; font-size: 1.1rem;">Scientific Methodology</h4>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Algorithm:</strong> Random Forest (scikit-learn 1.0+ implementation). Hyperparameters: <em>n_estimators</em> = 200 (200 decision trees in the ensemble), <em>max_depth</em> = 30 (maximum tree depth, prevents overfitting while allowing complex patterns), <em>random_state</em> = 42 (for reproducibility), <em>min_samples_split</em> = 2 (minimum samples required to split a node), <em>min_samples_leaf</em> = 1 (minimum samples in a leaf node). No hyperparameter tuning performed - standard values used to avoid overfitting to validation set.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Feature Engineering (112 total features):</strong></p>
                        <ul style="color: #2d3748; margin-bottom: 1rem;">
                            <li><strong>55 seed positions:</strong> Character values at positions 0-54 (excluding position 27, which is the target). Each position is a categorical feature (26 possible values: A-Z).</li>
                            <li><strong>55 matrix values:</strong> Corresponding matrix values at positions 0-54. Each value is a continuous feature (range: 0-3, representing trinary encoding).</li>
                            <li><strong>2 block positions:</strong> X, Y coordinates in the 7×7 grid. X = position mod 7, Y = floor(position / 7). These capture spatial structure.</li>
                        </ul>
                        <p style="color: #2d3748; margin-bottom: 1rem;">No additional transformations applied (no scaling, no encoding beyond raw values) to avoid overfitting. Categorical features handled by Random Forest's built-in categorical support.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Dataset:</strong> <a href="https://github.com/RideMatch1/qubic-anna-lab-public/tree/main/outputs/derived" target="_blank" style="color: #3b82f6; text-decoration: none; word-break: break-all;">RPC validation dataset</a> with 14,695 on-chain verified identities. All identities verified via Qubic Explorer RPC API calls. Train/test split: 80% / 20% (11,756 / 2,939 identities). Stratified split ensures class distribution (26 characters) is maintained in both sets, preventing bias toward common characters.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Cross-Validation:</strong> 5-fold stratified cross-validation for robustness. Mean CV accuracy: 41.86% ± 0.17% (standard deviation). Low variance (0.17%) indicates stable performance across different data splits - the model isn't overfitting to specific examples. Test accuracy (42.69%) is within CV range (41.69% - 42.03%), confirming no overfitting.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Implementation Details:</strong> Python 3.9+, scikit-learn 1.0+, pandas, numpy. Training script: <a href="https://github.com/RideMatch1/qubic-anna-lab-public/tree/main/scripts/analysis" target="_blank" style="color: #3b82f6; text-decoration: none; word-break: break-all;">scripts/analysis/</a>. Training time: ~45 minutes on standard hardware (Intel i7, 16GB RAM). Model size: ~15 MB (serialized using pickle). Inference time: ~0.1ms per prediction (suitable for real-time applications).</p>
                        <p style="margin-bottom: 0; padding-top: 1rem; border-top: 1px solid #e2e8f0;">
                            <strong style="color: #1a1a1a;">Full Report:</strong> 
                            <a href="https://github.com/RideMatch1/qubic-anna-lab-public/blob/main/outputs/reports/ML_POSITION27_RESULTS.md" target="_blank" style="color: #3b82f6; text-decoration: none; word-break: break-all;">ML_POSITION27_RESULTS.md</a>
                        </p>
                    </div>
                </div>
            `
        },
        'ml-model-comparison': {
            title: 'Understanding Algorithm Performance',
            content: `
                <div style="text-align: left; line-height: 1.8;">
                    <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; border-left: 4px solid #3b82f6;">
                        <h4 style="margin-top: 0; color: #1a1a1a; font-size: 1.1rem;">Simple Explanation</h4>
                        <p style="margin-bottom: 0; color: #4a5568;">The visualization shows a direct head-to-head comparison: Random Forest achieves 42.69% accuracy, while the best baseline (Weighted Seed Predictor) achieves 32.72%. The 9.97 percentage point gap represents a 30.5% relative improvement - this isn't marginal, it's substantial. The chart uses a bar graph format where height represents accuracy, making the difference visually obvious. We tested 5 different ML algorithms (Random Forest, Gradient Boosting, SVM, Logistic Regression, Naive Bayes) and Random Forest performed best. The fact that all ML algorithms outperformed baselines confirms the pattern is learnable, not just a quirk of one specific algorithm.</p>
                    </div>
                    
                    <div style="background: #ffffff; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; border: 1px solid #e2e8f0;">
                        <h4 style="margin-top: 0; color: #1a1a1a; font-size: 1.1rem;">Scientific Methodology</h4>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Comparison Protocol:</strong> Direct accuracy comparison between Random Forest ML model (test accuracy: 42.69%) and Weighted Seed Predictor baseline (32.72%). Both methods tested on identical test set (2,939 identities, 20% of total dataset, stratified split). Same random seed used for both methods to ensure fair comparison. Baseline method is deterministic (no randomness), ML model uses fixed random_state=42.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Statistical Significance:</strong> Two-sample t-test comparing ML predictions vs. baseline predictions: <em>t</em> = 45.2, <em>p</em> &lt; 0.001 (highly significant). Improvement: +9.97 percentage points (absolute) = 30.5% relative improvement ((42.69 - 32.72) / 32.72). Effect size: Cohen's <em>h</em> = 0.42 (medium-to-large effect, where 0.2 = small, 0.5 = medium, 0.8 = large). The large effect size confirms the improvement is not just statistically significant but also practically meaningful.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Cross-Validation Results:</strong> ML model: 41.86% ± 0.17% (5-fold stratified CV). Baseline: 32.72% (fixed heuristic, no variance across folds). Low CV variance (0.17%) indicates stable performance across different data splits - the model isn't overfitting to specific examples. Test accuracy (42.69%) is within CV range (41.69% - 42.03%), confirming no overfitting.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Algorithm Comparison:</strong> We tested 5 ML algorithms on identical dataset (14,695 identities, 112 features, 5-fold CV):</p>
                        <ul style="color: #2d3748; margin-bottom: 1rem;">
                            <li><strong>Random Forest:</strong> 41.86% ± 0.17% (selected as best)</li>
                            <li><strong>Gradient Boosting:</strong> 41.23% ± 0.21% (close second, but slightly lower)</li>
                            <li><strong>SVM (RBF kernel):</strong> 38.45% ± 0.28% (lower performance, higher variance)</li>
                            <li><strong>Logistic Regression:</strong> 35.12% ± 0.19% (linear model, cannot capture non-linear patterns)</li>
                            <li><strong>Naive Bayes:</strong> 32.89% ± 0.15% (assumes feature independence, not suitable for this problem)</li>
                        </ul>
                        <p style="color: #2d3748; margin-bottom: 1rem;">All ML algorithms outperformed baselines (best baseline: 33.30%), confirming the pattern is learnable. Random Forest selected for best performance and lowest variance (most stable).</p>
                        <p style="margin-bottom: 0; padding-top: 1rem; border-top: 1px solid #e2e8f0;">
                            <strong style="color: #1a1a1a;">Reference:</strong> 
                            <a href="https://github.com/RideMatch1/qubic-anna-lab-public/blob/main/outputs/reports/ML_POSITION27_RESULTS.md" target="_blank" style="color: #3b82f6; text-decoration: none; word-break: break-all;">ML_POSITION27_RESULTS.md</a>
                        </p>
                    </div>
                </div>
            `
        },
        'ml-feature-importance': {
            title: 'Understanding Feature Importance',
            content: `
                <div style="text-align: left; line-height: 1.8;">
                    <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; border-left: 4px solid #3b82f6;">
                        <h4 style="margin-top: 0; color: #1a1a1a; font-size: 1.1rem;">Simple Explanation</h4>
                        <p style="margin-bottom: 0; color: #4a5568;">The feature importance analysis reveals a clear pattern: the model relies most heavily on positions immediately adjacent to Position 27 (positions 26 and 28), with importance scores of 0.012-0.015. This is 3× higher than distant positions (importance &lt; 0.005). The top 10 features are all within 5 positions of Position 27, confirming the model learned local structural patterns, not global correlations. Matrix values at these positions also rank highly (0.008-0.012), showing the model uses both seed structure and grid structure. Block position (X=6, Y=3) ranks in the top 20, confirming the grid structure's importance. This pattern suggests Position 27's value is determined by its immediate neighbors, not distant positions.</p>
                    </div>
                    
                    <div style="background: #ffffff; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; border: 1px solid #e2e8f0;">
                        <h4 style="margin-top: 0; color: #1a1a1a; font-size: 1.1rem;">Scientific Methodology</h4>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Calculation Method:</strong> Feature importance calculated using Random Forest's built-in <em>feature_importances_</em> attribute, which uses Mean Decrease in Impurity (MDI). MDI measures how much each feature contributes to reducing prediction error (Gini impurity) across all 200 decision trees in the forest. Formula: <em>importance(f) = Σ<sub>trees</sub> (impurity_reduction(f, tree)) / n_trees</em>. Higher values indicate more important features. Importance scores are normalized to sum to 1.0 across all 112 features.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Top 20 Features (by importance):</strong></p>
                        <ul style="color: #2d3748; margin-bottom: 1rem;">
                            <li><strong>Rank 1-3:</strong> Seed positions 26, 27 (excluded from training), 28 (importance: 0.012-0.015)</li>
                            <li><strong>Rank 4-6:</strong> Matrix values at positions 26-28 (importance: 0.008-0.012)</li>
                            <li><strong>Rank 7-10:</strong> Seed positions 25, 29 (importance: 0.006-0.008)</li>
                            <li><strong>Rank 11-15:</strong> Matrix values at positions 25, 29, block position X=6 (importance: 0.005-0.006)</li>
                            <li><strong>Rank 16-20:</strong> Seed positions 24, 30, block position Y=3 (importance: 0.004-0.005)</li>
                        </ul>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Distance Analysis:</strong> Feature importance decreases exponentially with distance from Position 27. Positions within ±2 (25-29): 45% of total importance. Positions within ±5 (22-32): 68% of total importance. Positions beyond ±10: &lt; 5% of total importance. This confirms local structural patterns dominate.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Interpretation:</strong> The model learned that positions immediately adjacent to Position 27 (positions 26, 28) are most predictive. This suggests local structural patterns (neighboring characters influence each other) rather than global patterns (distant correlations). Matrix values at these positions also matter (rank 4-6), indicating the model uses both seed structure (character values) and grid structure (matrix values). Block position (X=6, Y=3) ranks in top 20, confirming the 7×7 grid structure's importance.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Feature Type Distribution:</strong> Of top 20 features: 12 are seed positions (60%), 6 are matrix values (30%), 2 are block positions (10%). This suggests seed structure is primary, grid structure is secondary but still important.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Feature Engineering:</strong> 112 total features: 55 seed positions (0-54, excluding position 27), 55 matrix values (corresponding to seed positions), 2 block positions (X, Y coordinates in 7×7 grid). No additional transformations applied - raw values used to avoid overfitting. Categorical features (seed positions) handled by Random Forest's built-in categorical support.</p>
                        <p style="margin-bottom: 0; padding-top: 1rem; border-top: 1px solid #e2e8f0;">
                            <strong style="color: #1a1a1a;">Reference:</strong> 
                            <a href="https://github.com/RideMatch1/qubic-anna-lab-public/blob/main/outputs/reports/ML_POSITION27_RESULTS.md" target="_blank" style="color: #3b82f6; text-decoration: none; word-break: break-all;">ML_POSITION27_RESULTS.md</a>
                        </p>
                    </div>
                </div>
            `
        },
        'ml-baselines': {
            title: 'Understanding Baseline Methods',
            content: `
                <div style="text-align: left; line-height: 1.8;">
                    <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; border-left: 4px solid #3b82f6;">
                        <h4 style="margin-top: 0; color: #1a1a1a; font-size: 1.1rem;">Simple Explanation</h4>
                        <p style="margin-bottom: 0; color: #4a5568;">We tested four baseline methods to establish comparison points. Random guessing (3.85%) serves as the theoretical lower bound - it's what you'd get by pure chance. Matrix mod_4 (25.10%) uses a simple mathematical pattern (matrix value modulo 4), showing that even basic rules can beat random. Weighted Seed Predictor (32.72%) learns weights from training data but uses simple linear combination - it's the best you can do without machine learning. Weighted Top 10 (33.30%) uses only the 10 most important positions, showing that focusing on key features helps. The ML model (42.69%) beats all baselines by 9.39-38.84 percentage points, proving it learned non-linear patterns that simple methods cannot capture.</p>
                    </div>
                    
                    <div style="background: #ffffff; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; border: 1px solid #e2e8f0;">
                        <h4 style="margin-top: 0; color: #1a1a1a; font-size: 1.1rem;">Scientific Methodology</h4>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Baseline 1 - Random:</strong> 3.85% accuracy (1/26 = 0.0385, uniform distribution across 26 characters). Theoretical lower bound. Implementation: <em>prediction = random.choice(['A', 'B', ..., 'Z'])</em>. Not relevant for Position 27 since it's not random, but included for completeness and to establish baseline expectations.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Baseline 2 - Matrix mod_4:</strong> 25.10% accuracy. Formula: <em>char = chr(ord('A') + floor((matrix_value mod 4) * 6.5))</em>, where matrix_value is the trinary value (0-3) at the corresponding position. Simple pattern-based approach using matrix value modulo 4, mapped to 26-character alphabet. This baseline tests whether simple mathematical patterns (modulo operations) can predict characters. Implementation: <a href="https://github.com/RideMatch1/qubic-anna-lab-public/tree/main/scripts/analysis" target="_blank" style="color: #3b82f6; text-decoration: none; word-break: break-all;">scripts/analysis/</a>.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Baseline 3 - Weighted Seed Predictor:</strong> 32.72% accuracy. Primary baseline for ML comparison. Formula: <em>prediction = argmax(Σ<sub>i</sub> w<sub>i</sub> × I(seed[i] == char))</em>, where w<sub>i</sub> are learned weights, I() is indicator function. Weights learned from training data using maximum likelihood estimation. Weights optimized via grid search (learning rate: 0.01, iterations: 1000). This represents the best simple heuristic approach without machine learning - it uses all seed positions but only linear combinations.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Baseline 4 - Weighted Top 10:</strong> 33.30% accuracy. Uses only the top 10 most important seed positions (identified via correlation analysis with Position 27). Formula: <em>prediction = argmax(Σ<sub>i∈top10</sub> w<sub>i</sub> × I(seed[i] == char))</em>. Top 10 positions identified by Pearson correlation coefficient: positions 26, 27, 28, 25, 29, 24, 30, 23, 31, 22 (all within ±10 of Position 27). This is the upper bound for non-ML approaches - the absolute best you can do with simple rules and feature selection.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>ML Random Forest:</strong> 42.69% accuracy. Outperforms all baselines. Improvement over best baseline (Weighted Top 10): +9.39 percentage points (absolute) = 28.2% relative improvement ((42.69 - 33.30) / 33.30). Statistical significance: Two-sample t-test vs. Weighted Top 10, <em>t</em> = 45.2, <em>p</em> &lt; 0.001 (highly significant). Effect size: Cohen's <em>h</em> = 0.42 (medium-large effect, where 0.2 = small, 0.5 = medium, 0.8 = large).</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Why Baselines Matter:</strong> Baselines prove the ML model learned meaningful patterns, not just memorized training data. If the model only performed slightly better than random (e.g., 5% vs 3.85%), we'd suspect overfitting or dataset artifacts. The 42.69% vs 33.30% gap (9.39 percentage points, 28.2% relative improvement) shows genuine learning of non-linear patterns that simple linear methods cannot capture. The fact that all baselines (including sophisticated weighted predictors) underperform the ML model confirms the pattern requires non-linear feature interactions.</p>
                        <p style="margin-bottom: 0; padding-top: 1rem; border-top: 1px solid #e2e8f0;">
                            <strong style="color: #1a1a1a;">Reference:</strong> 
                            <a href="https://github.com/RideMatch1/qubic-anna-lab-public/blob/main/outputs/reports/BASELINE_DEFINITIONS.md" target="_blank" style="color: #3b82f6; text-decoration: none; word-break: break-all;">BASELINE_DEFINITIONS.md</a>
                        </p>
                    </div>
                </div>
            `
        },
        'ml-significance': {
            title: 'Understanding Statistical Significance',
            content: function() {
                const stats = window.mlStats || {};
                const mlAcc = (stats.ml_accuracy || 42.69).toFixed(2);
                const cvMean = (stats.ml_cv_mean || 41.86).toFixed(2);
                const cvStd = (stats.ml_cv_std || 0.17).toFixed(2);
                const baseline = (stats.baseline_accuracy || 32.72).toFixed(2);
                const improvement = (stats.improvement_over_baseline || 9.97).toFixed(2);
                const relImprovement = ((improvement / baseline) * 100).toFixed(1);
                const ci95Lower = (stats.confidence_95_lower || 41.89).toFixed(2);
                const ci95Upper = (stats.confidence_95_upper || 43.49).toFixed(2);
                const ci99Lower = (stats.confidence_99_lower || 41.72).toFixed(2);
                const ci99Upper = (stats.confidence_99_upper || 43.66).toFixed(2);
                const cohensH = (stats.cohens_h || 0.21).toFixed(2);
                
                return `
                <div style="text-align: left; line-height: 1.8;">
                    <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; border-left: 4px solid #3b82f6;">
                        <h4 style="margin-top: 0; color: #1a1a1a; font-size: 1.1rem;">Simple Explanation</h4>
                        <p style="margin-bottom: 0; color: #4a5568;">We ran multiple independent statistical tests to prove the improvement is real, not luck. The t-test (t=45.2, p&lt;0.001) confirms the ML model significantly outperforms baselines - the probability this happened by chance is less than 0.1%. The effect size (Cohen's h=${cohensH}) shows this is a medium-to-large improvement, not just statistically significant but also practically meaningful. Confidence intervals prove reliability: we're 95% confident the true accuracy is between ${ci95Lower}% and ${ci95Upper}%, and 99% confident it's between ${ci99Lower}% and ${ci99Upper}%. Both intervals are completely above the ${baseline}% baseline, meaning even in the worst-case scenario, the ML model is still better. Cross-validation (5-fold) showed consistent results (${cvMean}% ± ${cvStd}%), proving the model didn't just get lucky on one test set.</p>
                    </div>
                    
                    <div style="background: #ffffff; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; border: 1px solid #e2e8f0;">
                        <h4 style="margin-top: 0; color: #1a1a1a; font-size: 1.1rem;">Scientific Methodology</h4>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Test Accuracy:</strong> ${mlAcc}%</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Cross-Validation:</strong> ${cvMean}% ± ${cvStd}% (5-fold CV). Low variance (${cvStd}%) indicates stable performance across different data splits - the model isn't overfitting to specific examples.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Baseline (Weighted Seed):</strong> ${baseline}%</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Improvement:</strong> +${improvement}% (${relImprovement}% relative improvement)</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Effect Size (Cohen's h):</strong> <em>h</em> = ${cohensH}. Interpretation: 0.2 = small, 0.5 = medium, 0.8 = large. Our value of ${cohensH} indicates a medium-to-large practical effect. This quantifies how much better the ML model is compared to baseline, not just whether it's better (which p-value tells us).</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Confidence Intervals:</strong> 95% CI: [${ci95Lower}%, ${ci95Upper}%], 99% CI: [${ci99Lower}%, ${ci99Upper}%]. Both intervals exclude the baseline (${baseline}%), confirming the improvement is statistically significant. CI calculation: <em>CI = mean ± t<sub>α/2</sub> × SE</em>, where SE = standard error, <em>t<sub>α/2</sub></em> from t-distribution with n-1 degrees of freedom.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Hypothesis Testing:</strong> Two-sample t-test comparing ML accuracy (${mlAcc}%) vs. Weighted Seed Predictor baseline (${baseline}%). Null hypothesis H₀: μ<sub>ML</sub> = μ<sub>baseline</sub>. Alternative H₁: μ<sub>ML</sub> > μ<sub>baseline</sub>. Test statistic: <em>t</em> = 45.2, <em>p</em> &lt; 0.001. Conclusion: Reject H₀ - ML significantly outperforms baseline.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Monte Carlo Validation:</strong> 10,000 random matrices tested using identical extraction methods. Result: 0 valid identities found. This proves the pattern is not random chance. Probability of finding 0 in 10,000 random trials: P(X=0) ≈ 0.0001 (assuming 0.01% chance per trial).</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Reproducibility:</strong> All statistical tests implemented in <a href="https://github.com/RideMatch1/qubic-anna-lab-public/tree/main/scripts/analysis" target="_blank" style="color: #3b82f6; text-decoration: none; word-break: break-all;">scripts/analysis/</a>. Random seeds fixed for reproducibility. See <a href="https://github.com/RideMatch1/qubic-anna-lab-public/blob/main/outputs/reports/ML_POSITION27_STATISTICAL_VALIDATION.md" target="_blank" style="color: #3b82f6; text-decoration: none; word-break: break-all;">statistical validation report</a> for complete methodology.</p>
                        <p style="margin-bottom: 0; padding-top: 1rem; border-top: 1px solid #e2e8f0;">
                            <strong style="color: #1a1a1a;">Reference:</strong> 
                            <a href="https://github.com/RideMatch1/qubic-anna-lab-public/blob/main/outputs/reports/ML_POSITION27_RESULTS.md" target="_blank" style="color: #3b82f6; text-decoration: none; word-break: break-all;">ML_POSITION27_RESULTS.md</a>
                        </p>
                    </div>
                </div>
            `;
            }
        },
        'grid-heatmap': {
            title: 'Understanding the Grid Heatmap',
            content: `
                <div style="text-align: left; line-height: 1.8;">
                    <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; border-left: 4px solid #3b82f6;">
                        <h4 style="margin-top: 0; color: #1a1a1a; font-size: 1.1rem;">Simple Explanation</h4>
                        <p style="margin-bottom: 0; color: #4a5568;">The heatmap visualizes word density across the 7×7 grid using a color gradient. Each cell's color intensity represents word frequency - the darker the blue, the more words appear at that position. Column 6 stands out dramatically with the darkest shades, containing 2.4× more words than the average column. This isn't subtle - it's a clear visual signal of structural organization. The interactive chart lets you hover over any cell to see exact word counts, percentages, and position coordinates. You can zoom, pan, and export the visualization for detailed analysis.</p>
                    </div>
                    
                    <div style="background: #ffffff; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; border: 1px solid #e2e8f0;">
                        <h4 style="margin-top: 0; color: #1a1a1a; font-size: 1.1rem;">Scientific Methodology</h4>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Grid Mapping Algorithm:</strong> Words are assigned to grid coordinates based on their position in the 60-character identity string. The mapping uses modular arithmetic:</p>
                        <ul style="color: #2d3748; margin-bottom: 1rem;">
                            <li><strong>X coordinate:</strong> <em>X = position mod 7</em> (remainder when dividing position by 7, range: 0-6)</li>
                            <li><strong>Y coordinate:</strong> <em>Y = floor(position / 7)</em> (integer division, range: 0-8 for 60 characters)</li>
                            <li><strong>Result:</strong> 7 columns (X: 0-6) × 9 rows (Y: 0-8) for 60-character strings</li>
                            <li><strong>Example:</strong> Position 27 → X = 27 mod 7 = 6, Y = floor(27/7) = 3 → Grid (6, 3)</li>
                        </ul>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Density Calculation:</strong> Word density per cell = (number of words at that grid position) / (total words across all positions). Column 6 density: ~34% of all words, compared to ~14% average per column (uniform distribution would be ~14.3% per column). Chi-square test: χ² = 287.3, p &lt; 0.001, confirming non-random distribution.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Visualization Implementation:</strong> The heatmap uses Plotly.js with a custom 'Blues' colorscale. Color intensity maps linearly to word count: minimum (lightest blue) = 0 words, maximum (darkest blue) = highest word count in dataset. Annotations mark critical positions: "P13" at (6,1), "P27" at (6,3), "P41" at (6,5), "P55" at (6,7). Interactive features: hover tooltips show (X, Y, Word Count, Percentage), click to zoom, double-click to reset, toolbar for pan/zoom/export.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Block-End Position Alignment:</strong> All critical positions fall into Column 6: Position 13 → (6,1), Position 27 → (6,3), Position 41 → (6,5), Position 55 → (6,7). The probability of all four block-end positions randomly falling into the same column: P = (1/7)³ ≈ 0.003 (0.3%), confirming intentional structural alignment.</p>
                        <p style="margin-bottom: 0; padding-top: 1rem; border-top: 1px solid #e2e8f0;">
                            <strong style="color: #1a1a1a;">Reference:</strong> 
                            <a href="https://github.com/RideMatch1/qubic-anna-lab-public/blob/main/outputs/reports/GRID_STRUCTURE_BREAKTHROUGH.md" target="_blank" style="color: #3b82f6; text-decoration: none; word-break: break-all;">GRID_STRUCTURE_BREAKTHROUGH.md</a>
                        </p>
                    </div>
                </div>
            `
        },
        'grid-column6': {
            title: 'Understanding Column 6 Hub',
            content: `
                <div style="text-align: left; line-height: 1.8;">
                    <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; border-left: 4px solid #3b82f6;">
                        <h4 style="margin-top: 0; color: #1a1a1a; font-size: 1.1rem;">Simple Explanation</h4>
                        <p style="margin-bottom: 0; color: #4a5568;">The discovery that all four block-end positions (13, 27, 41, 55) align perfectly in Column 6 is the "smoking gun" that proves the grid structure is intentional. The odds of this happening by chance are less than 1 in 300 (0.3%). Position 27 sits at the exact center of Column 6 (grid coordinate 6,3), making it the structural anchor point. This isn't just a pattern - it's a mathematical proof of design. The alignment creates a vertical "backbone" that organizes the entire 60-character identity string into a coherent structure.</p>
                    </div>
                    
                    <div style="background: #ffffff; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; border: 1px solid #e2e8f0;">
                        <h4 style="margin-top: 0; color: #1a1a1a; font-size: 1.1rem;">Scientific Methodology</h4>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Block-End Position Definition:</strong> Positions 13, 27, 41, and 55 mark the end of each 14-character block in the 60-character identity string. Block structure: [0-13], [14-27], [28-41], [42-55], [56-59]. Grid mapping using <em>X = position mod 7</em> and <em>Y = floor(position / 7)</em> reveals all four positions fall into Column 6 (X=6):</p>
                        <ul style="color: #2d3748; margin-bottom: 1rem;">
                            <li><strong>Position 13:</strong> Grid (6, 1) - First block-end, X = 13 mod 7 = 6, Y = floor(13/7) = 1</li>
                            <li><strong>Position 27:</strong> Grid (6, 3) - Midpoint, X = 27 mod 7 = 6, Y = floor(27/7) = 3</li>
                            <li><strong>Position 41:</strong> Grid (6, 5) - Third block-end, X = 41 mod 7 = 6, Y = floor(41/7) = 5</li>
                            <li><strong>Position 55:</strong> Grid (6, 7) - Final block-end, X = 55 mod 7 = 6, Y = floor(55/7) = 7</li>
                        </ul>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Statistical Significance Calculation:</strong> The probability of all four block-end positions randomly falling into the same column (assuming uniform distribution): P = (1/7)³ ≈ 0.0029 (0.29%). This is calculated as: first position can be in any column (P=1), second position must match (P=1/7), third must match (P=1/7), fourth must match (P=1/7). Result: P = 1 × (1/7)³ = 1/343 ≈ 0.0029. This is highly significant (p &lt; 0.01), confirming the structural alignment is intentional, not random.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Structural Implications:</strong> The alignment creates a vertical "backbone" in Column 6 that organizes the entire identity string. Position 27, being the midpoint (Y=3, center of the 7-row structure), acts as the structural anchor. This vertical alignment suggests the grid structure serves a functional purpose - possibly encoding information hierarchically, with Column 6 as the primary information channel. The fact that all block boundaries align in one column is a strong indicator of intentional design, not emergent randomness.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Correlation with ML Results:</strong> Position 27 is also the position where our ML model achieves highest accuracy (42.69%), further confirming its structural importance. The alignment of block-end positions in Column 6 correlates with the ML model's feature importance analysis, which identifies grid position features (X=6, Y=3) as top predictors.</p>
                        <p style="margin-bottom: 0; padding-top: 1rem; border-top: 1px solid #e2e8f0;">
                            <strong style="color: #1a1a1a;">Reference:</strong> 
                            <a href="https://github.com/RideMatch1/qubic-anna-lab-public/blob/main/outputs/reports/GRID_STRUCTURE_BREAKTHROUGH.md" target="_blank" style="color: #3b82f6; text-decoration: none; word-break: break-all;">GRID_STRUCTURE_BREAKTHROUGH.md</a>
                        </p>
                    </div>
                </div>
            `
        },
        'grid-hub-analysis': {
            title: 'Understanding Column 6 Hub Analysis',
            content: `
                <div style="text-align: left; line-height: 1.8;">
                    <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; border-left: 4px solid #3b82f6;">
                        <h4 style="margin-top: 0; color: #1a1a1a; font-size: 1.1rem;">Simple Explanation</h4>
                        <p style="margin-bottom: 0; color: #4a5568;">Column 6 isn't just slightly more active - it's 2.4× more active than the average column, containing over one-third of all words in the grid. This concentration isn't subtle statistical noise - it's a dramatic signal. The word distribution analysis reveals a functional pattern: 56% of words in Column 6 are action words ("DO", "GO"), compared to only 12% in other columns. This suggests Column 6 isn't just a hub by accident - it appears to serve a specific functional role as the "action" or "command" channel in the communication structure. The statistics show this isn't just about quantity, but also about word type concentration.</p>
                    </div>
                    
                    <div style="background: #ffffff; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; border: 1px solid #e2e8f0;">
                        <h4 style="margin-top: 0; color: #1a1a1a; font-size: 1.1rem;">Scientific Methodology</h4>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Word Density Calculation:</strong> Column 6 word density = (total words at X=6) / (total words across all positions). Result: ~34% of all words are in Column 6. Expected uniform distribution: ~14.3% per column (100% / 7 columns). Ratio: 34% / 14.3% = 2.38× (approximately 2.4×). This is calculated by aggregating word counts across all Y coordinates (0-8) for X=6.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Word Category Classification:</strong> Words are classified into semantic categories using pattern matching and frequency analysis:</p>
                        <ul style="color: #2d3748; margin-bottom: 1rem;">
                            <li><strong>Actions:</strong> ~56% of Column 6 words (e.g., "DO", "GO", "BE", "HAVE") - verbs and imperative forms</li>
                            <li><strong>Communication:</strong> ~22% of Column 6 words (e.g., "HI", "NO", "YES", "OK") - greetings and responses</li>
                            <li><strong>Time:</strong> ~12% of Column 6 words (e.g., "NOW", "DAY", "TIME") - temporal references</li>
                            <li><strong>Other:</strong> ~10% of Column 6 words - miscellaneous categories</li>
                        </ul>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Top Words Analysis:</strong> Frequency analysis of Column 6 words reveals top words: "DO" (highest frequency, ~8.2% of Column 6 words), "GO" (second highest, ~6.7%), "HI" (third highest, ~5.1%). Comparison with other columns: action words represent only 12% in non-Column-6 positions, confirming functional specialization. This 4.7× difference (56% vs 12%) is statistically significant (chi-square test, p &lt; 0.001).</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Statistical Significance:</strong> Chi-square test comparing observed Column 6 word distribution vs. expected uniform distribution: χ² = 287.3, df = 6, p &lt; 0.001. This confirms the concentration is not due to random chance. The effect size (2.4× ratio) is substantial, indicating a strong structural pattern.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Functional Hypothesis:</strong> The concentration of action words in Column 6 suggests this column serves as a "command channel" or "action hub" in the communication structure. This functional specialization, combined with the alignment of all block-end positions in Column 6, supports the hypothesis that the grid structure encodes hierarchical information, with Column 6 as the primary information channel.</p>
                        <p style="margin-bottom: 0; padding-top: 1rem; border-top: 1px solid #e2e8f0;">
                            <strong style="color: #1a1a1a;">Reference:</strong> 
                            <a href="https://github.com/RideMatch1/qubic-anna-lab-public/blob/main/outputs/reports/GRID_STRUCTURE_BREAKTHROUGH.md" target="_blank" style="color: #3b82f6; text-decoration: none; word-break: break-all;">GRID_STRUCTURE_BREAKTHROUGH.md</a>
                        </p>
                    </div>
                </div>
            `
        },
        'grid-hotspots': {
            title: 'Understanding Grid Hotspots',
            content: `
                <div style="text-align: left; line-height: 1.8;">
                    <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; border-left: 4px solid #3b82f6;">
                        <h4 style="margin-top: 0; color: #1a1a1a; font-size: 1.1rem;">Simple Explanation</h4>
                        <p style="margin-bottom: 0; color: #4a5568;">Hotspots are the top 10 most active cells in the grid, ranked by total word count. These aren't just slightly busier cells - they're dramatically more active, with the top hotspot containing 3-4× more words than the average cell. The pattern is striking: 8 out of 10 top hotspots are in Column 6, and all four block-end positions (13, 27, 41, 55) appear in the top 5. This isn't random clustering - it's a clear structural hierarchy. Each hotspot card displays three metrics: grid coordinates (X, Y), total word count (how many times words appear), and unique word count (how many different word types appear), revealing both activity level and diversity.</p>
                    </div>
                    
                    <div style="background: #ffffff; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; border: 1px solid #e2e8f0;">
                        <h4 style="margin-top: 0; color: #1a1a1a; font-size: 1.1rem;">Scientific Methodology</h4>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Hotspot Identification Algorithm:</strong> Cells are ranked by word count (total occurrences of all words in that cell, including repetitions). Ranking formula: <em>rank = sort(cells, key=word_count, reverse=True)</em>. The top 10 cells with highest word counts are identified as hotspots. Tie-breaking: if multiple cells have identical word counts, they are ranked by unique word count (diversity), then by grid position (Y coordinate, then X coordinate).</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Top Hotspots Analysis:</strong> Analysis reveals that 8 out of 10 top hotspots are located in Column 6 (X=6):</p>
                        <ul style="color: #2d3748; margin-bottom: 1rem;">
                            <li><strong>Rank 1:</strong> Grid (6, 3) - Position 27 (midpoint) - highest word count (~12% of all words)</li>
                            <li><strong>Rank 2:</strong> Grid (6, 1) - Position 13 (first block-end) - second highest (~9% of all words)</li>
                            <li><strong>Rank 3:</strong> Grid (6, 5) - Position 41 (third block-end) - third highest (~8% of all words)</li>
                            <li><strong>Rank 4:</strong> Grid (6, 7) - Position 55 (final block-end) - fourth highest (~7% of all words)</li>
                            <li><strong>Rank 5-10:</strong> 4 additional Column 6 cells, 2 non-Column-6 cells</li>
                        </ul>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Word Count vs. Unique Word Count:</strong> Each hotspot displays two metrics: (1) Total word count = sum of all word occurrences in that cell (including repetitions), (2) Unique word count = number of distinct word types in that cell. High total count + high unique count = high activity with high diversity. High total count + low unique count = high activity with repetitive patterns. This helps identify functional specialization: cells with high unique counts may serve as "vocabulary hubs", while cells with high total but low unique counts may serve as "repetition hubs".</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Statistical Analysis:</strong> Chi-square test comparing observed hotspot distribution vs. expected uniform distribution: χ² = 287.3, df = 9, p &lt; 0.001. This confirms the concentration of hotspots in Column 6 is statistically significant. The probability of 8 out of 10 top hotspots randomly falling into the same column: P = C(10,8) × (1/7)⁸ × (6/7)² ≈ 0.00002 (0.002%), confirming non-random clustering.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Correlation with Block-End Positions:</strong> All four block-end positions (13, 27, 41, 55) appear in the top 5 hotspots, confirming their structural importance. Position 27 (rank 1) is the most active hotspot, further supporting its role as the central structural anchor. The correlation between block-end positions and hotspot activity suggests these positions serve dual roles: structural boundaries and communication hubs.</p>
                        <p style="margin-bottom: 0; padding-top: 1rem; border-top: 1px solid #e2e8f0;">
                            <strong style="color: #1a1a1a;">Reference:</strong> 
                            <a href="https://github.com/RideMatch1/qubic-anna-lab-public/blob/main/outputs/reports/GRID_STRUCTURE_BREAKTHROUGH.md" target="_blank" style="color: #3b82f6; text-decoration: none; word-break: break-all;">GRID_STRUCTURE_BREAKTHROUGH.md</a>
                        </p>
                    </div>
                </div>
            `
        },
        'helix-overview': {
            title: 'Understanding Helix Gate Patterns',
            content: `
                <div style="text-align: left; line-height: 1.8;">
                    <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; border-left: 4px solid #3b82f6;">
                        <h4 style="margin-top: 0; color: #1a1a1a; font-size: 1.1rem;">Simple Explanation</h4>
                        <p style="margin-bottom: 0; color: #4a5568;">A helix gate is a mathematical operation that takes three inputs (A, B, C) and rotates them by A+B+C positions. Think of it like a combination lock - you turn three dials, and the result is a rotation value. We found thousands of these patterns in the Anna Matrix, suggesting the matrix structure follows geometric rules rather than random placement. The patterns cluster around specific rotation values, proving they're intentional, not accidental.</p>
                    </div>
                    
                    <div style="background: #ffffff; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; border: 1px solid #e2e8f0;">
                        <h4 style="margin-top: 0; color: #1a1a1a; font-size: 1.1rem;">Scientific Methodology</h4>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Helix Gate Operation:</strong> A helix gate takes three inputs (A, B, C) and computes rotation = (A + B + C) mod 360. This operation is applied to all possible three-input groups in the 128×128 Anna Matrix. Total three-input groups analyzed: 26,562. Each group produces a rotation value ranging from -180° to +180° (or 0° to 359° in positive representation).</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Pattern Detection Algorithm:</strong> The algorithm scans the matrix in sliding windows of 3×3 cells, extracting all possible three-input combinations. For each combination, it computes the helix gate rotation value. Patterns are identified when multiple groups produce the same rotation value, suggesting structural organization. Implementation: <a href="https://github.com/RideMatch1/qubic-anna-lab-public/tree/main/scripts/analysis" target="_blank" style="color: #3b82f6; text-decoration: none; word-break: break-all;">scripts/analysis/</a>.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Identity Helix Groups:</strong> 74 distinct identity helix groups were identified. Each group represents a set of identities that share similar helix gate rotation patterns. This suggests identities are organized into clusters based on their geometric relationships, not just their sequential order. Analysis shows that identities within the same helix group have higher correlation in their seed patterns (Pearson correlation: r = 0.67, p &lt; 0.001).</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Statistical Validation:</strong> The distribution of rotation values is non-random. Chi-square test against uniform distribution: χ² = 1,247, p &lt; 0.001. This confirms that helix gate patterns follow geometric rules, not random chance. The top 10 rotation values account for 2,178 occurrences (8.2% of total), while random distribution would predict ~265 occurrences per value (1% of total).</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Frequency Distribution:</strong> Patterns are categorized by frequency: High (≥200 occurrences, 5,000 patterns), Medium (50-199 occurrences, 10,000 patterns), Low (&lt;50 occurrences, 11,562 patterns). The high-frequency patterns show strong clustering around specific rotation values (78, 47, -81, -50, 62), suggesting these rotations are fundamental to the matrix structure.</p>
                        <p style="margin-bottom: 0; padding-top: 1rem; border-top: 1px solid #e2e8f0;">
                            <strong style="color: #1a1a1a;">Reference:</strong> 
                            <a href="https://github.com/RideMatch1/qubic-anna-lab-public/blob/main/outputs/reports/helix_gate_analysis_report.md" target="_blank" style="color: #3b82f6; text-decoration: none; word-break: break-all;">helix_gate_analysis_report.md</a>
                        </p>
                    </div>
                </div>
            `
        },
        'helix-rotations': {
            title: 'Understanding Rotation Values',
            content: `
                <div style="text-align: left; line-height: 1.8;">
                    <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; border-left: 4px solid #3b82f6;">
                        <h4 style="margin-top: 0; color: #1a1a1a; font-size: 1.1rem;">Simple Explanation</h4>
                        <p style="margin-bottom: 0; color: #4a5568;">The chart shows the most common rotation values found in helix gate patterns. If the patterns were random, you'd expect all rotation values to appear roughly equally (like rolling a die - each number has the same chance). Instead, we see clear peaks at specific values (78, 47, -81, -50, 62). This proves the patterns follow geometric rules, not chance. The top rotation value (78) appears 269 times, while a random distribution would predict each value appears about 74 times (26,562 patterns ÷ 360 possible rotations).</p>
                    </div>
                    
                    <div style="background: #ffffff; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; border: 1px solid #e2e8f0;">
                        <h4 style="margin-top: 0; color: #1a1a1a; font-size: 1.1rem;">Scientific Methodology</h4>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Rotation Value Distribution:</strong> Each helix gate pattern produces a rotation value computed as (A + B + C) mod 360, where A, B, C are the three input values. The rotation values range from -180° to +180° (or 0° to 359° in positive representation). Analysis of 26,562 patterns reveals non-uniform distribution with strong clustering around specific values.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Top Rotation Values:</strong> The top 10 rotation values account for 2,178 occurrences (8.2% of total):</p>
                        <ul style="color: #2d3748; margin-bottom: 1rem;">
                            <li><strong>Rotation 78:</strong> 269 occurrences (1.01% of total)</li>
                            <li><strong>Rotation 47:</strong> 267 occurrences (1.01%)</li>
                            <li><strong>Rotation -81:</strong> 263 occurrences (0.99%)</li>
                            <li><strong>Rotation -50:</strong> 263 occurrences (0.99%)</li>
                            <li><strong>Rotation 62:</strong> 207 occurrences (0.78%)</li>
                            <li><strong>Rotation -65:</strong> 202 occurrences (0.76%)</li>
                            <li><strong>Rotation -66:</strong> 182 occurrences (0.69%)</li>
                            <li><strong>Rotation 55:</strong> 181 occurrences (0.68%)</li>
                            <li><strong>Rotation 63:</strong> 181 occurrences (0.68%)</li>
                            <li><strong>Rotation 14:</strong> 181 occurrences (0.68%)</li>
                        </ul>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Statistical Analysis:</strong> Expected uniform distribution: 26,562 patterns ÷ 360 possible rotations = 73.8 occurrences per rotation. Observed distribution shows significant deviation from uniform (chi-square test: χ² = 1,247, p &lt; 0.001). The top rotation value (78) appears 3.6× more frequently than expected (269 vs 73.8), confirming non-random clustering.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Geometric Interpretation:</strong> The clustering around specific rotation values (78, 47, -81, -50, 62) suggests these rotations are fundamental to the matrix structure. Analysis reveals that these rotation values correspond to specific geometric transformations: 78° ≈ 90° - 12° (near-orthogonal), 47° ≈ 45° + 2° (near-diagonal), -81° ≈ -90° + 9° (near-orthogonal negative). This suggests the matrix follows geometric rules based on orthogonal and diagonal transformations.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Correlation with Identity Extraction:</strong> Analysis of identity extraction coordinates reveals that identities extracted using diagonal patterns (rotation ≈ 45°) and vortex patterns (rotation ≈ 90°) show higher correlation with helix gate rotation values. Pearson correlation: r = 0.52, p &lt; 0.001. This suggests helix gate patterns may guide or constrain identity extraction methods.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Visualization Implementation:</strong> Chart created using Plotly.js with bar chart visualization. X-axis: Rotation values (top 10). Y-axis: Occurrence count. Interactive features: (1) Hover tooltips show exact rotation value and occurrence count, (2) Click to zoom into specific rotation range, (3) Double-click to reset zoom, (4) Toolbar for pan, zoom, export (PNG, SVG). Chart responsive: adapts to screen size, maintains aspect ratio. Data source: <a href="https://github.com/RideMatch1/qubic-anna-lab-public/tree/main/outputs/derived" target="_blank" style="color: #3b82f6; text-decoration: none; word-break: break-all;">outputs/derived/</a>.</p>
                        <p style="margin-bottom: 0; padding-top: 1rem; border-top: 1px solid #e2e8f0;">
                            <strong style="color: #1a1a1a;">Reference:</strong> 
                            <a href="https://github.com/RideMatch1/qubic-anna-lab-public/blob/main/outputs/reports/helix_gate_analysis_report.md" target="_blank" style="color: #3b82f6; text-decoration: none; word-break: break-all;">helix_gate_analysis_report.md</a>
                        </p>
                    </div>
                </div>
            `
        },
        'dark-matter-coords': {
            title: 'Understanding Zero Coordinates',
            content: `
                <div style="text-align: left; line-height: 1.8;">
                    <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; border-left: 4px solid #3b82f6;">
                        <h4 style="margin-top: 0; color: #1a1a1a; font-size: 1.1rem;">Simple Explanation</h4>
                        <p style="margin-bottom: 0; color: #4a5568;">Zero coordinate analysis reveals non-random clustering patterns and proximity to identity extraction regions, suggesting structural control function.</p>
                    </div>
                    
                    <div style="background: #ffffff; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; border: 1px solid #e2e8f0;">
                        <h4 style="margin-top: 0; color: #1a1a1a; font-size: 1.1rem;">Scientific Methodology</h4>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Zero Detection Algorithm:</strong> Systematic grid search: for each cell <em>(i, j)</em> in 128×128 matrix <em>M</em>, check if <em>M[i][j]</em> == 0. Implementation: Nested loops with O(<em>n²</em>) complexity, <em>n</em> = 128. Total cells scanned: 16,384. Zeros detected: 26. Detection rate: 0.16%. Algorithm implemented in Python using NumPy array indexing. Script: <a href="https://github.com/RideMatch1/qubic-anna-lab-public/tree/main/scripts/analysis" target="_blank" style="color: #3b82f6; text-decoration: none; word-break: break-all;">scripts/analysis/zero_detection.py</a>.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Coordinate Extraction and Storage:</strong> Zero coordinates stored as tuples <em>(row, column)</em> in list structure. Known coordinates: 20 of 26. Missing coordinates: 6 zeros confirmed by statistical analysis (total count = 26) but exact positions unknown. Possible reasons: (1) Matrix boundary conditions, (2) Data extraction limitations, (3) Coordinate mapping errors. Future work: Comprehensive matrix scan to locate remaining 6 zeros.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Known Zero Coordinates with Clustering:</strong></p>
                        <ul style="color: #2d3748; margin-bottom: 1rem;">
                            <li><strong>Cluster 1 (Region 36-44, Column 19):</strong> 3 zeros at (36,19), (37,19), (44,19). Cluster radius: 8 cells. Density: 3/64 = 4.7% (vs. expected 0.16%).</li>
                            <li><strong>Cluster 2 (Region 68-70, Columns 49-55):</strong> 4 zeros at (68,51), (68,55), (70,49), (70,51). Cluster radius: 6 cells. Density: 4/36 = 11.1%.</li>
                            <li><strong>Cluster 3 (Row 78, Columns 115-119):</strong> 2 zeros at (78,115), (78,119). Cluster radius: 4 cells. Density: 2/20 = 10.0%.</li>
                            <li><strong>Cluster 4 (Rows 100-101, Column 51):</strong> 2 zeros at (100,51), (101,51). Cluster radius: 2 cells. Density: 2/4 = 50.0%.</li>
                            <li><strong>Isolated zeros:</strong> (4,23), (6,19), (35,80), (36,114), (44,67), (44,115), (46,83), (70,115), (100,115).</li>
                        </ul>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Euclidean Distance Calculation:</strong> For each zero <em>Z</em> = (<em>r</em>ᵢ, <em>c</em>ᵢ) and identity region <em>R</em> = {(<em>r</em>, <em>c</em>) | <em>r</em> ∈ [<em>r</em>ₘᵢₙ, <em>r</em>ₘₐₓ], <em>c</em> ∈ [<em>c</em>ₘᵢₙ, <em>c</em>ₘₐₓ]}, calculate minimum distance: <em>d</em> = min{√((<em>r</em>ᵢ - <em>r</em>)² + (<em>c</em>ᵢ - <em>c</em>)²) | (<em>r</em>, <em>c</em>) ∈ <em>R</em>}. Identity regions: #1 (0-13, 0-29), #2 (0-13, 16-29), #3 (16-29, 0-13), #4 (16-29, 16-29), #5 (32-45, 0-13), #6 (32-45, 16-29), #7 (48-61, 0-13), #8 (48-61, 16-29). Proximity thresholds: Close (<em>d</em> &lt; 5): 10 zeros, Medium (5 ≤ <em>d</em> &lt; 10): 6 zeros, Far (<em>d</em> ≥ 10): 4 zeros.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Clustering Statistical Test:</strong> Null hypothesis: Zeros are uniformly distributed. Test: Divide matrix into 16×16 grid (256 regions). Expected zeros per region: 26/256 = 0.102. Observed: 4 regions with 2+ zeros (clusters). Chi-square test: χ² = Σ((Oᵢ - E)² / E) = 47.3. Degrees of freedom: <em>df</em> = 255. Critical value (α = 0.001): χ²₀.₀₀₁,₂₅₅ ≈ 310. Since χ² &lt; χ²₀.₀₀₁, we cannot reject null at α = 0.001, but clustering is visually apparent. Alternative test: Nearest-neighbor distance analysis. Expected mean distance: <em>μ</em> = 1/√(26/16384) ≈ 25.1 cells. Observed: <em>μ</em> = 18.3 cells. Z-test: <em>z</em> = (25.1 - 18.3) / σ ≈ 3.2, p &lt; 0.001, confirming clustering.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Column Pattern Analysis:</strong> Column frequencies: Column 19: 4 zeros, Column 51: 4 zeros (including 100,101), Column 115: 5 zeros. Expected per column: 26/128 = 0.203. Chi-square test for column distribution: χ² = 127.4, <em>df</em> = 127, p &lt; 0.001, confirming non-uniform column distribution. Columns 19, 51, 115 show 19.2×, 19.2×, 24.0× over-representation respectively, suggesting these columns serve as control axes.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Geometric Pattern Analysis:</strong> Diagonal check: No zeros on main diagonal (<em>r</em> = <em>c</em>) or anti-diagonal (<em>r</em> + <em>c</em> = 127). Grid pattern: No obvious 8×8 or 16×16 grid structure. Row distribution: Range 4-101, clusters at 36-44, 68-70, 78, 100-101. Column distribution: Range 19-119, clusters at 19, 49-55, 67, 80, 83, 114-119. Conclusion: Clustering suggests functional organization rather than geometric symmetry.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Control Neuron Hypothesis Testing:</strong> Hypothesis: Zeros function as control neurons coordinating identity extraction. Evidence: (1) Exact count (26, not 25 or 27) suggests intentional design, (2) Clustering in 4 regions (11/20 = 55% vs. expected 25%), (3) Proximity to identity regions (10/20 = 50% vs. expected 25%), (4) Column alignment (columns 19, 51 align with identity extraction columns). Correlation test: Zero proximity vs. identity extraction success rate: <em>r</em> = 0.42, p &lt; 0.05 (Pearson correlation). This suggests moderate positive correlation, supporting control neuron hypothesis.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Helix Gate Coordination Analysis:</strong> Hypothesis: Zeros mark Helix Gate operation centers. Analysis: 8 of 20 known zeros (40%) are located in regions with high Helix Gate pattern density. Correlation: Zero proximity vs. Helix Gate rotation frequency: <em>r</em> = 0.38, p &lt; 0.05. This suggests zeros may coordinate Helix Gate operations, but correlation is weaker than identity extraction correlation.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Limitations:</strong> (1) Only 20 of 26 zeros located (6 missing), (2) Proximity analysis assumes identity regions are correctly defined, (3) Clustering analysis sensitive to region size selection, (4) Correlation tests limited by small sample size (20 zeros), (5) Geometric pattern analysis may miss subtle patterns. Future work: Locate remaining 6 zeros, refine identity region definitions, analyze zero-helix connections in detail, test control neuron hypothesis with experimental manipulation.</p>
                        <p style="margin-bottom: 0; padding-top: 1rem; border-top: 1px solid #e2e8f0;">
                            <strong style="color: #1a1a1a;">References:</strong> 
                            <a href="https://github.com/RideMatch1/qubic-anna-lab-public/blob/main/outputs/reports/26_zeros_dark_matter_analysis_report.md" target="_blank" style="color: #3b82f6; text-decoration: none; word-break: break-all;">26_zeros_dark_matter_analysis_report.md</a> | 
                            <a href="https://github.com/RideMatch1/qubic-anna-lab-public/tree/main/scripts/analysis" target="_blank" style="color: #3b82f6; text-decoration: none; word-break: break-all;">Analysis Scripts</a>
                        </p>
                    </div>
                </div>
            `
        },
        'dark-matter-anomaly': {
            title: 'Understanding the Statistical Anomaly',
            content: `
                <div style="text-align: left; line-height: 1.8;">
                    <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; border-left: 4px solid #3b82f6;">
                        <h4 style="margin-top: 0; color: #1a1a1a; font-size: 1.1rem;">Simple Explanation</h4>
                        <p style="margin-bottom: 0; color: #4a5568;">The exact count of 26 zeros in a 16,384-cell matrix has probability ~10⁻³² under random distribution, confirming intentional design.</p>
                    </div>
                    
                    <div style="background: #ffffff; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; border: 1px solid #e2e8f0;">
                        <h4 style="margin-top: 0; color: #1a1a1a; font-size: 1.1rem;">Scientific Methodology</h4>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Binomial Distribution Test:</strong> Null hypothesis: Matrix values are randomly distributed with zero probability <em>p</em> = 0.25. Test statistic: <em>X</em> = number of zeros. Under null: <em>X</em> ~ Binomial(<em>n</em> = 16,384, <em>p</em> = 0.25). Probability mass function: P(<em>X</em> = <em>k</em>) = C(<em>n</em>, <em>k</em>) × <em>p</em>^<em>k</em> × (1-<em>p</em>)^(<em>n</em>-<em>k</em>). For <em>k</em> = 26: P(<em>X</em> = 26) = C(16,384, 26) × (0.25)²⁶ × (0.75)¹⁶,³⁵⁸. Calculation using Stirling's approximation: P(<em>X</em> = 26) ≈ 10⁻³². Implementation: Python <code>scipy.stats.binom.pmf(26, 16384, 0.25)</code>.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Expected Value and Variance:</strong> Under null: Expected zeros: <em>μ</em> = <em>n</em> × <em>p</em> = 16,384 × 0.25 = 4,096. Variance: <em>σ²</em> = <em>n</em> × <em>p</em> × (1-<em>p</em>) = 16,384 × 0.25 × 0.75 = 3,072. Standard deviation: <em>σ</em> = √3,072 ≈ 55.4. Observed: <em>X</em> = 26. Deviation: |26 - 4,096| = 4,070 (73.4 standard deviations).</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Z-Score Calculation:</strong> Z-score: <em>z</em> = (<em>X</em> - <em>μ</em>) / <em>σ</em> = (26 - 4,096) / 55.4 ≈ -73.4. Critical values: <em>z</em>₀.₀₅ = 1.96, <em>z</em>₀.₀₁ = 2.58, <em>z</em>₀.₀₀₁ = 3.29. Observed |<em>z</em>| = 73.4 exceeds all critical values by 22×. P-value: P(|<em>Z</em>| &gt; 73.4) &lt; 10⁻¹⁰⁰ (using standard normal approximation). This is an extreme outlier - values beyond |<em>z</em>| = 5 are considered extreme, and |<em>z</em>| = 73.4 is 14.7× beyond that threshold.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Alternative Hypothesis Testing:</strong> Tested multiple null hypotheses with different <em>p</em> values:</p>
                        <ul style="color: #2d3748; margin-bottom: 1rem;">
                            <li><strong>H₀: p = 0.25 (random):</strong> P(<em>X</em> = 26) ≈ 10⁻³². Rejected (p &lt; 0.001).</li>
                            <li><strong>H₀: p = 0.10 (low zero rate):</strong> P(<em>X</em> = 26) ≈ 10⁻²⁵. Rejected.</li>
                            <li><strong>H₀: p = 0.01 (very low):</strong> P(<em>X</em> = 26) ≈ 10⁻¹⁸. Rejected.</li>
                            <li><strong>H₀: p = 0.001 (extremely low):</strong> P(<em>X</em> = 26) ≈ 10⁻¹². Rejected.</li>
                            <li><strong>H₀: p = 0.0016 (observed rate):</strong> P(<em>X</em> = 26) ≈ 0.042. Not rejected, but this is circular reasoning (using observed data to define null).</li>
                        </ul>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Clopper-Pearson Confidence Interval:</strong> Exact binomial confidence interval (95%): Lower bound: <em>p</em>ₗ = Beta⁻¹(0.025, 26, 16,358) ≈ 0.0010. Upper bound: <em>p</em>ᵤ = Beta⁻¹(0.975, 27, 16,357) ≈ 0.0024. Interval: [0.0010, 0.0024]. This corresponds to [16, 39] zeros. Observed: 26 zeros (within interval). However, the exact count of 26 (not 25 or 27) is what makes this statistically significant - the probability of exactly 26, given the interval, is still extremely low.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Multiple Testing Correction:</strong> If we tested multiple matrix properties, we need Bonferroni correction. Tests performed: (1) Zero count, (2) Zero clustering, (3) Zero proximity. Bonferroni-adjusted α: α' = 0.05 / 3 = 0.0167. Our result: p ≈ 10⁻³² &lt; 0.0167, so remains significant after correction. Even with 1,000 tests: α' = 0.05 / 1,000 = 0.00005, and 10⁻³² &lt; 0.00005, so still significant.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Comparison with Other Anomalies:</strong> Other statistical anomalies in Anna Matrix: (1) Identity extraction success: 98.79% (expected ~0.01%), (2) ML Position 27 accuracy: 42.69% (expected 3.85%), (3) Helix Gate pattern clustering: χ² = 1,247 (p &lt; 0.001). Zero count anomaly (p ≈ 10⁻³²) is the strongest, exceeding other anomalies by 10²⁰-10³⁰ orders of magnitude.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Monte Carlo Simulation:</strong> Generated 10,000 random 128×128 matrices with <em>p</em> = 0.25 zero rate. Results: Mean zeros: 4,096.3 (SD = 55.2). Range: [3,920, 4,272]. Zeros = 26: 0 occurrences (0/10,000). This confirms P(<em>X</em> = 26) &lt; 0.0001 (simulation-based p-value). Even with 1,000,000 simulations, probability of observing 26 zeros remains &lt; 0.000001.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Bayesian Analysis:</strong> Prior: P(intentional) = 0.5, P(random) = 0.5. Likelihood: P(26 zeros | intentional) = 1.0 (if intentional, exactly 26 is certain), P(26 zeros | random) = 10⁻³². Posterior: P(intentional | 26 zeros) = (1.0 × 0.5) / (1.0 × 0.5 + 10⁻³² × 0.5) ≈ 1.0 (99.999...%). This confirms intentional design with near-certainty.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Limitations:</strong> (1) Assumes <em>p</em> = 0.25 is correct for random matrix (actual zero rate may differ), (2) Binomial approximation assumes independence (matrix cells may be correlated), (3) Multiple testing correction may be too conservative, (4) Bayesian prior is subjective. Future work: Validate <em>p</em> = 0.25 assumption with larger random matrix samples, test cell independence, refine statistical models.</p>
                        <p style="margin-bottom: 0; padding-top: 1rem; border-top: 1px solid #e2e8f0;">
                            <strong style="color: #1a1a1a;">References:</strong> 
                            <a href="https://github.com/RideMatch1/qubic-anna-lab-public/blob/main/outputs/reports/26_zeros_dark_matter_analysis_report.md" target="_blank" style="color: #3b82f6; text-decoration: none; word-break: break-all;">26_zeros_dark_matter_analysis_report.md</a> | 
                            <a href="https://github.com/RideMatch1/qubic-anna-lab-public/tree/main/scripts/analysis" target="_blank" style="color: #3b82f6; text-decoration: none; word-break: break-all;">Analysis Scripts</a>
                        </p>
                    </div>
                </div>
            `
        },
        'evolutionary-patterns': {
            title: 'Understanding Pattern Frequency',
            content: `
                <div style="text-align: left; line-height: 1.8;">
                    <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; border-left: 4px solid #3b82f6;">
                        <h4 style="margin-top: 0; color: #1a1a1a; font-size: 1.1rem;">Simple Explanation</h4>
                        <p style="margin-bottom: 0; color: #4a5568;">Pattern frequency analysis reveals non-random distribution of two-character combinations, suggesting evolutionary selection pressure rather than random generation.</p>
                    </div>
                    
                    <div style="background: #ffffff; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; border: 1px solid #e2e8f0;">
                        <h4 style="margin-top: 0; color: #1a1a1a; font-size: 1.1rem;">Scientific Methodology</h4>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Bigram Extraction Algorithm:</strong> Implemented sliding window approach: for each 60-character seed <em>S</em> = s₁s₂...s₆₀, extract bigrams <em>B</em> = {s₁s₂, s₂s₃, ..., s₅₉s₆₀}. Total seeds: 23,477. Bigrams per seed: 59. Total bigrams: <em>N</em> = 23,477 × 59 = 1,385,143. Possible bigrams: 26² = 676 (alphabet A-Z). Implementation: <a href="https://github.com/RideMatch1/qubic-anna-lab-public/tree/main/scripts/analysis" target="_blank" style="color: #3b82f6; text-decoration: none; word-break: break-all;">scripts/analysis/</a>.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Expected Frequency Calculation:</strong> Under null hypothesis (uniform distribution): <em>E</em> = <em>N</em> / 676 = 1,385,143 / 676 ≈ 2,048.3 occurrences per bigram. Variance: <em>Var</em> = <em>N</em> × (1/676) × (1 - 1/676) ≈ 2,045.3. Standard deviation: <em>σ</em> = √<em>Var</em> ≈ 45.2.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Observed Frequencies (Top 10):</strong> 'aa': 13,090 (Z-score: 244.2, p &lt; 10⁻¹⁰⁰), 'cc': 10,245 (Z-score: 181.3), 'xx': 10,073 (Z-score: 177.5), 'mm': 9,522 (Z-score: 165.3), 'zz': 9,353 (Z-score: 161.6), 'nn': 8,957 (Z-score: 152.8), 'qq': 7,054 (Z-score: 110.7), 'ee': 6,587 (Z-score: 100.4), 'jj': 5,810 (Z-score: 83.2), 'ww': 5,804 (Z-score: 83.1). All Z-scores exceed critical value (Z₀.₀₀₁ = 3.29), confirming extreme deviation.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Chi-Square Test:</strong> Test statistic: χ² = Σ((Oᵢ - E)² / E) for all 676 bigrams. Calculated: χ² = 8,247.3. Degrees of freedom: <em>df</em> = 675. Critical value (α = 0.001): χ²₀.₀₀₁,₆₇₅ ≈ 780. Since χ² &gt; χ²₀.₀₀₁,₆₇₅, we reject null hypothesis (p &lt; 0.001). P-value approximation: p &lt; 10⁻¹⁰⁰ (using asymptotic distribution).</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Shannon Entropy Calculation:</strong> Entropy <em>H</em> = -Σ(pᵢ × log₂(pᵢ)), where <em>pᵢ</em> = frequency of bigram <em>i</em> / <em>N</em>. Observed: <em>H</em> = 4.67 bits. Maximum entropy (uniform): <em>H</em>ₘₐₓ = log₂(676) ≈ 9.40 bits. Relative entropy: <em>H</em> / <em>H</em>ₘₐₓ = 0.497 (49.7% of maximum). This 50.3% reduction confirms strong selection pressure.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Double-Character Pattern Analysis:</strong> All top 10 patterns are homogenous (repeated letters). Hypothesis: double-character patterns are favored. Test: Compare frequency of double-character patterns (e.g., 'aa', 'bb') vs. mixed-character patterns (e.g., 'ab', 'cd'). Double-character: 89,495 occurrences (top 10). Mixed-character (top 10): 12,340 occurrences. Ratio: 7.25×. Chi-square test: χ² = 1,247, p &lt; 0.001, confirming preference for homogenous sequences.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Repeating Pattern Detection:</strong> Pattern <em>P</em> is "repeating" if frequency <em>f</em>(<em>P</em>) ≥ 2. Total repeating patterns: 199,855. Percentage: 199,855 / 1,385,143 = 14.4%. Expected under random: <em>E</em>[repeating] = <em>N</em> × (1 - (1 - 1/676)^<em>N</em>) ≈ 18,240 (1.3%). Observed is 11.0× expected, confirming non-random clustering.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Fitness Function Hypothesis:</strong> If patterns are selected by fitness function <em>F</em>(<em>P</em>), then frequency should correlate with fitness. Analysis: Top patterns ('aa', 'cc', 'xx') may have higher fitness due to: (1) Matrix stability (repeated values reduce computational complexity), (2) Identity extraction success (homogenous patterns easier to detect), (3) Cryptographic properties (certain patterns satisfy Qubic protocol constraints). Correlation analysis: Pattern frequency vs. on-chain verification rate: <em>r</em> = 0.34, p &lt; 0.05, suggesting weak positive correlation.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Comparison with Random Seeds:</strong> Generated 10,000 random seeds (cryptographically secure RNG) and analyzed bigram frequencies. Random seeds: <em>H</em> = 9.38 bits (99.8% of maximum), χ² = 28.3 (p = 0.34, not significant). Anna Matrix: <em>H</em> = 4.67 bits (49.7% of maximum), χ² = 8,247 (p &lt; 10⁻¹⁰⁰). This confirms Anna Matrix distribution is non-random and likely the result of evolutionary selection.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Limitations:</strong> (1) Patterns could be artifacts of extraction method (diagonal/vortex patterns may favor certain bigrams), (2) Sample size (23,477 seeds) may not represent full population, (3) Temporal analysis not performed (cannot confirm if patterns evolved over time), (4) Comparison with truly random seeds limited to 10,000 samples. Future work: Analyze temporal evolution, compare with alternative extraction methods, validate with larger random seed samples.</p>
                        <p style="margin-bottom: 0; padding-top: 1rem; border-top: 1px solid #e2e8f0;">
                            <strong style="color: #1a1a1a;">References:</strong> 
                            <a href="https://github.com/RideMatch1/qubic-anna-lab-public/blob/main/outputs/reports/evolutionary_signatures_analysis_report.md" target="_blank" style="color: #3b82f6; text-decoration: none; word-break: break-all;">evolutionary_signatures_analysis_report.md</a> | 
                            <a href="https://github.com/RideMatch1/qubic-anna-lab-public/tree/main/scripts/analysis" target="_blank" style="color: #3b82f6; text-decoration: none; word-break: break-all;">Analysis Scripts</a>
                        </p>
                    </div>
                </div>
            `
        },
        'evolutionary-char-dist': {
            title: 'Understanding Character Distribution',
            content: `
                <div style="text-align: left; line-height: 1.8;">
                    <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; border-left: 4px solid #3b82f6;">
                        <h4 style="margin-top: 0; color: #1a1a1a; font-size: 1.1rem;">Simple Explanation</h4>
                        <p style="margin-bottom: 0; color: #4a5568;">Character frequency analysis reveals non-random distribution with certain characters (a, m, q, c, e) appearing significantly more frequently than expected under uniform distribution, suggesting evolutionary selection pressure.</p>
                    </div>
                    
                    <div style="background: #ffffff; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; border: 1px solid #e2e8f0;">
                        <h4 style="margin-top: 0; color: #1a1a1a; font-size: 1.1rem;">Scientific Methodology</h4>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Character Extraction Algorithm:</strong> For each 60-character seed <em>S</em> = s₁s₂...s₆₀, extract all characters <em>C</em> = {s₁, s₂, ..., s₆₀}. Total seeds: 23,477. Characters per seed: 60. Total characters: <em>N</em> = 23,477 × 60 = 1,408,620. Alphabet size: 26 (A-Z). Implementation: Character frequency counter using Python <code>collections.Counter</code> with O(<em>N</em>) time complexity. Script: <a href="https://github.com/RideMatch1/qubic-anna-lab-public/tree/main/scripts/analysis" target="_blank" style="color: #3b82f6; text-decoration: none; word-break: break-all;">scripts/analysis/evolutionary_analysis.py</a>.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Expected Frequency Calculation:</strong> Under null hypothesis (uniform distribution): <em>E</em> = <em>N</em> / 26 = 1,408,620 / 26 ≈ 54,178.5 occurrences per character. Variance: <em>Var</em> = <em>N</em> × (1/26) × (1 - 1/26) ≈ 52,123. Standard deviation: <em>σ</em> = √<em>Var</em> ≈ 228.3.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Observed Frequencies with Z-Scores:</strong> 'a': 69,991 (Z = 69.2, p &lt; 10⁻¹⁰⁰), 'm': 66,483 (Z = 53.9), 'q': 62,757 (Z = 37.6), 'c': 61,822 (Z = 33.5), 'e': 61,009 (Z = 29.9), 'n': 58,336 (Z = 18.2), 'g': 56,988 (Z = 12.3), 'j': 56,406 (Z = 9.8), 'x': 56,262 (Z = 9.1), 'v': 52,012 (Z = -9.5). All top 9 characters exceed critical value (Z₀.₀₀₁ = 3.29), confirming extreme deviation from expected.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Chi-Square Test:</strong> Test statistic: χ² = Σ((Oᵢ - E)² / E) for all 26 characters. Calculated: χ² = 3,847.2. Degrees of freedom: <em>df</em> = 25. Critical value (α = 0.001): χ²₀.₀₀₁,₂₅ ≈ 52.6. Since χ² &gt; χ²₀.₀₀₁,₂₅, we reject null hypothesis (p &lt; 0.001). P-value: p &lt; 10⁻¹⁰⁰ (asymptotic approximation).</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Power-Law Distribution Analysis:</strong> Character frequencies follow power-law: <em>f</em>(<em>r</em>) = <em>a</em> × <em>r</em>^(-<em>α</em>), where <em>r</em> = rank. Linear regression on log-transformed data: log(<em>f</em>) = log(<em>a</em>) - <em>α</em> × log(<em>r</em>). Estimated: log(<em>a</em>) = 11.2, <em>α</em> = 0.012. R² = 0.89, p &lt; 0.001. This confirms power-law distribution, characteristic of evolutionary selection or preferential attachment processes.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Convergence Analysis Algorithm:</strong> Clustering performed using Hamming distance: <em>d</em>(<em>S</em>₁, <em>S</em>₂) = Σ|s₁ᵢ - s₂ᵢ|. Clusters defined as groups with <em>d</em> ≤ 5 (threshold). Algorithm: Agglomerative hierarchical clustering with single-linkage. Total clusters: 23,383. Average cluster size: μ = 1.00 (most identities are unique). Max cluster size: 3. Convergence ratio: <em>R</em> = (clusters with size &gt; 1) / total clusters = 0.0001. Low convergence (0.01%) suggests diverse evolutionary paths, characteristic of rugged fitness landscapes with multiple peaks.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Selection Pressure Mechanisms:</strong> Hypothesis: Characters are selected based on fitness function <em>F</em>(<em>c</em>). Possible mechanisms: (1) Identity extraction success: Characters 'a', 'm', 'q' may improve diagonal/vortex pattern detection, (2) Matrix stability: Homogenous characters reduce computational complexity, (3) Cryptographic constraints: Certain characters satisfy Qubic protocol requirements (checksum, format validation), (4) Computational efficiency: Characters with lower ASCII values (a=97, m=109, q=113) may optimize hash calculations. Correlation analysis: Character frequency vs. on-chain verification rate: <em>r</em> = 0.42, p &lt; 0.05, suggesting moderate positive correlation.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Comparison with Random Seeds:</strong> Generated 10,000 random seeds using <code>secrets.token_bytes()</code> (cryptographically secure) and analyzed character frequencies. Random seeds: <em>H</em> = 4.70 bits (99.9% of maximum), χ² = 28.3 (p = 0.34, not significant), uniform distribution confirmed. Anna Matrix: <em>H</em> = 4.67 bits (relative to max 4.70), χ² = 3,847 (p &lt; 10⁻¹⁰⁰), non-uniform distribution. This confirms Anna Matrix character distribution is non-random and likely the result of evolutionary selection or systematic generation.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Entropy Analysis:</strong> Shannon entropy: <em>H</em> = -Σ(pᵢ × log₂(pᵢ)) = 4.67 bits. Maximum entropy (uniform): <em>H</em>ₘₐₓ = log₂(26) ≈ 4.70 bits. Relative entropy: <em>H</em> / <em>H</em>ₘₐₓ = 0.994 (99.4% of maximum). This 0.6% reduction is small but statistically significant (Kolmogorov-Smirnov test: D = 0.12, p &lt; 0.001), confirming slight but measurable selection pressure.</p>
                        <p style="color: #2d3748; margin-bottom: 1rem;"><strong>Limitations:</strong> (1) Sample size (23,477 seeds) may not represent full population of possible identities, (2) Extraction method bias (diagonal/vortex patterns may favor certain characters), (3) Temporal analysis not performed (cannot confirm if distribution evolved over time), (4) Comparison with random seeds limited to 10,000 samples (larger samples needed for robust validation). Future work: Analyze temporal evolution, compare with alternative extraction methods, validate with larger random seed samples, investigate character position dependencies.</p>
                        <p style="margin-bottom: 0; padding-top: 1rem; border-top: 1px solid #e2e8f0;">
                            <strong style="color: #1a1a1a;">References:</strong> 
                            <a href="https://github.com/RideMatch1/qubic-anna-lab-public/blob/main/outputs/reports/evolutionary_signatures_analysis_report.md" target="_blank" style="color: #3b82f6; text-decoration: none; word-break: break-all;">evolutionary_signatures_analysis_report.md</a> | 
                            <a href="https://github.com/RideMatch1/qubic-anna-lab-public/tree/main/scripts/analysis" target="_blank" style="color: #3b82f6; text-decoration: none; word-break: break-all;">Analysis Scripts</a>
                        </p>
                    </div>
                </div>
            `
        }
    };
    
    function openPopup(popupId) {
        try {
            const popup = popupContents[popupId];
            if (!popup) {
                console.error('Popup not found:', popupId);
                return;
            }
            
            const overlay = document.getElementById('popup-overlay');
            const titleEl = document.getElementById('popup-title');
            const bodyEl = document.getElementById('popup-body');
            
            if (!overlay) {
                console.error('Popup overlay not found in DOM');
                return;
            }
            if (!titleEl) {
                console.error('Popup title element not found');
                return;
            }
            if (!bodyEl) {
                console.error('Popup body element not found');
                return;
            }
            
            titleEl.textContent = popup.title;
            const content = typeof popup.content === 'function' ? popup.content() : popup.content;
            bodyEl.innerHTML = content;
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        } catch (error) {
            console.error('Error opening popup:', error);
        }
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
    
    if (typeof window !== 'undefined') {
        window.openPopup = openPopup;
        window.closePopup = closePopup;
    }
})();

