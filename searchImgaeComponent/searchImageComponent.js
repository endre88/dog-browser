import '../css/searchImageComponent.css';
import ContentComponent from '../contentComponent/contentComponent.js';

class SearchImage extends ContentComponent {
  constructor() {
    super();
    this.render();
  }
  //megjeleníti az oldalon a hibaüzenetet úgy hogy html-be csomagolja

  async getImages(dogBreed) {
    dogBreed = dogBreed.split(' ');
    let urlString;
    if (dogBreed.length === 1) {
      urlString = `https://dog.ceo/api/breed/${dogBreed[0]}/images`;
    } else if (dogBreed.length === 2) {
      urlString = `https://dog.ceo/api/breed/${dogBreed[1]}/${dogBreed[0]}/images`;
    }
    const response = await fetch(urlString);
    if (response.status === 404) {
      return;
    }
    if (!response.ok) {
      throw new Error('Nem sikerült lekérni a képet');
    }
    const data = await response.json();
    return data.message;
  }
  displayImage(imageList) {
    this.clearDogs();
    this.clearErrors();
    const image = document.createElement('img');
    image.src = imageList[Math.floor(Math.random() * imageList.length)];
    document.querySelector('#content').appendChild(image);
  }
  render() {
    //html elemeket hoz létre a header-ben
    const markup = ` 
        <form class="dog-search">
            <span class="search-icon"></span>
            <input type="text" id="dogSearchInput">
            <button type="submit">Search</button>
        </form>
`;
    document.querySelector('#header').insertAdjacentHTML('beforeend', markup);
    document.querySelector('.dog-search button').addEventListener('click', (event) => {
      event.preventDefault();
      const searchTerm = document.querySelector('.dog-search input').value;
      if (!searchTerm) {
        this.displayError('Kérlek elsőnek adj meg egy kereső szót!');
        return;
      }
      this.getImages(searchTerm)
        .then((imageList) => {
          if (imageList) {
            this.displayImage(imageList);
          } else {
            this.displayError('Nincs ilyen kereső szó!');
          }
        })
        .catch((error) => {
          this.displayError('Hoppá valami félrement');
          console.error(error);
        });
    });
  }
}

export default SearchImage;
