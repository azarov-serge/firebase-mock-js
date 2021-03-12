/**
 * @class
 * @classdesc Auth(database = {}, timeout = 0)
 */
export class Auth extends Abstract {
	constructor(database = {}, timeout = 0) {
		super(database, timeout);
		this._idCount = 0;
		this._users = this._database['_users'];
		this.signInWithEmailAndPassword = this.signInWithEmailAndPassword.bind(this);
		this.createUserWithEmailAndPassword = this.createUserWithEmailAndPassword.bind(this);
	}

	async signInWithEmailAndPassword(email, password) {
		const user = this._users.find((item) => item.email.toLowerCase() === email.toLowerCase());
		await this.delay();

		if (!user) {
			return { message: 'User not found' };
		}

		if (user && user.password === password) {
			return {
				uid: user.uid,
				login: user.email,
			};
		}

		return { message: 'Bad authorization. Try again' };
	}

	async createUserWithEmailAndPassword(email, password) {
		await this.delay();
		const user = {
			id: `${this._idCount++}`,
			email,
			password,
		};

		const response = { ...user };
		delete response.password;
		this._users.push(user);

		return response;
	}
	
	async signOut() {
		await this.delay();
	}
}
