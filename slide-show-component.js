class SlideShow extends HTMLElement {

  connectedCallback(){
    // Store the JSON data containing image paths
    this.imageData = []

    this.currentImage = '';
    this.src = this.getAttribute('src');
    if(this.src === null){
      this.innerHTML = `<error>src required</error>`;
      return
    }

    this.loadImageData();

    // Set a click event listener to change the image on every click
    this.addEventListener('click', () => this.loadRandomImage());
    
    // Initialize with a random image
    this.loadRandomImage();
  }

  // Load the image data from the JSON file using fetch
  loadImageData() {
    const jsonFilePath = this.src; // Replace with the correct JSON file path
    console.log(this.src);
    fetch(jsonFilePath)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.imageData = data;
        this.loadRandomImage();
      })
      .catch(error => {
        console.error('Error loading JSON file:', error);
      });
  }

  // Load a random image from the JSON data
  loadRandomImage() {
    const imagePaths = this.imageData;
    if (imagePaths.length === 0) {
      return;
    }
    const randomIndex = Math.floor(Math.random() * imagePaths.length);
    this.currentImage = imagePaths[randomIndex];
    this.render();
  }

  // Render the slide-show element with the current image
  render() {
    this.innerHTML = `<lazy-img src="${this.currentImage}" alt="Random Image"></lazy-img>`;
  }
}

// Define the custom element using the 'slide-show' tag
customElements.define('slide-show', SlideShow);
