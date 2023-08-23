class LazyImg extends HTMLElement {
  connectedCallback() {
    this.src = this.getAttribute('src');
    if (this.src === null) {
      this.innerHTML = `<error>SRC required</error>`;
      return;
    }
    this.loadImage();
    this.style.objectFill = 'fill';
  }

  updateProgress(progress) {
    this.innerHTML = `<status>${progress.toFixed(2)}%</status>`;
  }

  async loadImage() {
    try {
      const response = await fetch(this.src);
      if (!response.ok) {
        throw new Error('Failed to load image');
      }

      const totalSize = response.headers.get('content-length');
      if (!totalSize) {
        throw new Error('Unable to determine image size');
      }

      const reader = response.body.getReader();
      let loadedSize = 0;

      const chunks = [];
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
        loadedSize += value.length;
        const progress = (loadedSize / totalSize) * 100;
        this.updateProgress(progress);
      }

      const blob = new Blob(chunks);
      const dataUrl = URL.createObjectURL(blob);
      const img = document.createElement('img');
      img.setAttribute('src', dataUrl);
      this.innerHTML = '';
      this.appendChild(img);
      
      img.style.display = 'block';


    } catch (error) {
      this.innerHTML = `<error>${error.message}</error>`;
      setTimeout(() => {
        this.loadImage();
      },5000 * Math.random())
    }
  }


  static get observedAttributes() {
    return [];
  }

  attributeChangedCallback(name, old_value, new_value) {
    switch (name) {
      default:
    }
  }
}

customElements.define('lazy-img', LazyImg);
