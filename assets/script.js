// Handles loading the events for <model-viewer>'s slotted progress bar
const onProgress = (event) => {
  const progressBar = event.target.querySelector('.progress-bar');
  const updatingBar = event.target.querySelector('.update-bar');
  updatingBar.style.width = `${event.detail.totalProgress * 100}%`;
  if (event.detail.totalProgress === 1) {
    progressBar.classList.add('hide');
    event.target.removeEventListener('progress', onProgress);
  } else {
    progressBar.classList.remove('hide');
  }
};
document.querySelector('model-viewer')?.addEventListener('progress', onProgress);

// Wait for Reveal.js to be ready
window.addEventListener('load', function() {
  // Create audio elements
  const div = document.createElement('div');
  div.id = 'playerContainer';
  div.style.display = 'none'; // Hide by default

  const audioEl = document.createElement('audio');
  audioEl.controls = true;
  audioEl.id = 'player';
  audioEl.src = 'assets/recording.m4a';
  div.appendChild(audioEl);

  const captions = document.createElement('div');
  captions.id = 'captions';
  captions.style.display = 'none'; // Hide by default

  const trackEl = document.createElement('track');
  trackEl.default = true;
  trackEl.kind = 'captions';
  trackEl.src = 'assets/recording.vtt';
  trackEl.addEventListener('cuechange', function (event) {
    const text = event.target?.track?.activeCues?.[0]?.text;
    captions.innerText = text ?? '';
  });
  audioEl.appendChild(trackEl);

  document.body.appendChild(div);
  document.body.appendChild(captions);

  // Function to handle slide changes
  function handleSlideChange() {
    const currentSlide = Reveal.getIndices().h;
    if (currentSlide === 3) {
      div.style.display = 'block';
      captions.style.display = 'block';
    } else {
      div.style.display = 'none';
      captions.style.display = 'none';
      audioEl.pause();
    }
  }

  // Wait for Reveal to be initialized
  if (window.Reveal) {
    Reveal.addEventListener('slidechanged', handleSlideChange);
    // Check initial slide
    handleSlideChange();
  }
});
