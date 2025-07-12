// Form validation function
function validateForm(event) {
  event.preventDefault();

  const form = document.getElementById("userForm");
  // Return if no form po pinasa
  if (!form) return;

  const fields = form.querySelectorAll("input[type='text'], textarea");
  const emailInput = document.getElementById("email");
  const feedbackElement = document.getElementById("feedback");
  const confirmationElement = document.getElementById("confirmation");

  let allFilled = true;
  let emailValid = true;

  fields.forEach(field => field.classList.remove("error"));

  for (let i = 0; i < fields.length; i++) {
    if (fields[i].value.trim() === "") {
      fields[i].classList.add("error");
      allFilled = false;
    }
  }

  if (emailInput && !emailInput.value.includes("@")) {
    emailValid = false;
    emailInput.classList.add("error");
  }

  if (!allFilled) {
    if (feedbackElement) {
      feedbackElement.style.color = "red";
      feedbackElement.innerText = "Please fix or fill out the remaining fields.";
    }
    if (confirmationElement) {
      confirmationElement.style.display = "none";
    }
  } else if (emailInput && !emailValid) {
    alert("Please enter a valid email address.");
  } else {
    // Show success animation instead of just text
    showRetroCelebration();
    
    // Hide the confirmation element since we're using animation now
    if (confirmationElement) {
      confirmationElement.style.display = "none";
    }
  }
}

// Celebration Animation Functions
function showRetroCelebration() {
  const celebration = document.getElementById('retro-celebration');
  const message = document.getElementById('retro-message');
  const face = document.getElementById('retro-face');
  const thanks = document.getElementById('retro-thanks');
  
  // Show container
  celebration.style.display = 'flex';
  
  // Animate elements in sequence
  setTimeout(() => {
    message.animate([
      { opacity: 0, transform: 'scale(0.5)' },
      { opacity: 1, transform: 'scale(1.1)' },
      { opacity: 1, transform: 'scale(1)' }
    ], {
      duration: 800,
      fill: 'forwards'
    });
    
    // Blinking effect for the message
    setInterval(() => {
      message.style.textShadow = message.style.textShadow === '0 0 10px #0f0' ? 
        '0 0 20px #0f0, 0 0 30px #0f0' : '0 0 10px #0f0';
    }, 500);
  }, 300);
  
  setTimeout(() => {
    face.animate([
      { opacity: 0, transform: 'translateY(-20px)' },
      { opacity: 1, transform: 'translateY(0)' }
    ], {
      duration: 600,
      fill: 'forwards'
    });
  }, 800);
  
  setTimeout(() => {
    thanks.animate([
      { opacity: 0 },
      { opacity: 1 }
    ], {
      duration: 1000,
      fill: 'forwards'
    });
    
    // Create pixel particles
    createPixelParticles();
  }, 1200);
  
  // Hide after 5 seconds and reset form
  setTimeout(() => {
    celebration.style.display = 'none';
    document.getElementById("userForm").reset();
    if (document.getElementById("feedback")) {
      document.getElementById("feedback").innerText = "";
    }
  }, 5000);
}

function createPixelParticles() {
  const colors = ['#0f0', '#ff0', '#f00', '#0ff', '#f0f'];
  const container = document.getElementById('retro-celebration');
  
  for (let i = 0; i < 50; i++) {
    const pixel = document.createElement('div');
    pixel.style.position = 'absolute';
    pixel.style.width = '8px';
    pixel.style.height = '8px';
    pixel.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    pixel.style.left = Math.random() * 100 + 'vw';
    pixel.style.top = Math.random() * 100 + 'vh';
    container.appendChild(pixel);
    
    pixel.animate([
      { transform: 'scale(1)', opacity: 1 },
      { transform: 'scale(0)', opacity: 0 }
    ], {
      duration: 2000 + Math.random() * 2000,
      delay: Math.random() * 1000
    }).onfinish = () => pixel.remove();
  }
}

// Submit again functionality (updated for animation)
function submitAgain(again) {
  const form = document.getElementById("userForm");
  const promptBox = document.getElementById("confirmation");
  const feedbackElement = document.getElementById("feedback");

  if (!form || !promptBox || !feedbackElement) return;

  if (again) {
    form.reset();
    promptBox.style.display = "none";
    feedbackElement.innerText = "";
  } else {
    // Show celebration instead of just text
    showRetroCelebration();
    promptBox.style.display = "none";
  }
}

// dark mode process
function changeColor() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  
  // for saving for localstorage
  localStorage.setItem('theme', newTheme);
  
  // Update all theme buttons text based on theme
  const themeButtons = document.querySelectorAll('button[onclick="changeColor()"]');
  themeButtons.forEach(button => {
    button.textContent = newTheme === 'dark' ? '🌞 Light Mode' : '🌙 Dark Mode';
  });
}

// Initialize theme on page load
function initializeTheme() {
  // Check for saved preference or prefer dark mode if system preference is dark
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('theme');
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
  
  // Initialize all theme buttons text
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
  const themeButtons = document.querySelectorAll('button[onclick="changeColor()"]');
  themeButtons.forEach(button => {
    button.textContent = currentTheme === 'dark' ? '🌞 Light Mode' : '🌙 Dark Mode';
  });
}

// Event Listeners - only attach if elements exist
document.addEventListener('DOMContentLoaded', function() {
  initializeTheme();
  
  const form = document.getElementById("userForm");
  if (form) {
    form.addEventListener("submit", validateForm);
  }
  
  // Create celebration HTML if it doesn't exist
  if (!document.getElementById('retro-celebration')) {
    const celebrationDiv = document.createElement('div');
    celebrationDiv.id = 'retro-celebration';
    celebrationDiv.style.cssText = 'display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.85); z-index:1000; font-family:"VT323", monospace; justify-content:center; align-items:center;';
    celebrationDiv.innerHTML = `
      <div style="position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); text-align:center;">
        <div id="retro-message" style="font-size:3em; color:#0f0; text-shadow:0 0 10px #0f0; margin-bottom:30px; opacity:0;">
          MESSAGE SENT SUCCESSFULLY!
        </div>
        <div id="retro-face" style="margin:20px auto; opacity:0; max-width:80%;">
  <img src="your-face.jpg" style="max-height:200px; width:auto;" alt="Your Face">
</div>
        <div id="retro-thanks" style="font-size:2em; color:#ff0; margin-top:30px; opacity:0;">
          THANK YOU FOR REACHING OUT!!
        </div>
      </div>
    `;
    document.body.appendChild(celebrationDiv);
  }
  
  // Make sure dark mode button exists on all pages
  const darkModeButton = document.createElement('button');
  darkModeButton.setAttribute('onclick', 'changeColor()');
  darkModeButton.className = 'dark-mode-toggle';
  
  // Add to footer if it exists
  const footer = document.querySelector('footer');
  if (footer) {
    footer.prepend(darkModeButton);
    // Update the button text
   
  }
  
  function showRetroCelebration() {
  const celebration = document.getElementById('retro-celebration');
  celebration.style.display = 'block';
  
  // Simple fade-in animation
  setTimeout(() => {
    celebration.style.opacity = '1';
  }, 10);
}

function createPixelParticles() {
  const colors = ['#0f0', '#ff0', '#f00', '#0ff', '#f0f'];
  const container = document.getElementById('retro-celebration');
  
  for (let i = 0; i < 50; i++) {
    const pixel = document.createElement('div');
    pixel.className = 'confetti';
    pixel.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    pixel.style.left = Math.random() * 100 + 'vw';
    pixel.style.top = -10 + 'px';
    container.appendChild(pixel);
    
    pixel.animate([
      { transform: 'scale(1)', opacity: 1 },
      { transform: 'scale(0)', opacity: 0 }
    ], {
      duration: 2000 + Math.random() * 3000,
      delay: Math.random() * 1000
    }).onfinish = () => pixel.remove();
  }
}
});