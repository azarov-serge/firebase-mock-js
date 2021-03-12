import { Abstract } from './abstract';

/**
 * @class
 * @classdesc Firestore(database = {}, timeout = 0)
 */
export class Firestore extends Abstract {
	constructor(database = {}, timeout = 0) {
		super(database, timeout);
		this._whereData = {};
		this._collectionName = '';
		this._doc = '';
		this.where = this.where.bind(this);
		this.setCollection = this.setCollection.bind(this);
		this.collection = this.collection.bind(this);
		this.get = this.get.bind(this);
		this.doc = this.doc.bind(this);
		this.delete = this.delete.bind(this);
	}

    /**
     *
     * @param {string} field
     * @param {string} sign
     * @param {string | number | boolean} value
     */
	where(field, sign, value) {
		this._whereData = { field, sign, value };
		return this;
	};

    /**
     *
     * @param {string} collectionName
     * @param {{string: string | number | boolean}} collection
     */
	setCollection(collectionName, collection) {
		this._database[collectionName] = collection;
	};

    /**
     *
     * @param {string} name
     */
	collection(name) {
		this._collectionName = name;
		return this;
	};

	async get() {
		const collection = this._database[this._collectionName];
		const { field = '', sign = '', value = null } = this._whereData;

		const snapshot = { docs: [] };

		snapshot.docs = collection.reduce((acc, item) => {
			let valid = false;
			switch (sign) {
				case '===':
					if (item[field] === value) {
						valid = true;
					}
					break;

				case '!==':
					if (item[field] !== value) {
						valid = true;
					}
					break;

				case '>=':
					if (value !== null && item[field] >= value) {
						valid = true;
					}
					break;

				case '<=':
					if (value !== null && item[field] <= value) {
						valid = true;
					}
					break;

				case '>':
					if (value !== null && item[field] > value) {
						valid = true;
					}
					break;

				case '<':
					if (value !== null && item[field] < value) {
						valid = true;
					}
					break;

				default:
					valid = true;
			}

			if (valid) {
				const data = { ...item};
				delete data.id;

				const doc = {
					id: item.id,
					data: () => data,
				};

				acc.push(doc);
			}

			return acc;
		}, []);

		this._whereData = null;
		this._collectionName = '';

        await this.delay();

		return snapshot;
	};

	/**
	 * 
	 * @param {string} docId 
	 */
	doc(docId) {
		this._doc = docId;
	}

	async delete() {
		await delay(this._timeout);
		this._database[this._collectionName].filter((doc) => doc.id !== this._doc);

		return true;
	}
}
