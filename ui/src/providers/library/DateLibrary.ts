/**
 * @class DateLibrary
 */
export class DateLibrary {

	private now : Date;

	constructor() {
		this.now = new Date();
	}

	public getNowDate() : Date {
		return this.now;
	};

	/**
	 * 日付を文字列に変換する
	 * フォーマット : yyyy-MM-dd
	 * @param  {Date}		target	変換する日付
	 * @return {string}				変換後の日付
	 */
	public getDate2String(target : Date) {
		let year : any = target.getFullYear();
		let month : any = (target.getMonth() + 1);
		let day : any = target.getDate();

		month = month < 10 ? '0' + month : month;
		day = day < 10 ? '0' + day : day;

		return year + '-' + month + '-' + day;
	};

};
