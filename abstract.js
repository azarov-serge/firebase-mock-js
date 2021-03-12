const delay = (ms) => new Promise((res) => { setTimeout(res, ms) });

/**
 * @class
 * @classdesc Firestore(database = {}, timeout = 0)
 */
export class Abstract {
	constructor(database = {}, timeout = 0) {
		this._database = database;
		this._timeout = timeout;
		this.setTimeout = this.setTimeout.bind(this);
		this.delay = this.delay.bind(this);
	}

    /**
     *
     * @param {number} timeout
     */
    setTimeout(timeout) {
		this._timeout = timeout;
	}

	async delay() {
		await delay(this._timeout);
	}
}
