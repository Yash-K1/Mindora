import '../styles/main.scss';

document.addEventListener('DOMContentLoaded', () => {
    const interactive = document.querySelector('.interactive') as HTMLElement;
    const container = document.querySelector('.gradient-bg') as HTMLElement;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
        
        interactive.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    };

    container.addEventListener('mousemove', handleMouseMove);

    // Handle name input
    const nameInput = document.querySelector('.name-input') as HTMLInputElement;
    const questionText = document.querySelector('.question-text') as HTMLElement;

    nameInput.addEventListener('keypress', (e: KeyboardEvent) => {
        if (e.key === 'Enter' && nameInput.value.trim() !== '') {
            questionText.textContent = `Welcome, ${nameInput.value}!`;
            nameInput.style.display = 'none';
        }
    });
});