import './style.css';
import Experience from "./Experience/Experience.js";

const experience = new Experience(document.querySelector('.experience-canvas'));

// Add functionality for the BACK button
console.log('Main.js loaded');

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded, looking for back button...');
  const backButton = document.querySelector('.back-button');
  
  console.log('Back button found:', backButton);
  
  // Debug: Check if Controls is accessible
  console.log('Experience instance:', experience);
  console.log('World:', experience.world);
  console.log('Controls:', experience.world?.controls);
  
  if (backButton) {
    console.log('Adding click listener to back button');
    
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
    
    // Simple click handler
    backButton.onclick = function(e) {
      console.log('Back button clicked via onclick!');
      e.preventDefault();
      e.stopPropagation();
      triggerBackTransition();
      return false;
    };
    
    // Also try addEventListener
    backButton.addEventListener('click', function(e) {
      console.log('Back button clicked via addEventListener!');
      e.preventDefault();
      e.stopPropagation();
      triggerBackTransition();
    });
    
    // Also add click handler to the span inside the button
    const backButtonSpan = backButton.querySelector('span');
    if (backButtonSpan) {
      console.log('Adding click listener to span');
      backButtonSpan.onclick = function(e) {
        console.log('Back button span clicked!');
        e.preventDefault();
        e.stopPropagation();
        triggerBackTransition();
        return false;
      };
    }
  } else {
    console.log('Back button not found!');
  }
});

