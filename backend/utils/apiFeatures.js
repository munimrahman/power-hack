class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  search() {
    const keyword = this.queryString.keyword
      ? {
          $or: [
            { fullname: { $regex: this.queryString.keyword, $options: 'i' } },
            { email: { $regex: this.queryString.keyword, $options: 'i' } },
          ],
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  pagination(resPerPage) {
    const currentPage = this.queryString.page * 1 || 1;
    const skip = (currentPage - 1) * resPerPage;

    this.query = this.query.skip(skip).limit(resPerPage);
    return this;
  }
}

module.exports = APIFeatures;
