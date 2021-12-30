module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const name = (req.query.name || (req.body && req.body.name));
    const responseMessage = [
        {
            "id": 1,
            "name": "Эсрэг цаг"
        },
        {
            "id": 2,
            "name": "Хүн байх ухаан"
        },
        {
            "id": 3,
            "name": "УНШИГЧ"
        }
    ]

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}