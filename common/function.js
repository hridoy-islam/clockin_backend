const Company = require("../Model/companyModel");
const Customer = require("../Model/customerModel");
const Worker = require("../Model/workerModel");
const TaskList = require("../Model/taskListModel")
const Service = require("../Model/serviceModel")
const Payday = require("../Model/payDayModel")

const findAllByQueryWithPagination = async ({
    query = {},
    options = {},
    reqQuery = { page: 1, limit: 0, sort_by: '', },
    select = {}
}) => {

    let sortBy = { _id: 1 };
    if (reqQuery.sort_by) sortBy = JSON.parse(reqQuery.sort_by);
    let pageNumber = 1, pageSize = 10;

    const { page, limit } = reqQuery;
    if (page && Number(page) > 1) pageNumber = Number(page);
    if (limit && Number(limit) > 0) pageSize = Number(limit);

    const resData = await Company.find(query, options).select('-password').skip((pageNumber - 1) * pageSize).limit(pageSize).sort(sortBy);
    const total_count = await Company.find(query).count();

    return {
        metadata: { limit: pageSize, page: pageNumber, total_count },
        data: resData
    };
};

const CustomerPagination = async ({
    query = {},
    options = {},
    reqQuery = { page: 1, limit: 0, sort_by: '', },
    select = {}
}) => {

    let sortBy = { _id: 1 };
    if (reqQuery.sort_by) sortBy = JSON.parse(reqQuery.sort_by);
    let pageNumber = 1, pageSize = 10;

    const { page, limit } = reqQuery;
    if (page && Number(page) > 1) pageNumber = Number(page);
    if (limit && Number(limit) > 0) pageSize = Number(limit);

    const resData = await Customer.find(query, options).select(select).skip((pageNumber - 1) * pageSize).limit(pageSize).sort(sortBy);
    const total_count = await Customer.find(query).count();

    return {
        metadata: { limit: pageSize, page: pageNumber, total_count },
        data: resData
    };
};

const WorkerPagination = async ({
    query = {},
    options = {},
    reqQuery = { page: 1, limit: 0, sort_by: '', },
    select = {}
}) => {

    let sortBy = { _id: 1 };
    if (reqQuery.sort_by) sortBy = JSON.parse(reqQuery.sort_by);
    let pageNumber = 1, pageSize = 10;

    const { page, limit } = reqQuery;
    if (page && Number(page) > 1) pageNumber = Number(page);
    if (limit && Number(limit) > 0) pageSize = Number(limit);

    const resData = await Worker.find(query, options).select('-password').skip((pageNumber - 1) * pageSize).limit(pageSize).sort(sortBy);
    const total_count = await Worker.find(query).count();

    return {
        metadata: { limit: pageSize, page: pageNumber, total_count },
        data: resData
    };
};

const TaskListPagination = async ({
    query = {},
    options = {},
    reqQuery = { page: 1, limit: 0, sort_by: '', },
    select = {}
}) => {

    let sortBy = { _id: 1 };
    if (reqQuery.sort_by) sortBy = JSON.parse(reqQuery.sort_by);
    let pageNumber = 1, pageSize = 10;

    const { page, limit } = reqQuery;
    if (page && Number(page) > 1) pageNumber = Number(page);
    if (limit && Number(limit) > 0) pageSize = Number(limit);

    const resData = await TaskList.find(query, options).select(select).skip((pageNumber - 1) * pageSize).limit(pageSize).sort(sortBy);
    const total_count = await TaskList.find(query).count();

    return {
        metadata: { limit: pageSize, page: pageNumber, total_count },
        data: resData
    };
};

const ServicePagination = async ({
    query = {},
    options = {},
    reqQuery = { page: 1, limit: 0, sort_by: '', },
    select = {}
}) => {

    let sortBy = { _id: 1 };
    if (reqQuery.sort_by) sortBy = JSON.parse(reqQuery.sort_by);
    let pageNumber = 1, pageSize = 10;

    const { page, limit } = reqQuery;
    if (page && Number(page) > 1) pageNumber = Number(page);
    if (limit && Number(limit) > 0) pageSize = Number(limit);

    if(query?.serviceDateEnd){
        query.serviceDate = {
            $gte: query.serviceDate,
            $lte: query.serviceDateEnd
          }
        delete query.serviceDateEnd
    }

    const resData = await Service.find(query, options).populate('customer').populate('worker').select(select).skip((pageNumber - 1) * pageSize).limit(pageSize).sort(sortBy);
    const total_count = await Service.find(query).count();

    return {
        metadata: { limit: pageSize, page: pageNumber, total_count },
        data: resData
    };
};

const PayDayPagination = async ({
    query = {},
    options = {},
    reqQuery = { page: 1, limit: 0, sort_by: '', },
    select = {}
}) => {

    let sortBy = { _id: 1 };
    if (reqQuery.sort_by) sortBy = JSON.parse(reqQuery.sort_by);
    let pageNumber = 1, pageSize = 10;

    const { page, limit } = reqQuery;
    if (page && Number(page) > 1) pageNumber = Number(page);
    if (limit && Number(limit) > 0) pageSize = Number(limit);

    const resData = await Payday.find(query, options).select(select).skip((pageNumber - 1) * pageSize).limit(pageSize).sort(sortBy);
    const total_count = await Payday.find(query).count();

    return {
        metadata: { limit: pageSize, page: pageNumber, total_count },
        data: resData
    };
};

module.exports = { findAllByQueryWithPagination, CustomerPagination, WorkerPagination, TaskListPagination, ServicePagination, PayDayPagination }