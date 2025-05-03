document.addEventListener('DOMContentLoaded', () => {
    const splashScreen = document.getElementById('splashScreen');
    const welcomeScreen = document.getElementById('welcomeScreen');
    const splashContent = document.getElementById('splashContent');

    // Fade in splash content with a slight delay
    setTimeout(() => {
        splashContent.classList.remove('opacity-0', 'translate-y-4');
    }, 300);

    // Transition to welcome screen with enhanced animation
    setTimeout(() => {
        splashScreen.classList.add('opacity-0');
        setTimeout(() => {
            splashScreen.classList.add('hidden');
            welcomeScreen.classList.remove('hidden');
            // Add animate.css classes to welcome screen elements
            welcomeScreen.querySelectorAll('.animate__animated').forEach(element => {
                element.style.opacity = '0';
                setTimeout(() => {
                    element.style.opacity = '1';
                }, 100);
            });
        }, 500);
    }, 2000);
}); 