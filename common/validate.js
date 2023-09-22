const validationHandler = (validationSchema) => {
    return (req, res, next) => {
      try {
        let errorMessages = {};
        let errorExist = false;
  
        Object.keys(validationSchema)?.map(key => {
          let schema, reqData;
  
          if (key === "body" && validationSchema.body) {
            schema = validationSchema.body;
            reqData = req.body;
          } else if (key === "query" && validationSchema.query) {
            schema = validationSchema.query;
            reqData = req.query;
          } else if (key === "params" && validationSchema.params) {
            schema = validationSchema.params;
            reqData = req.params;
          } else if (key === "headers" && validationSchema.headers) {
            schema = validationSchema.headers;
            reqData = req.headers;
          }
  
          if (schema && reqData) {
            const { error } = schema.validate(reqData, {
              abortEarly: false,
              errors: {
                wrap: {
                  label: "",
                },
              },
            });
  
            if (error) {
              errorExist = true;
              let messages = {};
  
              error.details?.map((err) => {
                messages[err.path[0]] = err.message;
              });
  
              errorMessages[key] = messages;
            }
          }
        });
  
        // check the error exist or not
        if (errorExist) {
          return res.status(422).send({
            success: false,
            errors: errorMessages,
            message: "Validation Error!",
          });
        }
  
        next();
      } catch (err) {
        next(err);
      }
    };
  };

module.exports = validationHandler;

