module.exports = {
  paginatedData: function paginatedData(model) {
    return async (req, res, next) => {
      const query = req.query;
      const va = {
        name: req.query.name,
        UserRole: req.query.UserRole,
        Phone: req.query.Phone,
        Availability: req.query.Availability,
        Department: req.query.Availability,
      };

      const filterConditions = Object.keys(va).reduce((result, key) => {
        if (va[key]) {
          result[key] = va[key];
        }
        return result;
      }, {});

      const page = parseInt(req.query.page);
      const limit = parseInt(req.query.limit);
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;

      const results = {};

      if (startIndex > 0) {
        results.previous = {
          page: page - 1,
          limit: limit,
        };
      }
      if (endIndex < (await model.countDocuments().exec())) {
        results.next = {
          page: page + 1,
          limit: limit,
        };
      }
      try {
        results.result = await model
          .find({ ...filterConditions })
          .limit(limit)
          .skip(startIndex)
          .exec();
        console.log(results);
        res.paginatedResult = results;

        next();
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    };
  },
};
