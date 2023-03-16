const paginateData = {
  totalRecords: "",
  perPage: "",
  totalPages: "",
  currentPage: "",
  data: {},
  next: "",
  prev: "",
  query: "",
};
const paginate = async (req, res, next, model) => {
  const query = req.query ?? {};
  const findData = await model.find(query);
  paginateData.totalRecords = findData.length;
  paginateData.data = findData;
  paginateData.query = query;
  req.model = model;
  req.paginate = paginateData;
  next();
};

module.exports = paginate;
