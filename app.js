const video = document.getElementById('video');
const snap = document.getElementById('snap');
const download = document.getElementById('download');
const filterSelect = document.getElementById('filter');
const numPhotosSelect = document.getElementById('numPhotos');
const strip = document.getElementById('strip');
const retry = document.getElementById('retry');

let photos = [];
let photoCount = 0;
let totalPhotos = parseInt(numPhotosSelect.value);

// Access webcam
navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => { video.srcObject = stream; })
  .catch(err => { console.error('Error accessing camera:', err); });

// Initialize template
createTemplate(totalPhotos);

// Update template if number of photos changes
numPhotosSelect.addEventListener('change', () => {
  totalPhotos = parseInt(numPhotosSelect.value);
  photos = [];
  photoCount = 0;
  createTemplate(totalPhotos);
});

// Function to create empty Polaroid template
function createTemplate(num) {
  strip.innerHTML = '';
  for (let i = 0; i < num; i++) {
    const polaroid = document.createElement('div');
    polaroid.classList.add('polaroid');
    polaroid.innerText = 'Photo ' + (i + 1);
    strip.appendChild(polaroid);
  }
}

// Take photo and fill next placeholder
snap.addEventListener('click', () => {
  if (photoCount >= totalPhotos) {
    alert('All placeholders are filled!');
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
  placeholder.innerHTML = `<img class="photo" src="${dataURL}" />`;

  photos.push(tempCanvas);
  photoCount++;
});

// Download full strip
download.addEventListener('click', () => {
  if (photos.length === 0) return alert('Take some photos first!');

  const width = Math.max(...photos.map(p => p.width)) + 20;
  const height = photos.reduce((sum, p) => sum + p.height + 40, -40);

  const fullCanvas = document.createElement('canvas');
  const fullCtx = fullCanvas.getContext('2d');
  fullCanvas.width = width;
  fullCanvas.height = height;

  let y = 0;
  photos.forEach(p => {
    fullCtx.fillStyle = '#fff';
    fullCtx.fillRect(0, y, p.width + 20, p.height + 40);
    fullCtx.drawImage(p, 10, y + 10, p.width, p.height);
    y += p.height + 40;
  });

  const link = document.createElement('a');
  link.href = fullCanvas.toDataURL('image/png');
  link.download = 'photo_strip.png';
  link.click();
});

retry.addEventListener('click', () => {
    if (photoCount === 0) {
        alert('No photo to retry!');
        return;
    }

    // Remove last photo
    photoCount--;
    photos.pop();

    // Reset placeholder
    const placeholder = strip.children[photoCount];
    placeholder.innerHTML = 'Photo ' + (photoCount + 1);
});