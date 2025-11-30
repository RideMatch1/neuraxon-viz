# Testing Guide

## Server Status

Server läuft auf: **http://localhost:5000**

## Pages to Test

1. **Homepage**: http://localhost:5000/
   - Stats sollten angezeigt werden
   - Links zu Visualization und Methodology

2. **Visualization**: http://localhost:5000/visualization
   - 3D Plotly Graph
   - Timeline Slider (wenn Frames vorhanden)
   - Tables

3. **Methodology**: http://localhost:5000/methodology
   - Research Process
   - ML Results
   - Limitations

4. **API Endpoints**:
   - http://localhost:5000/api/stats
   - http://localhost:5000/api/neuraxon-data

## Known Issues

- Visualization benötigt Neuraxon Export Datei
- Falls Datei fehlt: "Network data not found" wird angezeigt
- Das ist normal wenn `outputs/derived/neuraxon_exports/real_ids_network.json` nicht existiert

## Quick Test

```bash
# Test homepage
curl http://localhost:5000/

# Test API
curl http://localhost:5000/api/stats

# Test visualization data
curl http://localhost:5000/api/neuraxon-data
```

