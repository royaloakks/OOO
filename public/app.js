   // Define sounds
   const sounds = {
    a: new Howl({ src: ['sounds/sound1.mp3'] }),
    b: new Howl({ src: ['sounds/sound2.mp3'] }),
    // Add more sounds for each key
  };

  // Handle keydown events
  document.addEventListener('keydown', (event) => {
    const key = event.key.toLowerCase();
    if (sounds[key]) {
      sounds[key].play();
      // The animation is handled in the Paper.js script
    }
  });