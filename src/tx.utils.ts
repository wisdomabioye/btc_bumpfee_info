import type { RecommendedFeeType, TransactionDataType, TransactionAccelaratorFeeEstimationType, TransactionFeeBumpStatusType } from './types'
import { fetcher } from './utils'

/** Get current block fee */
export async function getRecommendedFee() {
    return fetcher<RecommendedFeeType | undefined>(`https://mempool.space/api/v1/fees/recommended`)
}

/** Get transaction data */
export async function getTransactionData(txId: string) {
    return fetcher<TransactionDataType | undefined>(`https://mempool.space/api/tx/${txId}`)
}

export async function getTransactionAcceleratorFeeEstimation(txId: string) {
    return fetcher<TransactionAccelaratorFeeEstimationType | undefined>(`https://mempool.space/api/v1/services/accelerator/estimate`, {
        method: 'POST',
        body: JSON.stringify({ txInput: txId })
    })
}


export function computeFeeBumpStatus(recommendedFee?: RecommendedFeeType, transactionData?: TransactionDataType): TransactionFeeBumpStatusType {
    const { 
        fastestFee = 0, 
    } = recommendedFee || {}
    
    const { fee = 0, status, weight = 0 } = transactionData || {}

    // Virtual size is weight / 4
    const virtualSize = weight / 4
    // Ideal fee is the fastest fee
    const idealFee = fastestFee * virtualSize
    // 10% additional idealFee + idealFee
    const turboFee = Math.ceil(idealFee + (idealFee * 0.1))
    const shouldBump = fee < idealFee

    return {
        txId: transactionData?.txid as string,
        txConfirmed: status?.confirmed as boolean,
        shouldBump: status?.confirmed ? false : shouldBump,
        prevFee: fee,
        prevSatVbyte: parseFloat((fee / virtualSize).toFixed(2)),
        idealFee,
        idealSatVbyteFee: fastestFee,
        turboFee,
        turboSatVbyte: parseFloat(Math.ceil(turboFee / virtualSize).toFixed(2)),
    }
}