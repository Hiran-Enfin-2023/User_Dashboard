class apiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    let keyword = this.queryStr.keyword
      ? {
          meetingTitle: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};

    let name = this.queryStr.name
      ? {
          name: {
            $regex: this.queryStr.name,
            $options: "i",
          },
        }
      : {};

    let host = this.queryStr.host
      ? {
          host: [{
            $regex: this.queryStr.host,
            $options: "i",
          }],
        }
      : {};

      let participants = this.queryStr.participants ? {
        participants : {
          $regex : this.queryStr.participants,
          $options: "i"
        }
      }: {}

    this.query.find({ ...keyword });
    this.query.find({ ...name });
    this.query.find({...host})
    this.query.find({...participants})
    return this;
  }

  paginate(perPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = perPage * (currentPage - 1);
    this.query = this.query.limit(perPage).skip(skip);
    return this;
  }
}

module.exports = apiFeatures;
