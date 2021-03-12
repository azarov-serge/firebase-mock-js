import { Firestore } from './firestore';
import { Auth } from './auth';

/**
 * @class
 * @classdesc FirebaseMock(database = {}, timeout = 0)
 */
export class FirebaseMock {
	constructor(database = {}, timeout = 0) {
		this._database = database;
		this._timeout = timeout;
		this._firestore = null;
		this._auth = null;
	}

	setTimeout = (timeout) => {
		this._timeout = timeout;
		this.firestore().setTimeout(timeout);
		this.auth().setTimeout(timeout);
	}

	firestore() {
		if (!this._firestore) {
			this._firestore = new Firestore(this._database, this._timeout);
		}

		return this._firestore;
	}

	auth() {
		if (!this._auth) {
			this._auth = new Auth(this._database, this._timeout);
		}
		return this._auth;
	}
}
