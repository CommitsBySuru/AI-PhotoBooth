const video = document.getElementById('video');
const snap = document.getElementById('snap');
const download = document.getElementById('download');
const filterSelect = document.getElementById('filter');
const numPhotosSelect = document.getElementById('numPhotos');
const strip = document.getElementById('strip');
const retry = document.getElementById('retry');
const cameraStatus = document.getElementById('cameraStatus');
const progressText = document.getElementById('progressText');
const actionMessage = document.getElementById('actionMessage');

let photos = [];
let photoCount = 0;
let totalPhotos = parseInt(numPhotosSelect.value, 10);
let cameraReady = false;

createTemplate(totalPhotos);
updateUIState('Allow camera access to start your strip.');
startCamera();

numPhotosSelect.addEventListener('change', () => {
  totalPhotos = parseInt(numPhotosSelect.value, 10);
  photos = [];
  photoCount = 0;
  createTemplate(totalPhotos);
  updateUIState('Strip reset. Ready for a fresh set of photos.');
});

snap.addEventListener('click', () => {
  if (!cameraReady) {
    updateUIState('Camera is not ready yet.');
    return;
  }

  if (photoCount >= totalPhotos) {
    updateUIState('Your strip is full. Retry the last photo or change the strip size.');
    return;
  }

  const tempCanvas = document.createElement('canvas');
  const tempCtx = tempCanvas.getContext('2d');
  tempCanvas.width = video.videoWidth;
  tempCanvas.height = video.videoHeight;

  tempCtx.filter = filterSelect.value;
  tempCtx.drawImage(video, 0, 0);

  const dataURL = tempCanvas.toDataURL('image/png');
  const placeholder = strip.children[photoCount];
  placeholder.classList.add('filled');
  placeholder.innerHTML = `<img class="photo" src="${dataURL}" alt="Captured photo ${photoCount + 1}">`;

  photos.push(tempCanvas);
  photoCount++;

  if (photoCount === totalPhotos) {
    updateUIState('Strip complete. Download it or retry the last shot.');
    return;
  }

  updateUIState(`Captured photo ${photoCount}. ${totalPhotos - photoCount} to go.`);
});

download.addEventListener('click', () => {
  if (photos.length === 0) {
    updateUIState('Take at least one photo before downloading.');
    return;
  }

  const width = Math.max(...photos.map(photo => photo.width)) + 20;
  const height = photos.reduce((sum, photo) => sum + photo.height + 40, -40);

  const fullCanvas = document.createElement('canvas');
  const fullCtx = fullCanvas.getContext('2d');
  fullCanvas.width = width;
  fullCanvas.height = height;

  let y = 0;
  photos.forEach(photo => {
    fullCtx.fillStyle = '#fff';
    fullCtx.fillRect(0, y, photo.width + 20, photo.height + 40);
    fullCtx.drawImage(photo, 10, y + 10, photo.width, photo.height);
    y += photo.height + 40;
  });

  const link = document.createElement('a');
  link.href = fullCanvas.toDataURL('image/png');
  link.download = 'photo_strip.png';
  link.click();
  updateUIState('Downloaded your photo strip.');
});

retry.addEventListener('click', () => {
  if (photoCount === 0) {
    updateUIState('No photo to retry yet.');
    return;
  }

  photoCount--;
  photos.pop();

  const placeholder = strip.children[photoCount];
  resetSlot(placeholder, photoCount);
  updateUIState(`Removed photo ${photoCount + 1}. Take it again when ready.`);
});

function startCamera() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    setCameraStatus('Camera unavailable', 'error');
    updateUIState('This browser does not support camera access.');
    return;
  }

  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      video.srcObject = stream;
      cameraReady = true;
      setCameraStatus('Camera ready', 'ready');
      updateUIState('Camera ready. Take your first photo.');
    })
    .catch(error => {
      console.error('Error accessing camera:', error);
      cameraReady = false;
      setCameraStatus('Camera blocked', 'error');
      updateUIState('Camera access is blocked. Allow access and refresh to use the booth.');
    });
}

function createTemplate(num) {
  strip.innerHTML = '';

  for (let i = 0; i < num; i++) {
    const polaroid = document.createElement('div');
    polaroid.classList.add('polaroid');
    resetSlot(polaroid, i);
    strip.appendChild(polaroid);
  }
}

function resetSlot(slot, index) {
  slot.classList.remove('filled');
  slot.dataset.label = `Photo ${index + 1}`;
  slot.textContent = `Photo ${index + 1}`;
}

function setCameraStatus(message, state) {
  cameraStatus.textContent = message;
  cameraStatus.classList.remove('status-waiting', 'status-ready', 'status-error');
  cameraStatus.classList.add(`status-${state}`);
}

function updateUIState(message) {
  const stripComplete = photoCount >= totalPhotos;
  progressText.textContent = `${photoCount} of ${totalPhotos}`;
  actionMessage.textContent = message || getDefaultMessage(stripComplete);

  snap.disabled = !cameraReady || stripComplete;
  retry.disabled = photoCount === 0;
  download.disabled = photos.length === 0;
}

function getDefaultMessage(stripComplete) {
  if (!cameraReady) return 'Waiting for camera access.';
  if (stripComplete) return 'Strip complete. Download it or retry the last shot.';
  return `Ready for photo ${photoCount + 1}.`;
}
