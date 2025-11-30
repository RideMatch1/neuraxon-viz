(function() {
    'use strict';
    
    const chatbot = {
        container: null,
        window: null,
        toggle: null,
        close: null,
        messages: null,
        form: null,
        input: null,
        send: null,
        error: null,
        conversationHistory: [],
        isOpen: false,
        isLoading: false
    };
    
    function init() {
        chatbot.container = document.getElementById('chatbot-container');
        if (!chatbot.container) {
            console.log('Chatbot: container not found');
            return;
        }
        
        chatbot.window = document.getElementById('chatbot-window');
        chatbot.toggle = document.getElementById('chatbot-toggle');
        chatbot.close = document.getElementById('chatbot-close');
        chatbot.messages = document.getElementById('chatbot-messages');
        chatbot.form = document.getElementById('chatbot-form');
        chatbot.input = document.getElementById('chatbot-input');
        chatbot.send = document.getElementById('chatbot-send');
        chatbot.error = document.getElementById('chatbot-error');
        
        if (!chatbot.window || !chatbot.toggle || !chatbot.close || !chatbot.messages || !chatbot.form || !chatbot.input || !chatbot.send) {
            console.log('Chatbot: missing elements', {
                window: !!chatbot.window,
                toggle: !!chatbot.toggle,
                close: !!chatbot.close,
                messages: !!chatbot.messages,
                form: !!chatbot.form,
                input: !!chatbot.input,
                send: !!chatbot.send
            });
            return;
        }
        
        // Remove existing listeners to prevent duplicates
        const newToggle = chatbot.toggle.cloneNode(true);
        chatbot.toggle.parentNode.replaceChild(newToggle, chatbot.toggle);
        chatbot.toggle = newToggle;
        
        const newClose = chatbot.close.cloneNode(true);
        chatbot.close.parentNode.replaceChild(newClose, chatbot.close);
        chatbot.close = newClose;
        
        chatbot.toggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleChatbot();
        });
        chatbot.close.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            closeChatbot();
        });
        chatbot.form.addEventListener('submit', handleSubmit);
        
        document.addEventListener('click', function(e) {
            if (chatbot.isOpen && !chatbot.container.contains(e.target)) {
                closeChatbot();
            }
        });
        
        console.log('Chatbot: initialized successfully');
    }
    
    function toggleChatbot() {
        if (chatbot.isOpen) {
            closeChatbot();
        } else {
            openChatbot();
        }
    }
    
    function openChatbot() {
        chatbot.window.classList.add('active');
        chatbot.isOpen = true;
        chatbot.input.focus();
        hideError();
    }
    
    function closeChatbot() {
        chatbot.window.classList.remove('active');
        chatbot.isOpen = false;
    }
    
    function handleSubmit(e) {
        e.preventDefault();
        
        const question = chatbot.input.value.trim();
        if (!question || chatbot.isLoading) return;
        
        addMessage('user', question);
        chatbot.input.value = '';
        chatbot.input.disabled = true;
        chatbot.send.disabled = true;
        chatbot.isLoading = true;
        
        showLoading();
        hideError();
        
        fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                question: question,
                history: chatbot.conversationHistory.slice(-5)
            })
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(data => {
                    throw new Error(data.error || 'Request failed');
                });
            }
            return response.json();
        })
        .then(data => {
            hideLoading();
            if (data.error) {
                showError(data.error);
            } else {
                addMessage('assistant', data.answer, data.sources);
                chatbot.conversationHistory.push(
                    { role: 'user', content: question },
                    { role: 'assistant', content: data.answer }
                );
            }
        })
        .catch(error => {
            hideLoading();
            showError(error.message || 'Failed to get response');
        })
        .finally(() => {
            chatbot.input.disabled = false;
            chatbot.send.disabled = false;
            chatbot.isLoading = false;
            chatbot.input.focus();
        });
    }
    
    function addMessage(type, text, sources = null) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chatbot-message chatbot-${type}`;
        
        const p = document.createElement('p');
        p.textContent = text;
        messageDiv.appendChild(p);
        
        if (sources && sources.length > 0) {
            const sourcesDiv = document.createElement('div');
            sourcesDiv.className = 'chatbot-sources';
            
            let sourcesHtml = '<strong>Sources:</strong><ul>';
            sources.forEach(s => {
                // New format: { url: 'https://...', file: '...', name: '...' }
                let url = null;
                let displayName = '';
                
                if (s && s.url) {
                    // Use sanitized URL (guaranteed to exist)
                    url = s.url;
                    displayName = s.name || s.file || 'File';
                } else if (s && s.file) {
                    // Fallback: try to construct URL (but might be invalid)
                    const file = s.file.trim().replace(/^,|,$/g, '');
                    if (file && file !== 'unknown') {
                        // Only show if it looks like a valid path
                        if (file.includes('/') && !file.startsWith('http')) {
                            url = `https://github.com/RideMatch1/qubic-anna-lab-public/blob/main/${file}`;
                            displayName = file;
                        }
                    }
                } else if (typeof s === 'string') {
                    const file = s.trim().replace(/^,|,$/g, '');
                    if (file && file !== 'unknown' && file.includes('/') && !file.startsWith('http')) {
                        url = `https://github.com/RideMatch1/qubic-anna-lab-public/blob/main/${file}`;
                        displayName = file;
                    }
                }
                
                if (url) {
                    sourcesHtml += `<li><a href="${url}" target="_blank" rel="noopener noreferrer" title="${displayName}">${displayName}</a></li>`;
                }
            });
            sourcesHtml += '</ul>';
            sourcesDiv.innerHTML = sourcesHtml;
            messageDiv.appendChild(sourcesDiv);
        }
        
        chatbot.messages.appendChild(messageDiv);
        chatbot.messages.scrollTop = chatbot.messages.scrollHeight;
    }
    
    function showLoading() {
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'chatbot-message chatbot-loading';
        loadingDiv.id = 'chatbot-loading';
        loadingDiv.innerHTML = '<div class="chatbot-loading-dots"><span></span><span></span><span></span></div>';
        chatbot.messages.appendChild(loadingDiv);
        chatbot.messages.scrollTop = chatbot.messages.scrollHeight;
    }
    
    function hideLoading() {
        const loading = document.getElementById('chatbot-loading');
        if (loading) {
            loading.remove();
        }
    }
    
    function showError(message) {
        chatbot.error.textContent = message;
        chatbot.error.style.display = 'block';
        setTimeout(hideError, 5000);
    }
    
    function hideError() {
        chatbot.error.style.display = 'none';
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        // DOM already loaded, initialize immediately
        init();
    }
    
    // Also try to initialize after a short delay in case elements load late
    setTimeout(function() {
        if (chatbot.container && !chatbot.toggle) {
            init();
        }
    }, 100);
    
    // Force re-initialization after window load (in case scripts load in wrong order)
    window.addEventListener('load', function() {
        if (chatbot.container && document.getElementById('chatbot-toggle')) {
            if (!chatbot.toggle) {
                init();
            }
        }
    });
})();

