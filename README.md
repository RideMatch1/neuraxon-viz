# Anna Matrix Lab

Interactive web application for exploring 23,765 Qubic identities discovered in the Anna Matrix.

## Live Demo

Visit: [anna-matrix-lab.vercel.app](https://anna-matrix-lab.vercel.app)

## Features

- **3D Neuraxon Visualization**: Interactive 3D graph of interconnected Qubic identities
- **Anna Explorer**: Search and explore discovered words and sentences
- **ML Position 27**: Machine learning model results and validation
- **Statistical Analysis**: Confidence intervals, p-values, and effect sizes
- **Grid Structure**: Heatmap visualization of the 128×128 Anna Matrix
- **Identity Discrepancy Analysis**: Comparison of documented vs. real identities
- **Layer Analysis**: Deep dive into matrix layers
- **Helix Gates**: Analysis of 26,562 Helix Gate patterns
- **Dark Matter**: Unexplained values in the matrix
- **Evolutionary Signatures**: Patterns suggesting evolutionary selection
- **Repository Assistant**: AI chatbot with full codebase knowledge

## Quick Start

```bash
cd web
pip install -r requirements.txt
python app.py
```

Open: http://127.0.0.1:5001

## Structure

```
web/
├── app.py                 # Flask application
├── templates/             # HTML templates
│   ├── base.html
│   ├── index.html
│   ├── visualization.html
│   ├── methodology.html
│   └── components/
├── static/                # CSS, JS, images
│   ├── css/
│   ├── js/
│   └── images/
├── utils/                 # Data processors
├── chatbot/               # AI assistant
└── requirements.txt
```

## Pages

- `/` - Homepage with research overview
- `/visualization` - 3D Neuraxon visualization
- `/explore` - Anna Explorer (words & sentences)
- `/ml-position27` - ML Position 27 results
- `/grid-structure` - Grid structure analysis
- `/statistics` - Statistical validation
- `/discrepancy` - Identity discrepancy analysis
- `/layers` - Layer analysis
- `/helix-gates` - Helix Gates patterns
- `/dark-matter` - Dark Matter analysis
- `/evolutionary` - Evolutionary signatures
- `/methodology` - Research methodology

## Research Repository

Complete analysis scripts, data, and documentation:
[github.com/RideMatch1/qubic-anna-lab-public](https://github.com/RideMatch1/qubic-anna-lab-public)

## Deployment

### Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Login: `vercel login`
3. Deploy: `vercel --prod`

See `VERCEL_DEPLOY.md` for detailed instructions.

## Environment Variables

Required for chatbot functionality:

```
OPENAI_API_KEY=sk-...
FLASK_SECRET_KEY=your-secret-key
```

See `.env.example` for all variables.

## Credits

- **Aigarth Intelligent Tissue**: [github.com/Aigarth/aigarth-it](https://github.com/Aigarth/aigarth-it)
- **Neuraxon**: [github.com/DavidVivancos/Neuraxon](https://github.com/DavidVivancos/Neuraxon)
- **Anna Matrix Origin**: @MKx2x10

## License

This research is provided as-is for public verification and independent research.
