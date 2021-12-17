/**
 *
 * @param request
 * @param response
 * @returns {Promise<*>}
 */
async function hello(request, response) {
    return response.json({
        success: false
    })
}

module.exports = hello;