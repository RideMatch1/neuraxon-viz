#!/usr/bin/env python3

from flask import Flask, render_template, jsonify, request
from pathlib import Path
import json
import os
import time
from dotenv import load_dotenv

from utils.data_loader import load_statistics, get_verification_notes
from utils.neuraxon_processor import load_neuraxon_data, extract_frames, get_frame_statistics
from utils.anna_data_processor import process_anna_data
from utils.ml_data_processor import process_ml_data
from utils.grid_data_processor import process_grid_data
from utils.statistics_processor import process_statistics_data
from utils.discrepancy_processor import process_discrepancy_data
from utils.layer_processor import process_layer_data
from utils.helix_processor import process_helix_data
from utils.dark_matter_processor import process_dark_matter_data
from utils.evolutionary_processor import process_evolutionary_data

load_dotenv()

app = Flask(__name__, static_folder='static', static_url_path='/static')
app.config['JSON_SORT_KEYS'] = False
app.config['SECRET_KEY'] = os.getenv('FLASK_SECRET_KEY', os.urandom(32).hex())

@app.context_processor
def inject_timestamp():
    return {'timestamp': int(time.time())}

@app.after_request
def add_security_headers(response):
    response.headers['X-Content-Type-Options'] = 'nosniff'
    response.headers['X-Frame-Options'] = 'DENY'
    response.headers['X-XSS-Protection'] = '1; mode=block'
    response.headers['Referrer-Policy'] = 'strict-origin-when-cross-origin'
    
    # Set correct MIME types for static files on Vercel
    if request.path.startswith('/static/'):
        if request.path.endswith('.css'):
            response.headers['Content-Type'] = 'text/css; charset=utf-8'
        elif request.path.endswith('.js'):
            response.headers['Content-Type'] = 'application/javascript; charset=utf-8'
        elif request.path.endswith('.svg'):
            response.headers['Content-Type'] = 'image/svg+xml'
        elif request.path.endswith('.png'):
            response.headers['Content-Type'] = 'image/png'
        elif request.path.endswith(('.jpg', '.jpeg')):
            response.headers['Content-Type'] = 'image/jpeg'
        elif request.path.endswith('.webp'):
            response.headers['Content-Type'] = 'image/webp'
        elif request.path.endswith('.gif'):
            response.headers['Content-Type'] = 'image/gif'
        
        response.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate'
        response.headers['Pragma'] = 'no-cache'
        response.headers['Expires'] = '0'
    else:
        response.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate'
        response.headers['Pragma'] = 'no-cache'
        response.headers['Expires'] = '0'
    return response

# Explicit static file route for Vercel
@app.route('/static/<path:filename>')
def serve_static(filename):
    """Serve static files with correct MIME types for Vercel."""
    from flask import send_from_directory
    return send_from_directory(app.static_folder, filename)

BASE_DIR = Path(__file__).parent
# Use local data directory, fallback to parent if needed (for local dev)
DATA_DIR = BASE_DIR / 'data'
if not DATA_DIR.exists():
    DATA_DIR = BASE_DIR.parent.parent / 'data'


@app.route('/')
def index():
    stats = load_statistics()
    verification_notes = get_verification_notes()
    return render_template('index.html', 
                         stats=stats,
                         verification_notes=verification_notes,
                         page_title="Decoding the Anna Matrix")


@app.route('/visualization')
def visualization():
    stats = load_statistics()
    return render_template('visualization.html',
                         stats=stats,
                         page_title="Interactive 3D Visualization")


@app.route('/methodology')
def methodology():
    stats = load_statistics()
    verification_notes = get_verification_notes()
    return render_template('methodology.html',
                         stats=stats,
                         verification_notes=verification_notes,
                         page_title="Methodology & Transparency")


@app.route('/explore')
def explore():
    stats = load_statistics()
    return render_template('explore.html',
                         stats=stats,
                         page_title="Interactive Anna Explorer")


@app.route('/ml-position27')
def ml_position27():
    stats = load_statistics()
    return render_template('ml_position27.html',
                         stats=stats,
                         page_title="ML Position 27 Results")


@app.route('/grid-structure')
def grid_structure():
    stats = load_statistics()
    return render_template('grid_structure.html',
                         stats=stats,
                         page_title="Grid Structure Analysis")


@app.route('/statistics')
def statistics():
    stats = load_statistics()
    return render_template('statistics.html',
                         stats=stats,
                         page_title="Statistical Validation")


@app.route('/discrepancy')
def discrepancy():
    stats = load_statistics()
    return render_template('discrepancy.html',
                         stats=stats,
                         page_title="Identity Discrepancy Analysis")


@app.route('/layers')
def layers():
    stats = load_statistics()
    return render_template('layers.html',
                         stats=stats,
                         page_title="Layer Analysis")


@app.route('/helix-gates')
def helix_gates():
    stats = load_statistics()
    return render_template('helix_gates.html',
                         stats=stats,
                         page_title="Helix Gates Analysis")


@app.route('/dark-matter')
def dark_matter():
    stats = load_statistics()
    return render_template('dark_matter.html',
                         stats=stats,
                         page_title="26 Zeros (Dark Matter) Analysis")


@app.route('/evolutionary')
def evolutionary():
    stats = load_statistics()
    return render_template('evolutionary.html',
                         stats=stats,
                         page_title="Evolutionary Signatures")


@app.route('/api/stats')
def api_stats():
    stats = load_statistics()
    verification_notes = get_verification_notes()
    return jsonify({
        'statistics': stats,
        'verification_notes': verification_notes
    })


@app.route('/api/anna-data')
def api_anna_data():
    try:
        processed_data = process_anna_data()
        if not processed_data.get('top_words') and not processed_data.get('error'):
            import sys
            print(f"WARNING: /api/anna-data returned empty data", file=sys.stderr)
        return jsonify(processed_data)
    except Exception as e:
        import sys, traceback
        print(f"ERROR in /api/anna-data: {str(e)}", file=sys.stderr)
        traceback.print_exc(file=sys.stderr)
        return jsonify({'error': str(e)}), 500

@app.route('/api/anna-words')
def api_anna_words():
    return api_anna_data()


@app.route('/api/ml-data')
def api_ml_data():
    try:
        processed_data = process_ml_data()
        return jsonify(processed_data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/ml-position27')
def api_ml_position27():
    return api_ml_data()


@app.route('/api/grid-data')
def api_grid_data():
    try:
        processed_data = process_grid_data()
        if not processed_data.get('grid_7x7') and not processed_data.get('error'):
            import sys
            print(f"WARNING: /api/grid-data returned empty data", file=sys.stderr)
        return jsonify(processed_data)
    except Exception as e:
        import sys, traceback
        print(f"ERROR in /api/grid-data: {str(e)}", file=sys.stderr)
        traceback.print_exc(file=sys.stderr)
        return jsonify({'error': str(e)}), 500

@app.route('/api/grid-structure')
def api_grid_structure():
    return api_grid_data()


@app.route('/api/statistics-data')
def api_statistics_data():
    try:
        processed_data = process_statistics_data()
        return jsonify(processed_data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/statistics')
def api_statistics():
    return api_statistics_data()


@app.route('/api/discrepancy-data')
def api_discrepancy_data():
    try:
        processed_data = process_discrepancy_data()
        return jsonify(processed_data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/discrepancy')
def api_discrepancy():
    return api_discrepancy_data()


@app.route('/api/layers-data')
def api_layers_data():
    try:
        processed_data = process_layer_data()
        return jsonify(processed_data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/layers')
def api_layers():
    return api_layers_data()


@app.route('/api/helix-data')
def api_helix_data():
    try:
        processed_data = process_helix_data()
        return jsonify(processed_data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/helix-gates')
def api_helix_gates():
    return api_helix_data()


@app.route('/api/dark-matter-data')
def api_dark_matter_data():
    try:
        processed_data = process_dark_matter_data()
        return jsonify(processed_data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/dark-matter')
def api_dark_matter():
    return api_dark_matter_data()


@app.route('/api/evolutionary-data')
def api_evolutionary_data():
    try:
        processed_data = process_evolutionary_data()
        return jsonify(processed_data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/evolutionary')
def api_evolutionary():
    return api_evolutionary_data()


@app.route('/api/neuraxon-data')
def api_neuraxon_data():
    # Try compressed file first (smaller for deployment)
    network_file = DATA_DIR / 'neuraxon_exports' / 'real_ids_network.json.gz'
    
    if not network_file.exists():
        network_file = DATA_DIR / 'neuraxon_exports' / 'real_ids_network.json'
    
    if not network_file.exists():
        # Return empty structure - data should be loaded from external source or CDN
        return jsonify({
            'metadata': {
                'frames': [],
                'total_nodes': 0,
                'total_edges': 0
            },
            'error': 'Network data not available. Data files are too large for serverless deployment and should be hosted externally.'
        })
    
    # Handle compressed file
    if network_file.suffix == '.gz':
        import gzip
        with gzip.open(network_file, 'rt') as f:
            data = json.load(f)
    else:
        data = load_neuraxon_data(network_file)
    
    if not data:
        return jsonify({
            'metadata': {
                'frames': [],
                'total_nodes': 0,
                'total_edges': 0
            },
            'error': 'Network data not available'
        })
    
    frames = extract_frames(data)
    stats = get_frame_statistics(frames)
    
    return jsonify({
        'metadata': {
            'frames': frames,
            **stats
        }
    })


@app.route('/api/chat', methods=['POST'])
def api_chat():
    try:
        from chatbot.retriever import CodeRetriever
        from chatbot.responder import ChatbotResponder
        from chatbot.security import ChatbotSecurity
        
        security = ChatbotSecurity()
        ip = security.get_client_ip()
        
        if security.is_blocked(ip):
            return jsonify({'error': 'Access denied'}), 403
        
        allowed, error_msg = security.check_rate_limit(ip)
        if not allowed:
            return jsonify({'error': error_msg}), 429
        
        data = request.get_json()
        if not data:
            return jsonify({'error': 'Invalid request'}), 400
        
        question = data.get('question', '').strip()
        conversation_history = data.get('history', [])
        
        if not question:
            return jsonify({'error': 'Question required'}), 400
        
        question = security.sanitize_input(question)
        if not question:
            return jsonify({'error': 'Invalid input'}), 400
        
        try:
            retriever = CodeRetriever()
        except (ValueError, ImportError) as e:
            error_msg = str(e).lower()
            if "not indexed" in error_msg or "database" in error_msg:
                return jsonify({'error': 'Chatbot database not initialized. Please run: python chatbot/index_codebase.py'}), 503
            elif "faiss" in error_msg or "not available" in error_msg:
                return jsonify({
                    'error': 'Chatbot not available',
                    'message': 'FAISS is not installed. Chatbot functionality requires faiss-cpu package.'
                }), 503
            raise
        
        # PathSanitizer will auto-detect qubic-anna-lab-public repository
        # No need to pass repo_root - PathSanitizer finds it automatically
        responder = ChatbotResponder(retriever, repo_root=None)
        
        result = responder.generate_response(question, conversation_history, client_ip=ip)
        
        if 'error' in result:
            return jsonify(result), 500
        
        cost_allowed, cost_error = security.check_cost_limit(ip, result.get('cost', 0))
        if not cost_allowed:
            return jsonify({'error': cost_error}), 429
        
        return jsonify({
            'answer': result['answer'],
            'sources': result.get('sources', []),
            'tokens': result.get('tokens', {})
        })
    
    except ImportError as e:
        return jsonify({
            'error': 'Chatbot not available',
            'message': f'Required dependencies not installed: {str(e)}. Install faiss-cpu or chromadb.'
        }), 503
    except Exception as e:
        return jsonify({'error': f'Chatbot error: {str(e)}'}), 500


if __name__ == '__main__':
    port = int(os.getenv('FLASK_PORT', '5001'))
    app.run(debug=False, port=port, host='127.0.0.1')

