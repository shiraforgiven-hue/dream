document.body.classList.add('locked');

function openInvitation() {
    const splash = document.getElementById('splash-screen');
    const mainContent = document.getElementById('main-content');
    const music = document.getElementById('wedding-music');
    
    music.play().catch(error => {
        console.log("Audio autoplay context handled safely:", error);
    });
    
    mainContent.classList.remove('hidden');
    splash.classList.add('fade-out');
    document.body.classList.remove('locked');
}

function toggleAudio() {
    const music = document.getElementById('wedding-music');
    const icon = document.getElementById('audio-status-icon');
    
    if (music.paused) {
        music.play();
        icon.innerText = "🔊";
    } else {
        music.pause();
        icon.innerText = "🔇";
    }
}

// Countdown configuration
const targetDate = new Date("Dec 29, 2026 15:00:00").getTime();

setInterval(() => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference < 0) {
        document.getElementById("countdown-line-container").innerHTML = "<h3>Our Wedding Day Has Arrived!</h3>";
        return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = String(days).padStart(2, '0');
    document.getElementById("hours").innerText = String(hours).padStart(2, '0');
    document.getElementById("minutes").innerText = String(minutes).padStart(2, '0');
    document.getElementById("seconds").innerText = String(seconds).padStart(2, '0');
}, 1000);

// 1. Get the HTML elements
const modal = document.getElementById("rsvp-modal");
const btn = document.getElementById("rsvp-btn");
const span = document.getElementsByClassName("close-modal")[0];

// 2. Open the modal when the button is clicked
if (btn && modal) {
    btn.onclick = function() {
        modal.style.display = "flex";
    }
}

// 3. Close the modal when clicking the (x)
if (span && modal) {
    span.onclick = function() {
        modal.style.display = "none";
    }
}

// 4. Close the modal if clicking outside the white box
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Watch for when the invitation cards scroll into view
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            // Add a class that triggers our CSS animation
            entry.target.classList.add('start-animation');
        }
    });
}, { threshold: 0.1 }); // Triggers when 10% of the card is visible

// Tell the observer to watch all elements with the 'animated-card' class
document.querySelectorAll('.animated-card').forEach((card) => {
    observer.observe(card);
});