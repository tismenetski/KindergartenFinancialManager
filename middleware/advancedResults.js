const advancedResults = (model, populate) => async (req, res, next) => {
  let query;

  //Copy req.query
  const reqQuery = { ...req.query };

  //Fields to exclude

  const removeFields = ['select', 'sort', 'page', 'limit'];

  //Loop over remove fields and delete them from request query
  removeFields.forEach((param) => delete reqQuery[param]);

  console.log(reqQuery);

  //Create query string
  let queryStr = JSON.stringify(reqQuery); // ?housing=true&averageCost[lte] = 10000

  //Create operators like (gt,gte,lt,lte,in)
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  console.log(queryStr);

  //Finding resource
  query = model.find(JSON.parse(queryStr));

  // Select Fields
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' '); // the select values are comma seperated , therefore we split them and concat them with space

    query = query.select(fields); // We assign the query variable the fields we would like to see -> if no select fields added the query result will be the entire data
  }

  //Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createAt');
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1; // 1 page as default
  const limit = parseInt(req.query.limit, 10) || 25; //100 per page as default
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit; //End index
  const total = await model.countDocuments(); //Count all the documents

  query = query.skip(startIndex).limit(limit); // if page = 1 then skip is 0

  //If populate field is passed into the function then we populate the field of the Object Schema with the required field
  if (populate) {
    query = query.populate(populate);
  }

  //Executing query
  const results = await query;

  //Pagination result
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }
  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  res.advancedResults = {
    success: true,
    count: results.length,
    pagination,
    data: results,
  };
  next();
};

module.exports = advancedResults;
