import {BASE_API} from 'shared/constants/constants';
import {putStorage, getChromeStorage, getAllKeysInStorage, cleanChromeStorage} from 'shared/helpers';

/**
* @description Class to connection with phrases in API and saved on localStorage extension.
* @param {Number} category -  The category of phrases
*/

class Phrases {

	constructor(category = 0){
		this.phrasesFull = [];
		//I need to boot catching API
		this.category = category;
	}

/**
 * @description Get all phrases
 * @callback getAllCallback
 */
	getAll(callback){
		getChromeStorage('packageSelected').then( packageSelected => {
				this._getPhrasesInLocal()
			  .then(packages => callback(packages, packageSelected.label));
		});
	}

	/**
	* @return Promise
	* @description GET phrases in Package in local storage
	*/
	_getPhrasesInLocal(){
		return new Promise((resolve, reject) => {
			getChromeStorage('packages')
				.then(JSON.parse)
				.then( packages => {
            resolve(packages);
				})
				.catch(err => reject(err));
		});
	}

	/**
	* @description GET phrases in API and save in local storage or GET local storage
	* @return Promise
	*/
	_loadPhrases(){
		return new Promise ((resolve, reject) => {
			this._getPhrasesInLocal()
				.then((phrases) => {
					console.log("I had been saved::LocalStorage");
					resolve(phrases);
				})
				.catch((error) => {
					//is not on localStorage
					this._getPhrasesInAPI()
					.then( (phrases) => {
						console.log('Saved! He took API');
						resolve(phrases);
					})
				.catch((error) => {
					console.log('oh no error API', error);
					reject(new Error('Error catch phrases in api'));
				});
			});
		});
	}


	/**
	 * @return Promise
	 * @description Get phrases in API
	 */
	_getPhrasesInAPI(){
		return new Promise((resolve, reject) => {
				let request = new XMLHttpRequest();
				let _args = {};
				request.open('GET', `${BASE_API}/api/eng/readphrases/?id=${this.category}`, true); 
				request.onload = function() {

					if (request.status >= 200 && request.status < 400) {
						_args = JSON.parse(request.responseText);
						this.phrasesFull = _args.phrases;
						putStorage('phrases', this.phrasesFull);

						resolve(_args.phrases);
					} else {
						// We reached our target server, but it returned an error
						reject(Error('Error fetching data.'));
						console.log("error in server");
					}

				};
				request.send();
			});
	}
}

export default Phrases;
