const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const offerPhotoChooser = document.querySelector('#images');
const offerPhotoContainer = document.querySelector('.ad-form__photo');

offerPhotoChooser.addEventListener('change', () => {
  const file = offerPhotoChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const offerPhotoPreview =  document.createElement('img');
    offerPhotoPreview.style.width = '70px';
    offerPhotoPreview.style.height = '70px';
    offerPhotoPreview.style.borderRadius = '5px';
    offerPhotoPreview.src = URL.createObjectURL(file);
    offerPhotoContainer.append(offerPhotoPreview);
  }
});
