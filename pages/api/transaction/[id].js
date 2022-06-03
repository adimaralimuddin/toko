
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import Transaction from '../../../models/Transaction'

export default withApiAuthRequired(
    async function handler(req, res) {
        const { method, query: { id, type } } = req;

        if (method == 'DELETE') {
            console.log(type)
            if (type == 'cancel') {

                try {
                    const transaction = await Transaction.findById(id)
                    if (transaction?.canceled == true) return;
                    transaction.canceled = true
                    transaction.date_canceled = new Date().toDateString()
                    await transaction.save()
                    return res.status(200).json(transaction)
                } catch (error) {
                    return res.status(500).json({ error })
                }
            }

            if (type == 'remove') {
                try {
                    const transaction = await Transaction.findByIdAndDelete(id)
                    console.log(transaction)
                    return res.status(200).json(transaction)
                } catch (error) {
                    return res.status(500).json({ error })
                }

            }
        }
    }
    // protect api end
)
