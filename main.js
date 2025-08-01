import './style.css';
import Experience from "./Experience/Experience.js";

const experience = new Experience(document.querySelector('.experience-canvas'));

// Add functionality for the BACK button
console.log('Main.js loaded');

// Mobile device detection
function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
         (navigator.maxTouchPoints && navigator.maxTouchPoints > 2) ||
         window.innerWidth <= 768;
}

// Show mobile blocker if on mobile device
function checkMobileDevice() {
  const mobileBlocker = document.getElementById('mobile-blocker');
  if (isMobileDevice()) {
    mobileBlocker.classList.add('show');
    // Prevent any interaction with the page
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';
  }
}

// Scroll blocking functionality
let scrollBlocked = false;

function blockScroll() {
    if (scrollBlocked) return;
    
    scrollBlocked = true;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    
    // Add scroll event listener to prevent scrolling
    document.addEventListener('scroll', preventScroll, { passive: false });
    document.addEventListener('wheel', preventScroll, { passive: false });
    document.addEventListener('touchmove', preventScroll, { passive: false });
}

function unblockScroll() {
    if (!scrollBlocked) return;
    
    scrollBlocked = false;
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    
    // Remove scroll event listeners
    document.removeEventListener('scroll', preventScroll);
    document.removeEventListener('wheel', preventScroll);
    document.removeEventListener('touchmove', preventScroll);
}

function preventScroll(e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
}

// Function to handle section changes
function setCurrentSection(sectionId) {
    console.log(`Setting current section to: ${sectionId}`);
    
    if (sectionId === 'top') {
        // Block scrolling when on home page
        console.log('Blocking scroll for home page');
        blockScroll();
    } else if (sectionId) {
        // Allow scrolling when on other pages
        console.log(`Unblocking scroll for: ${sectionId}`);
        unblockScroll();
    }
}

// Export the function so Controls.js can use it
window.setCurrentSection = setCurrentSection;

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded, looking for back buttons...');
  
  // Check for mobile devices first
  checkMobileDevice();
  
  // Block scrolling on home page
  blockScroll();
  
  // Listen for window resize to handle orientation changes
  window.addEventListener('resize', () => {
    checkMobileDevice();
  });
  
  const backButtons = document.querySelectorAll('.back-button');
  
  console.log('Back buttons found:', backButtons.length);
  
  // Debug: Check if Controls is accessible
  console.log('Experience instance:', experience);
  console.log('World:', experience.world);
  console.log('Controls:', experience.world?.controls);
  
  if (backButtons.length > 0) {
    console.log('Adding click listeners to all back buttons');
    
    // Function to trigger back transition
    function triggerBackTransition() {
      console.log('Attempting to trigger back transition...');
      
      // Check if resources are ready by comparing loaded vs queue
      const resourcesReady = experience.resources.loaded === experience.resources.queue;
      console.log('Resources loaded:', experience.resources.loaded, '/', experience.resources.queue);
      
      if (resourcesReady) {
        console.log('Resources ready, Controls available:', experience.world?.controls);
        if (experience.world?.controls) {
          const controls = experience.world.controls;
          controls.back = true;
          controls.selected = "";
          controls.releaseFlag = true; // Add this flag to trigger scroll to top
          
          // Force the target to start decreasing by setting it to a value less than 1
          if (controls.viewCont.target >= 1) {
            controls.viewCont.target = 0.99;
            console.log('Forced viewCont.target to:', controls.viewCont.target);
          }
          
          console.log('Back transition triggered successfully');
          console.log('Current viewCont.target:', controls.viewCont.target);
          console.log('Current viewCont.current:', controls.viewCont.current);
        } else {
          console.log('Controls still not available');
        }
      } else {
        console.log('Resources not ready yet, waiting...');
        // Wait for resources to be ready
        experience.resources.on("ready", () => {
          console.log('Resources now ready, Controls:', experience.world?.controls);
          if (experience.world?.controls) {
            const controls = experience.world.controls;
            controls.back = true;
            controls.selected = "";
            controls.releaseFlag = true; // Add this flag to trigger scroll to top
            
            // Force the target to start decreasing by setting it to a value less than 1
            if (controls.viewCont.target >= 1) {
              controls.viewCont.target = 0.99;
              console.log('Forced viewCont.target to:', controls.viewCont.target);
            }
            
            console.log('Back transition triggered after resources ready');
          }
        });
      }
    }
    
    // Add click handlers to all back buttons
    backButtons.forEach((backButton, index) => {
      console.log(`Adding click listener to back button ${index + 1}`);
      
      // Simple click handler
      backButton.onclick = function(e) {
        console.log(`Back button ${index + 1} clicked via onclick!`);
        e.preventDefault();
        e.stopPropagation();
        setCurrentSection('top'); // Block scroll on home page
        triggerBackTransition();
        return false;
      };
      
      // Also try addEventListener
      backButton.addEventListener('click', function(e) {
        console.log(`Back button ${index + 1} clicked via addEventListener!`);
        e.preventDefault();
        e.stopPropagation();
        setCurrentSection('top'); // Block scroll on home page
        triggerBackTransition();
      });
      
      // Also add click handler to the span inside the button
      const backButtonSpan = backButton.querySelector('span');
      if (backButtonSpan) {
        console.log(`Adding click listener to span for back button ${index + 1}`);
        backButtonSpan.onclick = function(e) {
          console.log(`Back button ${index + 1} span clicked!`);
          e.preventDefault();
          e.stopPropagation();
          setCurrentSection('top'); // Block scroll on home page
          triggerBackTransition();
          return false;
        };
      }
    });
  } else {
    console.log('No back buttons found!');
  }
});

