(function() {
    'use strict';
    
    window.LoadingUtils = {
        show: function(containerId, message = 'Loading data...') {
            const container = document.getElementById(containerId);
            if (!container) return;
            
            const loadingHTML = `
                <div class="loading-state" style="
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 3rem 1rem;
                    min-height: 200px;
                    color: #64748b;
                ">
                    <div class="spinner" style="
                        width: 40px;
                        height: 40px;
                        border: 4px solid #e2e8f0;
                        border-top-color: #3b82f6;
                        border-radius: 50%;
                        animation: spin 0.8s linear infinite;
                        margin-bottom: 1rem;
                    "></div>
                    <p style="margin: 0; font-size: 14px;">${message}</p>
                </div>
            `;
            
            container.innerHTML = loadingHTML;
            
            if (!document.getElementById('loading-spinner-style')) {
                const style = document.createElement('style');
                style.id = 'loading-spinner-style';
                style.textContent = `
                    @keyframes spin {
                        to { transform: rotate(360deg); }
                    }
                `;
                document.head.appendChild(style);
            }
        },
        
        hide: function(containerId) {
            const container = document.getElementById(containerId);
            if (container) {
                const loadingState = container.querySelector('.loading-state');
                if (loadingState) {
                    loadingState.remove();
                }
            }
        },
        
        showError: function(containerId, message, retryCallback = null) {
            const container = document.getElementById(containerId);
            if (!container) return;
            
            let retryButton = '';
            if (retryCallback) {
                retryButton = `
                    <button onclick="${retryCallback}" style="
                        margin-top: 1rem;
                        padding: 0.5rem 1.5rem;
                        background: #3b82f6;
                        color: white;
                        border: none;
                        border-radius: 6px;
                        cursor: pointer;
                        font-size: 14px;
                        transition: background 0.2s;
                    " onmouseover="this.style.background='#2563eb'" onmouseout="this.style.background='#3b82f6'">
                        Retry
                    </button>
                `;
            }
            
            const errorHTML = `
                <div class="error-state" style="
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 3rem 1rem;
                    min-height: 200px;
                    text-align: center;
                ">
                    <div style="
                        width: 48px;
                        height: 48px;
                        border-radius: 50%;
                        background: #fee2e2;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin-bottom: 1rem;
                    ">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <p style="
                        margin: 0 0 0.5rem 0;
                        font-size: 16px;
                        font-weight: 500;
                        color: #1e293b;
                    ">Unable to load data</p>
                    <p style="
                        margin: 0;
                        font-size: 14px;
                        color: #64748b;
                    ">${message}</p>
                    ${retryButton}
                </div>
            `;
            
            container.innerHTML = errorHTML;
        },
        
        showSkeleton: function(containerId, type = 'chart') {
            const container = document.getElementById(containerId);
            if (!container) return;
            
            let skeletonHTML = '';
            
            if (type === 'chart') {
                skeletonHTML = `
                    <div class="skeleton-chart" style="
                        padding: 2rem;
                        min-height: 400px;
                        background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%);
                        background-size: 200% 100%;
                        animation: shimmer 1.5s infinite;
                        border-radius: 8px;
                    "></div>
                `;
            } else if (type === 'list') {
                skeletonHTML = `
                    <div class="skeleton-list" style="padding: 1rem;">
                        ${Array(5).fill(0).map(() => `
                            <div style="
                                height: 40px;
                                background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%);
                                background-size: 200% 100%;
                                animation: shimmer 1.5s infinite;
                                border-radius: 4px;
                                margin-bottom: 0.5rem;
                            "></div>
                        `).join('')}
                    </div>
                `;
            }
            
            container.innerHTML = skeletonHTML;
            
            if (!document.getElementById('skeleton-style')) {
                const style = document.createElement('style');
                style.id = 'skeleton-style';
                style.textContent = `
                    @keyframes shimmer {
                        0% { background-position: -200% 0; }
                        100% { background-position: 200% 0; }
                    }
                `;
                document.head.appendChild(style);
            }
        }
    };
})();

