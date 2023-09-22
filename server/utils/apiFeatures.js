class apiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    let keyword = this.queryStr.keyword
      ? {
          meetingName: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};
      let name = this.queryStr.name ? {
        name:{
          $regex:this.queryStr.name,
          $options: "i"
        }
      }
      :
      {}
    this.query.find({ ...keyword });
    this.query.find({...name})
    return this;
  }
}


module.exports = apiFeatures