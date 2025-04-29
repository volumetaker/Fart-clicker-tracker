document.addEventListener('DOMContentLoaded', () => {
    // Fart Counter Logic
    const population = 8000000000; // 8 billion
    const avgFartsPerDay = 15; // Average of 10–20 farts per day
    const secondsInDay = 86400;
    const baseFartsPerSecond = (population * avgFartsPerDay) / secondsInDay; // ~1.39M farts/second

    const counter = document.getElementById('fart-counter');
    
    function updateCounter() {
        const variation = baseFartsPerSecond * 0.1 * (Math.random() * 2 - 1);
        const fartsNow = Math.round(baseFartsPerSecond + variation);
        counter.textContent = fartsNow.toLocaleString();
    }

    updateCounter();
    setInterval(updateCounter, 2000);

    // Form Submission Feedback
    document.getElementById('contact-form').addEventListener('submit', function (e) {
        e.preventDefault();
        setTimeout(() => {
            document.getElementById('form-message').classList.remove('hidden');
            this.reset();
            setTimeout(() => {
                document.getElementById('form-message').classList.add('hidden');
            }, 3000);
        }, 1000);
    });

    // Chatbot Logic
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const chatSubmit = document.getElementById('chat-submit');

    const mockResponses = [
        "Farts smell due to sulfur compounds like hydrogen sulfide. Blame your gut bacteria!",
        "The average person farts 0.5–1.5 liters of gas daily. That’s a lot of hot air!",
        "Farts can travel at 10 feet per second. That’s some serious wind power!",
        "Yes, farts are flammable due to methane content, but please don’t try lighting them!",
        "Diet matters! Beans and broccoli can turn you into a fart factory."
    ];

    function addMessage(message, isUser) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('chat-message', isUser ? 'user' : 'bot');
        messageDiv.innerHTML = `<span class="message">${message}</span>`;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    async function fetchAIResponse(message) {
        return mockResponses[Math.floor(Math.random() * mockResponses.length)];
    }

    chatSubmit.addEventListener('click', async () => {
        const message = chatInput.value.trim();
        if (message) {
            addMessage(message, true);
            chatInput.value = '';
            const response = await fetchAIResponse(message);
            addMessage(response, false);
        }
    });

    chatInput.addEventListener('keypress', async (e) => {
        if (e.key === 'Enter' && chatInput.value.trim()) {
            addMessage(chatInput.value, true);
            chatInput.value = '';
            const response = await fetchAIResponse(chatInput.value);
            addMessage(response, false);
        }
    });
});