import express from 'express'
import { getRecommendedFee, getTransactionData, computeFeeBumpStatus } from './tx.utils'

const router = express.Router()


router.get('/:txhash', async (req, res) => {
    try {
        const [recommendedFee, transactionData] = await Promise.all([
            getRecommendedFee(),
            getTransactionData(req.params.txhash)
        ])
        // console.log("getTransactionData", transactionData)
        res.send({
            code: 200,
            message: 'Fetched',
            success: true,
            data: computeFeeBumpStatus(recommendedFee, transactionData),
        })

    } catch (error: any) {
        res
        .status(error.status || 500)
        .json({
            code: error.code || 500,
            message: error.message,
            success: false,
            data: null,
        })
    }
    
})

export default router