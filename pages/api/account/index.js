import Account from '../../../models/Account'

export default async function handler(req, res) {
    const { body, method, query: { email } } = req

    if (method == 'GET') {
        console.log('get account details 2')
        try {
            console.log(email)
            // const found = await Account.findOne({ email })
            const found = await Account.findOne({ email })
            console.log(found)

            // return res.status(200).json({})

            if (found) {
                return res.status(200).json(found)
            } else {
                const newAccount = new Account({ email })
                await newAccount.save()
                console.log(newAccount)
                return res.status(200).json(newAccount)
            }

        } catch (error) {

        }
        return res.json({})
    }

    if (method == 'PUT') {
        console.log('updating user account')
        console.log(body)
        console.log(email)
        const get = await Account.findOneAndUpdate({ email }, body)
        console.log(get)

        res.status(200).json(get)
        // const found = await Account.findOne({ email: body.email })

    }
}

