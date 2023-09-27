const Company = require("../Model/companyModel");

const findAllByQueryWithPagination = async ({
    query = {},
    options = {},
    reqQuery = {page: 1, limit: 0, sort_by: '',},
    select = {}
}) => {

let sortBy = {_id: 1};
if (reqQuery.sort_by) sortBy = JSON.parse(reqQuery.sort_by);
let pageNumber = 1, pageSize = 10;

const {page, limit} = reqQuery;
if (page && Number(page) > 1) pageNumber = Number(page);
if (limit && Number(limit) > 0) pageSize = Number(limit);

const resData = await Company.find(query, options).select(select).skip((pageNumber - 1) * pageSize).limit(pageSize).sort(sortBy);
const total_count = await Company.find().count();

return {
metadata: {limit: pageSize, page: pageNumber, total_count},
data: resData
};
};

module.exports = findAllByQueryWithPagination