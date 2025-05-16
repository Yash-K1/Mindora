import '../styles/main.scss';

// Prevent flash of white
document.documentElement.style.background = getComputedStyle(document.documentElement).getPropertyValue('--color-bg1');

// Animation timing constants for better maintainability
const ANIMATION_TIMINGS = {
    FADE_OUT: 600,
    FADE_IN: 800,
    MESSAGE_DISPLAY: 1400,
    INITIAL_DELAY: 2000
} as const;

document.addEventListener('DOMContentLoaded', () => {
    const interactive = document.querySelector('.interactive') as HTMLElement;
    const container = document.querySelector('.gradient-bg') as HTMLElement;
    const nameInput = document.querySelector('.name-input') as HTMLInputElement;
    const submitButton = document.querySelector('.submit-button') as HTMLButtonElement;
    const questionText = document.querySelector('.question-text') as HTMLElement;
    const inputGroup = document.querySelector('.input-group') as HTMLElement;

    let mouseX = 0;
    let mouseY = 0;

    const messages = [
        "I am here to assist you with your thoughts",
        "Let's get it all organized."
    ];

    /**
     * Shows messages sequentially with fade animations
     * @param index - Current message index
     */
    const showSequentialMessages = (index = 0) => {
        if (!questionText || index >= messages.length) return;

        const animateMessage = () => {
            try {
                // Fade out current text
                questionText.classList.add('fade-out');

                setTimeout(() => {
                    try {
                        // Update text and fade in
                        questionText.textContent = messages[index];
                        questionText.classList.remove('fade-out');
                        questionText.classList.add('welcome-fade-in');

                        // Remove the animation class after it completes
                        const cleanupAnimation = () => {
                            try {
                                questionText.classList.remove('welcome-fade-in');
                                // Show next message
                                showSequentialMessages(index + 1);
                            } catch (error) {
                                console.error('Error during animation cleanup:', error);
                            }
                        };

                        setTimeout(cleanupAnimation, ANIMATION_TIMINGS.MESSAGE_DISPLAY);
                    } catch (error) {
                        console.error('Error during fade in animation:', error);
                    }
                }, ANIMATION_TIMINGS.FADE_OUT);
            } catch (error) {
                console.error('Error during fade out animation:', error);
            }
        };

        // Use requestAnimationFrame for better performance
        if (index === 0) {
            setTimeout(() => requestAnimationFrame(animateMessage), ANIMATION_TIMINGS.INITIAL_DELAY);
        } else {
            requestAnimationFrame(animateMessage);
        }
    };

    /**
     * Handles name submission and welcome animation
     * Includes error handling and input validation
     */
    const handleSubmit = () => {
        if (!nameInput || !inputGroup || !questionText) {
            console.error('Required DOM elements not found');
            return;
        }

        const name = nameInput.value.trim();
        if (name === '') {
            // Add visual feedback for empty input
            nameInput.classList.add('error');
            setTimeout(() => nameInput.classList.remove('error'), 800);
            return;
        }

        try {
            // Disable input during animation
            nameInput.disabled = true;
            submitButton.disabled = true;

            // First fade out both input group and question
            inputGroup.classList.add('fade-out');
            questionText.classList.add('fade-out');
            
            setTimeout(() => {
                try {
                    const hour = new Date().getHours();
                    const greeting = hour < 12 ? 'Good morning' :
                                   hour < 17 ? 'Good afternoon' :
                                   'Good evening';
                    
                    questionText.textContent = `${greeting}, ${name}! Welcome to Mindora.`;
                    inputGroup.style.display = 'none';
                    questionText.classList.remove('fade-out');
                    questionText.classList.add('welcome-fade-in');

                    // Start the message sequence after welcome message
                    showSequentialMessages();
                } catch (error) {
                    console.error('Error during welcome message animation:', error);
                }
            }, ANIMATION_TIMINGS.FADE_OUT);
        } catch (error) {
            console.error('Error during submit animation:', error);
            // Reset state in case of error
            nameInput.disabled = false;
            submitButton.disabled = false;
        }
    };

    // Track mouse movement
    window.addEventListener('mousemove', (e: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
        
        requestAnimationFrame(() => {
            interactive.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
        });
    });

    // Submit handlers
    submitButton.addEventListener('click', handleSubmit);
    nameInput.addEventListener('keypress', (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    });
});