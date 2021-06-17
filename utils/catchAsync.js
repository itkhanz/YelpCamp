//RETURN A FUNC THAT ACCEPTS A FUNC AND EXECUTES THAT FUNCTION 
//BUT CATCHES ERROR AND PASSES IT TO NEXT

module.exports = func => {
    return (req, res, next) => {
        func(req, res, next).catch(next)
    }
};