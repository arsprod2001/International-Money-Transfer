const errorHandler = (err, req, res, next) => {
    console.error(`[${new Date().toISOString()}] Error:`, err.message);
    
    const statusCode = err.statusCode || 500;
    const message = statusCode === 500 ? 'Internal server error' : err.message;
  
    res.status(statusCode).json({
      success: false,
      error: message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
  };
  
  module.exports = errorHandler;


  