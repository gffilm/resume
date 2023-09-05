
class Analyzer {

  records = [];

  constructor() {
  }

  record(record) {
    this.records.push(record);
  }

	getRecords() {
		return this.records;
 	}
}
