import '../css/listBreedsComponent.css';
import ContentComponent from '../contentComponent/contentComponent.js';

class ListBreeds extends ContentComponent {
  constructor() {
    super();
    this.render();
  }
  async getFullList() {
    if (localStorage.getItem('dogs') === null) {
      const response = await fetch('https://dog.ceo/api/breeds/list/all');
      if (!response.ok) {
        throw new Error('Nem sikerült lekérni a kutyafajtákat');
      }
      const data = await response.json();
      localStorage.setItem('dogs', JSON.stringify(data));
    } else {
      const dog = JSON.parse(localStorage.getItem('dogs'));
      return dog.message;
    }
  }

  createListItem(breedName) {
    const item = document.createElement('div');
    item.classList.add('breed-list-item');
    item.textContent = breedName;
    document.querySelector('#content').appendChild(item);
  }

  displayList(breedList) {
    this.clearDogs();
    for (let breed in breedList) {
      if (breedList[breed].length !== 0) {
        for (const subBreed of breedList[breed]) {
          // az objecten belüli tömb belső elemén megy végig
          this.createListItem(`${subBreed} ${breed}`);
        }
      } else {
        this.createListItem(breed);
      }
    }
  }

  render() {
    const button = document.createElement('button');
    button.classList.add('list-button');
    button.textContent = 'List Breeds';
    button.addEventListener('click', () => {
      this.clearDogs();
      this.getFullList()
        .then((breedList) => {
          breedList && this.displayList(breedList);
        })
        .catch((error) => {
          this.displayError('Error listing breeds :( Please try again later');
          console.error(error);
        });
    });
    document.querySelector('#header').appendChild(button);
  }
}

export default ListBreeds;
